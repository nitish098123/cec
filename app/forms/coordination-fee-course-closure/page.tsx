"use client";
import React from 'react';
import { Form, Input, Row, Col, Typography, Button, DatePicker, Table, Radio, Checkbox, Space } from 'antd';

const { Text, Title } = Typography;

const CourseClosureForm = () => {
    const [form] = Form.useForm();

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
                    <Button type="default" onClick={() => window.open('https://d1bm918zlnq37v.cloudfront.net/CECTemp/CEC_NewForm/10.pdf', '_blank')} className="bg-[#FFAE0E] text-black font-semibold">Download PDF</Button>
                </div>
                <Form layout="vertical" name="course_closure_form" form={form}>
                    <Row justify="end">
                        <Col><Text strong>CEC-09</Text></Col>
                    </Row>
                    <div className="bg-yellow-200 text-yellow-800 p-4 rounded-md my-6 border border-yellow-400">
                        <p><strong>Note:</strong> Please do not delete any item in the form, provide details as applicable, wherever information is not available mention N.A. The form may need to be sent back for corrections, if any item is changed or deleted.</p>
                    </div>

                    <Title level={4} className="text-center">COORDINATION FEE AND COURSE CLOSURE FORM</Title>
                    <Title level={5} className="text-center">FOR OPEN PARTICIPATION/SPONSORED COURSE FUND</Title>

                    <Row gutter={16} align="bottom">
                        <Col span={16}>
                            <Form.Item name="course_code" label="Course-Code."><Input /></Form.Item>
                        </Col>
                        <Col span={8}>
                            <Form.Item name="distribution" label="Distribution: Final/Interim"><Input /></Form.Item>
                        </Col>
                    </Row>
                    <Form.Item name="title_of_course" label="Title of Course"><Input /></Form.Item>
                     <Row gutter={16}>
                        <Col span={12}>
                            <Form.Item name="coordinator_name" label="Course Coordinator's/PI's Name"><Input /></Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item name="designation" label="Designation"><Input /></Form.Item>
                        </Col>
                    </Row>
                    <Form.Item name="department" label="Department /Centre"><Input /></Form.Item>

                    <div className="my-8">
                        <Title level={5}>A. COURSE FUND POSITION</Title>
                        <Row gutter={16}>
                            <Col span={12}><Form.Item name="gross_amount" label="a. Gross amount including GST G"><Input addonAfter="Rs." /></Form.Item></Col>
                            <Col span={12}><Form.Item name="less_gst" label="b. Less GST as applicable L (presently @18%) (G/1.18*18%)"><Input addonAfter="Rs." /></Form.Item></Col>
                            <Col span={12}><Form.Item name="total_contracted" label="c. Total Contracted amount T (=G-L)"><Input addonAfter="Rs." /></Form.Item></Col>
                            <Col span={12}><Form.Item name="overhead_charges" label="d. Amount payable to Institute Overhead Charges P (@20%of T)"><Input addonAfter="Rs." /></Form.Item></Col>
                            <Col span={12}><Form.Item name="cec_operational_cost" label="e. CEC operational/establishment cost O(@10%of T-P)"><Input addonAfter="Rs." /></Form.Item></Col>
                            <Col span={12}><Form.Item name="tds_deduction" label="f. TDS Deduction (if any) TD"><Input addonAfter="Rs." /></Form.Item></Col>
                            <Col span={12}><Form.Item name="honorarium" label="g. Honorarium to Instructor/s/Experts H"><Input addonAfter="Rs." /></Form.Item></Col>
                            <Col span={12}><Form.Item name="expenditure_done" label="h. Expenditure already done E"><Input addonAfter="Rs." /></Form.Item></Col>
                            <Col span={12}><Form.Item name="balance_amount" label="i. Balance amount available (T-P-O-TD-H-E)"><Input addonAfter="Rs." /></Form.Item></Col>
                        </Row>
                    </div>

                    <div className="my-8">
                        <Title level={5}>B. Details of amount to be distributed</Title>
                        <Form.Item name="cec_ddf_component" label="i. CEC DDF component CEC-DDF-001 (in case of Open Participation course, if coordination fee amount is above Rs. 8 Lacs)"><Input addonAfter="Rs." /></Form.Item>
                        <Form.Item name="coordination_fee" label="ii. Coordination fee C max@20% of 20% of (T-P)* (Note: whole or part can be transferred to PDF)"><Input addonAfter="Rs." /></Form.Item>
                        <p>Details of distribution among Coordinators</p>
                        <p>Mention all the names as per approval even if the amount to be disbursed is NIL.</p>
                        <Form.List name="distribution_details" initialValue={[{}]}>
                            {(fields, { add, remove }) => (
                                <>
                                    <Table 
                                        dataSource={fields.map((field, index) => ({ key: field.key, fieldName: field.name, index }))}
                                        pagination={false}
                                        bordered
                                        className="mb-4"
                                        columns={[
                                            { title: 'Name', dataIndex: 'name', key: 'name', render: (_: any, record: any) => (
                                                <Form.Item name={[record.fieldName, 'name']} noStyle>
                                                    <Input />
                                                </Form.Item>
                                            )},
                                            { title: 'Employee code', dataIndex: 'employee_code', key: 'employee_code', render: (_: any, record: any) => (
                                                <Form.Item name={[record.fieldName, 'employee_code']} noStyle>
                                                    <Input />
                                                </Form.Item>
                                            )},
                                            { title: 'Bank A/C No.', dataIndex: 'bank_ac_no', key: 'bank_ac_no', render: (_: any, record: any) => (
                                                <Form.Item name={[record.fieldName, 'bank_ac_no']} noStyle>
                                                    <Input />
                                                </Form.Item>
                                            )},
                                            { title: 'IFSC Code:', dataIndex: 'ifsc_code', key: 'ifsc_code', render: (_: any, record: any) => (
                                                <Form.Item name={[record.fieldName, 'ifsc_code']} noStyle>
                                                    <Input />
                                                </Form.Item>
                                            )},
                                            { title: 'PDF', dataIndex: 'pdf', key: 'pdf', render: (_: any, record: any) => (
                                                <Form.Item name={[record.fieldName, 'pdf']} noStyle>
                                                    <Input />
                                                </Form.Item>
                                            )},
                                            { title: 'Amount ₹ \n Bank A/C', dataIndex: 'amount', key: 'amount', render: (_: any, record: any) => (
                                                <Form.Item name={[record.fieldName, 'amount']} noStyle>
                                                    <Input />
                                                </Form.Item>
                                            )},
                                            { title: 'Action', key: 'action', render: (_: any, record: any) => (
                                                <Button type="link" danger onClick={() => remove(record.fieldName)}>Remove</Button>
                                            )}
                                        ]}
                                    />
                                    <Button type="dashed" onClick={() => add()} block className="mb-4">Add Row</Button>
                                </>
                            )}
                        </Form.List>
                        <Form.Item name="remaining_amount" label="Remaining amount (if any) to DDF of CEC [CEC-DDF-001] ="><Input addonAfter="Rs." /></Form.Item>
                    </div>

                    <Form.Item className="mt-8 text-center">
                        <Button type="primary" htmlType="submit" className='bg-blue-600' onClick={async () => {
                            try {
                                const values = await form.getFieldsValue(true);
                                console.log('Form values:', values);
                                console.log('Distribution details:', values.distribution_details);
                                
                                // Import the configuration mapping function
                                const { mapCoordinationFeeCourseClosureDataToConfig } = await import('../../api/generate-pdf/coordination-fee-course-closure-config');
                                
                                // Create the form configuration
                                const formConfig = mapCoordinationFeeCourseClosureDataToConfig(values);
                                console.log('Mapped form config:', formConfig);
                                
                                const res = await fetch('/api/generate-pdf', {
                                    method: 'POST',
                                    headers: { 'Content-Type': 'application/json' },
                                    body: JSON.stringify({
                                        formData: values,
                                        formConfig: formConfig
                                    }),
                                });
                                if (!res.ok) throw new Error('Failed to generate PDF');
                                
                                const blob = await res.blob();
                                const url = window.URL.createObjectURL(blob);
                                const a = document.createElement('a');
                                a.href = url;
                                a.download = 'coordination-fee-course-closure-form.pdf';
                                document.body.appendChild(a);
                                a.click();
                                window.URL.revokeObjectURL(url);
                                document.body.removeChild(a);
                            } catch (error) {
                                console.error('Error:', error);
                            }
                        }}>Submit & Download Application</Button>
                    </Form.Item>
                </Form>
            </div>
        </div>
    );
};

export default CourseClosureForm; 