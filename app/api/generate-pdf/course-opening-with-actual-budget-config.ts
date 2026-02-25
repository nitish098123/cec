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
    
    // Budget Details - will be rendered as a table
    { label: 'Budget Details:', value: '', type: 'text' as const },
    
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
  ],
  tables: [
    {
      label: 'Budget Details:',
      data: {
        columns: [
          { header: 'No.', width: 40 },
          { header: 'Budget Details', width: 400 },
          { header: 'Amount (Rs.)', width: 110 }
        ],
        rows: [
          ['1', 'Gross amount including GST = (G) received', ''],
          ['2', 'Less GST as applicable (presently GST @ 18%) (L) [Note: L= (G / 1.18) * 18%]', ''],
          ['3(a)', 'Contracted amount \'T\' = (G – L)', ''],
          ['3(b)', 'Institute Overhead Charges (P) (20% of T)', ''],
          ['4', 'Coordination Fee \'C\' [ max @20% of (T-P)]', ''],
          ['5', 'CEC Operational/Establishment cost \'O\'[@10% of (T-P)]', ''],
          ['6', 'TDS deduction, if any', ''],
          ['7', 'Expenses (F): As per actuals:', ''],
          ['i.', 'Cost of registration material (stationery, pen pad, bags, Xeroxing, typing etc.)', ''],
          ['ii.', 'Contingency/miscellaneous expenses', ''],
          ['iii.', 'Infrastructure charges including hall and equipment charges', ''],
          ['iv.', 'Accommodation, boarding and lodging', ''],
          ['v.', 'Transportation: TA/DA to outside experts/participants', ''],
          ['vi.', 'Local travel / field trip / tour', ''],
          ['vii.', 'Lab Staff/TA (please specify)', ''],
          ['8', 'Amount for Honorarium to instructors/experts', '']
        ]
      }
    }
  ],
  signatureSections: [
    {
      label: 'Name of Course Coordinator/PI',
      subLabels: []
    },
    {
      label: 'Signature of Course Coordinator/PI (with date)',
      subLabels: []
    }
  ],
  officeEndorsement: {
    note: undefined,
    table: undefined,
    approvalText: 'Recommended/Not Recommended',
    signatoryText: 'Dealing Asstt. Sr. Superintendent, CEC Coordinator, CEC',
    copyToText: undefined,
    notes: undefined
  },
  secondOfficeEndorsement: {
    title: 'SRIC Office, IIT Roorkee',
    approvalText: 'Approved /Not Approved',
    signatoryText: 'Supdt. (SRIC - Admn), AR (SRIC-Admn.), Assoc. Dean (SRIC) / Dean (SRIC)'
  }
};

// Helper function to map form data to configuration
export function mapCourseOpeningWithActualBudgetDataToConfig(formData: any) {
  const config = { ...courseOpeningWithActualBudgetConfig };
  
  // Map form data to field values
  config.fields[0].value = formData.courseCode || '';
  config.fields[1].value = formData.courseNameAndDate || '';
  config.fields[2].value = formData.courseBudget || '';
  
  // Budget details - update table with form data
  if (config.tables && config.tables[0]) {
    config.tables[0].data.rows[0][2] = formData.grossAmount?.toString() || ''; // Row 1: Gross amount
    config.tables[0].data.rows[1][2] = formData.lessGst?.toString() || ''; // Row 2: Less GST
    config.tables[0].data.rows[2][2] = formData.contractedAmount?.toString() || ''; // Row 3: Contracted amount
    config.tables[0].data.rows[3][2] = formData.instituteOverhead?.toString() || ''; // Row 4: Institute Overhead
    config.tables[0].data.rows[4][2] = formData.coordinationFee?.toString() || ''; // Row 5: Coordination Fee
    config.tables[0].data.rows[5][2] = formData.cecOperationalCost?.toString() || ''; // Row 6: CEC Operational Cost
    config.tables[0].data.rows[6][2] = formData.tdsDeduction?.toString() || ''; // Row 7: TDS deduction
    // Row 8: Expenses header (no value)
    config.tables[0].data.rows[8][2] = formData.expenses?.registrationMaterial?.toString() || ''; // Row 9: Registration material
    config.tables[0].data.rows[9][2] = formData.expenses?.contingency?.toString() || ''; // Row 10: Contingency
    config.tables[0].data.rows[10][2] = formData.expenses?.infrastructure?.toString() || ''; // Row 11: Infrastructure
    config.tables[0].data.rows[11][2] = formData.expenses?.accommodation?.toString() || ''; // Row 12: Accommodation
    config.tables[0].data.rows[12][2] = formData.expenses?.transportation?.toString() || ''; // Row 13: Transportation
    config.tables[0].data.rows[13][2] = formData.expenses?.localTravel?.toString() || ''; // Row 14: Local travel
    config.tables[0].data.rows[14][2] = formData.expenses?.labStaff?.toString() || ''; // Row 15: Lab Staff/TA
    config.tables[0].data.rows[15][2] = formData.honorarium?.toString() || ''; // Row 16: Honorarium
  }
  
  // Expenses
  config.fields[3].value = ''; // Section header
  config.fields[4].value = formData.expenses?.registrationMaterial?.toString() || '';
  config.fields[5].value = formData.expenses?.contingency?.toString() || '';
  config.fields[6].value = formData.expenses?.infrastructure?.toString() || '';
  config.fields[7].value = formData.expenses?.accommodation?.toString() || '';
  config.fields[8].value = formData.expenses?.transportation?.toString() || '';
  config.fields[9].value = formData.expenses?.localTravel?.toString() || '';
  config.fields[10].value = formData.expenses?.labStaff?.toString() || '';
  
  config.fields[11].value = formData.honorarium?.toString() || '';
  
  // Map multiline fields
  config.multilineFields![0].value = 'Please attach Transaction details of the fund transferred to SRIC/IITR account';
  
  return config;
}
