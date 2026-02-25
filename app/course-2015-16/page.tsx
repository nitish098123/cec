import React from "react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Courses 2015-16 | CEC",
  description: "Continuing Education Centre, IIT Roorkee",
};

const mainCourses = [
    { sno: 1, department: "CIVIL", name: "Analysis and Design of Hydraulic Structures", coordinator: "Dr. Z. Ahmad", duration: "April 20 – May 2, 2015", participants: 20 },
    { sno: 2, department: "DOMS", name: "Strategic HRM & Research Perspectives", coordinator: "Dr. Rajib L. Dhar", duration: "May 23-24, 2015", participants: 8 },
    { sno: 3, department: "AHEC", name: "Small Hydropower Development", coordinator: "Dr. Arun Kumar", duration: "May 25-29, 2015", participants: 24 },
    { sno: 4, department: "DOMS", name: "Planning and Organizing Skills held at BHEL", coordinator: "Dr. S. Rangnekar & Dr. Usha Lenka", duration: "May 28-29, 2015", participants: 43 },
    { sno: 5, department: "AHEC", name: "Real Time Digital Simulator for SHP Stations", coordinator: "Dr. M.K. Singhal", duration: "June 8-13,2015", participants: 8 },
    { sno: 6, department: "DOMS", name: "Team Work and Interpersonal Relations held at BHEL", coordinator: "Dr. S. Rangnekar & Dr. Usha Lenka", duration: "June 18, 2016", participants: 22 },
    { sno: 7, department: "DOMS", name: "Data Analysis for Research and Publication", coordinator: "Dr. J.K. Nayak", duration: "June 20-21, 2015", participants: 38 },
    { sno: 8, department: "EARTHQUAKE", name: "International Course on GIS Concept and Application", coordinator: "Dr. J. Das & Dr. A.K. Saraf", duration: "June 22-26, 2015", participants: 5 },
    { sno: 9, department: "ARCHITECTURE", name: "Whole Building Simulation Tools : Fundamentals of Energy Efficiency and Simulations held at Greater Noida", coordinator: "Dr. Avlokita Agrawal & Dr. E. Rajsekhar", duration: "July 6-8, 2015", participants: 16 },
    { sno: 10, department: "AHEC", name: "Operation and Maintenance of SHP Stations", coordinator: "Dr. S.N. Singh", duration: "July 13-16, 2015", participants: 16 },
    { sno: 11, department: "AHEC", name: "Real Time Digital Simulator for SHP Stations", coordinator: "Dr. D.K. Khatod", duration: "July 20-25, 2015", participants: 9 },
    { sno: 12, department: "AHEC", name: "Real Time Digital Simulator for SHP Stations", coordinator: "Dr. M.K. Singhal", duration: "Aug. 17-22, 2015", participants: 7 },
    { sno: 13, department: "DOMS", name: "GET Induction Programme", coordinator: "Dr. S. Rangnekar & Dr. Dinesh Kumar", duration: "Aug. 19-22, 2015", participants: 28 },
    { sno: 14, department: "AHEC", name: "DPR Preparation and Evaluation for SHP Projects", coordinator: "Dr. S.K. Singal", duration: "Aug. 24-27, 2015", participants: 21 },
    { sno: 15, department: "EARTHQUAKE", name: "Enterprises Risk Management – Module- I", coordinator: "Dr. B.K. Maheshwari & Dr. Rajat Agarwal", duration: "Aug. 31- Sept. 4, 2015", participants: 22 },
    { sno: 16, department: "AHEC", name: "Real Time Digital Simulator for SHP Stations", coordinator: "Dr. D.K. Khatod", duration: "Sept. 7-12, 2015", participants: 5 },
    { sno: 17, department: "WRD&M", name: "Feasibility, Advance Survey and Investigation Study for MIS", coordinator: "Dr. Deepak Khare", duration: "Sept. 14-19,2015", participants: 16 },
    { sno: 18, department: "WRD&M", name: "Feasibility, Advance Survey and Investigation Study for MIS", coordinator: "Dr. Deepak Khare", duration: "Sept. 21-26,2015", participants: 16 },
    { sno: 19, department: "AHEC", name: "Real Time Digital Simulator for SHP Stations", coordinator: "Dr. M.K. Singhal", duration: "Oct. 5-10, 2015", participants: 7 },
    { sno: 20, department: "AHEC", name: "STP Maintenance and Lake Conservation", coordinator: "Dr. Arun Kumar", duration: "Oct. 12-18, 2015", participants: 7 },
    { sno: 21, department: "EARTHQUAKE", name: "Enterprises Risk Management – Module-I I", coordinator: "Dr. B.K. Maheshwari & Dr. Rajat Agarwal", duration: "Oct. 13-17, 2015", participants: 22 },
    { sno: 22, department: "DOMS", name: "Conflict Management held at BHEL", coordinator: "Dr. S. Rangnekar & Dr. Usha Lenka", duration: "Oct. 16-17, 2015", participants: 22 },
    { sno: 23, department: "DOMS", name: "Crisis Communication held at BHEL", coordinator: "Dr. S. Rangnekar & Dr. Usha Lenka", duration: "Oct. 23-24, 2015", participants: 20 },
    { sno: 24, department: "HYDROLOGY", name: "International Course on Flood Forecasting and Warning", coordinator: "Dr. D.S. Arya & Dr. N.K. Goel", duration: "Oct. 26 - Nov. 1, 2015", participants: 21 },
    { sno: 25, department: "WRD&M", name: "Dam Break Analysis", coordinator: "Dr. S.K. Mishra & Dr. Deepak Khare", duration: "Nov. 2-4, 2015", participants: 19 },
    { sno: 26, department: "AHEC", name: "Real Time Digital Simulator for SHP Stations", coordinator: "Dr. D.K. Khatod", duration: "Nov. 2-7, 2015", participants: 8 },
    { sno: 27, department: "AHEC", name: "Energy Efficient Buildings", coordinator: "Dr. Arun Kumar", duration: "Nov. 6-7, 2015", participants: 31 },
    { sno: 28, department: "AHEC", name: "Selection & Design of Electro Mechanical Equipment for SHP", coordinator: "Dr. S.N. Singh", duration: "Nov. 16-20, 2015", participants: 23 },
    { sno: 29, department: "CHEMICAL", name: "Recent Trends in Environmental Monitoring and Control Strategies in Petroleum and Petrochemical Industries", coordinator: "Dr. V.C. Srivastava", duration: "Nov. 26-28, 2015", participants: 20 },
    { sno: 30, department: "DOMS", name: "Data Analysis for Research & Publication", coordinator: "Dr. J.K. Nayak", duration: "Dec. 5-6, 2015", participants: 23 },
    { sno: 31, department: "AHEC", name: "Real Time Digital Simulator for SHP Stations", coordinator: "Dr. M.K. Singhal", duration: "Dec. 7-12, 2015", participants: 9 },
    { sno: 32, department: "AHEC", name: "Performance Testing and Evaluation for SHP Stations", coordinator: "Dr. R.P. Saini", duration: "Dec. 14-18, 2015", participants: 16 },
    { sno: 33, department: "CIVIL", name: "Finite Element Analysis", coordinator: "Dr. V. A. Sawant", duration: "Dec. 28-30, 2015", participants: 17 },
    { sno: 34, department: "CIVIL", name: "Tunnelling in Poor Rock Condition", coordinator: "Dr. Mahendra Singh", duration: "Jan. 4-6, 2016", participants: 17 },
    { sno: 35, department: "WRD&M", name: "Assessment of Soil Erosion and Sedimentation Control in Hydropower Projects", coordinator: "Dr. Deepak Khare", duration: "Jan. 7-9, 2016", participants: 16 },
    { sno: 36, department: "CIVIL", name: "GIS Applications", coordinator: "Dr. R.D. Garg", duration: "Jan. 11-13, 2016", participants: 17 },
    { sno: 37, department: "ELECTRICAL", name: "Metering Technology & AMR Application", coordinator: "Dr. Vinod Kumar", duration: "Jan. 12-14, 2016", participants: 15 },
    { sno: 38, department: "AHEC", name: "Real Time Digital Simulator for SHP Stations", coordinator: "Dr. M.K. Singhal", duration: "Jan. 18-23, 2016", participants: 8 },
    { sno: 39, department: "ELECTRICAL", name: "Metering Technology & AMR Application", coordinator: "Dr. Vinod Kumar", duration: "Jan. 21-23, 2016", participants: 8 },
    { sno: 40, department: "CIVIL", name: "GIS Applications", coordinator: "Dr. R.D. Garg", duration: "Jan. 28-30, 2016", participants: 21 },
    { sno: 41, department: "AHEC", name: "Real Time Digital Simulator for SHP Stations", coordinator: "Dr. M.K. Singhal", duration: "Feb. 8-13, 2016", participants: 8 },
    { sno: 42, department: "AHEC", name: "Small Hydropower Dvelopment", coordinator: "Dr. S.K. Singal", duration: "Feb. 15-19, 2016", participants: 19 },
    { sno: 43, department: "MECHANICAL", name: "National Ambient Noise Monitoring Network-Design, Implementation and Control Technique", coordinator: "Dr. S.H. Upadhyay", duration: "Feb. 17-19, 2016", participants: 18 },
    { sno: 44, department: "AHEC", name: "Real Time Digital Simulator for SHP Stations", coordinator: "Dr. D.K. Khatod", duration: "Feb. 22-27, 2016", participants: 8 },
    { sno: 45, department: "ELECTRICAL", name: "Advanced Control Techniques in Electrical and Electronics Engg.", coordinator: "Dr. Y.V. Hote", duration: "Feb. 22-26, 2016", participants: 13 },
    { sno: 46, department: "EARTHQUAKE", name: "Enterprises Risk Management", coordinator: "Dr. B.K. Maheshwari & Dr. Rajat Agarwal", duration: "Feb. 29-March 4, 2016", participants: 21 },
    { sno: 47, department: "CIVIL", name: "GIS Applications", coordinator: "Dr. R.D. Garg", duration: "March 28-30, 2016", participants: 14 },
];

