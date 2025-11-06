"use client";

import { Form, Input, Button, Image, ConfigProvider, message } from "antd";
import { useState } from "react";

// Certificate data
const certificateData = [
  {
    name: "Ojas",
    email: "ojaspsy@gmail.com",
    number: "9310313544",
    certificate_links: "https://d1bm918zlnq37v.cloudfront.net/CECTemp/Certificates/CA-35-2025-26/1.jpg"
  },
  {
    name: "G Saqlain Pasha",
    email: "gsaqlainpasha@zoho.com",
    number: "9993864927",
    certificate_links: "https://d1bm918zlnq37v.cloudfront.net/CECTemp/Certificates/CA-35-2025-26/2.jpg"
  },
  {
    name: "Santhosh MB",
    email: "santhoshmechery@gmail.com",
    number: "9446035457",
    certificate_links: "https://d1bm918zlnq37v.cloudfront.net/CECTemp/Certificates/CA-35-2025-26/3.jpg"
  },
  {
    name: "Dr. Binod Kumar Verma ",
    email: "drbkverma@gmail.com",
    number: "7903880832",
    certificate_links: "https://d1bm918zlnq37v.cloudfront.net/CECTemp/Certificates/CA-35-2025-26/4.jpg"
  },
  {
    name: "Murugeshwari ",
    email: "murugeshwarim2004@gmail.com",
    number: "9159400257",
    certificate_links: "https://d1bm918zlnq37v.cloudfront.net/CECTemp/Certificates/CA-35-2025-26/5.jpg"
  },
  {
    name: "Dr. Khushboo ",
    email: "khushboo030303@gmail.com",
    number: "8808459800",
    certificate_links: "https://d1bm918zlnq37v.cloudfront.net/CECTemp/Certificates/CA-35-2025-26/6.jpg"
  },
  {
    name: "Deepthika Shree",
    email: "deepthikashree@gmail.com",
    number: "8248620345",
    certificate_links: "https://d1bm918zlnq37v.cloudfront.net/CECTemp/Certificates/CA-35-2025-26/7.jpg"
  },
  {
    name: "Mohd. Muzafer Khan",
    email: "khn_mzfr@yahoo.co.in",
    number: "9419408588",
    certificate_links: "https://d1bm918zlnq37v.cloudfront.net/CECTemp/Certificates/CA-35-2025-26/8.jpg"
  },
  {
    name: "Dr. Syed Sajid Husain Kazmi ",
    email: "dr.shkazmi@gmail.com",
    number: "8565001786",
    certificate_links: "https://d1bm918zlnq37v.cloudfront.net/CECTemp/Certificates/CA-35-2025-26/9.jpg"
  },
  {
    name: "Shahana Parveen P.P",
    email: "shahanapp313@gmail.com",
    number: "8589922661",
    certificate_links: "https://d1bm918zlnq37v.cloudfront.net/CECTemp/Certificates/CA-35-2025-26/10.jpg"
  },
  {
    name: "Dr. Santwana Mani",
    email: "Santwanamani1705@gmail.com",
    number: "9818489746",
    certificate_links: "https://d1bm918zlnq37v.cloudfront.net/CECTemp/Certificates/CA-35-2025-26/11.jpg"
  },
  {
    name: "Archie Rathi ",
    email: "duhh.itzz.archie@gmail.com",
    number: "9810970849",
    certificate_links: "https://d1bm918zlnq37v.cloudfront.net/CECTemp/Certificates/CA-35-2025-26/12.jpg"
  },
  {
    name: "Kiranmala Phijam",
    email: "daisyphijam5@gmail.com",
    number: "7005666560",
    certificate_links: "https://d1bm918zlnq37v.cloudfront.net/CECTemp/Certificates/CA-35-2025-26/13.jpg"
  },
  {
    name: "Pragati Katoch ",
    email: "Pragatikatoch23@gmail.com",
    number: "8626837917",
    certificate_links: "https://d1bm918zlnq37v.cloudfront.net/CECTemp/Certificates/CA-35-2025-26/14.jpg"
  },
  {
    name: "Divya Kansal ",
    email: "divyakansal.0303@gmail.com",
    number: "9839226365",
    certificate_links: "https://d1bm918zlnq37v.cloudfront.net/CECTemp/Certificates/CA-35-2025-26/15.jpg"
  }
];

export default function CertificatePage() {
  const [form] = Form.useForm();
  const [tab, setTab] = useState<"download" | "verify">("download");

  const onFinish = (values: { phone: string; [key: string]: unknown }) => {
    const phoneNumber = String(values.phone).trim().replace(/\s+/g, "");
    
    // Find matching certificate by phone number
    const matchedCertificate = certificateData.find(
      (cert) => String(cert.number).trim() === phoneNumber
    );

    if (matchedCertificate) {
      // Redirect to certificate link
      window.open(matchedCertificate.certificate_links, "_blank");
      message.success("Certificate found! Opening download...");
    } else {
      // Show error message
      message.error("Mobile number not matched");
    }
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
      </section>
    </div>
  );
}
