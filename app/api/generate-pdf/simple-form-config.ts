// Example configuration for a simple form
export const simpleFormConfig = {
  title: 'SIMPLE APPLICATION FORM',
  subtitle: '*(Please fill all required fields)',
  fields: [
    { label: '1. Full Name:', value: '', type: 'text' as const },
    { label: '2. Email Address:', value: '', type: 'text' as const },
    { label: '3. Phone Number:', value: '', type: 'text' as const },
    { label: '4. Department:', value: '', type: 'text' as const },
    { label: '5. Designation:', value: '', type: 'text' as const },
    { label: '6. Date of Birth:', value: '', type: 'text' as const },
    { label: '7. Address:', value: '', type: 'text' as const },
  ],
  multilineFields: [
    { label: '8. Additional Comments:', value: '', maxWidth: 400 },
  ]
};

// Helper function to map form data to configuration
export function mapSimpleFormDataToConfig(formData: any) {
  const config = { ...simpleFormConfig };
  
  // Map form data to field values
  config.fields[0].value = formData.fullName || '';
  config.fields[1].value = formData.email || '';
  config.fields[2].value = formData.phone || '';
  config.fields[3].value = formData.department || '';
  config.fields[4].value = formData.designation || '';
  config.fields[5].value = formData.dateOfBirth || '';
  config.fields[6].value = formData.address || '';
  
  // Map multiline fields
  config.multilineFields![0].value = formData.comments || '';
  
  return config;
}
