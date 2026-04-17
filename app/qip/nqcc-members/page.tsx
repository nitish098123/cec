"use client";

import React from "react";

type Member = {
  sno: number;
  name: string;
  details: string[];
  phone: string;
  email: string;
  website: string;
};

const members: Member[] = [
  {
    sno: 1,
    name: "Prof. Debjani Chakraborty",
    details: [
      "Principal Coordinator QIP",
      "Associate Dean, Outreach (CE&T/IoE)",
      "Indian Institute of Technology Kharagpur",
      "Kharagpur 721302, West Bengal",
    ],
    phone: "03222 - 282 033/ 283548",
    email: "debjani@maths.iitkgp.ac.in",
    website: "http://www.cep.iitkgp.ac.in/cep/",
  },
  {
    sno: 2,
    name: "Prof. B. V. Rathish Kumar",
    details: [
      "QIP Coordinator",
      "Head, Centre for Continuing Education,",
      "Indian Institute of Technology Kanpur,",
      "Kalyanpur, Kanpur - 208 016 (UP)",
    ],
    phone: "0512-259-7893 0512 - 2596209",
    email: "head_cce@iitk.ac.in, qip@iitk.ac.in",
    website: "http://www.iitk.ac.in/qip",
  },
  {
    sno: 3,
    name: "Prof Anil Verma",
    details: [
      "Head QIP/CEP/TEQIP-III",
      "Indian Institute of Technology Delhi",
      "Hauz Khas, New Delhi - 110 016",
    ],
    phone: "011-26591915/ 26597118/ 26591343",
    email: "hodqipcep@admin.iitd.ac.in",
    website: "http://cepqip.iitd.ac.in/",
  },
  {
    sno: 4,
    name: "Prof. Kaushik Ghosh",
    details: [
      "Coordinator, QIP/CEC",
      "Indian Institute of Technology Roorkee",
      "Roorkee Roorkee - 247 667 (Uttarakhand)",
    ],
    phone: "01332-285241/ 285247 01332-286691/ 273560",
    email: "qip@iitr.ac.in",
    website: "https://www.iitr.ac.in/qip",
  },
  {
    sno: 5,
    name: "Prof. T. V. Bharat",
    details: [
      "QIP Coordinator",
      "Head, Centre for Educational Technology, IIT Guwahati, Guwahati-781039, Assam",
    ],
    phone: "0361-2583001, 2583007, 2583008",
    email: "qip@iitg.ac.in , hoccet@iitg.ac.in",
    website: "http://www.iitg.ac.in/cet/qip.html",
  },
  {
    sno: 6,
    name: "Prof. Devendra Jalihal",
    details: [
      "QIP Coordinator",
      "Chairman, CCE & QIP Coordinator Indian Institute of Technology Madras,",
      "Chennai - 600 036",
    ],
    phone: "044-22574900/ 22574901/ 22574676/ 9444008700/ 9444462154",
    email: "chaircce@iitm.ac.in, dj@ee.iitm.ac.in",
    website: "http://www.iitm.ac.in/qip",
  },
  {
    sno: 7,
    name: "Prof. G L Sivakumar Babu",
    details: [
      "QIP Coordinator",
      "Indian Institute of Science, Bangalore, Bangalore, Bangaluru - 560 012 Chairman, CCE & QIP Coordinator Indian Institute of Technology Madras,",
    ],
    phone: "080 - 22932247/ 23608150/ 22932491",
    email: "office@cce.iisc.ac.in , office@cce.iisc.ac.in",
    website: "http://cce.iisc.ac.in/",
  },
  {
    sno: 8,
    name: "Prof. Siddhartha Ghosh",
    details: [
      "QIP Coordinator",
      "Indian Institute of Technology Bombay",
      "Mumbai - 400 076",
    ],
    phone: "022 - 25722545/ 25767006/ 25767048",
    email: "qip@iitb.ac.in , pic-cep@iitb.ac.in",
    website: "http://www.qip.iitb.ac.in/",
  },
  {
    sno: 9,
    name: "Prof. B.K. Shrivastva",
    details: [
      "QIP Coordinator",
      "Indian Institute of Technology (BHU) Varanasi",
      "Varanasi - 221 005",
    ],
    phone: "0542 - 2369434 / 0542 - 2369434",
    email: "coordinator.qip@itbhu.ac.in",
    website: "https://www.iitbhu.ac.in/qip",
  },
  {
    sno: 10,
    name: "Prof. Sujit Roy",
    details: [
      "QIP Coordinator",
      "Quality Improvement Programme Indian Institute of Technology Bhubaneswar",
      "Orissa",
    ],
    phone: "674-7135158",
    email: "sroy@iitbbs.ac.in",
    website: "https://www.iitbbs.ac.in/prof-incharge.php",
  },
  {
    sno: 11,
    name: "Dr. Ramesh",
    details: [
      "Director (FDC)",
      "All India Council for Technical Education Nelson Mandela Marg",
      "New Delhi – 110070",
    ],
    phone: "011-29581312",
    email: "director.fdc@aicte-india.org",
    website: "director.fdc@aicte-india.org",
  },
];

export default function NQCCMembersPage() {
  return (
    <div className="w-full font-inter bg-white min-h-screen">
      {/* Hero */}
      <section className="relative w-full h-[32vh] md:h-[40vh] flex items-center justify-center bg-gradient-to-r from-[#b3dafc] to-[#E2F1FF]">
        <div className="absolute inset-0 bg-[url('/IITR_building.jpeg')] bg-cover bg-center brightness-75" aria-hidden="true"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-[#1a237e]/70 to-[#b3dafc]/40 z-10"></div>
        <div className="relative z-20 text-center">
          <h1 className="text-3xl md:text-5xl font-bold text-white drop-shadow">National QIP Coordination Committee Members</h1>
        </div>
      </section>

      {/* Table */}
      <section className="max-w-7xl w-full mx-auto px-4 py-10 md:py-12">
        <div className="overflow-x-auto bg-white rounded-xl shadow-md">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-[#E2F1FF]">
              <tr>
                <th className="px-4 py-3 text-left text-sm font-semibold text-[#1a237e]">S.No.</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-[#1a237e]">Member</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-[#1a237e]">Phone</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-[#1a237e]">Email</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-[#1a237e]">Website</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {members.map((m) => (
                <tr key={m.sno} className="hover:bg-gray-50">
                  <td className="px-4 py-4 align-top text-sm text-gray-800">{m.sno}.</td>
                  <td className="px-4 py-4 align-top">
                    <p className="text-sm font-semibold text-[#102a43]">{m.name}</p>
                    <div className="mt-1 space-y-0.5">
                      {m.details.map((line, idx) => (
                        <p key={idx} className="text-sm text-gray-700">{line}</p>
                      ))}
                    </div>
                  </td>
                  <td className="px-4 py-4 align-top text-sm text-gray-800 whitespace-pre-line">{m.phone}</td>
                  <td className="px-4 py-4 align-top text-sm">
                    {m.email.split(",").map((e, idx) => (
                      <a key={idx} href={`mailto:${e.trim()}`} className="text-blue-700 hover:text-blue-900 block">
                        {e.trim()}
                      </a>
                    ))}
                  </td>
                  <td className="px-4 py-4 align-top text-sm">
                    <a
                      href={m.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-700 hover:text-blue-900 break-all"
                    >
                      {m.website}
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}


