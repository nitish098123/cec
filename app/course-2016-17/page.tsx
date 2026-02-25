import React from "react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Courses 2016-17 | CEC",
  description: "Continuing Education Centre, IIT Roorkee",
};

const courses = [
    { sno: 1, department: "EARTHQUAKE", name: "Retrofitting Methodology", coordinator: "Dr. M.L. Sharma & Dr. M. Shrikhande", duration: "April 5-25,2016", sponsor: "UDRP,GoU", participants: 28 },
    { sno: 2, department: "MMED", name: "Advanced Knowledge of Safety :Quality Inspection, Fatigue and Fracture Mechanics", coordinator: "Dr. P.K. Ghosh", duration: "April 18-23,2016", sponsor: "IPR", participants: 12 },
    { sno: 3, department: "AHEC", name: "Real Time Digital Simulator for SHP Stations", coordinator: "Dr. M.K. Singhal", duration: "May 9-14,2016", sponsor: "MNRE", participants: 7 },
    { sno: 4, department: "HYDROLOGY", name: "River Basin Planning using HEC Software", coordinator: "Dr. N.K. Goel", duration: "May 16-20,2016", sponsor: "MWR", participants: 20 },
    { sno: 5, department: "AHEC", name: "DPR Preparation and Evaluation for SHP Projects", coordinator: "Dr. S.K. Singhal", duration: "May 31-June 3,2016", sponsor: "MNRE", participants: 21 },
    { sno: 6, department: "DOMS", name: "Data Analysis for Research and Publication", coordinator: "Dr. J.K. Nayak", duration: "June 18-19,2016", sponsor: "OPEN", participants: 33 },
    { sno: 7, department: "MIED", name: "GET Induction Programme", coordinator: "Dr. Dinesh Kumar", duration: "June 27-30,2016", sponsor: "EVEREST INDUSTRIES", participants: 23 },
    { sno: 8, department: "HYDROLOGY", name: "River Basin Planning using HEC- RAS", coordinator: "Dr. N.K. Goel", duration: "July 11-16, 2016", sponsor: "MWR", participants: 21 },
    { sno: 9, department: "AHEC", name: "Real Time Digital Simulator for SHP Stations", coordinator: "Dr. M.K. Singhal", duration: "Aug. 8-13, 2016", sponsor: "MNRE", participants: 9 },
    { sno: 10, department: "AHEC", name: "Small Hydropower Development", coordinator: "Dr. Arun Kumar", duration: "Aug. 29-Sept. 2, 2016", sponsor: "MNRE", participants: 15 },
    { sno: 11, department: "AHEC", name: "Real Time Digital Simulator for SHP Stations", coordinator: "Dr. M.K. Singhal", duration: "Sept. 5-10, 2016", sponsor: "MNRE", participants: 9 },
    { sno: 12, department: "HYDROLOGY", name: "River Basin Planning using HEC- RAS", coordinator: "Dr. N.K. Goel", duration: "Sept. 5-10, 2016", sponsor: "MWR", participants: 17 },
    { sno: 13, department: "AHEC", name: "Int. Course on Diversion Structure and Dam Design of Hydro Power Projects", coordinator: "Dr. Arun Kumar", duration: "Sept. 5-15,2016", sponsor: "", participants: 10 },
    { sno: 14, department: "AHEC", name: "Operation & Maintenance of SHP Stations", coordinator: "Dr. S.N. Singh", duration: "Sept. 19-22, 2016", sponsor: "MNRE", participants: 9 },
    { sno: 15, department: "AHEC", name: "Real Time Digital Simulator for SHP Stations", coordinator: "Dr. M.K. Singhal", duration: "Oct. 17-22,2016", sponsor: "MNRE", participants: 10 },
    { sno: 16, department: "EARTHSCIENCE & EARTHQUAKE", name: "Geoinformatics in Earthquake Studies", coordinator: "Dr. A.K. Saraf & Dr. J. Das", duration: "Nov. 1-5,2016", sponsor: "", participants: 18 },
    { sno: 17, department: "AHEC", name: "Real Time Digital Simulator for SHP Stations", coordinator: "Dr. M.K. Singhal", duration: "Nov. 7-12,2016", sponsor: "MNRE", participants: 11 },
    { sno: 18, department: "HYDROLOGY", name: "Identification of Contaminated Sites and Its Treatment Technologies", coordinator: "Dr. B.K. Yadav", duration: "Nov. 14-18, 2016", sponsor: "CPCB", participants: 12 },
    { sno: 19, department: "AHEC", name: "Selection & Design of Electro Mechanical Equipment for SHP", coordinator: "Dr. S.N. Singh", duration: "Nov. 21-25, 2016", sponsor: "MNRE", participants: 11 },
    { sno: 20, department: "AHEC", name: "Real Time Digital Simulator for SHP Stations", coordinator: "Dr. M.K. Singhal", duration: "Nov. 28-Dec.3, 2016", sponsor: "MNRE", participants: 10 },
    { sno: 21, department: "AHEC", name: "Real Time Digital Simulator for SHP Stations", coordinator: "Dr. M.K. Singhal", duration: "Dec. 5-10,2016", sponsor: "MNRE", participants: 9 },
    { sno: 22, department: "DOMS", name: "Data Analysis for Research & Publication", coordinator: "Dr. J.K. Nayak", duration: "Dec. 10-11,2016", sponsor: "OPEN", participants: 27 },
    { sno: 23, department: "WRDM", name: "Int. Course on Planning, Design & Implementation of Irrigation Schemes", coordinator: "Dr. Ashish Pandey", duration: "Dec. 5-15, 2016", sponsor: "MEW, AFGHANISTAN", participants: 15 },
    { sno: 24, department: "AHEC", name: "Hydropower development", coordinator: "Dr. S.K. Singal", duration: "Dec. 12-24,2016", sponsor: "WRD, Maharashtra", participants: 36 },
    { sno: 25, department: "AHEC", name: "Performance Testing and Evaluation for SHP Stations", coordinator: "Dr. R.P. Saini", duration: "Dec. 19-23, 2016", sponsor: "MNRE", participants: 16 },
    { sno: 26, department: "WRDM", name: "Dam Safety Management including Instrumentation of Existing Dams", coordinator: "Dr. S.K. Mishra", duration: "Jan. 12-14,2017", sponsor: "NHPC", participants: 16 },
    { sno: 27, department: "AHEC", name: "Real Time Digital Simulator for SHP Stations", coordinator: "Dr. M.K. Singhal", duration: "Jan. 16-21,2017", sponsor: "MNRE", participants: 6 },
    { sno: 28, department: "WRDM", name: "Geotechnical & Geological investigations under overburden", coordinator: "Dr. Mahendra Singh", duration: "Jan. 27-29,2017", sponsor: "NHPC", participants: 20 },
    { sno: 29, department: "WRDM", name: "Assessment of Soil Erosion & Sedimentation Control in", coordinator: "Dr. Deepak Khare", duration: "Jan. 30-Feb.1,2017", sponsor: "NHPC", participants: 20 },
    { sno: 30, department: "AHEC", name: "Real Time Digital Simulator for SHP Stations", coordinator: "Dr. M.K. Singhal", duration: "Jan. 30-Feb. 4,2017", sponsor: "MNRE", participants: 8 },
    { sno: 31, department: "CHEMICAL", name: "Cleaner Production Technologies – Practical Aspects", coordinator: "Dr. V.C. Srivastava", duration: "Feb. 15-17,2017", sponsor: "CPCB", participants: 23 },
    { sno: 32, department: "AHEC", name: "Real Time Digital Simulator for SHP Stations", coordinator: "Dr. M.K. Singhal", duration: "Feb.20-25,2017", sponsor: "MNRE", participants: 10 },
    { sno: 33, department: "AHEC", name: "Int. Course on Planning and Design of Underground Structures of HP Project", coordinator: "Dr. Arun Kumar", duration: "Feb. 21-28,2017", sponsor: "DGPCL, Thimpu,Bhutan", participants: 10 },
    { sno: 34, department: "HYDROLOGY", name: "River Basin Planning using HEC- RAS", coordinator: "Dr. N.K. Goel", duration: "Feb. 20-25, 2017", sponsor: "MWR", participants: 11 },
    { sno: 35, department: "ARCHITECTURE", name: "Modeling Techniques for Sustainable Built Environment", coordinator: "Dr. Mahua Mukherjee", duration: "March 17-19,2017", sponsor: "OPEN", participants: 17 },
    { sno: 36, department: "AHEC", name: "Small Hydropower Development", coordinator: "Dr. S.K. Singhal", duration: "March 20-24,2017", sponsor: "DGPCL, Thimpu,Bhutan", participants: 15 },
    { sno: 37, department: "DOMS", name: "Hydropower Development and General Management for AE's", coordinator: "Dr. S. Rangnekar", duration: "March 7-April 14, 2017", sponsor: "UJVNL, Uttarakhand", participants: 45 },
];

