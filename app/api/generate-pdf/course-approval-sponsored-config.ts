// Configuration for Course Approval Sponsored Form
export const courseApprovalSponsoredConfig = {
  title: 'COURSE APPROVAL FORM FOR SPONSORED COURSES*',
  subtitle: '*(Course approval can be taken even without receipt of funds)',
  fields: [
    // 1. Course Coordinator/PI Details
    { label: '1. Course Coordinator/PI Details:', value: '', type: 'text' as const },
    { label: 'Name of the Course Coordinator/PI:', value: '', type: 'subfield' as const, indentLevel: 1 },
    { label: 'Designation:', value: '', type: 'subfield' as const, indentLevel: 1 },
    { label: 'Deptt./Centre:', value: '', type: 'subfield' as const, indentLevel: 1 },
    
    // Co-coordinator Information
    { label: 'Co-coordinator (I)/Co-PI, if any:', value: '', type: 'text' as const },
    { label: '(i) Name:', value: '', type: 'subfield' as const, indentLevel: 1 },
    { label: 'Designation:', value: '', type: 'subfield' as const, indentLevel: 1 },
    { label: 'Deptt./Centre:', value: '', type: 'subfield' as const, indentLevel: 1 },
    { label: 'Signature:', value: '', type: 'subfield' as const, indentLevel: 1 },
    { label: '(ii) Name:', value: '', type: 'subfield' as const, indentLevel: 1 },
    { label: 'Designation:', value: '', type: 'subfield' as const, indentLevel: 1 },
    { label: 'Deptt./Centre:', value: '', type: 'subfield' as const, indentLevel: 1 },
    { label: 'Signature:', value: '', type: 'subfield' as const, indentLevel: 1 },
    
    // 2. Course Title
    { label: '2. Title of the Course:', value: '', type: 'text' as const },
    
    // 3. Batch Number
    { label: '3. Batch No. of the Course:', value: '', type: 'text' as const },
    
    // 4. Type of Sponsorship
    { label: '4. Type of Sponsorship:', value: '', type: 'text' as const },
    { label: 'If Others, please specify:', value: '', type: 'subfield' as const, indentLevel: 1 },
    
    // 6. GST Details
    { label: '6. GST details:', value: '', type: 'text' as const },
    
    // 7. Payment Terms
    { label: '7. Payment Terms:', value: '', type: 'text' as const },
    
    // 8. Dates
    { label: '8. Date of Commencement:', value: '', type: 'text' as const },
    { label: 'Expected date of Completion:', value: '', type: 'text' as const },
    
    // 9. Duration
    { label: '9. Duration:', value: '', type: 'text' as const },
    { label: 'Weeks:', value: '', type: 'subfield' as const, indentLevel: 1 },
    { label: 'Hours of Training:', value: '', type: 'subfield' as const, indentLevel: 1 },
    
    // 10. Mode of Delivery
    { label: '10. Mode of delivery:', value: '', type: 'text' as const },
    
    // 11. Expected Participants
    { label: '11. Expected no. of Participants:', value: '', type: 'text' as const },
    
    // 12. Schedule Attached
    { label: '12. Copy of Schedule attached:', value: '', type: 'text' as const },
    
    // 13. Proposed Budget
    { label: '13. Proposed budget for the course:', value: '', type: 'text' as const },
    
    // 14. MoU Copy
    { label: '14. Copy of MoU/Agreement, if any:', value: '', type: 'text' as const },
    
    // 15. Instructor Details
    { label: '15. Details of Instructor/experts, if any:', value: '', type: 'text' as const },
    
    // 16. Other Information
    { label: '16. Other relevant information:', value: '', type: 'text' as const },
    { label: 'i) Correspondence with sponsor:', value: '', type: 'subfield' as const, indentLevel: 1 },
    { label: 'ii) Request letter for special approval, if any:', value: '', type: 'subfield' as const, indentLevel: 1 },
  ],
  multilineFields: [
    // 5. Sponsor Details
    { label: '5. Name and Address of Sponsor\'s with GST Details:', value: '', maxWidth: 450 },
  ],
  plainTextSections: [
    {
      title: 'The following documents will be required at the closing of course :',
      content: '(1) Name, address, phone and email id of the sponsoring agency\n(2) List of internal and external faculty /experts with email id and address\n(3) List of the participants with email id and address\n(5) Time table copy,\n(6) Soft / hard copy of the group-photo (if available).'
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
      'Certificates format will be as per CEC guidelines.'
    ]
  }
};

