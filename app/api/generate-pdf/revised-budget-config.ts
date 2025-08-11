import { FormConfig } from './route';

export const revisedBudgetConfig: FormConfig = {
    title: "REQUEST FOR REVISED BUDGET FORM (Open Participation/Sponsored)",
    subtitle: undefined,
    fields: [
        { label: "1. Course Code :", value: "", type: "text" },
        { label: "2. Course Name & Date", value: "", type: "text" },
        { label: "3. Revision of Course budget : Gross Amount (a) Original (Rs.)", value: "", type: "text" },
        { label: "(b) Revised (Rs.)", value: "", type: "text" },
        { label: "Please attach Transaction details of the fund transferred to SRIC/IITR account", value: "", type: "text" },
        { label: "1. Gross amount including GST = (G) received", value: "", type: "text" },
        { label: "2. Less GST as applicable (presently GST @ 18%) (L) [Note: L= (G / 1.18) * 18%]", value: "", type: "text" },
        { label: "3. (a) Contracted amount 'T' = (G – L)", value: "", type: "text" },
        { label: "3. (b) Institute Overhead Chargees (P) (20% of T)", value: "", type: "text" },
        { label: "4. Coordination Fee 'C' [ max @20% of (T-P)]", value: "", type: "text" },
        { label: "5. CEC Operational/Establishment cost 'O'[@10% of (T-P)]", value: "", type: "text" },
        { label: "6. TDS deduction, if any", value: "", type: "text" },
        { label: "7. Expenses (E) : As per actuals", value: "", type: "text" },
        { label: "i. Cost of registration material (stationery, pen pad, bags, Xeroxing, typing etc.)", value: "", type: "subfield", indentLevel: 1 },
        { label: "ii. Contingency/miscellaneous expenses", value: "", type: "subfield", indentLevel: 1 },
        { label: "iii. Infrastructure charges including hall and equipment charges", value: "", type: "subfield", indentLevel: 1 },
        { label: "iv. Accommodation, boarding and lodging", value: "", type: "subfield", indentLevel: 1 },
        { label: "v. Transportation: TA/DA to outside experts/participants", value: "", type: "subfield", indentLevel: 1 },
        { label: "vi. Local travel / field trip / tour", value: "", type: "subfield", indentLevel: 1 },
        { label: "vii. Lab Staff/TA (please specify)", value: "", type: "subfield", indentLevel: 1 },
        { label: "8. Amount for Honorarium to instructors/experts", value: "", type: "text" },
        { label: "Attach Correspondence", value: "", type: "text" },
        { label: "Name of Course Coordinator/PI", value: "", type: "text" },
        { label: "Signature of Course Coordinator/PI (with date)", value: "", type: "text" },
        { label: "CEC Office, IIT Roorkee", value: "", type: "text" },
        { label: "Recommended/Not Recommended", value: "", type: "text" },
        { label: "Dealing Asstt.", value: "", type: "text" },
        { label: "Sr. Superintendent, CEC", value: "", type: "text" },
        { label: "Coordinator, CEC", value: "", type: "text" },
        { label: "SRIC Office, IIT Roorkee", value: "", type: "text" },
        { label: "Approved / Not Approved", value: "", type: "text" },
        { label: "Supdt. (SRIC – Admn).", value: "", type: "text" },
        { label: "AR (SRIC-Admn.),", value: "", type: "text" },
        { label: "Assoc. Dean (SRIC) / Dean (SRIC)", value: "", type: "text" }
    ],
    multilineFields: [
        { label: "9. Reason for Extension of Time and /or Revision of amount (correspondence to be attached, if any).", value: "", maxWidth: 350 }
    ]
};

