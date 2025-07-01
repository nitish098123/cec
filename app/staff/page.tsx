"use client";

import { Image } from "antd";
import { useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";

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

function StaffPageContent() {
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
          <span className="text-2xl md:text-3xl font-medium">IIT Roorkee</span>
          <span className="text-4xl md:text-5xl font-bold">CEC</span>
          <span className="text-2xl md:text-3xl font-medium">Staff</span>
        </div>
      </section>
      {/* Section Content */}
      {tab === 'coordinator' && coordinator && (
        <section className="py-12 bg-white">
          <div className="container mx-auto px-4 flex flex-col items-center">
            <Image
              preview={false}
              alt={coordinator.name}
              src={coordinator.image_url}
              className="object-cover rounded-lg w-64 h-80 mb-6 shadow-lg"
            />
            <p className="text-2xl font-bold text-center text-black mb-1">Prof. Kaushik Ghosh</p>
            <p className="text-lg font-normal text-center text-gray-700 mb-1">Coordinator</p>
            <p className="text-base font-normal text-center text-gray-600 mb-1">Continuing Education Centre</p>
            <p className="text-base font-normal text-center text-gray-600 mb-1">IIT Roorkee</p>
            <p className="text-base font-normal text-center text-gray-600 mb-1">Phone no.: 01332-285227/5545</p>
            <p className="text-base font-normal text-center text-gray-600 mb-4">Email id: coordinator.cec.qip@iitr.ac.in</p>
            <div className="max-w-6xl w-full bg-[#f5faff] p-4 md:p-8 rounded-lg shadow mt-6">
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
              <h3 className="text-2xl font-bold mb-6 text-center">Design 1: Modern Card Grid with Hover Effects</h3>
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

            {/* Design 2: Symmetric Card Grid (No Masonry) */}
            <div className="mb-16">
              <h3 className="text-2xl font-bold mb-6 text-center">Design 2: Symmetric Card Grid (No Masonry)</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {staff.map((item, index) => (
                  <div
                    key={index}
                    className="flex flex-col items-center p-6 rounded-xl shadow-lg transition-transform duration-200 bg-white hover:-translate-y-2 bg-[#E2F1FF] h-full"
                  >
                    <Image
                      preview={false}
                      alt={item.name}
                      src={item.image_url}
                      className="object-cover rounded-lg w-32 h-32 mb-6"
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

            {/* Design 3: Profile Card with Side Accent */}
            <div className="mb-16">
              <h3 className="text-2xl font-bold mb-6 text-center">Design 3: Profile Card with Side Accent</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {staff.map((item, index) => (
                  <div
                    key={index}
                    className="flex bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-shadow duration-200 h-full"
                  >
                    <div className="w-2 bg-[#b3dafc]" />
                    <div className="flex flex-col items-center p-6 flex-1">
                      <Image
                        preview={false}
                        alt={item.name}
                        src={item.image_url}
                        className="object-cover rounded-lg w-28 h-28 mb-4"
                      />
                      <p className="text-lg font-semibold text-center text-black mb-1">{item.name}</p>
                      <p className="text-base font-normal text-center text-gray-700 mb-1">{item.designation}</p>
                      <p className="text-sm font-normal text-center text-gray-600 mb-1">Phone: {item.phone}</p>
                      {item.email && (
                        <p className="text-xs font-normal text-center text-gray-600 break-all">Email: {item.email}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Design 4: Minimalist Grid with Popover */}
            <div className="mb-16">
              <h3 className="text-2xl font-bold mb-6 text-center">Design 4: Minimalist Grid with Popover</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {staff.map((item, index) => (
                  <div key={index} className="flex flex-col items-center h-full">
                    <div className="relative group">
                      <Image
                        preview={false}
                        alt={item.name}
                        src={item.image_url}
                        className="object-cover rounded-full w-24 h-24 mb-2 border-2 border-[#b3dafc] shadow-sm"
                      />
                      <div className="absolute left-1/2 -translate-x-1/2 top-full mt-2 w-56 bg-white rounded-lg shadow-lg p-4 opacity-0 group-hover:opacity-100 pointer-events-none group-hover:pointer-events-auto transition-opacity duration-200 z-20">
                        <p className="text-lg font-semibold text-black mb-1">{item.name}</p>
                        <p className="text-base text-gray-700 mb-1">{item.designation}</p>
                        <p className="text-sm text-gray-600 mb-1">Phone: {item.phone}</p>
                        {item.email && (
                          <p className="text-xs text-gray-600 break-all">Email: {item.email}</p>
                        )}
                      </div>
                    </div>
                    <p className="text-base font-medium text-center text-black mt-2">{item.name}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Design 5: Team Row with Alternating Backgrounds */}
            <div className="mb-16">
              <h3 className="text-2xl font-bold mb-6 text-center">Design 5: Team Row with Alternating Backgrounds</h3>
              <div className="space-y-8">
                {Array.from({ length: Math.ceil(staff.length / 3) }).map((_, rowIdx) => (
                  <div
                    key={rowIdx}
                    className={`flex flex-col sm:flex-row justify-center items-center gap-8 p-6 rounded-xl ${rowIdx % 2 === 0 ? 'bg-[#E2F1FF]' : 'bg-[#b3dafc]'}`}
                  >
                    {staff.slice(rowIdx * 3, rowIdx * 3 + 3).map((item, idx) => (
                      <div key={idx} className="flex flex-col items-center h-full">
                        <Image
                          preview={false}
                          alt={item.name}
                          src={item.image_url}
                          className="object-cover rounded-full w-24 h-24 mb-2 border-2 border-white shadow"
                        />
                        <p className="text-lg font-semibold text-center text-black mb-1">{item.name}</p>
                        <p className="text-base font-normal text-center text-gray-700 mb-1">{item.designation}</p>
                        <p className="text-sm font-normal text-center text-gray-600 mb-1">Phone: {item.phone}</p>
                        {item.email && (
                          <p className="text-xs font-normal text-center text-gray-600 break-all">Email: {item.email}</p>
                        )}
                      </div>
                    ))}
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
    <Suspense fallback={<div>Loading...</div>}>
      <StaffPageContent />
    </Suspense>
  );
}
