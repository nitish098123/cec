// Configuration for Course Invoice Generation Sponsored Form
export const courseInvoiceGenerationSponsoredConfig = {
  title: 'Request for Course Invoice Generation (Sponsored course)',
  subtitle: '',
  fields: [
    // 1. Sponsoring Agency Details
    { label: '1. Name and address of the Sponsoring Agency:', value: '', type: 'text' as const },
    { label: 'GST No. of the Sponsored:', value: '', type: 'subfield' as const, indentLevel: 1 },
    
    // 2. Course Details
    { label: '2. Course Details:', value: '', type: 'text' as const },
    { label: '(i) Course Code:', value: '', type: 'subfield' as const, indentLevel: 1 },
    { label: '(ii) Course Name:', value: '', type: 'subfield' as const, indentLevel: 1 },
    { label: '(iii) Batch No.:', value: '', type: 'subfield' as const, indentLevel: 1 },
    { label: '(iv) Duration (from - To):', value: '', type: 'subfield' as const, indentLevel: 1 },
    
    // 3. Budget Details
    { label: '3. Budget for a batch size of Participants (including GST):', value: '', type: 'text' as const },
    { label: 'Number of Participants:', value: '', type: 'subfield' as const, indentLevel: 1 },
    { label: 'Batch Budget:', value: '', type: 'subfield' as const, indentLevel: 1 },
    
    // 4. Total Invoice Amount
    { label: '4. Total Invoice Amount:', value: '', type: 'text' as const },
    
    // 5. Total Invoice Amount in Words
    { label: '5. Total invoice amount in words:', value: '', type: 'text' as const },
  ],
  multilineFields: [
    // Sponsoring Agency Details
    { label: 'Sponsoring Agency Details:', value: '', maxWidth: 450 },
  ]
};

// Helper function to map form data to configuration
export function mapCourseInvoiceGenerationSponsoredDataToConfig(formData: any) {
  const config = { ...courseInvoiceGenerationSponsoredConfig };
  
  // Map form data to field values
  config.fields[0].value = ''; // Section header
  config.fields[1].value = ''; // GST number will be in multiline field
  
  config.fields[2].value = ''; // Section header
  config.fields[3].value = formData.course_code || '';
  config.fields[4].value = formData.course_name || '';
  config.fields[5].value = formData.batch_no || '';
  config.fields[6].value = formData.duration ? `${formData.duration[0]?.format?.('YYYY-MM-DD') || ''} to ${formData.duration[1]?.format?.('YYYY-MM-DD') || ''}` : '';
  
  config.fields[7].value = ''; // Section header
  config.fields[8].value = formData.num_participants?.toString() || '';
  config.fields[9].value = formData.batch_budget?.toString() || '';
  
  config.fields[10].value = formData.total_invoice_amount?.toString() || '';
  config.fields[11].value = formData.total_invoice_amount_words || '';
  
  // Map multiline fields
  config.multilineFields![0].value = formData.sponsoring_agency_details || '';
  
  return config;
}
