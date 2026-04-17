"use client";

import React from "react";
import { Button, Form, Input, Radio, Upload, message } from "antd";
import { UploadOutlined } from "@ant-design/icons";

const { TextArea } = Input;

const normFile = (e: any) => {
  if (Array.isArray(e)) {
    return e;
  }
  return e?.fileList;
};

const OtherFormsPage = () => {
  const [form] = Form.useForm();

  const onFinish = async (values: any) => {
    console.log("Other forms values:", values);
    message.success("Form captured successfully.");
  };

  return (
    <div className="font-inter">
      <div className="bg-[#102a43] text-white pt-28 pb-12">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold text-center mb-2">
            CONTINUING EDUCATION CENTRE, IIT ROORKEE
          </h1>
          <p className="text-center text-lg mb-4">
            A Short Term Course Registration
          </p>
          <p className="text-center text-sm text-gray-200">
            Fill in all required details and submit the form.
          </p>
        </div>
      </div>

      <div className="container mx-auto p-4 md:p-8">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 md:p-8">
          <div className="mb-6 border-b pb-6">
            <h2 className="text-2xl md:text-4xl font-semibold text-[#102a43] mb-4">
              A Short Term Course on Data-Driven Frontiers: Blockchain, Social
              Network and Multimedia
            </h2>
            <p className="text-base md:text-lg">Event Timing: June 1-10, 2025</p>
            <p className="text-base md:text-lg">Contact us at:</p>
            <p className="text-base md:text-lg">
              Dr. Pradumn Kumar Pandey (Course Coordinator)
            </p>
            <p className="text-base md:text-lg">
              Email ID: pradumn.pandey@cs.iitr.ac.in
            </p>
            <p className="text-base md:text-lg">Mob. No. 7409889713</p>
          </div>

          <Form
            form={form}
            layout="vertical"
            onFinish={onFinish}
            className="space-y-2"
          >
            <Form.Item
              label="Name"
              name="name"
              rules={[{ required: true, message: "Please enter your name" }]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Email ID"
              name="email"
              rules={[
                { required: true, message: "Please enter your email" },
                { type: "email", message: "Please enter a valid email" },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Phone Number"
              name="phone"
              rules={[
                { required: true, message: "Please enter your phone number" },
                {
                  pattern: /^[0-9]{10}$/,
                  message: "Please enter a valid 10-digit phone number",
                },
              ]}
            >
              <Input maxLength={10} />
            </Form.Item>

            <Form.Item
              label="Organization"
              name="organization"
              rules={[
                { required: true, message: "Please enter your organization" },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="ID Proof"
              name="idProof"
              valuePropName="fileList"
              getValueFromEvent={normFile}
              rules={[{ required: true, message: "Please upload your ID proof" }]}
            >
              <Upload beforeUpload={() => false} maxCount={1}>
                <Button icon={<UploadOutlined />}>Add file</Button>
              </Upload>
            </Form.Item>

            <div className="border rounded-md p-4 md:p-6 bg-[#fafafa]">
              <h3 className="text-xl font-semibold mb-3">
                Account Details for Payment (Course Fees - Rs 9500 only)
              </h3>
              <p className="text-lg md:text-2xl mb-1">
                Bank Name: <span className="font-bold">PUNJAB NATIONAL BANK</span>
              </p>
              <p className="text-lg md:text-2xl mb-1">
                Branch: <span className="font-bold">IIT ROORKEE</span>
              </p>
              <p className="text-lg md:text-2xl mb-1">
                Account Name:{" "}
                <span className="font-bold">
                  INDUSTRIAL CONSULTANCY, IIT ROORKEE
                </span>
              </p>
              <p className="text-lg md:text-2xl mb-1">
                Account No: <span className="font-bold">4044000100031597</span>
              </p>
              <p className="text-lg md:text-2xl">
                IFSC Code: <span className="font-bold">PUNB0404400</span>
              </p>
            </div>

            <div className="border rounded-md p-4 md:p-6 bg-[#fafafa]">
              <h3 className="text-xl font-semibold mb-1">
                Scan and Pay (Course Fees - Rs 9500 only)
              </h3>
              <p className="text-2xl md:text-5xl font-bold text-center my-6">
                SCAN &amp; PAY USING ANY BHIM UPI APP
              </p>
              <img
                src="https://d1bm918zlnq37v.cloudfront.net/CECTemp/QR.png"
                alt="Payment QR"
                className="mx-auto w-full max-w-[420px]"
              />
            </div>

            <Form.Item
              label="Upload Payment Receipt"
              name="paymentReceipt"
              valuePropName="fileList"
              getValueFromEvent={normFile}
              rules={[
                {
                  required: true,
                  message: "Please upload the payment receipt",
                },
              ]}
            >
              <Upload beforeUpload={() => false} maxCount={1}>
                <Button icon={<UploadOutlined />}>Add file</Button>
              </Upload>
            </Form.Item>

            <Form.Item
              label="If Tax Invoice is required for claiming the registration fees/GST/TDS."
              name="taxInvoiceRequired"
              rules={[{ required: true, message: "Please select one option" }]}
            >
              <Radio.Group>
                <Radio value="no">No</Radio>
                <Radio value="yes">Yes</Radio>
              </Radio.Group>
            </Form.Item>

            <Form.Item label="Any Additional Note (optional)" name="additionalNote">
              <TextArea rows={3} />
            </Form.Item>

            <Form.Item className="pt-2">
              <Button
                htmlType="submit"
                className="bg-[#FFAE0E] text-black font-semibold border-none hover:!bg-[#E5893C] hover:!text-black"
              >
                Submit
              </Button>
            </Form.Item>
          </Form>
          </div>
      </div>
    </div>
  );
};

export default OtherFormsPage;
