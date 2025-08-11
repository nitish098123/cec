"use client";
import React from 'react';
import { Form, Input, DatePicker, InputNumber, Radio, Table, Button, Upload, Row, Col, Card, Space, Typography } from 'antd';
import { UploadOutlined, PlusOutlined, DeleteOutlined } from '@ant-design/icons';

const { RangePicker } = DatePicker;
const { TextArea } = Input;
const { Title } = Typography;

const CourseApprovalFormOpen = () => {
    const onFinish = async (values: any) => {
        // Prepare complete data for PDF - including all form fields (filled and unfilled)
        const payload = {
            // Course Coordinator Information
            courseCoordinator: values.courseCoordinator,
            coordinatorDesignation: values.coordinatorDesignation,
            
            // Co-coordinator Information
            cocoordinator1Name: values.cocoordinator1Name,
            cocoordinator1Dept: values.cocoordinator1Dept,
            cocoordinator1Designation: values.cocoordinator1Designation,
            cocoordinator2Name: values.cocoordinator2Name,
            cocoordinator2Dept: values.cocoordinator2Dept,
            cocoordinator2Designation: values.cocoordinator2Designation,
            
            // Course Details
            courseTitle: values.courseTitle,
            batchNo: values.batchNo,
            programPartner: values.programPartner,
            gstDetails: values.gstDetails,
            paymentTerms: values.paymentTerms,
            commencementDate: values.commencementDate?.format?.('YYYY-MM-DD') || '',
            completionDate: values.completionDate?.format?.('YYYY-MM-DD') || '',
            duration: values.duration,
            modeOfDelivery: values.modeOfDelivery,
            expectedParticipants: values.expectedParticipants,
            scheduleAttached: values.scheduleAttached,
            
            // Course Fee Information
            courseFee: values.courseFee,
            paymentPortal: values.paymentPortal,
            totalFeeReceipt: values.totalFeeReceipt,
            mouReceipts: values.mouReceipts,
            
            // Faculty Details
            faculty: values.faculty || [],
            
            // Additional Information
            eligibility: values.eligibility,
            brochureLink: values.brochureLink,
            certificateCriteria: values.certificateCriteria,
            refundProcess: values.refundProcess,
            otherInfo: values.otherInfo,
            otherInfoAttachment: values.otherInfoAttachment,
            scheduleAttachment: values.scheduleAttachment,
            
            // Lecture and Hands-on Details
            lectures: values.lectures || [],
            hands_on: values.hands_on || [],
        };
        
        try {
            // Import the configuration mapping function
            const { mapFormDataToConfig } = await import('../../api/generate-pdf/course-approval-open-config');
            
            // Create the form configuration
            const formConfig = mapFormDataToConfig(payload);
            
            const res = await fetch('/api/generate-pdf', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    formData: payload,
                    formConfig: formConfig
                }),
            });
            if (!res.ok) throw new Error('Failed to generate PDF');
            const blob = await res.blob();
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = 'course-approval-form.pdf';
            document.body.appendChild(a);
            a.click();
            a.remove();
            window.URL.revokeObjectURL(url);
        } catch (err) {
            console.error('PDF generation error:', err);
            alert('Error generating PDF. Please try again.');
        }
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
                    <h2 className="text-2xl font-semibold text-center">COURSE APPROVAL FORM FOR OPEN PARTICIPATION COURSES*</h2>
                    <p className="text-center text-sm mt-2">*(Course approval can be taken even without receipt of funds)</p>
                </div>
            </div>

            <div className="container mx-auto p-8">
                <div className="flex justify-end mb-4">
                    <Button type="default" onClick={() => window.open('https://d1bm918zlnq37v.cloudfront.net/CECTemp/CEC_NewForm/1.pdf', '_blank')} className="bg-[#FFAE0E] text-black font-semibold">Download PDF</Button>
                </div>
                <div className="bg-yellow-200 text-yellow-800 p-4 rounded-md mb-6 border border-yellow-400">
                    <p><strong>Note:</strong> Please do not delete any item in the form, provide details as applicable, wherever information is not available mention N.A. The form may need to be sent back for corrections if any item is changed or deleted.</p>
                </div>

                <Form name="course_approval" onFinish={onFinish} layout="vertical" initialValues={{ faculty: [{}], lectures: [{}], hands_on: [{}] }}>
                    <Row gutter={24}>
                        <Col span={12}>
                            <Form.Item name="courseCoordinator" label="1. Name of the Course Coordinator/PI" rules={[{ required: true }]}>
                                <Input />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item name="coordinatorDesignation" label="Designation" rules={[{ required: true }]}>
                                <Input />
                            </Form.Item>
                        </Col>
                    </Row>
                    
                    <Card title="2. Co-coordinator (I)/Co-PI, if any" className="mb-6">
                        <Row gutter={24}>
                            <Col span={8}>
                                <Form.Item name="cocoordinator1Name" label="(i) Name">
                                    <Input />
                                </Form.Item>
                            </Col>
                            <Col span={8}>
                                 <Form.Item name="cocoordinator1Dept" label="Deptt./Centre">
                                    <Input />
                                </Form.Item>
                            </Col>
                            <Col span={8}>
                                <Form.Item name="cocoordinator1Designation" label="Designation">
                                    <Input />
                                </Form.Item>
                            </Col>
                        </Row>
                         <Row gutter={24}>
                            <Col span={8}>
                                <Form.Item name="cocoordinator2Name" label="(ii) Name">
                                    <Input />
                                </Form.Item>
                            </Col>
                            <Col span={8}>
                                 <Form.Item name="cocoordinator2Dept" label="Deptt./Centre">
                                    <Input />
                                </Form.Item>
                            </Col>
                            <Col span={8}>
                                <Form.Item name="cocoordinator2Designation" label="Designation">
                                    <Input />
                                </Form.Item>
                            </Col>
                        </Row>
                    </Card>

                    <Form.Item name="courseTitle" label="3. Title of the Course" rules={[{ required: true }]}>
                        <Input />
                    </Form.Item>

                    <Form.Item name="batchNo" label="4. Batch No. of the Course" rules={[{ required: true }]}>
                        <Input />
                    </Form.Item>

                    <Form.Item name="programPartner" label="5. Name and Address of Program Partner with GST Details (if any)">
                        <TextArea rows={3} />
                    </Form.Item>
                    
                    <Form.Item name="gstDetails" label="6. GST details" valuePropName="fileList" getValueFromEvent={normFile}>
                        <Upload>
                            <Button icon={<UploadOutlined />}>Attach Copy</Button>
                        </Upload>
                    </Form.Item>

                    <Form.Item name="paymentTerms" label="7. Payment Terms" rules={[{ required: true }]}>
                        <Radio.Group>
                            <Radio value="before_full">Before completion (Full)</Radio>
                            <Radio value="before_part">Before completion (Part)</Radio>
                            <Radio value="after_full">After Completion (full)</Radio>
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
                            <Form.Item name={['duration', 'months']} noStyle>
                               <InputNumber placeholder="Months" />
                            </Form.Item>
                            <Form.Item name={['duration', 'lectures']} noStyle>
                               <InputNumber placeholder="No. of hours Lectures" />
                            </Form.Item>
                             <Form.Item name={['duration', 'hands_on']} noStyle>
                               <InputNumber placeholder="No. of hours hands on" />
                            </Form.Item>
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

                    <Form.Item name="scheduleAttached" label="12. Copy of Schedule as per attached format in Annex CEC-01-A(i)" valuePropName="checked">
                        <Radio.Group>
                             <Radio value="yes">Yes</Radio>
                        </Radio.Group>
                    </Form.Item>

                    <Card title="13. Course Fee Per participant" className="mb-6">
                         <p>(Average rate per hour @ Rs. 1000/- + GST & maximum fee per hour @Rs.1500/- +GST)</p>
                        <Row gutter={24} className="mt-4">
                            <Col span={12}>
                                <Form.Item name="courseFee" label="Course Fee (Rs.)">
                                    <InputNumber className="w-full"/>
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                 <Form.Item label="Fee with GST @ 18%">
                                    <InputNumber disabled className="w-full"/>
                                </Form.Item>
                            </Col>
                        </Row>
                    </Card>

                    <Form.Item name="paymentPortal" label="14. Payment Portal for Fee Collection" rules={[{ required: true }]}>
                        <Radio.Group>
                            <Radio value="iitr">IITR Portal</Radio>
                            <Radio value="edtech">EdTech Partner Portal</Radio>
                        </Radio.Group>
                    </Form.Item>

                    <Form.Item name="totalFeeReceipt" label="15. Estimated total Fee receipt for the Course [Total expected participants X Fee per participant]">
                        <InputNumber className="w-full" placeholder="in Rs."/>
                    </Form.Item>
                    
                    <Form.Item label="16. IITR Receipts as per MoU">
                         <Space.Compact>
                            <Form.Item name={['mouReceipts', 'percentage']} noStyle>
                               <InputNumber placeholder="%" />
                            </Form.Item>
                            <Form.Item name={['mouReceipts', 'amount']} noStyle>
                               <InputNumber placeholder="in Rs."/>
                            </Form.Item>
                        </Space.Compact>
                    </Form.Item>

                    <Card title="17. Details of faculty/expert, if any" className="mb-6">
                        <Form.List name="faculty">
                            {(fields, { add, remove }) => (
                            <>
                                {fields.map(({ key, name, ...restField }) => (
                                <Row key={key} gutter={16} align="middle">
                                    <Col span={5}><Form.Item {...restField} name={[name, 'name']}><Input placeholder="Name of faculty" /></Form.Item></Col>
                                    <Col span={5}><Form.Item {...restField} name={[name, 'designation']}><Input placeholder="Designation" /></Form.Item></Col>
                                    <Col span={4}><Form.Item {...restField} name={[name, 'employeeNo']}><Input placeholder="Employees No." /></Form.Item></Col>
                                    <Col span={5}><Form.Item {...restField} name={[name, 'department']}><Input placeholder="Department/Centre" /></Form.Item></Col>
                                    <Col span={4}><Form.Item {...restField} name={[name, 'signature']}><Input placeholder="Signature" /></Form.Item></Col>
                                    <Col span={1}><DeleteOutlined onClick={() => remove(name)} /></Col>
                                </Row>
                                ))}
                                <Form.Item>
                                    <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>Add Faculty/Expert</Button>
                                </Form.Item>
                            </>
                            )}
                        </Form.List>
                    </Card>

                    <Form.Item name="eligibility" label="18. Eligibility/screening criteria">
                        <TextArea rows={4} />
                    </Form.Item>

                    <Form.Item name="brochureLink" label="19. Link to portal/course page/copy of brochure">
                        <Input />
                    </Form.Item>
                    
                    <Form.Item name="certificateCriteria" label="20. Criteria for releasing the certificate">
                        <TextArea rows={4} />
                    </Form.Item>

                    <Form.Item name="refundProcess" label="21. In case of refund (course cancellation/dropout), mention the process">
                        <TextArea rows={4} />
                    </Form.Item>

                    <Form.Item name="otherInfo" label="22. Other relevant information">
                         <TextArea rows={4} />
                    </Form.Item>
                    <Form.Item name="otherInfoAttachment" label="Attach sheet (if necessary)" valuePropName="fileList" getValueFromEvent={normFile}>
                         <Upload>
                            <Button icon={<UploadOutlined />}>Attach Sheet</Button>
                        </Upload>
                    </Form.Item>
                    
                    <h3 className="text-xl font-semibold mb-4 mt-8">Annex-CEC-01-A(i) - Course curriculum and course schedule</h3>
                    <Form.Item name="scheduleAttachment" label="Format of the course schedule" valuePropName="fileList" getValueFromEvent={normFile}>
                        <Upload>
                            <Button icon={<UploadOutlined />}>Attach as a separate file</Button>
                        </Upload>
                    </Form.Item>
                    
                    <Card title="(i) Details of Lectures" className="mb-6">
                        <Form.List name="lectures">
                            {(fields, { add, remove }) => (
                            <>
                                {fields.map(({ key, name, ...restField }) => (
                                <Row key={key} gutter={16} align="middle">
                                    <Col span={5}><Form.Item {...restField} name={[name, 'expert']}><Input placeholder="Name of IITR Expert/Industry Expert" /></Form.Item></Col>
                                    <Col span={5}><Form.Item {...restField} name={[name, 'topic']}><Input placeholder="Topic of Lecture" /></Form.Item></Col>
                                    <Col span={4}><Form.Item {...restField} name={[name, 'mode']}><Input placeholder="Mode (Live or offline)" /></Form.Item></Col>
                                    <Col span={4}><Form.Item {...restField} name={[name, 'hours']}><InputNumber placeholder="No. of Hours" className="w-full"/></Form.Item></Col>
                                    <Col span={5}><Form.Item {...restField} name={[name, 'date']}><Input placeholder="Date of Lecture/(Week No.)" /></Form.Item></Col>
                                    <Col span={1}><DeleteOutlined onClick={() => remove(name)} /></Col>
                                </Row>
                                ))}
                                <Form.Item>
                                    <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>Add Lecture</Button>
                                </Form.Item>
                            </>
                            )}
                        </Form.List>
                    </Card>
                    
                     <Card title="(ii) Details of Hands-on/project/assignments/use cases" className="mb-6">
                        <Form.List name="hands_on">
                            {(fields, { add, remove }) => (
                            <>
                                {fields.map(({ key, name, ...restField }) => (
                                <Row key={key} gutter={16} align="middle">
                                    <Col span={6}><Form.Item {...restField} name={[name, 'topic']}><Input placeholder="Topic of Hands-on" /></Form.Item></Col>
                                    <Col span={5}><Form.Item {...restField} name={[name, 'mode']}><Input placeholder="Mode (Live or offline)" /></Form.Item></Col>
                                    <Col span={4}><Form.Item {...restField} name={[name, 'hours']}><InputNumber placeholder="No. of Hours" className="w-full"/></Form.Item></Col>
                                    <Col span={8}><Form.Item {...restField} name={[name, 'date']}><Input placeholder="Date of Hands-on/project/assignments/use cases /(Week No.)" /></Form.Item></Col>
                                    <Col span={1}><DeleteOutlined onClick={() => remove(name)} /></Col>
                                </Row>
                                ))}
                                <Form.Item>
                                    <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>Add Hands-on activity</Button>
                                </Form.Item>
                            </>
                            )}
                        </Form.List>
                    </Card>

                    <div className="mt-8">
                        <p>D.A./Supdt. &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Asstt. Registrar/Dy. Registrar (SRIC) &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Dean, SRIC</p>
                        
                        <p className="mt-8"><b>Copy after approval to:</b></p>
                        <p>(1) Course Coordinator (2) Concerned HoD (3) Coordinator, CEC (4) AR SRIC- AC</p>
                    </div>

                    <p className="text-right mt-8">Dean, SRIC</p>

                    <Form.Item className="mt-12 text-center">
                        <Button type="primary" htmlType="submit" className="bg-[#FFAE0E] text-black font-semibold w-full mt-6">
                            Submit and Download Form
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        </div>
    );
};

export default CourseApprovalFormOpen; 