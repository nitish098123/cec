"use client";

import { Image } from "antd";

// Define the type for the card data
interface CardData {
  image_url: string;
  name: string;
  designation: string;
  phone: string;
  email?: string;
}

// Sample data
const cardData: CardData[] = [
  {
    image_url: "https://d1bm918zlnq37v.cloudfront.net/CECTemp/kghosh.jpg",
    name: "Prof. Kaushik Ghosh",
    designation: "Coordinator CEC",
    phone: "01332-285227/5545",
    email: "Coordinator.cec.qip@iitr.ac.in",
  },
  {
    image_url: "/staff/sonal-kumar.png",
    name: "Mr. Sonal Kumar",
    designation: "Jr. Superintendent",
    phone: "01332-285247",
  },
  {
    image_url: "/staff/prabhat-nautiyal.jpg",
    name: "Mr. Prabhat Nautiyal",
    designation: "Jr. Superintendent",
    phone: "01332-284327",
  },
  {
    image_url: "/staff/sharad-sharma.jpg",
    name: "Mr. Sharad Sharma",
    designation: "Technical Associate",
    phone: "01332-285545",
  },
  {
    image_url: "/staff/vipin-kumar.jpg",
    name: "Mr. Vipin Kumar",
    designation: "Ministerial Assistant",
    phone: "01332-284327",
  },
  {
    image_url: "/staff/shakti-sahni.jpg",
    name: "Ms. Shakti Sahni",
    designation: "Computer Operator",
    phone: "01332-285545",
  },
  {
    image_url: "/staff/anand-singh.jpg",
    name: "Mr. Anand Singh",
    designation: "Sybex Staff",
    phone: "01332-285545",
  },
];

export default function StaffPage() {
  return (
    <div className="w-full font-inter bg-white">
      {/* Hero Section */}
      <section className="relative w-full h-[50vh] md:h-[60vh] flex items-center justify-center p-4">
        {/* Background Image */}
        <div
          className="absolute inset-0 bg-[url('/staff_background.jpeg')] bg-cover bg-center"
          aria-hidden="true"
        ></div>
        <div className="absolute inset-0 bg-black/60 z-10"></div>
        {/* Centered Content Block */}
        <div className="relative z-30 flex flex-col items-center text-center text-white">
          <span className="text-2xl md:text-3xl font-medium">IIT Roorkee</span>
          <span className="text-4xl md:text-5xl font-bold">CEC</span>
          <span className="text-2xl md:text-3xl font-medium">Staff Members</span>
        </div>
      </section>
      {/* Staff Grid Section */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-center text-3xl md:text-4xl font-semibold mb-12">Our Staff Members</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {cardData.map((item, index) => (
              <div
                key={index}
                className={`rounded-xl p-6 flex flex-col items-center shadow-lg transition-transform transform hover:-translate-y-2 ${
                  item.name === "Prof. Kaushik Ghosh"
                    ? "bg-[#b3dafc]"
                    : "bg-[#E2F1FF]"
                }`}
              >
                <Image
                  preview={false}
                  alt={item.name}
                  src={item.image_url}
                  className="object-cover rounded-full w-36 h-36 mb-6 border-4 border-white shadow-md"
                />
                <p className="text-xl font-semibold text-center text-black mb-1">{item.name}</p>
                <p className="text-base font-normal text-center text-gray-700 mb-1">{item.designation}</p>
                <p className="text-sm font-normal text-center text-gray-600 mb-1">Phone: {item.phone}</p>
                {item.email && (
                  <p className="text-xs font-normal text-center text-gray-600 break-all">Email: {item.email}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
