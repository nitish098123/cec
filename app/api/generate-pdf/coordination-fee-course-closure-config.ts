import { FormConfig } from './route';

export const coordinationFeeCourseClosureConfig: FormConfig = {
    title: "COORDINATION FEE AND COURSE CLOSURE FORM",
    subtitle: "FOR OPEN PARTICIPATION/SPONSORED COURSE FUND",
    fields: [
        { label: "Course-Code.", value: "", type: "text" },
        { label: "Distribution: Final/Interim", value: "", type: "text" },
        { label: "Title of Course", value: "", type: "text" },
        { label: "Course Coordinator's/PI's Name", value: "", type: "text" },
        { label: "Designation", value: "", type: "text" },
        { label: "Department /Centre", value: "", type: "text" },
        { label: "a. Gross amount including GST G", value: "", type: "text" },
        { label: "b. Less GST as applicable L (presently @18%) (G/1.18*18%)", value: "", type: "text" },
        { label: "c. Total Contracted amount T (=G-L)", value: "", type: "text" },
        { label: "d. Amount payable to Institute Overhead Charges P (@20%of T)", value: "", type: "text" },
        { label: "e. CEC operational/establishment cost O(@10%of T-P)", value: "", type: "text" },
        { label: "f. TDS Deduction (if any) TD", value: "", type: "text" },
        { label: "g. Honorarium to Instructor/s/Experts H", value: "", type: "text" },
        { label: "h. Expenditure already done E", value: "", type: "text" },
        { label: "i. Balance amount available (T-P-O-TD-H-E)", value: "", type: "text" },
        { label: "i. CEC DDF component CEC-DDF-001", value: "", type: "text" },
        { label: "ii. Coordination fee 'C' maximum @ 20% of (T-P)* = Rs.", value: "", type: "text" },
        { label: "Remaining amount (if any) to DDF of CEC [CEC-DDF-001] = Rs.", value: "", type: "text" },
        { label: "This is final distribution and that the work has been completed. The final report has been sent vide letter No. _____________ Dated ____________ (Copy enclosed)", value: "", type: "text" },
        { label: "Signature of the Course Coordinator (with date)", value: "", type: "text" },
        { label: "Extn. (O)", value: "", type: "text" },
        { label: "Mobile", value: "", type: "text" },
        { label: "Email :", value: "", type: "text" },
        { label: "Recommended /Not Recommended", value: "", type: "text" },
        { label: "Approved/Not Approved", value: "", type: "text" },
        { label: "D.A /Sr. Supdt (C.E.C.)", value: "", type: "text" },
        { label: "Coordinator, CEC", value: "", type: "text" },
        { label: "D.A. /Supdt (SRIC)", value: "", type: "text" },
        { label: "A.R./Dy. Registrar (SRIC)", value: "", type: "text" },
        { label: "Dean, SRIC", value: "", type: "text" },
        { label: "Total Institute Overhead Charges deducted (P) = Rs.", value: "", type: "text" },
        { label: "(i) 50% to IDF [CEC-IDF-001] = Rs.", value: "", type: "text" },
        { label: "(ii) 45% to CEC [CEC-DDF-001] = Rs.", value: "", type: "text" },
        { label: "(iii) 5% Electricity [CEC-DDF-001] = Rs.", value: "", type: "text" },
        { label: "Coordinator, CEC", value: "", type: "text" }
    ],
    tables: [
        {
            label: "",
            data: {
                columns: [
                    { header: "Name", width: 100 },
                    { header: "Employee code", width: 100 },
                    { header: "Bank A/C No.", width: 120 },
                    { header: "IFSC Code:", width: 100 },
                    { header: "PDF", width: 80 },
                    { header: "Bank A/C", width: 100 }
                ],
                rows: []
            }
        }
    ],
    plainTextSections: [
        {
            title: "A. COURSE FUND POSITION",
            content: ""
        },
        {
            title: "B. Details of amount to be distributed",
            content: ""
        },
        {
            title: "",
            content: "(in case of Open Participation course, If coordination fee amount is above Rs. 8 Lacs)"
        },
        {
            title: "",
            content: "Coordination fee 'C' maximum @ 20% of (T-P)\n\nDetails of distribution among Coordinators"
        },
        {
            title: "Mention all the names as per approval even if the amount to be disbursed is NIL.",
            content: ""
        },
        {
            title: "",
            content: "Certified that"
        },
        {
            title: "The soft copy of the following documents are required :",
            content: ""
        },
        {
            title: "",
            content: "(i) Name, email id and address of the sponsoring agency\n(ii) List of experts with email id and address\n(iii) List of the participants with email id and address\n(iv) Time Table\n(v) Group-photo."
        },
        {
            title: "Endorsement by CEC/SRIC Office, I.I.T. Roorkee",
            content: ""
        },
            {
                title: "",
                content: "The above is submitted for approval as recommended by Coordinator, CEC"
            },
            {
                title: "",
                content: "Distribution of total institute share into IDF/CEC DDF Account ,"
            },
            {
                title: "* Coordination Fee",
                content: ""
            },
            {
                title: "(i) Open Participation Course",
                content: "Coordination Fee is subject to a maximum of Rs. 8 Lakh. If faculty member desires whole or part of this amount can be transferred to the PDF (SRIC) of the faculty member(s). 50% of any left-over amount from coordination fee above Rs. 8 Lakhs will be deposited into the PDF (SRIC) of respective faculty (to be distributed as agreed), while the remaining 50% will be deposited into CEC corpus for developmental activities."
            },
            {
                title: "(ii) Sponsored Course",
                content: "Coordination Fee is subject to a maximum of Rs. 8 Lakh. If faculty member desires whole or part of this amount can be transferred to the PDF (SRIC) of the faculty member(s). Any left-over amount from coordination fee above Rs. 8 Lacs will be deposited into the PDF (SRIC) of respective faculty (to be distributed as agreed)"
            }
        ]
};

