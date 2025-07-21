import { NextRequest, NextResponse } from 'next/server';
import { PDFDocument, StandardFonts, rgb } from 'pdf-lib';

const TEMPLATE_URL = 'https://d1bm918zlnq37v.cloudfront.net/CECTemp/CEC_NewForm/1.pdf';

export async function POST(req: NextRequest) {
  const data = await req.json();
  const templateBytes = await fetch(TEMPLATE_URL).then(res => res.arrayBuffer());
  const pdfDoc = await PDFDocument.load(templateBytes);
  const pages = pdfDoc.getPages();
  const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
  const page = pages[0];

  // Map all fields (coordinates are estimated and may need adjustment)
  page.drawText(data.courseCoordinator || '', { x: 160, y: 755, size: 10, font, color: rgb(0,0,0) });
  page.drawText(data.coordinatorDesignation || '', { x: 420, y: 755, size: 10, font, color: rgb(0,0,0) });
  page.drawText(data.coordinatorDept || '', { x: 160, y: 740, size: 10, font, color: rgb(0,0,0) });

  // Co-coordinator (I)
  page.drawText(data.cocoordinator1Name || '', { x: 120, y: 720, size: 10, font, color: rgb(0,0,0) });
  page.drawText(data.cocoordinator1Dept || '', { x: 220, y: 720, size: 10, font, color: rgb(0,0,0) });
  page.drawText(data.cocoordinator1Designation || '', { x: 320, y: 720, size: 10, font, color: rgb(0,0,0) });
  // Co-coordinator (II)
  page.drawText(data.cocoordinator2Name || '', { x: 120, y: 705, size: 10, font, color: rgb(0,0,0) });
  page.drawText(data.cocoordinator2Dept || '', { x: 220, y: 705, size: 10, font, color: rgb(0,0,0) });
  page.drawText(data.cocoordinator2Designation || '', { x: 320, y: 705, size: 10, font, color: rgb(0,0,0) });

  page.drawText(data.courseTitle || '', { x: 160, y: 685, size: 10, font, color: rgb(0,0,0) });
  page.drawText(data.batchNo || '', { x: 160, y: 670, size: 10, font, color: rgb(0,0,0) });
  page.drawText(data.programPartner || '', { x: 260, y: 655, size: 10, font, color: rgb(0,0,0) });
  page.drawText(data.gstDetails || '', { x: 160, y: 640, size: 10, font, color: rgb(0,0,0) });
  page.drawText(data.paymentTerms || '', { x: 160, y: 625, size: 10, font, color: rgb(0,0,0) });
  page.drawText(data.commencementDate || '', { x: 180, y: 610, size: 10, font, color: rgb(0,0,0) });
  page.drawText(data.completionDate || '', { x: 380, y: 610, size: 10, font, color: rgb(0,0,0) });
  if (data.duration) {
    page.drawText(data.duration.months || '', { x: 160, y: 595, size: 10, font, color: rgb(0,0,0) });
    page.drawText(data.duration.lectures || '', { x: 260, y: 595, size: 10, font, color: rgb(0,0,0) });
    page.drawText(data.duration.hands_on || '', { x: 420, y: 595, size: 10, font, color: rgb(0,0,0) });
  }
  page.drawText(data.modeOfDelivery || '', { x: 250, y: 580, size: 10, font, color: rgb(0,0,0) });
  page.drawText((data.expectedParticipants || '').toString(), { x: 220, y: 565, size: 10, font, color: rgb(0,0,0) });
  page.drawText(data.scheduleAttached || '', { x: 320, y: 550, size: 10, font, color: rgb(0,0,0) });
  if (data.courseFee) {
    page.drawText(data.courseFee.toString(), { x: 200, y: 535, size: 10, font, color: rgb(0,0,0) });
  }
  page.drawText(data.paymentPortal || '', { x: 250, y: 520, size: 10, font, color: rgb(0,0,0) });
  if (data.totalFeeReceipt) {
    page.drawText(data.totalFeeReceipt.toString(), { x: 320, y: 505, size: 10, font, color: rgb(0,0,0) });
  }
  if (data.mouReceipts) {
    page.drawText(data.mouReceipts.percentage || '', { x: 200, y: 490, size: 10, font, color: rgb(0,0,0) });
    page.drawText(data.mouReceipts.amount || '', { x: 320, y: 490, size: 10, font, color: rgb(0,0,0) });
  }
  // Add more fields as needed for the rest of the form

  // Serialize the PDFDocument to bytes (a Uint8Array)
  const pdfBytes = await pdfDoc.save();

  return new NextResponse(pdfBytes, {
    status: 200,
    headers: {
      'Content-Type': 'application/pdf',
      'Content-Disposition': 'attachment; filename="course-approval-form.pdf"',
    },
  });
} 