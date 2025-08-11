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
        { label: "9 (a) Details of outstanding loan (s):", value: "", type: "text" },
        { label: "S. No.", value: "", type: "text" },
        { label: "Amount", value: "", type: "text" },
        { label: "Date", value: "", type: "text" },
        { label: "Course code", value: "", type: "text" },
        { label: "9 (b) Reason for non-adjustment:", value: "", type: "multiline" },
        { label: "Note: Loan for the course will be settled from Course Code as mentioned at s.no. 8 once we receive the course fee.", value: "", type: "text" },
        { label: "(Signature of Course Coordinator)", value: "", type: "text" },
        { label: "(Recommendation of the Coordinator, CEC)", value: "", type: "text" },
        { label: "Forwarded to the Coordinator CEC for needful.", value: "", type: "text" }
    ],
    multilineFields: [
        { label: "9 (b) Reason for non-adjustment:", value: "", maxWidth: 400 }
    ]
};

export const mapRequestForLoanDataToConfig = (formData: any): FormConfig => {
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
            { label: "6. Date by which amount of loan will be submitted for adjustment", value: formData.adjustment_date || "", type: "text" },
            { label: "7. Debit grant/course code", value: formData.debit_grant_code || "", type: "text" },
            { label: "8. Credit course code", value: formData.credit_course_code || "", type: "text" },
            { label: "9 (a) Details of outstanding loan (s):", value: "", type: "text" },
            { label: "S. No.", value: "1", type: "text" },
            { label: "Amount", value: formData.outstanding_loan_amount || "", type: "text" },
            { label: "Date", value: formData.outstanding_loan_date || "", type: "text" },
            { label: "Course code", value: formData.outstanding_loan_course_code || "", type: "text" },
            { label: "9 (b) Reason for non-adjustment:", value: formData.reason_for_non_adjustment || "", type: "multiline" },
            { label: "Note: Loan for the course will be settled from Course Code as mentioned at s.no. 8 once we receive the course fee.", value: "", type: "text" },
            { label: "(Signature of Course Coordinator)", value: "", type: "text" },
            { label: "(Recommendation of the Coordinator, CEC)", value: "", type: "text" },
            { label: "Forwarded to the Coordinator CEC for needful.", value: "", type: "text" }
        ],
        multilineFields: [
            { label: "9 (b) Reason for non-adjustment:", value: formData.reason_for_non_adjustment || "", maxWidth: 400 }
        ]
    };
};
