import { FormConfig } from './route';

export const courseExtensionConfig: FormConfig = {
    title: "FORM FOR EXTENSION OF TIME / REVISION OF PROJECT AMOUNT",
    subtitle: undefined,
    fields: [
        { label: "1. Project No.: CEC-", value: "", type: "text" },
        { label: "2. Name and department of Principal Investigator:", value: "", type: "text" },
        { label: "3. Title of the Project:", value: "", type: "text" },
        { label: "4. Sponsor:", value: "", type: "text" },
        { label: "5. Extension of Time: Expected date of completion", value: "", type: "text" },
        { label: "(a) Original", value: "", type: "text" },
        { label: "(b) Revised", value: "", type: "text" },
        { label: "6. Revision of Project budget : Contracted Amount :- Nil", value: "", type: "text" },
        { label: "(a) Original (Rs.)", value: "", type: "text" },
        { label: "(b) Revised (Rs.)", value: "", type: "text" },
        { label: "Gross Amount including Service Tax", value: "", type: "text" },
        { label: "Less- Service Tax", value: "", type: "text" },
        { label: "Contracted Amount", value: "", type: "text" },
        { label: "Institute Share (20% of Contracted Amount)", value: "", type: "text" },
        { label: "Expenditure (Estimated*)", value: "", type: "text" },
        { label: "Honorarium (Estimated)", value: "", type: "text" },
        { label: "Reason for Extension of Time and /or Revision of amount (correspondence to be attached, if any). To distribute the honorarium and close the course.", value: "", type: "multiline" }
    ],
    plainTextSections: [
        {
            title: "Budget Head / Description & Revised Budgeted Amount",
            content: ""
        }
    ]
};

// Helper function to format date from ISO string or dayjs object to DD/MM/YYYY
const formatDate = (dateValue: any): string => {
    if (!dateValue) return "";
    
    let date: Date;
    
    // Handle ISO string
    if (typeof dateValue === 'string') {
        date = new Date(dateValue);
    }
    // Handle dayjs object (has $d property)
    else if (dateValue && typeof dateValue === 'object' && dateValue.$d) {
        date = new Date(dateValue.$d);
    }
    // Handle Date object
    else if (dateValue instanceof Date) {
        date = dateValue;
    }
    // Try to convert to Date
    else {
        date = new Date(dateValue);
    }
    
    // Check if date is valid
    if (isNaN(date.getTime())) {
        return "";
    }
    
    // Format as DD/MM/YYYY
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    
    return `${day}/${month}/${year}`;
};

export const mapCourseExtensionDataToConfig = (formData: any): FormConfig => {
    return {
        ...courseExtensionConfig,
        fields: [
            { label: "1. Project No.: CEC-", value: formData.project_no || "", type: "text" },
            { label: "2. Name and department of Principal Investigator:", value: formData.principal_investigator || "", type: "text" },
            { label: "3. Title of the Project:", value: formData.project_title || "", type: "text" },
            { label: "4. Sponsor:", value: formData.sponsor || "", type: "text" },
            { label: "5. Extension of Time: Expected date of completion", value: "", type: "text" },
            { label: "(a) Original", value: formatDate(formData.original_date), type: "text" },
            { label: "(b) Revised", value: formatDate(formData.revised_date), type: "text" },
            { label: "6. Revision of Project budget : Contracted Amount :- Nil", value: "", type: "text" },
            { label: "(a) Original (Rs.)", value: formData.original_budget || "", type: "text" },
            { label: "(b) Revised (Rs.)", value: formData.revised_budget || "", type: "text" },
            { label: "Gross Amount including Service Tax", value: formData.gross_amount?.toString() || "", type: "text" },
            { label: "Less- Service Tax", value: formData.less_service_tax?.toString() || "", type: "text" },
            { label: "Contracted Amount", value: formData.contracted_amount?.toString() || "", type: "text" },
            { label: "Institute Share (20% of Contracted Amount)", value: formData.institute_share?.toString() || "", type: "text" },
            { label: "Expenditure (Estimated*)", value: formData.expenditure_estimated?.toString() || "", type: "text" },
            { label: "Honorarium (Estimated)", value: formData.honorarium_estimated?.toString() || "", type: "text" },
            { label: "Reason for Extension of Time and /or Revision of amount (correspondence to be attached, if any). To distribute the honorarium and close the course.", value: formData.reason || "", type: "multiline" }
        ],
        plainTextSections: [
            {
                title: "Budget Head / Description & Revised Budgeted Amount",
                content: ""
            }
        ]
};
};