const onlineCourses = [
    { sno: 1, department: "DOMS", name: "Project Management", coordinator: "Dr. M.K. Barua", duration: "Sept. 2015 – Nov. 2015", participants: 92 },
    { sno: 2, department: "COMPUTER SCIENCE", name: "Data Mining and Analytics", coordinator: "Dr. Durga Toshniwal", duration: "Sept. 2015 - Jan. 2016", participants: 124 },
];

const Course201516Page = () => {
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
              Courses 2015-16
            </h1>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <h2 className="text-2xl md:text-3xl font-semibold text-center mb-8 md:mb-12">
          LIST OF SHORT-TERM COURSES CONDUCTED DURING 2015-16
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
              {mainCourses.map((course) => (
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

        <h2 className="text-3xl font-semibold text-center mb-12">
            Online Courses from September 2015 – January 2016
        </h2>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200">
            <thead className="bg-gray-800 text-white">
              <tr>
                <th className="py-3 px-4 text-left">S.No.</th>
                <th className="py-3 px-4 text-left">Course Co-ordinator/(Deptt.)</th>
                <th className="py-3 px-4 text-left">Course Name</th>
                <th className="py-3 px-4 text-left">Course Coordinator (s)</th>
                <th className="py-3 px-4 text-left">Duration</th>
                <th className="py-3 px-4 text-left">No. of Participants</th>
              </tr>
            </thead>
            <tbody>
              {onlineCourses.map((course) => (
                <tr key={course.sno} className="border-b hover:bg-gray-100">
                  <td className="py-3 px-4">{course.sno}</td>
                  <td className="py-3 px-4">{course.department}</td>
                  <td className="py-3 px-4">{course.name}</td>
                  <td className="py-3 px-4">{course.coordinator}</td>
                  <td className="py-3 px-4">{course.duration}</td>
                  <td className="py-3 px-4">{course.participants}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Course201516Page; 