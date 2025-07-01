"use client";
import React from 'react';
import { Form, Input, Row, Col, Typography, Button, DatePicker, Table, Space } from 'antd';

const { Title, Text } = Typography;

const RemunerationForm = () => {

    const remunerationColumns = [
        { title: 'Details', dataIndex: 'details', key: 'details', width: '30%' },
        { title: 'Hours', dataIndex: 'hours', key: 'hours', render: () => <Input /> },
        { title: 'Date', dataIndex: 'date', key: 'date', render: () => <DatePicker style={{width: '100%'}}/> },
        { title: 'RATE/HRS', dataIndex: 'rate', key: 'rate', render: () => <Input addonBefore="Rs." /> },
        { title: 'AMOUNT', dataIndex: 'amount', key: 'amount', render: () => <Input addonBefore="Rs." /> },
    ];
    
    const remunerationData = [
        { key: '1', details: '(i) Lecture (L)' },
        { key: '2', details: '(ii) Tutorial (T)/ Practical(P)/Panel Discussion(PD)' },
        { key: '3', details: <div><p>3. REMUNERATION</p><p>(L)</p></div> },
        { key: '4', details: '(P/PD)' },
        { key: '5', details: '(L/N)Lecture Notes' },
    ];

    return (
        <div className="font-inter">
            <div className="bg-gray-800 text-white pt-28 pb-6">
                <div className="container mx-auto px-4 text-center">
                    <Title level={3} style={{ color: 'white' }}>CONTINUING EDUCATION CENTRE</Title>
                    <Title level={4} style={{ color: 'white' }}>INDIAN INSTITUTE OF TECHNOLOGY ROORKEE</Title>
                </div>
            </div>

            <div className="container mx-auto p-8 bg-white mt-4">
                <div className="flex justify-end mb-4">
                    <Button type="default" onClick={() => window.open('https://d1bm918zlnq37v.cloudfront.net/CECTemp/CEC_OldForm/3.pdf', '_blank')} className="bg-[#FFAE0E] text-black font-semibold">Download PDF</Button>
                </div>
                <Form layout="vertical" name="remuneration_form">
                    <Row justify="end" className="mb-4">
                        <Col>
                            <Form.Item label="Employee No."><Input /></Form.Item>
                            <Form.Item label="PAN No. :"><Input /></Form.Item>
                        </Col>
                    </Row>

                    <Title level={4} className="text-center underline mb-8">Remuneration Form</Title>

                    <Form.Item name="course_name_code" label="1. Course Name and Course Code:"><Input /></Form.Item>
                    <Form.Item name="expert_details" label="2. Name and Address of Expert (In capital letter)">
                        <Input.TextArea />
                    </Form.Item>
                    <ul className="list-disc pl-8 mb-6">
                        <li><Form.Item label="Bank A/c No.:" name="bank_ac_no" className="mb-2"><Input /></Form.Item></li>
                        <li><Form.Item label="Bank and Branch:" name="bank_branch" className="mb-2"><Input /></Form.Item></li>
                        <li><Form.Item label="IFSC Code:" name="ifsc_code" className="mb-2"><Input /></Form.Item></li>
                    </ul>

                    <Table columns={remunerationColumns} dataSource={remunerationData} pagination={false} bordered className="mb-4" />
                    
                    <Row justify="end" className="mb-4">
                        <Col span={8}>
                           <Form.Item label="TOTAL"><Input addonBefore="Rs." /></Form.Item>
                        </Col>
                    </Row>

                    <Form.Item name="amount_in_words" label="(Amount in words ......................................................................................................................................)"><Input variant="borderless" /></Form.Item>
                    
                    <Row justify="space-between" align="middle" className="mt-8">
                        <Col><Text strong>BILL VERIFIED</Text></Col>
                        <Col><Text strong>Signature</Text></Col>
                    </Row>
                    <Row justify="space-between" align="middle" className="mt-8">
                        <Col><Text strong>COURSE CO-ORDINATOR(S)</Text></Col>
                    </Row>

                    <div className="mt-8">
                        <p>Passed for Payment for Rs. .........................</p>
                        <p>(Rupees : .................................................)</p>
                        <p>Please debit to Course A/C No. ............................</p>
                        <p>Ledger Course No. ..........................................</p>
                    </div>
                    
                    <Row justify="space-between" className="mt-8">
                        <Col>
                           <p>.................................</p>
                           <p>Date</p>
                        </Col>
                        <Col>
                           <p>.................................</p>
                           <p>Asstt/Supdt.</p>
                        </Col>
                        <Col>
                           <p>.................................</p>
                           <p>Coordinator, CEC</p>
                        </Col>
                    </Row>

                    <div className="mt-12 border-t pt-4">
                        <Text strong>For Office Use:</Text>
                        <Row className="mt-2">
                           <Col span={12}>
                             <p>(i) Rs. ..................................... to Sri .....................................</p>
                             <p>(ii) Rs. .................................... To Tax collected by A/C IITR</p>
                             <p>Chargeable Head/Course</p>
                           </Col>
                        </Row>
                        <p className="mt-4">Paid by Cheque no.............................. Dated ..............................section In charge</p>
                    </div>

                    <Form.Item className="mt-8 text-center">
                        <Button type="primary" htmlType="submit" className='bg-blue-600'>Submit & Download Application</Button>
                    </Form.Item>
                </Form>
            </div>
        </div>
    );
};

export default RemunerationForm; 