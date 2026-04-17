// Configuration for Course Invoice Generation Open Form
export const courseInvoiceGenerationOpenConfig = {
  title: 'Request for Course Invoice Generation (Open Participation course)',
  subtitle: '',
  fields: [
    // Dated field
    { label: 'Dated:', value: '', type: 'text' as const },
    // Invoice table will be rendered as a table
    { label: 'Invoice Details:', value: '', type: 'text' as const },
    // Total Invoice Amount in Words
    { label: 'Total invoice amount in words:', value: '', type: 'text' as const },
  ],
  multilineFields: [],
  tables: [
    {
      label: '',
      data: {
        columns: [
          { header: 'S. No.', width: 50 },
          { header: 'Item', width: 300 },
          { header: 'Details', width: 200 }
        ],
        rows: [
          ['1.', 'Name and address of the Program Partner\nGST No. of the Program Partner', ''],
          ['2.', '(i) Course Code:\n(ii) Course Name:\n(iii) Batch No.:\n(iv) Duration (from ______ To ______)\n(v) Instalment No.\n(vi) Fee Per Participant', ''],
          ['3.', 'Total Fee collected (by Program Partner/SRIC-IITR) for ______ Students (including GST)\nPlease attach list of the participants with fee details', 'Rs.'],
          ['4.', 'IITR Fee Component (______%) of fee receipt in (3) above', 'Rs.'],
          ['5.', 'Total Invoice Amount', 'Rs.']
        ]
      }
    }
  ],
  plainTextSections: [
    {
      content: 'Certified that the particulars given above are true and correct.'
    },
    {
      content: 'Forwarded to Dean SRIC Office'
    }
  ],
  signatureSections: [
    {
      label: 'Prof.',
      subLabels: ['Course Coordinator (s)']
    },
    {
      label: 'Coordinator',
      subLabels: ['CEC IIT Roorkee']
    }
  ]
};

// Helper function to format currency with commas (returns empty string if empty)
function formatCurrency(amount: any): string {
  if (amount === null || amount === undefined || amount === '') return '';
  const numAmount = typeof amount === 'string' ? parseFloat(amount.replace(/,/g, '')) : Number(amount);
  if (isNaN(numAmount)) return '';
  return numAmount.toLocaleString('en-IN');
}

// Helper function to format currency with Rs. prefix (returns empty string if empty)
function formatCurrencyWithRs(amount: any): string {
  const formatted = formatCurrency(amount);
  return formatted === '' ? '' : `Rs. ${formatted}`;
}

// Helper function to handle empty values (return empty string instead of N.A.)
function handleEmptyValue(value: any, defaultValue: string = ''): string {
  if (value === null || value === undefined || value === '') return defaultValue;
  return String(value);
}

