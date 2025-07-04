"use client";
import React from 'react';
import { Form, Input, Row, Col, Typography, Button, DatePicker, Table, Upload, Space } from 'antd';
import { UploadOutlined } from '@ant-design/icons';

const { Text, Title } = Typography;

const CourseExtensionForm = () => {

    const budgetColumns = [
        { title: 'Budget Head / Description', dataIndex: 'description', key: 'description' },
        { title: 'Revised Budgeted Amount', dataIndex: 'amount', key: 'amount', render: () => <Input /> },
    ];

    const budgetData = [
        { key: '1', description: '1. Gross Amount including Service Tax' },
        { key: '2', description: '2. Less- Service Tax' },
        { key: '3', description: '3. Contracted Amount' },
        { key: '4', description: '4. Institute Share (20% of Contracted Amount)' },
        { key: '5', description: '5. Expenditure (Estimated*)' },
        { key: '6', description: '6. Honorarium (Estimated)' },
    ];

    const normFile = (e: any) => {
        if (Array.isArray(e)) {
            return e;
        }
        return e?.fileList;
    };

    return (
        <div className="font-inter">
            {/* Header */}
            <div className="bg-gray-800 pt-28 pb-6 text-white">
                <div className="container mx-auto px-4 text-center">
                    <h1 className="text-3xl font-bold">INDIAN INSTITUTE OF TECHNOLOGY ROORKEE</h1>
                </div>
            </div>

            <div className="container mx-auto p-8">
                <div className="flex justify-end mb-4">
                    <Button type="default" onClick={() => window.open('https://d1bm918zlnq37v.cloudfront.net/CECTemp/CEC_NewForm/11.pdf', '_blank')} className="bg-[#FFAE0E] text-black font-semibold">Download PDF</Button>
                </div>
                <Form layout="vertical" name="course_extension_form">
                    <Row justify="end">
                        <Col><Text strong>SRIC/10</Text></Col>
                    </Row>
                    
                    <Title level={4} className="text-center border border-black p-2">FORM FOR EXTENSION OF TIME / REVISION OF PROJECT AMOUNT</Title>
                    
                    <Form.Item name="project_no" label="1. Project No.: CEC-" className="mt-8"><Input /></Form.Item>
                    <Form.Item name="principal_investigator" label="2. Name and department of Principal Investigator:"><Input /></Form.Item>
                    <Form.Item name="project_title" label="3. Title of the Project:"><Input /></Form.Item>
                    <Form.Item name="sponsor" label="4. Sponsor:"><Input /></Form.Item>

                    <Title level={5}>5. Extension of Time: Expected date of completion</Title>
                    <Row gutter={16}>
                        <Col span={12}><Form.Item name="original_date" label="(a) Original"><DatePicker style={{width: '100%'}} /></Form.Item></Col>
                        <Col span={12}><Form.Item name="revised_date" label="(b) Revised"><DatePicker style={{width: '100%'}} /></Form.Item></Col>
                    </Row>
                    
                    <Title level={5}>6. Revision of Project budget : Contracted Amount :- Nil</Title>
                     <Row gutter={16}>
                        <Col span={12}><Form.Item name="original_budget" label="(a) Original (Rs.)"><Input /></Form.Item></Col>
                        <Col span={12}><Form.Item name="revised_budget" label="(b) Revised (Rs.)"><Input /></Form.Item></Col>
                    </Row>

                    <Table columns={budgetColumns} dataSource={budgetData} pagination={false} bordered className="my-8" />
                    
                    <Form.Item name="reason" label="7. Reason for Extension of Time and /or Revision of amount (correspondence to be attached, if any). To distribute the honorarium and close the course.">
                        <Input.TextArea rows={4}/>
                    </Form.Item>
                    <Form.Item label="Attach Correspondence (if any)" valuePropName="fileList" getValueFromEvent={normFile}>
                        <Upload>
                            <Button icon={<UploadOutlined />}>Attach Correspondence</Button>
                        </Upload>
                    </Form.Item>

                    <div className="text-right mt-16">
                        <p>_________________________</p>
                        <p><Text strong>Signature of Principal Investigator (with date)</Text></p>
                    </div>

                    <div className="mt-16">
                        <Row gutter={16} className="text-center">
                            <Col span={8}><p>...................................</p><p>Dealing Asstt.</p></Col>
                            <Col span={8}><p>...................................</p><p>Superintendent, CEC</p></Col>
                            <Col span={8}><p>...................................</p><p>Coordinator, CEC</p></Col>
                        </Row>
                        <p className="text-center mt-2"><Text strong>CEC Office, IIT Roorkee</Text><span className="float-right"><Text strong>Recommended/Not Recommended</Text></span></p>
                    </div>

                    <div className="mt-16 border-t-2 border-dotted pt-8">
                        <Row gutter={16} className="text-center">
                            <Col span={8}><p>...................................</p><p>Supdt. (SRIC – Admn),</p></Col>
                            <Col span={8}><p>...................................</p><p>AR/DR (SRIC-Admn.),</p></Col>
                            <Col span={8}><p>...................................</p><p>Assoc. Dean (SRIC) / Dean (SRIC)</p></Col>
                        </Row>
                         <p className="text-center mt-2"><Text strong>SRIC Office, IIT Roorkee</Text><span className="float-right"><Text strong>Approved /Not Approved</Text></span></p>
                    </div>

                    <div className="mt-16">
                        <Row>
                            <Col span={12}><p>Copy to: 1.Principal Investigator</p></Col>
                            <Col span={12}><p>2. AR SRIC A/c</p></Col>
                        </Row>
                        <p>C:SRIC/SRICCON/05</p>
                    </div>

                    <Form.Item className="mt-8 text-center">
                        <Button type="primary" htmlType="submit" className='bg-blue-600'>Submit & Download Application</Button>
                    </Form.Item>
                </Form>
            </div>
        </div>
    );
};

export default CourseExtensionForm; 