import { FormConfig } from './route';

export const remunerationHonorariumConfig: FormConfig = {
    title: "Remuneration/Honorarium Form for Open Participation/Sponsored Course",
    subtitle: "(To be filled after the course is over)*",
    fields: [
        { label: "PAN No. :", value: "", type: "text" },
        { label: "Employee No. :", value: "", type: "text" },
        { label: "1. Course Name :", value: "", type: "text" },
        { label: "2. Batch No. :", value: "", type: "text" },
        { label: "3. Course Code :", value: "", type: "text" },
        { label: "(a) Amount to be transferred in A/C", value: "", type: "text" },
        { label: "(b) Amount to be transferred in PDF", value: "", type: "text" },
        { label: "(c) Bank A/c No.:", value: "", type: "text" },
        { label: "• Bank and Branch:", value: "", type: "text" },
        { label: "• IFSC Code:", value: "", type: "text" },
        { label: "(d) Amount to be transferred in CEC-DDF-001/DDF Account", value: "", type: "text" },
        { label: "(amount to be transferred if per hour rate is more than Rs. 18,000/- as mentioned at**)", value: "", type: "text" },
        { label: "BILL VERIFIED", value: "", type: "text" },
        { label: "Signature of Course Coordinator", value: "", type: "text" },
        { label: "Signature", value: "", type: "text" },
        { label: "Passed for Payment for Rs. :", value: "", type: "text" },
        { label: "Rupees :", value: "", type: "text" },
        { label: "Please debit to Course A/C No. :", value: "", type: "text" },
        { label: "Ledger Code No. :", value: "", type: "text" },
        { label: "Date", value: "", type: "text" },
        { label: "Asstt/Supdt.", value: "", type: "text" },
        { label: "Coordinator, CEC", value: "", type: "text" },
    ],
    tables: [
        // Expert details table - single row with 3 columns
        {
            label: "",
            data: {
                columns: [
                    { header: "4", width: 60 },
                    { header: "Name and Address of Expert\n(In capital letter)\nMobile No.\nEmail :", width: 220 },
                    { header: "", width: 280 },
                ],
                rows: [
                    ["", "", ""],
                ]
            }
        },
        // Details table for Lectures/PDF
        {
            label: "",
            data: {
                columns: [
                    { header: "", width: 60 },
                    { header: "Details", width: 180 },
                    { header: "Hours", width: 80 },
                    { header: "Date", width: 100 },
                    { header: "Amount per hour\n(Rs.)", width: 100 },
                    { header: "Total Amount\n(Rs.)", width: 100 },
                ],
                rows: [
                    ["(i)", "Lectures (L)/Interactions/*", "", "", "", ""],
                    ["(ii)", "PDF Amount (if applicable)", "", "", "", ""],
                ]
            }
        },
        // For Office Use table
        {
            label: "For Office Use:",
            data: {
                columns: [
                    { header: "Pay", width: 80 },
                    { header: "", width: 50 },
                    { header: "", width: 400 },
                ],
                rows: [
                    ["", "(i)", "Rs. ___________ to Sri ___________"],
                    ["", "(ii)", "Rs. ___________ To Tax collected by A/C IITR"],
                    ["", "", "Chargeable Head/Course"],
                ]
            }
        },
    ],
    plainTextSections: [
        {
            content: "(Note: For the amounts in (i) to (ii) whole or part can be transferred to PDF)"
        },
        {
            content: "Paid by Cheque no ___________ Dated ___________ section in charge"
        },
        {
            title: "Note:",
            content: "* (The honorarium to internal faculty will be distributed after completion of the course having live interactions. Before distribution of honorarium, please ensure that course feedback, schedule, list of participates with fee detail and all the payment instalments have been resolved as per the MoU/agreement terms.)\n\n** Total honorarium is subject to a maximum limit of Rs 18,000/- per Hr. 50% of any left-over amount from Instructor payment (i.e., any amount above Rs 18,000 x no. of Instructor hrs) will be deposited into the PDF (SRIC) of the respective faculty (to be distributed in proportion to number of lectures/interactions), while the remaining 50% will be deposited into CEC corpus for developmental activities."
        }
    ]
};

