"use client";
import React from 'react';
import { Form, Input, InputNumber, Row, Col, Typography, Button, Table, DatePicker, Space } from 'antd';

const { Text, Title } = Typography;

const TALabStaffForm = () => {
    const [form] = Form.useForm();

    const paymentColumns = [
        { title: 'S.No.', dataIndex: 'sno', key: 'sno', render: (text: string, record: any, index: number) => index + 1 },
        { title: 'Name', dataIndex: 'name', key: 'name', render: () => <Input /> },
        { title: 'Teaching Assistant/Technical Assistant/Lab Staff *', dataIndex: 'role', key: 'role', render: () => <Input /> },
        { title: 'Date (Duration)', dataIndex: 'date', key: 'date', render: () => <DatePicker.RangePicker /> },
        { title: 'Total Hours', dataIndex: 'totalHours', key: 'totalHours', render: () => <InputNumber /> },
        { title: 'Rate per hour', dataIndex: 'ratePerHour', key: 'ratePerHour', render: () => <InputNumber /> },
        { title: 'Amount Claimed', dataIndex: 'amountClaimed', key: 'amountClaimed', render: () => <InputNumber /> },
    ];

    const paymentData = [
        { key: '1' }, { key: '2' }, { key: '3' }, { key: '4' },
    ];
    
    const proformaColumns = [
        { title: 'Particular of assignment for Teaching Assistant/Technical Assistant/Lab Staff', dataIndex: 'particulars', key: 'particulars', render: () => <Input.TextArea /> },
        { title: 'Date (Duration)', dataIndex: 'date', key: 'date', render: () => <DatePicker.RangePicker /> },
        { title: 'Total Hours', dataIndex: 'totalHours', key: 'totalHours', render: () => <InputNumber /> },
        { title: 'Rate per hour', dataIndex: 'ratePerHour', key: 'ratePerHour', render: () => <InputNumber /> },
        { title: 'Amount Claimed', dataIndex: 'amountClaimed', key: 'amountClaimed', render: () => <InputNumber /> },
    ];
    
    const proformaData = [ {key: '1'} ];

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
                    <Button type="default" onClick={() => window.open('https://d1bm918zlnq37v.cloudfront.net/CECTemp/CEC_NewForm/8.pdf', '_blank')} className="bg-[#FFAE0E] text-black font-semibold">Download PDF</Button>
                </div>
                 {/* Form 1: Payment Form */}
                <Form layout="vertical" name="ta_lab_staff_payment_form">
                    <Row justify="end">
                        <Col><Text strong>CEC-07</Text></Col>
                    </Row>
                    <div className="bg-yellow-200 text-yellow-800 p-4 rounded-md my-6 border border-yellow-400">
                        <p><strong>Note:</strong> Please do not delete any item in the form, provide details as applicable, wherever information is not available mention N.A. The form may need to be sent back for corrections, if any item is changed or deleted.</p>
                    </div>
                    <Title level={4} className="text-center">FORM FOR PAYMENT FOR TEACHING ASSISTANT/TECHNICAL ASSISTANT/LAB STAFF</Title>
                    
                    <Form.Item name="course_no" label="Course No. :"><Input /></Form.Item>
                    <Form.Item name="batch_no" label="Batch No. :"><Input /></Form.Item>
                    <Form.Item name="course_name_dates" label="Course Name & Dates:"><Input /></Form.Item>
                    <Form.Item name="coordinator_name" label="Name of the Coordinator:"><Input /></Form.Item>
                    <Form.Item name="ta_details" label="Name and details of Teaching Assistant/Technical Assistant/Lab Staff"><Input.TextArea /></Form.Item>

                    <Table columns={paymentColumns} dataSource={paymentData} pagination={false} bordered className="mb-4" />
                    
                    <Row justify="end" className="mt-8">
                        <Col><p className="font-bold">Signature of the Course Coordinator</p></Col>
                    </Row>
                    
                    <div className="mt-4">
                        <Text strong>*</Text> The course coordinator and instructors may engage Institute Students (who may or may not be getting fellowship/assistantship) A maximum payment of Rs 5000 per hour, with total number of hours for which the payment can be made equal to number of the lecture hours in a course. Course Coordinator can also engage TA for the maximum of 20% of total number of the lecture hours in a course.
                    </div>
                </Form>
                
                <hr className="my-16" />

                {/* Form 2: Bill Proforma */}
                <Form layout="vertical" name="ta_lab_staff_bill_proforma">
                    <Title level={3} className="text-center">BILL PROFORMA (TA/Lab Staff)</Title>
                     <Row gutter={16}>
                        <Col span={12}>
                            <Form.Item name="proforma_name" label="1. Name :"><Input /></Form.Item>
                            <Form.Item name="proforma_course_name" label="2. Course Name :"><Input /></Form.Item>
                            <Form.Item name="proforma_course_code" label="3. Course Code :"><Input /></Form.Item>
                            <Form.Item name="proforma_course_coordinator" label="4. Course Coordinator :"><Input /></Form.Item>
                            <Form.Item name="proforma_department" label="5. Department :"><Input /></Form.Item>
                        </Col>
                        <Col span={12}>
                            <div className="h-full flex flex-col justify-around">
                                <p>1. Completion of work assigned to him/her. ________________</p>
                                <p>2. Verified and passed for payment. ________________</p>
                                <p>3. Certified the payment is actually due and being made for the first time.</p>
                                <p>4. It is also confirm that the claimant has not been on un authorized absence during the period of above claims.</p>
                                <div className='text-right'>
                                    <p>Course Coordinator</p>
                                    <p>Coordinator, CEC</p>
                                </div>
                            </div>
                        </Col>
                    </Row>
                    
                    <Table columns={proformaColumns} dataSource={proformaData} pagination={false} bordered className="mb-4" />
                    
                    <Row justify="end"><Col><Form.Item name="total_rs" label="Total Rs."><Input /></Form.Item></Col></Row>
                    
                    <Form.Item label="(Rupees .................................................................................... only)" />

                    <Form.Item name="bank_ac_no" label="Bank A/c No.:"><Input /></Form.Item>
                    <Form.Item name="bank_branch" label="Bank and Branch:"><Input /></Form.Item>
                    <Form.Item name="ifsc_code" label="IFSC Code:"><Input /></Form.Item>
                    <Form.Item name="email_id" label="Email ID:"><Input /></Form.Item>
                    <Form.Item name="enroll_no" label="Enroll No.:"><Input /></Form.Item>
                    <Form.Item name="contact_no" label="Contact No. :"><Input /></Form.Item>

                    <Form.Item label="Signature of the claimant (with date)" />
                    
                     <div className="mt-4">
                        <Text strong>*</Text> The course coordinator and instructors may engage Institute Students (who may or may not be getting fellowship/assistantship) A maximum payment of Rs 5000 per hour, with total number of hours for which the payment can be made equal to number of the lecture hours in a course. Course Coordinator can also engage TA for the maximum of 20% of total number of the lecture hours in a course.
                    </div>
                </Form>
                 <Form.Item className="mt-8 text-center">
                    <Button type="primary" htmlType="submit" className='bg-blue-600' onClick={async () => {
                        try {
                            const values = await form.validateFields();
                            
                            // Import the configuration mapping function
                            const { mapTALabStaffDataToConfig } = await import('../../api/generate-pdf/ta-lab-staff-config');
                            
                            // Create the form configuration
                            const formConfig = mapTALabStaffDataToConfig(values);
                            
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
                            a.download = 'ta-lab-staff-form.pdf';
                            document.body.appendChild(a);
                            a.click();
                            window.URL.revokeObjectURL(url);
                            document.body.removeChild(a);
                        } catch (error) {
                            console.error('Error:', error);
                        }
                    }}>Submit & Download Application</Button>
                </Form.Item>
            </div>
        </div>
    );
};

export default TALabStaffForm; 