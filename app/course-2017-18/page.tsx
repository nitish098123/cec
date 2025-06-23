import React from "react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Courses 2017-18 | CEC",
  description: "Continuing Education Centre, IIT Roorkee",
};

const courses = [
    { sno: 1, department: "DOMS", name: "Managerial Excellence", coordinator: "Dr. S. Rangnekar", duration: "April 1 – Nov. 30, 2017", sponsor: "BHEL, Hardwar", participants: 40 },
    { sno: 2, department: "DOMS", name: "Business Analytics", coordinator: "Dr. A. Ramesh", duration: "April 8-9,2017", sponsor: "OPEN", participants: 33 },
    { sno: 3, department: "CIVIL", name: "Earthquake Resistant Structures", coordinator: "Dr. Praveen Kumar", duration: "May 16-18,2017", sponsor: "RED,Lucknow", participants: 16 },
    { sno: 4, department: "DOMS", name: "Collective Bargaining", coordinator: "Dr. S. Rangnekar", duration: "May 19, 2017", sponsor: "Ahresty India Pvt. Ltd., Bawal, Haryana", participants: 13 },
    { sno: 5, department: "DOMS", name: "Strategic HRD and Research Perspectives", coordinator: "Dr. R.L. Dhar", duration: "June 10-11,2017", sponsor: "OPEN", participants: 30 },
    { sno: 6, department: "MIED", name: "Engineering and Management", coordinator: "Dr. B.K. Gandhi", duration: "June 19-22,2017", sponsor: "BRIDCUL, Uttarakhand", participants: 13 },
    { sno: 7, department: "WRDM", name: "Soil Erosion and Sedimentation Control in Hydro Power Projects", coordinator: "Dr. Ashish Pandey", duration: "June 19-24,2017", sponsor: "NHPC", participants: 20 },
    { sno: 8, department: "MIED", name: "Get Induction Programme", coordinator: "Dr. Dinesh Kumar", duration: "August 1-4,2017", sponsor: "Everest Industries Ltd., Noida", participants: 17 },
    { sno: 9, department: "CIVIL", name: "Innovation in Concrete Repair Technology for Hydraulic Structures", coordinator: "Dr. P.K. Gupta", duration: "Aug. 10-14, 2017", sponsor: "NEEPCO, Meghalaya", participants: 19 },
    { sno: 10, department: "ELECTRICAL", name: "Modern Techniques in Nonlinear Robust Control", coordinator: "Dr. Sohom Chakrabarty", duration: "Aug. 7-10, 2017", sponsor: "OPEN", participants: 25 },
    { sno: 11, department: "WRDM", name: "Dam Safety Management including Instrumentation of Existing Dams", coordinator: "Dr. S.K. Mishra", duration: "Aug. 7-14, 2017", sponsor: "SJVNL, Shimla", participants: 16 },
    { sno: 12, department: "DOMS", name: "Data Analysis for Research and Publication", coordinator: "Dr. J.K. Nayak", duration: "Aug. 18-20,2017", sponsor: "OPEN", participants: 28 },
    { sno: 13, department: "WRDM", name: "Technical Issues of Hydropower", coordinator: "Dr. S.K. Mishra", duration: "Aug. 19-26,2017", sponsor: "SJVNL, Shimla", participants: 16 },
    { sno: 14, department: "AHEC", name: "Int. Course on Small Hydropower Development", coordinator: "Dr. S.K. Singhal", duration: "Sept. 11-16,2017", sponsor: "Bhutan Power Corp. Ltd., Bhutan", participants: 5 },
    { sno: 15, department: "WRDM", name: "Project Management for River Valley Projects", coordinator: "Dr. Ashish Pandey", duration: "Sept. 11-16, 2017", sponsor: "NHPC", participants: 20 },
    { sno: 16, department: "ELECTRICAL", name: "Metering Technology & AMR Application", coordinator: "Dr. Manoj Tripathy", duration: "Sept. 26-28,2017", sponsor: "PFC", participants: 12 },
    { sno: 17, department: "WRDM", name: "Dam Safety Management including Instrumentation of Existing Dams", coordinator: "Dr. S.K. Mishra", duration: "Sept. 26-Oct. 1,2017", sponsor: "NHPC", participants: 13 },
    { sno: 18, department: "CIVIL", name: "Geotechnical & Geological Investigations under High Over Burden", coordinator: "Dr. Satyendra Mittal", duration: "Oct. 2-7,2017", sponsor: "NHPC", participants: 21 },
    { sno: 19, department: "CIVIL", name: "GIS Applications", coordinator: "Dr. R.D. Garg", duration: "Oct. 3-5,2017", sponsor: "PFC", participants: 8 },
    { sno: 20, department: "AHEC", name: "Int. Course on SHP Development with Emphasis on Investigations and Report preparation", coordinator: "Dr. Arun Kumar", duration: "Oct. 9-21,2017", sponsor: "MEA, GoI", participants: 22 },
    { sno: 21, department: "HYDROLOGY", name: "Open Data Sources: Introduction and Spatiotemporal Analysis", coordinator: "Dr. D.S. Arya", duration: "Oct. 9-14,2017", sponsor: "MWR", participants: 18 },
    { sno: 22, department: "CIVIL", name: "River Hydrodynamics & Training Works", coordinator: "Dr. Z. Ahmad", duration: "Oct. 9-14,2017", sponsor: "", participants: 20 },
    { sno: 23, department: "CIVIL", name: "GIS Applications", coordinator: "Dr. R.D. Garg", duration: "Oct. 23-25,2017", sponsor: "PFC", participants: 16 },
    { sno: 24, department: "ELECTRICAL", name: "Metering Technology & AMR Application", coordinator: "Dr. Manoj Tripathy", duration: "Oct. 27-29,2017", sponsor: "PFC", participants: 19 },
    { sno: 25, department: "HYDROLOGY", name: "Investigation, Remediation and Management of Soil and Groundwater Contaminated Sites", coordinator: "Dr. B.K. Yadav", duration: "Nov. 20-22,2017", sponsor: "CPCB", participants: 19 },
    { sno: 26, department: "WRDM", name: "Application of Remote Sensing & GIS in Hydro Power Project", coordinator: "Dr. Ashish Pandey", duration: "Nov. 27-Dec.2, 2017", sponsor: "NHPC", participants: 19 },
    { sno: 27, department: "WRDM", name: "Risk Management in Tunnelling and Underground Caverns", coordinator: "Dr. S.K. Mishra", duration: "Dec. 11-16,2017", sponsor: "NHPC", participants: 17 },
    { sno: 28, department: "CIVIL", name: "Wind Loads on Tall Structures", coordinator: "Dr. P.K. Gupta", duration: "Jan. 7-13,2018", sponsor: "MECON Ltd. Ranchi", participants: 12 },
    { sno: 29, department: "CIVIL", name: "Slope Stability and Stabilization Techniques, Treatment with Geo Synthetics for HE Projects", coordinator: "Dr. Satyendra Mittal", duration: "Jan. 15-20,2018", sponsor: "NHPC", participants: 11 },
    { sno: 30, department: "EARTHQUAKE", name: "Seismic Vulnerability Assessment and Retrofitting of Buildings", coordinator: "Dr. Pankaj Agarwal", duration: "Jan. 8-23,2018", sponsor: "PWD,Tripura", participants: 10 },
    { sno: 31, department: "CIVIL PMGSY", name: "New Technologies under PMGSY", coordinator: "Dr. Praveen Kumar", duration: "Jan. 23-25,2018", sponsor: "RED, Lucknow", participants: 17 },
    { sno: 32, department: "HYDROLOGY", name: "Int. Course on Water Resources Management", coordinator: "Dr. D.S. Arya", duration: "Jan. 8-27,2018", sponsor: "MEA,GoI", participants: 19 },
    { sno: 33, department: "AHEC", name: "Int. Course on Design of Small Hydropower Works", coordinator: "Dr. Arun Kumar", duration: "Feb. 5-17,2018", sponsor: "MEA,GoI", participants: 26 },
    { sno: 34, department: "DOMS", name: "Competency Development held at GNEC, Noida", coordinator: "Dr. M.K. Barua", duration: "March 10-14,2018", sponsor: "ITDC", participants: 19 },
    { sno: 35, department: "CIVIL", name: "Comprehensive Module on Civil Engineering", coordinator: "Dr. Umesh K. Shrma", duration: "March 12-16,2018", sponsor: "IOCL, Noida", participants: 15 },
];

const Course201718Page = () => {
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
              Courses 2017-18
            </h1>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <h2 className="text-2xl md:text-3xl font-semibold text-center mb-8 md:mb-12">
          LIST OF SHORT-TERM COURSES CONDUCTED DURING 2017-18
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

export default Course201718Page; 