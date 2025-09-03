"use client";

import { Image } from "antd";
import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";

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
    designation: "Jr. Assistant",
    phone: "01332-284327",
  },
  {
    image_url: "/staff/sharad-sharma.jpg",
    name: "Mr. Sharad Sharma",
    designation: "Project Associate",
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

function StaffContent() {
  const searchParams = useSearchParams();
  const tabParam = searchParams.get("tab");
  const tab = tabParam === "coordinator" ? "coordinator" : "staff";
  const coordinator = cardData.find((item) => item.name === "Prof. Kaushik Ghosh");
  const staff = cardData.filter((item) => item.name !== "Prof. Kaushik Ghosh");
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
          <span className="text-4xl md:text-6xl font-bold mb-3">CEC STAFF</span>
          <span className="text-2xl md:text-3xl font-medium">IIT Roorkee</span>
        </div>
      </section>
      {/* Section Content */}
      {tab === 'coordinator' && coordinator && (
        <section className="py-12 bg-white">
          <div className="container mx-auto px-4 flex flex-col md:flex-row items-start md:items-center gap-8 md:gap-16">
            {/* Left: Photo and Details */}
            <div className="flex flex-col items-center md:items-start w-full md:w-1/3">
              <Image
                preview={false}
                alt={coordinator.name}
                src={coordinator.image_url}
                className="object-cover rounded-lg w-64 h-80 mb-4 shadow-lg"
              />
              <div className="w-full flex flex-col items-center md:items-start">
                <p className="text-2xl font-bold text-black mb-1 text-center md:text-left">{coordinator.name}</p>
                <p className="text-base font-normal text-gray-700 mb-1 text-center md:text-left">Coordinator</p>
                <p className="text-base font-normal text-gray-600 mb-1 text-center md:text-left">Continuing Education Centre</p>
                <p className="text-base font-normal text-gray-600 mb-1 text-center md:text-left">IIT Roorkee</p>
                <p className="text-base font-normal text-gray-600 mb-1 text-center md:text-left">Phone no.: 01332-285227/5545</p>
                <p className="text-base font-normal text-gray-600 mb-4 text-center md:text-left">Email id: coordinator.cec.qip@iitr.ac.in</p>
              </div>
            </div>
            {/* Right: Message */}
            <div className="w-full md:w-2/3 bg-[#f5faff] p-4 md:p-8 rounded-lg shadow mt-6 md:mt-0">
              <h3 className="text-xl font-semibold mb-2 text-[#1a237e]">Message from the Co-ordinator</h3>
              <p className="text-gray-700">
                CEC IIT Roorkee, we are committed to making high-quality and transformational education accessible to all. Our programs are designed to provide executives, professionals, and aspiring individuals a launchpad for taking them to next level in their career. In addition to sponsored short-term courses, which form a large part of the training and upskilling effort, CEC IITR has launched a new major initiative to offer the longer duration programs (up to a year) having PG and Advanced Certifications. CEC IITR courses are available in both asynchronous and hybrid learning modes. Our courses are designed to provide learners a specialization, which will enable them to master in-demand skills needed to work on the latest problems in industry and research. These include Data Science, Machine Learning, Artificial Intelligence, 5G, Cyber Security, VLSI, DevOps, as well as emerging technologies in engineering, science, and management. Through these open participation programs, we aim to reach out to aspiring individuals and professionals to develop cutting-edge competencies in their professional careers. CEC has signed partnership MoUs with many organizations to offer courses and training programs in diverse areas. Some of our major partners for sponsored courses are SAIL, TATA Steel, NTPC, BEL, SAARC, NIC, etc. In the year 2024-2025, the CEC has introduced new sponsored courses for many organizations Department of Income Tax (Systems), New Delhi, IRDE Dehradun, DRDO, MeraYuva Bharat (MY BHARAT), New Delhi, Navodaya Vidyalaya Samiti, National Health Mission, Odisha, Tata Tisconm, National Mission for Clean Ganga (NMCG), New Delhi etc.
              </p>
            </div>
          </div>
        </section>
      )}
      {tab === 'staff' && (
        <section className="py-12 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-center text-3xl md:text-4xl font-semibold mb-12">CEC Staff Members</h2>

            {/* Design 1: Modern Card Grid with Hover Effects */}
            <div className="mb-16">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {staff.map((item, index) => (
                  <div
                    key={index}
                    className="rounded-xl p-6 flex flex-col items-center shadow-lg bg-[#E2F1FF] transition-transform transform hover:-translate-y-2 hover:bg-[#b3dafc] duration-200 h-full"
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
          </div>
        </section>
      )}
    </div>
  );
}

export default function StaffPage() {
  return (
    <Suspense fallback={
      <div className="w-full font-inter bg-white">
        <section className="relative w-full h-[50vh] md:h-[60vh] flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-[url('/staff_background.jpeg')] bg-cover bg-center"
            aria-hidden="true"
          ></div>
          <div className="absolute inset-0 bg-black/60 z-10"></div>
          <div className="relative z-30 flex flex-col items-center text-center text-white">
            <span className="text-4xl md:text-6xl font-bold mb-3">CEC STAFF</span>
            <span className="text-2xl md:text-3xl font-medium">IIT Roorkee</span>
          </div>
        </section>
        <div className="py-12 bg-white">
          <div className="container mx-auto px-4 text-center text-gray-600">
            Loading staff information...
          </div>
        </div>
      </div>
    }>
      <StaffContent />
    </Suspense>
  );
}
