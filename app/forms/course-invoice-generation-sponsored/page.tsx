"use client";
import React from 'react';
import { Form, Input, DatePicker, InputNumber, Row, Col, Typography, Button, Space } from 'antd';

const { Text } = Typography;
const { RangePicker } = DatePicker;
const { TextArea } = Input;

const CourseInvoiceGenerationSponsoredForm = () => {

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
                    <Button type="default" onClick={() => window.open('https://d1bm918zlnq37v.cloudfront.net/CECTemp/CEC_NewForm/6.pdf', '_blank')} className="bg-[#FFAE0E] text-black font-semibold">Download PDF</Button>
                </div>
                <Form layout="vertical" name="invoice_generation_sponsored" onFinish={async (values) => {
                    // Prepare complete data for PDF
                    const payload = {
                        sponsoring_agency_details: values.sponsoring_agency_details,
                        course_code: values.course_code,
                        course_name: values.course_name,
                        batch_no: values.batch_no,
                        duration: values.duration,
                        num_participants: values.num_participants,
                        batch_budget: values.batch_budget,
                        total_invoice_amount: values.total_invoice_amount,
                        total_invoice_amount_words: values.total_invoice_amount_words,
                    };
                    
                    try {
                        // Import the configuration mapping function
                        const { mapCourseInvoiceGenerationSponsoredDataToConfig } = await import('../../api/generate-pdf/course-invoice-generation-sponsored-config');
                        
                        // Create the form configuration
                        const formConfig = mapCourseInvoiceGenerationSponsoredDataToConfig(payload);
                        
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
                        a.download = 'course-invoice-generation-sponsored-form.pdf';
                        document.body.appendChild(a);
                        a.click();
                        a.remove();
                        window.URL.revokeObjectURL(url);
                    } catch (err) {
                        console.error('PDF generation error:', err);
                        alert('Error generating PDF. Please try again.');
                    }
                }}>
                    <Row justify="space-between" align="middle">
                        <Col>
                            <Text strong>CEC-05</Text>
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
                    
                    <h2 className="text-xl font-bold text-center mb-4">Request for Course Invoice Generation (Sponsored course)</h2>
                    
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
                                <Text>Name and address of the Sponsoring Agency</Text><br/>
                                <Text>GST No. of the Sponsored</Text>
                            </Col>
                            <Col span={8} style={{ padding: '8px' }}>
                                <Form.Item name="sponsoring_agency_details" className="mb-0"><TextArea autoSize={{ minRows: 3 }} /></Form.Item>
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
                            </Col>
                        </Row>
                        
                        {/* Row 3 */}
                        <Row style={{ borderTop: '1px solid #000' }}>
                            <Col span={2} style={{ borderRight: '1px solid #000', padding: '8px', textAlign: 'center' }}><Text>3.</Text></Col>
                            <Col span={14} style={{ borderRight: '1px solid #000', padding: '8px' }}>
                                <div className="flex items-center">
                                    <Text>Budget for a batch size of</Text>
                                    <Form.Item name="num_participants" noStyle><Input style={{width: 50, margin: '0 5px'}} /></Form.Item>
                                    <Text>Participants (including GST)</Text>
                                </div>
                            </Col>
                            <Col span={8} style={{ padding: '8px' }}>
                                <Form.Item name="batch_budget" className="mb-0"><InputNumber addonBefore="Rs." style={{ width: '100%' }} /></Form.Item>
                            </Col>
                        </Row>
                        
                        {/* Row 4 */}
                        <Row style={{ borderTop: '1px solid #000' }}>
                            <Col span={2} style={{ borderRight: '1px solid #000', padding: '8px', textAlign: 'center' }}><Text>4.</Text></Col>
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

                    <Form.Item className="mt-8 text-center">
                        <Button type="primary" htmlType="submit" className='bg-blue-600'>Submit & Download Application</Button>
                    </Form.Item>
                </Form>
            </div>
        </div>
    );
};

export default CourseInvoiceGenerationSponsoredForm; 