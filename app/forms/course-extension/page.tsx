"use client";
import React from 'react';
import { Form, Input, Row, Col, Typography, Button, DatePicker, Table, Upload, Space } from 'antd';
import { UploadOutlined } from '@ant-design/icons';

const { Text, Title } = Typography;

const CourseExtensionForm = () => {
    const [form] = Form.useForm();

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



                    <Form.Item className="mt-8 text-center">
                        <Button type="primary" htmlType="submit" className='bg-blue-600' onClick={async () => {
                            try {
                                const values = await form.validateFields();
                                
                                // Import the configuration mapping function
                                const { mapCourseExtensionDataToConfig } = await import('../../api/generate-pdf/course-extension-config');
                                
                                // Create the form configuration
                                const formConfig = mapCourseExtensionDataToConfig(values);
                                
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
                                a.download = 'course-extension-form.pdf';
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

export default CourseExtensionForm; 