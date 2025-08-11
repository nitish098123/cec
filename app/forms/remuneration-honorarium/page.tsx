"use client";
import React from 'react';
import { Form, Input, InputNumber, Row, Col, Typography, Button, DatePicker, Table, Space } from 'antd';

const { Text, Title } = Typography;

const RemunerationHonorariumForm = () => {
    const [form] = Form.useForm();

    const detailsColumns = [
        {
            title: 'Details',
            dataIndex: 'details',
            key: 'details',
            width: '40%',
        },
        {
            title: 'Hours',
            dataIndex: 'hours',
            key: 'hours',
            render: () => <InputNumber />,
        },
        {
            title: 'Date',
            dataIndex: 'date',
            key: 'date',
            render: () => <DatePicker />,
        },
        {
            title: 'Amount per hour (Rs.)',
            dataIndex: 'amountPerHour',
            key: 'amountPerHour',
            render: () => <InputNumber />,
        },
        {
            title: 'Total Amount (Rs.)',
            dataIndex: 'totalAmount',
            key: 'totalAmount',
            render: () => <InputNumber />,
        },
    ];

    const detailsData = [
        { key: '1', details: '(i) Lectures (L)/Interactions/*' },
        { key: '2', details: '(ii) PDF Amount (if applicable)' },
    ];
    
    const officeUseColumns = [
         {
            title: 'Pay',
            dataIndex: 'pay',
            key: 'pay',
            children: [
                {
                    title: '(i)',
                    dataIndex: 'pay_i',
                    key: 'pay_i',
                    render: () => <Input addonBefore="Rs." />
                },
                {
                    title: '(ii)',
                    dataIndex: 'pay_ii',
                    key: 'pay_ii',
                    render: () => <Input addonBefore="Rs." />
                }
            ]
        },
        {
            title: 'to Sri',
            dataIndex: 'to_sri',
            key: 'to_sri',
            render: () => <Input />
        },
        {
            title: 'To Tax collected by A/C IITR',
            dataIndex: 'tax_collected',
            key: 'tax_collected',
            render: () => <Input />
        }
    ];

    const officeUseData = [{key: '1'}];

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
                    <Button type="default" onClick={() => window.open('https://d1bm918zlnq37v.cloudfront.net/CECTemp/CEC_NewForm/7.pdf', '_blank')} className="bg-[#FFAE0E] text-black font-semibold">Download PDF</Button>
                </div>
                <Form layout="vertical" name="remuneration_honorarium_form">
                     <Row justify="end">
                        <Col>
                            <Text strong>CEC-06</Text>
                        </Col>
                    </Row>
                    {/* Note */}
                    <div className="bg-yellow-200 text-yellow-800 p-4 rounded-md my-6 border border-yellow-400">
                        <p><strong>Note:</strong> Please do not delete any item in the form, provide details as applicable, wherever information is not available mention N.A. The form may need to be sent back for corrections, if any item is changed or deleted.</p>
                    </div>

                    <Title level={4} className="text-center">Remuneration/Honorarium Form for Open Participation/Sponsored Course</Title>
                    <p className="text-center mb-4">(To be filled after the course is over)*</p>
                    
                    <Row gutter={16}>
                        <Col span={16}></Col>
                        <Col span={8}>
                             <Form.Item name="pan_no" label="PAN No. :"><Input /></Form.Item>
                             <Form.Item name="employee_no" label="Employee No. :"><Input /></Form.Item>
                        </Col>
                    </Row>

                    <Form.Item name="course_name" label="1. Course Name :"><Input /></Form.Item>
                    <Form.Item name="batch_no" label="2. Batch No. :"><Input /></Form.Item>
                    <Form.Item name="course_code" label="3. Course Code :"><Input /></Form.Item>

                    <Form.Item name="expert_details" label="4. Name and Address of Expert (in capital letter), Mobile No., Email :">
                        <Input.TextArea rows={4} />
                    </Form.Item>

                    <Table columns={detailsColumns} dataSource={detailsData} pagination={false} bordered className="mb-4" />
                    
                    <p>(Note: For the amounts in (i) to (ii) whole or part can be transferred to PDF)</p>
                    <Form.Item name="amount_to_ac" label="(a) Amount to be transferred in A/C"><Input /></Form.Item>
                    <Form.Item name="amount_to_pdf" label="(b) Amount to be transferred in PDF"><Input /></Form.Item>
                    <p>(c) Bank A/c No.:</p>
                    <p>• Bank and Branch:</p>
                    <p>• IFSC Code:</p>
                    <Form.Item name="amount_to_cec_ddf" label="(d) Amount to be transferred in CEC-DDF-001/DDF Account">
                        <Input addonBefore="Rs." />
                    </Form.Item>
                     <p>(amount to be transferred if per hour rate is more than Rs. 18,000/- as mentioned at**)</p>
                     
                     <Row justify="space-between" className="mt-8">
                        <Col><Text strong>BILL VERIFIED</Text></Col>
                        <Col><Text strong>Signature</Text></Col>
                     </Row>
                     <p className="mt-4">Signature of Course Coordinator</p>
                     
                     <div className="border p-4 mt-4">
                        <p>Passed for Payment for Rs. : ____________________</p>
                        <p>Rupees : ____________________________________</p>
                        <p>Please debit to Course A/C No. : ______________</p>
                        <p>Ledger Code No. : __________________________</p>
                     </div>
                     
                     <Row justify="space-between" className="mt-8 border p-4">
                         <Col><strong>Date</strong></Col>
                         <Col><strong>Asstt/Supdt.</strong></Col>
                         <Col><strong>Coordinator, CEC</strong></Col>
                     </Row>
                     
                     <Row justify="end" className="mt-4">
                        <Col><Text strong>PTO</Text></Col>
                     </Row>

                    {/* Page 2 Content */}
                    <div className="mt-8 pt-8 border-t-2">
                         <Title level={5}>For Office Use:</Title>
                         <Table columns={officeUseColumns} dataSource={officeUseData} pagination={false} bordered className="mb-4" />
                         
                         <Row gutter={16}>
                             <Col span={12}>Paid by Cheque no ___________________</Col>
                             <Col span={12}>Dated ___________________ section in charge</Col>
                         </Row>
                         
                         <div className="mt-8">
                            <p><Text strong>Note :</Text></p>
                            <p><Text strong>*</Text> The honorarium to internal faculty will be distributed after completion of the course having live interactions. Before distribution of honorarium, please ensure that course feedback, schedule, list of participates with fee detail and all the payment instalments have been resolved as per the MoU/agreement terms.</p>
                            <p><Text strong>**</Text>Total honorarium is subject to a maximum limit of Rs 18,000/- per Hr. 50% of any left-over amount from Instructor payment (i.e., any amount above Rs 18,000 x no. of Instructor hrs) will be deposited into the PDF [SRIC] of the respective faculty [to be distributed in proportion to number of lectures/interactions], while the remaining 50% will be deposited into CEC corpus for developmental activities.</p>
                         </div>
                    </div>

                    <Form.Item className="mt-8 text-center">
                        <Button type="primary" htmlType="submit" className='bg-blue-600' onClick={async () => {
                            try {
                                const values = await form.validateFields();
                                
                                // Import the configuration mapping function
                                const { mapRemunerationHonorariumDataToConfig } = await import('../../api/generate-pdf/remuneration-honorarium-config');
                                
                                // Create the form configuration
                                const formConfig = mapRemunerationHonorariumDataToConfig(values);
                                
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
                                a.download = 'remuneration-honorarium-form.pdf';
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

export default RemunerationHonorariumForm; 