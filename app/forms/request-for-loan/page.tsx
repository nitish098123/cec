"use client";
import React from 'react';
import { Form, Input, Row, Col, Typography, Button, DatePicker, Table, Space } from 'antd';

const { Text, Title } = Typography;

const RequestForLoanForm = () => {
    const [form] = Form.useForm();
    const outstandingLoanColumns = [
        { title: 'S. No.', dataIndex: 'sno', key: 'sno', render: (text: any, record: any, index: number) => index + 1 },
        { title: 'Amount', dataIndex: 'amount', key: 'amount', render: () => <Input /> },
        { title: 'Date', dataIndex: 'date', key: 'date', render: () => <DatePicker style={{ width: '100%' }} /> },
        { title: 'Course code', dataIndex: 'course_code', key: 'course_code', render: () => <Input /> },
    ];

    const outstandingLoanData = [ {key: '1'} ];

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
                    <Button type="default" onClick={() => window.open('https://d1bm918zlnq37v.cloudfront.net/CECTemp/CEC_NewForm/9.pdf', '_blank')} className="bg-[#FFAE0E] text-black font-semibold">Download PDF</Button>
                </div>
                <Form layout="vertical" name="request_for_loan_form">
                    <Row justify="end">
                        <Col><Text strong>CEC-08</Text></Col>
                    </Row>
                    <div className="bg-yellow-200 text-yellow-800 p-4 rounded-md my-6 border border-yellow-400">
                        <p><strong>Note:</strong> Please do not delete any item in the form, provide details as applicable, wherever information is not available mention N.A. The form may need to be sent back for corrections, if any item is changed or deleted.</p>
                    </div>

                    <div className="flex items-center mb-4">
                        <div className="border border-black p-1 flex">
                            <Input maxLength={1} style={{ width: 40, textAlign: 'center', border: 'none', borderRight: '1px solid black' }} />
                            <Input maxLength={1} style={{ width: 40, textAlign: 'center', border: 'none', borderRight: '1px solid black' }} />
                            <Input maxLength={1} style={{ width: 40, textAlign: 'center', border: 'none', borderRight: '1px solid black' }} />
                            <Input maxLength={1} style={{ width: 40, textAlign: 'center', border: 'none' }} />
                        </div>
                        <Text className="ml-4">Employee No.</Text>
                    </div>

                    <Title level={4} className="text-center">REQUEST FOR LOAN</Title>
                    <p className="text-center mb-6">(To be filled by Course Coordinator)</p>
                    
                    <Row gutter={16}>
                        <Col span={12}>
                            <Form.Item name="name" label="1. Name"><Input /></Form.Item>
                            <Form.Item name="designation" label="2. Designation"><Input /></Form.Item>
                            <Form.Item name="department" label="3. Department"><Input /></Form.Item>
                            <Form.Item name="purpose_of_loan" label="4. Purpose of Loan"><Input /></Form.Item>
                            <Form.Item name="amount_required" label="5. Amount of loan required Rs."><Input /></Form.Item>
                            <Form.Item name="amount_in_words" label="(In words) Rupees"><Input /></Form.Item>
                            <Form.Item name="adjustment_date" label="6. Date by which amount of loan will be submitted for adjustment"><DatePicker style={{ width: '100%' }} /></Form.Item>
                            <Form.Item name="debit_grant_code" label="7. Debit grant/course code"><Input /></Form.Item>
                            <Form.Item name="credit_course_code" label="8. Credit course code"><Input /></Form.Item>
                        </Col>
                        <Col span={12}>
                            <div className="border p-2 h-full">
                                <Form.Item name="outstanding_loan_details" label="9 (a) Details of outstanding loan (s):">
                                    <Table columns={outstandingLoanColumns} dataSource={outstandingLoanData} pagination={false} bordered size="small" />
                                </Form.Item>
                                <Form.Item name="reason_for_non_adjustment" label="9 (b) Reason for non-adjustment:" className="mt-4">
                                    <Input.TextArea rows={4} />
                                </Form.Item>
                            </div>
                        </Col>
                    </Row>
                    
                    <div className="mt-8 border-t pt-4">
                         <p><Text strong>Note:</Text> Loan for the course will be settled from Course Code as mentioned at s.no. 8 once we receive the course fee.</p>
                    </div>

                    <div className="mt-16">
                        <p>(Signature of Course Coordinator)</p>
                    </div>

                    <div className="text-center mt-16">
                        <p className="font-bold">(Recommendation of the Coordinator, CEC)</p>
                    </div>

                    <p className="mt-8">Forwarded to the Coordinator CEC for needful.</p>

                    <Form.Item className="mt-8 text-center">
                        <Button type="primary" htmlType="submit" className='bg-blue-600' onClick={async () => {
                            try {
                                const values = await form.validateFields();
                                
                                // Import the configuration mapping function
                                const { mapRequestForLoanDataToConfig } = await import('../../api/generate-pdf/request-for-loan-config');
                                
                                // Create the form configuration
                                const formConfig = mapRequestForLoanDataToConfig(values);
                                
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
                                a.download = 'request-for-loan-form.pdf';
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

export default RequestForLoanForm; 