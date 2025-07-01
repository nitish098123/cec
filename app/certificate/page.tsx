"use client";

import { Form, Input, Button, Image, ConfigProvider } from "antd";
import { useState } from "react";

export default function CertificatePage() {
  const [form] = Form.useForm();
  const [tab, setTab] = useState<"download" | "verify">("download");

  const onFinish = (values: unknown) => {
    console.log("Form Values:", values);
  };
  return (
    <div className="w-full">
      <section className="relative w-full h-[80vh] flex items-center justify-center">
        {/* Background Image */}
        <div
          className="absolute inset-0 bg-[url('/certificate_background.jpeg')] bg-cover bg-center brightness-[0.7]"
          aria-hidden="true"
        ></div>
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent z-10"></div>

        {/* Content */}
        <div className="relative flex items-center z-20">
          <Image
            preview={false}
            alt="IITR Logo"
            src="/IITR_logo.png"
            width="164px"
            height="164px"
            className=""
          />
          <div className="border-l pl-2 text-white">
            <span className="text-2xl">IIT ROORKEE</span>
            <p className="text-4xl">CEC</p>
            <p className="text-4xl">Certificate</p>
          </div>
        </div>
      </section>
      <section className="bg-[#FFFAF1] pb-6">
        <div className="w-full mb-6">
          <div
            className={`flex-grow pt-6 pb-4 cursor-pointer bg-[#FFE3AC] border-b-4 border-[#FFAE0E]`}
          >
            <h2 className="text-2xl font-medium text-center tracking-wide">
              Download Certificate
            </h2>
          </div>
        </div>
        <div className="p-6 max-w-md mx-auto container">
          <Form
            form={form}
            layout="vertical"
            onFinish={onFinish}
            className="space-y-4"
          >
            {/* Only show Download Certificate for now. Keep Verify Certificate code for future use. */}
            {true ? (
              <>
                <Form.Item
                  label="Course Name"
                  name="courseName"
                  rules={[
                    { required: true, message: "Please enter your course name!" },
                  ]}
                >
                  <Input placeholder="Enter your course name" />
                </Form.Item>

                <Form.Item
                  label="Email"
                  name="email"
                  rules={[
                    { required: true, message: "Please enter your email!" },
                    { type: "email", message: "Please enter a valid email!" },
                  ]}
                >
                  <Input placeholder="Enter your email" />
                </Form.Item>

                <Form.Item
                  label="Candidate Name"
                  name="candidateName"
                  rules={[
                    { required: true, message: "Please enter your candidate name!" },
                  ]}
                >
                  <Input placeholder="Enter your candidate name" />
                </Form.Item>

                <Form.Item
                  label="Phone Number"
                  name="phone"
                  rules={[
                    { required: true, message: "Please enter your phone number!" },
                  ]}
                >
                  <Input placeholder="Enter your phone number" />
                </Form.Item>
              </>
            ) : (
              <>
                <Form.Item
                  label="Candidate Name"
                  name="candidateName"
                  rules={[
                    { required: true, message: "Please enter your candidate name!" },
                  ]}
                >
                  <Input placeholder="Enter your candidate name" />
                </Form.Item>

                <Form.Item
                  label="Email"
                  name="email"
                  rules={[
                    { required: true, message: "Please enter your email!" },
                    { type: "email", message: "Please enter a valid email!" },
                  ]}
                >
                  <Input placeholder="Enter your email" />
                </Form.Item>

                <Form.Item
                  label="Enrollment Number"
                  name="enrollmentNumber"
                  rules={[
                    { required: true, message: "Please enter your enrollment number!" },
                  ]}
                >
                  <Input placeholder="Enter your enrollment number" />
                </Form.Item>

                <Form.Item
                  label="Certificate ID"
                  name="certificateId"
                  rules={[
                    { required: true, message: "Please enter your certificate ID!" },
                  ]}
                >
                  <Input placeholder="Enter your certificate ID" />
                </Form.Item>
              </>
            )}

            <Form.Item>
              <ConfigProvider
                theme={{
                  components: {
                    Button: {
                      defaultBg: "#FFAE0E",
                      defaultHoverBg: "#E5893C",
                      defaultHoverColor: "#2C2C2C",
                    },
                  },
                }}
              >
                <Button
                  type="default"
                  htmlType="submit"
                  className="border-none w-full py-2.5 px-6 text-black text-lg font-normal tracking-wide"
                >
                  {/* Only show Download Certificate for now. Keep Verify Certificate code for future use. */}
                  {true ? "Download Certificate" : "Verify Certificate"}
                </Button>
              </ConfigProvider>
            </Form.Item>
          </Form>
        </div>
        {/* Sample Certificate Section */}
        <div className="p-6 max-w-md mx-auto container mt-4">
          <div className="flex flex-col items-center bg-[#FFF6E0] rounded-lg shadow-md py-6">
            <h2 className="text-xl font-semibold mb-4 text-center">Sample Certificate</h2>
            <a
              href="https://d1bm918zlnq37v.cloudfront.net/CECTemp/sample_cert (1).pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#FFAE0E] hover:bg-[#E5893C] text-black font-medium px-6 py-3 rounded-lg transition-colors duration-200 text-lg shadow"
            >
              View Sample Certificate
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