export const mapRevisedBudgetDataToConfig = (formData: any): FormConfig => {
    return {
        ...revisedBudgetConfig,
        fields: [
            { label: "1. Course Code :", value: formData.courseCode || "", type: "text" },
            { label: "2. Course Name & Date", value: formData.courseNameAndDate || "", type: "text" },
            { label: "3. Revision of Course budget : Gross Amount (a) Original (Rs.)", value: formData.originalBudget?.toString() || "", type: "text" },
            { label: "(b) Revised (Rs.)", value: formData.revisedBudget?.toString() || "", type: "text" },
            { label: "Please attach Transaction details of the fund transferred to SRIC/IITR account", value: "", type: "text" },
            { label: "1. Gross amount including GST = (G) received", value: formData.grossAmount?.toString() || "", type: "text" },
            { label: "2. Less GST as applicable (presently GST @ 18%) (L) [Note: L= (G / 1.18) * 18%]", value: formData.lessGst?.toString() || "", type: "text" },
            { label: "3. (a) Contracted amount 'T' = (G – L)", value: formData.contractedAmount?.toString() || "", type: "text" },
            { label: "3. (b) Institute Overhead Chargees (P) (20% of T)", value: formData.instituteOverhead?.toString() || "", type: "text" },
            { label: "4. Coordination Fee 'C' [ max @20% of (T-P)]", value: formData.coordinationFee?.toString() || "", type: "text" },
            { label: "5. CEC Operational/Establishment cost 'O'[@10% of (T-P)]", value: formData.cecOperationalCost?.toString() || "", type: "text" },
            { label: "6. TDS deduction, if any", value: formData.tdsDeduction?.toString() || "", type: "text" },
            { label: "7. Expenses (E) : As per actuals", value: "", type: "text" },
            { label: "i. Cost of registration material (stationery, pen pad, bags, Xeroxing, typing etc.)", value: formData.expenses?.registrationMaterial?.toString() || "", type: "subfield", indentLevel: 1 },
            { label: "ii. Contingency/miscellaneous expenses", value: formData.expenses?.contingency?.toString() || "", type: "subfield", indentLevel: 1 },
            { label: "iii. Infrastructure charges including hall and equipment charges", value: formData.expenses?.infrastructure?.toString() || "", type: "subfield", indentLevel: 1 },
            { label: "iv. Accommodation, boarding and lodging", value: formData.expenses?.accommodation?.toString() || "", type: "subfield", indentLevel: 1 },
            { label: "v. Transportation: TA/DA to outside experts/participants", value: formData.expenses?.transportation?.toString() || "", type: "subfield", indentLevel: 1 },
            { label: "vi. Local travel / field trip / tour", value: formData.expenses?.localTravel?.toString() || "", type: "subfield", indentLevel: 1 },
            { label: "vii. Lab Staff/TA (please specify)", value: formData.expenses?.labStaff?.toString() || "", type: "subfield", indentLevel: 1 },
            { label: "8. Amount for Honorarium to instructors/experts", value: formData.honorarium?.toString() || "", type: "text" },
            { label: "Attach Correspondence", value: formData.correspondenceAttachment ? "Attached" : "", type: "text" },
            { label: "Name of Course Coordinator/PI", value: "", type: "text" },
            { label: "Signature of Course Coordinator/PI (with date)", value: "", type: "text" },
            { label: "CEC Office, IIT Roorkee", value: "", type: "text" },
            { label: "Recommended/Not Recommended", value: "", type: "text" },
            { label: "Dealing Asstt.", value: "", type: "text" },
            { label: "Sr. Superintendent, CEC", value: "", type: "text" },
            { label: "Coordinator, CEC", value: "", type: "text" },
            { label: "SRIC Office, IIT Roorkee", value: "", type: "text" },
            { label: "Approved / Not Approved", value: "", type: "text" },
            { label: "Supdt. (SRIC – Admn).", value: "", type: "text" },
            { label: "AR (SRIC-Admn.),", value: "", type: "text" },
            { label: "Assoc. Dean (SRIC) / Dean (SRIC)", value: "", type: "text" }
        ],
        multilineFields: [
            { label: "9. Reason for Extension of Time and /or Revision of amount (correspondence to be attached, if any).", value: formData.reasonForExtension || "", maxWidth: 350 }
        ]
    };
};
