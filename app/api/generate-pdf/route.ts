import { NextRequest, NextResponse } from 'next/server';
import { PDFDocument, rgb, StandardFonts } from 'pdf-lib';

// Universal PDF Generator Configuration Interface
interface FormField {
  label: string;
  value: string;
  type: 'text' | 'multiline' | 'subfield';
  indentLevel?: number;
  fontSize?: number;
  isBold?: boolean;
}

export interface FormConfig {
  title: string;
  subtitle?: string;
  fields: FormField[];
  multilineFields?: { label: string; value: string; maxWidth?: number }[];
}

export async function POST(req: NextRequest) {
  let formConfig: FormConfig | undefined;
  try {
    const { formData, formConfig: config } = await req.json();
    formConfig = config;
    
    if (!formConfig) {
      throw new Error('Form configuration is required');
    }
    
    // Create PDF document
    const pdfDoc = await PDFDocument.create();
    const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
    const boldFont = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
    
    // Page dimensions and margins
    const pageWidth = 595.28;
    const pageHeight = 841.89;
    const margin = 40;
    const contentWidth = pageWidth - (2 * margin);

    // Helper function to draw text with underline support
    const drawText = (text: string, x: number, y: number, size: number = 10, isBold: boolean = false, page: any, showUnderline: boolean = false) => {
      const displayText = text || '';
      const selectedFont = isBold ? boldFont : font;
      
      // Draw the text
      page.drawText(displayText, { 
        x, 
        y, 
        size, 
        font: selectedFont, 
        color: rgb(0,0,0) 
      });
      
      // Only add underline if specifically requested (for form field values)
      if (showUnderline) {
        const maxX = pageWidth - margin - 20; // Leave 20px from right border as requested
        
        if (displayText !== '') {
          // For filled text: underline should go under the text AND extend to 20px from border
          const textWidth = selectedFont.widthOfTextAtSize(displayText, size);
          const lineEndX = maxX; // Go all the way to 20px from border
          
          page.drawLine({
            start: { x, y: y - 3 },
            end: { x: lineEndX, y: y - 3 },
            thickness: 1,
            color: rgb(0, 0, 0),
          });
        } else {
          // For empty text: start line 6px after label ends, go to 20px from border
          const lineStartX = x + 6; // 6px gap after label position
          const lineEndX = maxX;
          
          page.drawLine({
            start: { x: lineStartX, y: y - 3 },
            end: { x: lineEndX, y: y - 3 },
            thickness: 1,
            color: rgb(0, 0, 0),
          });
        }
      }
    };

    // Helper function to draw multiline text with proper wrapping
    const drawMultilineText = (text: string, x: number, y: number, maxWidth: number, fontSize: number = 10, page: any, isBold: boolean = false) => {
      const displayText = text || '';
      const words = displayText.split(' ');
      let currentLine = '';
      let currentY = y;
      let currentPage = page;
      const lines: string[] = [];
      const selectedFont = isBold ? boldFont : font;
      
      for (const word of words) {
        const testLine = currentLine + word + ' ';
        const testWidth = selectedFont.widthOfTextAtSize(testLine, fontSize);
        
        if (testWidth > maxWidth && currentLine !== '') {
          lines.push(currentLine.trim());
          currentLine = word + ' ';
        } else {
          currentLine = testLine;
        }
      }
      
      if (currentLine) {
        lines.push(currentLine.trim());
      }
      
      // Draw each line
      for (let i = 0; i < lines.length; i++) {
        if (currentY < margin + 20) {
          // Need new page
          currentPage = pdfDoc.addPage([pageWidth, pageHeight]);
          currentY = pageHeight - margin - 20;
          drawPageBorder(currentPage);
        }
        drawText(lines[i], x, currentY, fontSize, isBold, currentPage);
        currentY -= fontSize + 2; // Use font size for line height
      }
      
      return { page: currentPage, currentY };
    };

    // Helper function to draw a rectangle (border)
    const drawRect = (x: number, y: number, width: number, height: number, fillColor: any, page: any) => {
      page.drawRectangle({
        x,
        y,
        width,
        height,
        borderWidth: 1,
        borderColor: rgb(0, 0, 0),
        color: fillColor || rgb(1, 1, 1),
      });
    };

    // Helper function to draw border on a page
    const drawPageBorder = (page: any) => {
      page.drawRectangle({
        x: margin,
        y: margin,
        width: pageWidth - (2 * margin),
        height: pageHeight - (2 * margin),
        borderWidth: 1,
        borderColor: rgb(0, 0, 0),
      });
    };

    // Helper function to check if we need a new page
    const checkNewPage = (currentY: number, requiredSpace: number, page: any) => {
      if (currentY - requiredSpace < margin + 20) {
        page = pdfDoc.addPage([pageWidth, pageHeight]);
        currentY = pageHeight - margin - 20;
        drawPageBorder(page);
      }
      return { page, currentY };
    };

    // Helper function to draw form title with wrapping support
    const drawFormTitle = (title: string, y: number, page: any) => {
      const titleWidth = boldFont.widthOfTextAtSize(title, 14);
      const maxTitleWidth = 450; // Maximum width for title before wrapping
      
      if (titleWidth > maxTitleWidth) {
        // Use multiline text for long titles
        const titleResult = drawMultilineText(title, margin + 20, y, maxTitleWidth, 14, page, true);
        return { page: titleResult.page, currentY: titleResult.currentY - 20 };
      } else {
        // Draw the title normally
        drawText(title, centerX - (font.widthOfTextAtSize(title, 14) / 2), y, 14, true, page);
        return { page, currentY: y - 20 };
      }
    };

    // Helper function to draw form field with dynamic positioning
    const drawFormField = (label: string, value: string, y: number, page: any, labelSize: number = 12, valueSize: number = 12, isLabelBold: boolean = true) => {
      // Check if label is too long and needs to be wrapped
      const maxLabelWidth = 300; // Maximum width for label before wrapping
      const selectedFont = isLabelBold ? boldFont : font;
      const labelWidth = selectedFont.widthOfTextAtSize(label, labelSize);
      
      if (labelWidth > maxLabelWidth) {
        // Use multiline text for long labels
        const multilineResult = drawMultilineText(label, margin + 20, y, maxLabelWidth, labelSize, page, isLabelBold);
        const labelEndY = multilineResult.currentY;
        
        // Draw the value on the last line of the label
        const valueX = margin + 20 + maxLabelWidth + 20; // 20px gap after label
        drawText(value, valueX, y, valueSize, false, page, true);
        
        return labelEndY - 20; // Return new Y position based on multiline result
      } else {
        // Draw the label normally
        drawText(label, margin + 20, y, labelSize, isLabelBold, page);
        
        // Calculate position for the value based on label width
        const valueX = margin + 20 + labelWidth + 20; // 20px gap after label
        
        // Draw the value with underline
        drawText(value, valueX, y, valueSize, false, page, true);
        
        return y - 30; // Return new Y position
      }
    };

    // Helper function to draw sub-field with indentation
    const drawSubField = (label: string, value: string, y: number, page: any, indentLevel: number = 1) => {
      const indent = margin + 20 + (indentLevel * 20); // 20px per indent level
      const maxLabelWidth = 250; // Maximum width for subfield label before wrapping
      const labelWidth = font.widthOfTextAtSize(label, 10);
      
      if (labelWidth > maxLabelWidth) {
        // Use multiline text for long labels
        const multilineResult = drawMultilineText(label, indent, y, maxLabelWidth, 10, page, false);
        const labelEndY = multilineResult.currentY;
        
        // Draw the value on the last line of the label
        const valueX = indent + maxLabelWidth + 20; // 20px gap after label
        drawText(value, valueX, y, 10, false, page, true);
        
        return labelEndY - 15; // Return new Y position based on multiline result
      } else {
        // Draw the label normally
        drawText(label, indent, y, 10, false, page);
        
        // Calculate position for the value based on label width
        const valueX = indent + labelWidth + 20; // 20px gap after label
        
        // Draw the value with underline
        drawText(value, valueX, y, 10, false, page, true);
        
        return y - 25; // Return new Y position
      }
    };

    // Start with first page
    let currentPage = pdfDoc.addPage([pageWidth, pageHeight]);
    drawPageBorder(currentPage);
    let currentY = pageHeight - margin - 20;

    // Header Section - Centered text with proper spacing, no background
    const centerX = pageWidth / 2;
    
    // Try to add IITR Logo at the top center
    try {
      const logoResponse = await fetch('https://d1bm918zlnq37v.cloudfront.net/CECTemp/IIT%20logo.png');
      if (logoResponse.ok) {
        const logoBytes = await logoResponse.arrayBuffer();
        const logoImage = await pdfDoc.embedPng(logoBytes);
        const logoWidth = 60;
        const logoHeight = 60;
        const logoX = centerX - (logoWidth / 2);
        
        // Draw logo with proper border clearance
        currentPage.drawImage(logoImage, {
          x: logoX,
          y: currentY - 60, // Move logo down 60px from top border for more clearance
          width: logoWidth,
          height: logoHeight,
        });
        
        // Move down after logo
        currentY = currentY - logoHeight - 30; // Reduced gap to 30px after logo
        
        // Header text with proper spacing and light red background
        const titleY = currentY;
        const titleHeight = 16;
        const subtitleY = currentY - 25; // Reduced gap to 25px to group them
        const subtitleHeight = 10;
        
        // Draw light red background rectangle
        currentPage.drawRectangle({
          x: margin + 20,
          y: subtitleY - 10, // Extend rectangle slightly below subtitle
          width: contentWidth - 40,
          height: titleY - subtitleY + 30, // Height to cover both lines with padding
          color: rgb(0.98, 0.95, 0.95), // Light red color
        });
        
        // Draw the grouped text
        drawText('CONTINUING EDUCATION CENTRE, IIT ROORKEE', centerX - (font.widthOfTextAtSize('CONTINUING EDUCATION CENTRE, IIT ROORKEE', 16) / 2), titleY, 16, true, currentPage);
        drawText('HTTPS://IITR.AC.IN/CEC, CONTD@IITR.AC.IN Ph: 4327', centerX - (font.widthOfTextAtSize('HTTPS://IITR.AC.IN/CEC, CONTD@IITR.AC.IN Ph: 4327', 10) / 2), subtitleY, 10, false, currentPage);
        currentY = subtitleY - 35; // 35px gap after the grouped section
        
        const titleResult = drawFormTitle(formConfig.title, currentY, currentPage);
        currentPage = titleResult.page;
        currentY = titleResult.currentY;
        
        if (formConfig.subtitle) {
          drawText(formConfig.subtitle, centerX - (font.widthOfTextAtSize(formConfig.subtitle, 10) / 2), currentY, 10, false, currentPage);
          currentY = currentY - 30;
        }
        
        // Add form name based on title (case-insensitive)
        let formName = '';
        const title = formConfig.title.toLowerCase();
        
        if (title.includes('open participation courses')) {
          formName = 'CEC-01-A';
        } else if (title.includes('sponsored courses')) {
          formName = 'CEC-01-B';
        } else if (title.includes('course opening form')) {
          formName = 'CEC-02';
        } else if (title.includes('revised budget')) {
          formName = 'CEC-03';
        } else if (title.includes('invoice generation') && title.includes('open')) {
          formName = 'CEC-04';
        } else if (title.includes('invoice generation') && title.includes('sponsored')) {
          formName = 'CEC-05';
        } else if (title.includes('remuneration/honorarium')) {
          formName = 'CEC-06';
        } else if (title.includes('ta/lab staff') || title.includes('ta/lab') || title.includes('teaching assistant/technical assistant/lab staff')) {
          formName = 'CEC-07';
        } else if (title.includes('request for loan')) {
          formName = 'CEC-08';
        } else if (title.includes('coordination fee')) {
          formName = 'CEC-09';
        } else if (title.includes('course extension') || title.includes('extension of time / revision of project amount')) {
          formName = 'SRIC/10';
        }
        
        if (formName) {
          drawText(formName, margin + 20, currentY, 12, true, currentPage);
          currentY = currentY - 30;
        }
    } else {
        // No logo - start with header text with light red background
        const titleY = currentY;
        const titleHeight = 16;
        const subtitleY = currentY - 25; // Reduced gap to 25px to group them
        const subtitleHeight = 10;
        
        // Draw light red background rectangle
        currentPage.drawRectangle({
          x: margin + 20,
          y: subtitleY - 10, // Extend rectangle slightly below subtitle
          width: contentWidth - 40,
          height: titleY - subtitleY + 30, // Height to cover both lines with padding
          color: rgb(0.98, 0.95, 0.95), // Light red color
        });
        
        // Draw the grouped text
        drawText('CONTINUING EDUCATION CENTRE, IIT ROORKEE', centerX - (font.widthOfTextAtSize('CONTINUING EDUCATION CENTRE, IIT ROORKEE', 16) / 2), titleY, 16, true, currentPage);
        drawText('HTTPS://IITR.AC.IN/CEC, CONTD@IITR.AC.IN Ph: 4327', centerX - (font.widthOfTextAtSize('HTTPS://IITR.AC.IN/CEC, CONTD@IITR.AC.IN Ph: 4327', 10) / 2), subtitleY, 10, false, currentPage);
        currentY = subtitleY - 35; // 35px gap after the grouped section
        
        const titleResult2 = drawFormTitle(formConfig.title, currentY, currentPage);
        currentPage = titleResult2.page;
        currentY = titleResult2.currentY;
        
        if (formConfig.subtitle) {
          drawText(formConfig.subtitle, centerX - (font.widthOfTextAtSize(formConfig.subtitle, 10) / 2), currentY, 10, false, currentPage);
          currentY = currentY - 30; // Reduced gap to 30px before note section
        }
      }
    } catch (error) {
      console.error('Logo loading error:', error);
      // Continue without logo
      const titleY = currentY;
      const subtitleY = currentY - 25;
      
      // Draw light red background rectangle
      currentPage.drawRectangle({
        x: margin + 20,
        y: subtitleY - 10,
        width: contentWidth - 40,
        height: titleY - subtitleY + 30,
        color: rgb(0.98, 0.95, 0.95),
      });
      
      drawText('CONTINUING EDUCATION CENTRE, IIT ROORKEE', centerX - (font.widthOfTextAtSize('CONTINUING EDUCATION CENTRE, IIT ROORKEE', 16) / 2), titleY, 16, true, currentPage);
      drawText('HTTPS://IITR.AC.IN/CEC, CONTD@IITR.AC.IN Ph: 4327', centerX - (font.widthOfTextAtSize('HTTPS://IITR.AC.IN/CEC, CONTD@IITR.AC.IN Ph: 4327', 10) / 2), subtitleY, 10, false, currentPage);
      currentY = subtitleY - 35;
      
      const titleResult3 = drawFormTitle(formConfig.title, currentY, currentPage);
      currentPage = titleResult3.page;
      currentY = titleResult3.currentY;
      
      if (formConfig.subtitle) {
        drawText(formConfig.subtitle, centerX - (font.widthOfTextAtSize(formConfig.subtitle, 10) / 2), currentY, 10, false, currentPage);
        currentY = currentY - 30;
      }
    }



    // Process form fields based on configuration
    for (const field of formConfig.fields) {
      try {
        ({ page: currentPage, currentY } = checkNewPage(currentY, 60, currentPage));
        
        if (field.type === 'text') {
          currentY = drawFormField(
            field.label || '', 
            field.value || '', 
            currentY, 
            currentPage, 
            field.fontSize || 12, 
            field.fontSize || 12, 
            field.isBold !== false
          );
        } else if (field.type === 'subfield') {
          currentY = drawSubField(
            field.label || '', 
            field.value || '', 
            currentY, 
            currentPage, 
            field.indentLevel || 1
          );
        }
        
        currentY -= 20; // Add spacing between fields
      } catch (fieldError) {
        console.error('Error processing field:', fieldError);
        // Continue with next field instead of failing completely
        currentY -= 40; // Add some space and continue
      }
    }

    // Process multiline fields if any
    if (formConfig.multilineFields && formConfig.multilineFields.length > 0) {
      for (const field of formConfig.multilineFields) {
        try {
          ({ page: currentPage, currentY } = checkNewPage(currentY, 80, currentPage));
          
          // Check if label needs to be wrapped
          const labelWidth = boldFont.widthOfTextAtSize(field.label || '', 12);
          const maxLabelWidth = 300;
          
          if (labelWidth > maxLabelWidth) {
            // Use multiline text for long labels
            const labelResult = drawMultilineText(field.label || '', margin + 20, currentY, maxLabelWidth, 12, currentPage, true);
            currentPage = labelResult.page;
            currentY = labelResult.currentY - 20;
          } else {
            // Draw the label normally
            drawText(field.label || '', margin + 20, currentY, 12, true, currentPage);
            currentY -= 30;
          }
          
          const multilineResult = drawMultilineText(field.value || '', margin + 20, currentY, field.maxWidth || 350, 12, currentPage, false);
          currentPage = multilineResult.page;
          currentY = multilineResult.currentY - 30;
        } catch (fieldError) {
          console.error('Error processing multiline field:', fieldError);
          // Continue with next field instead of failing completely
          currentY -= 50; // Add some space and continue
        }
      }
    }

    // Footer - only on last page
    ({ page: currentPage, currentY } = checkNewPage(currentY, 100, currentPage));
    drawText('D.A./Supdt.                    Asstt. Registrar/Dy. Registrar (SRIC)                    Dean, SRIC', margin + 20, currentY, 10, false, currentPage);
    currentY -= 20;
    drawText('Copy after approval to:', margin + 20, currentY, 10, true, currentPage);
    currentY -= 15;
    drawText('(1) Course Coordinator (2) Concerned HoD (3) Coordinator, CEC (4) AR SRIC- AC', margin + 20, currentY, 10, false, currentPage);
    currentY -= 15;
    drawText('Dean, SRIC', margin + 450, currentY, 10, true, currentPage);

    // Serialize the PDFDocument to bytes
    const pdfBytes = await pdfDoc.save();

    return new NextResponse(pdfBytes, {
      status: 200,
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': 'attachment; filename="form.pdf"',
      },
    });
  } catch (error: any) {
    console.error('PDF generation error:', error);
    console.error('Error details:', {
      message: error?.message || 'Unknown error',
      stack: error?.stack,
      formConfig: formConfig ? {
        title: formConfig.title,
        fieldsCount: formConfig.fields?.length,
        multilineFieldsCount: formConfig.multilineFields?.length
      } : 'No formConfig'
    });
    return new NextResponse(JSON.stringify({ 
      error: 'Failed to generate PDF',
      details: error?.message || 'Unknown error'
    }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
} 