import { FormConfig } from './route';

export const taLabStaffConfig: FormConfig = {
    title: "FORM FOR PAYMENT FOR TEACHING ASSISTANT/TECHNICAL ASSISTANT/LAB STAFF",
    subtitle: undefined,
    fields: [
        { label: "Course No. :", value: "", type: "text" },
        { label: "Batch No. :", value: "", type: "text" },
        { label: "Course Name & Dates:", value: "", type: "text" },
        { label: "Name of the Coordinator:", value: "", type: "text" },
        { label: "Signature of the Course Coordinator", value: "", type: "text" },
        // BILL PROFORMA fields
        { label: "Name :", value: "", type: "text" },
        { label: "Course Name :", value: "", type: "text" },
        { label: "Course Code :", value: "", type: "text" },
        { label: "Course Coordinator :", value: "", type: "text" },
        { label: "Department :", value: "", type: "text" },
        { label: "Total Rs.", value: "", type: "text" },
        { label: "Bank A/c No.:", value: "", type: "text" },
        { label: "Bank and Branch:", value: "", type: "text" },
        { label: "IFSC Code:", value: "", type: "text" },
        { label: "Email ID:", value: "", type: "text" },
        { label: "Enroll No.:", value: "", type: "text" },
        { label: "Contact No. :", value: "", type: "text" },
        { label: "Signature of the claimant (with date)", value: "", type: "text" },
        // Certification section fields
        { label: "1. Completion of work assigned to him/her", value: "", type: "text" },
        { label: "Course Coordinator", value: "", type: "text" },
        { label: "Coordinator, CEC", value: "", type: "text" },
    ],
    tables: [
        // TA/Lab Staff details table
        {
            label: "Name and details of Teaching Assistant/Technical Assistant/Lab Staff",
            data: {
                columns: [
                    { header: "S.No", width: 60 },
                    { header: "Name", width: 140 },
                    { header: "Teaching Assistant/Technical Assistant/Lab Staff *", width: 180 },
                    { header: "Date (Duration)", width: 120 },
                    { header: "Total Hours", width: 100 },
                    { header: "Rate per hour", width: 110 },
                    { header: "Amount Claimed", width: 120 },
                ],
                rows: [
                    ["", "", "", "", "", "", ""],
                ]
            }
        },
        // BILL PROFORMA table
        {
            label: "Particular of assignment for Teaching Assistant/Technical Assistant/Lab Staff",
            data: {
                columns: [
                    { header: "Particular of assignment for Teaching Assistant/Technical Assistant/Lab Staff", width: 200 },
                    { header: "Date (Duration)", width: 120 },
                    { header: "Total Hours", width: 100 },
                    { header: "Rate per hour", width: 110 },
                    { header: "Amount Claimed", width: 120 },
                ],
                rows: [
                    ["", "", "", "", ""],
                ]
            }
        },
    ],
    plainTextSections: [
        {
            content: "* The course coordinator and instructors may engage Institute Students (who may or may not be getting fellowship/assistantship) A maximum payment of Rs 5000 per hour, with total number of hours for which the payment can be made equal to number of the lecture hours in a course. Course Coordinator can also engage TA for the maximum of 20% of total number of the lecture hours in a course."
        },
        {
            title: "BILL PROFORMA (TA/Lab Staff)",
            content: ""
        },
        {
            content: "* The course coordinator and instructors may engage Institute Students (who may or may not be getting fellowship/assistantship) A maximum payment of Rs 5000 per hour, with total number of hours for which the payment can be made equal to number of the lecture hours in a course. Course Coordinator can also engage TA for the maximum of 20% of total number of the lecture hours in a course."
        }
    ],
    multilineFields: []
};