// Helper function to map form data to configuration
export function mapCourseInvoiceGenerationOpenDataToConfig(formData: any) {
  // Use deep copy to avoid mutating the original config
  const config = JSON.parse(JSON.stringify(courseInvoiceGenerationOpenConfig));
  
  // Map form data to field values
  // Format date if provided (handle both string and moment/dayjs objects)
  let formattedDate = '';
  if (formData.dated) {
    if (typeof formData.dated === 'string') {
      formattedDate = formData.dated;
    } else if (formData.dated.format) {
      formattedDate = formData.dated.format('DD-MM-YYYY');
    } else if (formData.dated.toDate) {
      // Handle dayjs or moment objects
      const date = formData.dated.toDate();
      formattedDate = `${String(date.getDate()).padStart(2, '0')}-${String(date.getMonth() + 1).padStart(2, '0')}-${date.getFullYear()}`;
    }
  }
  config.fields[0].value = formattedDate || '';
  
  // Total invoice amount in words
  config.fields[2].value = handleEmptyValue(formData.total_invoice_amount_words, '');
  
  // Ensure table exists and has proper structure
  if (!config.tables || config.tables.length === 0) {
    config.tables = [{
      label: '',
      data: {
        columns: [
          { header: 'S. No.', width: 50 },
          { header: 'Item', width: 300 },
          { header: 'Details', width: 200 }
        ],
        rows: []
      }
    }];
  }
  
  // Ensure table data structure exists
  if (!config.tables[0].data) {
    config.tables[0].data = {
      columns: [
        { header: 'S. No.', width: 50 },
        { header: 'Item', width: 300 },
        { header: 'Details', width: 200 }
      ],
      rows: []
    };
  }
  
  // Ensure rows array exists and initialize with 5 empty rows if needed
  if (!config.tables[0].data.rows) {
    config.tables[0].data.rows = [];
  }
  
  // Ensure all 5 rows exist with 3 columns each (initialize if missing)
  while (config.tables[0].data.rows.length < 5) {
    config.tables[0].data.rows.push(['', '', '']);
  }
  
  // Ensure each row has exactly 3 elements
  for (let i = 0; i < config.tables[0].data.rows.length; i++) {
    while (config.tables[0].data.rows[i].length < 3) {
      config.tables[0].data.rows[i].push('');
    }
  }
  
  // Row 1: Partner details
  config.tables[0].data.rows[0][0] = '1.';
  config.tables[0].data.rows[0][1] = 'Name and address of the Program Partner\nGST No. of the Program Partner';
  config.tables[0].data.rows[0][2] = handleEmptyValue(formData.partner_details);
  
  // Row 2: Course details - format with labels and values
  let durationText = '';
  if (formData.duration && Array.isArray(formData.duration)) {
    const formatDate = (date: any) => {
      if (!date) return '';
      if (typeof date === 'string') return date;
      if (date.format) return date.format('DD-MM-YYYY');
      if (date.toDate) {
        const d = date.toDate();
        return `${String(d.getDate()).padStart(2, '0')}-${String(d.getMonth() + 1).padStart(2, '0')}-${d.getFullYear()}`;
      }
      return '';
    };
    const startDate = formatDate(formData.duration[0]);
    const endDate = formatDate(formData.duration[1]);
    if (startDate && endDate) {
      durationText = `${startDate} to ${endDate}`;
    } else if (startDate || endDate) {
      durationText = startDate || endDate;
    }
  }
  
  // Format course details with labels and values on separate lines
  const courseCode = handleEmptyValue(formData.course_code);
  const courseName = handleEmptyValue(formData.course_name);
  const batchNo = handleEmptyValue(formData.batch_no);
  const instalmentNo = handleEmptyValue(formData.instalment_no);
    const feePerParticipant = formData.fee_per_participant 
      ? formatCurrencyWithRs(formData.fee_per_participant) 
      : '';
    
    // Update Row 2: Course details - Item column shows labels, Details column shows values
    config.tables[0].data.rows[1][0] = '2.';
    config.tables[0].data.rows[1][1] = '(i) Course Code:\n(ii) Course Name:\n(iii) Batch No.:\n(iv) Duration (from ______ To ______)\n(v) Instalment No.\n(vi) Fee Per Participant';
    
    // Update Details column with values (empty strings for empty values)
    const courseDetails = [
      courseCode,
      courseName,
      batchNo,
      durationText || '',
      instalmentNo,
      feePerParticipant
    ].join('\n');
  config.tables[0].data.rows[1][2] = courseDetails;
  
  // Row 3: Total fee collected - update Item text with number of students and Details with amount
  const numStudents = handleEmptyValue(formData.num_students, '______');
  config.tables[0].data.rows[2][0] = '3.';
  config.tables[0].data.rows[2][1] = `Total Fee collected (by Program Partner/SRIC-IITR) for ${numStudents} Students (including GST)\nPlease attach list of the participants with fee details`;
  const totalFeeAmount = formatCurrencyWithRs(formData.total_fee_collected_amount);
  config.tables[0].data.rows[2][2] = totalFeeAmount;
  
  // Row 4: IITR Fee Component - update Item text with percentage and Details with amount
  const iitrPercent = handleEmptyValue(formData.iitr_fee_percent, '______');
  config.tables[0].data.rows[3][0] = '4.';
  config.tables[0].data.rows[3][1] = `IITR Fee Component (${iitrPercent}%) of fee receipt in (3) above`;
  const iitrFeeAmount = formatCurrencyWithRs(formData.iitr_fee_amount);
  config.tables[0].data.rows[3][2] = iitrFeeAmount;
  
  // Row 5: Total Invoice Amount
  config.tables[0].data.rows[4][0] = '5.';
  config.tables[0].data.rows[4][1] = 'Total Invoice Amount';
  const totalInvoiceAmount = formatCurrencyWithRs(formData.total_invoice_amount);
  config.tables[0].data.rows[4][2] = totalInvoiceAmount;
  
  // Debug: Log final table structure
  console.log('Final table rows:', JSON.stringify(config.tables[0].data.rows, null, 2));
  console.log('Table has', config.tables[0].data.rows.length, 'rows');
  
  return config;
}
