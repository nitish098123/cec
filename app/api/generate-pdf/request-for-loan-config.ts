import { FormConfig } from './route';

export const requestForLoanConfig: FormConfig = {
    title: "REQUEST FOR LOAN",
    subtitle: "(To be filled by Course Coordinator)",
    fields: [
        { label: "Employee No.", value: "", type: "text" },
        { label: "1. Name", value: "", type: "text" },
        { label: "2. Designation", value: "", type: "text" },
        { label: "3. Department", value: "", type: "text" },
        { label: "4. Purpose of Loan", value: "", type: "text" },
        { label: "5. Amount of loan required Rs.", value: "", type: "text" },
        { label: "(In words) Rupees", value: "", type: "text" },
        { label: "6. Date by which amount of loan will be submitted for adjustment", value: "", type: "text" },
        { label: "7. Debit grant/course code", value: "", type: "text" },
        { label: "8. Credit course code", value: "", type: "text" },
        { label: "9 (b) Reason for non-adjustment:", value: "", type: "multiline" }
    ],
    tables: [
        {
            label: "9 (a) Details of outstanding loan (s):",
            data: {
                columns: [
                    { header: "S. No.", width: 60 },
                    { header: "Amount", width: 120 },
                    { header: "Date", width: 120 },
                    { header: "Course code", width: 150 }
                ],
                rows: []
            }
        }
    ],
    plainTextSections: [
        {
            content: "Note: Loan for the course will be settled from Course Code as mentioned at s.no. 8 once we receive the course fee."
        }
    ],
    multilineFields: [
        { label: "9 (b) Reason for non-adjustment:", value: "", maxWidth: 400 }
    ]
};

// Helper function to format date values from DatePicker
const formatDateValue = (dateValue: any): string => {
    if (!dateValue) return "";
    if (typeof dateValue === 'string') {
        return dateValue;
    } else if (dateValue.format) {
        // Ant Design DatePicker
        return dateValue.format('DD/MM/YYYY');
    } else if (dateValue.$d) {
        // Day.js date object
        const d = dateValue.$d;
        return `${String(d.getDate()).padStart(2, '0')}/${String(d.getMonth() + 1).padStart(2, '0')}/${d.getFullYear()}`;
    }
    return "";
};

export const mapRequestForLoanDataToConfig = (formData: any): FormConfig => {
    // Extract table data from formData
    // Check if outstanding_loan_details is an array (from Form.List) or single values
    let tableRows: any[] = [];
    
    if (formData.outstanding_loan_details && Array.isArray(formData.outstanding_loan_details)) {
        // If it's an array from Form.List
        tableRows = formData.outstanding_loan_details.map((entry: any, index: number) => {
            const formattedDate = formatDateValue(entry.date);
            
            return [
                String(index + 1),
                entry.amount || "",
                formattedDate,
                entry.course_code || ""
            ];
        });
    } else {
        // Legacy: single row from individual fields
        const formattedDate = formatDateValue(formData.outstanding_loan_date);
        
        if (formData.outstanding_loan_amount || formData.outstanding_loan_date || formData.outstanding_loan_course_code) {
            tableRows = [[
                "1",
                formData.outstanding_loan_amount || "",
                formattedDate,
                formData.outstanding_loan_course_code || ""
            ]];
        }
    }
    
    // If no rows, add at least one empty row
    if (tableRows.length === 0) {
        tableRows = [["1", "", "", ""]];
    }
    
    // Format adjustment_date if it's a DatePicker value
    const formattedAdjustmentDate = formatDateValue(formData.adjustment_date);
    
    return {
        ...requestForLoanConfig,
        fields: [
            { label: "Employee No.", value: formData.employee_no || "", type: "text" },
            { label: "1. Name", value: formData.name || "", type: "text" },
            { label: "2. Designation", value: formData.designation || "", type: "text" },
            { label: "3. Department", value: formData.department || "", type: "text" },
            { label: "4. Purpose of Loan", value: formData.purpose_of_loan || "", type: "text" },
            { label: "5. Amount of loan required Rs.", value: formData.amount_required || "", type: "text" },
            { label: "(In words) Rupees", value: formData.amount_in_words || "", type: "text" },
            { label: "6. Date by which amount of loan will be submitted for adjustment", value: formattedAdjustmentDate, type: "text" },
            { label: "7. Debit grant/course code", value: formData.debit_grant_code || "", type: "text" },
            { label: "8. Credit course code", value: formData.credit_course_code || "", type: "text" },
            { label: "9 (b) Reason for non-adjustment:", value: formData.reason_for_non_adjustment || "", type: "multiline" }
        ],
        tables: [
            {
                label: "9 (a) Details of outstanding loan (s):",
                data: {
                    columns: [
                        { header: "S. No.", width: 60 },
                        { header: "Amount", width: 120 },
                        { header: "Date", width: 120 },
                        { header: "Course code", width: 150 }
                    ],
                    rows: tableRows
                }
            }
        ],
        multilineFields: [
            { label: "9 (b) Reason for non-adjustment:", value: formData.reason_for_non_adjustment || "", maxWidth: 400 }
        ]
    };
};
