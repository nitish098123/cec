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
        { label: "1. Gross Amount including Service Tax", value: "", type: "text" },
        { label: "2. Less- Service Tax", value: "", type: "text" },
        { label: "3. Contracted Amount", value: "", type: "text" },
        { label: "4. Institute Share (20% of Contracted Amount)", value: "", type: "text" },
        { label: "5. Expenditure (Estimated*)", value: "", type: "text" },
        { label: "6. Honorarium (Estimated)", value: "", type: "text" },
        { label: "7. Reason for Extension of Time and /or Revision of amount (correspondence to be attached, if any). To distribute the honorarium and close the course.", value: "", type: "multiline" },
        { label: "Attach Correspondence (if any)", value: "", type: "text" },
        { label: "Signature of Principal Investigator (with date)", value: "", type: "text" },
        { label: "Dealing Asstt.", value: "", type: "text" },
        { label: "Superintendent, CEC", value: "", type: "text" },
        { label: "Coordinator, CEC", value: "", type: "text" },
        { label: "CEC Office, IIT Roorkee", value: "", type: "text" },
        { label: "Recommended/Not Recommended", value: "", type: "text" },
        { label: "Supdt. (SRIC – Admn),", value: "", type: "text" },
        { label: "AR/DR (SRIC-Admn.),", value: "", type: "text" },
        { label: "Assoc. Dean (SRIC) / Dean (SRIC)", value: "", type: "text" },
        { label: "SRIC Office, IIT Roorkee", value: "", type: "text" },
        { label: "Approved /Not Approved", value: "", type: "text" },
        { label: "Copy to: 1.Principal Investigator", value: "", type: "text" },
        { label: "2. AR SRIC A/c", value: "", type: "text" },
        { label: "C:SRIC/SRICCON/05", value: "", type: "text" }
    ],
    multilineFields: [
        { label: "7. Reason for Extension of Time and /or Revision of amount (correspondence to be attached, if any). To distribute the honorarium and close the course.", value: "", maxWidth: 400 }
    ]
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
            { label: "(a) Original", value: formData.original_date || "", type: "text" },
            { label: "(b) Revised", value: formData.revised_date || "", type: "text" },
            { label: "6. Revision of Project budget : Contracted Amount :- Nil", value: "", type: "text" },
            { label: "(a) Original (Rs.)", value: formData.original_budget || "", type: "text" },
            { label: "(b) Revised (Rs.)", value: formData.revised_budget || "", type: "text" },
            { label: "1. Gross Amount including Service Tax", value: formData.gross_amount?.toString() || "", type: "text" },
            { label: "2. Less- Service Tax", value: formData.less_service_tax?.toString() || "", type: "text" },
            { label: "3. Contracted Amount", value: formData.contracted_amount?.toString() || "", type: "text" },
            { label: "4. Institute Share (20% of Contracted Amount)", value: formData.institute_share?.toString() || "", type: "text" },
            { label: "5. Expenditure (Estimated*)", value: formData.expenditure_estimated?.toString() || "", type: "text" },
            { label: "6. Honorarium (Estimated)", value: formData.honorarium_estimated?.toString() || "", type: "text" },
            { label: "7. Reason for Extension of Time and /or Revision of amount (correspondence to be attached, if any). To distribute the honorarium and close the course.", value: formData.reason || "", type: "multiline" },
            { label: "Attach Correspondence (if any)", value: formData.correspondence_attachment ? "Attached" : "", type: "text" },
            { label: "Signature of Principal Investigator (with date)", value: "", type: "text" },
            { label: "Dealing Asstt.", value: "", type: "text" },
            { label: "Superintendent, CEC", value: "", type: "text" },
            { label: "Coordinator, CEC", value: "", type: "text" },
            { label: "CEC Office, IIT Roorkee", value: "", type: "text" },
            { label: "Recommended/Not Recommended", value: "", type: "text" },
            { label: "Supdt. (SRIC – Admn),", value: "", type: "text" },
            { label: "AR/DR (SRIC-Admn.),", value: "", type: "text" },
            { label: "Assoc. Dean (SRIC) / Dean (SRIC)", value: "", type: "text" },
            { label: "SRIC Office, IIT Roorkee", value: "", type: "text" },
            { label: "Approved /Not Approved", value: "", type: "text" },
            { label: "Copy to: 1.Principal Investigator", value: "", type: "text" },
            { label: "2. AR SRIC A/c", value: "", type: "text" },
            { label: "C:SRIC/SRICCON/05", value: "", type: "text" }
        ],
        multilineFields: [
            { label: "7. Reason for Extension of Time and /or Revision of amount (correspondence to be attached, if any). To distribute the honorarium and close the course.", value: formData.reason || "", maxWidth: 400 }
        ]
    };
};