export const mapCoordinationFeeCourseClosureDataToConfig = (formData: any): FormConfig => {
    console.log('Mapping coordination fee data:', formData);
    
    // Extract table data from formData
    let tableRows: any[] = [];
    
    if (formData.distribution_details && Array.isArray(formData.distribution_details)) {
        // If it's an array from Form.List
        console.log('Found distribution_details array:', formData.distribution_details);
        tableRows = formData.distribution_details.map((entry: any) => {
            return [
                entry.name || "",
                entry.employee_code || "",
                entry.bank_ac_no || "",
                entry.ifsc_code || "",
                entry.pdf || "",
                entry.amount || ""
            ];
        });
    } else {
        // Legacy: single row from individual fields or empty rows
        // For now, create empty rows for the table
        console.log('No distribution_details array found, using legacy fields');
        tableRows = [
            [
                formData.distribution_name_1 || "",
                formData.distribution_employee_code_1 || "",
                formData.distribution_bank_ac_no_1 || "",
                formData.distribution_ifsc_code_1 || "",
                formData.distribution_pdf_1 || "",
                formData.distribution_amount_1?.toString() || ""
            ]
        ];
    }
    
    // If no rows, add at least one empty row
    if (tableRows.length === 0) {
        tableRows = [["", "", "", "", "", ""]];
    }
    
    console.log('Table rows mapped:', tableRows);
    console.log('Course code value:', formData.course_code);
    console.log('Coordination fee value:', formData.coordination_fee);
    
    return {
        ...coordinationFeeCourseClosureConfig,
        fields: [
            { label: "Course-Code.", value: formData.course_code || "", type: "text" },
            { label: "Distribution: Final/Interim", value: formData.distribution || "", type: "text" },
            { label: "Title of Course", value: formData.title_of_course || "", type: "text" },
            { label: "Course Coordinator's/PI's Name", value: formData.coordinator_name || "", type: "text" },
            { label: "Designation", value: formData.designation || "", type: "text" },
            { label: "Department /Centre", value: formData.department || "", type: "text" },
            { label: "a. Gross amount including GST G", value: formData.gross_amount?.toString() || "", type: "text" },
            { label: "b. Less GST as applicable L (presently @18%) (G/1.18*18%)", value: formData.less_gst?.toString() || "", type: "text" },
            { label: "c. Total Contracted amount T (=G-L)", value: formData.total_contracted?.toString() || "", type: "text" },
            { label: "d. Amount payable to Institute Overhead Charges P (@20%of T)", value: formData.overhead_charges?.toString() || "", type: "text" },
            { label: "e. CEC operational/establishment cost O(@10%of T-P)", value: formData.cec_operational_cost?.toString() || "", type: "text" },
            { label: "f. TDS Deduction (if any) TD", value: formData.tds_deduction?.toString() || "", type: "text" },
            { label: "g. Honorarium to Instructor/s/Experts H", value: formData.honorarium?.toString() || "", type: "text" },
            { label: "h. Expenditure already done E", value: formData.expenditure_done?.toString() || "", type: "text" },
            { label: "i. Balance amount available (T-P-O-TD-H-E)", value: formData.balance_amount?.toString() || "", type: "text" },
            { label: "i. CEC DDF component CEC-DDF-001", value: formData.cec_ddf_component?.toString() || "", type: "text" },
            { label: "ii. Coordination fee 'C' maximum @ 20% of (T-P)* = Rs.", value: formData.coordination_fee?.toString() || "", type: "text" },
            { label: "Remaining amount (if any) to DDF of CEC [CEC-DDF-001] = Rs.", value: formData.remaining_amount?.toString() || "", type: "text" },
            { label: "This is final distribution and that the work has been completed. The final report has been sent vide letter No. _____________ Dated ____________ (Copy enclosed)", value: "", type: "text" },
            { label: "Signature of the Course Coordinator (with date)", value: "", type: "text" },
            { label: "Extn. (O)", value: formData.extn || "", type: "text" },
            { label: "Mobile", value: formData.mobile || "", type: "text" },
            { label: "Email :", value: formData.email || "", type: "text" },
            { label: "Recommended /Not Recommended", value: formData.recommended || "", type: "text" },
            { label: "Approved/Not Approved", value: formData.approved || "", type: "text" },
            { label: "D.A /Sr. Supdt (C.E.C.)", value: formData.da_supdt_cec || "", type: "text" },
            { label: "Coordinator, CEC", value: formData.coordinator_cec_1 || "", type: "text" },
            { label: "D.A. /Supdt (SRIC)", value: formData.da_supdt_sric || "", type: "text" },
            { label: "A.R./Dy. Registrar (SRIC)", value: formData.ar_dy_registrar || "", type: "text" },
            { label: "Dean, SRIC", value: formData.dean_sric || "", type: "text" },
            { label: "Total Institute Overhead Charges deducted (P) = Rs.", value: formData.total_overhead_charges?.toString() || "", type: "text" },
            { label: "(i) 50% to IDF [CEC-IDF-001] = Rs.", value: formData.dist_50_idf?.toString() || "", type: "text" },
            { label: "(ii) 45% to CEC [CEC-DDF-001] = Rs.", value: formData.dist_45_cec?.toString() || "", type: "text" },
            { label: "(iii) 5% Electricity [CEC-DDF-001] = Rs.", value: formData.dist_5_electricity?.toString() || "", type: "text" },
            { label: "Coordinator, CEC", value: formData.coordinator_cec_2 || "", type: "text" }
        ],
        tables: [
            {
                label: "",
                data: {
                    columns: [
                        { header: "Name", width: 100 },
                        { header: "Employee code", width: 100 },
                        { header: "Bank A/C No.", width: 120 },
                        { header: "IFSC Code:", width: 100 },
                        { header: "PDF", width: 80 },
                        { header: "Bank A/C", width: 100 }
                    ],
                    rows: tableRows
                }
            }
        ],
        plainTextSections: [
            {
                title: "A. COURSE FUND POSITION",
                content: ""
            },
            {
                title: "B. Details of amount to be distributed",
                content: ""
            },
            {
                title: "",
                content: "(in case of Open Participation course, If coordination fee amount is above Rs. 8 Lacs)"
            },
            {
                title: "",
                content: "Coordination fee 'C' maximum @ 20% of (T-P)\n\nDetails of distribution among Coordinators"
            },
            {
                title: "Mention all the names as per approval even if the amount to be disbursed is NIL.",
                content: ""
            },
            {
                title: "",
                content: "Certified that"
            },
            {
                title: "The soft copy of the following documents are required :",
                content: ""
            },
            {
                title: "",
                content: "(i) Name, email id and address of the sponsoring agency\n(ii) List of experts with email id and address\n(iii) List of the participants with email id and address\n(iv) Time Table\n(v) Group-photo."
            },
            {
                title: "Endorsement by CEC/SRIC Office, I.I.T. Roorkee",
                content: ""
            },
            {
                title: "",
                content: "The above is submitted for approval as recommended by Coordinator, CEC"
            },
            {
                title: "",
                content: "Distribution of total institute share into IDF/CEC DDF Account ,"
            },
            {
                title: "* Coordination Fee",
                content: ""
            },
            {
                title: "(i) Open Participation Course",
                content: "Coordination Fee is subject to a maximum of Rs. 8 Lakh. If faculty member desires whole or part of this amount can be transferred to the PDF (SRIC) of the faculty member(s). 50% of any left-over amount from coordination fee above Rs. 8 Lakhs will be deposited into the PDF (SRIC) of respective faculty (to be distributed as agreed), while the remaining 50% will be deposited into CEC corpus for developmental activities."
            },
            {
                title: "(ii) Sponsored Course",
                content: "Coordination Fee is subject to a maximum of Rs. 8 Lakh. If faculty member desires whole or part of this amount can be transferred to the PDF (SRIC) of the faculty member(s). Any left-over amount from coordination fee above Rs. 8 Lacs will be deposited into the PDF (SRIC) of respective faculty (to be distributed as agreed)"
            }
        ]
    };
};
