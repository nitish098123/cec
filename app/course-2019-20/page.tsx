import React from "react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Courses 2019-20 | CEC",
  description: "Continuing Education Centre, IIT Roorkee",
};

const courses = [
    { sno: 1, department: "CIVIL", course: "GIS Base Map Preparation", investigator: "Dr. Kamal Jain", duration: "June 10-16,2019", sponsor: "MP Power Transmission Ltd., Jabalpur" },
    { sno: 2, department: "ARCHITECTURE", course: "Structural Equation Modeling and Its Application in Architecture & Planning", investigator: "Dr. H.S. Lakra", duration: "June 17-21,2019", sponsor: "Self Sponsored" },
    { sno: 3, department: "MATHEMATICS", course: "Machine Learning with Python for Practical Examples", investigator: "Dr. Sanjeev Kumar", duration: "June 24-28, 2019", sponsor: "NIC, New Delhi" },
    { sno: 4, department: "ELECTRICAL", course: "Control Theory and Its Applications", investigator: "Dr. Y.V. Hote", duration: "July 9-12, 2019", sponsor: "BEL, Bangalore" },
    { sno: 5, department: "ELECTRONICS", course: "Linearized Power Amplifier", investigator: "Dr. Karun Rawat", duration: "July 15-17,2019", sponsor: "BEL, Bangalore" },
    { sno: 6, department: "ELECTRONICS", course: "Linearized Power Amplifier", investigator: "Dr. Karun Rawat", duration: "August 5-7,2019", sponsor: "BEL, Bangalore" },
    { sno: 7, department: "EARTHQUAKE", course: "Recent Advances in Bridge Design and Construction", investigator: "Dr. Yogendra Singh", duration: "August 7-9, 2019", sponsor: "RDSO, Ministry of Railway" },
    { sno: 8, department: "AHEC", course: "Pump Storage Design, Operation & Integration with Renewable Energy", investigator: "Dr. S.K. Singal", duration: "August 19-23, 2019", sponsor: "NHPC Ltd., Faridabad" },
    { sno: 9, department: "AHEC", course: "Wind Power-Emerging Technology", investigator: "Dr. R.P. Saini", duration: "Au. 26-30, 2019", sponsor: "NHPC Ltd., Faridabad" },
    { sno: 10, department: "AHEC", course: "Regulatory Framework and Operation of Power Station", investigator: "Dr. S.K. Singal", duration: "Sept. 2-6, 2019", sponsor: "NHPC Ltd., Faridabad" },
    { sno: 11, department: "AHEC", course: "Hydraulic Turbine Testing", investigator: "Dr. S.K. Singal", duration: "Sept. 9-13, 2019", sponsor: "NHPC Ltd., Faridabad" },
    { sno: 12, department: "AHEC", course: "Int. Training Programme on Small Hydropower development", investigator: "Dr. Arun Kumar", duration: "Sept. 16-28,2019", sponsor: "Ministry of External Affairs" },
    { sno: 13, department: "AHEC", course: "Sediment Monitoring and Abrasion Testing", investigator: "Dr. S.K. Singal", duration: "Nov. 4-8, 2019", sponsor: "NHPC Ltd., Faridabad" },
    { sno: 14, department: "CHEMICAL", course: "Environmental Management in Tanneries (including ZLD, Chrome Recovery), Sponge Iron Plants, Slaughter Houses, Pharma and Chemical Sector", investigator: "Dr. V.C. Srivastava", duration: "Jan. 13-17, 2020", sponsor: "CPCB, New Delhi" },
    { sno: 15, department: "CIVIL", course: "Refreseher Course on Building, Design and Construction", investigator: "Dr. Umesh K. Sharma", duration: "Jan. 16-18, 2020", sponsor: "Tata Steels" },
    { sno: 16, department: "AHEC", course: "Pump Storage Design, Operation & Integration with Renewable Energy", investigator: "Dr. S.K. Singal", duration: "Jan. 20-24, 2020", sponsor: "NHPC Ltd., Faridabad" },
    { sno: 17, department: "AHEC", course: "Solar Power-Emerging Technology and O&M Issues of Solar Power", investigator: "Dr. R.P. Saini", duration: "Jan. 27-31,2020", sponsor: "NHPC Ltd., Faridabad" },
    { sno: 18, department: "EARTHQUAKE", course: "Risk Targeted Seismic Design", investigator: "Dr. S. Shiradhonkar", duration: "Feb. 18-22,2020", sponsor: "Self Sponsored" }
];

const Course201920Page = () => {
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
              Courses 2019-20
            </h1>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <h2 className="text-2xl md:text-3xl font-semibold text-center mb-8 md:mb-12">
          LIST OF SHORT-TERM COURSES CONDUCTED DURING 2019-20
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
                <th className="py-3 px-6 text-left text-xs font-medium uppercase tracking-wider">No. of Participants</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {courses.map((course) => (
                <tr key={course.sno} className="border-b hover:bg-gray-100">
                  <td className="py-4 px-6 whitespace-nowrap">{course.sno}</td>
                  <td className="py-4 px-6 whitespace-nowrap">{course.department}</td>
                  <td className="py-4 px-6">{course.course}</td>
                  <td className="py-4 px-6">{course.investigator}</td>
                  <td className="py-4 px-6 whitespace-nowrap">{course.duration}</td>
                  <td className="py-4 px-6 whitespace-nowrap">{course.sponsor}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Course201920Page; 