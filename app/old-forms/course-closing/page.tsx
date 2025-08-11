"use client";
import React from 'react';
import { Form, Input, Row, Col, Typography, Button, DatePicker, Table, Radio, Checkbox, Space } from 'antd';

const { Title, Text } = Typography;

const CourseClosingForm = () => {
    const [form] = Form.useForm();

    return (
        <div className="font-inter">
            <div className="bg-gray-800 text-white pt-28 pb-6">
                <div className="container mx-auto px-4 text-center">
                    <Title level={3} style={{ color: 'white' }}>CONTINUING EDUCATION CENTRE</Title>
                    <Title level={4} style={{ color: 'white' }}>INDIAN INSTITUTE OF TECHNOLOGY ROORKEE</Title>
                    <p>(w.e.f. 20/11/2018)</p>
                </div>
            </div>

            <div className="container mx-auto p-8 bg-white mt-4">
                <div className="flex justify-end mb-4">
                    <Button type="default" onClick={() => window.open('https://d1bm918zlnq37v.cloudfront.net/CECTemp/CEC_OldForm/4.pdf', '_blank')} className="bg-[#FFAE0E] text-black font-semibold">Download PDF</Button>
                </div>
                <Form layout="vertical" name="course_closing_form">
                    <Title level={4} className="text-center border border-black p-2">PROPOSAL FOR DISTRIBUTION OF HRD/ CONSULTANCY COURSE FUND</Title>

                    <Row gutter={16} className="mt-8">
                        <Col span={12}><Form.Item name="project_no" label="Project No."><Input /></Form.Item></Col>
                        <Col span={12}><Form.Item name="distribution" label="Distribution:"><Radio.Group><Radio value="final">Final</Radio><Radio value="interim">Interim</Radio></Radio.Group></Form.Item></Col>
                    </Row>
                    <Form.Item name="project_title" label="Title of Project:"><Input /></Form.Item>
                    <Row gutter={16}>
                        <Col span={12}><Form.Item name="pi_name" label="PI's Name"><Input /></Form.Item></Col>
                        <Col span={12}><Form.Item name="designation" label="Designation"><Input /></Form.Item></Col>
                    </Row>
                    <Form.Item name="department" label="Department/Centre"><Input /></Form.Item>

                    <Title level={5}>A. PROJECT FUND POSITION</Title>
                    <Form.Item name="gross_amount" label="Gross amount including service tax 'G'"><Input addonAfter="Rs." /></Form.Item>
                    <Form.Item name="less_gst" label="Less GST as applicable 'L' (presently @18%)"><Input addonAfter="Rs." /></Form.Item>
                    <Form.Item name="total_contracted" label="Total Contracted amount 'T' (=G-L)"><Input addonAfter="Rs." /></Form.Item>
                    <Form.Item name="institute_share" label="Amount payable to Institute (Institute Share) 'P' (@20%T)"><Input addonAfter="Rs." /></Form.Item>
                    <Form.Item name="remaining_amount" label="Remaining amount 'F'( = T-P) (@80%T)"><Input addonAfter="Rs." /></Form.Item>
                    <Form.Item name="expenditure_done" label="Expenditure already done 'E'"><Input addonAfter="Rs." /></Form.Item>
                    <Form.Item name="balance_amount" label="Balance Amount for Distribution 'S' = F-E"><Input addonAfter="Rs." /></Form.Item>
                    
                    <Title level={5}>B. DETAILS OF AMOUNT TO BE DISTRIBUTED, 'S'</Title>
                    <Form.Item name="coordination_fee" label="Coordination Fee 'C'(= maximum 20% of 'F')" ><Input addonAfter="Rs." /></Form.Item>
                    <p>Details of distribution among Coordinators, Technical and other staff</p>
                    <p>Mention all the names as per approval even if the amount to be disbursed is NIL.</p>
                    
                    {/* Distribution Details */}
                    <Title level={5}>Distribution Details:</Title>
                    <Row gutter={16}>
                        <Col span={6}>
                            <Form.Item name="distribution_name_1" label="Name">
                                <Input />
                            </Form.Item>
                        </Col>
                        <Col span={6}>
                            <Form.Item name="distribution_designation_1" label="Designation">
                                <Input />
                            </Form.Item>
                        </Col>
                        <Col span={6}>
                            <Form.Item name="distribution_employee_code_1" label="Employee code">
                                <Input />
                            </Form.Item>
                        </Col>
                        <Col span={6}>
                            <Form.Item name="distribution_bank_ac_1" label="Bank A/C No.">
                                <Input />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={16}>
                        <Col span={6}>
                            <Form.Item name="distribution_amount_1" label="Amount Rs.">
                                <Input />
                            </Form.Item>
                        </Col>
                        <Col span={6}>
                            <Form.Item name="distribution_income_tax_1" label="Income tax">
                                <Input />
                            </Form.Item>
                        </Col>
                        <Col span={6}>
                            <Form.Item name="distribution_net_amount_1" label="Net amount">
                                <Input />
                            </Form.Item>
                        </Col>
                        <Col span={6}>
                            <Form.Item name="distribution_token_no_1" label="Token no.">
                                <Input />
                            </Form.Item>
                        </Col>
                    </Row>
                    
                    <Row gutter={16}>
                        <Col span={6}>
                            <Form.Item name="distribution_name_2" label="Name">
                                <Input />
                            </Form.Item>
                        </Col>
                        <Col span={6}>
                            <Form.Item name="distribution_designation_2" label="Designation">
                                <Input />
                            </Form.Item>
                        </Col>
                        <Col span={6}>
                            <Form.Item name="distribution_employee_code_2" label="Employee code">
                                <Input />
                            </Form.Item>
                        </Col>
                        <Col span={6}>
                            <Form.Item name="distribution_bank_ac_2" label="Bank A/C No.">
                                <Input />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={16}>
                        <Col span={6}>
                            <Form.Item name="distribution_amount_2" label="Amount Rs.">
                                <Input />
                            </Form.Item>
                        </Col>
                        <Col span={6}>
                            <Form.Item name="distribution_income_tax_2" label="Income tax">
                                <Input />
                            </Form.Item>
                        </Col>
                        <Col span={6}>
                            <Form.Item name="distribution_net_amount_2" label="Net amount">
                                <Input />
                            </Form.Item>
                        </Col>
                        <Col span={6}>
                            <Form.Item name="distribution_token_no_2" label="Token no.">
                                <Input />
                            </Form.Item>
                        </Col>
                    </Row>
                    
                    <Row gutter={16}>
                        <Col span={6}>
                            <Form.Item name="distribution_name_3" label="Name">
                                <Input />
                            </Form.Item>
                        </Col>
                        <Col span={6}>
                            <Form.Item name="distribution_designation_3" label="Designation">
                                <Input />
                            </Form.Item>
                        </Col>
                        <Col span={6}>
                            <Form.Item name="distribution_employee_code_3" label="Employee code">
                                <Input />
                            </Form.Item>
                        </Col>
                        <Col span={6}>
                            <Form.Item name="distribution_bank_ac_3" label="Bank A/C No.">
                                <Input />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={16}>
                        <Col span={6}>
                            <Form.Item name="distribution_amount_3" label="Amount Rs.">
                                <Input />
                            </Form.Item>
                        </Col>
                        <Col span={6}>
                            <Form.Item name="distribution_income_tax_3" label="Income tax">
                                <Input />
                            </Form.Item>
                        </Col>
                        <Col span={6}>
                            <Form.Item name="distribution_net_amount_3" label="Net amount">
                                <Input />
                            </Form.Item>
                        </Col>
                        <Col span={6}>
                            <Form.Item name="distribution_token_no_3" label="Token no.">
                                <Input />
                            </Form.Item>
                        </Col>
                    </Row>
                    
                    <Form.Item name="remaining_amount_ddf" label="Remaining amount (if any) to DDF of CEC"><Input addonAfter="Rs." /></Form.Item>
                    
                    <Text strong>Certified that</Text>
                    <Form.Item name="certify_a" valuePropName='checked'><Checkbox>(a) The amount distributed is within the prescribed limit for each individual.</Checkbox></Form.Item>
                    <Form.Item name="certify_b1" valuePropName='checked'><Checkbox>(b1) This is interim distribution and the percentage of amount of work done against the consultancy project is not less than the corresponding percentage of the consultancy fee being distributed now.</Checkbox></Form.Item>
                    <Form.Item name="certify_b2" valuePropName='checked'><Checkbox>(b2) This is final distribution and that the work has been completed. The final report has been sent vide letter No. __________ Dated __________ (Copy enclosed)</Checkbox></Form.Item>
                    
                    <Text strong>The following documents will be required at the closing time of the course in CD/Pen-Drive:</Text>
                    <ol className="list-decimal pl-5">
                        <li>Name and address, phone, fax etc. of the sponsoring agency.</li>
                        <li>List of the internal and outside faculty/experts with address</li>
                        <li>List of the participants with full address.</li>
                        <li>Time Table copy</li>
                        <li>Copy of the group-photo.</li>
                    </ol>

                    <Row justify="end" className="mt-8">
                        <Col>
                           <p>Signature of the Course Coordinator (with date)</p>
                           <Form.Item name="coordinator_extn" label="Extn. (O)"><Input/></Form.Item>
                           <Form.Item name="coordinator_mobile" label="Mobile"><Input/></Form.Item>
                           <Form.Item name="coordinator_email" label="Email :"><Input/></Form.Item>
                        </Col>
                    </Row>
                    <p className="text-right font-bold">P.T.O.</p>
                    
                    {/* Page 2 */}
                    <div className="mt-8 pt-8 border-t-2">
                        <Title level={4} className="text-center">Endorsement by CEC /SRIC Office, I.I.T. Roorkee</Title>
                        <p>The above is submitted for approval as recommended by Course Coordinator</p>
                        
                        <Row justify="space-between" className="mt-4">
                            <Col><p>Recommended/Not Recommended</p></Col>
                            <Col><p>Approved/Not Approved</p></Col>
                        </Row>

                        <Row justify="space-between" className="mt-8 text-center">
                            <Col span={4}><p>....................</p><p>D.A. /Sr.Supdt. C.E.C.</p></Col>
                            <Col span={4}><p>....................</p><p>Coordinator, CEC</p></Col>
                            <Col span={4}><p>....................</p><p>D.A. /Supdt. SRIC</p></Col>
                            <Col span={4}><p>....................</p><p>A.R./Dy. Registrar (SRIC)</p></Col>
                            <Col span={4}><p>....................</p><p>Dean, SRIC</p></Col>
                        </Row>

                        <p className="mt-8">For distribution of total Institute share into IDF/CEC Account . DDF, PDF and incentive to staff, SWF etc. on getting full payment only at the time of closing the project (on final distribution only):</p>

                        <Form.Item name="total_institute_share" label="Total Institute Share deducted (P)"><Input addonAfter="Rs." /></Form.Item>
                        <Row gutter={16} align="middle"><Col span={10}>(a) RDF (CEC Account ) [CED-IDF-001]</Col><Col span={6}>50% of P</Col><Col span={8}><Input name="rdf_50_percent" addonAfter="Rs." /></Col></Row>
                        <Row gutter={16} align="middle"><Col span={10}>(b) DDF of CEC [CEC-DDF-001]</Col><Col span={6}>15% of P</Col><Col span={8}><Input name="ddf_15_percent" addonAfter="Rs." /></Col></Row>
                        <Row gutter={16} align="middle"><Col span={10}>(c) Electricity Charges [CEC-DDF-001]</Col><Col span={6}>5% of P</Col><Col span={8}><Input name="electricity_5_percent" addonAfter="Rs." /></Col></Row>
                        <Row gutter={16} align="middle"><Col span={10}>(d) PDF</Col><Col span={6}>25 % of P</Col><Col span={8}><Input name="pdf_25_percent" addonAfter="Rs." /></Col></Row>
                        <Form.Item name="pdf_dr_1" label="(i) PDF of Dr. "><Input addonAfter="Rs." /></Form.Item>
                        <Form.Item name="pdf_dr_2" label="(ii) PDF of Dr. "><Input addonAfter="Rs." /></Form.Item>
                        <Form.Item name="pdf_dr_3" label="(iii) PDF of Dr. "><Input addonAfter="Rs." /></Form.Item>
                        <Form.Item name="pdf_total" label="Total"><Input addonAfter="Rs." /></Form.Item>
                        
                        <Form.Item name="incentive_distribution" label="Distribution of incentive to office staff and SWF etc. ...5.% etc. ........ of P"><Input addonBefore="Rs." /></Form.Item>
                        <Row gutter={16} align="middle"><Col span={10}>(i) Staff Welfare Fund</Col><Col span={6}>(5%)</Col><Col span={8}><Input name="staff_welfare_5_percent" addonAfter="Rs." /></Col></Row>
                        <Row gutter={16} align="middle"><Col span={10}>(ii) Departmental Office</Col><Col span={6}>(20%)</Col><Col span={8}><Input name="departmental_office_20_percent" addonAfter="Rs." /></Col></Row>
                        <Row gutter={16} align="middle"><Col span={10}>(iii) CEC Staff</Col><Col span={6}>(30%)</Col><Col span={8}><Input name="cec_staff_30_percent" addonAfter="Rs." /></Col></Row>
                        <Row gutter={16} align="middle"><Col span={10}>(iv) Fund for Community Activities</Col><Col span={6}>(10%)</Col><Col span={8}><Input name="community_activities_10_percent" addonAfter="Rs." /></Col></Row>
                        <Row gutter={16} align="middle"><Col span={10}>(v) Central Administrative Fund</Col><Col span={6}>(35%)</Col><Col span={8}><Input name="central_admin_35_percent" addonAfter="Rs." /></Col></Row>

                        <p className="text-right mt-8">(Signature of Course Coordinator)</p>

                        <Row justify="space-between" className="mt-8">
                            <Col><Form.Item name="cec_number">No. CEC/</Form.Item></Col>
                            <Col><Form.Item name="cec_dated">Dated:</Form.Item></Col>
                        </Row>

                        <p className="mt-8">Copy forwarded for taking further action to:</p>
                        <ol className="list-decimal pl-5">
                           <li>Professor & Head</li>
                           <li>Principal Investigator</li>
                           <li>Professor-in-Charge (Finance) O.S. Pay roll for information and n.a. please</li>
                           <li>Section In charge, CEC</li>
                           <li>Distribution Folder</li>
                        </ol>
                        <p className="text-right mt-8">Coordinator, CEC</p>
                    </div>

                    <Form.Item className="mt-8 text-center">
                        <Button type="primary" htmlType="submit" className='bg-blue-600' onClick={async () => {
                            try {
                                const values = await form.validateFields();
                                
                                // Import the configuration mapping function
                                const { mapCourseClosingOldDataToConfig } = await import('../../api/generate-pdf/course-closing-old-config');
                                
                                // Create the form configuration
                                const formConfig = mapCourseClosingOldDataToConfig(values);
                                
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
                                a.download = 'course-closing-old-form.pdf';
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

export default CourseClosingForm;
 