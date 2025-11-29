// Configuration for Course Approval Open Form
export const courseApprovalOpenConfig = {
  title: 'COURSE APPROVAL FORM FOR OPEN PARTICIPATION COURSES*',
  subtitle: '*(Course approval can be taken even without receipt of funds)',
  fields: [
    // 1. Course Coordinator Information
    { label: '1. Name of the Course Coordinator/PI:', value: '', type: 'text' as const },
    { label: 'Designation:', value: '', type: 'text' as const },
    { label: 'Deptt./Centre:', value: '', type: 'text' as const },
    
    // 2. Co-coordinator Information
    { label: '2. Co-coordinator (I)/Co-PI, if any:', value: '', type: 'text' as const },
    { label: '(i) Name:', value: '', type: 'subfield' as const, indentLevel: 1 },
    { label: 'Designation:', value: '', type: 'subfield' as const, indentLevel: 1 },
    { label: 'Deptt./Centre:', value: '', type: 'subfield' as const, indentLevel: 1 },
    { label: 'Signature:', value: '', type: 'subfield' as const, indentLevel: 1 },
    { label: '(ii) Name:', value: '', type: 'subfield' as const, indentLevel: 1 },
    { label: 'Designation:', value: '', type: 'subfield' as const, indentLevel: 1 },
    { label: 'Deptt./Centre:', value: '', type: 'subfield' as const, indentLevel: 1 },
    { label: 'Signature:', value: '', type: 'subfield' as const, indentLevel: 1 },
    
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
    { label: 'Total Fee:', value: '', type: 'subfield' as const, indentLevel: 1 },
    
    // 14. Payment Portal
    { label: '14. Payment Portal for Fee Collection:', value: '', type: 'text' as const },
    
    // 15. Total Fee Receipt
    { label: '15. Estimated total Fee receipt for the Course:', value: '', type: 'text' as const },
    
    // 16. IITR Receipts
    { label: '16. IITR Receipts as per MoU:', value: '', type: 'text' as const },
    { label: 'Percentage:', value: '', type: 'subfield' as const, indentLevel: 1 },
    { label: 'Amount (Rs.):', value: '', type: 'subfield' as const, indentLevel: 1 },
    
    // 17. Faculty Details - will be rendered as table, not as text field
    
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
  ],
  tables: [
    // Faculty table will be added in mapFormDataToConfig
  ],
  plainTextSections: [
    {
      title: 'The following documents will be required at the closing of course :',
      content: '(1) List of internal and external faculty /experts with email and address (2) List of the participants with email and address (5) Time table copy, (6) Soft/hard copy of the group-photo (if available).'
    }
  ],
  signatureSections: [
    {
      label: 'Signature of the Course Coordinator (with date)',
      subLabels: ['Phone :', 'Mobile :']
    },
    {
      label: 'Signature of Head of the Deptt./Centre (with date & stamp)'
    }
  ],
  officeEndorsement: {
    note: 'The above request is in accordance with the norms.',
    table: {
      columns: [
        { header: '', width: 150 },
        { header: '', width: 200 }
      ],
      rows: [
        ['CEC Approval no.', ''],
        ['Course Code', ''],
        ['Dated', '']
      ]
    },
    approvalText: 'Approved/Not Approved',
    signatoryText: 'Dealing Asstt. Sr. Superintendent, CEC Coordinator, CEC',
    copyToText: '(1) Course Coordinator (2) Concerned HoD (3) Coordinator, CEC',
    notes: [
      'Note:',
      'Certificates format will be as per CEC guidelines.',
      'CEC guidelines will be followed in case of awarding the grades.'
    ]
  }
};

