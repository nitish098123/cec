"use client";

import { Image } from "antd";
import { Suspense } from "react";
import { useSearchParams } from "next/navigation";

import { TeamMemberGrid } from "@/components/TeamMemberGrid";
import { TEAM_MEMBERS } from "@/lib/team-members";

function StaffContent() {
  const searchParams = useSearchParams();
  const tabParam = searchParams.get("tab");
  const tab = tabParam === "coordinator" ? "coordinator" : "staff";
  const coordinator = TEAM_MEMBERS.find(
    (item) => item.name === "Prof. Soumitra Satapathi"
  );
  const staff = TEAM_MEMBERS.filter(
    (item) => item.name !== "Prof. Soumitra Satapathi"
  );
  return (
    <>
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
                <p className="text-lg font-normal text-gray-700 mb-1 text-center md:text-left">Coordinator</p>
                <p className="text-base font-normal text-gray-600 mb-1 text-center md:text-left">Continuing Education Centre</p>
                <p className="text-base font-normal text-gray-600 mb-1 text-center md:text-left">IIT Roorkee</p>
                <p className="text-base font-normal text-gray-600 mb-1 text-center md:text-left">Phone no.: 01332-285227/5545</p>
                <p className="text-base font-normal text-gray-600 mb-4 text-center md:text-left">Email id: coordinator.cec.qip@iitr.ac.in</p>
              </div>
            </div>
            {/* Right: Message */}
            <div className="w-full md:w-2/3 bg-[#f5faff] p-4 md:p-8 rounded-lg shadow mt-6 md:mt-0">
              <h3 className="text-xl font-semibold mb-2 text-[#1a237e]">Message from the Coordinator</h3>
              <p className="text-gray-700">
                CEC IIT Roorkee, we are committed to making high-quality and transformational education accessible to all. Our programs are designed to provide executives, professionals, and aspiring individuals a launchpad for taking them to next level in their career. In addition to sponsored short-term courses, which form a large part of the training and upskilling effort, CEC IITR has launched a new major initiative to offer the longer duration programs (up to a year) having PG and Advanced Certifications. CEC IITR courses are available in both asynchronous and hybrid learning modes. Our courses are designed to provide learners a specialization, which will enable them to master in-demand skills needed to work on the latest problems in industry and research. These include Data Science, Machine Learning, Artificial Intelligence, 5G, Cyber Security, VLSI, DevOps, as well as emerging technologies in engineering, science, and management. Through these open participation programs, we aim to reach out to aspiring individuals and professionals to develop cutting-edge competencies in their professional careers. CEC has signed partnership MoUs with many organizations to offer courses and training programs in diverse areas. Some of our major partners for sponsored courses are SAIL, TATA Steel, NTPC, BEL, SAARC, NIC, etc. In the year 2024-2025, the CEC has introduced new sponsored courses for many organizations Department of Income Tax (Systems), New Delhi, IRDE Dehradun, DRDO, MeraYuva Bharat (MY BHARAT), New Delhi, Navodaya Vidyalaya Samiti, National Health Mission, Odisha, Tata Tisconm, National Mission for Clean Ganga (NMCG), New Delhi etc.
              </p>
            </div>
          </div>
        </section>
      )}
      {tab === "staff" && (
        <section className="py-12 md:py-16 bg-[#FFFAF1]">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-center text-3xl md:text-4xl font-semibold text-[#102a43] mb-10 md:mb-12">
              CEC Staff Members
            </h2>

            <TeamMemberGrid members={staff} />
          </div>
        </section>
      )}
    </>
  );
}

function StaffHero() {
  const searchParams = useSearchParams();
  const tabParam = searchParams.get("tab");
  const tab = tabParam === "coordinator" ? "coordinator" : "staff";
  const heroText = tab === "coordinator" ? "CEC Coordinator" : "CEC STAFF";
  
  return (
    <section className="relative w-full h-[50vh] md:h-[60vh] flex items-center justify-center p-4">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-[url('/staff_background.jpeg')] bg-cover bg-center"
        aria-hidden="true"
      ></div>
      <div className="absolute inset-0 bg-black/60 z-10"></div>
      {/* Centered Content Block */}
      <div className="relative z-30 flex flex-col items-center text-center text-white">
        <span className="text-4xl md:text-6xl font-bold mb-3">{heroText}</span>
        <span className="text-2xl md:text-3xl font-medium">IIT Roorkee</span>
      </div>
    </section>
  );
}

export default function StaffPage() {
  return (
    <div className="w-full font-inter bg-white">
      {/* Hero Section */}
      <Suspense fallback={
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
      }>
        <StaffHero />
      </Suspense>
      <Suspense fallback={<div className="py-12 bg-white text-center">Loading...</div>}>
        <StaffContent />
      </Suspense>
    </div>
  );
}
