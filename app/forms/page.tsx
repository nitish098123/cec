"use client";

import { Image, Table } from "antd";
import Link from "next/link";

interface DataItem {
  title: string;
  apply_link: string;
}

const data: DataItem[] = [
  {
    title: "Course approval form for open participation courses",
    apply_link: "/forms/course-approval-open",
  },
  {
    title: "Course approval form for sponsored courses",
    apply_link: "/forms/course-approval-sponsored",
  },
  {
    title: "Course opening form with actual budget for all courses",
    apply_link: "/forms/course-opening-with-actual-budget",
  },
  {
    title: "Revised budget form for all courses",
    apply_link: "/forms/revised-budget",
  },
  {
    title: "Request for course invoice generation for open participation course",
    apply_link: "/forms/course-invoice-generation-open",
  },
  {
    title: "Request for course invoice generation for sponsored courses",
    apply_link: "/forms/course-invoice-generation-sponsored",
  },
  {
    title: "Remuneration/Honorarium form for all courses",
    apply_link: "/forms/remuneration-honorarium",
  },
  {
    title: "Form for TA/Lab staff for all courses",
    apply_link: "/forms/ta-lab-staff",
  },
  {
    title: "Request for loan for open participation courses",
    apply_link: "/forms/request-for-loan",
  },
  {
    title: "Coordination fee and course closure form for all courses",
    apply_link: "/forms/coordination-fee-course-closure",
  },
  {
    title: "Course extension form for all courses",
    apply_link: "/forms/course-extension",
  },
];

export default function FormsPage() {
  const columns = [
    {
      title: "Sl. No.",
      dataIndex: "index",
      key: "index",
      align: "center" as const,
      render: (_: unknown, __: DataItem, index: number) => <span>{index + 1}</span>,
    },
    {
      title: "Description",
      dataIndex: "title",
      key: "title",
      render: (text: string) => <span>{text}</span>,
    },
    {
      title: "Apply",
      dataIndex: "apply_link",
      key: "apply_link",
      render: (link: string) => (
        <Link
          href={link}
          className="text-[#FFAE0E] hover:text-[#FFAE0E] hover:underline"
        >
          Apply now
        </Link>
      ),
    },
  ];

  return (
    <div className="w-full font-inter">
      <section className="relative w-full h-[80vh] flex items-center justify-center">
        {/* Background Image */}
        <div
          className="absolute inset-0 bg-[url('/forms_background.jpeg')] bg-cover bg-center brightness-[0.7]"
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
            <p className="text-4xl">Forms</p>
          </div>
        </div>
      </section>
      <section className="w-full py-6">
        <div className="w-full p-4 bg-white container mx-auto">
          <h1 className="text-4xl font-semibold text-center mb-12">NEW CEC FORMS</h1>
          <Table
            dataSource={data.map((item, index) => ({ ...item, key: index }))}
            columns={columns}
            pagination={false}
            bordered
          />
        </div>
      </section>
    </div>
  );
}
