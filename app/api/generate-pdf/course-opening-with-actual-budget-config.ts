// Configuration for Course Opening with Actual Budget Form
export const courseOpeningWithActualBudgetConfig = {
  title: 'REQUEST FOR COURSE OPENING FORM WITH ACTUAL BUDGET',
  subtitle: '(Open Participation/Sponsored)',
  fields: [
    // 1. Course Code
    { label: '1. Course Code (To be filled by CEC Office):', value: '', type: 'text' as const },
    
    // 2. Course Name & Date
    { label: '2. Course Name & Date:', value: '', type: 'text' as const },
    
    // 3. Course Budget
    { label: '3. Course budget : Gross Amount :', value: '', type: 'text' as const },
    
    // Budget Details
    { label: 'Budget Details:', value: '', type: 'text' as const },
    { label: '1. Gross amount including GST = (G) received:', value: '', type: 'subfield' as const, indentLevel: 1 },
    { label: '2. Less GST as applicable (presently GST @ 18%) (L):', value: '', type: 'subfield' as const, indentLevel: 1 },
    { label: '3. (a) Contracted amount \'T\' = (G – L):', value: '', type: 'subfield' as const, indentLevel: 1 },
    { label: '3. (b) Institute Overhead Charges (P) (20% of T):', value: '', type: 'subfield' as const, indentLevel: 1 },
    { label: '4. Coordination Fee \'C\' [ max @20% of (T-P)]:', value: '', type: 'subfield' as const, indentLevel: 1 },
    { label: '5. CEC Operational/Establishment cost \'O\'[@10% of (T-P)]:', value: '', type: 'subfield' as const, indentLevel: 1 },
    { label: '6. TDS deduction, if any:', value: '', type: 'subfield' as const, indentLevel: 1 },
    
    // Expenses
    { label: '7. Expenses (E) : As per actuals:', value: '', type: 'text' as const },
    { label: 'i. Cost of registration material:', value: '', type: 'subfield' as const, indentLevel: 1 },
    { label: 'ii. Contingency/miscellaneous expenses:', value: '', type: 'subfield' as const, indentLevel: 1 },
    { label: 'iii. Infrastructure charges including hall and equipment charges:', value: '', type: 'subfield' as const, indentLevel: 1 },
    { label: 'iv. Accommodation, boarding and lodging:', value: '', type: 'subfield' as const, indentLevel: 1 },
    { label: 'v. Transportation: TA/DA to outside experts/participants:', value: '', type: 'subfield' as const, indentLevel: 1 },
    { label: 'vi. Local travel / field trip / tour:', value: '', type: 'subfield' as const, indentLevel: 1 },
    { label: 'vii. Lab Staff/TA (please specify):', value: '', type: 'subfield' as const, indentLevel: 1 },
    
    // 8. Honorarium
    { label: '8. Amount for Honorarium to instructors/experts:', value: '', type: 'text' as const },
  ],
  multilineFields: [
    // Transaction details note
    { label: 'Note:', value: 'Please attach Transaction details of the fund transferred to SRIC/IITR account', maxWidth: 450 },
  ]
};

// Helper function to map form data to configuration
export function mapCourseOpeningWithActualBudgetDataToConfig(formData: any) {
  const config = { ...courseOpeningWithActualBudgetConfig };
  
  // Map form data to field values
  config.fields[0].value = formData.courseCode || '';
  config.fields[1].value = formData.courseNameAndDate || '';
  config.fields[2].value = formData.courseBudget || '';
  
  // Budget details
  config.fields[3].value = ''; // Section header
  config.fields[4].value = formData.grossAmount?.toString() || '';
  config.fields[5].value = formData.lessGst?.toString() || '';
  config.fields[6].value = formData.contractedAmount?.toString() || '';
  config.fields[7].value = formData.instituteOverhead?.toString() || '';
  config.fields[8].value = formData.coordinationFee?.toString() || '';
  config.fields[9].value = formData.cecOperationalCost?.toString() || '';
  config.fields[10].value = formData.tdsDeduction?.toString() || '';
  
  // Expenses
  config.fields[11].value = ''; // Section header
  config.fields[12].value = formData.expenses?.registrationMaterial?.toString() || '';
  config.fields[13].value = formData.expenses?.contingency?.toString() || '';
  config.fields[14].value = formData.expenses?.infrastructure?.toString() || '';
  config.fields[15].value = formData.expenses?.accommodation?.toString() || '';
  config.fields[16].value = formData.expenses?.transportation?.toString() || '';
  config.fields[17].value = formData.expenses?.localTravel?.toString() || '';
  config.fields[18].value = formData.expenses?.labStaff?.toString() || '';
  
  config.fields[19].value = formData.honorarium?.toString() || '';
  
  // Map multiline fields
  config.multilineFields![0].value = 'Please attach Transaction details of the fund transferred to SRIC/IITR account';
  
  return config;
}
