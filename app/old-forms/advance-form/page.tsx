"use client";
import React from 'react';
import { Form, Input, Row, Col, Typography, Button, DatePicker, Table, Checkbox, Space } from 'antd';

const { Title, Text } = Typography;

const AdvanceForm = () => {

    const outstandingAdvanceColumns = [
        { title: 'S.No', dataIndex: 'sno', key: 'sno', render: () => <Input /> },
        { title: 'Amount', dataIndex: 'amount', key: 'amount', render: () => <Input /> },
        { title: 'Date', dataIndex: 'date', key: 'date', render: () => <DatePicker style={{width: '100%'}}/> },
        { title: 'Purpose', dataIndex: 'purpose', key: 'purpose', render: () => <Input /> },
    ];
    const outstandingAdvanceData = [ {key: '1'}, {key: '2'}, {key: '3'} ];

    return (
        <div className="font-inter">
            <div className="bg-gray-800 text-white pt-28 pb-6">
                <div className="container mx-auto px-4 text-center">
                    <Title level={3} style={{ color: 'white' }}>INDIAN INSTITUTE OF TECHNOLOGY ROORKEE</Title>
                    <Title level={4} style={{ color: 'white' }}>ROORKEE- 247667</Title>
                </div>
            </div>

            <div className="container mx-auto p-8 bg-white mt-4">
                <Form layout="vertical" name="advance_form">
                    <div className="text-right mb-4">
                        <Text strong>Form: ADV-1</Text>
                    </div>
                    <Title level={4} className="text-center">REQUEST FOR ADVANCE</Title>
                    <p className="text-center mb-6">(To attend/Meeting/Field Work/course expenses etc.)<br/>(Please fill up in capital letters)</p>

                    <Form.Item label="Employee No.">
                        <Input style={{width: '200px'}} />
                    </Form.Item>

                    <Row gutter={24}>
                        <Col span={12}>
                            <Form.Item name="name" label="1. Name"><Input /></Form.Item>
                            <Form.Item name="designation" label="2. Designation"><Input /></Form.Item>
                            <Form.Item name="department" label="3. Department"><Input /></Form.Item>
                            <Form.Item name="purpose" label="4. Purpose of Advance"><Input.TextArea /></Form.Item>
                            <Title level={5}>5. Categorical Estimated Expenditure</Title>
                            <Form.Item name="fare" label=" (i) T.A.(fare of entitled class):"><Input addonBefore="Rs." /></Form.Item>
                            <Form.Item name="da" label=" (ii) D.A. for _____ days:"><Input addonBefore="Rs." /></Form.Item>
                             <Form.Item name="purchase_clearance" label="(iii) Purchases/Clearance of : documents through bank (tick one)" valuePropName="checked">
                                <Checkbox>Documents through bank</Checkbox>
                            </Form.Item>
                             <Form.Item name="other_items" label="(iv) Other items (specify):"><Input addonBefore="Rs." /></Form.Item>
                             <Form.Item name="total" label="Total"><Input addonBefore="Rs." /></Form.Item>

                             <Form.Item name="advance_amount" label="6. Amount of advance required Rs."><Input /></Form.Item>
                             <Form.Item name="advance_in_words" label="(In words) Rupees"><Input /></Form.Item>
                             <Form.Item name="cheque_date" label="7. Date by which cheque is required"><DatePicker style={{width: '100%'}} /></Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item name="adjustment_date" label="8. Date by which amount of advance will be submitted for adjustment"><DatePicker style={{width: '100%'}} /></Form.Item>
                            <Form.Item name="course_name_dates" label="9. Name of the course and dates"><Input /></Form.Item>
                            <Form.Item name="course_code" label="10. Course code"><Input /></Form.Item>
                            
                            <Title level={5}>11. (a) Details of outstanding advance (s) :</Title>
                            <Table columns={outstandingAdvanceColumns} dataSource={outstandingAdvanceData} pagination={false} bordered className="mb-4" />
                            <Form.Item name="non_adjustment_reason" label="(b) Reason for non-adjustment:"><Input.TextArea /></Form.Item>
                        </Col>
                    </Row>
                    
                    <p className="mt-8">12. I have read and admitted instructions for adjustment of advance given on the reverse side of the proforma.</p>
                    <div className="text-right mt-4">
                        <p>(Signature)</p>
                    </div>

                    <Row gutter={16} className="mt-8">
                       <Col span={12}><p>(Approval of competent Authority)</p></Col>
                       <Col span={12}><p>(Recommendation of the Coordinator, CEC)</p></Col>
                    </Row>

                    <Title level={4} className="text-center mt-8 border-t border-b py-2">SPACE FOR ACCOUNT OFFICE</Title>
                    <Row gutter={0}>
                        <Col span={12}><div style={{height: '150px', borderRight: '1px solid black'}}></div></Col>
                        <Col span={12}></Col>
                    </Row>
                    <div style={{height: '150px', border: '1px solid black', borderTop: 'none'}}></div>


                    <div className="mt-16 pt-8 border-t-4 border-black">
                        <Title level={4} className="text-center">INSTRUCTIONS FOR ADJUSTMENT OF ADVANCE</Title>
                        <ol className="list-decimal pl-5 space-y-4">
                            <li>
                                Account of advance with all related vouchers should be submitted through Head of the Department/Section by the date specified under sl. 8 or within 30 days to Accounts Office, whichever is earlier.
                                <br/>
                                However, it will not be applicable in case of imprests (permanent advance) and letter of credits, imprest should be closed at the end of financial year and fresh imprest may be applied in the beginning of the financial year. In case of letter of credit advance shall be adjusted within a month of receipt of material/equipment.
                            </li>
                            <li>
                                Failure to comply with (1) above is a serious matter. The advance may be adjusted against the salary of the employee with penal intrest for the period of delay as per norms.
                            </li>
                            <li>
                                Further advance may not be allowed if the account of the previous advance (s) has not been submitted, for consideration of adjustment.
                            </li>
                        </ol>
                    </div>

                    <Form.Item className="mt-8 text-center">
                        <Space>
                            <Button type="primary" htmlType="submit" className='bg-blue-600'>Submit</Button>
                            <Button onClick={() => window.open('https://d1bm918zlnq37v.cloudfront.net/CECTemp/CEC_OldForm/2.pdf', '_blank')}>Download PDF</Button>
                        </Space>
                    </Form.Item>
                </Form>
            </div>
        </div>
    );
};

export default AdvanceForm; 