const Course201617Page = () => {
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
              Courses 2016-17
            </h1>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <h2 className="text-2xl md:text-3xl font-semibold text-center mb-8 md:mb-12">
          LIST OF SHORT-TERM COURSES CONDUCTED DURING 2016-17
        </h2>
        <div className="overflow-x-auto shadow-md sm:rounded-lg">
          <table className="min-w-full bg-white border border-gray-200">
            <thead className="bg-gray-800 text-white">
              <tr>
                <th className="py-3 px-6 text-left text-xs font-medium uppercase tracking-wider">S.No.</th>
                <th className="py-3 px-6 text-left text-xs font-medium uppercase tracking-wider">Course Name</th>
                <th className="py-3 px-6 text-left text-xs font-medium uppercase tracking-wider">Course Coordinator</th>
                <th className="py-3 px-6 text-left text-xs font-medium uppercase tracking-wider">Duration</th>
                <th className="py-3 px-6 text-left text-xs font-medium uppercase tracking-wider">No. of Participants</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {courses.map((course) => (
                <tr key={course.sno} className="border-b hover:bg-gray-100">
                  <td className="py-4 px-6 whitespace-nowrap">{course.sno}</td>
                  <td className="py-4 px-6">{course.name}</td>
                  <td className="py-4 px-6">{course.coordinator}</td>
                  <td className="py-4 px-6 whitespace-nowrap">{course.duration}</td>
                  <td className="py-4 px-6 whitespace-nowrap">{course.participants}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Course201617Page; 