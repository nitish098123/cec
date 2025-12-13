"use client";

import { Form, Input, Button, ConfigProvider, message, Select } from "antd";
import { useCallback } from "react";
import Image from "next/image";

// Certificate data
const certificateData = [
  {
    name: "Ojas",
    email: "ojaspsy@gmail.com",
    number: "9310313544",
    courseName: "Responsible AI in Mental Health",
    certificate_links: "https://d1bm918zlnq37v.cloudfront.net/CECTemp/Certificates/CA-35-2025-26/1.jpg"
  },
  {
    name: "G Saqlain Pasha",
    email: "gsaqlainpasha@zoho.com",
    number: "9993864927",
    courseName: "Responsible AI in Mental Health",
    certificate_links: "https://d1bm918zlnq37v.cloudfront.net/CECTemp/Certificates/CA-35-2025-26/2.jpg"
  },
  {
    name: "Santhosh MB",
    email: "santhoshmechery@gmail.com",
    number: "9446035457",
    courseName: "Responsible AI in Mental Health",
    certificate_links: "https://d1bm918zlnq37v.cloudfront.net/CECTemp/Certificates/CA-35-2025-26/3.jpg"
  },
  {
    name: "Dr. Binod Kumar Verma ",
    email: "drbkverma@gmail.com",
    number: "7903880832",
    courseName: "Responsible AI in Mental Health",
    certificate_links: "https://d1bm918zlnq37v.cloudfront.net/CECTemp/Certificates/CA-35-2025-26/4.jpg"
  },
  {
    name: "Murugeshwari ",
    email: "murugeshwarim2004@gmail.com",
    number: "9159400257",
    courseName: "Responsible AI in Mental Health",
    certificate_links: "https://d1bm918zlnq37v.cloudfront.net/CECTemp/Certificates/CA-35-2025-26/5.jpg"
  },
  {
    name: "Dr. Khushboo ",
    email: "khushboo030303@gmail.com",
    number: "8808459800",
    courseName: "Responsible AI in Mental Health",
    certificate_links: "https://d1bm918zlnq37v.cloudfront.net/CECTemp/Certificates/CA-35-2025-26/6.jpg"
  },
  {
    name: "Deepthika Shree",
    email: "deepthikashree@gmail.com",
    number: "8248620345",
    courseName: "Responsible AI in Mental Health",
    certificate_links: "https://d1bm918zlnq37v.cloudfront.net/CECTemp/Certificates/CA-35-2025-26/7.jpg"
  },
  {
    name: "Mohd. Muzafer Khan",
    email: "khn_mzfr@yahoo.co.in",
    number: "9419408588",
    courseName: "Responsible AI in Mental Health",
    certificate_links: "https://d1bm918zlnq37v.cloudfront.net/CECTemp/Certificates/CA-35-2025-26/8.jpg"
  },
  {
    name: "Dr. Syed Sajid Husain Kazmi ",
    email: "dr.shkazmi@gmail.com",
    number: "8565001786",
    courseName: "Responsible AI in Mental Health",
    certificate_links: "https://d1bm918zlnq37v.cloudfront.net/CECTemp/Certificates/CA-35-2025-26/9.jpg"
  },
  {
    name: "Shahana Parveen P.P",
    email: "shahanapp313@gmail.com",
    number: "8589922661",
    courseName: "Responsible AI in Mental Health",
    certificate_links: "https://d1bm918zlnq37v.cloudfront.net/CECTemp/Certificates/CA-35-2025-26/10.jpg"
  },
  {
    name: "Dr. Santwana Mani",
    email: "Santwanamani1705@gmail.com",
    number: "9818489746",
    courseName: "Responsible AI in Mental Health",
    certificate_links: "https://d1bm918zlnq37v.cloudfront.net/CECTemp/Certificates/CA-35-2025-26/11.jpg"
  },
  {
    name: "Archie Rathi ",
    email: "duhh.itzz.archie@gmail.com",
    number: "9810970849",
    courseName: "Responsible AI in Mental Health",
    certificate_links: "https://d1bm918zlnq37v.cloudfront.net/CECTemp/Certificates/CA-35-2025-26/12.jpg"
  },
  {
    name: "Kiranmala Phijam",
    email: "daisyphijam5@gmail.com",
    number: "7005666560",
    courseName: "Responsible AI in Mental Health",
    certificate_links: "https://d1bm918zlnq37v.cloudfront.net/CECTemp/Certificates/CA-35-2025-26/13.jpg"
  },
  {
    name: "Pragati Katoch ",
    email: "Pragatikatoch23@gmail.com",
    number: "8626837917",
    courseName: "Responsible AI in Mental Health",
    certificate_links: "https://d1bm918zlnq37v.cloudfront.net/CECTemp/Certificates/CA-35-2025-26/14.jpg"
  },
  {
    name: "Divya Kansal ",
    email: "divyakansal.0303@gmail.com",
    number: "9839226365",
    courseName: "Responsible AI in Mental Health",
    certificate_links: "https://d1bm918zlnq37v.cloudfront.net/CECTemp/Certificates/CA-35-2025-26/15.jpg"
  },
  {
    name: "Abhishek Kumar Singh",
    email: "abhisheksingh2412.email@gmail.com",
    number: "",
    courseName: "Post Gradurate Programme in Applied Data Science & AI",
    certificate_links: "https://d1bm918zlnq37v.cloudfront.net/CECTemp/Certificates/CA-16-2024-25/02.jpg"
  },
  {
    name: "Anand Kumar Singh",
    email: "anand1994.singh@gmail.com",
    number: "",
    courseName: "Post Gradurate Programme in Applied Data Science & AI",
    certificate_links: "https://d1bm918zlnq37v.cloudfront.net/CECTemp/Certificates/CA-16-2024-25/08.jpg"
  },
  {
    name: "Kasireddi Vara Manikanta Vinay Kumar",
    email: "kumarvmvinay@gmail.com",
    number: "",
    courseName: "Post Gradurate Programme in Applied Data Science & AI",
    certificate_links: "https://d1bm918zlnq37v.cloudfront.net/CECTemp/Certificates/CA-16-2024-25/27.jpg"
  },
  {
    name: "Milind Siddharth Vinkar",
    email: "msvinkar@gmail.com",
    number: "",
    courseName: "Post Gradurate Programme in Applied Data Science & AI",
    certificate_links: "https://d1bm918zlnq37v.cloudfront.net/CECTemp/Certificates/CA-16-2024-25/35.jpg"
  },
  {
    name: "Pranshu Dhingra",
    email: "dhingrap0707@gmail.com",
    number: "",
    courseName: "Post Gradurate Programme in Applied Data Science & AI",
    certificate_links: "https://d1bm918zlnq37v.cloudfront.net/CECTemp/Certificates/CA-16-2024-25/48.jpg"
  },
  {
    name: "Vidhi Sinha",
    email: "vidhisinha24@gmail.com",
    number: "7005666560",
    courseName: "Post Gradurate Programme in Applied Data Science & AI",
    certificate_links: "https://d1bm918zlnq37v.cloudfront.net/CECTemp/Certificates/CA-16-2024-25/74.jpg"
  },
  {
    name: "Vignesh G",
    email: "vigneshvarma1@gmail.com",
    number: "",
    courseName: "Post Gradurate Programme in Applied Data Science & AI",
    certificate_links: "https://d1bm918zlnq37v.cloudfront.net/CECTemp/Certificates/CA-16-2024-25/75.jpg"
  },
  {
    name: "Johar Tariq",
    email: "johartariq@gmail.com",
    number: " ",
    courseName: "Business Analytics for Strategic Decision Making",
    certificate_links: "https://d1bm918zlnq37v.cloudfront.net/CECTemp/Certificates/CA-14-2022-23/180.jpg"
  },
  {
    name: "Mayank Silori",
    email: "mayank.silori@gmail.com",
    number: " ",
    courseName: "Business Analytics for Strategic Decision Making",
    certificate_links: "https://d1bm918zlnq37v.cloudfront.net/CECTemp/Certificates/CA-14-2022-23/181.jpg"
  },
  {
    name: "Haridas K",
    email: "kharidas009@gmail.com",
    number: " ",
    courseName: "Business Analytics for Strategic Decision Making",
    certificate_links: "https://d1bm918zlnq37v.cloudfront.net/CECTemp/Certificates/CA-14-2022-23/182.jpg"
  },
  {
    name: "CH.Ramadevi",
    email: "Rama.kris22m@gmail.com",
    number: " ",
    courseName: "Business Analytics for Strategic Decision Making",
    certificate_links: "https://d1bm918zlnq37v.cloudfront.net/CECTemp/Certificates/CA-14-2022-23/183.jpg"
  },
  {
    name: "Tauseef Ejaz",
    email: "ejaz.tauseef@gmail.com",
    number: " ",
    courseName: "Business Analytics for Strategic Decision Making",
    certificate_links: "https://d1bm918zlnq37v.cloudfront.net/CECTemp/Certificates/CA-69-2023-24/24.jpg"
  },
  {
    name: "Neha Singh",
    email: "neha1234online@gmail.com",
    number: " ",
    courseName: "Business Analytics for Strategic Decision Making",
    certificate_links: "https://d1bm918zlnq37v.cloudfront.net/CECTemp/Certificates/CA-69-2023-24/25.jpg"
  },
  {
    name: "Revathy Haridass",
    email: "revathy92vanaja@gmail.com",
    number: " ",
    courseName: "Business Analytics for Strategic Decision Making",
    certificate_links: "https://d1bm918zlnq37v.cloudfront.net/CECTemp/Certificates/CA-69-2023-24/26.jpg"
  },
  {
    name: "Abhi Chand",
    email: "chandabhi78@gmail.com",
    number: " ",
    courseName: "Business Analytics for Strategic Decision Making",
    certificate_links: "https://d1bm918zlnq37v.cloudfront.net/CECTemp/Certificates/CA-69-2023-24/27.jpg"
  },
  {
    name: "Debasish Acharya",
    email: "debasish.acharya1234@gmail.com",
    number: " ",
    courseName: "Business Analytics for Strategic Decision Making",
    certificate_links: "https://d1bm918zlnq37v.cloudfront.net/CECTemp/Certificates/CA-69-2023-24/28.jpg"
  },
  {
    name: "Gaurree Verma",
    email: "gaurreeverma@gmail.com",
    number: " ",
    courseName: "Business Analytics for Strategic Decision Making",
    certificate_links: "https://d1bm918zlnq37v.cloudfront.net/CECTemp/Certificates/CA-69-2023-24/29.jpg"
  },
  {
    name: "Hardik Dogra",
    email: "hardikdogra2012@gmail.com",
    number: " ",
    courseName: "Business Analytics for Strategic Decision Making",
    certificate_links: "https://d1bm918zlnq37v.cloudfront.net/CECTemp/Certificates/CA-69-2023-24/30.jpg"
  }
];

