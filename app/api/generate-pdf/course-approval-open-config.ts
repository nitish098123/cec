// Configuration for Course Approval Open Form
export const courseApprovalOpenConfig = {
  title: 'COURSE APPROVAL FORM FOR OPEN PARTICIPATION COURSES*',
  subtitle: '*(Course approval can be taken even without receipt of funds)',
  fields: [
    // 1. Course Coordinator Information
    { label: '1. Name of the Course Coordinator/PI:', value: '', type: 'text' as const },
    { label: 'Designation:', value: '', type: 'text' as const },
    
    // 2. Co-coordinator Information
    { label: '2. Co-coordinator (I)/Co-PI, if any:', value: '', type: 'text' as const },
    { label: '(i) Name:', value: '', type: 'subfield' as const, indentLevel: 1 },
    { label: 'Deptt./Centre:', value: '', type: 'subfield' as const, indentLevel: 1 },
    { label: 'Designation:', value: '', type: 'subfield' as const, indentLevel: 1 },
    { label: '(ii) Name:', value: '', type: 'subfield' as const, indentLevel: 1 },
    { label: 'Deptt./Centre:', value: '', type: 'subfield' as const, indentLevel: 1 },
    { label: 'Designation:', value: '', type: 'subfield' as const, indentLevel: 1 },
    
    // 3. Course Title
    { label: '3. Title of the Course:', value: '', type: 'text' as const },
    
    // 4. Batch Number
    { label: '4. Batch No. of the Course:', value: '', type: 'text' as const },
    
    // 6. GST Details
    { label: '6. GST details:', value: '', type: 'text' as const },
    
    // 7. Payment Terms
    { label: '7. Payment Terms:', value: '', type: 'text' as const },
    
    // 8. Dates
    { label: '8. Date of Commencement:', value: '', type: 'text' as const },
    { label: 'Expected date of Completion:', value: '', type: 'text' as const },
    
    // 9. Duration
    { label: '9. Duration:', value: '', type: 'text' as const },
    { label: 'Months:', value: '', type: 'subfield' as const, indentLevel: 1 },
    { label: 'No. of hours Lectures:', value: '', type: 'subfield' as const, indentLevel: 1 },
    { label: 'No. of hours hands on:', value: '', type: 'subfield' as const, indentLevel: 1 },
    
    // 10. Mode of Delivery
    { label: '10. Mode of delivery:', value: '', type: 'text' as const },
    
    // 11. Expected Participants
    { label: '11. Expected no. of Participants:', value: '', type: 'text' as const },
    
    // 12. Schedule Attached
    { label: '12. Copy of Schedule as per Annex CEC-01-A(i):', value: '', type: 'text' as const },
    
    // 13. Course Fee Section
    { label: '13. Course Fee Per participant:', value: '', type: 'text' as const },
    { label: 'Course Fee (Rs.):', value: '', type: 'subfield' as const, indentLevel: 1 },
    { label: 'Fee with GST @ 18%:', value: '', type: 'subfield' as const, indentLevel: 1 },
    
    // 14. Payment Portal
    { label: '14. Payment Portal for Fee Collection:', value: '', type: 'text' as const },
    
    // 15. Total Fee Receipt
    { label: '15. Estimated total Fee receipt for the Course:', value: '', type: 'text' as const },
    
    // 16. IITR Receipts
    { label: '16. IITR Receipts as per MoU:', value: '', type: 'text' as const },
    { label: 'Percentage:', value: '', type: 'subfield' as const, indentLevel: 1 },
    { label: 'Amount (Rs.):', value: '', type: 'subfield' as const, indentLevel: 1 },
    
    // 17. Faculty Details
    { label: '17. Details of faculty/expert, if any:', value: '', type: 'text' as const },
    
    // 19. Brochure Link
    { label: '19. Link to portal/course page/copy of brochure:', value: '', type: 'text' as const },
    
    // Attachments
    { label: 'Attach sheet (if necessary):', value: '', type: 'text' as const },
    { label: 'Format of the course schedule:', value: '', type: 'text' as const },
  ],
  multilineFields: [
    // 5. Program Partner
    { label: '5. Name and Address of Program Partner with GST Details (if any):', value: '', maxWidth: 450 },
    
    // 18. Eligibility
    { label: '18. Eligibility/screening criteria:', value: '', maxWidth: 400 },
    
    // 20. Certificate Criteria
    { label: '20. Criteria for releasing the certificate:', value: '', maxWidth: 400 },
    
    // 21. Refund Process
    { label: '21. In case of refund (course cancellation/dropout), mention the process:', value: '', maxWidth: 400 },
    
    // 22. Other Information
    { label: '22. Other relevant information:', value: '', maxWidth: 400 },
  ]
};

