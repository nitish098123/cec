# Universal PDF Generation System

This system allows you to generate professional PDFs for any form using a consistent design and dynamic positioning.

## 🎯 **Features**

- ✅ **Universal Design**: Same professional layout for all forms
- ✅ **Dynamic Positioning**: No overlapping, automatic spacing
- ✅ **Fill-in-the-Blank Style**: Underlines for user input areas
- ✅ **Multi-page Support**: Automatic page breaks
- ✅ **IITR Branding**: Logo and header consistent across all forms
- ✅ **Easy Configuration**: Simple JSON configuration for any form

## 📋 **How to Use**

### **1. Create Form Configuration**

Create a configuration file for your form (e.g., `my-form-config.ts`):

```typescript
export const myFormConfig = {
  title: 'YOUR FORM TITLE',
  subtitle: '*(Optional subtitle)',
  fields: [
    { label: '1. Field Label:', value: '', type: 'text' as const },
    { label: '2. Another Field:', value: '', type: 'text' as const },
    { label: 'Sub-field:', value: '', type: 'subfield' as const, indentLevel: 1 },
  ],
  multilineFields: [
    { label: 'Long Text Field:', value: '', maxWidth: 400 },
  ]
};

export function mapMyFormDataToConfig(formData: any) {
  const config = { ...myFormConfig };
  
  // Map your form data to configuration
  config.fields[0].value = formData.field1 || '';
  config.fields[1].value = formData.field2 || '';
  config.fields[2].value = formData.subField || '';
  config.multilineFields![0].value = formData.longText || '';
  
  return config;
}
```

### **2. Update Your Form Component**

In your form component, update the PDF generation:

```typescript
const onFinish = async (values: any) => {
  try {
    // Import your configuration
    const { mapMyFormDataToConfig } = await import('./my-form-config');
    
    // Create form configuration
    const formConfig = mapMyFormDataToConfig(values);
    
    // Send to PDF API
    const res = await fetch('/api/generate-pdf', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        formData: values,
        formConfig: formConfig
      }),
    });
    
    // Download PDF
    const blob = await res.blob();
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'my-form.pdf';
    document.body.appendChild(a);
    a.click();
    a.remove();
    window.URL.revokeObjectURL(url);
  } catch (err) {
    console.error('PDF generation error:', err);
  }
};
```

## 🔧 **Configuration Options**

### **Field Types**

1. **`text`**: Regular form field with label and value
2. **`subfield`**: Indented sub-field (use `indentLevel` for nesting)
3. **`multiline`**: Long text areas that wrap to multiple lines

### **Field Properties**

```typescript
{
  label: string,           // Field label
  value: string,           // Field value
  type: 'text' | 'subfield' | 'multiline',
  indentLevel?: number,    // For subfields (1, 2, 3...)
  fontSize?: number,       // Font size (default: 12)
  isBold?: boolean,        // Bold label (default: true)
  maxWidth?: number        // For multiline fields
}
```

## 📝 **Examples**

### **Simple Form**
```typescript
{
  title: 'SIMPLE APPLICATION FORM',
  fields: [
    { label: '1. Name:', value: '', type: 'text' },
    { label: '2. Email:', value: '', type: 'text' },
  ]
}
```

### **Complex Form with Sub-fields**
```typescript
{
  title: 'DETAILED APPLICATION FORM',
  fields: [
    { label: '1. Personal Information:', value: '', type: 'text' },
    { label: 'Name:', value: '', type: 'subfield', indentLevel: 1 },
    { label: 'Address:', value: '', type: 'subfield', indentLevel: 1 },
    { label: '2. Contact Details:', value: '', type: 'text' },
    { label: 'Phone:', value: '', type: 'subfield', indentLevel: 1 },
    { label: 'Email:', value: '', type: 'subfield', indentLevel: 1 },
  ],
  multilineFields: [
    { label: '3. Additional Comments:', value: '', maxWidth: 400 },
  ]
}
```

## 🎨 **Design Features**

- **Professional Header**: IITR logo and branding
- **Light Red Background**: For header section
- **Dynamic Spacing**: Automatic positioning based on label width
- **Fill-in-the-Blank**: Underlines for user input areas
- **Multi-page**: Automatic page breaks for long forms
- **Consistent Footer**: Standard approval section

## 🚀 **Benefits**

1. **Consistency**: All forms look professional and uniform
2. **Maintainability**: Easy to update design for all forms at once
3. **Scalability**: Add new forms with simple configuration
4. **User Experience**: Clean, readable PDFs with proper spacing
5. **Branding**: Consistent IITR branding across all forms

## 📁 **File Structure**

```
app/api/generate-pdf/
├── route.ts                    # Universal PDF generator
├── course-approval-open-config.ts  # Example configuration
├── simple-form-config.ts       # Simple form example
└── README.md                   # This documentation
```

## 🔄 **Migration Guide**

To migrate existing forms to the universal system:

1. **Create Configuration**: Define your form structure
2. **Update Form Component**: Use the new API call format
3. **Test**: Verify PDF generation works correctly
4. **Deploy**: Update all forms to use the universal system

## 💡 **Tips**

- Use descriptive field labels for better readability
- Group related fields with subfields for better organization
- Set appropriate `maxWidth` for multiline fields
- Test with various data lengths to ensure proper spacing
- Keep configuration files organized and well-documented