// Memoize theme configuration outside component to avoid recreating on every render
const buttonThemeConfig = {
  components: {
    Button: {
      defaultBg: "#FFAE0E",
      defaultHoverBg: "#E5893C",
      defaultHoverColor: "#2C2C2C",
    },
  },
};

// Pre-compute unique course names outside component since certificateData is static
const uniqueCourseNames = Array.from(
  new Set(certificateData.map((cert) => cert.courseName))
).map((courseName) => ({
  value: courseName,
  label: courseName,
}));

export default function CertificatePage() {
  const [form] = Form.useForm();

  const onFinish = useCallback((values: { email: string; courseName?: string; [key: string]: unknown }) => {
    const emailAddress = String(values.email).trim().toLowerCase();
    const selectedCourseName = values.courseName ? String(values.courseName).trim() : "";
    
    // First filter by course name, then find matching certificate by email
    const matchedCertificate = certificateData.find(
      (cert) => 
        cert.courseName === selectedCourseName &&
        String(cert.email).trim().toLowerCase() === emailAddress
    );

    if (matchedCertificate) {
      // Redirect to certificate link
      window.open(matchedCertificate.certificate_links, "_blank");
      message.success("Certificate found! Opening download...");
    } else {
      // Show error message
      message.error("Certificate not found. Please check your course name and email ID.");
    }
  }, []);
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
            alt="IITR Logo"
            src="/IITR_logo.png"
            width={164}
            height={164}
            priority
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
            <Form.Item
              label="Course Name"
              name="courseName"
              rules={[
                { required: true, message: "Please select your course name!" },
              ]}
            >
              <Select
                placeholder="Select your course name"
                showSearch
                filterOption={(input, option) =>
                  (option?.label ?? "").toLowerCase().includes(input.toLowerCase())
                }
                options={uniqueCourseNames}
              />
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

            <Form.Item>
              <ConfigProvider theme={buttonThemeConfig}>
                <Button
                  type="default"
                  htmlType="submit"
                  className="border-none w-full py-2.5 px-6 text-black text-lg font-normal tracking-wide"
                >
                  Download Certificate
                </Button>
              </ConfigProvider>
            </Form.Item>
          </Form>
        </div>
      </section>
    </div>
  );
}
