"use client";
import React from 'react';
import { Form, Input, Row, Col, Typography, Button, DatePicker, Table, Radio, Checkbox, Space } from 'antd';

const { Text, Title } = Typography;

const CourseClosureForm = () => {

    const distributionColumns = [
        { title: 'Name', dataIndex: 'name', key: 'name', render: () => <Input /> },
        { title: 'Employee code', dataIndex: 'employee_code', key: 'employee_code', render: () => <Input /> },
        { title: 'Bank A/C No.', dataIndex: 'bank_ac_no', key: 'bank_ac_no', render: () => <Input /> },
        { title: 'IFSC Code:', dataIndex: 'ifsc_code', key: 'ifsc_code', render: () => <Input /> },
        { title: 'PDF', dataIndex: 'pdf', key: 'pdf', render: () => <Input /> },
        { title: 'Amount ₹ \n Bank A/C', dataIndex: 'amount', key: 'amount', render: () => <Input /> },
    ];
    
    const distributionData = [
        { key: '1' }, { key: '2' }, { key: '3' }, { key: '4' },
    ];

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
                <Form layout="vertical" name="course_closure_form">
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
                            <Col span={12}><Form.Item name="gross_amount" label="a. Gross amount including GST `G`"><Input addonAfter="₹" /></Form.Item></Col>
                            <Col span={12}><Form.Item name="less_gst" label="b. Less GST as applicable `L` (presently @18%) (G/1.18*18%)"><Input addonAfter="₹" /></Form.Item></Col>
                            <Col span={12}><Form.Item name="total_contracted" label="c. Total Contracted amount `T` (=G-L)"><Input addonAfter="₹" /></Form.Item></Col>
                            <Col span={12}><Form.Item name="overhead_charges" label="d. Amount payable to Institute Overhead Charges `P` (@20%of T)"><Input addonAfter="₹" /></Form.Item></Col>
                            <Col span={12}><Form.Item name="cec_operational_cost" label="e. CEC operational/establishment cost `O`(@10%of T-P)"><Input addonAfter="₹" /></Form.Item></Col>
                            <Col span={12}><Form.Item name="tds_deduction" label="f. TDS Deduction (if any) `TD`"><Input addonAfter="₹" /></Form.Item></Col>
                            <Col span={12}><Form.Item name="honorarium" label="g. Honorarium to Instructor/s/Experts `H`"><Input addonAfter="₹" /></Form.Item></Col>
                            <Col span={12}><Form.Item name="expenditure_done" label="h. Expenditure already done `E`"><Input addonAfter="₹" /></Form.Item></Col>
                            <Col span={12}><Form.Item name="balance_amount" label="i. Balance amount available (T-P-O-TD-H-E)"><Input addonAfter="₹" /></Form.Item></Col>
                        </Row>
                    </div>

                    <div className="my-8">
                        <Title level={5}>B. Details of amount to be distributed</Title>
                        <Form.Item name="cec_ddf_component" label="i. CEC DDF component CEC-DDF-001 (in case of Open Participation course, if coordination fee amount is above Rs. 8 Lacs)"><Input addonAfter="₹" /></Form.Item>
                        <Form.Item name="coordination_fee" label="ii. Coordination fee C max@20% of 20% of (T-P)* (Note: whole or part can be transferred to PDF)"><Input addonAfter="₹" /></Form.Item>
                        <p>Details of distribution among Coordinators</p>
                        <p>Mention all the names as per approval even if the amount to be disbursed is NIL.</p>
                        <Table columns={distributionColumns} dataSource={distributionData} pagination={false} bordered className="mb-4" />
                        <Form.Item name="remaining_amount" label="Remaining amount (if any) to DDF of CEC [CEC-DDF-001] ="><Input addonAfter="₹" /></Form.Item>
                    </div>

                    <div className="mt-8 pt-8 border-t-2">
                        <p>Certified that</p>
                        <p>This is final distribution and that the work has been completed. The final report has been sent vide letter No. _____________ Dated ____________ (Copy enclosed)</p>

                        <Title level={5} className="mt-8">The soft copy of the following documents are required :</Title>
                        <Row>
                            <Col span={12}><p>(i) Name, email id and address of the sponsoring agency</p></Col>
                            <Col span={12}><p>(ii) List of experts with email id and address</p></Col>
                            <Col span={12}><p>(iii) List of the participants with email id and address</p></Col>
                            <Col span={12}><p>(iv) Time Table</p></Col>
                            <Col span={12}><p>(v) Group-photo.</p></Col>
                        </Row>
                        
                        <div className="text-right mt-8">
                           <p>Signature of the Course Coordinator (with date)</p>
                           <p>Extn. (O)__________Mobile__________</p>
                           <p>Email :_________________________</p>
                        </div>
                        
                        <Title level={5} className="mt-8">Endorsement by CEC/SRIC Office, I.I.T. Roorkee</Title>
                        <p>The above is submitted for approval as recommended by Coordinator, CEC</p>
                        
                        <Row className="mt-8">
                            <Col span={12}><Title level={5}>Recommended /Not Recommended</Title></Col>
                            <Col span={12}><Title level={5}>Approved/Not Approved</Title></Col>
                        </Row>

                        <Row className="mt-8 text-center" gutter={[16, 40]}>
                            <Col span={6}>D.A /Sr. Supdt. C.E.C.</Col>
                            <Col span={6}>Coordinator, CEC</Col>
                            <Col span={6}>D.A. /Supdt. SRIC</Col>
                            <Col span={6}>A.R./Dy. Registrar (SRIC) &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Dean, SRIC</Col>
                        </Row>
                        
                        <div className="mt-8">
                           <Form.Item name="dist_to_idf" label="Distribution of total institute share into IDF/CEC DDF Account , Total Institute Overhead Charges deducted (P)"><Input addonAfter="₹" /></Form.Item>
                           <Form.Item name="dist_50_idf" label="(i) 50% to IDF [CEC-IDF-001]"><Input addonAfter="₹" /></Form.Item>
                           <Form.Item name="dist_45_cec" label="(ii) 45% to CEC [CEC-DDF-001]"><Input addonAfter="₹" /></Form.Item>
                           <Form.Item name="dist_5_electricity" label="(iii) 5% Electricity [CEC-DDF-001]"><Input addonAfter="₹" /></Form.Item>
                        </div>
                        
                        <div className="text-right">
                           <p>________________</p>
                           <p>Coordinator, CEC</p>
                        </div>
                        
                        <div className="mt-8">
                           <p><Text strong>* Coordination Fee</Text></p>
                           <p><Text strong>(i) Open Participation Course</Text><br/>Coordination Fee is subject to a maximum of Rs. 8 Lakh. If faculty member desires whole or part of this amount can be transferred to the PDF (SRIC) of the faculty member(s). 50% of any left-over amount from coordination fee above Rs. 8 Lakhs will be deposited into the PDF (SRIC) of respective faculty (to be distributed as agreed), while the remaining 50% will be deposited into CEC corpus for developmental activities.</p>
                           <p><Text strong>(ii) Sponsored Course</Text><br/>Coordination fee is subject to a maximum of Rs. 8 Lakh. If faculty member desires whole or part of this amount can be transferred to the PDF (SRIC) of the faculty member(s). Any left-over amount from coordination fee above Rs. 8 Lacs will be deposited into the PDF (SRIC) of respective faculty (to be distributed as agreed)</p>
                        </div>
                    </div>

                    <Form.Item className="mt-8 text-center">
                        <Space>
                            <Button type="primary" htmlType="submit" className='bg-blue-600'>Submit</Button>
                            <Button onClick={() => window.open('https://d1bm918zlnq37v.cloudfront.net/CECTemp/CEC_NewForm/10.pdf', '_blank')}>Download PDF</Button>
                        </Space>
                    </Form.Item>
                </Form>
            </div>
        </div>
    );
};

export default CourseClosureForm; 