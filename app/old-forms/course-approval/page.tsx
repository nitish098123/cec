"use client";
import React from 'react';
import { Form, Input, Row, Col, Typography, Button, DatePicker, Table, Radio, Upload, Space } from 'antd';
import { UploadOutlined } from '@ant-design/icons';

const { Text, Title } = Typography;

const CourseApprovalOldForm = () => {

    const facultyColumns = [
        { title: 'Name of faculty', dataIndex: 'name', key: 'name', render: () => <Input /> },
        { title: 'Designation', dataIndex: 'designation', key: 'designation', render: () => <Input /> },
        { title: 'Employees No.', dataIndex: 'employee_no', key: 'employee_no', render: () => <Input /> },
        { title: 'Department/Centre', dataIndex: 'department', key: 'department', render: () => <Input /> },
        { title: 'Signature', dataIndex: 'signature', key: 'signature', render: () => <Input /> },
    ];
    const facultyData = [ {key: '1'}, {key: '2'} ];

    const technicalStaffColumns = [
        { title: 'Technical Staff', dataIndex: 'name', key: 'name', render: () => <Input /> },
        { title: 'Designation', dataIndex: 'designation', key: 'designation', render: () => <Input /> },
        { title: 'Employee No.', dataIndex: 'employee_no', key: 'employee_no', render: () => <Input /> },
        { title: 'Department / Centre', dataIndex: 'department', key: 'department', render: () => <Input /> },
    ];
    const technicalStaffData = [ {key: '1'}, {key: '2'} ];

    const budgetColumns = [
        { title: 'SL. No.', dataIndex: 'sl_no', key: 'sl_no' },
        { title: 'Budget head-wise Description', dataIndex: 'description', key: 'description', width: '60%' },
        { title: 'Amount ₹', dataIndex: 'amount', key: 'amount', render: () => <Input /> },
    ];

    const budgetData = [
        { key: '1', sl_no: '1.', description: 'Gross amount including service Tax = (G) received' },
        { key: '2', sl_no: '2.', description: 'Less GST as applicable (presently GST @ 18%) (L)' },
        { key: '3', sl_no: '3.', description: <div><p>(a) Contracted amount T = (G – L)</p><p>(b) Institute Share in the beginning (P) (20% of T)</p></div> },
        { key: '4', sl_no: '4.', description: 'Honorarium to outside/internal experts' },
        { key: '5', sl_no: '5.', description: <div>
            <p>Expenses on:</p>
            <ul className="list-disc pl-5">
                <li>(i) Course design and material development</li>
                <li>(ii) Cost of registration course material (stationery, pen pad, bags, Xeroxing, typing etc.)</li>
                <li>(iii) Contingency / miscellaneous expenses</li>
                <li>(iv) Infrastructure charges including hall and equipment charges</li>
                <li>(v) Accommodation, boarding and lodging</li>
                <li>(vi) Transportation: TA / DA to outside experts/participants</li>
                <li>(vii) Local travel / field trip / tour</li>
                <li>(viii) Research /Office Staff (if required please specify)</li>
            </ul>
        </div> },
        { key: '6', sl_no: '6.', description: 'If any' },
    ];
    
    const normFile = (e: any) => {
        if (Array.isArray(e)) {
          return e;
        }
        return e?.fileList;
    };

    return (
        <div className="font-inter">
            <div className="bg-gray-800 text-white pt-28 pb-6">
                <div className="container mx-auto px-4 text-center">
                    <Title level={3} style={{ color: 'white' }}>CONTINUING EDUCATION CENTRE</Title>
                    <Title level={4} style={{ color: 'white' }}>INDIAN INSTITUTE OF TECHNOLOGY ROORKEE</Title>
                    <p>(w.e.f. 20.11.2018)</p>
                </div>
            </div>

            <div className="container mx-auto p-8 bg-white mt-4">
                <Form layout="vertical" name="old_course_approval_form">
                    <Title level={4} className="text-center border border-black p-2">REQUEST FOR APPROVAL OF HRD / CONSULTANCY COURSE</Title>

                    <Row gutter={16} className="mt-8">
                        <Col span={12}><Form.Item name="pi_name" label="1. Name of the P.I. :"><Input /></Form.Item></Col>
                        <Col span={6}><Form.Item name="designation" label="Desgn:"><Input /></Form.Item></Col>
                        <Col span={6}><Form.Item name="department" label="Deptt./Centre:"><Input /></Form.Item></Col>
                    </Row>
                    <Form.Item name="course_title" label="2. Title of the Course:"><Input /></Form.Item>
                    <Form.Item name="sponsorship_type" label="3. Type of Sponsorship:">
                        <Radio.Group>
                            <Radio value="private">Private Sector</Radio>
                            <Radio value="govt">Govt.</Radio>
                            <Radio value="public">Public</Radio>
                            <Radio value="foreign">Foreign Agency</Radio>
                            <Radio value="others">Others (Pl. Specify)</Radio>
                        </Radio.Group>
                    </Form.Item>
                    <Form.Item name="sponsorship_others" label="Specify if others:">
                        <Input placeholder="Specify if others" />
                    </Form.Item>
                    <Form.Item name="sponsor_details" label="4. Name and Address of Sponsor's with GST Details :"><Input.TextArea /></Form.Item>
                    <Form.Item label="5. GST details" valuePropName="fileList" getValueFromEvent={normFile}>
                        <Upload><Button icon={<UploadOutlined />}>Pl. attach. Copy</Button></Upload>
                    </Form.Item>
                    <Form.Item name="payment_received_in" label="6. Payment to be received in:">
                        <Radio.Group>
                            <Radio value="full">Full</Radio>
                            <Radio value="part">Part</Radio>
                        </Radio.Group>
                    </Form.Item>
                    <Row gutter={16}>
                        <Col span={12}><Form.Item name="commencement_date" label="7. Date of Commencement:"><DatePicker style={{width: '100%'}} /></Form.Item></Col>
                        <Col span={12}><Form.Item name="completion_date" label="Expected date of Completion:"><DatePicker style={{width: '100%'}} /></Form.Item></Col>
                    </Row>
                    
                    <Title level={5}>8. Details of Faculty/Staff who shall be associated:</Title>
                    <Table columns={facultyColumns} dataSource={facultyData} pagination={false} bordered className="mb-4" />
                    <Table columns={technicalStaffColumns} dataSource={technicalStaffData} pagination={false} bordered className="mb-8" />
                    
                    <Title level={5}>8. Budget (should conform to the contract/agreement with the sponsor) :</Title>
                    <Table columns={budgetColumns} dataSource={budgetData} pagination={false} bordered className="mb-8" />
                    
                    <p className="text-right font-bold">P.T.O.</p>

                    <div className="mt-8 pt-8 border-t-2">
                         <Title level={5}>9. Other relevant information (attach sheet, if necessary)</Title>
                         <Form.Item label="i) Correspondence with sponsor" valuePropName="fileList" getValueFromEvent={normFile}><Upload><Button icon={<UploadOutlined />}>Attach</Button></Upload></Form.Item>
                         <Form.Item label="ii) Request letter for special approval, if any" valuePropName="fileList" getValueFromEvent={normFile}><Upload><Button icon={<UploadOutlined />}>Attach</Button></Upload></Form.Item>
                         <Form.Item name="bank_draft_transaction" label="iii) Bank Draft /Transaction No.__________ dated ___________ of ₹___________"><Input/></Form.Item>

                        <p className="mt-4"><Text strong>The following documents will be required at the closing time of course in CD /Pen-Drive:</Text></p>
                        <p>(1) Name, address, phone, fax etc. of the sponsoring agency (2) List of internal and external faculty / experts with address (3) List of the participants with full address (5) Time table copy, (6) Soft / hard copy of the group-photo.</p>
                        
                        <hr className="my-8" />
                        
                        <Row gutter={16} className="mt-8">
                            <Col span={12}>
                                <p>Signature of the Course Coordinator (with date)</p>
                                <Form.Item name="coordinator_extn" label="Extn. (O)"><Input/></Form.Item>
                                <Form.Item name="coordinator_mobile" label="Mobile"><Input/></Form.Item>
                                <Form.Item name="coordinator_email" label="Email"><Input/></Form.Item>
                            </Col>
                            <Col span={12}>
                                <p>Signature of Head of the Deptt./Centre (with date & stamp)</p>
                            </Col>
                        </Row>

                        <Title level={5} className="mt-8 border-t pt-4">Endorsement by CEC Office, I.I.T. Roorkee</Title>
                        <p>The above request is in accordance with the norms.</p>
                        <p className="text-right">Recommended /Not Recommended</p>
                        <Row gutter={16} className="text-center mt-8">
                            <Col span={8}><p>...........................</p><p>Dealing Asstt.</p></Col>
                            <Col span={8}><p>...........................</p><p>Sr. Superintendent, CEC</p></Col>
                            <Col span={8}><p>...........................</p><p>Coordinator, CEC</p></Col>
                        </Row>

                        <Title level={5} className="mt-8 border-t pt-4">Endorsement by SRIC Office, I.I.T. Roorkee</Title>
                        <p>The above request is in accordance with the laid down norms.</p>
                        <div className="border p-4 mt-4 w-1/3 float-right">
                           <Form.Item name="sric_course_no" label="Course No." className="mb-0"><Input/></Form.Item>
                           <Form.Item name="sric_dated" label="Dated" className="mb-0"><DatePicker style={{width: '100%'}} /></Form.Item>
                        </div>
                        <div className="clear-both"></div>
                        <p className="text-right mt-4">Approved/Not Approved</p>
                         <Row gutter={16} className="text-center mt-8">
                            <Col span={8}><p>...........................</p><p>D.A./Supdt.</p></Col>
                            <Col span={8}><p>...........................</p><p>Asstt. Registrar/Dy. Registrar (SRIC)</p></Col>
                            <Col span={8}><p>...........................</p><p>Dean, SRIC</p></Col>
                        </Row>
                        
                        <p className="mt-8"><Text strong>Copy after approval to:</Text></p>
                        <p>(1) Course Coordinator (2) Concerned HoD (3) Coordinator, CEC (4) AR SRIC- AC</p>
                    </div>

                    <Form.Item className="mt-8 text-center">
                        <Space>
                            <Button type="primary" htmlType="submit" className='bg-blue-600'>Submit</Button>
                            <Button onClick={() => window.open('https://d1bm918zlnq37v.cloudfront.net/CECTemp/CEC_OldForm/1.pdf', '_blank')}>Download PDF</Button>
                        </Space>
                    </Form.Item>
                </Form>
            </div>
        </div>
    );
};

export default CourseApprovalOldForm; 