export const mapTALabStaffDataToConfig = (formData: any): FormConfig => {
    const config = JSON.parse(JSON.stringify(taLabStaffConfig)); // Deep copy
    
    console.log('TA Lab Staff Form Data:', JSON.stringify(formData, null, 2));
    
    // Map basic fields (first form)
    config.fields[0].value = formData.course_no || "";
    config.fields[1].value = formData.batch_no || "";
    config.fields[2].value = formData.course_name_dates || "";
    config.fields[3].value = formData.coordinator_name || "";
    
    // Map BILL PROFORMA fields
    config.fields[5].value = formData.proforma_name || "";
    config.fields[6].value = formData.proforma_course_name || "";
    config.fields[7].value = formData.proforma_course_code || "";
    config.fields[8].value = formData.proforma_course_coordinator || "";
    config.fields[9].value = formData.proforma_department || "";
    config.fields[10].value = formData.total_rs || "";
    config.fields[11].value = formData.bank_ac_no || "";
    config.fields[12].value = formData.bank_branch || "";
    config.fields[13].value = formData.ifsc_code || "";
    config.fields[14].value = formData.email_id || "";
    config.fields[15].value = formData.enroll_no || "";
    config.fields[16].value = formData.contact_no || "";
    // Map certification section fields
    config.fields[18].value = formData.completion_of_work || "";
    config.fields[19].value = formData.course_coordinator_signature || "";
    config.fields[20].value = formData.coordinator_cec_signature || "";
    
    // Map first table (TA/Lab Staff details)
    if (config.tables && config.tables.length > 0) {
        const taTable = config.tables[0];
        if (taTable && taTable.data) {
            let taEntries: any[] = [];
            
            // Try to get TA entries from formData
            if (formData.ta_entries && Array.isArray(formData.ta_entries)) {
                taEntries = formData.ta_entries.filter((entry: any) => entry && Object.keys(entry).length > 0);
            }
            
            // If still no entries, add at least one empty row
            if (taEntries.length === 0) {
                taEntries.push({
                    sno: "",
                    name: "",
                    role: "",
                    date: "",
                    total_hours: "",
                    rate_per_hour: "",
                    amount_claimed: "",
                });
            }
            
            console.log('TA Entries mapped:', taEntries);
            
            // Map entries to table rows
            taTable.data.rows = taEntries.map((entry: any, index: number) => {
                // Handle date if it's an array (from DatePicker.RangePicker)
                // Format as DD/MM/YYYY for more compact display
                let dateStr = "";
                if (entry.date) {
                    if (Array.isArray(entry.date)) {
                        dateStr = entry.date.map((d: any) => {
                            if (d?.format) {
                                const date = d.format('YYYY-MM-DD');
                                const [year, month, day] = date.split('-');
                                return `${day}/${month}/${year}`;
                            }
                            return d;
                        }).join(' - ');
                    } else if (entry.date.format) {
                        const date = entry.date.format('YYYY-MM-DD');
                        const [year, month, day] = date.split('-');
                        dateStr = `${day}/${month}/${year}`;
                    } else {
                        dateStr = entry.date.toString();
                    }
                }
                
                return [
                    entry.sno?.toString() || (index + 1).toString(),
                    entry.name || "",
                    entry.role || "",
                    dateStr,
                    entry.total_hours?.toString() || entry.totalHours?.toString() || "",
                    entry.rate_per_hour?.toString() || entry.ratePerHour?.toString() || "",
                    entry.amount_claimed?.toString() || entry.amountClaimed?.toString() || "",
                ];
            });
            
            console.log('Table rows:', taTable.data.rows);
        }
        
        // Map second table (BILL PROFORMA table)
        if (config.tables.length > 1) {
            const proformaTable = config.tables[1];
            if (proformaTable && proformaTable.data) {
                let proformaEntries: any[] = [];
                
                // Get proforma entries from formData
                if (formData.proforma_entries && Array.isArray(formData.proforma_entries)) {
                    proformaEntries = formData.proforma_entries.filter((entry: any) => entry && Object.keys(entry).length > 0);
                }
                
                // If still no entries, add at least one empty row
                if (proformaEntries.length === 0) {
                    proformaEntries.push({
                        particulars: "",
                        date: "",
                        totalHours: "",
                        ratePerHour: "",
                        amountClaimed: "",
                    });
                }
                
                console.log('Proforma Entries mapped:', proformaEntries);
                
                // Map entries to table rows
                proformaTable.data.rows = proformaEntries.map((entry: any, index: number) => {
                    // Handle date if it's an array (from DatePicker.RangePicker)
                    // Format as DD/MM/YYYY for more compact display
                    let dateStr = "";
                    if (entry.date) {
                        if (Array.isArray(entry.date)) {
                            dateStr = entry.date.map((d: any) => {
                                if (d?.format) {
                                    const date = d.format('YYYY-MM-DD');
                                    const [year, month, day] = date.split('-');
                                    return `${day}/${month}/${year}`;
                                }
                                return d;
                            }).join(' - ');
                        } else if (entry.date.format) {
                            const date = entry.date.format('YYYY-MM-DD');
                            const [year, month, day] = date.split('-');
                            dateStr = `${day}/${month}/${year}`;
                        } else {
                            dateStr = entry.date.toString();
                        }
                    }
                    
                    return [
                        entry.particulars || "",
                        dateStr,
                        entry.totalHours?.toString() || "",
                        entry.ratePerHour?.toString() || "",
                        entry.amountClaimed?.toString() || "",
                    ];
                });
                
                console.log('Proforma table rows:', proformaTable.data.rows);
            }
        }
    }
    
    return config;
};
