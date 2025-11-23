// Configuration for Course Invoice Generation Open Form
export const courseInvoiceGenerationOpenConfig = {
  title: 'Request for Course Invoice Generation (Open Participation course)',
  subtitle: '',
  fields: [
    // 1. Program Partner Details
    { label: '1. Name and address of the Program Partner:', value: '', type: 'text' as const },
    { label: 'GST No. of the Program Partner:', value: '', type: 'subfield' as const, indentLevel: 1 },
    
    // 2. Course Details
    { label: '2. Course Details:', value: '', type: 'text' as const },
    { label: '(i) Course Code:', value: '', type: 'subfield' as const, indentLevel: 1 },
    { label: '(ii) Course Name:', value: '', type: 'subfield' as const, indentLevel: 1 },
    { label: '(iii) Batch No.:', value: '', type: 'subfield' as const, indentLevel: 1 },
    { label: '(iv) Duration (from - To):', value: '', type: 'subfield' as const, indentLevel: 1 },
    { label: '(v) Instalment No.:', value: '', type: 'subfield' as const, indentLevel: 1 },
    { label: '(vi) Fee Per Participant:', value: '', type: 'subfield' as const, indentLevel: 1 },
    
    // 3. Total Fee Collected
    { label: '3. Total Fee collected for Students (including GST):', value: '', type: 'text' as const },
    { label: 'Number of Students:', value: '', type: 'subfield' as const, indentLevel: 1 },
    { label: 'Total Fee Amount:', value: '', type: 'subfield' as const, indentLevel: 1 },
    { label: 'Participants List:', value: '', type: 'subfield' as const, indentLevel: 1 },
    
    // 4. IITR Fee Component
    { label: '4. IITR Fee Component (% of fee receipt):', value: '', type: 'text' as const },
    { label: 'Percentage:', value: '', type: 'subfield' as const, indentLevel: 1 },
    { label: 'Amount:', value: '', type: 'subfield' as const, indentLevel: 1 },
    
    // 5. Total Invoice Amount
    { label: '5. Total Invoice Amount:', value: '', type: 'text' as const },
    
    // 6. Total Invoice Amount in Words
    { label: '6. Total invoice amount in words:', value: '', type: 'text' as const },
  ],
  multilineFields: [
    // Program Partner Details
    { label: 'Program Partner Details:', value: '', maxWidth: 450 },
  ],
  plainTextSections: [
    {
      content: 'Certified that the particulars given above are true and correct.'
    }
  ],
  signatureSections: [
    {
      label: 'Prof.',
      subLabels: ['Course Coordinator (s)']
    },
    {
      label: 'Forwarded to Dean SRIC Office',
      subLabels: []
    }
  ]
};

// Helper function to map form data to configuration
export function mapCourseInvoiceGenerationOpenDataToConfig(formData: any) {
  const config = { ...courseInvoiceGenerationOpenConfig };
  
  // Map form data to field values
  config.fields[0].value = ''; // Section header
  config.fields[1].value = ''; // GST number will be in multiline field
  
  config.fields[2].value = ''; // Section header
  config.fields[3].value = formData.course_code || '';
  config.fields[4].value = formData.course_name || '';
  config.fields[5].value = formData.batch_no || '';
  config.fields[6].value = formData.duration ? `${formData.duration[0]?.format?.('YYYY-MM-DD') || ''} to ${formData.duration[1]?.format?.('YYYY-MM-DD') || ''}` : '';
  config.fields[7].value = formData.instalment_no || '';
  config.fields[8].value = formData.fee_per_participant || '';
  
  config.fields[9].value = ''; // Section header
  config.fields[10].value = formData.num_students?.toString() || '';
  config.fields[11].value = formData.total_fee_collected_amount?.toString() || '';
  config.fields[12].value = formData.participants_list ? 'Attached' : '';
  
  config.fields[13].value = ''; // Section header
  config.fields[14].value = formData.iitr_fee_percent?.toString() || '';
  config.fields[15].value = formData.iitr_fee_amount?.toString() || '';
  
  config.fields[16].value = formData.total_invoice_amount?.toString() || '';
  config.fields[17].value = formData.total_invoice_amount_words || '';
  
  // Map multiline fields
  config.multilineFields![0].value = formData.partner_details || '';
  
  // Plain text sections and signature sections are already configured correctly
  // No need to map form data to them as they are static
  
  return config;
}
