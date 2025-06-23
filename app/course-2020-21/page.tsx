import React from "react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Courses 2020-21 | CEC",
  description: "Continuing Education Centre, IIT Roorkee",
};

const courses = [
    { sno: 1, department: "Mathematics", course: "Optimization Theory, Methods and Applications", coordinator: "Prof. S.K. Gupta", duration: "Aug. 18-20,2020", sponsor: "Open" },
    { sno: 2, department: "HRED", course: "Solar Power-Emerging Technology and O&M issues of Solar Power Plants", coordinator: "Prof. R. P. Saini", duration: "Sept. 21-25, 2020", sponsor: "NHPC" },
    { sno: 3, department: "HRED", course: "Distributed Control System Instrumentation, SCADA System and Communication Network-3", coordinator: "Prof. Arun Kumar", duration: "Sept. 28-30,2020", sponsor: "NHPC" },
    { sno: 4, department: "HRED", course: "Pump Storage-Design, Operation & Integration with Renewable Energy", coordinator: "Prof. Arun Kumar", duration: "Oct. 05-09, 2020", sponsor: "NHPC" },
    { sno: 5, department: "HRED", course: "Regulatory Framework and Operation of Power Station", coordinator: "Prof. Arun Kumar", duration: "Oct 12-16, 2020", sponsor: "NHPC" },
    { sno: 6, department: "HRED", course: "Small Hydro Power Projects – Cost Effective Implementation", coordinator: "Dr. S. K. Singal", duration: "October 19-21, 2020", sponsor: "NHPC" },
    { sno: 7, department: "HRED", course: "Modeling and Simulation of Energy Systems", coordinator: "Dr. Rhythm Singh", duration: "Oct. 19-23,2020", sponsor: "AICTE (under ATAL Academy)" },
    { sno: 8, department: "HRED", course: "Wind Power Emerging Technology", coordinator: "Prof. R. P. Saini", duration: "Nov. 02-06, 2020", sponsor: "NHPC" },
    { sno: 9, department: "HRED", course: "Assessment of Soil Erosion and Sedimentation Control in Hydro Power Projects", coordinator: "Prof. Arun Kumar", duration: "Nov 23–27, 2020", sponsor: "NHPC" },
    { sno: 10, department: "HRED", course: "Electrochemical Energy Conversion and Storage", coordinator: "Prof. Amit C. Bhosle", duration: "Nov. 23-27,2020", sponsor: "AICTE (under ATAL Academy)" },
    { sno: 11, department: "HRED", course: "Advanced and Disruptive Technology Trends in Energy Sector", coordinator: "Prof. Arun Kumar", duration: "Dec 01–03, 2020", sponsor: "NHPC" },
    { sno: 12, department: "MIED", course: "Design of Vibration &Shock isolation system", coordinator: "Prof. Anil Kumar", duration: "Dec. 1-4,2020", sponsor: "BEL" },
    { sno: 13, department: "Civil", course: "Landslide Mitigation & Detailed Project Report (DPR) Preparation", coordinator: "Dr. Mahendra Singh & Dr. S.P. Pradhan", duration: "Nov. 23-27, 2020", sponsor: "NDMA" },
    { sno: 14, department: "HRED", course: "Solar Power-Emerging Technology and O&M issues of Solar Power Plants", coordinator: "Prof. R. P. Saini", duration: "Dec. 07-11, 2020", sponsor: "NHPC" },
    { sno: 15, department: "HRED", course: "Renovation & Modernization of Power Plants (Technical Challenges, Regulation of CEA / CERC etc.)", coordinator: "Prof. Arun Kumar", duration: "Dec. 14-16, 2020", sponsor: "NHPC" },
    { sno: 16, department: "WRD&M", course: "Applications of Multi-megawatt Power-electronic System", coordinator: "Prof. T.R. Chelliah", duration: "Dec. 01-05,2020", sponsor: "ME&IT" },
    { sno: 17, department: "HRED", course: "Safety and Operational Risk for Hydraulic Structures at Hydro Power Station", coordinator: "Prof. M.K. Singhal", duration: "Dec. 28-30, 2020", sponsor: "NHPC" },
    { sno: 18, department: "HRED", course: "Hydraulic Turbine Testing", coordinator: "Prof. R. P. Saini", duration: "Jan. 04-08, 2021", sponsor: "NHPC" },
    { sno: 19, department: "HRED", course: "Regulatory Framework and Operation of Power Station", coordinator: "Prof. Arun Kumar", duration: "Jan. 11-15, 2021", sponsor: "NHPC" },
    { sno: 20, department: "Civil", course: "Road Safety Auditors", coordinator: "Prof. Indrajit Ghosh", duration: "Feb. 22 – March 08, 2021", sponsor: "MoRTH and IRC," },
    { sno: 21, department: "Earthquake", course: "Refresher Course on Building Designed Construction", coordinator: "Prof. P.C.Ashwin Kumar", duration: "Feb. 22-24,2021", sponsor: "DTC,Jaipur" }
  ];

const Course202021Page = () => {
  return (
    <div className="bg-white min-h-screen">
      <div className="relative w-full h-[30vh] md:h-[40vh] flex items-center justify-center">
        <div
          className="absolute inset-0 bg-[url('/gallery_background.jpeg')] bg-cover bg-center brightness-[0.5]"
          aria-hidden="true"
        ></div>
        <div className="relative flex items-center z-20 px-4">
          <div className="text-white text-center">
            <h1 className="text-3xl md:text-4xl font-bold tracking-wide">
              Courses 2020-21
            </h1>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <h2 className="text-2xl md:text-3xl font-semibold text-center mb-8 md:mb-12">
          LIST OF SHORT-TERM COURSES CONDUCTED IN ONLINE MODE DURING 2020-21
        </h2>
        <div className="overflow-x-auto shadow-md sm:rounded-lg">
          <table className="min-w-full bg-white border border-gray-200">
            <thead className="bg-gray-800 text-white">
              <tr>
                <th className="py-3 px-6 text-left text-xs font-medium uppercase tracking-wider">S.No.</th>
                <th className="py-3 px-6 text-left text-xs font-medium uppercase tracking-wider">Department</th>
                <th className="py-3 px-6 text-left text-xs font-medium uppercase tracking-wider">Course Name</th>
                <th className="py-3 px-6 text-left text-xs font-medium uppercase tracking-wider">Course Coordinator</th>
                <th className="py-3 px-6 text-left text-xs font-medium uppercase tracking-wider">Duration</th>
                <th className="py-3 px-6 text-left text-xs font-medium uppercase tracking-wider">Sponsoring Agency</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {courses.map((course) => (
                <tr key={course.sno} className="border-b hover:bg-gray-100">
                  <td className="py-4 px-6 whitespace-nowrap">{course.sno}</td>
                  <td className="py-4 px-6 whitespace-nowrap">{course.department}</td>
                  <td className="py-4 px-6">{course.course}</td>
                  <td className="py-4 px-6">{course.coordinator}</td>
                  <td className="py-4 px-6 whitespace-nowrap">{course.duration}</td>
                  <td className="py-4 px-6">{course.sponsor}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Course202021Page; 