// Helper function to map form data to configuration
export function mapFormDataToConfig(formData: any) {
  const config = { ...courseApprovalOpenConfig };
  
  // Map form data to field values
  config.fields[0].value = formData.courseCoordinator || '';
  config.fields[1].value = formData.coordinatorDesignation || '';
  config.fields[2].value = ''; // Section header
  config.fields[3].value = formData.cocoordinator1Name || '';
  config.fields[4].value = formData.cocoordinator1Dept || '';
  config.fields[5].value = formData.cocoordinator1Designation || '';
  config.fields[6].value = formData.cocoordinator2Name || '';
  config.fields[7].value = formData.cocoordinator2Dept || '';
  config.fields[8].value = formData.cocoordinator2Designation || '';
  config.fields[9].value = formData.courseTitle || '';
  config.fields[10].value = formData.batchNo || '';
  config.fields[11].value = formData.gstDetails ? 'Attached' : '';
  
  // Payment Terms mapping
  const paymentTermsMap: { [key: string]: string } = {
    'before_full': 'Before completion (Full)',
    'before_part': 'Before completion (Part)',
    'after_full': 'After Completion (full)'
  };
  config.fields[12].value = paymentTermsMap[formData.paymentTerms] || formData.paymentTerms || '';
  
  config.fields[13].value = formData.commencementDate || '';
  config.fields[14].value = formData.completionDate || '';
  config.fields[15].value = ''; // Section header
  config.fields[16].value = formData.duration?.months?.toString() || '';
  config.fields[17].value = formData.duration?.lectures?.toString() || '';
  config.fields[18].value = formData.duration?.hands_on?.toString() || '';
  
  // Delivery Mode mapping
  const deliveryModeMap: { [key: string]: string } = {
    'classroom': 'Class room',
    'online': 'Online',
    'self_paced': 'Self-paced',
    'hybrid': 'Hybrid'
  };
  config.fields[19].value = deliveryModeMap[formData.modeOfDelivery] || formData.modeOfDelivery || '';
  
  config.fields[20].value = (formData.expectedParticipants || '').toString();
  config.fields[21].value = formData.scheduleAttached === 'yes' ? 'Yes' : 'No';
  config.fields[22].value = ''; // Section header
  config.fields[23].value = formData.courseFee ? formData.courseFee.toString() : '';
  config.fields[24].value = formData.courseFee ? Math.round(formData.courseFee * 0.18).toString() : '';
  
  // Payment Portal mapping
  const portalMap: { [key: string]: string } = {
    'iitr': 'IITR Portal',
    'edtech': 'EdTech Partner Portal'
  };
  config.fields[25].value = portalMap[formData.paymentPortal] || formData.paymentPortal || '';
  
  config.fields[26].value = formData.totalFeeReceipt ? formData.totalFeeReceipt.toString() : '';
  config.fields[27].value = ''; // Section header
  config.fields[28].value = formData.mouReceipts?.percentage?.toString() || '';
  config.fields[29].value = formData.mouReceipts?.amount?.toString() || '';
  config.fields[30].value = ''; // Section header
  config.fields[31].value = formData.brochureLink || '';
  config.fields[32].value = formData.otherInfoAttachment ? 'Attached' : '';
  config.fields[33].value = formData.scheduleAttachment ? 'Attached' : '';
  
  // Map multiline fields
  config.multilineFields![0].value = formData.programPartner || '';
  config.multilineFields![1].value = formData.eligibility || '';
  config.multilineFields![2].value = formData.certificateCriteria || '';
  config.multilineFields![3].value = formData.refundProcess || '';
  config.multilineFields![4].value = formData.otherInfo || '';
  
  return config;
}