// Helper function to map form data to configuration
export function mapFormDataToConfig(formData: any) {
  const config = JSON.parse(JSON.stringify(courseApprovalOpenConfig)); // Deep copy
  
  // Map form data to field values
  config.fields[0].value = formData.courseCoordinator || '';
  config.fields[1].value = formData.coordinatorDesignation || '';
  config.fields[2].value = formData.coordinatorDept || '';
  config.fields[3].value = ''; // Section header
  config.fields[4].value = formData.cocoordinator1Name || '';
  config.fields[5].value = formData.cocoordinator1Designation || '';
  config.fields[6].value = formData.cocoordinator1Dept || '';
  config.fields[7].value = formData.cocoordinator1Signature || '';
  config.fields[8].value = formData.cocoordinator2Name || '';
  config.fields[9].value = formData.cocoordinator2Designation || '';
  config.fields[10].value = formData.cocoordinator2Dept || '';
  config.fields[11].value = formData.cocoordinator2Signature || '';
  config.fields[12].value = formData.courseTitle || '';
  config.fields[13].value = formData.batchNo || '';
  config.fields[14].value = formData.gstDetails ? 'Attached' : '';
  
  // Payment Terms mapping
  const paymentTermsMap: { [key: string]: string } = {
    'before_full': 'Before completion (Full)',
    'before_part': 'Before completion (Part)',
    'after_full': 'After Completion (full)'
  };
  config.fields[15].value = paymentTermsMap[formData.paymentTerms] || formData.paymentTerms || '';
  
  config.fields[16].value = formData.commencementDate || '';
  config.fields[17].value = formData.completionDate || '';
  config.fields[18].value = ''; // Section header
  config.fields[19].value = formData.duration?.months?.toString() || '';
  config.fields[20].value = formData.duration?.lectures?.toString() || '';
  config.fields[21].value = formData.duration?.hands_on?.toString() || '';
  
  // Delivery Mode mapping
  const deliveryModeMap: { [key: string]: string } = {
    'classroom': 'Class room',
    'online': 'Online',
    'self_paced': 'Self-paced',
    'hybrid': 'Hybrid'
  };
  config.fields[22].value = deliveryModeMap[formData.modeOfDelivery] || formData.modeOfDelivery || '';
  
  config.fields[23].value = (formData.expectedParticipants || '').toString();
  config.fields[24].value = formData.scheduleAttached === 'yes' ? 'Yes' : 'No';
  config.fields[25].value = ''; // Section header
  config.fields[26].value = formData.courseFee ? formData.courseFee.toString() : '';
  const gstAmount = formData.courseFee ? Math.round(formData.courseFee * 0.18) : 0;
  config.fields[27].value = gstAmount.toString();
  const totalFee = formData.courseFee ? formData.courseFee + gstAmount : 0;
  config.fields[28].value = totalFee.toString();
  
  // Payment Portal mapping
  const portalMap: { [key: string]: string } = {
    'iitr': 'IITR Portal',
    'edtech': 'EdTech Partner Portal'
  };
  config.fields[29].value = portalMap[formData.paymentPortal] || formData.paymentPortal || '';
  
  config.fields[30].value = formData.totalFeeReceipt ? formData.totalFeeReceipt.toString() || '' : '';
  config.fields[31].value = ''; // Section header
  config.fields[32].value = formData.mouReceipts?.percentage?.toString() || '';
  config.fields[33].value = formData.mouReceipts?.amount?.toString() || '';
  config.fields[34].value = formData.brochureLink || '';
  config.fields[35].value = formData.otherInfoAttachment ? 'Attached' : '';
  config.fields[36].value = formData.scheduleAttachment ? 'Attached' : '';
  
  // Map multiline fields
  config.multilineFields![0].value = formData.programPartner || '';
  config.multilineFields![1].value = formData.eligibility || '';
  config.multilineFields![2].value = formData.certificateCriteria || '';
  config.multilineFields![3].value = formData.refundProcess || '';
  config.multilineFields![4].value = formData.otherInfo || '';
  
  // Add faculty table (always add, even if empty)
  const facultyRows = (formData.faculty || []).map((fac: any) => [
    fac.name || '',
    fac.designation || '',
    fac.employeeNo || '',
    fac.department || '',
    fac.signature || ''
  ]);
  
  config.tables = [
    {
      label: '17. Details of faculty/expert, if any :',
      data: {
        columns: [
          { header: 'Name of faculty', width: 90 },
          { header: 'Designation', width: 90 },
          { header: 'Employees No.', width: 70 },
          { header: 'Department/Centre', width: 110 },
          { header: 'Signature', width: 90 }
        ],
        rows: facultyRows || []
      }
    }
  ];
  
  // Add Annex tables (these go after office endorsement)
  // Always add both tables, even if empty, so the section heading appears
  config.annexTables = [];
  
  // Add Lectures table
  const lectureRows = (formData.lectures && Array.isArray(formData.lectures) && formData.lectures.length > 0)
    ? formData.lectures.map((lec: any) => [
        lec.expert || '',
        lec.topic || '',
        lec.mode || '',
        lec.hours?.toString() || '',
        lec.date || ''
      ])
    : [];
  
  config.annexTables.push({
    label: '(i) Details of Lectures',
    data: {
      columns: [
        { header: 'Name of IITR Expert/Industry Expert', width: 125 },
        { header: 'Topic of Lecture', width: 125 },
        { header: 'Mode (Live or offline)', width: 80 },
        { header: 'No. of Hours', width: 60 },
        { header: 'Date of Lecture/(Week No.)', width: 110 }
      ],
      rows: lectureRows
    }
  });
  
  // Add Hands-on table
  const handsOnRows = (formData.hands_on && Array.isArray(formData.hands_on) && formData.hands_on.length > 0)
    ? formData.hands_on.map((ho: any) => [
        ho.topic || '',
        ho.mode || '',
        ho.hours?.toString() || '',
        ho.date || ''
      ])
    : [];
  
  config.annexTables.push({
    label: '(ii) Details of Hands-on/project/assignments/use cases',
    data: {
      columns: [
        { header: 'Topic of Hands-on', width: 150 },
        { header: 'Mode (Live or offline)', width: 100 },
        { header: 'No. of Hours', width: 70 },
        { header: 'Date of Hands-on/project/assignments/use cases /(Week No.)', width: 195 }
      ],
      rows: handsOnRows
    }
  });
  
  return config;
}