export const mapRemunerationHonorariumDataToConfig = (formData: any): FormConfig => {
    const config = JSON.parse(JSON.stringify(remunerationHonorariumConfig)); // Deep copy
    
    // Helper function to format date from ISO string or dayjs object to DD/MM/YYYY
    const formatDate = (dateValue: any): string => {
        if (!dateValue) return "";
        let date: Date;
        if (typeof dateValue === 'string') {
            date = new Date(dateValue);
        } else if (dateValue && typeof dateValue === 'object' && dateValue.$d) {
            date = new Date(dateValue.$d);
        } else if (dateValue instanceof Date) {
            date = dateValue;
        } else {
            date = new Date(dateValue);
        }
        if (isNaN(date.getTime())) return "";
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = date.getFullYear();
        return `${day}/${month}/${year}`;
    };
    
    // Map basic fields
    config.fields[0].value = formData.pan_no || "";
    config.fields[1].value = formData.employee_no || "";
    config.fields[2].value = formData.course_name || "";
    config.fields[3].value = formData.batch_no || "";
    config.fields[4].value = formData.course_code || "";
    config.fields[5].value = formData.amount_to_ac || "";
    config.fields[6].value = formData.amount_to_pdf || "";
    config.fields[7].value = formData.bank_account_no || "";
    config.fields[8].value = formData.bank_and_branch || "";
    config.fields[9].value = formData.ifsc_code || "";
    config.fields[10].value = formData.amount_to_cec_ddf?.toString() || "";
    config.fields[11].value = ""; // Note about 18,000
    config.fields[12].value = ""; // BILL VERIFIED (heading, no value)
    config.fields[13].value = formData.signature_of_course_coordinator || "";
    config.fields[14].value = formData.signature || "";
    config.fields[15].value = formData.passed_for_payment || "";
    config.fields[16].value = formData.rupees_in_words || "";
    config.fields[17].value = formData.course_account_no || "";
    config.fields[18].value = formData.ledger_code_no || "";
    config.fields[19].value = formData.payment_date || "";
    config.fields[20].value = formData.asstt_supdt || "";
    config.fields[21].value = formData.coordinator_cec || "";
    
    // Map expert details to the first table (row 0, column 2 - third column)
    if (config.tables && config.tables.length > 0) {
        const expertTable = config.tables[0];
        if (expertTable && expertTable.data && expertTable.data.rows.length > 0) {
            // User data goes in the third column (index 2)
            expertTable.data.rows[0][2] = formData.expert_details || "";
        }
    }
    
    // Map table data for lectures/interactions (second table)
    if (config.tables && config.tables.length > 1) {
        const detailsTable = config.tables[1];
        if (detailsTable && detailsTable.data && detailsTable.data.rows.length > 0) {
            detailsTable.data.rows[0] = [
                "(i)",
                "Lectures (L)/Interactions/*",
                formData.lectures_hours?.toString() || "",
                formatDate(formData.lectures_date),
                formData.lectures_amount_per_hour?.toString() || "",
                formData.lectures_total_amount?.toString() || "",
            ];
            
            // Always include PDF row (second row)
            if (detailsTable.data.rows.length < 2) {
                detailsTable.data.rows.push([
                    "(ii)",
                    "PDF Amount (if applicable)",
                    "",
                    "",
                    "",
                    "",
                ]);
            }
            // Update PDF row with form data if available
            if (detailsTable.data.rows.length >= 2) {
                detailsTable.data.rows[1] = [
                    "(ii)",
                    "PDF Amount (if applicable)",
                    formData.pdf_hours?.toString() || "",
                    formatDate(formData.pdf_date),
                    formData.pdf_amount_per_hour?.toString() || "",
                    formData.pdf_total_amount?.toString() || "",
                ];
            }
        }
    }
    
    // Map "For Office Use" table (3rd table, index 2)
    if (config.tables && config.tables.length > 2) {
        const officeUseTable = config.tables[2];
        if (officeUseTable && officeUseTable.data && officeUseTable.data.rows.length > 0) {
            officeUseTable.data.rows[0] = [
                "",
                "(i)",
                `Rs. ${formData.pay_i || "___________"} to Sri ${formData.to_sri || "___________"}`
            ];
            officeUseTable.data.rows[1] = [
                "",
                "(ii)",
                `Rs. ${formData.pay_ii || "___________"} To Tax collected by A/C IITR`
            ];
            officeUseTable.data.rows[2] = [
                "",
                "",
                formData.chargeable_head || "Chargeable Head/Course"
            ];
        }
    }
    
    // Map plain text sections
    if (config.plainTextSections && config.plainTextSections.length > 1) {
        const chequeDateFormatted = formData.cheque_date ? formatDate(formData.cheque_date) : "___________";
        config.plainTextSections[1].content = `Paid by Cheque no ${formData.cheque_no || "___________"} Dated ${chequeDateFormatted} section in charge`;
    }
    
    return config;
};
