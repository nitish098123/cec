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

interface TableColumn {
  header: string;
  width: number;
}

interface TableData {
  columns: TableColumn[];
  rows: string[][];
}

interface SignatureField {
  label: string;
  subLabels?: string[];
}

export interface FormConfig {
  title: string;
  subtitle?: string;
  fields: FormField[];
  multilineFields?: { label: string; value: string; maxWidth?: number }[];
  tables?: { label: string; data: TableData }[];
  annexTables?: { label: string; data: TableData }[];
  signatureSections?: SignatureField[];
  plainTextSections?: { title?: string; content: string }[];
  officeEndorsement?: {
    note?: string;
    table?: TableData;
    approvalText?: string;
    signatoryText?: string;
    copyToText?: string;
    notes?: string[];
  };
  secondOfficeEndorsement?: {
    title?: string;
    approvalText?: string;
    signatoryText?: string;
  };
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
    // Use Times New Roman–style fonts for all PDF text
    const font = await pdfDoc.embedFont(StandardFonts.TimesRoman);
    const boldFont = await pdfDoc.embedFont(StandardFonts.TimesRomanBold);
    
    // Page dimensions and margins
    const pageWidth = 595.28;
    const pageHeight = 841.89;
    const margin = 20; // Reduced from 40 to bring border closer to page edge
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
    const drawMultilineText = (text: string, x: number, y: number, maxWidth: number, fontSize: number = 10, page: any, isBold: boolean = false, showUnderline: boolean = false) => {
      const displayText = (text || '').trim();
      const selectedFont = isBold ? boldFont : font;
      let currentY = y;
      let currentPage = page;
      const allLines: string[] = [];
      
      // First, split by newlines to preserve explicit line breaks, but filter out empty parts
      const newlineSplit = displayText.split('\n').filter(part => part.trim().length > 0);
      
      // If no non-empty parts after splitting, return early
      if (newlineSplit.length === 0 && displayText.length > 0) {
        // If there's text but it was all filtered out (unlikely), use the original text
        newlineSplit.push(displayText);
      }
      
      for (const newlinePart of newlineSplit) {
        // For each part (which may have been separated by \n), wrap by words
        const words = newlinePart.split(' ').filter(w => w.length > 0);
        let currentLine = '';
      
        for (const word of words) {
          const testLine = currentLine ? currentLine + ' ' + word : word;
          const testWidth = selectedFont.widthOfTextAtSize(testLine, fontSize);
          
          if (testWidth > maxWidth) {
            if (currentLine !== '') {
              // Current line + word is too long, so push current line and start new line with word
              allLines.push(currentLine.trim());
              currentLine = word;
              // Check if the word itself is too long (shouldn't happen normally, but handle it)
              const wordWidth = selectedFont.widthOfTextAtSize(word, fontSize);
              if (wordWidth > maxWidth) {
                // Word is too long - we'll still add it but it might overflow (better than crashing)
                allLines.push(word);
                currentLine = '';
              }
            } else {
              // Single word is too long - add it anyway (better than not showing it)
              allLines.push(word);
              currentLine = '';
            }
          } else {
            currentLine = testLine;
          }
        }
      
        if (currentLine.trim()) {
          allLines.push(currentLine.trim());
        }
      }
      
      // Filter out any empty lines before drawing (double-check)
      const nonEmptyLines = allLines.filter(line => line.trim().length > 0);
      
      // If no non-empty lines, return early without drawing anything
      if (nonEmptyLines.length === 0) {
        return { page: currentPage, currentY: y };
      }
      
      // Debug logging
      if (showUnderline) {
        console.log('drawMultilineText - nonEmptyLines count:', nonEmptyLines.length);
        console.log('drawMultilineText - lines:', nonEmptyLines);
      }
      
      // Draw all lines (only non-empty ones)
      for (let i = 0; i < nonEmptyLines.length; i++) {
        if (currentY < margin + 20) {
          // Need new page
          currentPage = pdfDoc.addPage([pageWidth, pageHeight]);
          currentY = pageHeight - margin - 20;
          drawPageBorder(currentPage);
        }
        // Draw text without underline (we'll handle underline separately for multiline)
        drawText(nonEmptyLines[i], x, currentY, fontSize, isBold, currentPage, false);
        
        // If showing underline, draw it extending to maxWidth or end of text, whichever is smaller
        // ONLY draw underline for lines that have actual text content (already filtered)
        if (showUnderline) {
          const lineText = nonEmptyLines[i];
          const maxX = pageWidth - margin - 20; // Leave 20px from right border
          // For filled text: underline goes under the text AND extends to maxWidth or border
          const underlineEndX = Math.min(x + maxWidth, maxX);
          
          currentPage.drawLine({
            start: { x, y: currentY - 3 },
            end: { x: underlineEndX, y: currentY - 3 },
            thickness: 1,
            color: rgb(0, 0, 0),
          });
        }
        
        currentY -= fontSize + 1; // Reduced line height for compact spacing
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
    const drawFormTitle = (title: string, y: number, page: any, customFontSize?: number) => {
      // Use smaller font size for revised budget form to fit on one line
      const isRevisedBudgetForm = formConfig?.title && (
        formConfig?.title.toLowerCase().includes('revised budget')
      );
      const titleFontSize = customFontSize || (isRevisedBudgetForm ? 11 : 14);
      const titleWidth = boldFont.widthOfTextAtSize(title, titleFontSize);
      const maxTitleWidth = 450; // Maximum width for title before wrapping
      
      if (titleWidth > maxTitleWidth) {
        // Use multiline text for long titles
        const titleResult = drawMultilineText(title, margin + 20, y, maxTitleWidth, titleFontSize, page, true);
        return { page: titleResult.page, currentY: titleResult.currentY - 12 };
      } else {
        // Draw the title normally
        drawText(title, centerX - (boldFont.widthOfTextAtSize(title, titleFontSize) / 2), y, titleFontSize, true, page);
        return { page, currentY: y - 12 };
      }
    };

    // Helper function to calculate aligned positions for labels
    const getAlignedPositions = (labelSize: number = 11, isLabelBold: boolean = true) => {
      const standardSize = 11;
      const numberFont = isLabelBold ? boldFont : font;
      const maxNumberWidth = numberFont.widthOfTextAtSize('20.', standardSize);
      const numberX = margin + 20;
      const numberSpacing = 10; // Space between number and text
      const textX = numberX + maxNumberWidth + numberSpacing; // Fixed X position for all text
      return { numberX, textX, numberFont };
    };

    // Helper function to draw a label with proper alignment
    const drawAlignedLabel = (label: string, y: number, page: any, labelSize: number = 11, isLabelBold: boolean = true) => {
      const { numberX, textX, numberFont } = getAlignedPositions(labelSize, isLabelBold);
      
      // Check if label starts with a number pattern
      const numberPattern = /^(\d+\.)\s+(.+)$/;
      const match = label.match(numberPattern);
      
      if (match) {
        const numberPart = match[1]; // e.g., "1."
        const textPart = match[2]; // e.g., "Name of the Course Coordinator/PI:"
        drawText(numberPart, numberX, y, labelSize, isLabelBold, page);
        drawText(textPart, textX, y, labelSize, isLabelBold, page);
      } else {
        // For non-numbered labels, use textX for alignment
        drawText(label, textX, y, labelSize, isLabelBold, page);
      }
    };

    // Helper function to draw form field with dynamic positioning
    const drawFormField = (label: string, value: string, y: number, page: any, labelSize: number = 11, valueSize: number = 11, isLabelBold: boolean = true) => {
      // Fixed positions for alignment - calculate once and use consistently
      const { numberX, textX, numberFont } = getAlignedPositions(labelSize, isLabelBold);
      
      // Check if label starts with a number pattern (e.g., "1. ", "2. ", "10. ", etc.)
      const numberPattern = /^(\d+\.)\s+(.+)$/;
      const match = label.match(numberPattern);
      let numberPart = '';
      let textPart = label;
      
      if (match) {
        numberPart = match[1]; // e.g., "1."
        textPart = match[2]; // e.g., "Name of the Course Coordinator/PI:"
      } else {
        // For non-numbered labels, use the same textX position for alignment
        textPart = label;
      }
      
      // Check if label contains newlines or is too long and needs to be wrapped
      const maxLabelWidth = 300; // Maximum width for label before wrapping
      const selectedFont = isLabelBold ? boldFont : font;
      const labelWidth = selectedFont.widthOfTextAtSize(textPart, labelSize);
      const hasNewlines = textPart.includes('\n');
      
      if (hasNewlines || labelWidth > maxLabelWidth) {
        // Draw number part if present
        if (numberPart) {
          drawText(numberPart, numberX, y, labelSize, isLabelBold, page);
        }
        // Use multiline text for labels with newlines or long labels
        const multilineResult = drawMultilineText(textPart, textX, y, maxLabelWidth, labelSize, page, isLabelBold);
        const labelEndY = multilineResult.currentY;
        const labelStartY = y;
        
        // Draw the value on the right side, aligned with the first line of the label
        // Always use textX for alignment (whether numbered or not)
        const valueX = textX + maxLabelWidth + 20; // 20px gap after label
        const valueWidth = pageWidth - valueX - margin - 20; // Remaining width
        
        // Check if value needs wrapping (even if it doesn't have newlines)
        const valueTextWidth = font.widthOfTextAtSize(value || '', valueSize);
        const needsWrapping = valueTextWidth > valueWidth;
        
        // If value is multiline or needs wrapping, use multiline text rendering
        if ((value && value.includes('\n')) || needsWrapping) {
          const valueResult = drawMultilineText(value || '', valueX, labelStartY, valueWidth, valueSize, page, false, false);
          return Math.min(labelEndY, valueResult.currentY) - 10;
        } else {
          // Draw single line value without underline
          drawText(value, valueX, labelStartY, valueSize, false, page, false);
        return labelEndY - 10; // Return new Y position based on multiline result - spacing between fields
        }
      } else {
        // Draw the label normally
        // Draw number part if present
        if (numberPart) {
          drawText(numberPart, numberX, y, labelSize, isLabelBold, page);
        }
        // Draw text part - always at textX for alignment
        drawText(textPart, textX, y, labelSize, isLabelBold, page);
        
        // Calculate position for the value based on label width
        // Calculate from textX (where text starts) to end of text
        const textPartWidth = selectedFont.widthOfTextAtSize(textPart, labelSize);
        const valueX = textX + textPartWidth + 20; // 20px gap after label
        const valueWidth = pageWidth - valueX - margin - 20; // Remaining width
        
        // Check if value needs wrapping (even if it doesn't have newlines)
        const valueTextWidth = font.widthOfTextAtSize(value || '', valueSize);
        const needsWrapping = valueTextWidth > valueWidth;
        
        // If value is multiline or needs wrapping, use multiline text rendering
        if ((value && value.includes('\n')) || needsWrapping) {
          const valueResult = drawMultilineText(value || '', valueX, y, valueWidth, valueSize, page, false, false);
          return valueResult.currentY - 10;
        } else {
          // Draw single line value without underline
        drawText(value, valueX, y, valueSize, false, page, false);
        return y - 10; // Return new Y position - spacing between fields
        }
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
        drawText(value, valueX, y, 10, false, page, false);
        
        return labelEndY - 8; // Return new Y position based on multiline result - further reduced spacing
      } else {
        // Draw the label normally
        drawText(label, indent, y, 10, false, page);
        
        // Calculate position for the value based on label width
        const valueX = indent + labelWidth + 20; // 20px gap after label
        
        // Draw the value without underline
        drawText(value, valueX, y, 10, false, page, false);
        
        return y - 10; // Return new Y position - further reduced spacing
      }
    };

    // Helper function to draw a table
    const drawTable = (tableData: TableData, y: number, page: any, label?: string, showExtraRows: boolean = true, customFontSize?: number, labelFontSize?: number, headerBold: boolean = true) => {
      let currentY = y;
      let currentPage = page;
      const tableStartX = margin + 20;
      const rowHeight = 20; // Reduced for more compact tables
      const headerHeight = 20;
      const fontSize = customFontSize || 9;
      const labelSize = labelFontSize || 10;
      
      // Draw label if provided (handle multiline labels)
      if (label) {
        if (label.includes('\n')) {
          // Use multiline text for labels with newlines
          const labelResult = drawMultilineText(label, tableStartX, currentY, contentWidth - 40, labelSize, currentPage, true);
          currentPage = labelResult.page;
          currentY = labelResult.currentY - 10;
        } else {
          drawText(label, tableStartX, currentY, labelSize, true, currentPage);
                            currentY -= 15;
        }
      }
      
      // Calculate column positions
      let xPositions: number[] = [tableStartX];
      let totalTableWidth = 0;
      for (let i = 0; i < tableData.columns.length; i++) {
        totalTableWidth += tableData.columns[i].width;
        if (i < tableData.columns.length - 1) {
          xPositions.push(xPositions[i] + tableData.columns[i].width);
        }
      }
      
      // Ensure table doesn't exceed page width (with margins)
      const maxTableWidth = pageWidth - (2 * margin) - 40; // Leave 40px total padding
      if (totalTableWidth > maxTableWidth) {
        // Scale down columns proportionally
        const scaleFactor = maxTableWidth / totalTableWidth;
        xPositions = [tableStartX];
        for (let i = 0; i < tableData.columns.length - 1; i++) {
          tableData.columns[i].width = tableData.columns[i].width * scaleFactor;
          xPositions.push(xPositions[i] + tableData.columns[i].width);
        }
        tableData.columns[tableData.columns.length - 1].width = tableData.columns[tableData.columns.length - 1].width * scaleFactor;
        totalTableWidth = maxTableWidth;
      }
      
      // Check if all headers are empty - if so, skip drawing header row
      const allHeadersEmpty = tableData.columns.every(col => !col.header || col.header.trim() === '');
      
      // Draw header row - first calculate max height needed for wrapping
      const headerY = currentY;
      let maxHeaderHeight = headerHeight;
      const headerLines: { col: number; lines: string[] }[] = [];
      
      // First pass: calculate lines for each header and determine max height (only if headers are not all empty)
      if (!allHeadersEmpty) {
        for (let i = 0; i < tableData.columns.length; i++) {
        const col = tableData.columns[i];
        const width = col.width;
        let headerText = col.header || '';
        const maxTextWidth = width - 4; // Padding
        
        // First, split by explicit newlines if present
        const headerFont = headerBold ? boldFont : font;
        let lines: string[] = [];
        if (headerText.includes('\n')) {
          // Split by newlines first
          const newlineSplit = headerText.split('\n');
          for (const line of newlineSplit) {
            const lineWidth = headerFont.widthOfTextAtSize(line, fontSize);
            if (lineWidth <= maxTextWidth) {
              lines.push(line);
            } else {
              // This line needs word wrapping
              const words = line.split(' ');
              let currentLine = '';
              for (const word of words) {
                const testLine = currentLine ? currentLine + ' ' + word : word;
                const testWidth = headerFont.widthOfTextAtSize(testLine, fontSize);
                if (testWidth > maxTextWidth && currentLine) {
                  lines.push(currentLine.trim());
                  currentLine = word;
                } else {
                  currentLine = testLine;
                }
              }
              if (currentLine.trim()) {
                lines.push(currentLine.trim());
              }
            }
          }
        } else {
          // No newlines, check if text fits or needs wrapping
          const textWidth = headerFont.widthOfTextAtSize(headerText, fontSize);
          if (textWidth <= maxTextWidth) {
            // Text fits on one line
            lines = [headerText];
          } else {
            // Text needs wrapping - split into words and wrap, with smart breaking
            // Try to break at natural points like " /" or before long segments
            // For headers like "Date of Hands-on/project/assignments/use cases /(Week No.)"
            // Try to break before " /" if present
            if (headerText.includes(' /')) {
              const parts = headerText.split(' /');
              const firstPart = parts[0];
              const secondPart = ' /' + parts.slice(1).join(' /');
              
              // Check if first part fits
              const firstPartWidth = headerFont.widthOfTextAtSize(firstPart, fontSize);
              if (firstPartWidth <= maxTextWidth) {
                lines.push(firstPart);
                // Try to fit second part, or wrap it
                const secondPartWidth = headerFont.widthOfTextAtSize(secondPart, fontSize);
                if (secondPartWidth <= maxTextWidth) {
                  lines.push(secondPart);
                } else {
                  // Wrap second part by words
                  const words = secondPart.split(' ');
                  let currentLine = '';
                  for (const word of words) {
                    const testLine = currentLine ? currentLine + ' ' + word : word;
                    const testWidth = headerFont.widthOfTextAtSize(testLine, fontSize);
                    if (testWidth > maxTextWidth && currentLine) {
                      lines.push(currentLine.trim());
                      currentLine = word;
                    } else {
                      currentLine = testLine;
                    }
                  }
                  if (currentLine.trim()) {
                    lines.push(currentLine.trim());
                  }
                }
              } else {
                // First part doesn't fit, wrap normally
                const words = headerText.split(' ');
                let currentLine = '';
                for (const word of words) {
                  const testLine = currentLine ? currentLine + ' ' + word : word;
                  const testWidth = headerFont.widthOfTextAtSize(testLine, fontSize);
                  if (testWidth > maxTextWidth && currentLine) {
                    lines.push(currentLine.trim());
                    currentLine = word;
                  } else {
                    currentLine = testLine;
                  }
                }
                if (currentLine.trim()) {
                  lines.push(currentLine.trim());
                }
              }
            } else {
              // No " /" pattern, wrap normally by words
              const words = headerText.split(' ');
              let currentLine = '';
              for (const word of words) {
                const testLine = currentLine ? currentLine + ' ' + word : word;
                const testWidth = headerFont.widthOfTextAtSize(testLine, fontSize);
                if (testWidth > maxTextWidth && currentLine) {
                  lines.push(currentLine.trim());
                  currentLine = word;
                } else {
                  currentLine = testLine;
                }
              }
              if (currentLine.trim()) {
                lines.push(currentLine.trim());
              }
            }
          }
        }
        
        headerLines.push({ col: i, lines });
        
        // Calculate height needed for this header
        const lineHeight = fontSize + 2;
        const cellPadding = 4;
        const neededHeight = cellPadding + (lines.length * lineHeight) + cellPadding;
        if (neededHeight > maxHeaderHeight) {
          maxHeaderHeight = neededHeight;
        }
      }
      }
      
      // Second pass: draw header cells and text (only if headers are not all empty)
      if (!allHeadersEmpty) {
        for (let i = 0; i < tableData.columns.length; i++) {
        const col = tableData.columns[i];
        const x = xPositions[i];
        const width = col.width;
        const headerInfo = headerLines[i];
        
        // Draw header cell border
        currentPage.drawRectangle({
          x,
          y: headerY - maxHeaderHeight,
          width,
          height: maxHeaderHeight,
          borderWidth: 1,
          borderColor: rgb(0, 0, 0),
        });
        
        // Draw header text (wrapped if needed)
        const lineHeight = fontSize + 2;
        const cellPadding = 2;
        let lineY = headerY - cellPadding - fontSize;
        
        for (const line of headerInfo.lines) {
          // Left align headers
          const textX = x + 4; // Left padding inside cell
          drawText(line, textX, lineY, fontSize, headerBold, currentPage);
          lineY -= lineHeight;
        }
      }
      }
      
      // Set currentY based on whether header was drawn
      currentY = allHeadersEmpty ? headerY : headerY - maxHeaderHeight;
      
      // Draw data rows
      const maxRows = showExtraRows ? Math.max(5, tableData.rows.length) : tableData.rows.length;
      
      // First pass: calculate required height for each row
      // Use the same wrapping logic as drawMultilineText to ensure accurate height calculation
      const rowHeights: number[] = [];
      for (let rowIdx = 0; rowIdx < maxRows; rowIdx++) {
        const row = tableData.rows[rowIdx] || [];
        let maxCellHeight = rowHeight; // Minimum row height
        
        for (let colIdx = 0; colIdx < tableData.columns.length; colIdx++) {
          const width = tableData.columns[colIdx].width;
          const cellValue = row[colIdx] || '';
          
          if (cellValue) {
            const maxTextWidth = width - 8; // Padding inside cell (4px on each side)
            
            // Handle newlines first - split by newlines before calculating width
            let lines: string[] = [];
            if (cellValue.includes('\n')) {
              // Split by newlines first
              const newlineSplit = cellValue.split('\n');
              for (const line of newlineSplit) {
                if (line.trim()) {
                  const lineWidth = font.widthOfTextAtSize(line, fontSize);
                  if (lineWidth <= maxTextWidth) {
                    lines.push(line);
                  } else {
                    // This line needs word wrapping
                    const words = line.split(' ').filter(w => w.length > 0);
                    let currentLine = '';
                    for (const word of words) {
                      const testLine = currentLine ? currentLine + ' ' + word : word;
                      const testWidth = font.widthOfTextAtSize(testLine, fontSize);
                      if (testWidth > maxTextWidth && currentLine !== '') {
                        lines.push(currentLine.trim());
                        currentLine = word;
                      } else {
                        currentLine = testLine;
                      }
                    }
                    if (currentLine.trim()) {
                      lines.push(currentLine.trim());
                    }
                  }
                } else {
                  // Empty line after newline - keep it for spacing
                  lines.push('');
                }
              }
            } else {
              // No newlines, check if text fits or needs wrapping
              const textWidth = font.widthOfTextAtSize(cellValue, fontSize);
              if (textWidth <= maxTextWidth) {
                lines = [cellValue];
              } else {
                // Text needs wrapping
                const words = cellValue.split(' ').filter(w => w.length > 0);
                let currentLine = '';
                for (const word of words) {
                  const testLine = currentLine ? currentLine + ' ' + word : word;
                  const testWidth = font.widthOfTextAtSize(testLine, fontSize);
                  if (testWidth > maxTextWidth && currentLine !== '') {
                    lines.push(currentLine.trim());
                    currentLine = word;
                  } else {
                    currentLine = testLine;
                  }
                }
                if (currentLine.trim()) {
                  lines.push(currentLine.trim());
                }
              }
            }
            
            // Calculate height needed for this cell
            const lineHeight = fontSize + 1; // Reduced spacing
            const topPadding = 4; // Reduced padding
            const bottomPadding = 4; // Reduced padding
            // Calculate needed height with proper padding
            const neededHeight = topPadding + (lines.length * lineHeight) + bottomPadding;
            
            if (neededHeight > maxCellHeight) {
              maxCellHeight = neededHeight;
            }
          } else {
            // For empty cells, ensure minimum height
            const minHeightForEmpty = 6 + fontSize + 6; // Increased padding
            if (minHeightForEmpty > maxCellHeight) {
              maxCellHeight = minHeightForEmpty;
            }
          }
        }
        
        // Ensure minimum row height is maintained
        if (maxCellHeight < rowHeight) {
          maxCellHeight = rowHeight;
        }
        
        rowHeights.push(maxCellHeight);
      }
      
      // Second pass: draw rows with calculated heights
      for (let rowIdx = 0; rowIdx < maxRows; rowIdx++) {
        const dynamicRowHeight = rowHeights[rowIdx];
        ({ page: currentPage, currentY } = checkNewPage(currentY, dynamicRowHeight + 5, currentPage));
        
        const row = tableData.rows[rowIdx] || [];
        
        for (let colIdx = 0; colIdx < tableData.columns.length; colIdx++) {
          const x = xPositions[colIdx];
          const width = tableData.columns[colIdx].width;
          
          // Draw cell border with dynamic height
          currentPage.drawRectangle({
            x,
            y: currentY - dynamicRowHeight,
            width,
            height: dynamicRowHeight,
            borderWidth: 1,
            borderColor: rgb(0, 0, 0),
          });
          
          // Draw cell content
          const cellValue = row[colIdx] || '';
          if (cellValue) {
            const maxTextWidth = width - 8; // Padding inside cell (4px on each side)
            const textX = x + 4; // Left padding inside cell
            
            // Handle newlines first - split by newlines before calculating width
            let lines: string[] = [];
            if (cellValue.includes('\n')) {
              // Split by newlines first
              const newlineSplit = cellValue.split('\n');
              for (const line of newlineSplit) {
                if (line.trim()) {
                  const lineWidth = font.widthOfTextAtSize(line, fontSize);
                  if (lineWidth <= maxTextWidth) {
                    lines.push(line);
                  } else {
                    // This line needs word wrapping
                    const words = line.split(' ').filter(w => w.length > 0);
                    let currentLine = '';
                    for (const word of words) {
                      const testLine = currentLine ? currentLine + ' ' + word : word;
                      const testWidth = font.widthOfTextAtSize(testLine, fontSize);
                      if (testWidth > maxTextWidth && currentLine !== '') {
                        lines.push(currentLine.trim());
                        currentLine = word;
                      } else {
                        currentLine = testLine;
                      }
                    }
                    if (currentLine.trim()) {
                      lines.push(currentLine.trim());
                    }
                  }
                } else {
                  // Empty line after newline - keep it for spacing
                  lines.push('');
                }
              }
            } else {
              // No newlines, check if text fits or needs wrapping
              const textWidth = font.widthOfTextAtSize(cellValue, fontSize);
              if (textWidth <= maxTextWidth) {
                lines = [cellValue];
              } else {
                // Text needs wrapping
                const words = cellValue.split(' ').filter(w => w.length > 0);
                let currentLine = '';
                for (const word of words) {
                  const testLine = currentLine ? currentLine + ' ' + word : word;
                  const testWidth = font.widthOfTextAtSize(testLine, fontSize);
                  if (testWidth > maxTextWidth && currentLine !== '') {
                    lines.push(currentLine.trim());
                    currentLine = word;
                  } else {
                    currentLine = testLine;
                  }
                }
                if (currentLine.trim()) {
                  lines.push(currentLine.trim());
                }
              }
            }
            
            // Draw the lines - align from top with proper padding
            const topPadding = 4;
            const lineHeight = fontSize + 1; // Match the height calculation
            
            // Determine text alignment based on column
            // S. No. column (index 0) should be center-aligned, others left-aligned
            // Exception: Payment details table (has "Passed for Payment" in first row) should be left-aligned for all columns
            // Exception: Budget table (has "Budget Head / Description" header) should be left-aligned for all columns
            const isPaymentDetailsTable = tableData.rows && tableData.rows.length > 0 && 
                                         tableData.rows[0][0] && 
                                         tableData.rows[0][0].includes('Passed for Payment');
            const isBudgetTable = tableData.columns && tableData.columns.length > 0 && 
                                 tableData.columns[0].header && 
                                 tableData.columns[0].header.includes('Budget Head / Description');
            const isSerialNumberColumn = colIdx === 0 && !isPaymentDetailsTable && !isBudgetTable;
            
            if (lines.length === 1) {
              // Single line text
              const verticalCenter = dynamicRowHeight / 2;
              const textY = currentY - verticalCenter;
              if (lines[0]) {
                if (isSerialNumberColumn) {
                  // Center align for S. No. column
                  const textWidth = font.widthOfTextAtSize(lines[0], fontSize);
                  const centerX = x + (width / 2) - (textWidth / 2);
                  drawText(lines[0], centerX, textY, fontSize, false, currentPage);
                } else {
                  // Left align for other columns
                  drawText(lines[0], textX, textY, fontSize, false, currentPage);
                }
              }
            } else {
              // Multi-line text - start from top with padding
              // Position first line from top of cell
              let textY = currentY - topPadding - fontSize;
              
              // Draw each line from top to bottom
              for (const line of lines) {
                if (line) {
                  if (isSerialNumberColumn) {
                    // Center align for S. No. column
                    const textWidth = font.widthOfTextAtSize(line, fontSize);
                    const centerX = x + (width / 2) - (textWidth / 2);
                    drawText(line, centerX, textY, fontSize, false, currentPage);
                  } else {
                    // Left align for other columns
                    drawText(line, textX, textY, fontSize, false, currentPage);
                  }
                }
                textY -= lineHeight; // Move down for next line
              }
            }
          }
        }
        
        currentY -= dynamicRowHeight;
      }
      
      return { page: currentPage, currentY };
    };

    // Helper function to draw signature section
    const drawSignatureSection = (signature: SignatureField, y: number, page: any) => {
      let currentY = y;
      const startX = margin + 20;
      const lineLength = 200;
      const lineSpacing = 30;
      
      // Draw main label
      drawText(signature.label, startX, currentY, 10, true, page);
      currentY -= 15;
      
      // Draw empty line with underline
      page.drawLine({
        start: { x: startX, y: currentY - 3 },
        end: { x: startX + lineLength, y: currentY - 3 },
        thickness: 1,
        color: rgb(0, 0, 0),
      });
      currentY -= 20; // Reduced from lineSpacing (30) to 20
      
      // Draw sub-labels if any
      if (signature.subLabels) {
        for (const subLabel of signature.subLabels) {
          drawText(subLabel, startX, currentY, 10, false, page);
          currentY -= 12; // Reduced from 20
        }
      }
      
      return currentY;
    };

    // Helper function to draw plain text section
    const drawPlainTextSection = (section: { title?: string; content: string }, y: number, page: any) => {
      let currentY = y;
      let currentPage = page;
      const startX = margin + 20;
      
      if (section.title) {
        drawText(section.title, startX, currentY, 10, true, currentPage);
        currentY -= 15; // Reduced from 25
      }
      
      // Draw content as multiline text (only if content exists)
      if (section.content && section.content.trim()) {
        const result = drawMultilineText(section.content, startX, currentY, contentWidth - 40, 10, currentPage, false);
        currentPage = result.page;
        currentY = result.currentY - 12; // Reduced from 20
      } else {
        currentY -= 6; // Reduced from 10
      }
      
      return { page: currentPage, currentY };
    };

    // Helper function to draw office endorsement section
    const drawOfficeEndorsement = (endorsement: FormConfig['officeEndorsement'], y: number, page: any) => {
      let currentY = y;
      let currentPage = page;
      const startX = margin + 20;
      
      // Draw title (centered)
      const endorsementTitle = 'Endorsement by CEC Office, IIT Roorkee';
      const titleWidth = boldFont.widthOfTextAtSize(endorsementTitle, 10);
      const centerX = pageWidth / 2;
      const titleX = centerX - (titleWidth / 2);
      drawText(endorsementTitle, titleX, currentY, 10, true, currentPage);
      currentY -= 15; // Reduced from 25
      
      // Draw note if provided
      if (endorsement?.note) {
        const noteResult = drawMultilineText(endorsement.note, startX, currentY, contentWidth - 40, 10, currentPage, false);
        currentPage = noteResult.page;
        currentY = noteResult.currentY - 12; // Reduced from 20
      }
      
      // Draw table if provided (no extra blank rows for office endorsement table)
      if (endorsement?.table) {
        const tableResult = drawTable(endorsement.table, currentY, currentPage, undefined, false);
        currentPage = tableResult.page;
        currentY = tableResult.currentY - 12; // Reduced from 20
      }
      
      // Draw approval text (right aligned)
      if (endorsement?.approvalText) {
        const approvalTextWidth = font.widthOfTextAtSize(endorsement.approvalText, 10);
        drawText(endorsement.approvalText, pageWidth - margin - 20 - approvalTextWidth, currentY, 10, false, currentPage);
        currentY -= 18; // Reduced from 30
      }
      
      // Draw signatory text - split into three parts and space horizontally
      if (endorsement?.signatoryText) {
        // Split the signatory text - it's formatted as "Dealing Asstt. Sr. Superintendent, CEC Coordinator, CEC"
        // We need to split it into: "Dealing Asstt.", "Sr. Superintendent, CEC", "Coordinator, CEC"
        const text = endorsement.signatoryText;
        let parts: string[] = [];
        
        // Use regex to match the three distinct parts
        const match = text.match(/(Dealing Asstt\.)\s+(Sr\. Superintendent, CEC)\s+(Coordinator, CEC)/);
        if (match) {
          parts = [match[1], match[2], match[3]];
        } else {
          // Fallback: use default values
          parts = ['Dealing Asstt.', 'Sr. Superintendent, CEC', 'Coordinator, CEC'];
        }
        
        // Calculate spacing - distribute across page width with margins
        const availableWidth = pageWidth - (2 * margin) - 40;
        const partWidth = availableWidth / 3;
        const signatureLineLength = 100;
        
        // Draw signature lines and labels for each part
        for (let i = 0; i < 3; i++) {
          const xPos = margin + 20 + (i * partWidth) + (partWidth / 2) - (signatureLineLength / 2);
          
          // Draw signature line
          currentPage.drawLine({
            start: { x: xPos, y: currentY - 3 },
            end: { x: xPos + signatureLineLength, y: currentY - 3 },
            thickness: 1,
            color: rgb(0, 0, 0),
          });
          
          // Draw label below the line
          if (parts[i]) {
            const labelWidth = font.widthOfTextAtSize(parts[i], 10);
            drawText(parts[i], xPos + (signatureLineLength / 2) - (labelWidth / 2), currentY - 15, 10, false, currentPage);
          }
        }
        
        currentY -= 35; // Move down after all three signatures
      }
      
      // Draw copy to text
      if (endorsement?.copyToText) {
        drawText('Copy after approval to:', startX, currentY, 10, true, currentPage);
        currentY -= 15;
        const copyResult = drawMultilineText(endorsement.copyToText, startX, currentY, contentWidth - 40, 10, currentPage, false);
        currentPage = copyResult.page;
        currentY = copyResult.currentY - 20;
      }
      
      // Draw notes if any
      if (endorsement?.notes) {
        for (const note of endorsement.notes) {
          const noteResult = drawMultilineText(note, startX, currentY, contentWidth - 40, 10, currentPage, false);
          currentPage = noteResult.page;
          currentY = noteResult.currentY - 15;
        }
      }
      
      return { page: currentPage, currentY };
    };

    // Helper function to draw second office endorsement section (for SRIC)
    const drawSecondOfficeEndorsement = (endorsement: FormConfig['secondOfficeEndorsement'], y: number, page: any) => {
      let currentY = y;
      let currentPage = page;
      const startX = margin + 20;
      
      // Draw title (default to "SRIC Office, IIT Roorkee" if not provided)
      const title = endorsement?.title || 'SRIC Office, IIT Roorkee';
      drawText(title, startX, currentY, 10, true, currentPage);
      currentY -= 15; // Reduced from 25
      
      // Draw approval text (right aligned)
      if (endorsement?.approvalText) {
        const approvalTextWidth = font.widthOfTextAtSize(endorsement.approvalText, 10);
        drawText(endorsement.approvalText, pageWidth - margin - 20 - approvalTextWidth, currentY, 10, false, currentPage);
        currentY -= 18; // Reduced from 30
      }
      
      // Draw signatory text - split into three parts and space horizontally
      if (endorsement?.signatoryText) {
        // Split the signatory text - it's formatted as "Supdt. (SRIC - Admn), AR (SRIC-Admn.), Assoc. Dean (SRIC) / Dean (SRIC)"
        // We need to split it into three parts
        const text = endorsement.signatoryText;
        let parts: string[] = [];
        
        // Use regex to match the three distinct parts
        // Pattern: "Supdt. (SRIC - Admn), AR (SRIC-Admn.), Assoc. Dean (SRIC) / Dean (SRIC)"
        const match = text.match(/(Supdt\.\s*\(SRIC\s*-\s*Admn\),)\s+(AR\s*\(SRIC-Admn\.\),)\s+(Assoc\.\s*Dean\s*\(SRIC\)\s*\/\s*Dean\s*\(SRIC\))/);
        if (match) {
          parts = [match[1], match[2], match[3]];
        } else {
          // Fallback: try to split by comma pattern (two commas separate three parts)
          const fallbackMatch = text.match(/([^,]+,\s*)([^,]+,\s*)(.+)/);
          if (fallbackMatch) {
            parts = [fallbackMatch[1].trim(), fallbackMatch[2].trim(), fallbackMatch[3].trim()];
          } else {
            // Default values
            parts = ['Supdt. (SRIC - Admn),', 'AR (SRIC-Admn.),', 'Assoc. Dean (SRIC) / Dean (SRIC)'];
          }
        }
        
        // Calculate spacing - distribute across page width with margins
        const availableWidth = pageWidth - (2 * margin) - 40;
        const partWidth = availableWidth / 3;
        const signatureLineLength = 100;
        
        // Draw signature lines and labels for each part
        for (let i = 0; i < 3; i++) {
          const xPos = margin + 20 + (i * partWidth) + (partWidth / 2) - (signatureLineLength / 2);
          
          // Draw signature line
          currentPage.drawLine({
            start: { x: xPos, y: currentY - 3 },
            end: { x: xPos + signatureLineLength, y: currentY - 3 },
            thickness: 1,
            color: rgb(0, 0, 0),
          });
          
          // Draw label below the line
          if (parts[i]) {
            const labelWidth = font.widthOfTextAtSize(parts[i], 10);
            drawText(parts[i], xPos + (signatureLineLength / 2) - (labelWidth / 2), currentY - 15, 10, false, currentPage);
          }
        }
        
        currentY -= 35; // Move down after all three signatures
      }
      
      return { page: currentPage, currentY };
    };

    // Start with first page
    let currentPage = pdfDoc.addPage([pageWidth, pageHeight]);
    drawPageBorder(currentPage);
    let currentY = pageHeight - margin - 20;
    
    // Flag to track if Coordination Fee notes have been rendered (for coordination fee form)
    let coordinationFeeNotesRendered = false;

    // Header Section - Centered text with proper spacing, no background
    const centerX = pageWidth / 2;
    
    // Try to add IITR Logo at the top left
    try {
      const logoResponse = await fetch('https://d1bm918zlnq37v.cloudfront.net/CECTemp/IIT%20logo.png');
      if (logoResponse.ok) {
        const logoBytes = await logoResponse.arrayBuffer();
        const logoImage = await pdfDoc.embedPng(logoBytes);
        const logoWidth = 60;
        const logoHeight = 60;
        
        // Calculate rectangle dimensions first
        const rectX = margin + 20;
        const rectPaddingHorizontal = 10; // Horizontal padding inside rectangle for logo
        const rectPaddingVertical = 0; // NO vertical padding - rectangle should fit tightly around content
        const topMargin = 10; // Space from page top before rectangle starts (reduced)
        // Calculate logo position: start from top margin, no padding
        const logoY = currentY - topMargin - logoHeight; // Logo positioned below top margin with no padding
        const logoX = rectX + rectPaddingHorizontal; // Logo with padding from left edge of rectangle
        
        // Calculate text position - start after logo with increased gap
        const logoTextGap = 30; // Increased horizontal space between logo and headings
        const textStartX = logoX + logoWidth + logoTextGap;
        const textMaxWidth = pageWidth - textStartX - margin - 20; // Available width for text
        
        // Calculate font sizes to fit in single line
        const titleText = 'CONTINUING EDUCATION CENTRE, IIT ROORKEE';
        let titleFontSize = 14;
        let titleTextWidth = boldFont.widthOfTextAtSize(titleText, titleFontSize);
        // Reduce font size if text is too wide
        while (titleTextWidth > textMaxWidth && titleFontSize > 8) {
          titleFontSize -= 0.5;
          titleTextWidth = boldFont.widthOfTextAtSize(titleText, titleFontSize);
        }
        
        const subtitleText = 'HTTPS://IITR.AC.IN/CEC, CONTD@IITR.AC.IN Ph: 4327';
        let subtitleFontSize = 10;
        let subtitleTextWidth = font.widthOfTextAtSize(subtitleText, subtitleFontSize);
        // Reduce font size if text is too wide
        while (subtitleTextWidth > textMaxWidth && subtitleFontSize > 7) {
          subtitleFontSize -= 0.5;
          subtitleTextWidth = font.widthOfTextAtSize(subtitleText, subtitleFontSize);
        }
        
        // Calculate positions for header text (vertically centered with logo)
        const textGap = 6; // Gap between primary and secondary header
        const logoCenterY = logoY + (logoHeight / 2); // Center of logo
        
        // Primary header (top text) - positioned above center
        const titleY = logoCenterY + (subtitleFontSize / 2) + (textGap / 2);
        // Secondary header (bottom text) - positioned below center
        const subtitleY = logoCenterY - (titleFontSize / 2) - (textGap / 2);
        
        // Calculate actual visual bounds of logo and text (no padding)
        // Logo bounds: bottom at logoY, top at logoY + logoHeight
        const logoTop = logoY + logoHeight;
        const logoBottom = logoY;
        
        // Text bounds: account for font metrics (ascent/descent)
        const titleAscent = titleFontSize * 0.73; // Visual top of title text
        const subtitleDescent = subtitleFontSize * 0.27; // Visual bottom of subtitle text
        const textTop = titleY + titleAscent;
        const textBottom = subtitleY - subtitleDescent;
        
        // Rectangle should tightly wrap both logo and text
        const rectTop = Math.max(logoTop, textTop);
        const rectBottom = Math.min(logoBottom, textBottom);
        const rectY = rectBottom; // Rectangle Y is bottom-left corner
        const rectWidth = pageWidth - (2 * margin) - 40;
        const rectHeight = rectTop - rectBottom; // Exact height with no padding
        
        // Draw dark red background rectangle behind logo and text - only around content
        currentPage.drawRectangle({
          x: rectX,
          y: rectY, // Rectangle positioned to wrap only around logo and text
          width: rectWidth,
          height: rectHeight,
          color: rgb(0.545, 0.0, 0.0), // Dark red color (similar to #8B0000)
        });
        
        // Draw logo on top of the rectangle
        currentPage.drawImage(logoImage, {
          x: logoX,
          y: logoY,
          width: logoWidth,
          height: logoHeight,
        });
        
        // Draw the primary header text in white (on the right)
        currentPage.drawText(titleText, {
          x: textStartX,
          y: titleY,
          size: titleFontSize,
          font: boldFont,
          color: rgb(1, 1, 1), // White color
        });
        
        // Draw the secondary header text in white (below primary, on the right)
        currentPage.drawText(subtitleText, {
          x: textStartX,
          y: subtitleY,
          size: subtitleFontSize,
          font: font,
          color: rgb(1, 1, 1), // White color
        });
        
        currentY = rectY - 20; // Position after header section with consistent padding
        
        const titleResult = drawFormTitle(formConfig.title, currentY, currentPage);
        currentPage = titleResult.page;
        currentY = titleResult.currentY;
        
        if (formConfig.subtitle) {
          drawText(formConfig.subtitle, centerX - (font.widthOfTextAtSize(formConfig.subtitle, 10) / 2), currentY, 10, false, currentPage);
          currentY = currentY - 18; // Reduced from 30
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
          // Align with table/rectangle left border for consistent alignment
          const tableLeftBorder = margin + 20;
          drawText(formName, tableLeftBorder, currentY, 11, true, currentPage);
          currentY = currentY - 18; // Reduced from 30
        }
    } else {
        // No logo - header text only with dark red background (left aligned)
        const textStartX = margin + 20;
        const textMaxWidth = pageWidth - textStartX - margin - 20;
        
        // Calculate font sizes to fit in single line
        const titleText = 'CONTINUING EDUCATION CENTRE, IIT ROORKEE';
        let titleFontSize = 14;
        let titleTextWidth = boldFont.widthOfTextAtSize(titleText, titleFontSize);
        while (titleTextWidth > textMaxWidth && titleFontSize > 8) {
          titleFontSize -= 0.5;
          titleTextWidth = boldFont.widthOfTextAtSize(titleText, titleFontSize);
        }
        
        const subtitleText = 'HTTPS://IITR.AC.IN/CEC, CONTD@IITR.AC.IN Ph: 4327';
        let subtitleFontSize = 10;
        let subtitleTextWidth = font.widthOfTextAtSize(subtitleText, subtitleFontSize);
        while (subtitleTextWidth > textMaxWidth && subtitleFontSize > 7) {
          subtitleFontSize -= 0.5;
          subtitleTextWidth = font.widthOfTextAtSize(subtitleText, subtitleFontSize);
        }
        
        const textGap = 6; // Gap between primary and secondary header
        const topMargin = 10; // Space from page top before rectangle starts (reduced)
        
        // Calculate rectangle dimensions first - tight fit with no padding
        // Total visual height of text: title height + gap + subtitle height
        // Using tighter font metrics to eliminate all visible padding
        const titleAscent = titleFontSize * 0.70; // Reduced from 0.73 for tighter fit
        const subtitleDescent = subtitleFontSize * 0.30; // Increased from 0.27 to capture bottom
        const totalTextHeight = titleAscent + textGap + subtitleFontSize + subtitleDescent;
        
        // Position rectangle from top
        const rectTop = currentY - topMargin;
        const rectBottom = rectTop - totalTextHeight;
        const rectY = rectBottom; // Rectangle Y is bottom-left corner in PDF coordinates
        const rectHeight = totalTextHeight;
        
        // Now position text baselines relative to rectangle
        // Top text baseline: rectangle top - title ascent
        const titleY = rectTop - titleAscent;
        // Bottom text baseline: title baseline - gap - subtitle font size
        const subtitleY = titleY - textGap - subtitleFontSize;
        
        // Draw dark red background rectangle - tightly around text with no padding
        currentPage.drawRectangle({
          x: margin + 20,
          y: rectY,
          width: contentWidth - 40,
          height: rectHeight,
          color: rgb(0.545, 0.0, 0.0), // Dark red color (similar to #8B0000)
        });
        
        // Draw the header text in white (left aligned)
        currentPage.drawText(titleText, {
          x: textStartX,
          y: titleY,
          size: titleFontSize,
          font: boldFont,
          color: rgb(1, 1, 1), // White color
        });
        
        currentPage.drawText(subtitleText, {
          x: textStartX,
          y: subtitleY,
          size: subtitleFontSize,
          font: font,
          color: rgb(1, 1, 1), // White color
        });
        
        currentY = rectY - 20; // Position after header section with consistent padding
        
        const titleResult2 = drawFormTitle(formConfig.title, currentY, currentPage);
        currentPage = titleResult2.page;
        currentY = titleResult2.currentY;
        
        if (formConfig.subtitle) {
          drawText(formConfig.subtitle, centerX - (font.widthOfTextAtSize(formConfig.subtitle, 10) / 2), currentY, 10, false, currentPage);
          currentY = currentY - 18; // Reduced gap before note section
        }
      }
    } catch (error) {
      console.error('Logo loading error:', error);
      // Continue without logo - header text only with dark red background (left aligned)
      const textStartX = margin + 20;
      const textMaxWidth = pageWidth - textStartX - margin - 20;
      
      // Calculate font sizes to fit in single line
      const titleText = 'CONTINUING EDUCATION CENTRE, IIT ROORKEE';
      let titleFontSize = 14;
      let titleTextWidth = boldFont.widthOfTextAtSize(titleText, titleFontSize);
      while (titleTextWidth > textMaxWidth && titleFontSize > 8) {
        titleFontSize -= 0.5;
        titleTextWidth = boldFont.widthOfTextAtSize(titleText, titleFontSize);
      }
      
      const subtitleText = 'HTTPS://IITR.AC.IN/CEC, CONTD@IITR.AC.IN Ph: 4327';
      let subtitleFontSize = 10;
      let subtitleTextWidth = font.widthOfTextAtSize(subtitleText, subtitleFontSize);
      while (subtitleTextWidth > textMaxWidth && subtitleFontSize > 7) {
        subtitleFontSize -= 0.5;
        subtitleTextWidth = font.widthOfTextAtSize(subtitleText, subtitleFontSize);
      }
      
      const textGap = 6; // Gap between primary and secondary header
      const headerHeight = titleFontSize + subtitleFontSize + textGap;
      const headerCenterY = currentY - (headerHeight / 2);
      
      // Primary header (top text)
      const titleY = headerCenterY + (subtitleFontSize / 2) + (textGap / 2);
      // Secondary header (bottom text)
      const subtitleY = headerCenterY - (titleFontSize / 2) - (textGap / 2);
      
      // Draw dark red background rectangle - only around text, with space at top of page
      const topMargin = 40; // Space from page top before rectangle starts
      const rectY = currentY - headerHeight - 10 - topMargin; // Position below top margin, wrap around text
      currentPage.drawRectangle({
        x: margin + 20,
        y: rectY,
        width: contentWidth - 40,
        height: headerHeight + 20,
        color: rgb(0.545, 0.0, 0.0), // Dark red color (similar to #8B0000)
      });
      
      // Draw the header text in white (left aligned)
      currentPage.drawText(titleText, {
        x: textStartX,
        y: titleY,
        size: titleFontSize,
        font: boldFont,
        color: rgb(1, 1, 1), // White color
      });
      
      currentPage.drawText(subtitleText, {
        x: textStartX,
        y: subtitleY,
        size: subtitleFontSize,
        font: font,
        color: rgb(1, 1, 1), // White color
      });
      
      currentY = rectY - 20; // Position after header section with consistent padding
      
      const titleResult3 = drawFormTitle(formConfig.title, currentY, currentPage);
      currentPage = titleResult3.page;
      currentY = titleResult3.currentY;
      
      if (formConfig.subtitle) {
        drawText(formConfig.subtitle, centerX - (font.widthOfTextAtSize(formConfig.subtitle, 10) / 2), currentY, 10, false, currentPage);
        currentY = currentY - 30;
      }
    }



    // Process form fields based on configuration
    console.log('Processing form:', formConfig.title, 'Total fields:', formConfig.fields.length);
    
    // Helper function to process a single field with error handling
    const processFieldWithErrorHandling = async (fieldIndex: number, field: FormField) => {
      try {
        if (!formConfig) {
          throw new Error('formConfig is undefined in helper function');
        }
        if (typeof currentPage === 'undefined' || typeof currentY === 'undefined') {
          throw new Error(`currentPage or currentY is undefined. currentPage: ${typeof currentPage}, currentY: ${typeof currentY}`);
        }
        if (typeof checkNewPage !== 'function') {
          throw new Error('checkNewPage is not a function');
        }
        const pageResult = checkNewPage(currentY, 60, currentPage);
        currentPage = pageResult.page;
        currentY = pageResult.currentY;
        
        // Check if this is coordination fee form (defined once for reuse)
        const isCoordinationFeeForm = formConfig.title && (
          formConfig.title.toLowerCase().includes('coordination fee') ||
          formConfig.title.toLowerCase().includes('course closure')
        );
        
        // Debug: Log coordination fee field and check if it's being processed
        if (isCoordinationFeeForm && (fieldIndex === 22 || fieldIndex === 23)) {
          console.log('Field at index', fieldIndex, ':', field.label, 'Type:', field.type);
        }
        if (field.label && (field.label.includes("Coordination fee") || field.label.includes("coordination fee"))) {
          console.log('Found coordination fee field at index', fieldIndex, ':', field.label, 'Value:', field.value);
        }
        
        if (field.type === 'text') {
          // Skip Designation and Deptt./Centre fields after Course Coordinator as they're handled in special section
          if (fieldIndex > 0 && fieldIndex <= 3) {
            const courseCoordField = formConfig.fields[0];
            // Check for open participation form structure
            if (courseCoordField && courseCoordField.label === '1. Name of the Course Coordinator/PI:') {
              if (field.label === 'Designation:' || field.label === 'Deptt./Centre:') {
                return; // Skip these fields as they're already processed
              }
            }
            // Check for sponsored form structure
            if (courseCoordField && courseCoordField.label === '1. Course Coordinator/PI Details:') {
              // For sponsored form, skip "Name of the Course Coordinator/PI:" if it's already processed
              // and skip Designation/Deptt./Centre
              if (field.label === 'Name of the Course Coordinator/PI:' && fieldIndex === 1) {
                // This will be handled by the special section, but we need to check if it's a subfield
                // Actually, let it process normally in the special section handler
              } else if (field.label === 'Designation:' || field.label === 'Deptt./Centre:') {
                return; // Skip these fields as they're already processed
              }
            }
          }
          
          // Skip "Budget Details:" for course opening form as it's handled as a table
          const isCourseOpeningForm = formConfig.title && (
            formConfig.title.toLowerCase().includes('course opening') ||
            formConfig.title.toLowerCase().includes('actual budget')
          );
          if (isCourseOpeningForm && field.label && field.label === 'Budget Details:') {
            // Render the budget details table
            if (formConfig.tables && formConfig.tables.length > 0) {
              const budgetTable = formConfig.tables.find((t: any) => t.label === 'Budget Details:');
              if (budgetTable) {
                try {
                  ({ page: currentPage, currentY } = checkNewPage(currentY, 50, currentPage));
                  const tableResult = drawTable(budgetTable.data, currentY, currentPage, budgetTable.label, true, 10, 11, true);
                  currentPage = tableResult.page;
                  // Add extra spacing after the table to separate it from any following content
                  currentY = tableResult.currentY - 15;
                  return; // Skip normal field processing
                } catch (tableError) {
                  console.error('Error rendering budget details table:', tableError);
                }
              }
            }
          }
          
          // Skip expense fields for course opening form as they're now in the table
          if (isCourseOpeningForm && field.label && (
            field.label === '7. Expenses (E) : As per actuals:' ||
            field.label === '8. Amount for Honorarium to instructors/experts:'
          )) {
            return; // Skip these fields as they're in the table
          }
          
          // Skip "Budget Details:" for revised budget form as it's handled as a table
          const isRevisedBudgetForm = formConfig.title && (
            formConfig.title.toLowerCase().includes('revised budget')
          );
          if (isRevisedBudgetForm && field.label && field.label === 'Budget Details:') {
            // Render the budget details table
            if (formConfig.tables && formConfig.tables.length > 0) {
              const budgetTable = formConfig.tables.find((t: any) => t.label === 'Budget Details:');
              if (budgetTable) {
                try {
                  ({ page: currentPage, currentY } = checkNewPage(currentY, 50, currentPage));
                  const tableResult = drawTable(budgetTable.data, currentY, currentPage, budgetTable.label, true, 10, 11, true);
                  currentPage = tableResult.page;
                  // Add extra spacing after the table to separate it from any following content
                  currentY = tableResult.currentY - 15;
                  return; // Skip normal field processing
                } catch (tableError) {
                  console.error('Error rendering budget details table:', tableError);
                }
              }
            }
          }
          
          // Skip expense fields for revised budget form as they're now in the table
          if (isRevisedBudgetForm && field.label && (
            field.label === '7. Expenses (E) : As per actuals:' ||
            field.label === '8. Amount for Honorarium to instructors/experts:'
          )) {
            return; // Skip these fields as they're in the table
          }
          
          // Skip "Invoice Details:" for course invoice generation forms (open and sponsored) as they're handled as tables
          const isInvoiceGenerationOpenForm = formConfig.title && (
            formConfig.title.toLowerCase().includes('invoice generation') &&
            formConfig.title.toLowerCase().includes('open')
          );
          const isInvoiceGenerationSponsoredForm = formConfig.title && (
            formConfig.title.toLowerCase().includes('invoice generation') &&
            formConfig.title.toLowerCase().includes('sponsored')
          );
          if ((isInvoiceGenerationOpenForm || isInvoiceGenerationSponsoredForm) && field.label && field.label === 'Invoice Details:') {
            // Render the invoice details table
            if (formConfig.tables && formConfig.tables.length > 0) {
              const invoiceTable = formConfig.tables.find((t: any) => t.label === '' || !t.label);
              if (invoiceTable) {
                try {
                  // Debug: Log table data
                  console.log('Invoice table data:', JSON.stringify(invoiceTable.data, null, 2));
                  console.log('Number of rows:', invoiceTable.data.rows?.length);
                  
                  ({ page: currentPage, currentY } = checkNewPage(currentY, 50, currentPage));
                  // Render table without label (empty label)
                  const tableResult = drawTable(invoiceTable.data, currentY, currentPage, undefined, true, 11, 11, true);
                  currentPage = tableResult.page;
                  // Add extra spacing after the table to separate it from any following content
                  currentY = tableResult.currentY - 15;
                  return; // Skip normal field processing
                } catch (tableError) {
                  console.error('Error rendering invoice details table:', tableError);
                  console.error('Table data:', JSON.stringify(invoiceTable, null, 2));
                }
              } else {
                console.error('Invoice table not found. Available tables:', formConfig.tables?.map((t: any) => t.label));
              }
            } else {
              console.error('No tables found in formConfig');
            }
          }
          
          // Skip "9. Duration:", "13. Course Fee Per participant:", and "16. IITR Receipts as per MoU:" 
          // as they're handled in special sections with horizontal subfields (checked later in code)
          if ((field.label && field.label.includes('9. Duration:')) ||
              (field.label && field.label.includes('13. Course Fee Per participant:')) ||
              (field.label && field.label.includes('16. IITR Receipts as per MoU:'))) {
            // Don't skip here - let special handlers process them, they will use continue
          }
          
          // Special handling for course extension form headings (no input fields)
          const isCourseExtensionFormHeading = formConfig.title && (
            formConfig.title.toLowerCase().includes('course extension') ||
            formConfig.title.toLowerCase().includes('extension of time / revision of project amount')
          );
          
          if (isCourseExtensionFormHeading && field.label && (
            field.label === '5. Extension of Time: Expected date of completion' ||
            field.label === '6. Revision of Project budget : Contracted Amount :- Nil'
          )) {
            // Render as heading without input field, using aligned positions like other numbered sections
            try {
              ({ page: currentPage, currentY } = checkNewPage(currentY, 30, currentPage));
              // Use aligned label drawing to match other numbered section headings
              drawAlignedLabel(field.label || '', currentY, currentPage, 11, true);
              // Add spacing between main section and subsections
              currentY -= 20;
              
              // Get the next two fields (a) and (b) to render horizontally
              if (fieldIndex + 1 < formConfig.fields.length &&
                  fieldIndex + 2 < formConfig.fields.length) {
                const firstField = formConfig.fields[fieldIndex + 1];
                const secondField = formConfig.fields[fieldIndex + 2];
                
                // Check if these are the (a) and (b) fields
                if (firstField && secondField &&
                    ((firstField.label === '(a) Original' && secondField.label === '(b) Revised') ||
                     (firstField.label === '(a) Original (Rs.)' && secondField.label === '(b) Revised (Rs.)'))) {
                  
                  ({ page: currentPage, currentY } = checkNewPage(currentY, 20, currentPage));
                  
                  // Use aligned textX position for subfields - align with main section text
                  const { textX } = getAlignedPositions(11, true);
                  const startX = textX; // Align subsection text with main section text
                  const fieldWidth = (pageWidth - 2 * margin - 40) / 2; // Divide available width by 2
                  
                  // Field 1: (a) Original or (a) Original (Rs.)
                  const firstLabel = firstField.label || '';
                  const firstValue = firstField.value || '';
                  const firstLabelWidth = font.widthOfTextAtSize(firstLabel, 11);
                  drawText(firstLabel, startX, currentY, 11, false, currentPage);
                  drawText(firstValue, startX + firstLabelWidth + 10, currentY, 11, false, currentPage);
                  
                  // Field 2: (b) Revised or (b) Revised (Rs.)
                  const secondLabel = secondField.label || '';
                  const secondValue = secondField.value || '';
                  const secondLabelWidth = font.widthOfTextAtSize(secondLabel, 11);
                  const secondX = startX + fieldWidth;
                  drawText(secondLabel, secondX, currentY, 11, false, currentPage);
                  drawText(secondValue, secondX + secondLabelWidth + 10, currentY, 11, false, currentPage);
                  
                  // Add spacing after subsections before next section
                  currentY -= 20;
                  
                  // Skip the 2 subfields in normal processing - we'll handle this by checking fieldIndex
                  
                  // If this is section 6, also render the budget heading and budget fields
                  if (field.label === '6. Revision of Project budget : Contracted Amount :- Nil') {
                    // Render the budget heading
                    if (formConfig.plainTextSections && formConfig.plainTextSections.length > 0) {
                      const headingSection = formConfig.plainTextSections[0];
                      if (headingSection && headingSection.title && headingSection.title.includes('Budget Head / Description & Revised Budgeted Amount')) {
                        try {
                          ({ page: currentPage, currentY } = checkNewPage(currentY, 50, currentPage));
                          
                          // Create table data for budget fields
                          const budgetFields = [
                            { label: "Gross Amount including Service Tax" },
                            { label: "Less- Service Tax" },
                            { label: "Contracted Amount" },
                            { label: "Institute Share (20% of Contracted Amount)" },
                            { label: "Expenditure (Estimated*)" },
                            { label: "Honorarium (Estimated)" }
                          ];
                          
                          // Build table rows with descriptions and values
                          const tableRows: string[][] = [];
                          for (const budgetField of budgetFields) {
                            const budgetFieldData = formConfig.fields.find((f: any) => f.label === budgetField.label);
                            const value = budgetFieldData ? (budgetFieldData.value || '') : '';
                            tableRows.push([budgetField.label, value]);
                          }
                          
                          // Create table structure
                          const budgetTableData: TableData = {
                            columns: [
                              { header: "Budget Head / Description", width: 380 },
                              { header: "Revised Budgeted Amount", width: 150 }
                            ],
                            rows: tableRows
                          };
                          
                          // Draw the table
                          const tableResult = drawTable(budgetTableData, currentY, currentPage, undefined, false, 10, 11, true);
                          currentPage = tableResult.page;
                          currentY = tableResult.currentY - 15;
                          
                          // Add sections after the budget table
                          try {
                            // 1. Reason for Extension field
                            const reasonField = formConfig.fields.find((f: any) => 
                              f.label && f.label.includes('Reason for Extension of Time')
                            );
                            if (reasonField) {
                              ({ page: currentPage, currentY } = checkNewPage(currentY, 30, currentPage));
                              // Draw label with wrapping
                              const reasonLabel = reasonField.label || '';
                              const maxWidth = contentWidth - 40;
                              const labelResult = drawMultilineText(reasonLabel, margin + 20, currentY, maxWidth, 11, currentPage, true, false);
                              currentPage = labelResult.page;
                              currentY = labelResult.currentY - 5;
                              
                              // Draw value with underline - only draw lines with actual text
                              const reasonValue = reasonField.value || '';
                              
                              if (reasonValue && reasonValue.trim().length > 0) {
                                // Clean the text: remove ALL newlines and normalize whitespace
                                const cleanedValue = reasonValue.trim().replace(/\r\n/g, ' ').replace(/\r/g, ' ').replace(/\n/g, ' ').replace(/\s+/g, ' ');
                                // Use drawMultilineText with underline to handle wrapping correctly - only draws lines with text
                                const multilineResult = drawMultilineText(cleanedValue, margin + 20, currentY, maxWidth, 11, currentPage, false, true);
                                currentPage = multilineResult.page;
                                currentY = multilineResult.currentY - 5; // Minimal spacing
                              } else {
                                // No value - draw one blank line with underline
                                const underlineLength = maxWidth;
                                const underlineY = currentY - 3;
                                currentPage.drawLine({
                                  start: { x: margin + 20, y: underlineY },
                                  end: { x: margin + 20 + underlineLength, y: underlineY },
                                  thickness: 0.5,
                                  color: rgb(0, 0, 0),
                                });
                                currentY -= 20;
                              }
                            }
                            
                            // 2. Signature of Principal Investigator
                            ({ page: currentPage, currentY } = checkNewPage(currentY, 30, currentPage));
                            const piSignatureLabel = 'Signature of Principal Investigator (with date)';
                            drawText(piSignatureLabel, margin + 20, currentY, 11, false, currentPage);
                            currentY -= 35;
                            
                            // 3. CEC Office heading (smaller text, not big)
                            ({ page: currentPage, currentY } = checkNewPage(currentY, 15, currentPage));
                            const cecHeading = 'CEC Office, IIT Roorkee';
                            const cecHeadingWidth = font.widthOfTextAtSize(cecHeading, 11);
                            const cecHeadingX = centerX - (cecHeadingWidth / 2);
                            drawText(cecHeading, cecHeadingX, currentY, 11, true, currentPage);
                            currentY -= 15;
                            
                            // 4. Recommended/Not Recommended (right aligned)
                            ({ page: currentPage, currentY } = checkNewPage(currentY, 15, currentPage));
                            const recommendedText = 'Recommended/Not Recommended';
                            const recommendedTextWidth = font.widthOfTextAtSize(recommendedText, 11);
                            const recommendedTextX = pageWidth - margin - 20 - recommendedTextWidth;
                            drawText(recommendedText, recommendedTextX, currentY, 11, false, currentPage);
                            currentY -= 25;
                            
                            // 5. CEC signatures horizontally aligned (3 signatures)
                            // Evenly space them in three columns within the content area
                            ({ page: currentPage, currentY } = checkNewPage(currentY, 40, currentPage));
                            const cecSignatures = [
                              'Dealing Asstt',
                              'Superintendent, CEC',
                              'Coordinator, CEC'
                            ];
                            {
                              const startX = margin + 20;
                              const availableWidth = contentWidth - 40;
                              const slotWidth = availableWidth / 3;
                              const lineLength = 110;
                              
                              for (let i = 0; i < cecSignatures.length; i++) {
                                const sigLabel = cecSignatures[i];
                                const sigLabelWidth = font.widthOfTextAtSize(sigLabel, 10);
                                const slotCenter = startX + slotWidth * (i + 0.5);
                                const sigX = slotCenter - (sigLabelWidth / 2);
                                
                                drawText(sigLabel, sigX, currentY, 10, false, currentPage);
                                
                                // Draw signature line centered under the slot
                                const lineStartX = slotCenter - (lineLength / 2);
                                const lineEndX = slotCenter + (lineLength / 2);
                                currentPage.drawLine({
                                  start: { x: lineStartX, y: currentY - 15 },
                                  end: { x: lineEndX, y: currentY - 15 },
                                  thickness: 0.5,
                                  color: rgb(0, 0, 0),
                                });
                              }
                            }
                            currentY -= 30;
                            
                            // 6. SRIC Office heading (smaller text, not big)
                            ({ page: currentPage, currentY } = checkNewPage(currentY, 20, currentPage));
                            const sricHeading = 'SRIC Office, IIT Roorkee';
                            const sricHeadingWidth = font.widthOfTextAtSize(sricHeading, 11);
                            const sricHeadingX = centerX - (sricHeadingWidth / 2);
                            drawText(sricHeading, sricHeadingX, currentY, 11, true, currentPage);
                            currentY -= 15;
                            
                            // 7. Approved/Not Approved (right aligned)
                            ({ page: currentPage, currentY } = checkNewPage(currentY, 15, currentPage));
                            const approvedText = 'Approved /Not Approved';
                            const approvedTextWidth = font.widthOfTextAtSize(approvedText, 11);
                            const approvedTextX = pageWidth - margin - 20 - approvedTextWidth;
                            drawText(approvedText, approvedTextX, currentY, 11, false, currentPage);
                            currentY -= 25;
                            
                            // 8. SRIC signatures horizontally aligned (3 signatures)
                            // Evenly space them in three columns within the content area
                            ({ page: currentPage, currentY } = checkNewPage(currentY, 40, currentPage));
                            const sricSignatures = [
                              'Supdt. (SRIC – Admn)',
                              'AR/DR (SRIC-Admn.)',
                              'Assoc. Dean (SRIC) / Dean (SRIC)'
                            ];
                            {
                              const startX = margin + 20;
                              const availableWidth = contentWidth - 40;
                              const slotWidth = availableWidth / 3;
                              const lineLength = 110;
                              
                              for (let i = 0; i < sricSignatures.length; i++) {
                                const sigLabel = sricSignatures[i];
                                const sigLabelWidth = font.widthOfTextAtSize(sigLabel, 10);
                                const slotCenter = startX + slotWidth * (i + 0.5);
                                const sigX = slotCenter - (sigLabelWidth / 2);
                                
                                drawText(sigLabel, sigX, currentY, 10, false, currentPage);
                                
                                // Draw signature line centered under the slot
                                const lineStartX = slotCenter - (lineLength / 2);
                                const lineEndX = slotCenter + (lineLength / 2);
                                currentPage.drawLine({
                                  start: { x: lineStartX, y: currentY - 15 },
                                  end: { x: lineEndX, y: currentY - 15 },
                                  thickness: 0.5,
                                  color: rgb(0, 0, 0),
                                });
                              }
                            }
                            currentY -= 20;
                          } catch (sectionError) {
                            console.error('Error rendering sections after table:', sectionError);
                            currentY -= 30;
                          }
                        } catch (budgetError) {
                          console.error('Error rendering budget fields:', budgetError);
                          currentY -= 30;
                        }
                      }
                    }
                  }
                }
              }
            } catch (headingError) {
              console.error('Error rendering heading field:', headingError);
              currentY -= 18; // Reduced from 30
            }
            return; // Skip normal field rendering
          }
          
          // Skip course extension form (a) and (b) subfields as they're handled horizontally with their headings
          if (isCourseExtensionFormHeading && (
            field.label === '(a) Original' ||
            field.label === '(b) Revised' ||
            field.label === '(a) Original (Rs.)' ||
            field.label === '(b) Revised (Rs.)'
          )) {
            return; // Skip these fields as they're already processed horizontally with their headings
          }
          
          // Check if this is the informational field about 18,000/- (no input needed)
          if (field.label && field.label.includes('amount to be transferred if per hour rate is more than Rs. 18,000')) {
            // Render as plain text without input field
            try {
              ({ page: currentPage, currentY } = checkNewPage(currentY, 50, currentPage));
              const infoResult = drawMultilineText(field.label || '', margin + 20, currentY, contentWidth - 40, 10, currentPage, false);
              currentPage = infoResult.page;
              currentY = infoResult.currentY - 12; // Reduced from 20
            } catch (infoError) {
              console.error('Error rendering informational field:', infoError);
              currentY -= 18; // Reduced from 30
            }
          } else if (field.label && field.label === 'BILL VERIFIED') {
            // Render BILL VERIFIED as a heading without input field
            try {
              ({ page: currentPage, currentY } = checkNewPage(currentY, 50, currentPage));
              drawText(field.label || '', margin + 20, currentY, 12, true, currentPage);
              currentY -= 18; // Reduced from 30
            } catch (headingError) {
              console.error('Error rendering BILL VERIFIED heading:', headingError);
              currentY -= 18; // Reduced from 30
            }
          } else if ((field.label === 'Signature' || field.label === 'Signature of Course Coordinator') && 
                     fieldIndex + 1 < formConfig.fields.length && 
                     (formConfig.fields[fieldIndex + 1].label === 'Signature' || formConfig.fields[fieldIndex + 1].label === 'Signature of Course Coordinator')) {
            // Render Signature of Course Coordinator (left) and Signature (right) horizontally without underlines
            try {
              ({ page: currentPage, currentY } = checkNewPage(currentY, 60, currentPage));
              const nextField = formConfig.fields[fieldIndex + 1];
              
              // Determine which field is which
              let leftField, rightField;
              if (field.label === 'Signature of Course Coordinator') {
                leftField = field;
                rightField = nextField;
              } else {
                // If Signature comes first, swap them
                leftField = nextField;
                rightField = field;
              }
              
              // Left side: Signature of Course Coordinator (no underline)
              const leftLabel = leftField.label || '';
              drawText(leftLabel, margin + 20, currentY, 12, true, currentPage);
              // The signature will be filled physically above, so we just show the label
              
              // Right side: Signature (no underline) - align more to the right
              const rightLabel = rightField.label || '';
              const rightStartX = pageWidth - margin - 20 - boldFont.widthOfTextAtSize(rightLabel, 12); // Align to the right side
              drawText(rightLabel, rightStartX, currentY, 12, true, currentPage);
              // The signature will be filled physically above, so we just show the label
              
              currentY -= 18;
              fieldIndex++; // Skip the next field since we've already processed it
              
              // After signature section in remuneration form, render payment details table
              const isRemunerationForm = formConfig.title && (
                formConfig.title.includes('Remuneration/Honorarium') || 
                formConfig.title.includes('Remuneration') ||
                formConfig.title.includes('Honorarium')
              );
              if (isRemunerationForm && formConfig.tables && formConfig.tables.length > 2) {
                const paymentTable = formConfig.tables[2];
                // Check if this is the payment details table (has "Passed for Payment" in first row)
                if (paymentTable && paymentTable.data && paymentTable.data.rows && 
                    paymentTable.data.rows.length > 0 &&
                    paymentTable.data.rows[0][0] && 
                    paymentTable.data.rows[0][0].includes('Passed for Payment')) {
                  try {
                    ({ page: currentPage, currentY } = checkNewPage(currentY, 150, currentPage));
                    // Render the payment details table with font size 10
                    const paymentTableResult = drawTable(paymentTable.data, currentY, currentPage, paymentTable.label || "", false, 10);
                    currentPage = paymentTableResult.page;
                    currentY = paymentTableResult.currentY - 20;
                    
                    // After payment table, render Date, Asstt/Supdt., Coordinator, CEC horizontally
                    const dateField = formConfig.fields.find((f: any) => f.label && f.label === 'Date');
                    const assttField = formConfig.fields.find((f: any) => f.label && f.label.includes('Asstt/Supdt'));
                    const coordinatorField = formConfig.fields.find((f: any) => f.label && f.label === 'Coordinator, CEC');
                    
                    if (dateField || assttField || coordinatorField) {
                      ({ page: currentPage, currentY } = checkNewPage(currentY, 30, currentPage));
                      const fieldsToRender = [
                        { field: dateField, label: dateField?.label || 'Date' },
                        { field: assttField, label: assttField?.label || 'Asstt/Supdt.' },
                        { field: coordinatorField, label: coordinatorField?.label || 'Coordinator, CEC' }
                      ].filter(item => item.field);
                      
                      if (fieldsToRender.length > 0) {
                        const startX = margin + 20; // Start from left margin
                        const availableWidth = pageWidth - (2 * margin) - 40;
                        const spacing = availableWidth / fieldsToRender.length;
                        let currentX = startX;
                        
                        for (const item of fieldsToRender) {
                          const labelText = item.label + (item.field?.value ? ` : ${item.field.value}` : ' :');
                          drawText(labelText, currentX, currentY, 10, true, currentPage);
                          currentX += spacing;
                        }
                        currentY -= 40; // Increased spacing before "For Office Use" section
                      }
                    }
                  } catch (paymentTableError: any) {
                    console.error('Error rendering payment details table after signature:', paymentTableError?.message || paymentTableError);
                    currentY -= 100;
                  }
                }
              }
            } catch (signatureError) {
              console.error('Error rendering signature fields horizontally:', signatureError);
              currentY -= 18;
            }
          } else if (field.label && field.label === '1. Name of the Course Coordinator/PI:') {
            // Special handling for Course Coordinator section (open participation form) - align Designation and Deptt./Centre horizontally
            // Normalize vertical spacing so this section matches the rest of the form
            try {
              ({ page: currentPage, currentY } = checkNewPage(currentY, 40, currentPage));
              
              // Draw the Name field normally
              currentY = drawFormField(
                field.label || '', 
                field.value || '', 
                currentY, 
                currentPage, 
                field.fontSize || 10, 
                field.fontSize || 10, 
                field.isBold !== false
              );
              
              // Add a bit of extra space before the subsections so the main field
              // and its subfields are visually separated
              currentY -= 6;
              
              // Check if next two fields are Designation and Deptt./Centre
              if (fieldIndex + 1 < formConfig.fields.length && 
                  fieldIndex + 2 < formConfig.fields.length) {
                const designationField = formConfig.fields[fieldIndex + 1];
                const deptField = formConfig.fields[fieldIndex + 2];
                
                if (designationField.label === 'Designation:' && 
                    deptField.label === 'Deptt./Centre:') {
                  
                  ({ page: currentPage, currentY } = checkNewPage(currentY, 20, currentPage));
                  
                  // Align subsection text content with main section text
                  const { textX } = getAlignedPositions(11, true);
                  const leftStartX = textX; // Align subsection text content with main section text
                  const rightStartX = pageWidth / 2 + 20; // Start from middle of page
                  
                  // Left column: Designation
                  const designationLabel = designationField.label || '';
                  const designationValue = designationField.value || '';
                  const designationLabelWidth = font.widthOfTextAtSize(designationLabel, 10);
                  // Render Designation label in 10 pt, non-bold
                  drawText(designationLabel, leftStartX, currentY, 10, false, currentPage);
                  drawText(designationValue, leftStartX + designationLabelWidth + 10, currentY, 10, false, currentPage);
                  
                  // Right column: Deptt./Centre
                  const deptLabel = deptField.label || '';
                  const deptValue = deptField.value || '';
                  const deptLabelWidth = font.widthOfTextAtSize(deptLabel, 10);
                  // Render Deptt./Centre label in 10 pt, non-bold
                  drawText(deptLabel, rightStartX, currentY, 10, false, currentPage);
                  drawText(deptValue, rightStartX + deptLabelWidth + 10, currentY, 10, false, currentPage);
                  
                  // Slightly increased spacing after this row for readability,
                  // but still close to the global rhythm used elsewhere.
                  currentY -= 14;
                }
              }
              
            } catch (coordError) {
              console.error('Error rendering course coordinator section:', coordError);
              // Fallback to normal rendering
              currentY = drawFormField(
                field.label || '', 
                field.value || '', 
                currentY, 
                currentPage, 
                field.fontSize || 10, 
                field.fontSize || 10, 
                field.isBold !== false
              );
            }
          } else if (field.label && field.label === '1. Course Coordinator/PI Details:') {
            // Special handling for Course Coordinator section header (sponsored form) - process Name, Designation, and Deptt./Centre
            try {
              ({ page: currentPage, currentY } = checkNewPage(currentY, 50, currentPage));
              
              // Draw the section header with proper alignment
              drawAlignedLabel(field.label || '', currentY, currentPage, 10, true);
              currentY -= 20; // Spacing after header
              
              // Check if next fields are Name, Designation, and Deptt./Centre
              if (fieldIndex + 1 < formConfig.fields.length && 
                  fieldIndex + 2 < formConfig.fields.length &&
                  fieldIndex + 3 < formConfig.fields.length) {
                const nameField = formConfig.fields[fieldIndex + 1];
                const designationField = formConfig.fields[fieldIndex + 2];
                const deptField = formConfig.fields[fieldIndex + 3];
                
                if (nameField.label === 'Name of the Course Coordinator/PI:' &&
                    designationField.label === 'Designation:' && 
                    deptField.label === 'Deptt./Centre:') {
                  
                  // Draw Name field
                  currentY = drawFormField(
                    nameField.label || '', 
                    nameField.value || '', 
                    currentY, 
                    currentPage, 
                    nameField.fontSize || 10, 
                    nameField.fontSize || 10, 
                    nameField.isBold !== false
                  );
                  
                  // Add extra spacing after the name field
                  currentY -= 8;
                  
                  ({ page: currentPage, currentY } = checkNewPage(currentY, 20, currentPage));
                  
                  // Align subsection text content with main section text
                  const { textX } = getAlignedPositions(11, true);
                  const leftStartX = textX; // Align subsection text content with main section text
                  const rightStartX = pageWidth / 2 + 20; // Start from middle of page
                  
                  // Left column: Designation
                  const designationLabel = designationField.label || '';
                  const designationValue = designationField.value || '';
                  const designationLabelWidth = font.widthOfTextAtSize(designationLabel, 10);
                  // Render Designation label at 10 pt, non-bold
                  drawText(designationLabel, leftStartX, currentY, 10, false, currentPage);
                  drawText(designationValue, leftStartX + designationLabelWidth + 10, currentY, 10, false, currentPage);
                  
                  // Right column: Deptt./Centre
                  const deptLabel = deptField.label || '';
                  const deptValue = deptField.value || '';
                  const deptLabelWidth = font.widthOfTextAtSize(deptLabel, 10);
                  // Render Deptt./Centre label at 10 pt, non-bold
                  drawText(deptLabel, rightStartX, currentY, 10, false, currentPage);
                  drawText(deptValue, rightStartX + deptLabelWidth + 10, currentY, 10, false, currentPage);
                  
                  // Slightly larger spacing after this row to separate from next section
                  currentY -= 16;
                }
              }
              
            } catch (coordError) {
              console.error('Error rendering course coordinator section:', coordError);
            }
          } else if (field.label && field.label === 'Name of the Course Coordinator/PI:') {
            // Special handling for Course Coordinator section (sponsored form) - align Designation and Deptt./Centre horizontally
            try {
              ({ page: currentPage, currentY } = checkNewPage(currentY, 50, currentPage));
              
              // Draw the Name field normally
              currentY = drawFormField(
                field.label || '', 
                field.value || '', 
                currentY, 
                currentPage, 
                field.fontSize || 10, 
                field.fontSize || 10, 
                field.isBold !== false
              );
              
              // Add extra spacing after the main field
              currentY -= 8;
              
              // Check if next two fields are Designation and Deptt./Centre
              if (fieldIndex + 1 < formConfig.fields.length && 
                  fieldIndex + 2 < formConfig.fields.length) {
                const designationField = formConfig.fields[fieldIndex + 1];
                const deptField = formConfig.fields[fieldIndex + 2];
                
                if (designationField.label === 'Designation:' && 
                    deptField.label === 'Deptt./Centre:') {
                  
                  ({ page: currentPage, currentY } = checkNewPage(currentY, 20, currentPage));
                  
                  // Align subsection text content with main section text
                  const { textX } = getAlignedPositions(11, true);
                  const leftStartX = textX; // Align subsection text content with main section text
                  const rightStartX = pageWidth / 2 + 20; // Start from middle of page
                  
                  // Left column: Designation
                  const designationLabel = designationField.label || '';
                  const designationValue = designationField.value || '';
                  const designationLabelWidth = font.widthOfTextAtSize(designationLabel, 11);
                  drawText(designationLabel, leftStartX, currentY, 11, true, currentPage);
                  drawText(designationValue, leftStartX + designationLabelWidth + 10, currentY, 11, false, currentPage);
                  
                  // Right column: Deptt./Centre
                  const deptLabel = deptField.label || '';
                  const deptValue = deptField.value || '';
                  const deptLabelWidth = font.widthOfTextAtSize(deptLabel, 11);
                  drawText(deptLabel, rightStartX, currentY, 11, true, currentPage);
                  drawText(deptValue, rightStartX + deptLabelWidth + 10, currentY, 11, false, currentPage);
                  
                  currentY -= 10; // Spacing after this row
                }
              }
              
            } catch (coordError) {
              console.error('Error rendering course coordinator section:', coordError);
              // Fallback to normal rendering
              currentY = drawFormField(
                field.label || '', 
                field.value || '', 
                currentY, 
                currentPage, 
                field.fontSize || 10, 
                field.fontSize || 10, 
                field.isBold !== false
              );
            }
          } else if (field.label && (field.label === '2. Co-coordinator (I)/Co-PI, if any:' || field.label === 'Co-coordinator (I)/Co-PI, if any:')) {
            // Special handling for Co-coordinator section - render in two-column layout
            // Normalize vertical spacing so this block matches the rest of the form
            try {
              ({ page: currentPage, currentY } = checkNewPage(currentY, 70, currentPage));
              
              // Draw the section header with proper alignment
              drawAlignedLabel(field.label || '', currentY, currentPage, 10, true);
              currentY -= 14; // Consistent spacing after header
              
              // Process both co-coordinators (i) and (ii)
              // Determine if this is sponsored form (no "2." prefix) or open participation form
              const isSponsoredForm = !field.label.includes('2.');
              // For sponsored: (i) starts at +1, (ii) at +5 (both relative to header at fieldIndex)
              // For open participation: (i) starts at +1, (ii) at +5 (both relative to header at fieldIndex)
              for (let coordNum = 1; coordNum <= 2; coordNum++) {
                const coordPrefix = coordNum === 1 ? '(i)' : '(ii)';
                const nameIndex = fieldIndex + (coordNum === 1 ? 1 : 5); // (i) starts at +1, (ii) at +5
                const designationIndex = nameIndex + 1;
                const deptIndex = nameIndex + 2;
                const signatureIndex = nameIndex + 3;
                
                // Check if we have all required fields
                if (nameIndex < formConfig.fields.length && 
                    designationIndex < formConfig.fields.length &&
                    deptIndex < formConfig.fields.length &&
                    signatureIndex < formConfig.fields.length) {
                  
                  const nameField = formConfig.fields[nameIndex];
                  const designationField = formConfig.fields[designationIndex];
                  const deptField = formConfig.fields[deptIndex];
                  const signatureField = formConfig.fields[signatureIndex];
                  
                  // Verify these are the correct fields (signature is optional for sponsored form)
                  if (nameField.label && nameField.label.includes(coordPrefix) &&
                      designationField.label === 'Designation:' &&
                      deptField.label === 'Deptt./Centre:' &&
                      (!signatureField || signatureField.label === 'Signature:')) {
                    
                    ({ page: currentPage, currentY } = checkNewPage(currentY, 30, currentPage));
                    
                    // Use aligned positions for proper subsection alignment
                    // "(i)" should align with section number position, "Name:" should align with main section text
                    const { numberX, textX } = getAlignedPositions(11, true);
                    const numberSpacing = 10; // Same spacing as between section number and text
                    const rightStartX = pageWidth / 2 + 20; // Start from middle of page
                    const fieldSpacing = 14; // Moderate spacing between fields to match global rhythm
                    
                    // Left column: Name and Designation
                    // Parse name label to separate prefix "(i)" or "(ii)" from "Name:"
                    const nameLabel = nameField.label || '';
                    const nameLabelMatch = nameLabel.match(/^(\([i]+\))\s*(.+)$/);
                    let namePrefix = '';
                    let nameText = nameLabel;
                    if (nameLabelMatch) {
                      namePrefix = nameLabelMatch[1]; // "(i)" or "(ii)" without space
                      nameText = nameLabelMatch[2]; // "Name:"
                    }
                    
                    // Position "(i)" at numberX (aligned with section number "2.")
                    // Position "Name:" at textX (aligned with main section text "Co-coordinator...")
                    const namePrefixWidth = namePrefix ? font.widthOfTextAtSize(namePrefix, 11) : 0;
                    const nameTextWidth = font.widthOfTextAtSize(nameText, 11);
                    const nameValue = nameField.value || '';
                    
                    // Draw prefix at numberX, then text at textX with proper spacing
                    if (namePrefix) {
                      drawText(namePrefix, numberX, currentY, 11, false, currentPage);
                    }
                    drawText(nameText, textX, currentY, 11, false, currentPage);
                    drawText(nameValue, textX + nameTextWidth + 10, currentY, 11, false, currentPage);
                    
                    const designationLabel = designationField.label || '';
                    const designationValue = designationField.value || '';
                    const designationLabelWidth = font.widthOfTextAtSize(designationLabel, 11);
                    const designationY = currentY - fieldSpacing;
                    // Designation aligns with "Name:" at textX
                    drawText(designationLabel, textX, designationY, 11, false, currentPage);
                    drawText(designationValue, textX + designationLabelWidth + 10, designationY, 11, false, currentPage);
                    
                    // Right column: Deptt./Centre and Signature
                    const deptLabel = deptField.label || '';
                    const deptValue = deptField.value || '';
                    const deptLabelWidth = font.widthOfTextAtSize(deptLabel, 11);
                    drawText(deptLabel, rightStartX, currentY, 11, false, currentPage);
                    drawText(deptValue, rightStartX + deptLabelWidth + 10, currentY, 11, false, currentPage);
                    
                    // Right column: Signature (if available)
                    if (signatureField && signatureField.label === 'Signature:') {
                      const signatureLabel = signatureField.label || '';
                      const signatureValue = signatureField.value || '';
                      const signatureLabelWidth = font.widthOfTextAtSize(signatureLabel, 11);
                      drawText(signatureLabel, rightStartX, designationY, 11, false, currentPage);
                      drawText(signatureValue, rightStartX + signatureLabelWidth + 10, designationY, 11, false, currentPage);
                    } else {
                      // Draw empty Signature label for sponsored form
                      const signatureLabel = 'Signature:';
                      const signatureLabelWidth = font.widthOfTextAtSize(signatureLabel, 11);
                      drawText(signatureLabel, rightStartX, designationY, 11, false, currentPage);
                    }
                    
                    // Move to next coordinator or end
                    if (coordNum === 1) {
                      // Add more spacing after first coordinator before second one
                      currentY = designationY - 18; // Spacing between (i) and (ii) matches fieldSpacing
                    } else {
                      // Final spacing after second coordinator - give more space before next main section
                      currentY = designationY - 18;
                    }
                  }
                }
              }
              
              // Skip the co-coordinator subfields since we've already processed them
              // Skip indices: fieldIndex+1 to fieldIndex+8 (4 fields for each coordinator)
              // We'll handle this by checking if we're in the co-coordinator range
              
            } catch (coordError) {
              console.error('Error rendering co-coordinator section:', coordError);
              // Fallback to normal rendering
              currentY = drawFormField(
                field.label || '', 
                field.value || '', 
                currentY, 
                currentPage, 
                field.fontSize || 10, 
                field.fontSize || 10, 
                field.isBold !== false
              );
            }
          } else {
            // Special handling for "Total invoice amount in words:" in invoice generation forms (open and sponsored)
            const isInvoiceGenerationOpenForm = formConfig.title && (
              formConfig.title.toLowerCase().includes('invoice generation') &&
              formConfig.title.toLowerCase().includes('open')
            );
            const isInvoiceGenerationSponsoredForm = formConfig.title && (
              formConfig.title.toLowerCase().includes('invoice generation') &&
              formConfig.title.toLowerCase().includes('sponsored')
            );
            
            if ((isInvoiceGenerationOpenForm || isInvoiceGenerationSponsoredForm) && field.label && field.label === 'Total invoice amount in words:') {
              // Render with proper left alignment (margin + 20) and proper spacing
              ({ page: currentPage, currentY } = checkNewPage(currentY, 30, currentPage));
              const labelX = margin + 20;
              drawText(field.label || '', labelX, currentY, 10, true, currentPage);
              const valueX = labelX + font.widthOfTextAtSize(field.label || '', 10) + 15; // Increased spacing from 10 to 15
              drawText(field.value || '', valueX, currentY, 10, false, currentPage);
              currentY -= 20;
            } else if ((isInvoiceGenerationOpenForm || isInvoiceGenerationSponsoredForm) && field.label && field.label === 'Dated:') {
              // Render "Dated:" field with proper left alignment (margin + 20)
              ({ page: currentPage, currentY } = checkNewPage(currentY, 30, currentPage));
              const labelX = margin + 20;
              drawText(field.label || '', labelX, currentY, 10, true, currentPage);
              const valueX = labelX + font.widthOfTextAtSize(field.label || '', 10) + 10;
              drawText(field.value || '', valueX, currentY, 10, false, currentPage);
              currentY -= 20;
            } else if ((field.label && field.label.includes('9. Duration:')) ||
                (field.label && field.label.includes('13. Course Fee Per participant:')) ||
                (field.label && field.label.includes('16. IITR Receipts as per MoU:'))) {
              // Skip normal rendering - special handlers will process these later in the same iteration
              // Don't use continue here, let the special handlers catch them
            } else {
              // Special handling for Employee No. in request-for-loan form - align with CEC-08
              const isRequestForLoanFormForEmployeeNo = formConfig.title && (
                formConfig.title.toLowerCase().includes('request for loan') ||
                formConfig.title.toLowerCase().includes('loan')
              );
              
              if (isRequestForLoanFormForEmployeeNo && field.label && field.label.includes('Employee No.')) {
                // Align Employee No. with CEC-08 (which is at margin + 20)
                ({ page: currentPage, currentY } = checkNewPage(currentY, 30, currentPage));
                const labelX = margin + 20; // Same as CEC-08 position
                const labelWidth = boldFont.widthOfTextAtSize(field.label || '', 11);
                drawText(field.label || '', labelX, currentY, 11, true, currentPage);
                const valueX = labelX + labelWidth + 15; // 15px spacing between label and value
                drawText(field.value || '', valueX, currentY, 11, false, currentPage);
                currentY -= 20;
              } else {
                // Special handling for remuneration form fields - ensure proper left alignment
                const isRemunerationForm = formConfig.title && (
                  formConfig.title.toLowerCase().includes('remuneration') ||
                  formConfig.title.toLowerCase().includes('honorarium')
                );
              
              if (isRemunerationForm && field.label && (
                field.label.includes('PAN No.') ||
                field.label.includes('Employee No.') ||
                field.label.includes('Course Name') ||
                field.label.includes('Batch No.') ||
                field.label.includes('Course Code') ||
                field.label.includes('Amount to be transferred') ||
                field.label.includes('Bank A/c No.') ||
                field.label.includes('Bank and Branch') ||
                field.label.includes('IFSC Code') ||
                field.label.includes('BILL VERIFIED') ||
                field.label.includes('Signature') ||
                // Skip payment details fields as they're now in a table
                // field.label.includes('Passed for Payment') ||
                // field.label.includes('Rupees') ||
                // field.label.includes('Please debit') ||
                // field.label.includes('Ledger Code') ||
                field.label.includes('Date') ||
                field.label.includes('Asstt/Supdt') ||
                field.label.includes('Coordinator, CEC')
              )) {
                // Render with proper left alignment (margin + 20) for remuneration form
                ({ page: currentPage, currentY } = checkNewPage(currentY, 30, currentPage));
                const labelX = margin + 20;
                const labelWidth = boldFont.widthOfTextAtSize(field.label || '', 10);
                drawText(field.label || '', labelX, currentY, 10, true, currentPage);
                const valueX = labelX + labelWidth + 15; // 15px spacing between label and value
                drawText(field.value || '', valueX, currentY, 10, false, currentPage);
                // Reduce spacing to 10px for specific fields
                const isReducedSpacingFields = field.label.includes('PAN No.') ||
                                      field.label.includes('Employee No.') ||
                                      field.label.includes('Course Name') ||
                                      field.label.includes('Batch No.') ||
                                      field.label.includes('Course Code') ||
                                      field.label.includes('Amount to be transferred in A/C') ||
                                      field.label.includes('Amount to be transferred in PDF') ||
                                      field.label.includes('Bank A/c No.') ||
                                      field.label.includes('Bank and Branch') ||
                                      field.label.includes('IFSC Code') ||
                                      field.label.includes('Amount to be transferred in CEC-DDF-001/DDF Account') ||
                                      field.label.includes('amount to be transferred if per hour rate is more than Rs. 18,000');
                currentY -= isReducedSpacingFields ? 10 : 20; // Reduced spacing (10px) for specified fields, normal (20px) for others
              } else {
                // Debug: Log before drawing coordination fee field
                if (field.label && field.label.includes("Coordination fee 'C' maximum")) {
                  console.log('About to draw coordination fee field:', field.label, 'Value:', field.value, 'at Y:', currentY);
                }
                
                // Special handling for Coordination Fee form - ensure consistent font size (10) and proper alignment
                if (isCoordinationFeeForm) {
                  // Check if this is one of the first 6 fields that need to align with CEC-09
                  const isFirstSixFields = fieldIndex >= 0 && fieldIndex <= 5;
                  if (isFirstSixFields) {
                    // Align with CEC-09 position (tableLeftBorder = margin + 20)
                    ({ page: currentPage, currentY } = checkNewPage(currentY, 30, currentPage));
                    const tableLeftBorder = margin + 20;
                    const labelWidth = boldFont.widthOfTextAtSize(field.label || '', 10);
                    const value = field.value || "";
                    const valueX = tableLeftBorder + labelWidth + 10;
                    const underlineLength = 200; // Reduced underline length
                    const underlineEndX = valueX + underlineLength;
                    // Draw label at tableLeftBorder for proper alignment with CEC-09
                    drawText(field.label || '', tableLeftBorder, currentY, 10, true, currentPage);
                    if (value) {
                      drawText(value, valueX, currentY, 10, false, currentPage);
                    }
                    // Draw underline (reduced length)
                    currentPage.drawLine({
                      start: { x: valueX, y: currentY - 3 },
                      end: { x: underlineEndX, y: currentY - 3 },
                      thickness: 0.5,
                      color: rgb(0, 0, 0)
                    });
                    // Reduce spacing between these fields for tighter layout
                    if (fieldIndex < 5) {
                      currentY -= 10; // Reduced spacing (10px) for first 6 fields
                    } else {
                      currentY -= 15; // Slightly more spacing after last field
                    }
                  } else {
                    // For other fields, use standard rendering
                    ({ page: currentPage, currentY } = checkNewPage(currentY, 30, currentPage));
                    const newY = drawFormField(
                      field.label || '', 
                      field.value || '', 
                      currentY, 
                      currentPage, 
                      10, // Consistent font size 10 for labels
                      10, // Consistent font size 10 for values
                      field.isBold !== false
                    );
                    currentY = newY;
                  }
                } else {
                  // Special handling for TA/Lab Staff form first 4 fields - proper alignment and reduced spacing
                  const isTALabStaffFormFields = formConfig.title && (
                    formConfig.title.includes('TEACHING ASSISTANT') || 
                    formConfig.title.includes('TECHNICAL ASSISTANT') ||
                    formConfig.title.includes('LAB STAFF')
                  );
                  const isFirstFiveTALabStaffFields = isTALabStaffFormFields && (
                    fieldIndex === 0 || fieldIndex === 1 || fieldIndex === 2 || fieldIndex === 3 || fieldIndex === 4
                  );
                  
                  // Check if this is one of the first 3 fields in course opening form - reduce spacing
                  const isCourseOpeningFormFields = formConfig.title && (
                    formConfig.title.toLowerCase().includes('course opening') ||
                    formConfig.title.toLowerCase().includes('actual budget')
                  );
                  const isFirstThreeFields = isCourseOpeningFormFields && (
                    fieldIndex === 0 || fieldIndex === 1 || fieldIndex === 2
                  );
                  
                  // Check if this is one of the first 4 fields in revised budget form - reduce spacing
                  const isRevisedBudgetFormFields = formConfig.title && (
                    formConfig.title.toLowerCase().includes('revised budget')
                  );
                  const isFirstFourFields = isRevisedBudgetFormFields && (
                    fieldIndex === 0 || fieldIndex === 1 || fieldIndex === 2 || fieldIndex === 3
                  );
                  
                  // Special handling for TA/Lab Staff form first 5 fields - align with table/rectangle left border
                  if (isFirstFiveTALabStaffFields) {
                  ({ page: currentPage, currentY } = checkNewPage(currentY, 30, currentPage));
                  // Align with table/rectangle left border for consistent alignment
                  const tableLeftBorder = margin + 20;
                  const labelWidth = boldFont.widthOfTextAtSize(field.label || '', 11);
                  const value = field.value || "";
                  const valueX = tableLeftBorder + labelWidth + 10;
                  const maxValueX = pageWidth - margin - 20;
                  
                  // Draw label at tableLeftBorder for proper alignment
                  drawText(field.label || '', tableLeftBorder, currentY, 11, true, currentPage);
                  if (value) {
                    drawText(value, valueX, currentY, 11, false, currentPage);
                  }
                  // Draw underline
                  currentPage.drawLine({
                    start: { x: valueX, y: currentY - 3 },
                    end: { x: maxValueX, y: currentY - 3 },
                    thickness: 1,
                    color: rgb(0, 0, 0)
                  });
                  
                  // Reduce spacing between these fields for tighter layout
                  if (fieldIndex < 3) {
                    currentY -= 10; // Reduced spacing (10px) for first 4 fields
                  } else if (fieldIndex === 4) {
                    currentY -= 18; // Normal spacing for Signature field
                  } else {
                    currentY -= 15; // Slightly reduced spacing after last field
                  }
                } else {
                  // Standard field rendering for other fields
                  const newY = drawFormField(
                    field.label || '', 
                    field.value || '', 
                    currentY, 
                    currentPage, 
                    field.fontSize || 10, 
                    field.fontSize || 10, 
                    field.isBold !== false
                  );
                
                  // Reduce spacing after the first 3 fields in course opening form
                  // drawFormField returns y - 10, so to reduce spacing we add back some pixels
                  if (isFirstThreeFields && fieldIndex < 2) {
                    currentY = newY + 5; // Reduce spacing by 5px (effective spacing becomes 5px instead of 10px)
                  } else if (isFirstFourFields && fieldIndex < 3) {
                    // Reduce spacing after the first 4 fields in revised budget form
                    currentY = newY + 5; // Reduce spacing by 5px (effective spacing becomes 5px instead of 10px)
                  } else {
                    currentY = newY;
                  }
                }
              }
            }
            // Debug: Log after drawing coordination fee field
            if (field.label && field.label.includes("Coordination fee 'C' maximum")) {
              console.log('Finished drawing coordination field, new Y:', currentY);
            }
          }
        }
        
        // Handle subfield type
        if ((field.type as string) === 'subfield') {
          // Skip Course Coordinator subfields for sponsored form (handled in special section)
          if (fieldIndex > 0 && fieldIndex <= 3) {
            const courseCoordHeader = formConfig.fields[0];
            if (courseCoordHeader && courseCoordHeader.label === '1. Course Coordinator/PI Details:') {
              if (field.label === 'Name of the Course Coordinator/PI:' ||
                  field.label === 'Designation:' || 
                  field.label === 'Deptt./Centre:') {
                return; // Skip these fields as they're already processed
              }
            }
          }
          
          // Skip co-coordinator subfields as they're handled in the special section above
          // Check if we're in the co-coordinator section (for both open participation and sponsored forms)
          // For open participation: co-coordinator header is at index 3, subfields at 4-11
          // For sponsored: co-coordinator header is at index 4, subfields at 5-12
          let isInCoCoordSection = false;
          
          // Check for open participation form (header at index 3)
          if (fieldIndex > 3 && fieldIndex <= 11) {
            const coCoordHeader = formConfig.fields[3];
            if (coCoordHeader && coCoordHeader.label === '2. Co-coordinator (I)/Co-PI, if any:') {
              isInCoCoordSection = true;
            }
          }
          
          // Check for sponsored form (header at index 4)
          if (fieldIndex > 4 && fieldIndex <= 12) {
            const coCoordHeader = formConfig.fields[4];
            if (coCoordHeader && coCoordHeader.label === 'Co-coordinator (I)/Co-PI, if any:') {
              isInCoCoordSection = true;
            }
          }
          
          if (isInCoCoordSection) {
            // Skip all co-coordinator subfields
            if (field.label === '(i) Name:' || 
                field.label === 'Designation:' || 
                field.label === 'Deptt./Centre:' || 
                field.label === 'Signature:' ||
                field.label === '(ii) Name:') {
              return; // Skip these fields as they're already processed
            }
          }
          
          // Skip Duration subfields (Months, Lectures, hands on for open participation; Weeks, Hours of Training for sponsored) as they're handled horizontally
          if (field.label === 'Months:' || 
              field.label === 'No. of hours Lectures:' || 
              field.label === 'No. of hours hands on:' ||
              field.label === 'Weeks:' ||
              field.label === 'Hours of Training:') {
            return; // Skip these fields as they're already processed
          }
          
          // Skip Course Fee subfields as they're handled horizontally
          if (field.label === 'Course Fee (Rs.):' || 
              field.label === 'Fee with GST @ 18%:' || 
              field.label === 'Total Fee:') {
            return; // Skip these fields as they're already processed
          }
          
          // Skip IITR Receipts subfields as they're handled horizontally
          if (field.label === 'Percentage:' || 
              field.label === 'Amount (Rs.):') {
            return; // Skip these fields as they're already processed
          }
          
          // Skip course extension form (a) and (b) subfields as they're handled horizontally
          const isCourseExtensionFormForSubfields = formConfig.title && (
            formConfig.title.toLowerCase().includes('course extension') ||
            formConfig.title.toLowerCase().includes('extension of time / revision of project amount')
          );
          if (isCourseExtensionFormForSubfields && (
            field.label === '(a) Original' ||
            field.label === '(b) Revised' ||
            field.label === '(a) Original (Rs.)' ||
            field.label === '(b) Revised (Rs.)'
          )) {
            return; // Skip these fields as they're already processed horizontally
          }
          
          // Skip expense subfields for course opening form as they're now in the table
          const isCourseOpeningFormForSubfields = formConfig.title && (
            formConfig.title.toLowerCase().includes('course opening') ||
            formConfig.title.toLowerCase().includes('actual budget')
          );
          if (isCourseOpeningFormForSubfields && field.label && (
            field.label === 'i. Cost of registration material:' ||
            field.label === 'ii. Contingency/miscellaneous expenses:' ||
            field.label === 'iii. Infrastructure charges including hall and equipment charges:' ||
            field.label === 'iv. Accommodation, boarding and lodging:' ||
            field.label === 'v. Transportation: TA/DA to outside experts/participants:' ||
            field.label === 'vi. Local travel / field trip / tour:' ||
            field.label === 'vii. Lab Staff/TA (please specify):'
          )) {
            return; // Skip these fields as they're in the table
          }
          
          // Skip expense subfields for revised budget form as they're now in the table
          const isRevisedBudgetFormForSubfields = formConfig.title && (
            formConfig.title.toLowerCase().includes('revised budget')
          );
          if (isRevisedBudgetFormForSubfields && field.label && (
            field.label === 'i. Cost of registration material:' ||
            field.label === 'ii. Contingency/miscellaneous expenses:' ||
            field.label === 'iii. Infrastructure charges including hall and equipment charges:' ||
            field.label === 'iv. Accommodation, boarding and lodging:' ||
            field.label === 'v. Transportation: TA/DA to outside experts/participants:' ||
            field.label === 'vi. Local travel / field trip / tour:' ||
            field.label === 'vii. Lab Staff/TA (please specify):'
          )) {
            return; // Skip these fields as they're in the table
          }
          
          currentY = drawSubField(
            field.label || '', 
            field.value || '', 
            currentY, 
            currentPage, 
            field.indentLevel || 1
          );
        }
        
        // Special handling for course extension form - render heading and budget fields after "(b) Revised (Rs.)"
        const isCourseExtensionFormForSpecial = formConfig.title && (
          formConfig.title.toLowerCase().includes('course extension') ||
          formConfig.title.toLowerCase().includes('extension of time / revision of project amount')
        );
        if (isCourseExtensionFormForSpecial && field.label && field.label === "(b) Revised (Rs.)") {
          // Field is already rendered above, now add the heading and budget fields
          if (formConfig.plainTextSections && formConfig.plainTextSections.length > 0) {
            const headingSection = formConfig.plainTextSections[0];
            if (headingSection && headingSection.title && headingSection.title.includes('Budget Head / Description & Revised Budgeted Amount')) {
              try {
                ({ page: currentPage, currentY } = checkNewPage(currentY, 30, currentPage));
                drawText(headingSection.title, margin + 20, currentY, 12, true, currentPage);
                currentY -= 18;
                
                // Render the 6 budget fields
                const budgetFields = [
                  { label: "Gross Amount including Service Tax" },
                  { label: "Less- Service Tax" },
                  { label: "Contracted Amount" },
                  { label: "Institute Share (20% of Contracted Amount)" },
                  { label: "Expenditure (Estimated*)" },
                  { label: "Honorarium (Estimated)" }
                ];
                
                for (const budgetField of budgetFields) {
                  const field = formConfig.fields.find((f: any) => f.label === budgetField.label);
                  if (field) {
                    ({ page: currentPage, currentY } = checkNewPage(currentY, 40, currentPage));
                    currentY = drawFormField(
                      field.label || '',
                      field.value || '',
                      currentY,
                      currentPage,
                      10,
                      10,
                      true
                    );
                    currentY -= 12;
                  }
                }
                
                // Add sections after the budget table
                try {
                  // 1. Reason for Extension field
                  const reasonField = formConfig.fields.find((f: any) => 
                    f.label && f.label.includes('Reason for Extension of Time')
                  );
                  if (reasonField) {
                    ({ page: currentPage, currentY } = checkNewPage(currentY, 30, currentPage));
                    // Draw label with wrapping
                    const reasonLabel = reasonField.label || '';
                    const maxWidth = contentWidth - 40;
                    const labelResult = drawMultilineText(reasonLabel, margin + 20, currentY, maxWidth, 11, currentPage, true, false);
                    currentPage = labelResult.page;
                    currentY = labelResult.currentY - 5;
                    
                    // Draw value with underline - only draw lines with actual text
                    const reasonValue = reasonField.value || '';
                    
                    if (reasonValue && reasonValue.trim().length > 0) {
                      // Clean the text: remove ALL newlines and normalize whitespace
                      const cleanedValue = reasonValue.trim().replace(/\r\n/g, ' ').replace(/\r/g, ' ').replace(/\n/g, ' ').replace(/\s+/g, ' ');
                      // Use drawMultilineText with underline to handle wrapping correctly - only draws lines with text
                      const multilineResult = drawMultilineText(cleanedValue, margin + 20, currentY, maxWidth, 11, currentPage, false, true);
                      currentPage = multilineResult.page;
                      currentY = multilineResult.currentY - 5; // Minimal spacing
                    } else {
                      // No value - draw one blank line with underline
                      const underlineLength = maxWidth;
                      const underlineY = currentY - 3;
                      currentPage.drawLine({
                        start: { x: margin + 20, y: underlineY },
                        end: { x: margin + 20 + underlineLength, y: underlineY },
                        thickness: 0.5,
                        color: rgb(0, 0, 0),
                      });
                      currentY -= 20;
                    }
                  }
                  
                  // 2. Signature of Principal Investigator
                  ({ page: currentPage, currentY } = checkNewPage(currentY, 30, currentPage));
                  const piSignatureLabel = 'Signature of Principal Investigator (with date)';
                  drawText(piSignatureLabel, margin + 20, currentY, 11, false, currentPage);
                  currentY -= 35;
                  
                  // 3. CEC Office heading (smaller text, not big)
                  ({ page: currentPage, currentY } = checkNewPage(currentY, 15, currentPage));
                  const cecHeading = 'CEC Office, IIT Roorkee';
                  const cecHeadingWidth = font.widthOfTextAtSize(cecHeading, 11);
                  const cecHeadingX = centerX - (cecHeadingWidth / 2);
                  drawText(cecHeading, cecHeadingX, currentY, 11, true, currentPage);
                  currentY -= 15;
                  
                  // 4. Recommended/Not Recommended (right aligned)
                  ({ page: currentPage, currentY } = checkNewPage(currentY, 15, currentPage));
                  const recommendedText = 'Recommended/Not Recommended';
                  const recommendedTextWidth = font.widthOfTextAtSize(recommendedText, 11);
                  const recommendedTextX = pageWidth - margin - 20 - recommendedTextWidth;
                  drawText(recommendedText, recommendedTextX, currentY, 11, false, currentPage);
                  currentY -= 25;
                  
                  // 5. CEC signatures horizontally aligned (3 signatures)
                  // Evenly space them in three columns within the content area
                  ({ page: currentPage, currentY } = checkNewPage(currentY, 40, currentPage));
                  const cecSignatures = [
                    'Dealing Asstt',
                    'Superintendent, CEC',
                    'Coordinator, CEC'
                  ];
                  {
                    const startX = margin + 20;
                    const availableWidth = contentWidth - 40;
                    const slotWidth = availableWidth / 3;
                    const lineLength = 110;
                    
                    for (let i = 0; i < cecSignatures.length; i++) {
                      const sigLabel = cecSignatures[i];
                      const sigLabelWidth = font.widthOfTextAtSize(sigLabel, 10);
                      const slotCenter = startX + slotWidth * (i + 0.5);
                      const sigX = slotCenter - (sigLabelWidth / 2);
                      
                      drawText(sigLabel, sigX, currentY, 10, false, currentPage);
                      
                      // Draw signature line centered under the slot
                      const lineStartX = slotCenter - (lineLength / 2);
                      const lineEndX = slotCenter + (lineLength / 2);
                      currentPage.drawLine({
                        start: { x: lineStartX, y: currentY - 15 },
                        end: { x: lineEndX, y: currentY - 15 },
                        thickness: 0.5,
                        color: rgb(0, 0, 0),
                      });
                    }
                  }
                  currentY -= 30;
                  
                  // 6. SRIC Office heading (smaller text, not big)
                  ({ page: currentPage, currentY } = checkNewPage(currentY, 20, currentPage));
                  const sricHeading = 'SRIC Office, IIT Roorkee';
                  const sricHeadingWidth = font.widthOfTextAtSize(sricHeading, 11);
                  const sricHeadingX = centerX - (sricHeadingWidth / 2);
                  drawText(sricHeading, sricHeadingX, currentY, 11, true, currentPage);
                  currentY -= 15;
                  
                  // 7. Approved/Not Approved (right aligned)
                  ({ page: currentPage, currentY } = checkNewPage(currentY, 15, currentPage));
                  const approvedText = 'Approved /Not Approved';
                  const approvedTextWidth = font.widthOfTextAtSize(approvedText, 11);
                  const approvedTextX = pageWidth - margin - 20 - approvedTextWidth;
                  drawText(approvedText, approvedTextX, currentY, 11, false, currentPage);
                  currentY -= 25;
                  
                  // 8. SRIC signatures horizontally aligned (3 signatures)
                  // Evenly space them in three columns within the content area
                  ({ page: currentPage, currentY } = checkNewPage(currentY, 40, currentPage));
                  const sricSignatures = [
                    'Supdt. (SRIC – Admn)',
                    'AR/DR (SRIC-Admn.)',
                    'Assoc. Dean (SRIC) / Dean (SRIC)'
                  ];
                  {
                    const startX = margin + 20;
                    const availableWidth = contentWidth - 40;
                    const slotWidth = availableWidth / 3;
                    const lineLength = 110;
                    
                    for (let i = 0; i < sricSignatures.length; i++) {
                      const sigLabel = sricSignatures[i];
                      const sigLabelWidth = font.widthOfTextAtSize(sigLabel, 10);
                      const slotCenter = startX + slotWidth * (i + 0.5);
                      const sigX = slotCenter - (sigLabelWidth / 2);
                      
                      drawText(sigLabel, sigX, currentY, 10, false, currentPage);
                      
                      // Draw signature line centered under the slot
                      const lineStartX = slotCenter - (lineLength / 2);
                      const lineEndX = slotCenter + (lineLength / 2);
                      currentPage.drawLine({
                        start: { x: lineStartX, y: currentY - 15 },
                        end: { x: lineEndX, y: currentY - 15 },
                        thickness: 0.5,
                        color: rgb(0, 0, 0),
                      });
                    }
                  }
                  currentY -= 20;
                } catch (sectionError) {
                  console.error('Error rendering sections after table:', sectionError);
                  currentY -= 30;
                }
              } catch (budgetError) {
                console.error('Error rendering budget section:', budgetError);
                currentY -= 50;
              }
            }
          }
        }
        
        // Special handling for section B subsections in coordination fee form
        // Handle "i. CEC DDF component CEC-DDF-001" - align with section A subsections and add note below
        if (isCoordinationFeeForm && field.label && field.label.includes("i. CEC DDF component")) {
          // Field is already rendered above, now add the note immediately after
          if (formConfig.plainTextSections && formConfig.plainTextSections.length > 2) {
            const noteSection = formConfig.plainTextSections[2];
            if (noteSection && noteSection.content && noteSection.content.includes('in case of Open Participation course')) {
              try {
                // Render note right after the field
                currentY -= 5; // Minimal spacing
                ({ page: currentPage, currentY } = checkNewPage(currentY, 50, currentPage));
                // Draw note as plain text (no bold, no underline) - align with section A subsections
                const { textX } = getAlignedPositions(10, false);
                const noteResult = drawMultilineText(noteSection.content, textX, currentY, contentWidth - (textX - margin - 20) - 40, 10, currentPage, false);
                currentPage = noteResult.page;
                currentY = noteResult.currentY - 10; // Spacing after note
              } catch (noteError) {
                console.error('Error rendering CEC DDF component note:', noteError);
                currentY -= 15;
              }
            }
          }
        }
        
        // Handle "ii. Coordination fee 'C' maximum" - align with section A subsections and add note below
        if (isCoordinationFeeForm && field.label && field.label.includes("ii. Coordination fee")) {
          // Field is already rendered above, now add the note immediately after
          if (formConfig.plainTextSections && formConfig.plainTextSections.length > 3) {
            const noteSection = formConfig.plainTextSections[3];
            if (noteSection && noteSection.content && noteSection.content.includes('Coordination fee')) {
              try {
                // Render note right after the field
                currentY -= 5; // Minimal spacing
                ({ page: currentPage, currentY } = checkNewPage(currentY, 50, currentPage));
                // Draw note as plain text (no bold, no underline) - align with section A subsections
                const { textX } = getAlignedPositions(10, false);
                const noteResult = drawMultilineText(noteSection.content, textX, currentY, contentWidth - (textX - margin - 20) - 40, 10, currentPage, false);
                currentPage = noteResult.page;
                currentY = noteResult.currentY - 10; // Spacing after note
                
                // After the note, render the heading "Mention all the names..." and keep it with the table
                if (formConfig.plainTextSections.length > 4) {
                  const headingSection = formConfig.plainTextSections[4];
                  if (headingSection && headingSection.title && headingSection.title.includes('Mention all the names')) {
                    // Check if there's enough space for both heading (30px) and table (150px) together
                    // This ensures they stay on the same page
                    ({ page: currentPage, currentY } = checkNewPage(currentY, 180, currentPage));
                    drawText(headingSection.title, margin + 20, currentY, 12, true, currentPage);
                    currentY -= 15;
                    
                    // After the heading, render the distribution table (already checked for space above)
                    if (formConfig.tables && formConfig.tables.length > 0) {
                      const distributionTable = formConfig.tables[0];
                      try {
                        // No need to check for new page again - already checked above
                        // Render the table without a label (empty label)
                        const tableResult = drawTable(distributionTable.data, currentY, currentPage, "", false);
                        currentPage = tableResult.page;
                        currentY = tableResult.currentY - 20;
                        
                        // After the table, render "Remaining amount" field - aligned with CEC-09
                        const remainingAmountField = formConfig.fields.find((f: any) => 
                          f.label && f.label.includes('Remaining amount (if any) to DDF of CEC')
                        );
                        if (remainingAmountField) {
                          ({ page: currentPage, currentY } = checkNewPage(currentY, 40, currentPage));
                          const tableLeftBorder = margin + 20; // Align with CEC-09
                          const labelWidth = boldFont.widthOfTextAtSize(remainingAmountField.label || '', 10);
                          const value = remainingAmountField.value || "";
                          const valueX = tableLeftBorder + labelWidth + 10;
                          const underlineLength = 200; // Reduced underline length
                          const underlineEndX = valueX + underlineLength;
                          // Draw label at tableLeftBorder for proper alignment with CEC-09
                          drawText(remainingAmountField.label || '', tableLeftBorder, currentY, 10, true, currentPage);
                          if (value) {
                            drawText(value, valueX, currentY, 10, false, currentPage);
                          }
                          // Draw underline (reduced length)
                          currentPage.drawLine({
                            start: { x: valueX, y: currentY - 3 },
                            end: { x: underlineEndX, y: currentY - 3 },
                            thickness: 0.5,
                            color: rgb(0, 0, 0)
                          });
                          currentY -= 20;
                        }
                        
                        // After "Remaining amount", render "This is final distribution..." text - aligned with CEC-09
                        const finalDistributionText = "This is final distribution and that the work has been completed. The final report has been sent vide letter No._________________________Dated ___________________(Copy enclosed)";
                        ({ page: currentPage, currentY } = checkNewPage(currentY, 50, currentPage));
                        const tableLeftBorder = margin + 20; // Align with CEC-09
                        const finalDistResult = drawMultilineText(finalDistributionText, tableLeftBorder, currentY, contentWidth - 40, 10, currentPage, false);
                        currentPage = finalDistResult.page;
                        currentY = finalDistResult.currentY - 15;
                        
                        // After "This is final distribution...", render "The soft copy of the following documents are required :" heading
                        if (formConfig.plainTextSections.length > 6) {
                          const documentsHeadingSection = formConfig.plainTextSections[6];
                          if (documentsHeadingSection && documentsHeadingSection.title && documentsHeadingSection.title.includes('The soft copy of the following documents')) {
                            ({ page: currentPage, currentY } = checkNewPage(currentY, 30, currentPage));
                            drawText(documentsHeadingSection.title, margin + 20, currentY, 12, true, currentPage);
                            currentY -= 15;
                          }
                        }
                        
                        // After the heading, render the list items (i) through (v)
                        if (formConfig.plainTextSections.length > 7) {
                          const listItemsSection = formConfig.plainTextSections[7];
                          if (listItemsSection && listItemsSection.content) {
                            ({ page: currentPage, currentY } = checkNewPage(currentY, 50, currentPage));
                            const listResult = drawMultilineText(listItemsSection.content, margin + 20, currentY, contentWidth - 40, 10, currentPage, false);
                            currentPage = listResult.page;
                            currentY = listResult.currentY - 20;
                          }
                        }
                        
                        // After the list items, render signature fields - aligned with CEC-09
                        const signatureField = formConfig.fields.find((f: any) => 
                          f.label && f.label.includes('Signature of the Course Coordinator (with date)')
                        );
                        if (signatureField) {
                          ({ page: currentPage, currentY } = checkNewPage(currentY, 40, currentPage));
                          const tableLeftBorder = margin + 20; // Align with CEC-09
                          const labelWidth = boldFont.widthOfTextAtSize(signatureField.label || '', 10);
                          const value = signatureField.value || "";
                          const valueX = tableLeftBorder + labelWidth + 10;
                          const underlineLength = 200; // Reduced underline length
                          const underlineEndX = valueX + underlineLength;
                          // Draw label at tableLeftBorder for proper alignment with CEC-09
                          drawText(signatureField.label || '', tableLeftBorder, currentY, 10, true, currentPage);
                          if (value) {
                            drawText(value, valueX, currentY, 10, false, currentPage);
                          }
                          // Draw underline (reduced length)
                          currentPage.drawLine({
                            start: { x: valueX, y: currentY - 3 },
                            end: { x: underlineEndX, y: currentY - 3 },
                            thickness: 0.5,
                            color: rgb(0, 0, 0)
                          });
                          currentY -= 20;
                        }
                        
                        // Render Extn., Mobile, and Email - Extn on left, Mobile on right, Email below Extn
                        const extnField = formConfig.fields.find((f: any) => 
                          f.label && f.label === 'Extn. (O)'
                        );
                        const mobileField = formConfig.fields.find((f: any) => 
                          f.label && f.label === 'Mobile'
                        );
                        const emailField = formConfig.fields.find((f: any) => 
                          f.label && f.label === 'Email :'
                        );
                        
                        if (extnField || mobileField || emailField) {
                          ({ page: currentPage, currentY } = checkNewPage(currentY, 60, currentPage));
                          const tableLeftBorder = margin + 20; // Align with CEC-09
                          const firstLineY = currentY;
                          
                          // Left side: Extn. (O)
                          if (extnField) {
                            const extnLabelWidth = boldFont.widthOfTextAtSize(extnField.label || '', 10);
                            const extnValueX = tableLeftBorder + extnLabelWidth + 10;
                            const extnMaxValueX = pageWidth / 2 - 20; // Stop before middle
                            drawText(extnField.label || '', tableLeftBorder, firstLineY, 10, true, currentPage);
                            if (extnField.value) {
                              drawText(extnField.value, extnValueX, firstLineY, 10, false, currentPage);
                            }
                            // Draw underline
                            currentPage.drawLine({
                              start: { x: extnValueX, y: firstLineY - 3 },
                              end: { x: extnMaxValueX, y: firstLineY - 3 },
                              thickness: 1,
                              color: rgb(0, 0, 0)
                            });
                          }
                          
                          // Right side: Mobile
                          if (mobileField) {
                            const mobileStartX = pageWidth / 2 + 40; // Start from middle of page
                            const mobileLabelWidth = boldFont.widthOfTextAtSize(mobileField.label || '', 10);
                            const mobileValueX = mobileStartX + mobileLabelWidth + 10;
                            const underlineLength = 150; // Reduced underline length
                            const mobileUnderlineEndX = mobileValueX + underlineLength;
                            drawText(mobileField.label || '', mobileStartX, firstLineY, 10, true, currentPage);
                            if (mobileField.value) {
                              drawText(mobileField.value, mobileValueX, firstLineY, 10, false, currentPage);
                            }
                            // Draw underline (reduced length)
                            currentPage.drawLine({
                              start: { x: mobileValueX, y: firstLineY - 3 },
                              end: { x: mobileUnderlineEndX, y: firstLineY - 3 },
                              thickness: 0.5,
                              color: rgb(0, 0, 0)
                            });
                          }
                          
                          // Second line: Email (below Extn)
                          if (emailField) {
                            const secondLineY = firstLineY - 20;
                            const emailLabelWidth = boldFont.widthOfTextAtSize(emailField.label || '', 10);
                            const emailValueX = tableLeftBorder + emailLabelWidth + 10;
                            const underlineLength = 200; // Reduced underline length
                            const emailUnderlineEndX = emailValueX + underlineLength;
                            drawText(emailField.label || '', tableLeftBorder, secondLineY, 10, true, currentPage);
                            if (emailField.value) {
                              drawText(emailField.value, emailValueX, secondLineY, 10, false, currentPage);
                            }
                            // Draw underline (reduced length)
                            currentPage.drawLine({
                              start: { x: emailValueX, y: secondLineY - 3 },
                              end: { x: emailUnderlineEndX, y: secondLineY - 3 },
                              thickness: 0.5,
                              color: rgb(0, 0, 0)
                            });
                            currentY = secondLineY - 20;
                          } else {
                            currentY = firstLineY - 20;
                          }
                        }
                        
                        // After Email, render "Endorsement by CEC/SRIC Office, I.I.T. Roorkee" heading
                        if (formConfig.plainTextSections.length > 7) {
                          const endorsementHeadingSection = formConfig.plainTextSections[7];
                          if (endorsementHeadingSection && endorsementHeadingSection.title && endorsementHeadingSection.title.includes('Endorsement by CEC/SRIC Office')) {
                            ({ page: currentPage, currentY } = checkNewPage(currentY, 40, currentPage));
                            drawText(endorsementHeadingSection.title, margin + 20, currentY, 12, true, currentPage);
                            currentY -= 18;
                          }
                        }
                        
                        // After the heading, render "The above is submitted for approval..." text
                        if (formConfig.plainTextSections.length > 8) {
                          const submittedTextSection = formConfig.plainTextSections[8];
                          if (submittedTextSection && submittedTextSection.content && submittedTextSection.content.includes('The above is submitted for approval')) {
                            ({ page: currentPage, currentY } = checkNewPage(currentY, 30, currentPage));
                            drawText(submittedTextSection.content, margin + 20, currentY, 12, false, currentPage);
                            currentY -= 18;
                          }
                        }
                        
                        // After the text, render "Recommended /Not Recommended" and "Approved/Not Approved" on the same line (no underlines)
                        const recommendedField = formConfig.fields.find((f: any) => 
                          f.label && f.label === 'Recommended /Not Recommended'
                        );
                        const approvedField = formConfig.fields.find((f: any) => 
                          f.label && f.label === 'Approved/Not Approved'
                        );
                        if (recommendedField && approvedField) {
                          // Add spacing above
                          currentY -= 15;
                          ({ page: currentPage, currentY } = checkNewPage(currentY, 30, currentPage));
                          // Left side: Recommended /Not Recommended (no underline, just text for ticking)
                          drawText(recommendedField.label || '', margin + 20, currentY, 12, false, currentPage);
                          // Right side: Approved/Not Approved (no underline, just text for ticking)
                          const approvedStartX = pageWidth / 2 + 40; // Start from middle of page
                          drawText(approvedField.label || '', approvedStartX, currentY, 12, false, currentPage);
                          // Add spacing below
                          currentY -= 30;
                        }
                        
                        // After Recommended/Approved, render 5 signature fields horizontally with equal spacing
                        const signatureFields = [
                          { title: "D.A /Sr. Supdt", subtitle: "(C.E.C.)", originalLabel: "D.A /Sr. Supdt (C.E.C.)" },
                          { title: "Coordinator", subtitle: "CEC", originalLabel: "Coordinator, CEC" },
                          { title: "D.A. /Supdt", subtitle: "(SRIC)", originalLabel: "D.A. /Supdt (SRIC)" },
                          { title: "A.R./Dy. Registrar", subtitle: "(SRIC)", originalLabel: "A.R./Dy. Registrar (SRIC)" },
                          { title: "Dean", subtitle: "SRIC", originalLabel: "Dean, SRIC" }
                        ];
                        
                        // Calculate horizontal spacing for 5 fields
                        const availableWidth = pageWidth - (2 * margin) - 40; // Total available width
                        const fieldWidth = availableWidth / 5; // Equal width for each field
                        const signatureFontSize = 10; // Reduced font size
                        const signatureLineHeight = 12; // Line height for two-line format
                        
                        ({ page: currentPage, currentY } = checkNewPage(currentY, 50, currentPage));
                        const signatureY = currentY;
                        
                        // Render all 5 signature fields horizontally
                        for (let i = 0; i < signatureFields.length; i++) {
                          const sigField = signatureFields[i];
                          const field = formConfig.fields.find((f: any) => 
                            f.label && f.label === sigField.originalLabel
                          );
                          
                          // Calculate X position for this field (centered in its allocated space)
                          const fieldStartX = margin + 20 + (i * fieldWidth);
                          const fieldCenterX = fieldStartX + (fieldWidth / 2);
                          
                          // Draw title (first line) - centered in field space
                          const titleWidth = font.widthOfTextAtSize(sigField.title, signatureFontSize);
                          const titleX = fieldCenterX - (titleWidth / 2);
                          drawText(sigField.title, titleX, signatureY, signatureFontSize, false, currentPage);
                          
                          // Draw subtitle (second line) - centered in field space
                          const subtitleWidth = font.widthOfTextAtSize(sigField.subtitle, signatureFontSize);
                          const subtitleX = fieldCenterX - (subtitleWidth / 2);
                          drawText(sigField.subtitle, subtitleX, signatureY - signatureLineHeight, signatureFontSize, false, currentPage);
                          
                          // Draw signature line below subtitle
                          const lineLength = 80;
                          const lineY = signatureY - signatureLineHeight - 15;
                          currentPage.drawLine({
                            start: { x: fieldCenterX - (lineLength / 2), y: lineY },
                            end: { x: fieldCenterX + (lineLength / 2), y: lineY },
                            thickness: 0.5,
                            color: rgb(0, 0, 0)
                          });
                        }
                        
                        // Move Y position down after all signature fields
                        currentY = signatureY - signatureLineHeight - 15 - 20;
                        
                        // Skip the first "Coordinator, CEC" field (it's already rendered with the 5 signature fields above)
                        // The second "Coordinator, CEC" will be rendered after the distribution fields
                        
                        // After the 5 signature fields, render "Distribution of total institute share into IDF/CEC DDF Account ," text
                        if (formConfig.plainTextSections.length > 10) {
                          const distributionTextSection = formConfig.plainTextSections[10];
                          if (distributionTextSection && distributionTextSection.content && distributionTextSection.content.includes('Distribution of total institute share into IDF/CEC DDF Account')) {
                            ({ page: currentPage, currentY } = checkNewPage(currentY, 30, currentPage));
                            // Render as note with smaller font size
                            drawText(distributionTextSection.content, margin + 20, currentY, 10, false, currentPage);
                            currentY -= 15;
                          }
                        }
                        
                        // After the text, render "Total Institute Overhead Charges deducted (P) = Rs." field - aligned with CEC-09
                        const overheadChargesField = formConfig.fields.find((f: any) => 
                          f.label && f.label.includes('Total Institute Overhead Charges deducted (P) = Rs.')
                        );
                        if (overheadChargesField) {
                          ({ page: currentPage, currentY } = checkNewPage(currentY, 40, currentPage));
                          const tableLeftBorder = margin + 20; // Align with CEC-09
                          const labelText = "Total Institute Overhead Charges deducted (P) Rs";
                          const labelWidth = boldFont.widthOfTextAtSize(labelText, 10);
                          const value = overheadChargesField.value || "";
                          const valueX = tableLeftBorder + labelWidth + 10;
                          const underlineLength = 200; // Reduced underline length
                          const underlineEndX = valueX + underlineLength;
                          // Draw label at tableLeftBorder for proper alignment with CEC-09
                          drawText(labelText, tableLeftBorder, currentY, 10, true, currentPage);
                          if (value) {
                            drawText(value, valueX, currentY, 10, false, currentPage);
                          }
                          // Draw underline (reduced length)
                          currentPage.drawLine({
                            start: { x: valueX, y: currentY - 3 },
                            end: { x: underlineEndX, y: currentY - 3 },
                            thickness: 0.5,
                            color: rgb(0, 0, 0)
                          });
                          currentY -= 20;
                        }
                        
                        // After overhead charges, render the three distribution fields - aligned with CEC-09
                        const distributionFields = [
                          { label: "(i) 50% to IDF [CEC-IDF-001] Rs", originalLabel: "(i) 50% to IDF [CEC-IDF-001] = Rs." },
                          { label: "(ii) 45% to CEC [CEC-DDF-001] Rs", originalLabel: "(ii) 45% to CEC [CEC-DDF-001] = Rs." },
                          { label: "(iii) 5% Electricity [CEC-DDF-001] Rs", originalLabel: "(iii) 5% Electricity [CEC-DDF-001] = Rs." }
                        ];
                        
                        for (const distField of distributionFields) {
                          const field = formConfig.fields.find((f: any) => 
                            f.label && f.label === distField.originalLabel
                          );
                          if (field) {
                            ({ page: currentPage, currentY } = checkNewPage(currentY, 30, currentPage));
                            const tableLeftBorder = margin + 20; // Align with CEC-09
                            const labelWidth = boldFont.widthOfTextAtSize(distField.label, 10);
                            const value = field.value || "";
                            const valueX = tableLeftBorder + labelWidth + 10;
                            const underlineLength = 200; // Reduced underline length
                            const underlineEndX = valueX + underlineLength;
                            // Draw label at tableLeftBorder for proper alignment with CEC-09
                            drawText(distField.label, tableLeftBorder, currentY, 10, true, currentPage);
                            if (value) {
                              drawText(value, valueX, currentY, 10, false, currentPage);
                            }
                            // Draw underline (reduced length)
                            currentPage.drawLine({
                              start: { x: valueX, y: currentY - 3 },
                              end: { x: underlineEndX, y: currentY - 3 },
                              thickness: 0.5,
                              color: rgb(0, 0, 0)
                            });
                            currentY -= 15; // Reduced spacing between subsections
                          }
                        }
                        
                        // After the distribution fields, render "Coordinator, CEC" signature field (second occurrence) - aligned with CEC-09
                        // Find all "Coordinator, CEC" fields and use the second one (index 1)
                        const coordinatorCECFields = formConfig.fields.filter((f: any) => 
                          f.label && f.label === 'Coordinator, CEC'
                        );
                        if (coordinatorCECFields.length > 1) {
                          const coordinatorCECField = coordinatorCECFields[1]; // Second occurrence
                          ({ page: currentPage, currentY } = checkNewPage(currentY, 40, currentPage));
                          const tableLeftBorder = margin + 20; // Align with CEC-09
                          const labelWidth = boldFont.widthOfTextAtSize(coordinatorCECField.label || '', 10);
                          const value = coordinatorCECField.value || "";
                          const valueX = tableLeftBorder + labelWidth + 10;
                          const underlineLength = 200; // Reduced underline length
                          const underlineEndX = valueX + underlineLength;
                          // Draw label at tableLeftBorder for proper alignment with CEC-09
                          drawText(coordinatorCECField.label || '', tableLeftBorder, currentY, 10, true, currentPage);
                          if (value) {
                            drawText(value, valueX, currentY, 10, false, currentPage);
                          }
                          // Draw underline (reduced length)
                          currentPage.drawLine({
                            start: { x: valueX, y: currentY - 3 },
                            end: { x: underlineEndX, y: currentY - 3 },
                            thickness: 0.5,
                            color: rgb(0, 0, 0)
                          });
                          currentY -= 25; // Add spacing before notes
                        }
                        
                        // After the second "Coordinator, CEC" signature, render Coordination Fee notes
                        // Render "* Coordination Fee" heading (index 11)
                        if (formConfig.plainTextSections.length > 11) {
                          const coordinationFeeHeadingSection = formConfig.plainTextSections[11];
                          if (coordinationFeeHeadingSection && coordinationFeeHeadingSection.title && coordinationFeeHeadingSection.title.includes('* Coordination Fee')) {
                            ({ page: currentPage, currentY } = checkNewPage(currentY, 30, currentPage));
                            drawText(coordinationFeeHeadingSection.title, margin + 20, currentY, 12, true, currentPage);
                            currentY -= 20;
                          }
                        }
                        
                        // Render "(i) Open Participation Course" heading and content (index 12)
                        if (formConfig.plainTextSections.length > 12) {
                          const openParticipationSection = formConfig.plainTextSections[12];
                          if (openParticipationSection && openParticipationSection.title && openParticipationSection.title.includes('(i) Open Participation Course')) {
                            ({ page: currentPage, currentY } = checkNewPage(currentY, 30, currentPage));
                            // Render heading
                            drawText(openParticipationSection.title, margin + 20, currentY, 11, true, currentPage);
                            currentY -= 15;
                            // Render content
                            ({ page: currentPage, currentY } = checkNewPage(currentY, 80, currentPage));
                            const contentResult = drawMultilineText(openParticipationSection.content || '', margin + 20, currentY, contentWidth - 40, 10, currentPage, false);
                            currentPage = contentResult.page;
                            currentY = contentResult.currentY - 15;
                          }
                        }
                        
                        // Render "(ii) Sponsored Course" heading and content (index 13)
                        if (formConfig.plainTextSections.length > 13) {
                          const sponsoredCourseSection = formConfig.plainTextSections[13];
                          if (sponsoredCourseSection && sponsoredCourseSection.title && sponsoredCourseSection.title.includes('(ii) Sponsored Course')) {
                            ({ page: currentPage, currentY } = checkNewPage(currentY, 30, currentPage));
                            // Render heading
                            drawText(sponsoredCourseSection.title, margin + 20, currentY, 11, true, currentPage);
                            currentY -= 15;
                            // Render content
                            ({ page: currentPage, currentY } = checkNewPage(currentY, 80, currentPage));
                            const contentResult = drawMultilineText(sponsoredCourseSection.content || '', margin + 20, currentY, contentWidth - 40, 10, currentPage, false);
                            currentPage = contentResult.page;
                            currentY = contentResult.currentY - 15;
                          }
                        }
                      } catch (tableError: any) {
                        console.error('Error rendering distribution table:', tableError?.message || tableError);
                        currentY -= 100;
                      } finally {
                        // Mark that Coordination Fee notes have been rendered - skip all remaining fields
                        // This MUST be set after attempting to render the Coordination Fee notes, regardless of errors
                        coordinationFeeNotesRendered = true;
                        console.log('Coordination Fee notes rendered - flag set to true. Will skip all remaining fields.');
                      }
                    }
                  }
                }
              } catch (noteError) {
                console.error('Error rendering coordination fee note:', noteError);
                currentY -= 5;
              }
            }
          }
        } else {
          currentY -= 20; // Add spacing between fields (only if not coordination fee field)
        }
        
        // If this is "Signature of the Course Coordinator" in TA/Lab Staff form, process note right after it
        if (field.label && field.label.includes('Signature of the Course Coordinator')) {
          // Check if it's TA/Lab Staff form by title
          const isTALabStaffForm = formConfig.title && (
            formConfig.title.includes('TEACHING ASSISTANT') || 
            formConfig.title.includes('TECHNICAL ASSISTANT') ||
            formConfig.title.includes('LAB STAFF')
          );
          
          if (isTALabStaffForm && formConfig.plainTextSections && formConfig.plainTextSections.length > 0) {
            const noteSection = formConfig.plainTextSections[0];
            // Render the first plainTextSection as the note (no input field, no bold)
            if (noteSection && noteSection.content) {
              try {
                    // Align note section with table/rectangle left border for consistent alignment
                    // Define once at the top of the try block for all nested scopes
                    const tableLeftBorder = margin + 20;
                    
                    ({ page: currentPage, currentY } = checkNewPage(currentY, 50, currentPage));
                    // Draw note without bold (regular font) - no underline, just plain text
                    const noteResult = drawMultilineText(noteSection.content, tableLeftBorder, currentY, contentWidth - 40, 10, currentPage, false);
                    currentPage = noteResult.page;
                    currentY = noteResult.currentY - 20;
                    
                    // After the note, render BILL PROFORMA section
                    // Render heading "BILL PROFORMA (TA/Lab Staff)" if it exists
                    if (formConfig.plainTextSections.length > 1) {
                      const proformaHeadingSection = formConfig.plainTextSections[1];
                      if (proformaHeadingSection && proformaHeadingSection.title) {
                        ({ page: currentPage, currentY } = checkNewPage(currentY, 50, currentPage));
                        drawText(proformaHeadingSection.title, tableLeftBorder, currentY, 11, true, currentPage);
                        currentY -= 40;
                        
                        // Render BILL PROFORMA fields (Name, Course Name, Course Code, Course Coordinator, Department)
                        // These are fields at indices 5-9 in the fields array
                        const proformaFields = [
                          { label: "Name :", index: 5 },
                          { label: "Course Name :", index: 6 },
                          { label: "Course Code :", index: 7 },
                          { label: "Course Coordinator :", index: 8 },
                          { label: "Department :", index: 9 }
                        ];
                        
                        for (const proformaField of proformaFields) {
                          if (formConfig.fields[proformaField.index]) {
                            ({ page: currentPage, currentY } = checkNewPage(currentY, 35, currentPage));
                            const field = formConfig.fields[proformaField.index];
                            const labelWidth = boldFont.widthOfTextAtSize(field.label, 11);
                            const value = field.value || "";
                            const valueX = tableLeftBorder + labelWidth + 10;
                            const maxValueX = pageWidth - margin - 20;
                            
                            drawText(field.label, tableLeftBorder, currentY, 11, true, currentPage);
                            if (value) {
                              drawText(value, valueX, currentY, 11, false, currentPage);
                            }
                            // Draw underline
                            currentPage.drawLine({
                              start: { x: valueX, y: currentY - 3 },
                              end: { x: maxValueX, y: currentY - 3 },
                              thickness: 1,
                              color: rgb(0, 0, 0)
                            });
                            currentY -= 18;
                          }
                        }
                        
                        // Render BILL PROFORMA table (second table, index 1)
                        if (formConfig.tables && formConfig.tables.length > 1) {
                          const proformaTable = formConfig.tables[1];
                          try {
                        ({ page: currentPage, currentY } = checkNewPage(currentY, 150, currentPage));
                        const tableResult = drawTable(proformaTable.data, currentY, currentPage, proformaTable.label || "", true, undefined, undefined, false);
                        currentPage = tableResult.page;
                        currentY = tableResult.currentY - 20;
                        
                        // After the table, render "Total Rs." field
                        if (formConfig.fields.length > 10) {
                          ({ page: currentPage, currentY } = checkNewPage(currentY, 40, currentPage));
                          const totalRsField = formConfig.fields[10];
                          // Use tableLeftBorder already defined in outer scope
                          const labelWidth = boldFont.widthOfTextAtSize(totalRsField.label, 11);
                          const value = totalRsField.value || "";
                          const valueX = tableLeftBorder + labelWidth + 10;
                          const maxValueX = pageWidth - margin - 20;
                          
                          drawText(totalRsField.label, tableLeftBorder, currentY, 11, true, currentPage);
                          if (value) {
                            drawText(value, valueX, currentY, 11, false, currentPage);
                          }
                          // Draw underline
                          currentPage.drawLine({
                            start: { x: valueX, y: currentY - 3 },
                            end: { x: maxValueX, y: currentY - 3 },
                            thickness: 1,
                            color: rgb(0, 0, 0)
                          });
                          currentY -= 40;
                        }
                        
                        // Render rectangle with bank and contact details
                        // Fields inside rectangle: Bank A/c No. (11), Bank and Branch (12), IFSC Code (13), 
                        // Email ID (14), Enroll No. (15), Contact No. (16), Signature (17)
                        const rectangleFields = [
                          { label: "Bank A/c No.:", index: 11 },
                          { label: "Bank and Branch:", index: 12 },
                          { label: "IFSC Code:", index: 13 },
                          { label: "Email ID:", index: 14 },
                          { label: "Enroll No.:", index: 15 },
                          { label: "Contact No. :", index: 16 },
                          { label: "Signature of the claimant (with date)", index: 17 }
                        ];
                        
                        // Calculate rectangle height with proper spacing (7 fields * 20 spacing + padding)
                        const fieldHeight = 20; // Reduced from 30 to 20
                        const padding = 18; // Increased padding for better vertical centering
                        const rectangleHeight = (rectangleFields.length * fieldHeight) + (padding * 2);
                        
                        // Check if we need a new page for the rectangle
                        ({ page: currentPage, currentY } = checkNewPage(currentY, rectangleHeight + 20, currentPage));
                        
                        const rectangleStartY = currentY;
                        const rectangleX = margin + 20;
                        const rectangleWidth = contentWidth - 40;
                        
                        // Draw rectangle with black stroke first
                        currentPage.drawRectangle({
                          x: rectangleX,
                          y: rectangleStartY - rectangleHeight,
                          width: rectangleWidth,
                          height: rectangleHeight,
                          borderColor: rgb(0, 0, 0),
                          borderWidth: 1,
                        });
                        
                        // Draw fields inside rectangle
                        // Align fields inside rectangle with proper padding from rectangle edges
                        const rectAlignX = rectangleX + padding; // Start from rectangle left edge + padding
                        let fieldY = rectangleStartY - padding; // Start with proper top padding
                        
                        for (const fieldInfo of rectangleFields) {
                          if (formConfig.fields[fieldInfo.index]) {
                            const field = formConfig.fields[fieldInfo.index];
                            const labelWidth = boldFont.widthOfTextAtSize(field.label, 11);
                            const value = field.value || "";
                            const valueX = rectAlignX + labelWidth + 10;
                            const maxValueX = rectangleX + rectangleWidth - padding; // Leave padding on right side
                            
                            drawText(field.label, rectAlignX, fieldY, 11, true, currentPage);
                            if (value) {
                              drawText(value, valueX, fieldY, 11, false, currentPage);
                            }
                            // Draw underline
                            currentPage.drawLine({
                              start: { x: valueX, y: fieldY - 3 },
                              end: { x: maxValueX, y: fieldY - 3 },
                              thickness: 1,
                              color: rgb(0, 0, 0)
                            });
                            fieldY -= fieldHeight;
                          }
                        }
                        
                        // Set currentY right after rectangle closes and add proper spacing before certification section
                        currentY = rectangleStartY - rectangleHeight - 20; // Add spacing after rectangle
                        
                        // Render certification section after rectangle with proper spacing
                        // Align with rectangle's left border for consistent alignment
                        ({ page: currentPage, currentY } = checkNewPage(currentY, 100, currentPage));
                        
                        // Use rectangle's left edge for alignment (same as rectangle border)
                        const alignX = rectangleX;
                        
                        // Item 1: Completion of work (with input field)
                        if (formConfig.fields.length > 18) {
                          const completionField = formConfig.fields[18];
                          const labelWidth = boldFont.widthOfTextAtSize(completionField.label, 11);
                          const value = completionField.value || "";
                          const valueX = alignX + labelWidth + 10;
                          const maxValueX = pageWidth - margin - 20;
                          
                          drawText(completionField.label, alignX, currentY, 11, true, currentPage);
                          if (value) {
                            drawText(value, valueX, currentY, 11, false, currentPage);
                          }
                          // Draw underline
                          currentPage.drawLine({
                            start: { x: valueX, y: currentY - 3 },
                            end: { x: maxValueX, y: currentY - 3 },
                            thickness: 1,
                            color: rgb(0, 0, 0)
                          });
                          currentY -= 18;
                        }
                        
                        // Item 2: Verified and passed (plain text, no input)
                        drawText("2. Verified and passed for payment.", alignX, currentY, 11, false, currentPage);
                        currentY -= 18;
                        
                        // Item 3: Certified the payment (plain text, no input)
                        const item3Text = "3. Certified the payment is actually due and being made for the first time.";
                        const item3Result = drawMultilineText(item3Text, alignX, currentY, contentWidth - 40, 11, currentPage, false);
                        currentPage = item3Result.page;
                        currentY = item3Result.currentY - 18; // Consistent spacing (18px)
                        
                        // Item 4: Unauthorized absence (plain text, no input)
                        const item4Text = "4. It is also confirm that the claimant has not been on un authorized absence during the period of above claims.";
                        const item4Result = drawMultilineText(item4Text, alignX, currentY, contentWidth - 40, 11, currentPage, false);
                        currentPage = item4Result.page;
                        currentY = item4Result.currentY - 18; // Consistent spacing (18px)
                        
                        // Course Coordinator signature field
                        if (formConfig.fields.length > 19) {
                          const coordinatorField = formConfig.fields[19];
                          const labelWidth = boldFont.widthOfTextAtSize(coordinatorField.label, 11);
                          const value = coordinatorField.value || "";
                          const valueX = alignX + labelWidth + 10;
                          const maxValueX = pageWidth - margin - 20;
                          
                          drawText(coordinatorField.label, alignX, currentY, 11, true, currentPage);
                          if (value) {
                            drawText(value, valueX, currentY, 11, false, currentPage);
                          }
                          // Draw underline
                          currentPage.drawLine({
                            start: { x: valueX, y: currentY - 3 },
                            end: { x: maxValueX, y: currentY - 3 },
                            thickness: 1,
                            color: rgb(0, 0, 0)
                          });
                          currentY -= 18;
                        }
                        
                        // Coordinator, CEC signature field
                        if (formConfig.fields.length > 20) {
                          const cecField = formConfig.fields[20];
                          const labelWidth = boldFont.widthOfTextAtSize(cecField.label, 11);
                          const value = cecField.value || "";
                          const valueX = alignX + labelWidth + 10;
                          const maxValueX = pageWidth - margin - 20;
                          
                          drawText(cecField.label, alignX, currentY, 11, true, currentPage);
                          if (value) {
                            drawText(value, valueX, currentY, 11, false, currentPage);
                          }
                          // Draw underline
                          currentPage.drawLine({
                            start: { x: valueX, y: currentY - 3 },
                            end: { x: maxValueX, y: currentY - 3 },
                            thickness: 1,
                            color: rgb(0, 0, 0)
                          });
                          currentY -= 40;
                        }
                        
                        // Render the paragraph (last plainTextSection, now at index 2)
                        if (formConfig.plainTextSections && formConfig.plainTextSections.length > 2) {
                          const paragraphSection = formConfig.plainTextSections[2];
                          if (paragraphSection && paragraphSection.content) {
                            ({ page: currentPage, currentY } = checkNewPage(currentY, 100, currentPage));
                            const paraResult = drawMultilineText(paragraphSection.content, alignX, currentY, contentWidth - 40, 11, currentPage, false);
                            currentPage = paraResult.page;
                            currentY = paraResult.currentY - 20;
                          }
                        }
                      } catch (tableError: any) {
                          console.error('Error rendering BILL PROFORMA table:', tableError?.message || tableError);
                          currentY -= 100;
                        }
                      }
                    }
                  }
              } catch (noteError) {
                console.error('Error rendering note after signature:', noteError);
                currentY -= 18;
              }
            }
          }
        }
        
        // If this is "Department /Centre" in coordination fee form, render "A. COURSE FUND POSITION" heading after it
        if (field.label && field.label.includes('Department /Centre')) {
          if (isCoordinationFeeForm && formConfig.plainTextSections && formConfig.plainTextSections.length > 0) {
            const headingSection = formConfig.plainTextSections[0];
            if (headingSection && headingSection.title && headingSection.title.includes('A. COURSE FUND POSITION')) {
              try {
                ({ page: currentPage, currentY } = checkNewPage(currentY, 30, currentPage));
                drawText(headingSection.title, margin + 20, currentY, 12, true, currentPage);
                            currentY -= 15;
              } catch (headingError) {
                console.error('Error rendering A. COURSE FUND POSITION heading:', headingError);
                            currentY -= 15;
              }
            }
          }
        }
        
        // If this is "i. Balance amount available" in coordination fee form, render "B. Details of amount to be distributed" heading after it
        if (field.label && field.label.includes('i. Balance amount available')) {
          if (isCoordinationFeeForm && formConfig.plainTextSections && formConfig.plainTextSections.length > 1) {
            const headingSection = formConfig.plainTextSections[1];
            if (headingSection && headingSection.title && headingSection.title.includes('B. Details of amount to be distributed')) {
              try {
                ({ page: currentPage, currentY } = checkNewPage(currentY, 30, currentPage));
                drawText(headingSection.title, margin + 20, currentY, 12, true, currentPage);
                            currentY -= 15;
              } catch (headingError) {
                console.error('Error rendering B. Details heading:', headingError);
                            currentY -= 15;
              }
            }
          }
        }
        
        // If this is "Name of the Coordinator:" in TA/Lab Staff form, process TA table right after it
        if (field.label && field.label.includes('Name of the Coordinator:')) {
          // Check if it's TA/Lab Staff form by title
          const isTALabStaffForm = formConfig.title && (
            formConfig.title.includes('TEACHING ASSISTANT') || 
            formConfig.title.includes('TECHNICAL ASSISTANT') ||
            formConfig.title.includes('LAB STAFF')
          );
          
          if (isTALabStaffForm && formConfig.tables && formConfig.tables.length > 0) {
            // Render the first table (TA details table) after Name of the Coordinator
            const taTable = formConfig.tables[0];
            
            try {
              ({ page: currentPage, currentY } = checkNewPage(currentY, 150, currentPage));
              
              // Render the TA table with smaller label font and non-bold headers
              const tableResult = drawTable(taTable.data, currentY, currentPage, taTable.label || "", true, undefined, 10, false);
              currentPage = tableResult.page;
              currentY = tableResult.currentY - 40; // Increased spacing after table
            } catch (tableError: any) {
              console.error('Error rendering TA table:', tableError?.message || tableError);
              currentY -= 100;
            }
          }
        }
        
        // If this is field 3 (Course Code) in remuneration form, process expert details table right after it
        if (field.label && field.label.includes('3. Course Code :')) {
          // Check if it's remuneration form by title
          const isRemunerationForm = formConfig.title && formConfig.title.toLowerCase().includes('remuneration');
          
          if (isRemunerationForm && formConfig.tables && formConfig.tables.length > 0) {
            // Always render the first table after Course Code for remuneration form
            const expertTable = formConfig.tables[0];
            
            try {
              ({ page: currentPage, currentY } = checkNewPage(currentY, 150, currentPage));
              
              // Render the expert details table with font size 10
              const tableResult = drawTable(expertTable.data, currentY, currentPage, expertTable.label || "", false, 10);
              currentPage = tableResult.page;
              currentY = tableResult.currentY - 20;
              
              // After expert table, render the Details table (second table) if it exists
              if (formConfig.tables && formConfig.tables.length > 1) {
                const detailsTable = formConfig.tables[1];
                // Check if this is the Details table (has "Details", "Hours", "Date" columns)
                if (detailsTable && detailsTable.data && detailsTable.data.columns) {
                  const hasDetailsColumn = detailsTable.data.columns.some((col: any) => 
                    col.header && col.header.includes('Details')
                  );
                  if (hasDetailsColumn) {
                    try {
                      ({ page: currentPage, currentY } = checkNewPage(currentY, 150, currentPage));
                      // Render the Details table with font size 10
                      const detailsTableResult = drawTable(detailsTable.data, currentY, currentPage, detailsTable.label || "", false, 10);
                      currentPage = detailsTableResult.page;
                      currentY = detailsTableResult.currentY - 20;
                    } catch (detailsTableError: any) {
                      console.error('Error rendering Details table after expert table:', detailsTableError?.message || detailsTableError);
                      currentY -= 100;
                    }
                  }
                }
              }
              
              // After Details table, render the note (first plainTextSection) if it exists
              if (formConfig.plainTextSections && formConfig.plainTextSections.length > 0) {
                const noteSection = formConfig.plainTextSections[0];
                // Render the first plainTextSection as the note (no input field, no bold)
                if (noteSection && noteSection.content) {
                  try {
                    ({ page: currentPage, currentY } = checkNewPage(currentY, 50, currentPage));
                    // Draw note without bold (regular font) - no underline, just plain text
                    const noteResult = drawMultilineText(noteSection.content, margin + 20, currentY, contentWidth - 40, 10, currentPage, false);
                    currentPage = noteResult.page;
                    currentY = noteResult.currentY - 20;
                  } catch (noteError) {
                    console.error('Error rendering note after Details table:', noteError);
                    currentY -= 18;
                  }
                }
              }
            } catch (tableError: any) {
              console.error('Error rendering expert table:', tableError?.message || tableError);
              currentY -= 100;
            }
          }
        }
        
        // If this is "8. Credit course code" in request-for-loan form, process table and subsequent fields
        if (field.label && field.label.includes('8. Credit course code')) {
          // Check if it's request-for-loan form by title
          const isRequestForLoanForm = formConfig.title && (
            formConfig.title.toLowerCase().includes('request for loan') ||
            formConfig.title.toLowerCase().includes('loan')
          );
          
          if (isRequestForLoanForm && formConfig.tables && formConfig.tables.length > 0) {
            // Render the outstanding loan table after "8. Credit course code"
            const outstandingLoanTable = formConfig.tables[0];
            
            try {
              ({ page: currentPage, currentY } = checkNewPage(currentY, 150, currentPage));
              
              // Render the outstanding loan table
              const tableResult = drawTable(outstandingLoanTable.data, currentY, currentPage, outstandingLoanTable.label || "", false);
              currentPage = tableResult.page;
              currentY = tableResult.currentY - 30; // Spacing after table
              
              // After table, render "9 (b) Reason for non-adjustment:" (multiline field)
              const reasonField = formConfig.multilineFields?.find(f => 
                f.label && f.label.includes('9 (b) Reason for non-adjustment')
              );
              if (reasonField) {
                try {
                  ({ page: currentPage, currentY } = checkNewPage(currentY, 80, currentPage));
                  
                  // Draw the label
                  drawText(reasonField.label || '', margin + 20, currentY, 12, true, currentPage);
                            currentY -= 15;
                  
                  // Draw the multiline value
                  const multilineResult = drawMultilineText(reasonField.value || '', margin + 20, currentY, reasonField.maxWidth || 400, 12, currentPage, false);
                  currentPage = multilineResult.page;
                  currentY = multilineResult.currentY - 30;
                } catch (reasonError) {
                  console.error('Error rendering reason for non-adjustment:', reasonError);
                  currentY -= 50;
                }
              }
              
              // After reason field, render the note (first plainTextSection)
              if (formConfig.plainTextSections && formConfig.plainTextSections.length > 0) {
                const noteSection = formConfig.plainTextSections[0];
                if (noteSection && noteSection.content) {
                  try {
                    ({ page: currentPage, currentY } = checkNewPage(currentY, 50, currentPage));
                    // Draw note as plain text (no bold, no underline)
                    const noteResult = drawMultilineText(noteSection.content, margin + 20, currentY, contentWidth - 40, 10, currentPage, false);
                    currentPage = noteResult.page;
                    currentY = noteResult.currentY - 30;
                  } catch (noteError) {
                    console.error('Error rendering note:', noteError);
                    currentY -= 18;
                  }
                }
              }
              
              // After note, render the two signature fields
              try {
                ({ page: currentPage, currentY } = checkNewPage(currentY, 80, currentPage));
                
                // First signature: "(Signature of Course Coordinator)"
                drawText("(Signature of Course Coordinator)", margin + 20, currentY, 12, false, currentPage);
                // Draw underline for signature
                currentPage.drawLine({
                  start: { x: margin + 20, y: currentY - 15 },
                  end: { x: margin + 20 + 250, y: currentY - 15 },
                  thickness: 1,
                  color: rgb(0, 0, 0)
                });
                currentY -= 50; // Increased spacing between signatures
                
                // Second signature: "(Recommendation of the Coordinator, CEC)"
                drawText("(Recommendation of the Coordinator, CEC)", margin + 20, currentY, 12, false, currentPage);
                // Draw underline for signature
                currentPage.drawLine({
                  start: { x: margin + 20, y: currentY - 15 },
                  end: { x: margin + 20 + 300, y: currentY - 15 },
                  thickness: 1,
                  color: rgb(0, 0, 0)
                });
                currentY -= 18;
              } catch (signatureError) {
                console.error('Error rendering signatures:', signatureError);
                currentY -= 60;
              }
            } catch (tableError: any) {
              console.error('Error rendering outstanding loan table:', tableError?.message || tableError);
              currentY -= 100;
            }
          }
        }
        
        // If this is field 4 (Batch No.), process multiline field 5 (Program Partner) right after it
        if (field.label && field.label.includes('4. Batch No. of the Course:')) {
          const programPartnerField = formConfig.multilineFields?.find(f => 
            f.label && f.label.includes('5. Name and Address of Program Partner')
          );
          if (programPartnerField) {
            try {
              ({ page: currentPage, currentY } = checkNewPage(currentY, 80, currentPage));
              
              // Check if label needs to be wrapped
              const labelWidth = boldFont.widthOfTextAtSize(programPartnerField.label || '', 10);
              const maxLabelWidth = 300;
              
                if (labelWidth > maxLabelWidth) {
                // Use multiline text for long labels with proper alignment
                const { textX } = getAlignedPositions(10, true);
                const numberPattern = /^(\d+\.)\s+(.+)$/;
                const match = (programPartnerField.label || '').match(numberPattern);
                if (match) {
                  const { numberX } = getAlignedPositions(10, true);
                  const numberPart = match[1];
                  const textPart = match[2];
                  drawText(numberPart, numberX, currentY, 10, true, currentPage);
                  const labelResult = drawMultilineText(textPart, textX, currentY, maxLabelWidth, 10, currentPage, true);
                  currentPage = labelResult.page;
                  currentY = labelResult.currentY - 20;
                } else {
                  const labelResult = drawMultilineText(programPartnerField.label || '', textX, currentY, maxLabelWidth, 10, currentPage, true);
                  currentPage = labelResult.page;
                  currentY = labelResult.currentY - 20;
                }
              } else {
                // Draw the label with proper alignment
                drawAlignedLabel(programPartnerField.label || '', currentY, currentPage, 10, true);
                currentY -= 18;
              }
              
              const multilineResult = drawMultilineText(programPartnerField.value || '', margin + 20, currentY, programPartnerField.maxWidth || 350, 10, currentPage, false);
              currentPage = multilineResult.page;
              currentY = multilineResult.currentY - 30;
            } catch (fieldError) {
              console.error('Error processing program partner field:', fieldError);
              currentY -= 50;
            }
          }
        }
        
        // Special handling for "9. Duration:" - render subfields horizontally
        if (field.label && field.label.includes('9. Duration:')) {
          try {
            ({ page: currentPage, currentY } = checkNewPage(currentY, 25, currentPage));
            // Further reduce the perceived gap from the previous line specifically for sponsored/open forms
            currentY += 12;
            
            // Draw the section header with proper alignment
            drawAlignedLabel(field.label || '', currentY, currentPage, 11, true);
            // Add spacing between main section and subsections
            currentY -= 20;
            
            // Check for sponsored form (2 fields: Weeks, Hours of Training) or open participation form (3 fields)
            if (fieldIndex + 1 < formConfig.fields.length &&
                fieldIndex + 2 < formConfig.fields.length) {
              const firstField = formConfig.fields[fieldIndex + 1];
              const secondField = formConfig.fields[fieldIndex + 2];
              
              // Sponsored form: Weeks and Hours of Training
              if (firstField && secondField &&
                  firstField.label === 'Weeks:' &&
                  secondField.label === 'Hours of Training:') {
                
                ({ page: currentPage, currentY } = checkNewPage(currentY, 20, currentPage));
                
                // Use aligned textX position for subfields - align with main section text
                const { textX } = getAlignedPositions(11, true);
                const startX = textX; // Align subsection text with main section text
                const fieldWidth = (pageWidth - 2 * margin - 40) / 2; // Divide available width by 2
                
                // Field 1: Weeks
                const weeksLabel = firstField.label || '';
                const weeksValue = firstField.value || '';
                const weeksLabelWidth = font.widthOfTextAtSize(weeksLabel, 11);
                drawText(weeksLabel, startX, currentY, 11, false, currentPage);
                drawText(weeksValue, startX + weeksLabelWidth + 10, currentY, 11, false, currentPage);
                
                // Field 2: Hours of Training
                const hoursLabel = secondField.label || '';
                const hoursValue = secondField.value || '';
                const hoursLabelWidth = font.widthOfTextAtSize(hoursLabel, 11);
                const hoursX = startX + fieldWidth;
                drawText(hoursLabel, hoursX, currentY, 11, false, currentPage);
                drawText(hoursValue, hoursX + hoursLabelWidth + 10, currentY, 11, false, currentPage);
                
                // Add spacing after subsections before next section
                currentY -= 20;
                
                // Skip the 2 subfields in normal processing
                return;
              }
            }
            
            // Open participation form: Get the 3 subfields (Months, Lectures, hands on)
            if (fieldIndex + 1 < formConfig.fields.length &&
                fieldIndex + 2 < formConfig.fields.length &&
                fieldIndex + 3 < formConfig.fields.length) {
              const monthsField = formConfig.fields[fieldIndex + 1];
              const lecturesField = formConfig.fields[fieldIndex + 2];
              const handsOnField = formConfig.fields[fieldIndex + 3];
              
              if (monthsField && lecturesField && handsOnField &&
                  monthsField.label === 'Months:' &&
                  lecturesField.label === 'No. of hours Lectures:' &&
                  handsOnField.label === 'No. of hours hands on:') {
                
                ({ page: currentPage, currentY } = checkNewPage(currentY, 20, currentPage));
                
                // Use aligned textX position for subfields - align with main section text
                const { textX } = getAlignedPositions(11, true);
                const startX = textX; // Align subsection text with main section text
                const fieldWidth = (pageWidth - 2 * margin - 40) / 3; // Divide available width by 3
                
                // Field 1: Months
                const monthsLabel = monthsField.label || '';
                const monthsValue = monthsField.value || '';
                const monthsLabelWidth = font.widthOfTextAtSize(monthsLabel, 11);
                drawText(monthsLabel, startX, currentY, 11, false, currentPage);
                drawText(monthsValue, startX + monthsLabelWidth + 10, currentY, 11, false, currentPage);
                
                // Field 2: Lectures
                const lecturesLabel = lecturesField.label || '';
                const lecturesValue = lecturesField.value || '';
                const lecturesLabelWidth = font.widthOfTextAtSize(lecturesLabel, 11);
                const lecturesX = startX + fieldWidth;
                drawText(lecturesLabel, lecturesX, currentY, 11, false, currentPage);
                drawText(lecturesValue, lecturesX + lecturesLabelWidth + 10, currentY, 11, false, currentPage);
                
                // Field 3: Hands on
                const handsOnLabel = handsOnField.label || '';
                const handsOnValue = handsOnField.value || '';
                const handsOnLabelWidth = font.widthOfTextAtSize(handsOnLabel, 11);
                const handsOnX = startX + 2 * fieldWidth;
                drawText(handsOnLabel, handsOnX, currentY, 11, false, currentPage);
                drawText(handsOnValue, handsOnX + handsOnLabelWidth + 10, currentY, 11, false, currentPage);
                
                // Add spacing after subsections before next section
                currentY -= 20;
                
                // Skip the 3 subfields in normal processing
                // We'll handle this by checking fieldIndex in the loop
              }
            }
          } catch (durationError) {
            console.error('Error processing duration section:', durationError);
            currentY -= 30;
          }
          return; // Skip normal processing
        }
        
        // Special handling for "13. Course Fee Per participant:" - render subfields horizontally
        if (field.label && field.label.includes('13. Course Fee Per participant:')) {
          try {
            ({ page: currentPage, currentY } = checkNewPage(currentY, 30, currentPage));
            // Reduce the perceived gap from the previous line a bit more
            currentY += 10;
            
            // Draw the section header with proper alignment
            drawAlignedLabel(field.label || '', currentY, currentPage, 11, true);
            // Add spacing between main section and subsections
            currentY -= 20;
            
            // Get the 3 subfields (Course Fee, Fee with GST, Total Fee)
            if (fieldIndex + 1 < formConfig.fields.length &&
                fieldIndex + 2 < formConfig.fields.length &&
                fieldIndex + 3 < formConfig.fields.length) {
              const courseFeeField = formConfig.fields[fieldIndex + 1];
              const gstFeeField = formConfig.fields[fieldIndex + 2];
              const totalFeeField = formConfig.fields[fieldIndex + 3];
              
              if (courseFeeField && gstFeeField && totalFeeField &&
                  courseFeeField.label === 'Course Fee (Rs.):' &&
                  gstFeeField.label === 'Fee with GST @ 18%:' &&
                  totalFeeField.label === 'Total Fee:') {
                
                ({ page: currentPage, currentY } = checkNewPage(currentY, 20, currentPage));
                
                // Use aligned textX position for subfields - align with main section text
                const { textX } = getAlignedPositions(11, true);
                const startX = textX; // Align subsection text with main section text
                const fieldWidth = (pageWidth - 2 * margin - 40) / 3; // Divide available width by 3
                
                // Field 1: Course Fee
                const courseFeeLabel = courseFeeField.label || '';
                const courseFeeValue = courseFeeField.value || '';
                const courseFeeLabelWidth = font.widthOfTextAtSize(courseFeeLabel, 11);
                drawText(courseFeeLabel, startX, currentY, 11, false, currentPage);
                drawText(courseFeeValue, startX + courseFeeLabelWidth + 10, currentY, 11, false, currentPage);
                
                // Field 2: Fee with GST
                const gstFeeLabel = gstFeeField.label || '';
                const gstFeeValue = gstFeeField.value || '';
                const gstFeeLabelWidth = font.widthOfTextAtSize(gstFeeLabel, 11);
                const gstFeeX = startX + fieldWidth;
                drawText(gstFeeLabel, gstFeeX, currentY, 11, false, currentPage);
                drawText(gstFeeValue, gstFeeX + gstFeeLabelWidth + 10, currentY, 11, false, currentPage);
                
                // Field 3: Total Fee
                const totalFeeLabel = totalFeeField.label || '';
                const totalFeeValue = totalFeeField.value || '';
                const totalFeeLabelWidth = font.widthOfTextAtSize(totalFeeLabel, 11);
                const totalFeeX = startX + 2 * fieldWidth;
                drawText(totalFeeLabel, totalFeeX, currentY, 11, false, currentPage);
                drawText(totalFeeValue, totalFeeX + totalFeeLabelWidth + 10, currentY, 11, false, currentPage);
                
                // Add spacing after subsections before next section
                currentY -= 20;
                
                // Skip the 3 subfields in normal processing
                // We'll handle this by checking fieldIndex in the loop
              }
            }
          } catch (courseFeeError) {
            console.error('Error processing course fee section:', courseFeeError);
            currentY -= 30;
          }
          return; // Skip normal processing
        }
        
        // Special handling for "16. IITR Receipts as per MoU:" - render subfields horizontally
        if (field.label && field.label.includes('16. IITR Receipts as per MoU:')) {
          try {
            ({ page: currentPage, currentY } = checkNewPage(currentY, 30, currentPage));
            // Reduce the perceived gap from the previous line a bit more
            currentY += 10;
            
            // Draw the section header with proper alignment (10 pt instead of 11)
            drawAlignedLabel(field.label || '', currentY, currentPage, 10, true);
            // Add spacing between main section and subsections
            currentY -= 20;
            
            // Get the 2 subfields (Percentage, Amount)
            if (fieldIndex + 1 < formConfig.fields.length &&
                fieldIndex + 2 < formConfig.fields.length) {
              const percentageField = formConfig.fields[fieldIndex + 1];
              const amountField = formConfig.fields[fieldIndex + 2];
              
              if (percentageField && amountField &&
                  percentageField.label === 'Percentage:' &&
                  amountField.label === 'Amount (Rs.):') {
                
                ({ page: currentPage, currentY } = checkNewPage(currentY, 20, currentPage));
                
                // Use aligned textX position for subfields - align with main section text
                const { textX } = getAlignedPositions(11, true);
                const startX = textX; // Align subsection text with main section text
                const fieldWidth = (pageWidth - 2 * margin - 40) / 2; // Divide available width by 2
                
                // Field 1: Percentage
                const percentageLabel = percentageField.label || '';
                const percentageValue = percentageField.value || '';
                const percentageLabelWidth = font.widthOfTextAtSize(percentageLabel, 11);
                drawText(percentageLabel, startX, currentY, 11, false, currentPage);
                drawText(percentageValue, startX + percentageLabelWidth + 10, currentY, 11, false, currentPage);
                
                // Field 2: Amount
                const amountLabel = amountField.label || '';
                const amountValue = amountField.value || '';
                const amountLabelWidth = font.widthOfTextAtSize(amountLabel, 11);
                const amountX = startX + fieldWidth;
                drawText(amountLabel, amountX, currentY, 11, false, currentPage);
                drawText(amountValue, amountX + amountLabelWidth + 10, currentY, 11, false, currentPage);
                
                // Add spacing after subsections before next section
                currentY -= 20;
                
                // Skip the 2 subfields in normal processing
                // We'll handle this by checking fieldIndex in the loop
              }
            }
          } catch (iitrReceiptsError) {
            console.error('Error processing IITR Receipts section:', iitrReceiptsError);
            currentY -= 30;
          }
          return; // Skip normal processing
        }
        
        // If this is field 4's subfield "If Others, please specify:", process multiline field 5 (Sponsor Details) right after it
        if (field.label && field.label.includes('If Others, please specify:')) {
          const sponsorField = formConfig.multilineFields?.find(f => 
            f.label && f.label.includes('5. Name and Address of Sponsor')
          );
          if (sponsorField) {
            try {
              ({ page: currentPage, currentY } = checkNewPage(currentY, 80, currentPage));
              
              // Check if label needs to be wrapped
              const labelWidth = boldFont.widthOfTextAtSize(sponsorField.label || '', 12);
              const maxLabelWidth = 300;
              
              if (labelWidth > maxLabelWidth) {
                // Use multiline text for long labels with proper alignment
                const { textX } = getAlignedPositions(12, true);
                const numberPattern = /^(\d+\.)\s+(.+)$/;
                const match = (sponsorField.label || '').match(numberPattern);
                if (match) {
                  const { numberX } = getAlignedPositions(12, true);
                  const numberPart = match[1];
                  const textPart = match[2];
                  drawText(numberPart, numberX, currentY, 12, true, currentPage);
                  const labelResult = drawMultilineText(textPart, textX, currentY, maxLabelWidth, 12, currentPage, true);
                  currentPage = labelResult.page;
                  currentY = labelResult.currentY - 20;
                } else {
                  const labelResult = drawMultilineText(sponsorField.label || '', textX, currentY, maxLabelWidth, 12, currentPage, true);
                  currentPage = labelResult.page;
                  currentY = labelResult.currentY - 20;
                }
              } else {
                // Draw the label with proper alignment
                drawAlignedLabel(sponsorField.label || '', currentY, currentPage, 12, true);
                currentY -= 18;
              }
              
              const multilineResult = drawMultilineText(sponsorField.value || '', margin + 20, currentY, sponsorField.maxWidth || 350, 12, currentPage, false);
              currentPage = multilineResult.page;
              currentY = multilineResult.currentY - 30;
            } catch (fieldError) {
              console.error('Error processing sponsor field:', fieldError);
              currentY -= 50;
            }
          }
        }
        
        // If this is the last subfield of field 16 (Amount), process faculty table and field 18 right after it
        if (field.label && field.label.includes('Amount (Rs.):')) {
          const facultyTable = formConfig.tables?.find(t => 
            t.label && t.label.includes('17. Details of faculty/expert')
          );
          if (facultyTable) {
            try {
              if (!facultyTable.data || !facultyTable.data.columns || !Array.isArray(facultyTable.data.columns) || !Array.isArray(facultyTable.data.rows)) {
                console.error('Invalid faculty table data structure:', facultyTable);
              } else {
                ({ page: currentPage, currentY } = checkNewPage(currentY, 150, currentPage));
                const tableResult = drawTable(facultyTable.data, currentY, currentPage, facultyTable.label);
                currentPage = tableResult.page;
                currentY = tableResult.currentY - 20;
                
                // Process field 18 (Eligibility) right after faculty table
                const eligibilityField = formConfig.multilineFields?.find(f => 
                  f.label && f.label.includes('18. Eligibility/screening criteria')
                );
                if (eligibilityField) {
                  try {
                    ({ page: currentPage, currentY } = checkNewPage(currentY, 80, currentPage));
                    
                    // Check if label needs to be wrapped
                    const labelWidth = boldFont.widthOfTextAtSize(eligibilityField.label || '', 12);
                    const maxLabelWidth = 300;
                    
                    if (labelWidth > maxLabelWidth) {
                      // Use multiline text for long labels with proper alignment
                      const { textX } = getAlignedPositions(12, true);
                      const numberPattern = /^(\d+\.)\s+(.+)$/;
                      const match = (eligibilityField.label || '').match(numberPattern);
                      if (match) {
                        const { numberX } = getAlignedPositions(12, true);
                        const numberPart = match[1];
                        const textPart = match[2];
                        drawText(numberPart, numberX, currentY, 12, true, currentPage);
                        const labelResult = drawMultilineText(textPart, textX, currentY, maxLabelWidth, 12, currentPage, true);
                        currentPage = labelResult.page;
                        currentY = labelResult.currentY - 20;
                      } else {
                        const labelResult = drawMultilineText(eligibilityField.label || '', textX, currentY, maxLabelWidth, 12, currentPage, true);
                        currentPage = labelResult.page;
                        currentY = labelResult.currentY - 20;
                      }
                    } else {
                      // Draw the label with proper alignment
                      drawAlignedLabel(eligibilityField.label || '', currentY, currentPage, 12, true);
                      currentY -= 18;
                    }
                    
                    const multilineResult = drawMultilineText(eligibilityField.value || '', margin + 20, currentY, eligibilityField.maxWidth || 350, 12, currentPage, false);
                    currentPage = multilineResult.page;
                    currentY = multilineResult.currentY - 30;
                  } catch (fieldError) {
                    console.error('Error processing eligibility field:', fieldError);
                    currentY -= 50;
                  }
                }
              }
            } catch (tableError: any) {
              console.error('Error processing faculty table:', tableError);
              currentY -= 100;
            }
          }
        }
        }
        }
      } catch (fieldError) {
        console.error('Error processing field:', fieldError);
        // Continue with next field instead of failing completely  
        currentY -= 40; // Add some space and continue
      }
    };
    
    // Call the helper function for each field
    if (!formConfig || !formConfig.fields) {
      throw new Error('Form configuration or fields are missing');
    }
    console.log('Starting to process fields, total count:', formConfig.fields.length);
    console.log('currentPage type:', typeof currentPage, 'currentY:', currentY);
    for (let fieldIndex = 0; fieldIndex < formConfig.fields.length; fieldIndex++) {
      const field = formConfig.fields[fieldIndex];
      
      // Skip payment details fields in remuneration form as they're now in a table
      const isRemunerationFormForFieldSkip = formConfig.title && (
        formConfig.title.includes('Remuneration/Honorarium') || 
        formConfig.title.includes('Remuneration') ||
        formConfig.title.includes('Honorarium')
      );
      if (isRemunerationFormForFieldSkip && field.label && (
        field.label.includes('Passed for Payment') ||
        field.label.includes('Rupees :') ||
        field.label.includes('Please debit to Course A/C No.') ||
        field.label.includes('Ledger Code No.') ||
        field.label === 'Date' ||
        field.label.includes('Asstt/Supdt') ||
        field.label === 'Coordinator, CEC'
      )) {
        continue;
      }
      
      // Check if this is coordination fee form and if notes have been rendered - skip ALL remaining fields
      const isCoordinationFeeFormForEarlySkip = formConfig.title && (
        formConfig.title.toLowerCase().includes('coordination fee') ||
        formConfig.title.toLowerCase().includes('course closure')
      );
      if (isCoordinationFeeFormForEarlySkip && coordinationFeeNotesRendered) {
        console.log('Skipping field at index', fieldIndex, 'Label:', field.label, 'because Coordination Fee notes have been rendered');
        continue;
      }
      
      // Debug: Log field at index 23 (coordination fee field)
      if (fieldIndex === 23) {
        console.log('Field at index 23:', field.label, 'Type:', field.type, 'Value:', field.value);
      }
      
      // Skip BILL PROFORMA fields (indices 5-20) in TA/Lab Staff form as they're already processed after the note
      const isTALabStaffForm = formConfig.title && (
        formConfig.title.includes('TEACHING ASSISTANT') || 
        formConfig.title.includes('TECHNICAL ASSISTANT') ||
        formConfig.title.includes('LAB STAFF')
      );
      if (isTALabStaffForm && fieldIndex >= 5 && fieldIndex <= 20) {
        continue;
      }
      
      // Skip "9 (b) Reason for non-adjustment:" in request-for-loan form as it's already processed after the table
      const isRequestForLoanForm = formConfig.title && (
        formConfig.title.toLowerCase().includes('request for loan') ||
        formConfig.title.toLowerCase().includes('loan')
      );
      if (isRequestForLoanForm && field.label && field.label.includes('9 (b) Reason for non-adjustment')) {
        continue;
      }
      
      // Skip budget fields and reason field in course extension form as they're already processed after "(b) Revised (Rs.)"
      const isCourseExtensionFormForSkip = formConfig.title && (
        formConfig.title.toLowerCase().includes('course extension') ||
        formConfig.title.toLowerCase().includes('extension of time / revision of project amount')
      );
      if (isCourseExtensionFormForSkip) {
        if (field.label && (
          field.label === 'Gross Amount including Service Tax' ||
          field.label === 'Less- Service Tax' ||
          field.label === 'Contracted Amount' ||
          field.label === 'Institute Share (20% of Contracted Amount)' ||
          field.label === 'Expenditure (Estimated*)' ||
          field.label === 'Honorarium (Estimated)' ||
          field.label.includes('Reason for Extension of Time')
        )) {
          continue;
        }
      }
      
      // Process the field using the helper function
      try {
        await processFieldWithErrorHandling(fieldIndex, field);
      } catch (fieldError: any) {
        console.error(`Error processing field at index ${fieldIndex}:`, fieldError);
        console.error('Field details:', {
          label: field?.label,
          type: field?.type,
          value: field?.value
        });
        // Re-throw to be caught by outer catch
        throw fieldError;
      }
    }

    // Process remaining multiline fields (excluding field 4, field 5, and field 18 which were already processed)
    if (formConfig.multilineFields && formConfig.multilineFields.length > 0) {
      for (const field of formConfig.multilineFields) {
        // Skip field 5 (Program Partner) as it's already processed
        if (field.label && field.label.includes('5. Name and Address of Program Partner')) {
          continue;
        }
        // Skip field 5 (Sponsor Details) as it's already processed
        if (field.label && field.label.includes('5. Name and Address of Sponsor')) {
          continue;
        }
        // Skip field 18 as it's already processed after faculty table
        if (field.label && field.label.includes('18. Eligibility/screening criteria')) {
          continue;
        }
        // Skip "9 (b) Reason for non-adjustment:" in request-for-loan form as it's already processed after the table
        const isRequestForLoanForm = formConfig.title && (
          formConfig.title.toLowerCase().includes('request for loan') ||
          formConfig.title.toLowerCase().includes('loan')
        );
        if (isRequestForLoanForm && field.label && field.label.includes('9 (b) Reason for non-adjustment')) {
          continue;
        }
        
        // Skip "Reason for Extension of Time" field in course extension form as it's already processed after "(b) Revised (Rs.)"
        const isCourseExtensionFormForMultilineSkip = formConfig.title && (
          formConfig.title.toLowerCase().includes('course extension') ||
          formConfig.title.toLowerCase().includes('extension of time / revision of project amount')
        );
        if (isCourseExtensionFormForMultilineSkip && field.label && field.label.includes('Reason for Extension of Time')) {
          continue;
        }
        
        // Skip fields in coordination fee form that are already processed after the distribution table
        const isCoordinationFeeFormForSkip = formConfig.title && (
          formConfig.title.toLowerCase().includes('coordination fee') ||
          formConfig.title.toLowerCase().includes('course closure')
        );
        if (isCoordinationFeeFormForSkip) {
          // If Coordination Fee notes have been rendered, skip ALL remaining fields
          if (coordinationFeeNotesRendered) {
            continue;
          }
          if (field.label && field.label.includes('Remaining amount (if any) to DDF of CEC')) {
            continue;
          }
          if (field.label && field.label.includes('This is final distribution')) {
            continue;
          }
          if (field.label && field.label.includes('Signature of the Course Coordinator (with date)')) {
            continue;
          }
          if (field.label && (field.label === 'Extn. (O)' || field.label === 'Mobile')) {
            continue;
          }
          // Check if this is an Email field that should be skipped (after index 20 in original fields)
          if (field.label && field.label === 'Email :') {
            const originalFieldIndex = formConfig.fields.findIndex((f: any) => f === field || (f.label === field.label && f.value === field.value));
            if (originalFieldIndex > 20) {
              continue;
            }
          }
          if (field.label && (field.label === 'Recommended /Not Recommended' || field.label === 'Approved/Not Approved')) {
            continue;
          }
          // Skip signature fields that are already processed after Recommended/Approved
          if (field.label && (
            field.label === 'D.A /Sr. Supdt (C.E.C.)' ||
            field.label === 'D.A. /Supdt (SRIC)' ||
            field.label === 'A.R./Dy. Registrar (SRIC)' ||
            field.label === 'Dean, SRIC'
          )) {
            continue;
          }
          // Skip "Coordinator, CEC" fields - both are already processed in special sections
          // First one is rendered with the 5 signature fields, second one is rendered after distribution fields
          if (field.label && field.label === 'Coordinator, CEC') {
            // Find all "Coordinator, CEC" fields in the original fields array
            const coordinatorCECFields = formConfig.fields.filter((f: any) => 
              f.label && f.label === 'Coordinator, CEC'
            );
            // Find the index of this field in the original fields array by matching label and value
            const originalFieldIndex = formConfig.fields.findIndex((f: any) => 
              f.label === field.label && f.value === field.value
            );
            // Check if this is one of the first two occurrences (index 0 or 1 in the filtered array)
            if (coordinatorCECFields.length > 0 && originalFieldIndex >= 0) {
              const fieldIndexInFiltered = coordinatorCECFields.findIndex((f: any) => 
                f.label === field.label && f.value === field.value
              );
              if (fieldIndexInFiltered === 0 || fieldIndexInFiltered === 1) {
                continue;
              }
            }
          }
          // Skip distribution fields that are already processed after the 5 signature fields
          if (field.label && (
            field.label.includes('Total Institute Overhead Charges deducted (P) = Rs.') ||
            field.label === '(i) 50% to IDF [CEC-IDF-001] = Rs.' ||
            field.label === '(ii) 45% to CEC [CEC-DDF-001] = Rs.' ||
            field.label === '(iii) 5% Electricity [CEC-DDF-001] = Rs.'
          )) {
            continue;
          }
          // Skip distribution fields that are already processed
          if (field.label && (
            field.label.includes('Total Institute Overhead Charges deducted (P) = Rs.') ||
            field.label === '(i) 50% to IDF [CEC-IDF-001] = Rs.' ||
            field.label === '(ii) 45% to CEC [CEC-DDF-001] = Rs.' ||
            field.label === '(iii) 5% Electricity [CEC-DDF-001] = Rs.'
          )) {
            continue;
          }
          // Skip "Remaining amount" field as it's already processed after distribution table
          if (field.label && field.label.includes('Remaining amount (if any) to DDF of CEC')) {
            continue;
          }
          // Skip "This is final distribution" field as it's already processed
          if (field.label && field.label.includes('This is final distribution')) {
            continue;
          }
          // Skip "Signature of the Course Coordinator (with date)" as it's already processed
          if (field.label && field.label.includes('Signature of the Course Coordinator (with date)')) {
            continue;
          }
          // Skip "Extn. (O)" and "Mobile" as they're already processed together
          if (field.label && (field.label === 'Extn. (O)' || field.label === 'Mobile')) {
            continue;
          }
          // Skip "Email :" as it's already processed
          if (field.label && field.label === 'Email :') {
            continue;
          }
          // Skip "Recommended /Not Recommended" and "Approved/Not Approved" as they're already processed
          if (field.label && (field.label === 'Recommended /Not Recommended' || field.label === 'Approved/Not Approved')) {
            continue;
          }
          // Skip all 5 signature fields as they're already processed
          if (field.label && (
            field.label === 'D.A /Sr. Supdt (C.E.C.)' ||
            field.label === 'D.A. /Supdt (SRIC)' ||
            field.label === 'A.R./Dy. Registrar (SRIC)' ||
            field.label === 'Dean, SRIC'
          )) {
            continue;
          }
        }
        try {
          // For course opening form, add extra spacing before multilineFields to separate from table
          const isCourseOpeningFormForMultiline = formConfig.title && (
            formConfig.title.toLowerCase().includes('course opening') ||
            formConfig.title.toLowerCase().includes('actual budget')
          );
          const spacingBeforeMultiline = isCourseOpeningFormForMultiline ? 100 : 80;
          ({ page: currentPage, currentY } = checkNewPage(currentY, spacingBeforeMultiline, currentPage));
          
          // Special handling for course opening form and revised budget form "Note:" field - render label and value on same line
          const isRevisedBudgetFormForMultiline = formConfig.title && (
            formConfig.title.toLowerCase().includes('revised budget')
          );
          if ((isCourseOpeningFormForMultiline || isRevisedBudgetFormForMultiline) && field.label && field.label.trim() === 'Note:') {
            const noteStartX = margin + 20; // Align with left margin like other fields
            drawText('Note:', noteStartX, currentY, 10, true, currentPage);
            const noteLabelWidth = boldFont.widthOfTextAtSize('Note:', 10);
            const noteValue = field.value || '';
            drawText(noteValue, noteStartX + noteLabelWidth + 5, currentY, 10, false, currentPage);
            currentY -= 30; // Increased spacing before signature fields
          } else {
            // Only draw label if it's not empty
            if (field.label && field.label.trim() !== '') {
            // Check if label needs to be wrapped
            const labelWidth = boldFont.widthOfTextAtSize(field.label || '', 10);
            const maxLabelWidth = 300;
            
            if (labelWidth > maxLabelWidth) {
              // Use multiline text for long labels with proper alignment
              const { textX } = getAlignedPositions(10, true);
              const numberPattern = /^(\d+\.)\s+(.+)$/;
              const match = (field.label || '').match(numberPattern);
              if (match) {
                const { numberX } = getAlignedPositions(10, true);
                const numberPart = match[1];
                const textPart = match[2];
                drawText(numberPart, numberX, currentY, 10, true, currentPage);
                const labelResult = drawMultilineText(textPart, textX, currentY, maxLabelWidth, 10, currentPage, true);
                currentPage = labelResult.page;
                currentY = labelResult.currentY - 20;
              } else {
                const labelResult = drawMultilineText(field.label || '', textX, currentY, maxLabelWidth, 10, currentPage, true);
                currentPage = labelResult.page;
                currentY = labelResult.currentY - 20;
              }
            } else {
              // Draw the label with proper alignment
              drawAlignedLabel(field.label || '', currentY, currentPage, 10, true);
                      currentY -= 18;
              }
            }
            
            const multilineResult = drawMultilineText(field.value || '', margin + 20, currentY, field.maxWidth || 350, 10, currentPage, false);
            currentPage = multilineResult.page;
            currentY = multilineResult.currentY - 30;
          }
        } catch (fieldError) {
          console.error('Error processing multiline field:', fieldError);
          // Continue with next field instead of failing completely
          currentY -= 50; // Add some space and continue
        }
      }
    }

    // Process remaining tables if any (faculty table is already processed after field 16, expert table after Course Code)
    if (formConfig.tables && formConfig.tables.length > 0) {
      for (let tableIndex = 0; tableIndex < formConfig.tables.length; tableIndex++) {
        const table = formConfig.tables[tableIndex];
        
        // Skip all tables for coordination fee form after Coordination Fee notes are rendered
        const isCoordinationFeeFormForTableSkip = formConfig.title && (
          formConfig.title.toLowerCase().includes('coordination fee') ||
          formConfig.title.toLowerCase().includes('course closure')
        );
        if (isCoordinationFeeFormForTableSkip && coordinationFeeNotesRendered) {
          continue;
        }
        
        // Skip budget details table for course opening form and revised budget form as it's already processed when encountering "Budget Details:" field
        const isCourseOpeningFormForTable = formConfig.title && (
          formConfig.title.toLowerCase().includes('course opening') ||
          formConfig.title.toLowerCase().includes('actual budget')
        );
        const isRevisedBudgetFormForTable = formConfig.title && (
          formConfig.title.toLowerCase().includes('revised budget')
        );
        if ((isCourseOpeningFormForTable || isRevisedBudgetFormForTable) && table.label && table.label === 'Budget Details:') {
          continue;
        }
        
        // Skip invoice details table for invoice generation forms (open and sponsored) as they're already processed when encountering "Invoice Details:" field
        const isInvoiceGenerationOpenFormForTable = formConfig.title && (
          formConfig.title.toLowerCase().includes('invoice generation') &&
          formConfig.title.toLowerCase().includes('open')
        );
        const isInvoiceGenerationSponsoredFormForTable = formConfig.title && (
          formConfig.title.toLowerCase().includes('invoice generation') &&
          formConfig.title.toLowerCase().includes('sponsored')
        );
        if ((isInvoiceGenerationOpenFormForTable || isInvoiceGenerationSponsoredFormForTable) && (!table.label || table.label === '')) {
          continue;
        }
        
        // Skip faculty table as it's already processed after field 16
        if (table.label && table.label.includes('17. Details of faculty/expert')) {
          continue;
        }
        
        // Skip expert details table (first table) and Details table (second table) in remuneration form as they're already processed after Course Code
        const isRemunerationForm = formConfig.title && (
          formConfig.title.includes('Remuneration/Honorarium') || 
          formConfig.title.includes('Remuneration') ||
          formConfig.title.includes('Honorarium')
        );
        if (isRemunerationForm) {
          // Skip expert details table (first table, index 0)
          // Check by table index and structure (3 columns, empty headers, first row has "4" in first column)
          if (tableIndex === 0 && 
              table.data && table.data.columns && table.data.columns.length === 3 &&
              table.data.rows && table.data.rows.length > 0 &&
              table.data.rows[0] && table.data.rows[0][0] === '4') {
            continue;
          }
          // Skip Details table (second table, index 1) - has "Details" column
          if (tableIndex === 1 && table.data && table.data.columns) {
            const hasDetailsColumn = table.data.columns.some((col: any) => 
              col.header && col.header.includes('Details')
            );
            if (hasDetailsColumn) {
              continue;
            }
          }
          // Skip payment details table (third table, index 2) - has "Passed for Payment" in first row
          if (tableIndex === 2 && table.data && table.data.rows && 
              table.data.rows.length > 0 &&
              table.data.rows[0][0] && 
              table.data.rows[0][0].includes('Passed for Payment')) {
            continue;
          }
        }
        
        // Skip TA table (first table) and BILL PROFORMA table (second table) in TA/Lab Staff form as they're already processed
        const isTALabStaffForm = formConfig.title && (
          formConfig.title.includes('TEACHING ASSISTANT') || 
          formConfig.title.includes('TECHNICAL ASSISTANT') ||
          formConfig.title.includes('LAB STAFF')
        );
        if (isTALabStaffForm) {
          // Skip TA table (first table, index 0) as it's already processed after Name of the Coordinator
          if (tableIndex === 0 && table.label && 
              table.label.includes('Name and details of Teaching Assistant')) {
            continue;
          }
          // Skip BILL PROFORMA table (second table, index 1) as it's already processed after the note
          if (tableIndex === 1 && table.label && 
              table.label.includes('Particular of assignment for Teaching Assistant')) {
            continue;
          }
        }
        
        // Skip outstanding loan table in request-for-loan form as it's already processed after "8. Credit course code"
        const isRequestForLoanForm = formConfig.title && (
          formConfig.title.toLowerCase().includes('request for loan') ||
          formConfig.title.toLowerCase().includes('loan')
        );
        if (isRequestForLoanForm && tableIndex === 0 && table.label && 
            table.label.includes('9 (a) Details of outstanding loan')) {
          continue;
        }
        
        // Skip distribution table in coordination fee form as it's already processed after the heading
        const isCoordinationFeeForm = formConfig.title && (
          formConfig.title.toLowerCase().includes('coordination fee') ||
          formConfig.title.toLowerCase().includes('course closure')
        );
        if (isCoordinationFeeForm && tableIndex === 0 && table.data && table.data.columns) {
          // Check if this is the distribution table (has "Name", "Employee code", "Bank A/C No." columns)
          const hasNameColumn = table.data.columns.some((col: any) => 
            col.header && col.header === 'Name'
          );
          const hasEmployeeCodeColumn = table.data.columns.some((col: any) => 
            col.header && col.header === 'Employee code'
          );
          if (hasNameColumn && hasEmployeeCodeColumn) {
            continue;
          }
        }
        try {
          if (!table.data || !table.data.columns || !Array.isArray(table.data.columns) || !Array.isArray(table.data.rows)) {
            console.error('Invalid table data structure:', table);
            continue;
          }
          ({ page: currentPage, currentY } = checkNewPage(currentY, 150, currentPage));
          // For "For Office Use" table, disable extra rows and increase font size
          const isOfficeUseTable = table.label && table.label.includes('For Office Use');
          const showExtraRows = !isOfficeUseTable;
          const fontSize = isOfficeUseTable ? 11 : undefined;
          // For TA table, use smaller label font size
          const isTATable = table.label && table.label.includes('Name and details of Teaching Assistant');
          const labelFontSize = isTATable ? 10 : undefined;
          const tableResult = drawTable(table.data, currentY, currentPage, table.label, showExtraRows, fontSize, labelFontSize);
          currentPage = tableResult.page;
          currentY = tableResult.currentY - 20;
        } catch (tableError: any) {
          console.error('Error processing table:', tableError);
          console.error('Table data:', JSON.stringify(table, null, 2));
          console.error('Error stack:', tableError?.stack);
          currentY -= 100; // Add some space and continue
        }
      }
    }

    // Process plain text sections if any (skip first one for remuneration form as it's already processed after expert table, skip first one for TA form as it's already processed after signature)
    if (formConfig.plainTextSections && formConfig.plainTextSections.length > 0) {
      const isRemunerationForm = formConfig.title && (
        formConfig.title.includes('Remuneration/Honorarium') || 
        formConfig.title.includes('Remuneration') ||
        formConfig.title.includes('Honorarium')
      );
      const isTALabStaffForm = formConfig.title && (
        formConfig.title.includes('TEACHING ASSISTANT') || 
        formConfig.title.includes('TECHNICAL ASSISTANT') ||
        formConfig.title.includes('LAB STAFF')
      );
      const isCoordinationFeeForm = formConfig.title && (
        formConfig.title.toLowerCase().includes('coordination fee') ||
        formConfig.title.toLowerCase().includes('course closure')
      );
      
      for (let sectionIndex = 0; sectionIndex < formConfig.plainTextSections.length; sectionIndex++) {
        const section = formConfig.plainTextSections[sectionIndex];
        
        // Skip all plain text sections for coordination fee form after Coordination Fee notes are rendered
        if (isCoordinationFeeForm && coordinationFeeNotesRendered) {
          continue;
        }
        
        // Skip first plainTextSection for remuneration form (the note after expert table) as it's already processed
        if (isRemunerationForm && sectionIndex === 0 && section.content && section.content.includes('Note: For the amounts')) {
          continue;
        }
        
        // Skip first plainTextSection for TA form (the note after signature) as it's already processed
        if (isTALabStaffForm && sectionIndex === 0 && section.content && section.content.includes('course coordinator and instructors may engage')) {
          continue;
        }
        
        // Skip second plainTextSection for TA form (the BILL PROFORMA heading) as it's already processed after the note
        if (isTALabStaffForm && sectionIndex === 1 && section.title && section.title.includes('BILL PROFORMA')) {
          continue;
        }
        
        // Skip third plainTextSection for TA form (the paragraph at the end) as it's already processed after the certification section
        if (isTALabStaffForm && sectionIndex === 2 && section.content && section.content.includes('course coordinator and instructors may engage')) {
          continue;
        }
        
        // Skip first plainTextSection for request-for-loan form (the note) as it's already processed after the reason field
        const isRequestForLoanForm = formConfig.title && (
          formConfig.title.toLowerCase().includes('request for loan') ||
          formConfig.title.toLowerCase().includes('loan')
        );
        if (isRequestForLoanForm && sectionIndex === 0 && section.content && section.content.includes('Loan for the course will be settled')) {
          continue;
        }
        
        // Skip first plainTextSection for course extension form (Budget Head heading) as it's already processed in special handling
        const isCourseExtensionForm = formConfig.title && (
          formConfig.title.toLowerCase().includes('course extension') ||
          formConfig.title.toLowerCase().includes('extension of time / revision of project amount')
        );
        if (isCourseExtensionForm && sectionIndex === 0 && section.title && section.title.includes('Budget Head / Description & Revised Budgeted Amount')) {
          continue;
        }
        
        // Skip plainTextSections for coordination fee form as they're already processed as headings and note
        if (isCoordinationFeeForm) {
          // Skip all sections if Coordination Fee notes have been rendered (all remaining sections should be skipped)
          if (coordinationFeeNotesRendered) {
            continue;
          }
          // Skip first section (A. COURSE FUND POSITION heading)
          if (sectionIndex === 0 && section.title && section.title.includes('A. COURSE FUND POSITION')) {
            continue;
          }
          // Skip second section (B. Details of amount to be distributed heading)
          if (sectionIndex === 1 && section.title && section.title.includes('B. Details of amount to be distributed')) {
            continue;
          }
          // Skip third section (the note after coordination fee)
          if (sectionIndex === 2 && section.content && section.content.includes('Note: whole or part can be transferred to PDF')) {
            continue;
          }
          // Skip fourth section (Mention all the names heading) as it's already processed after the note
          if (sectionIndex === 3 && section.title && section.title.includes('Mention all the names')) {
            continue;
          }
          // Skip fifth section ("Certified that" plain text) as it's already processed after the table
          if (sectionIndex === 4 && section.content && section.content.includes('Certified that')) {
            continue;
          }
          // Skip sixth section ("The soft copy of the following documents" heading) as it's already processed
          if (sectionIndex === 5 && section.title && section.title.includes('The soft copy of the following documents')) {
            continue;
          }
          // Skip seventh section (list items i-v) as it's already processed
          if (sectionIndex === 6 && section.content && section.content.includes('Name, email id and address of the sponsoring agency')) {
            continue;
          }
          // Skip eighth section ("Endorsement by CEC/SRIC Office" heading) as it's already processed
          if (sectionIndex === 7 && section.title && section.title.includes('Endorsement by CEC/SRIC Office')) {
            continue;
          }
          // Skip ninth section ("The above is submitted for approval" text) as it's already processed
          if (sectionIndex === 8 && section.content && section.content.includes('The above is submitted for approval')) {
            continue;
          }
          // Skip tenth section ("Distribution of total institute share" text) as it's already processed
          if (sectionIndex === 10 && section.content && section.content.includes('Distribution of total institute share into IDF/CEC DDF Account')) {
            continue;
          }
          // Skip eleventh section ("* Coordination Fee" heading) as it's already processed
          if (sectionIndex === 11 && section.title && section.title.includes('* Coordination Fee')) {
            continue;
          }
          // Skip twelfth section ("(i) Open Participation Course" heading and content) as it's already processed
          if (sectionIndex === 12 && section.title && section.title.includes('(i) Open Participation Course')) {
            continue;
          }
          // Skip thirteenth section ("(ii) Sponsored Course" heading and content) as it's already processed
          if (sectionIndex === 13 && section.title && section.title.includes('(ii) Sponsored Course')) {
            continue;
          }
        }
        
        try {
          ({ page: currentPage, currentY } = checkNewPage(currentY, 100, currentPage));
          // Ensure content exists before processing
          if (section && (section.title || section.content)) {
            const textResult = drawPlainTextSection(section, currentY, currentPage);
            currentPage = textResult.page;
            currentY = textResult.currentY;
          }
        } catch (textError) {
          console.error('Error processing plain text section:', textError);
          console.error('Section data:', JSON.stringify(section, null, 2));
          currentY -= 50; // Add some space and continue
        }
      }
    }

    // Process signature sections if any
    if (formConfig.signatureSections && formConfig.signatureSections.length > 0) {
      // Special handling for course opening form and revised budget form - render 2 signature sections horizontally
      const isCourseOpeningForm = formConfig.title && (
        formConfig.title.toLowerCase().includes('course opening') ||
        formConfig.title.toLowerCase().includes('actual budget')
      );
      const isRevisedBudgetForm = formConfig.title && (
        formConfig.title.toLowerCase().includes('revised budget')
      );
      
      if ((isCourseOpeningForm || isRevisedBudgetForm) && formConfig.signatureSections.length === 2) {
        // Render two signature sections side by side
        try {
          ({ page: currentPage, currentY } = checkNewPage(currentY, 80, currentPage));
          
          const startX = margin + 20;
          const lineLength = 200;
          const pageCenterX = pageWidth / 2;
          const leftSignatureX = startX;
          const rightSignatureX = pageCenterX + 40; // Start from center with some margin
          
          // Left signature: Name of Course Coordinator/PI
          const leftSignature = formConfig.signatureSections[0];
          drawText(leftSignature.label, leftSignatureX, currentY, 10, true, currentPage);
          currentPage.drawLine({
            start: { x: leftSignatureX, y: currentY - 18 },
            end: { x: leftSignatureX + lineLength, y: currentY - 18 },
            thickness: 1,
            color: rgb(0, 0, 0),
          });
          
          // Right signature: Signature of Course Coordinator/PI (with date)
          const rightSignature = formConfig.signatureSections[1];
          drawText(rightSignature.label, rightSignatureX, currentY, 10, true, currentPage);
          currentPage.drawLine({
            start: { x: rightSignatureX, y: currentY - 18 },
            end: { x: rightSignatureX + lineLength, y: currentY - 18 },
            thickness: 1,
            color: rgb(0, 0, 0),
          });
          
          currentY -= 40; // Move down after both signatures
        } catch (signatureError) {
          console.error('Error processing signature sections horizontally:', signatureError);
          currentY -= 60;
        }
      } else {
        // Special handling for invoice generation forms (open and sponsored) - render signatures side by side
        const isInvoiceGenerationOpenForm = formConfig.title && (
          formConfig.title.toLowerCase().includes('invoice generation') &&
          formConfig.title.toLowerCase().includes('open')
        );
        const isInvoiceGenerationSponsoredForm = formConfig.title && (
          formConfig.title.toLowerCase().includes('invoice generation') &&
          formConfig.title.toLowerCase().includes('sponsored')
        );
        
        if ((isInvoiceGenerationOpenForm || isInvoiceGenerationSponsoredForm) && formConfig.signatureSections.length === 2) {
          // Render two signature sections side by side
          try {
            ({ page: currentPage, currentY } = checkNewPage(currentY, 80, currentPage));
            
            const startX = margin + 20;
            const lineLength = 200;
            const pageCenterX = pageWidth / 2;
            const leftSignatureX = startX;
            const rightSignatureX = pageCenterX + 40; // Start from center with some margin
            
            // Left signature: Prof. / Course Coordinator (s)
            const leftSignature = formConfig.signatureSections[0];
            drawText(leftSignature.label, leftSignatureX, currentY, 10, true, currentPage);
            currentPage.drawLine({
              start: { x: leftSignatureX, y: currentY - 18 },
              end: { x: leftSignatureX + lineLength, y: currentY - 18 },
              thickness: 1,
              color: rgb(0, 0, 0),
            });
            let signatureY = currentY - 35;
            if (leftSignature.subLabels && leftSignature.subLabels.length > 0) {
              for (const subLabel of leftSignature.subLabels) {
                drawText(subLabel, leftSignatureX, signatureY, 10, false, currentPage);
                signatureY -= 12;
              }
            }
            
            // Right signature: Coordinator / CEC IIT Roorkee
            const rightSignature = formConfig.signatureSections[1];
            drawText(rightSignature.label, rightSignatureX, currentY, 10, true, currentPage);
            currentPage.drawLine({
              start: { x: rightSignatureX, y: currentY - 18 },
              end: { x: rightSignatureX + lineLength, y: currentY - 18 },
              thickness: 1,
              color: rgb(0, 0, 0),
            });
            signatureY = currentY - 35;
            if (rightSignature.subLabels && rightSignature.subLabels.length > 0) {
              for (const subLabel of rightSignature.subLabels) {
                drawText(subLabel, rightSignatureX, signatureY, 10, false, currentPage);
                signatureY -= 12;
              }
            }
            
            currentY -= 60; // Move down after both signatures
          } catch (signatureError) {
            console.error('Error processing signature sections horizontally:', signatureError);
            currentY -= 60;
          }
        } else {
          // Normal rendering for other forms - render sequentially
          for (const signature of formConfig.signatureSections) {
            try {
              ({ page: currentPage, currentY } = checkNewPage(currentY, 80, currentPage));
              currentY = drawSignatureSection(signature, currentY, currentPage);
              currentY -= 20; // Add spacing after signature section
            } catch (signatureError) {
              console.error('Error processing signature section:', signatureError);
              currentY -= 60; // Add some space and continue
            }
          }
        }
      }
    }

    // Process office endorsement if any
    if (formConfig.officeEndorsement) {
      try {
        ({ page: currentPage, currentY } = checkNewPage(currentY, 200, currentPage));
        const endorsementResult = drawOfficeEndorsement(formConfig.officeEndorsement, currentY, currentPage);
        currentPage = endorsementResult.page;
        currentY = endorsementResult.currentY;
      } catch (endorsementError) {
        console.error('Error processing office endorsement:', endorsementError);
        currentY -= 100; // Add some space and continue
      }
    } else {
      // Default footer - only if no office endorsement AND no signature sections
      // Forms with signature sections are newer forms that have their own footer structure
      // Skip default footer for remuneration form as it ends with the Note section
      // Skip default footer for TA/Lab Staff form as it ends with the paragraph
      // Skip default footer for request-for-loan form as it ends with the signatures
      const isRemunerationForm = formConfig.title && (
        formConfig.title.includes('Remuneration/Honorarium') || 
        formConfig.title.includes('Remuneration') ||
        formConfig.title.includes('Honorarium')
      );
      const isTALabStaffForm = formConfig.title && (
        formConfig.title.includes('TEACHING ASSISTANT') || 
        formConfig.title.includes('TECHNICAL ASSISTANT') ||
        formConfig.title.includes('LAB STAFF')
      );
      const isRequestForLoanForm = formConfig.title && (
        formConfig.title.toLowerCase().includes('request for loan') ||
        formConfig.title.toLowerCase().includes('loan')
      );
      const isCoordinationFeeForm = formConfig.title && (
        formConfig.title.toLowerCase().includes('coordination fee') ||
        formConfig.title.toLowerCase().includes('course closure')
      );
      const isCourseExtensionForm = formConfig.title && (
        formConfig.title.toLowerCase().includes('course extension') ||
        formConfig.title.toLowerCase().includes('extension of time / revision of project amount')
      );
      if (!formConfig.signatureSections || formConfig.signatureSections.length === 0) {
        if (!isRemunerationForm && !isTALabStaffForm && !isRequestForLoanForm && !isCoordinationFeeForm && !isCourseExtensionForm) {
    ({ page: currentPage, currentY } = checkNewPage(currentY, 100, currentPage));
    drawText('D.A./Supdt.                    Asstt. Registrar/Dy. Registrar (SRIC)                    Dean, SRIC', margin + 20, currentY, 10, false, currentPage);
    currentY -= 20;
    drawText('Copy after approval to:', margin + 20, currentY, 10, true, currentPage);
    currentY -= 15;
    drawText('(1) Course Coordinator (2) Concerned HoD (3) Coordinator, CEC (4) AR SRIC- AC', margin + 20, currentY, 10, false, currentPage);
    currentY -= 15;
    drawText('Dean, SRIC', margin + 450, currentY, 10, true, currentPage);
        }
      }
    }

    // Process second office endorsement if any (for SRIC)
    if (formConfig.secondOfficeEndorsement) {
      try {
        ({ page: currentPage, currentY } = checkNewPage(currentY, 150, currentPage));
        const endorsementResult = drawSecondOfficeEndorsement(formConfig.secondOfficeEndorsement, currentY, currentPage);
        currentPage = endorsementResult.page;
        currentY = endorsementResult.currentY;
      } catch (endorsementError) {
        console.error('Error processing second office endorsement:', endorsementError);
        currentY -= 100; // Add some space and continue
      }
    }

    // Process annex tables if any (lectures and hands-on - goes after office endorsement)
    if (formConfig.annexTables && formConfig.annexTables.length > 0) {
      // Draw main heading for Course curriculum section
      ({ page: currentPage, currentY } = checkNewPage(currentY, 50, currentPage));
      drawText('Annex-CEC-01-A(i)', margin + 20, currentY, 10, true, currentPage);
                            currentY -= 15;
      drawText('Course curriculum and course schedule:', margin + 20, currentY, 10, true, currentPage);
                    currentY -= 18;
      
      for (const table of formConfig.annexTables) {
        try {
          if (!table.data || !table.data.columns || !Array.isArray(table.data.columns) || !Array.isArray(table.data.rows)) {
            console.error('Invalid annex table data structure:', table);
            continue;
          }
          ({ page: currentPage, currentY } = checkNewPage(currentY, 150, currentPage));
          
          // Extract just the sub-heading from label (remove main heading if present)
          let tableLabel = table.label || '';
          // If label contains newlines, take only the last part (the sub-heading)
          if (tableLabel.includes('\n')) {
            const parts = tableLabel.split('\n');
            tableLabel = parts[parts.length - 1]; // Get the last part (e.g., "(i) Details of Lectures")
          }
          
          const tableResult = drawTable(table.data, currentY, currentPage, tableLabel, true, undefined, undefined, false);
          currentPage = tableResult.page;
          currentY = tableResult.currentY - 20;
        } catch (tableError: any) {
          console.error('Error processing annex table:', tableError);
          console.error('Table data:', JSON.stringify(table, null, 2));
          console.error('Error stack:', tableError?.stack);
          currentY -= 100; // Add some space and continue
        }
      }
    }

    // If the last page is completely blank (only border), remove it to avoid extra empty pages
    const totalPages = pdfDoc.getPageCount();
    const startY = pageHeight - margin - 20;
    if (totalPages > 1 && Math.abs(currentY - startY) < 0.1) {
      pdfDoc.removePage(totalPages - 1);
    }

    // Serialize the PDFDocument to bytes
    const pdfBytes = await pdfDoc.save();

    return new NextResponse(pdfBytes as unknown as BodyInit, {
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
      name: error?.name,
      formConfig: formConfig ? {
        title: formConfig.title,
        fieldsCount: formConfig.fields?.length,
        multilineFieldsCount: formConfig.multilineFields?.length
      } : 'No formConfig'
    });
    // Log the full error for debugging
    if (error instanceof Error) {
      console.error('Full error:', error);
      console.error('Error stack:', error.stack);
    } else {
      console.error('Error object:', JSON.stringify(error, null, 2));
    }
    return new NextResponse(JSON.stringify({ 
      error: 'Failed to generate PDF',
      details: error?.message || 'Unknown error',
      stack: process.env.NODE_ENV === 'development' ? error?.stack : undefined
    }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
}