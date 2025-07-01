"use client";
import React from 'react';
import { Form, Input, DatePicker, InputNumber, Row, Col, Typography, Button, Upload, Space } from 'antd';
import { UploadOutlined } from '@ant-design/icons';

const { Text } = Typography;
const { RangePicker } = DatePicker;
const { TextArea } = Input;

const CourseInvoiceGenerationOpenForm = () => {
    
    const normFile = (e: any) => {
        if (Array.isArray(e)) {
          return e;
        }
        return e?.fileList;
    };

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
                    <Button type="default" onClick={() => window.open('https://d1bm918zlnq37v.cloudfront.net/CECTemp/CEC_NewForm/5.pdf', '_blank')} className="bg-[#FFAE0E] text-black font-semibold">Download PDF</Button>
                </div>
                <Form layout="vertical" name="invoice_generation_open">
                    <Row justify="space-between" align="middle">
                        <Col>
                            <Text strong>CEC-04</Text>
                        </Col>
                        <Col>
                            <Form.Item name="dated" label="Dated" className="mb-0">
                                <DatePicker />
                            </Form.Item>
                        </Col>
                    </Row>
                    
                    {/* Note */}
                    <div className="bg-yellow-200 text-yellow-800 p-4 rounded-md my-6 border border-yellow-400">
                        <p><strong>Note:</strong> Please do not delete any item in the form, provide details as applicable, wherever information is not available mention N.A. The form may need to be sent back for corrections, if any item is changed or deleted.</p>
                    </div>
                    
                    <h2 className="text-xl font-bold text-center mb-4">Request for Course Invoice Generation (Open Participation course)</h2>
                    
                    <div style={{ border: '1px solid #000' }}>
                        {/* Table Header */}
                        <Row>
                            <Col span={2} style={{ borderRight: '1px solid #000', padding: '8px', textAlign: 'center' }}><Text strong>S. No.</Text></Col>
                            <Col span={14} style={{ borderRight: '1px solid #000', padding: '8px', textAlign: 'center' }}><Text strong>Item</Text></Col>
                            <Col span={8} style={{ padding: '8px', textAlign: 'center' }}><Text strong>Details</Text></Col>
                        </Row>
                        
                        {/* Row 1 */}
                        <Row style={{ borderTop: '1px solid #000' }}>
                            <Col span={2} style={{ borderRight: '1px solid #000', padding: '8px', textAlign: 'center' }}><Text>1.</Text></Col>
                            <Col span={14} style={{ borderRight: '1px solid #000', padding: '8px' }}>
                                <Text>Name and address of the Program Partner</Text><br/>
                                <Text>GST No. of the Program Partner</Text>
                            </Col>
                            <Col span={8} style={{ padding: '8px' }}>
                                <Form.Item name="partner_details" className="mb-0"><TextArea autoSize={{ minRows: 3 }} /></Form.Item>
                            </Col>
                        </Row>
                        
                        {/* Row 2 */}
                        <Row style={{ borderTop: '1px solid #000' }}>
                            <Col span={2} style={{ borderRight: '1px solid #000', padding: '8px', textAlign: 'center' }}><Text>2.</Text></Col>
                            <Col span={22} style={{ padding: '8px' }}>
                                <Form.Item label="(i) Course Code:" name="course_code" labelCol={{span: 24}} wrapperCol={{span: 24}} className="mb-2"><Input /></Form.Item>
                                <Form.Item label="(ii) Course Name:" name="course_name" labelCol={{span: 24}} wrapperCol={{span: 24}} className="mb-2"><Input /></Form.Item>
                                <Form.Item label="(iii) Batch No.:" name="batch_no" labelCol={{span: 24}} wrapperCol={{span: 24}} className="mb-2"><Input /></Form.Item>
                                <Form.Item label="(iv) Duration (from - To)" name="duration" labelCol={{span: 24}} wrapperCol={{span: 24}} className="mb-2"><RangePicker style={{width: '100%'}} /></Form.Item>
                                <Form.Item label="(v) Instalment No." name="instalment_no" labelCol={{span: 24}} wrapperCol={{span: 24}} className="mb-2"><Input /></Form.Item>
                                <Form.Item label="(vi) Fee Per Participant" name="fee_per_participant" labelCol={{span: 24}} wrapperCol={{span: 24}} className="mb-0"><Input/></Form.Item>
                            </Col>
                        </Row>
                        
                        {/* Row 3 */}
                        <Row style={{ borderTop: '1px solid #000' }}>
                            <Col span={2} style={{ borderRight: '1px solid #000', padding: '8px', textAlign: 'center' }}><Text>3.</Text></Col>
                            <Col span={14} style={{ borderRight: '1px solid #000', padding: '8px' }}>
                                <div className="flex items-center">
                                    <Text>Total Fee collected (by Program Partner/SRIC-IITR) for</Text>
                                    <Form.Item name="num_students" noStyle><Input style={{width: 50, margin: '0 5px'}} /></Form.Item>
                                    <Text>Students (including GST)</Text>
                                </div>
                                <Text strong>Please attach list of the participants with fee details</Text>
                                <Form.Item name="participants_list" valuePropName="fileList" getValueFromEvent={normFile} noStyle>
                                    <Upload >
                                        <Button icon={<UploadOutlined />}>Attach List</Button>
                                    </Upload>
                                </Form.Item>
                            </Col>
                            <Col span={8} style={{ padding: '8px' }}>
                                <Form.Item name="total_fee_collected_amount" className="mb-0"><InputNumber addonBefore="Rs." style={{ width: '100%' }} /></Form.Item>
                            </Col>
                        </Row>
                        
                        {/* Row 4 */}
                        <Row style={{ borderTop: '1px solid #000' }}>
                            <Col span={2} style={{ borderRight: '1px solid #000', padding: '8px', textAlign: 'center' }}><Text>4.</Text></Col>
                            <Col span={14} style={{ borderRight: '1px solid #000', padding: '8px' }}>
                                <div className="flex items-center">
                                  <Text>IITR Fee Component (</Text>
                                  <Form.Item name="iitr_fee_percent" noStyle><Input style={{width: 50, margin: '0 5px'}} /></Form.Item>
                                  <Text>%) of fee receipt in (3) above</Text>
                                </div>
                            </Col>
                            <Col span={8} style={{ padding: '8px' }}>
                                <Form.Item name="iitr_fee_amount" className="mb-0"><InputNumber addonBefore="Rs." style={{ width: '100%' }} /></Form.Item>
                            </Col>
                        </Row>
                        
                        {/* Row 5 */}
                        <Row style={{ borderTop: '1px solid #000' }}>
                            <Col span={2} style={{ borderRight: '1px solid #000', padding: '8px', textAlign: 'center' }}><Text>5.</Text></Col>
                            <Col span={14} style={{ borderRight: '1px solid #000', padding: '8px' }}>
                                <Text>Total Invoice Amount</Text>
                            </Col>
                            <Col span={8} style={{ padding: '8px' }}>
                                <Form.Item name="total_invoice_amount" className="mb-0"><InputNumber addonBefore="Rs." style={{ width: '100%' }} /></Form.Item>
                            </Col>
                        </Row>
                    </div>
                    
                    <Form.Item label="Total invoice amount in words" name="total_invoice_amount_words" className="mt-4">
                        <Input addonBefore="Rupees" />
                    </Form.Item>
                    
                    <div className="mt-8">
                        <Text>Certified that the particulars given above are true and correct.</Text>
                    </div>
                    
                    <Row justify="end" className="mt-8">
                        <Col>
                           <p>___________________</p>
                           <p>Prof.</p>
                           <p>Course Coordinator (s)</p>
                        </Col>
                    </Row>
                    
                     <div className="mt-16">
                        <Text>Forwarded to Dean SRIC Office</Text>
                    </div>
                    
                    <Row justify="end" className="mt-8">
                        <Col className="text-center">
                            <Text strong>Coordinator</Text><br/>
                            <Text strong>CEC IIT Roorkee</Text>
                        </Col>
                    </Row>

                    <div className="mt-4">
                        <p>Coordinator, CEC</p>
                    </div>

                    <Form.Item className="mt-8 text-center">
                        <Button type="primary" htmlType="submit" className='bg-blue-600'>Submit & Download Application</Button>
                    </Form.Item>
                </Form>
            </div>
        </div>
    );
};

export default CourseInvoiceGenerationOpenForm; 