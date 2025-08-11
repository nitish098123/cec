"use client";
import React from 'react';
import { Form, Input, Row, Col, Typography, Button, DatePicker, Table, Radio, Upload, Space } from 'antd';
import { UploadOutlined } from '@ant-design/icons';

const { Text, Title } = Typography;

const CourseApprovalOldForm = () => {
    const [form] = Form.useForm();

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
                <div className="flex justify-end mb-4">
                    <Button type="default" onClick={() => window.open('https://d1bm918zlnq37v.cloudfront.net/CECTemp/CEC_OldForm/1.pdf', '_blank')} className="bg-[#FFAE0E] text-black font-semibold">Download PDF</Button>
                </div>
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
                    <Form.Item name="gst_details" label="5. GST details" valuePropName="fileList" getValueFromEvent={normFile}>
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
                    
                    {/* Faculty Details */}
                    <Title level={5}>Faculty:</Title>
                    <Row gutter={16}>
                        <Col span={6}>
                            <Form.Item name="faculty_name_1" label="Name of faculty">
                                <Input />
                            </Form.Item>
                        </Col>
                        <Col span={6}>
                            <Form.Item name="faculty_designation_1" label="Designation">
                                <Input />
                            </Form.Item>
                        </Col>
                        <Col span={6}>
                            <Form.Item name="faculty_employee_no_1" label="Employees No.">
                                <Input />
                            </Form.Item>
                        </Col>
                        <Col span={6}>
                            <Form.Item name="faculty_department_1" label="Department/Centre">
                                <Input />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Form.Item name="faculty_signature_1" label="Signature">
                        <Input />
                    </Form.Item>
                    
                    <Row gutter={16}>
                        <Col span={6}>
                            <Form.Item name="faculty_name_2" label="Name of faculty">
                                <Input />
                            </Form.Item>
                        </Col>
                        <Col span={6}>
                            <Form.Item name="faculty_designation_2" label="Designation">
                                <Input />
                            </Form.Item>
                        </Col>
                        <Col span={6}>
                            <Form.Item name="faculty_employee_no_2" label="Employees No.">
                                <Input />
                            </Form.Item>
                        </Col>
                        <Col span={6}>
                            <Form.Item name="faculty_department_2" label="Department/Centre">
                                <Input />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Form.Item name="faculty_signature_2" label="Signature">
                        <Input />
                    </Form.Item>
                    
                    {/* Technical Staff Details */}
                    <Title level={5}>Technical Staff:</Title>
                    <Row gutter={16}>
                        <Col span={6}>
                            <Form.Item name="technical_staff_name_1" label="Technical Staff">
                                <Input />
                            </Form.Item>
                        </Col>
                        <Col span={6}>
                            <Form.Item name="technical_staff_designation_1" label="Designation">
                                <Input />
                            </Form.Item>
                        </Col>
                        <Col span={6}>
                            <Form.Item name="technical_staff_employee_no_1" label="Employee No.">
                                <Input />
                            </Form.Item>
                        </Col>
                        <Col span={6}>
                            <Form.Item name="technical_staff_department_1" label="Department / Centre">
                                <Input />
                            </Form.Item>
                        </Col>
                    </Row>
                    
                    <Row gutter={16}>
                        <Col span={6}>
                            <Form.Item name="technical_staff_name_2" label="Technical Staff">
                                <Input />
                            </Form.Item>
                        </Col>
                        <Col span={6}>
                            <Form.Item name="technical_staff_designation_2" label="Designation">
                                <Input />
                            </Form.Item>
                        </Col>
                        <Col span={6}>
                            <Form.Item name="technical_staff_employee_no_2" label="Employee No.">
                                <Input />
                            </Form.Item>
                        </Col>
                        <Col span={6}>
                            <Form.Item name="technical_staff_department_2" label="Department / Centre">
                                <Input />
                            </Form.Item>
                        </Col>
                    </Row>
                    
                    <Title level={5}>8. Budget (should conform to the contract/agreement with the sponsor) :</Title>
                    <Row gutter={16}>
                        <Col span={12}>
                            <Form.Item name="gross_amount" label="1. Gross amount including service Tax = (G) received">
                                <Input addonAfter="Rs." />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item name="less_gst" label="2. Less GST as applicable (presently GST @ 18%) (L)">
                                <Input addonAfter="Rs." />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={16}>
                        <Col span={12}>
                            <Form.Item name="contracted_amount" label="3. (a) Contracted amount T = (G – L)">
                                <Input addonAfter="Rs." />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item name="institute_share" label="(b) Institute Share in the beginning (P) (20% of T)">
                                <Input addonAfter="Rs." />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Form.Item name="honorarium" label="4. Honorarium to outside/internal experts">
                        <Input addonAfter="Rs." />
                    </Form.Item>
                    <Title level={5}>5. Expenses on:</Title>
                    <Row gutter={16}>
                        <Col span={12}>
                            <Form.Item name="expenses_course_design" label="(i) Course design and material development">
                                <Input addonAfter="Rs." />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item name="expenses_registration" label="(ii) Cost of registration course material (stationery, pen pad, bags, Xeroxing, typing etc.)">
                                <Input addonAfter="Rs." />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={16}>
                        <Col span={12}>
                            <Form.Item name="expenses_contingency" label="(iii) Contingency / miscellaneous expenses">
                                <Input addonAfter="Rs." />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item name="expenses_infrastructure" label="(iv) Infrastructure charges including hall and equipment charges">
                                <Input addonAfter="Rs." />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={16}>
                        <Col span={12}>
                            <Form.Item name="expenses_accommodation" label="(v) Accommodation, boarding and lodging">
                                <Input addonAfter="Rs." />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item name="expenses_transportation" label="(vi) Transportation: TA / DA to outside experts/participants">
                                <Input addonAfter="Rs." />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={16}>
                        <Col span={12}>
                            <Form.Item name="expenses_local_travel" label="(vii) Local travel / field trip / tour">
                                <Input addonAfter="Rs." />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item name="expenses_research_staff" label="(viii) Research /Office Staff (if required please specify)">
                                <Input addonAfter="Rs." />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Form.Item name="other_expenses" label="6. If any">
                        <Input addonAfter="Rs." />
                    </Form.Item>
                    
                    <p className="text-right font-bold">P.T.O.</p>

                    <div className="mt-8 pt-8 border-t-2">
                         <Title level={5}>9. Other relevant information (attach sheet, if necessary)</Title>
                         <Form.Item name="correspondence_attachment" label="i) Correspondence with sponsor" valuePropName="fileList" getValueFromEvent={normFile}><Upload><Button icon={<UploadOutlined />}>Attach</Button></Upload></Form.Item>
                         <Form.Item name="approval_letter_attachment" label="ii) Request letter for special approval, if any" valuePropName="fileList" getValueFromEvent={normFile}><Upload><Button icon={<UploadOutlined />}>Attach</Button></Upload></Form.Item>
                         <Form.Item name="bank_draft_transaction" label="iii) Bank Draft /Transaction No.__________ dated ___________ of Rs.___________"><Input/></Form.Item>

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
                        <Button type="primary" htmlType="submit" className='bg-blue-600' onClick={async () => {
                            try {
                                const values = await form.validateFields();
                                
                                // Import the configuration mapping function
                                const { mapCourseApprovalOldDataToConfig } = await import('../../api/generate-pdf/course-approval-old-config');
                                
                                // Create the form configuration
                                const formConfig = mapCourseApprovalOldDataToConfig(values);
                                
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
                                a.download = 'course-approval-old-form.pdf';
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

export default CourseApprovalOldForm; 