// Helper function to map form data to configuration
export function mapCourseApprovalSponsoredDataToConfig(formData: any) {
  const config = JSON.parse(JSON.stringify(courseApprovalSponsoredConfig)); // Deep copy to preserve nested arrays
  
  // Map form data to field values
  config.fields[0].value = ''; // Section header
  config.fields[1].value = formData.courseCoordinator || '';
  config.fields[2].value = formData.coordinatorDesignation || '';
  config.fields[3].value = formData.coordinatorDept || '';
  
  config.fields[4].value = ''; // Section header
  config.fields[5].value = formData.cocoordinator1Name || '';
  config.fields[6].value = formData.cocoordinator1Designation || '';
  config.fields[7].value = formData.cocoordinator1Dept || '';
  config.fields[8].value = ''; // Signature (empty for now)
  config.fields[9].value = formData.cocoordinator2Name || '';
  config.fields[10].value = formData.cocoordinator2Designation || '';
  config.fields[11].value = formData.cocoordinator2Dept || '';
  config.fields[12].value = ''; // Signature (empty for now)
  
  config.fields[13].value = formData.courseTitle || '';
  config.fields[14].value = formData.batchNo || '';
  
  // Sponsorship Type mapping
  const sponsorshipTypeMap: { [key: string]: string } = {
    'private': 'Private Sector',
    'govt': 'Govt.',
    'public': 'Public',
    'foreign': 'Foreign Agency',
    'others': 'Others'
  };
  config.fields[15].value = sponsorshipTypeMap[formData.sponsorshipType] || formData.sponsorshipType || '';
  config.fields[16].value = formData.sponsorshipOther || '';
  
  config.fields[17].value = formData.gstDetails ? 'Attached' : '';
  
  // Payment Terms mapping
  const paymentTermsMap: { [key: string]: string } = {
    'full': 'Full',
    'part': 'Part',
    'after_completion': 'After Completion of the course'
  };
  config.fields[18].value = paymentTermsMap[formData.paymentTerms] || formData.paymentTerms || '';
  
  config.fields[19].value = formData.commencementDate || '';
  config.fields[20].value = formData.completionDate || '';
  config.fields[21].value = ''; // Section header
  config.fields[22].value = formData.duration?.weeks?.toString() || '';
  config.fields[23].value = formData.duration?.hours?.toString() || '';
  
  // Delivery Mode mapping
  const deliveryModeMap: { [key: string]: string } = {
    'classroom': 'Class room',
    'online': 'Online',
    'self_paced': 'Self-paced',
    'hybrid': 'Hybrid'
  };
  config.fields[24].value = deliveryModeMap[formData.modeOfDelivery] || formData.modeOfDelivery || '';
  
  config.fields[25].value = (formData.expectedParticipants || '').toString();
  config.fields[26].value = formData.scheduleAttached ? 'Attached' : '';
  config.fields[27].value = formData.proposedBudget ? 'Attached' : '';
  config.fields[28].value = formData.mouCopy ? 'Attached' : '';
  config.fields[29].value = ''; // Section header
  config.fields[30].value = ''; // Section header
  config.fields[31].value = formData.correspondence ? 'Attached' : '';
  config.fields[32].value = formData.specialApproval ? 'Attached' : '';
  
  // Map multiline fields
  config.multilineFields![0].value = formData.sponsorDetails || '';
  
  return config;
}
