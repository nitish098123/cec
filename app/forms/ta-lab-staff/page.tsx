"use client";
import React, { useEffect } from 'react';
import { Form, Input, InputNumber, Row, Col, Typography, Button, Table, DatePicker, Space } from 'antd';
import { PlusOutlined, DeleteOutlined } from '@ant-design/icons';

const { Text, Title } = Typography;

const TALabStaffForm = () => {
    const [form] = Form.useForm();
    const [proformaForm] = Form.useForm();
    
    // Ensure proforma_entries has at least one entry
    useEffect(() => {
        const currentValues = proformaForm.getFieldsValue();
        if (!currentValues.proforma_entries || currentValues.proforma_entries.length === 0) {
            proformaForm.setFieldsValue({
                proforma_entries: [{}]
            });
        }
    }, [proformaForm]);

    return (
        <div className="font-inter">
            {/* Header */}
            <div className="bg-[#8B0000] text-white pt-28 pb-6">
                <div className="container mx-auto px-4 text-center">
                    <h1 className="text-2xl font-bold">CONTINUING EDUCATION CENTRE, INDIAN INSTITUTE OF TECHNOLOGY, ROORKEE</h1>
                    <p className="text-lg">
                        <a href="https://iitr.ac.in/cec" target="_blank" rel="noopener noreferrer" className="hover:underline">HTTPS://IITR.AC.IN/CEC</a>, CONTD@IITR.AC.IN Ph: 4327
                    </p>
                </div>
            </div>

            <div className="container mx-auto p-8">
                <div className="flex justify-end mb-4">
                    <Button type="default" onClick={() => window.open('https://d1bm918zlnq37v.cloudfront.net/CECTemp/CEC_NewForm/8.pdf', '_blank')} className="bg-[#FFAE0E] text-black font-semibold">Download PDF</Button>
                </div>
                 {/* Form 1: Payment Form */}
                <Form 
                    layout="vertical" 
                    name="ta_lab_staff_payment_form" 
                    form={form}
                    initialValues={{
                        ta_entries: [{}, {}, {}, {}]
                    }}
                >
                    <Row justify="end">
                        <Col><Text strong>CEC-07</Text></Col>
                    </Row>
                    <div className="bg-yellow-200 text-yellow-800 p-4 rounded-md my-6 border border-yellow-400">
                        <p><strong>Note:</strong> Please do not delete any item in the form, provide details as applicable, wherever information is not available mention N.A. The form may need to be sent back for corrections, if any item is changed or deleted.</p>
                    </div>
                    <Title level={4} className="text-center">FORM FOR PAYMENT FOR TEACHING ASSISTANT/TECHNICAL ASSISTANT/LAB STAFF</Title>
                    
                    <Form.Item name="course_no" label="Course No. :"><Input /></Form.Item>
                    <Form.Item name="batch_no" label="Batch No. :"><Input /></Form.Item>
                    <Form.Item name="course_name_dates" label="Course Name & Dates:"><Input /></Form.Item>
                    <Form.Item name="coordinator_name" label="Name of the Coordinator:"><Input /></Form.Item>
                    <Form.Item name="ta_details" label="Name and details of Teaching Assistant/Technical Assistant/Lab Staff"><Input.TextArea /></Form.Item>

                    <Form.Item label="Name and details of Teaching Assistant/Technical Assistant/Lab Staff">
                        <Form.List name="ta_entries">
                            {(fields) => {
                                const tableData = fields.map((field, index) => ({ ...field, key: field.key || index }));
                                return (
                                    <Table 
                                        columns={[
                                            { 
                                                title: 'S.No.', 
                                                key: 'sno', 
                                                width: 60, 
                                                render: (_: any, __: any, index: number) => index + 1 
                                            },
                                            { 
                                                title: 'Name', 
                                                dataIndex: 'name', 
                                                key: 'name',
                                                render: (_: any, record: any, index: number) => {
                                                    const field = fields[index];
                                                    if (!field) return null;
                                                    return (
                                                        <Form.Item name={[field.name, 'name']} noStyle>
                                                            <Input />
                                                        </Form.Item>
                                                    );
                                                }
                                            },
                                            { 
                                                title: 'Teaching Assistant/Technical Assistant/Lab Staff *', 
                                                dataIndex: 'role', 
                                                key: 'role',
                                                render: (_: any, record: any, index: number) => {
                                                    const field = fields[index];
                                                    if (!field) return null;
                                                    return (
                                                        <Form.Item name={[field.name, 'role']} noStyle>
                                                            <Input />
                                                        </Form.Item>
                                                    );
                                                }
                                            },
                                            { 
                                                title: 'Date (Duration)', 
                                                dataIndex: 'date', 
                                                key: 'date',
                                                render: (_: any, record: any, index: number) => {
                                                    const field = fields[index];
                                                    if (!field) return null;
                                                    return (
                                                        <Form.Item name={[field.name, 'date']} noStyle>
                                                            <DatePicker.RangePicker style={{ width: '100%' }} />
                                                        </Form.Item>
                                                    );
                                                }
                                            },
                                            { 
                                                title: 'Total Hours', 
                                                dataIndex: 'totalHours', 
                                                key: 'totalHours',
                                                render: (_: any, record: any, index: number) => {
                                                    const field = fields[index];
                                                    if (!field) return null;
                                                    return (
                                                        <Form.Item name={[field.name, 'totalHours']} noStyle>
                                                            <InputNumber style={{ width: '100%' }} />
                                                        </Form.Item>
                                                    );
                                                }
                                            },
                                            { 
                                                title: 'Rate per hour', 
                                                dataIndex: 'ratePerHour', 
                                                key: 'ratePerHour',
                                                render: (_: any, record: any, index: number) => {
                                                    const field = fields[index];
                                                    if (!field) return null;
                                                    return (
                                                        <Form.Item name={[field.name, 'ratePerHour']} noStyle>
                                                            <InputNumber style={{ width: '100%' }} />
                                                        </Form.Item>
                                                    );
                                                }
                                            },
                                            { 
                                                title: 'Amount Claimed', 
                                                dataIndex: 'amountClaimed', 
                                                key: 'amountClaimed',
                                                render: (_: any, record: any, index: number) => {
                                                    const field = fields[index];
                                                    if (!field) return null;
                                                    return (
                                                        <Form.Item name={[field.name, 'amountClaimed']} noStyle>
                                                            <InputNumber style={{ width: '100%' }} />
                                                        </Form.Item>
                                                    );
                                                }
                                            },
                                        ]} 
                                        dataSource={tableData} 
                                        pagination={false} 
                                        bordered 
                                        className="mb-4"
                                        rowKey="key"
                                    />
                                );
                            }}
                        </Form.List>
                    </Form.Item>
                    
                    <Row justify="end" className="mt-8">
                        <Col><p className="font-bold">Signature of the Course Coordinator</p></Col>
                    </Row>
                    
                    <div className="mt-4">
                        <Text strong>*</Text> The course coordinator and instructors may engage Institute Students (who may or may not be getting fellowship/assistantship) A maximum payment of Rs 5000 per hour, with total number of hours for which the payment can be made equal to number of the lecture hours in a course. Course Coordinator can also engage TA for the maximum of 20% of total number of the lecture hours in a course.
                    </div>
                </Form>
                
                <hr className="my-16" />

                {/* Form 2: Bill Proforma */}
                <Form layout="vertical" name="ta_lab_staff_bill_proforma" form={proformaForm} initialValues={{
                    proforma_entries: [{}]
                }}>
                    <Title level={3} className="text-center">BILL PROFORMA (TA/Lab Staff)</Title>
                     <Row gutter={16}>
                        <Col span={12}>
                            <Form.Item name="proforma_name" label="Name :"><Input /></Form.Item>
                            <Form.Item name="proforma_course_name" label="Course Name :"><Input /></Form.Item>
                            <Form.Item name="proforma_course_code" label="Course Code :"><Input /></Form.Item>
                            <Form.Item name="proforma_department" label="Department :"><Input /></Form.Item>
                        </Col>
                        <Col span={12}>
                            <div className="h-full flex flex-col justify-around">
                                <Form.Item name="completion_of_work" label="1. Completion of work assigned to him/her">
                                    <Input />
                                </Form.Item>
                                <p>2. Verified and passed for payment.</p>
                                <p>3. Certified the payment is actually due and being made for the first time.</p>
                                <p>4. It is also confirm that the claimant has not been on un authorized absence during the period of above claims.</p>
                            </div>
                        </Col>
                    </Row>
                    
                    <Form.Item label="Particular of assignment for Teaching Assistant/Technical Assistant/Lab Staff">
                        <Form.List name="proforma_entries">
                            {(fields, { add, remove }) => {
                                const tableData = fields.map((field, index) => ({ ...field, key: field.key || index }));
                                return (
                                    <>
                                        <Table 
                                            columns={[
                                                { 
                                                    title: 'Particular of assignment for Teaching Assistant/Technical Assistant/Lab Staff', 
                                                    dataIndex: 'particulars', 
                                                    key: 'particulars',
                                                    render: (_: any, record: any, index: number) => {
                                                        const field = fields[index];
                                                        if (!field) return null;
                                                        return (
                                                            <Form.Item name={[field.name, 'particulars']} noStyle>
                                                                <Input.TextArea rows={2} />
                                                            </Form.Item>
                                                        );
                                                    }
                                                },
                                                { 
                                                    title: 'Date (Duration)', 
                                                    dataIndex: 'date', 
                                                    key: 'date',
                                                    render: (_: any, record: any, index: number) => {
                                                        const field = fields[index];
                                                        if (!field) return null;
                                                        return (
                                                            <Form.Item name={[field.name, 'date']} noStyle>
                                                                <DatePicker.RangePicker style={{ width: '100%' }} />
                                                            </Form.Item>
                                                        );
                                                    }
                                                },
                                                { 
                                                    title: 'Total Hours', 
                                                    dataIndex: 'totalHours', 
                                                    key: 'totalHours',
                                                    render: (_: any, record: any, index: number) => {
                                                        const field = fields[index];
                                                        if (!field) return null;
                                                        return (
                                                            <Form.Item name={[field.name, 'totalHours']} noStyle>
                                                                <InputNumber style={{ width: '100%' }} />
                                                            </Form.Item>
                                                        );
                                                    }
                                                },
                                                { 
                                                    title: 'Rate per hour', 
                                                    dataIndex: 'ratePerHour', 
                                                    key: 'ratePerHour',
                                                    render: (_: any, record: any, index: number) => {
                                                        const field = fields[index];
                                                        if (!field) return null;
                                                        return (
                                                            <Form.Item name={[field.name, 'ratePerHour']} noStyle>
                                                                <InputNumber style={{ width: '100%' }} />
                                                            </Form.Item>
                                                        );
                                                    }
                                                },
                                                { 
                                                    title: 'Amount Claimed', 
                                                    dataIndex: 'amountClaimed', 
                                                    key: 'amountClaimed',
                                                    render: (_: any, record: any, index: number) => {
                                                        const field = fields[index];
                                                        if (!field) return null;
                                                        return (
                                                            <Form.Item name={[field.name, 'amountClaimed']} noStyle>
                                                                <InputNumber style={{ width: '100%' }} />
                                                            </Form.Item>
                                                        );
                                                    }
                                                },
                                                {
                                                    title: 'Action',
                                                    key: 'action',
                                                    width: 80,
                                                    render: (_: any, record: any, index: number) => (
                                                        fields.length > 1 ? (
                                                            <Button 
                                                                type="link" 
                                                                danger 
                                                                icon={<DeleteOutlined />} 
                                                                onClick={() => remove(index)}
                                                            >
                                                                Remove
                                                            </Button>
                                                        ) : null
                                                    )
                                                },
                                            ]} 
                                            dataSource={tableData} 
                                            pagination={false} 
                                            bordered 
                                            className="mb-4"
                                            rowKey="key"
                                        />
                                        <Form.Item>
                                            <Button 
                                                type="dashed" 
                                                onClick={() => add()} 
                                                block 
                                                icon={<PlusOutlined />}
                                            >
                                                Add Row
                                            </Button>
                                        </Form.Item>
                                    </>
                                );
                            }}
                        </Form.List>
                    </Form.Item>
                    
                    <Row justify="end"><Col><Form.Item name="total_rs" label="Total Rs."><Input /></Form.Item></Col></Row>
                    
                    <Form.Item label="(Rupees .................................................................................... only)" />

                    <Form.Item name="bank_ac_no" label="Bank A/c No.:"><Input /></Form.Item>
                    <Form.Item name="bank_branch" label="Bank and Branch:"><Input /></Form.Item>
                    <Form.Item name="ifsc_code" label="IFSC Code:"><Input /></Form.Item>
                    <Form.Item name="email_id" label="Email ID:"><Input /></Form.Item>
                    <Form.Item name="enroll_no" label="Enroll No.:"><Input /></Form.Item>
                    <Form.Item name="contact_no" label="Contact No. :"><Input /></Form.Item>

                    <Form.Item label="Signature of the claimant (with date)" />
                    
                     <div className="mt-4">
                        <Text strong>*</Text> The course coordinator and instructors may engage Institute Students (who may or may not be getting fellowship/assistantship) A maximum payment of Rs 5000 per hour, with total number of hours for which the payment can be made equal to number of the lecture hours in a course. Course Coordinator can also engage TA for the maximum of 20% of total number of the lecture hours in a course.
                    </div>
                </Form>
                 <div className="mt-8 text-center">
                    <Button type="primary" className='bg-blue-600' onClick={async () => {
                        try {
                            // Get all values from the form (including nested Form.List data)
                            const paymentFormValues = form.getFieldsValue(true); // true = get all nested fields
                            let proformaFormValues: any = {};
                            try {
                                proformaFormValues = proformaForm.getFieldsValue(true);
                            } catch (e) {
                                // Proforma form might not be filled, that's okay
                                console.log('Proforma form error:', e);
                            }
                            
                            // Also try to validate to ensure required fields are filled
                            try {
                                await form.validateFields();
                            } catch (validationError) {
                                console.log('Validation errors (some fields may be optional):', validationError);
                            }
                            
                            // Combine both form values
                            const allValues = {
                                ...paymentFormValues,
                                proforma_name: proformaFormValues.proforma_name || "",
                                proforma_course_name: proformaFormValues.proforma_course_name || "",
                                proforma_course_code: proformaFormValues.proforma_course_code || "",
                                proforma_course_coordinator: proformaFormValues.proforma_course_coordinator || "",
                                proforma_department: proformaFormValues.proforma_department || "",
                                proforma_entries: proformaFormValues.proforma_entries || [],
                                total_rs: proformaFormValues.total_rs || "",
                                bank_ac_no: proformaFormValues.bank_ac_no || "",
                                bank_branch: proformaFormValues.bank_branch || "",
                                ifsc_code: proformaFormValues.ifsc_code || "",
                                email_id: proformaFormValues.email_id || "",
                                enroll_no: proformaFormValues.enroll_no || "",
                                contact_no: proformaFormValues.contact_no || "",
                                completion_of_work: proformaFormValues.completion_of_work || "",
                            };
                            
                            console.log('Combined form values:', allValues);
                            console.log('TA Entries from form:', allValues.ta_entries);
                            console.log('Full form state:', form.getFieldsValue(true));
                            console.log('Form instance:', form);
                            
                            // Import the configuration mapping function
                            const { mapTALabStaffDataToConfig } = await import('../../api/generate-pdf/ta-lab-staff-config');
                            
                            // Create the form configuration
                            const formConfig = mapTALabStaffDataToConfig(allValues);
                            
                            const res = await fetch('/api/generate-pdf', {
                                method: 'POST',
                                headers: { 'Content-Type': 'application/json' },
                                body: JSON.stringify({
                                    formData: allValues,
                                    formConfig: formConfig
                                }),
                            });
                            if (!res.ok) throw new Error('Failed to generate PDF');
                            
                            const blob = await res.blob();
                            const url = window.URL.createObjectURL(blob);
                            const a = document.createElement('a');
                            a.href = url;
                            a.download = 'ta-lab-staff-form.pdf';
                            document.body.appendChild(a);
                            a.click();
                            window.URL.revokeObjectURL(url);
                            document.body.removeChild(a);
                        } catch (error) {
                            console.error('Error:', error);
                        }
                    }}>Submit & Download Application</Button>
                </div>
            </div>
        </div>
    );
};

export default TALabStaffForm; 