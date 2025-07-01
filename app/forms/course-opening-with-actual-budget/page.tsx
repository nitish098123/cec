"use client";
import React, { useState, useEffect } from 'react';
import { Form, Input, InputNumber, Button, Row, Col, Card, Table, Space, Typography } from 'antd';

const { Title, Text } = Typography;

const CourseOpeningForm = () => {
    const [form] = Form.useForm();
    const [grossAmount, setGrossAmount] = useState(0);
    const [gst, setGst] = useState(0);
    const [contractedAmount, setContractedAmount] = useState(0);
    const [instituteOverhead, setInstituteOverhead] = useState(0);
    const [coordinationFee, setCoordinationFee] = useState(0);
    const [cecOperationalCost, setCecOperationalCost] = useState(0);

    const handleGrossAmountChange = (value: number | null) => {
        const g = value || 0;
        setGrossAmount(g);
        const l = (g / 1.18) * 0.18;
        setGst(l);
        const t = g - l;
        setContractedAmount(t);
        const p = t * 0.20;
        setInstituteOverhead(p);
        const c = (t - p) * 0.20;
        setCoordinationFee(c);
        const o = (t-p) * 0.10;
        setCecOperationalCost(o);

        form.setFieldsValue({
            lessGst: l.toFixed(2),
            contractedAmount: t.toFixed(2),
            instituteOverhead: p.toFixed(2),
            coordinationFee: c.toFixed(2),
            cecOperationalCost: o.toFixed(2),
        });
    };

    const expenseColumns = [
        {
            title: 'i.',
            dataIndex: 'description',
            key: 'description',
            render: (text: string) => <p>{text}</p>
        },
        {
            title: <p className='text-right'>Amount &#8377;</p>,
            dataIndex: 'amount',
            key: 'amount',
            render: (_: any, record: any) => (
                 <Form.Item name={['expenses', record.key]} noStyle>
                    <InputNumber style={{ width: '100%' }} />
                </Form.Item>
            ),
            width: '20%'
        },
    ];

    const expenseDataSource = [
        { key: 'registrationMaterial', description: 'Cost of registration material (stationery, pen pad, bags, Xeroxing, typing etc.)' },
        { key: 'contingency', description: 'Contingency/miscellaneous expenses' },
        { key: 'infrastructure', description: 'Infrastructure charges including hall and equipment charges' },
        { key: 'accommodation', description: 'Accommodation, boarding and lodging' },
        { key: 'transportation', description: 'Transportation: TA/DA to outside experts/participants' },
        { key: 'localTravel', description: 'Local travel / field trip / tour' },
        { key: 'labStaff', description: 'Lab Staff/TA (please specify)' },
    ];


    const budgetColumns = [
        {
          title: 'Budget Details',
          dataIndex: 'details',
          key: 'details',
          width: '80%',
        },
        {
          title: <p className='text-right'>Amount &#8377;</p>,
          dataIndex: 'amount',
          key: 'amount',
          render: (text: any, record: any) => {
            if (record.isInput) {
                return (
                    <Form.Item name={record.name} noStyle rules={record.rules}>
                       <InputNumber style={{ width: '100%' }} onChange={record.onChange} />
                    </Form.Item>
                )
            }
             if (record.isCalculated) {
                return (
                    <Form.Item name={record.name} noStyle>
                       <InputNumber style={{ width: '100%' }} readOnly disabled />
                    </Form.Item>
                )
            }
            return text
          }
        },
    ];

    const budgetData = [
        {
            key: '1',
            details: '1. Gross amount including GST = (G) received',
            name: 'grossAmount',
            isInput: true,
            onChange: handleGrossAmountChange,
            rules: [{ required: true, message: 'Please input the gross amount!' }]
        },
        {
            key: '2',
            details: '2. Less GST as applicable (presently GST @ 18%) (L) [Note: L= (G / 1.18) * 18%]',
            name: 'lessGst',
            isCalculated: true,
        },
        {
            key: '3a',
            details: "3. (a) Contracted amount 'T' = (G – L)",
            name: 'contractedAmount',
            isCalculated: true,
        },
        {
            key: '3b',
            details: "3. (b) Institute Overhead Charges (P) (20% of T)",
            name: 'instituteOverhead',
            isCalculated: true,
        },
        {
            key: '4',
            details: "4. Coordination Fee 'C' [ max @20% of (T-P)]",
            name: 'coordinationFee',
            isCalculated: true,
        },
        {
            key: '5',
            details: "5. CEC Operational/Establishment cost 'O'[@10% of (T-P)]",
            name: 'cecOperationalCost',
            isCalculated: true,
        },
        {
            key: '6',
            details: '6. TDS deduction, if any',
            name: 'tdsDeduction',
            isInput: true,
        },
    ];


    return (
        <div className="font-inter">
            <div className="bg-[#8B0000] text-white pt-28 pb-6">
                <div className="container mx-auto px-4 text-center">
                    <h1 className="text-2xl font-bold">CONTINUING EDUCATION CENTRE, INDIAN INSTITUTE OF TECHNOLOGY, ROORKEE</h1>
                    <p className="text-lg">
                        <a href="https://iitr.ac.in/cec" target="_blank" rel="noopener noreferrer" className="hover:underline">HTTPS://IITR.AC.IN/CEC</a>, CONTD@IITR.AC.IN Ph: 4327
                    </p>
                </div>
            </div>
            <div className='container mx-auto px-4 text-right text-lg font-bold'>
                <p>CEC-02</p>
            </div>

            <div className="container mx-auto p-8">
                <div className="flex justify-end mb-4">
                    <Button type="default" onClick={() => window.open('https://d1bm918zlnq37v.cloudfront.net/CECTemp/CEC_NewForm/3.pdf', '_blank')} className="bg-[#FFAE0E] text-black font-semibold">Download PDF</Button>
                </div>
                <div className="bg-yellow-200 text-yellow-800 p-4 rounded-md mb-6 border border-yellow-400">
                    <p><strong>Note:</strong> Please do not delete any item in the form, provide details as applicable, wherever information is not available mention N.A. The form may need to be sent back for corrections, if any item is changed or deleted.</p>
                </div>
                
                <h2 className="text-xl font-bold text-center mb-4">REQUEST FOR COURSE OPENING FORM WITH ACTUAL BUDGET</h2>
                <h3 className="text-lg font-semibold text-center mb-2">(Open Participation/Sponsored)</h3>
                <p className='text-center mb-6'>(To be filled after receipt of funds or transfer from an alternate source like PDF or to generate the course invoice)</p>

                <Form form={form} name="course_opening_budget" layout="vertical">
                     <Row gutter={24}>
                        <Col span={12}>
                             <Form.Item label="1. Course Code (To be filled by CEC Office)">
                                <Input disabled />
                            </Form.Item>
                        </Col>
                         <Col span={12}>
                             <Form.Item name="courseNameAndDate" label="2. Course Name & Date" rules={[{ required: true }]}>
                                <Input />
                            </Form.Item>
                        </Col>
                    </Row>
                    
                    <Form.Item name="courseBudget" label="3. Course budget : Gross Amount :" rules={[{ required: true }]}>
                        <Input />
                    </Form.Item>

                    <p className="mb-4">Please attach Transaction details of the fund transferred to SRIC/IITR account</p>
                    
                    <Card className="mb-6">
                        <Table
                            bordered
                            pagination={false}
                            columns={budgetColumns}
                            dataSource={budgetData}
                            rowKey="key"
                        />
                    </Card>

                     <Card title="7. Expenses (E) : As per actuals" className="mb-6">
                        <Table
                            bordered
                            pagination={false}
                            columns={expenseColumns}
                            dataSource={expenseDataSource}
                            rowKey="key"
                        />
                    </Card>

                    <Form.Item name="honorarium" label="8. Amount for Honorarium to instructors/experts" rules={[{ required: true }]}>
                        <InputNumber style={{width: '100%'}} />
                    </Form.Item>

                    <div className="mt-8">
                        <Row justify="end" align="middle">
                            <Col>
                                <p className="font-bold">Name of Course Coordinator/PI</p>
                                <p className="font-bold">Signature of Course Coordinator/PI (with date)</p>
                            </Col>
                        </Row>
                    </div>

                    <Card title="CEC Office, IIT Roorkee" className="mt-8">
                         <Row justify="space-between">
                            <Col>
                                <p>Recommended/Not Recommended</p>
                                <br/>
                                <p>...................................</p>
                                <p>Dealing Asstt.</p>
                            </Col>
                             <Col>
                                <br/><br/>
                                <p>...................................</p>
                                <p>Sr. Superintendent, CEC</p>
                            </Col>
                             <Col>
                                <br/><br/>
                                <p>...................................</p>
                                <p>Coordinator, CEC</p>
                            </Col>
                        </Row>
                    </Card>
                    <Card title="SRIC Office, IIT Roorkee" className="mt-8">
                         <Row justify="space-between">
                            <Col>
                                <p>Approved / Not Approved</p>
                                <br/>
                                <p>...................................</p>
                                <p>Supdt. (SRIC – Admn).</p>
                            </Col>
                             <Col>
                                <br/><br/>
                                <p>...................................</p>
                                <p>AR (SRIC-Admn.),</p>
                            </Col>
                             <Col>
                                <br/><br/>
                                <p>...................................</p>
                                <p>Assoc. Dean (SRIC) / Dean (SRIC)</p>
                            </Col>
                        </Row>
                    </Card>

                    <div className="mt-8">
                        <p>Copy to: Asstt. Reg. (SRIC-A/Cs)</p>
                    </div>

                    <Form.Item className="mt-8 text-center">
                        <Button type="primary" htmlType="submit" className='bg-blue-600'>Submit & Download Application</Button>
                    </Form.Item>
                </Form>
            </div>
        </div>
    );
};

export default CourseOpeningForm; 