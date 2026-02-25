"use client";

import React from "react";

export default function QIPPage() {
  return (
    <div className="w-full font-inter bg-white min-h-screen">
      {/* Hero Section */}
      <section className="relative w-full h-[40vh] flex items-center justify-center bg-gradient-to-r from-[#b3dafc] to-[#E2F1FF]">
        {/* Background Image */}
        <div className="absolute inset-0 bg-[url('/IITR_building.jpeg')] bg-cover bg-center brightness-75" aria-hidden="true"></div>
        {/* Overlay for readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#1a237e]/70 to-[#b3dafc]/40 z-10"></div>
        <div className="relative z-20 flex flex-col items-center text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white drop-shadow mb-2">Quality Improvement Programme (QIP)</h1>
        </div>
      </section>
      {/* Content Section */}
      <section className="max-w-7xl w-full mx-auto px-4 py-12">
        <h2 className="text-2xl font-semibold mb-4 text-[#1a237e]">About the Quality Improvement Programme</h2>
        <p className="mb-4 text-gray-800">
          The Government of India launched the Quality Improvement Programme in the 1970-71. One of the main objectives of the programme is to upgrade the expertise and capabilities of the faculty members of the degree level institutions in the country. Since 1994-95, the programme is being implemented and monitored by All India Council for Technical Education. In "Quality Improvement Programme" only sponsored teachers are eligible for admission to Ph.D Degree Programmes, with the aim to enable the teachers to acquire Ph.D degrees and imbibe in them a culture of research and better teaching educational capabilities by exposing them to the environment of their institutes of study.
        </p>
        <p className="mb-4 text-gray-800">
          At present, there are two principal activities under QIP scheme being carried out by the QIP, Continuing Education Centre, IIT Roorkee:
        </p>
        <ul className="list-disc list-inside mb-4 text-gray-800">
          <li>Ph.D Degree Programme</li>
          <li>AICTE-QIP PG Certificate Programme</li>
        </ul>
        <p className="mb-4 text-gray-800">
          The Programme was launched to improve the overall quality of technical education in the degree level engineering colleges. It was anticipated that placing the teachers on the campus of these institutes of excellence viz.
        </p>
        <p className="mb-4 text-gray-800">
          The methodology and procedure for identifying institutions to undertaking QIP activities in above disciplines has been initiated.
        </p>
        <h3 className="text-xl font-semibold mt-8 mb-2 text-[#1a237e]">For Ph.D. Programme in Engineering/Management:</h3>
        <ul className="list-disc list-inside mb-4 text-gray-800">
          <li>Full time regular/ permanent faculty members of AICTE approved Degree Level institutes having
            <ul className="list-disc list-inside ml-6">
              <li>Three year teaching experience at graduate level institutes.</li>
              <li>A Master degree in the appropriate branch.</li>
            </ul>
          </li>
        </ul>
        <ol className="list-decimal list-inside mb-4 text-gray-800 ml-4">
          <li>The candidate, if selected and admitted, should be on deputation and his/her normal salary and allowances are to be paid by the parent institution.</li>
          <li>The candidate selected for admission under QIP will have to execute and undertaking to serve his /her parent institution for a minimum period of three years after completion of the programme.</li>
        </ol>
        <p className="mb-2 text-gray-800">Scholarship: <span className="font-semibold">@Rs. 15,000 per month</span></p>
        <p className="mb-4 text-gray-800">Contingency: <span className="font-semibold">@Rs. 15,000 per annum</span></p>
        <h3 className="text-xl font-semibold mt-8 mb-2 text-[#1a237e]">For AICTE-QIP-PG Certificate Programme:</h3>
        <ul className="list-disc list-inside mb-4 text-gray-800">
          <li>Admission guidelines for AICTE-QIP-PG Certificate Programme are as follows:</li>
          <ul className="list-disc list-inside ml-6">
            <li>Full time Regular / Permanent faculty members of AICTE approved Degree Level / Diploma level institutes, belonging to CORE Engineering disciplines like Mechanical, Civil, Material/Metallurgical, Electrical and Electronics, Chemical etc.</li>
            <li>Minimum 5 years teaching experience at graduate/diploma level from AICTE approved institution.</li>
            <li>In addition to the above minimum eligibility, criteria of respective host institution shall be applicable.</li>
            <li>The duration of AICTE-QIP-PG Certificate Programme shall be 6 months (200 Hrs of activities excluding evaluation).</li>
            <li>A batch of 50 candidates at one identified host institution per session.</li>
          </ul>
        </ul>
      </section>
    </div>
  );
} 