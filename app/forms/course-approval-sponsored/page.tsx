"use client";
import React from 'react';
import { Form, Input, DatePicker, InputNumber, Radio, Button, Upload, Row, Col, Card, Space, Typography } from 'antd';
import { UploadOutlined, PlusOutlined, DeleteOutlined } from '@ant-design/icons';

const { TextArea } = Input;
const { Title, Text } = Typography;

const CourseApprovalFormSponsored = () => {
    const onFinish = (values: any) => {
        console.log('Received values of form: ', values);
    };

    const normFile = (e: any) => {
        if (Array.isArray(e)) {
          return e;
        }
        return e?.fileList;
    };

    return (
        <div className="font-inter">
            <div className="bg-[#102a43] text-white pt-28 pb-12">
                <div className="container mx-auto px-4">
                    <h1 className="text-3xl font-bold text-center mb-2">CONTINUING EDUCATION CENTRE, IIT ROORKEE</h1>
                    <p className="text-center text-lg mb-4">
                        <a href="https://iitr.ac.in/cec" target="_blank" rel="noopener noreferrer" className="hover:text-[#FFAE0E]">HTTPS://IITR.AC.IN/CEC</a>, CONTD@IITR.AC.IN Ph: 4327
                    </p>
                    <h2 className="text-2xl font-semibold text-center">COURSE APPROVAL FORM FOR SPONSORED COURSES*</h2>
                    <p className="text-center text-sm mt-2">*(Course approval can be taken even without receipt of funds)</p>
                </div>
            </div>
            
            <div className="container mx-auto p-8">
                <div className="flex justify-end mb-4">
                    <Button type="default" onClick={() => window.open('https://d1bm918zlnq37v.cloudfront.net/CECTemp/CEC_NewForm/2.pdf', '_blank')} className="bg-[#FFAE0E] text-black font-semibold">Download PDF</Button>
                </div>
                <div className="bg-yellow-200 text-yellow-800 p-4 rounded-md mb-6 border border-yellow-400">
                    <p><strong>Note:</strong> Please do not delete any item in the form, provide details as applicable, wherever information is not available mention N.A. The form may need to be sent back for corrections if any item is changed or deleted.</p>
                </div>

                <Form name="course_approval_sponsored" onFinish={onFinish} layout="vertical" initialValues={{ instructors: [{}] }}>
                    <Card title="1. Course Coordinator/PI Details" className="mb-6">
                        <Row gutter={24}>
                            <Col span={8}>
                                <Form.Item name="courseCoordinator" label="Name of the Course Coordinator/PI" rules={[{ required: true }]}>
                                    <Input />
                                </Form.Item>
                            </Col>
                            <Col span={8}>
                                <Form.Item name="coordinatorDesignation" label="Designation" rules={[{ required: true }]}>
                                    <Input />
                                </Form.Item>
                            </Col>
                            <Col span={8}>
                                <Form.Item name="coordinatorDept" label="Deptt./Centre" rules={[{ required: true }]}>
                                    <Input />
                                </Form.Item>
                            </Col>
                        </Row>
                    </Card>
                
                    <Card title="Co-coordinator (I)/Co-PI, if any" className="mb-6">
                        <Row gutter={24}>
                            <Col span={8}><Form.Item name="cocoordinator1Name" label="(i) Name"><Input /></Form.Item></Col>
                            <Col span={8}><Form.Item name="cocoordinator1Designation" label="Designation"><Input /></Form.Item></Col>
                            <Col span={8}><Form.Item name="cocoordinator1Dept" label="Deptt./Centre"><Input /></Form.Item></Col>
                        </Row>
                         <Row gutter={24}>
                            <Col span={8}><Form.Item name="cocoordinator2Name" label="(ii) Name"><Input /></Form.Item></Col>
                            <Col span={8}><Form.Item name="cocoordinator2Designation" label="Designation"><Input /></Form.Item></Col>
                            <Col span={8}><Form.Item name="cocoordinator2Dept" label="Deptt./Centre"><Input /></Form.Item></Col>
                        </Row>
                    </Card>

                    <Form.Item name="courseTitle" label="2. Title of the Course" rules={[{ required: true }]}>
                        <Input />
                    </Form.Item>

                    <Form.Item name="batchNo" label="3. Batch No. of the Course" rules={[{ required: true }]}>
                        <Input />
                    </Form.Item>
                    
                    <Form.Item name="sponsorshipType" label="4. Type of Sponsorship" rules={[{ required: true }]}>
                        <Radio.Group>
                            <Radio value="private">Private Sector</Radio>
                            <Radio value="govt">Govt.</Radio>
                            <Radio value="public">Public</Radio>
                            <Radio value="foreign">Foreign Agency</Radio>
                            <Radio value="others">Others</Radio>
                        </Radio.Group>
                    </Form.Item>
                    <Form.Item name="sponsorshipOther" label="If Others, please specify">
                        <Input />
                    </Form.Item>

                    <Form.Item name="sponsorDetails" label="5. Name and Address of Sponsor's with GST Details">
                        <TextArea rows={3} />
                    </Form.Item>
                    
                    <Form.Item name="gstDetails" label="6. GST details" valuePropName="fileList" getValueFromEvent={normFile}>
                        <Upload> <Button icon={<UploadOutlined />}>Attach Copy</Button> </Upload>
                    </Form.Item>

                    <Form.Item name="paymentTerms" label="7. Payment Terms" rules={[{ required: true }]}>
                        <Radio.Group>
                            <Radio value="full">Full</Radio>
                            <Radio value="part">Part</Radio>
                            <Radio value="after_completion">After Completion of the course</Radio>
                        </Radio.Group>
                    </Form.Item>
                    
                    <Row gutter={24}>
                        <Col span={12}>
                            <Form.Item name="commencementDate" label="8. Date of Commencement" rules={[{ required: true }]}>
                                <DatePicker className="w-full" />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item name="completionDate" label="Expected date of Completion" rules={[{ required: true }]}>
                                <DatePicker className="w-full" />
                            </Form.Item>
                        </Col>
                    </Row>
                    
                    <Form.Item label="9. Duration">
                        <Space.Compact>
                           <Form.Item name={['duration', 'weeks']} noStyle><InputNumber placeholder="Weeks" /></Form.Item>
                           <Form.Item name={['duration', 'hours']} noStyle><InputNumber placeholder="Hours of Training" /></Form.Item>
                        </Space.Compact>
                    </Form.Item>

                    <Form.Item name="modeOfDelivery" label="10. Mode of delivery" rules={[{ required: true }]}>
                         <Radio.Group>
                            <Radio value="classroom">Class room</Radio>
                            <Radio value="online">Online</Radio>
                            <Radio value="self_paced">Self-paced</Radio>
                            <Radio value="hybrid">Hybrid</Radio>
                        </Radio.Group>
                    </Form.Item>

                    <Form.Item name="expectedParticipants" label="11. Expected no. of Participants" rules={[{ required: true, type: 'number' }]}>
                        <InputNumber min={1} className="w-full"/>
                    </Form.Item>

                    <Form.Item name="scheduleAttached" label="12. Copy of Schedule attached:" valuePropName="fileList" getValueFromEvent={normFile}>
                        <Upload><Button icon={<UploadOutlined />}>Attach Schedule</Button></Upload>
                    </Form.Item>
                    
                    <Form.Item name="proposedBudget" label="13. Proposed budget for the course" valuePropName="fileList" getValueFromEvent={normFile}>
                        <Upload><Button icon={<UploadOutlined />}>Attach Budget</Button></Upload>
                    </Form.Item>
                    
                    <Form.Item name="mouCopy" label="14. Copy of MoU/Agreement, if any" valuePropName="fileList" getValueFromEvent={normFile}>
                        <Upload><Button icon={<UploadOutlined />}>Attach MoU/Agreement</Button></Upload>
                    </Form.Item>

                    <Card title="15. Details of Instructor/experts, if any" className="mb-6">
                        <Form.List name="instructors">
                            {(fields, { add, remove }) => (
                            <>
                                {fields.map(({ key, name, ...restField }) => (
                                <Row key={key} gutter={16} align="middle">
                                    <Col span={6}><Form.Item {...restField} name={[name, 'name']}><Input placeholder="Name of faculty" /></Form.Item></Col>
                                    <Col span={6}><Form.Item {...restField} name={[name, 'designation']}><Input placeholder="Designation" /></Form.Item></Col>
                                    <Col span={6}><Form.Item {...restField} name={[name, 'employeeNo']}><Input placeholder="Employees No." /></Form.Item></Col>
                                    <Col span={5}><Form.Item {...restField} name={[name, 'department']}><Input placeholder="Department/Centre" /></Form.Item></Col>
                                    <Col span={1}><DeleteOutlined onClick={() => remove(name)} /></Col>
                                </Row>
                                ))}
                                <Form.Item><Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>Add Instructor/Expert</Button></Form.Item>
                            </>
                            )}
                        </Form.List>
                    </Card>

                    <Card title="16. Other relevant information" className="mb-6">
                        <Form.Item name="correspondence" label="i) Correspondence with sponsor (attach sheet, if necessary)" valuePropName="fileList" getValueFromEvent={normFile}>
                             <Upload><Button icon={<UploadOutlined />}>Attach Correspondence</Button></Upload>
                        </Form.Item>
                         <Form.Item name="specialApproval" label="ii) Request letter for special approval, if any" valuePropName="fileList" getValueFromEvent={normFile}>
                             <Upload><Button icon={<UploadOutlined />}>Attach Request Letter</Button></Upload>
                        </Form.Item>
                    </Card>

                    <Form.Item className="mt-8 text-center">
                        <Button type="primary" htmlType="submit" size="large" className="bg-blue-600">Submit & Download Application</Button>
                    </Form.Item>
                </Form>
            </div>
        </div>
    );
};

export default CourseApprovalFormSponsored; 