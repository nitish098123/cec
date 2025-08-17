"use client";

import { Image, Table } from "antd";

interface DataItem {
  title: string;
  apply_link: string;
}

const data: DataItem[] = [
  {
    title: "Course approval form",
    apply_link: "/old-forms/course-approval",
  },
  {
    title: "Advance form",
    apply_link: "/old-forms/advance-form",
  },
  {
    title: "Remuneration form",
    apply_link: "/old-forms/remuneration",
  },
  {
    title: "Course closing form",
    apply_link: "/old-forms/course-closing",
  },
];

export default function OldFormsPage() {
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
      title: "Download PDF",
      dataIndex: "apply_link",
      key: "apply_link",
      render: (link: string) => {
        const pdfLinks = {
          "/old-forms/course-approval": "https://d1bm918zlnq37v.cloudfront.net/CECTemp/CEC_OldForm/1.pdf",
          "/old-forms/advance-form": "https://d1bm918zlnq37v.cloudfront.net/CECTemp/CEC_OldForm/2.pdf",
          "/old-forms/remuneration": "https://d1bm918zlnq37v.cloudfront.net/CECTemp/CEC_OldForm/3.pdf",
          "/old-forms/course-closing": "https://d1bm918zlnq37v.cloudfront.net/CECTemp/CEC_OldForm/4.pdf",
        };
        return (
          <a
            href={pdfLinks[link as keyof typeof pdfLinks]}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#FFAE0E] hover:text-[#FFAE0E] hover:underline"
          >
            Download PDF
          </a>
        );
      },
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
          <h1 className="text-4xl font-semibold text-center mb-2">OLD CEC FORMS</h1>
          <p className="text-xl font-normal text-gray-500 text-center mb-12">
            For the courses approved on March 08, 2022 onwards
          </p>
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