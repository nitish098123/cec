import React from "react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Courses 2014-15 | CEC",
  description: "Continuing Education Centre, IIT Roorkee",
};

const courses = [
    { sno: 1, coordinator: "Dr. S. Rangnekar", name: "Management Skills for Technical Personnel", duration: "April 5, 2014", participants: 15 },
    { sno: 2, coordinator: "Dr. N.K. Goel & Dr. D.S. Arya", name: "Int. Course on Climate Change Issues and Its Impact on Water Resources Management in the Coastal and Seasonal Wetlands", duration: "April 7-17, 2014", participants: 15 },
    { sno: 3, coordinator: "Dr. S. Rangnekar", name: "Managerial Excellence held at BHEL", duration: "April 11-12, 2014", participants: 33 },
    { sno: 4, coordinator: "Dr. S. Rangnekar", name: "Managerial Excellence held at BHEL", duration: "April 18-19, 2014", participants: 19 },
    { sno: 5, coordinator: "Dr. S. Rangnekar", name: "Managerial Excellence held at BHEL", duration: "April 25-26, 2014", participants: 27 },
    { sno: 6, coordinator: "Dr. S. Rangnekar", name: "Training of Trainers for BHEL Personnel", duration: "May 5-6, 2014", participants: 21 },
    { sno: 7, coordinator: "Dr. S. Rangnekar", name: "Team Work", duration: "May 12-13, 2014", participants: 38 },
    { sno: 8, coordinator: "Dr. S. Rangnekar", name: "People Capability", duration: "May 16-17, 2014", participants: 42 },
    { sno: 9, coordinator: "Dr. A. Ramesh", name: "Big Data Analysis for Improving Business Performance", duration: "May 17-18, 2014", participants: 24 },
    { sno: 10, coordinator: "Dr. M.K. Barua & Dr. Usha Lenka", name: "Fundamentals and Applications of Structural Equations Modeling", duration: "May 24-25, 2014", participants: 10 },
    { sno: 11, coordinator: "Dr. S. Rangnekar", name: "Creativity & Innovation", duration: "May 27-28, 2014", participants: 15 },
    { sno: 12, coordinator: "Dr. J.K. Nayak", name: "Data Analysis for Research and Publication", duration: "May 31-June 1, 2014", participants: 34 },
    { sno: 13, coordinator: "Dr. R.L. Dhar", name: "Strategic Human Resource Management for Effective Performance", duration: "June 14-15, 2014", participants: 17 },
    { sno: 14, coordinator: "Dr. N.K. Goel & Dr. D.S. Arya", name: "Hydrological Analysis and Planning for Water Resources Projects", duration: "July 13-18, 2014", participants: 20 },
    { sno: 15, coordinator: "Dr. Praveen Kumar", name: "Earthquake Resistant Structures", duration: "July 24-26, 2014", participants: 15 },
    { sno: 16, coordinator: "Dr. S. Rangnekar", name: "GET/DET Induction Programme", duration: "Aug. 25-28, 2014", participants: 27 },
    { sno: 17, coordinator: "Dr. P.K. Ghosh", name: "Harnessing the Researcher to Promote Sustainable Innovation", duration: "Sept. 2-6, 2014", participants: 22 },
    { sno: 18, coordinator: "Dr. M.K. Singhal", name: "Real Time Digital Simulator for SHP Stations", duration: "Sept. 8-13, 2014", participants: 9 },
    { sno: 19, coordinator: "Dr. Praveen Kumar", name: "Earthquake Resistant Structures", duration: "Sept. 11-13, 2014", participants: 12 },
    { sno: 20, coordinator: "Dr. M.P. Sharma", name: "Int. Course on Small Hydropower Development", duration: "Sept. 15-26, 2014", participants: 30 },
    { sno: 21, coordinator: "Dr. Arun Kumar", name: "Small Hydropower Development", duration: "Sept. 27-28, 2014", participants: 10 },
    { sno: 22, coordinator: "Dr. Vishwas Sawant", name: "Introduction to Finite Elements", duration: "Oct. 7-9, 2014", participants: 20 },
    { sno: 23, coordinator: "Dr. Ashish Pandey", name: "Application of Remote Sensing in respect of Geological and Geotechnical Aspects in Hydroelectric Projects", duration: "Oct. 10-14, 2014", participants: 14 },
    { sno: 24, coordinator: "Dr. Arun Kumar", name: "Int. Course on Small Hydropower Development", duration: "Oct. 14-25, 2014", participants: 14 },
    { sno: 25, coordinator: "DR. D.K. Khatod", name: "Real Time Digital Simulation for SHP Stations", duration: "Oct. 13-18, 2014", participants: 8 },
    { sno: 26, coordinator: "Dr. Praveen Kumar", name: "Earthquake Resistant Structures", duration: "Oct. 16-18, 2014", participants: 13 },
    { sno: 27, coordinator: "Dr. M.L. Sharma", name: "Estimation of Site Specific Seismic Design Parameters", duration: "Oct. 16-18, 2014", participants: 18 },
    { sno: 28, coordinator: "Dr. D.K. Khatod", name: "Real Time Digital Simulation for SHP Stations", duration: "Oct. 27-Nov. 1, 2014", participants: 10 },
    { sno: 29, coordinator: "Dr. M.L. Kansal", name: "Introduction to Hydrological Method for Assessment of Environmental Flow in River", duration: "Oct. 27-31, 2014", participants: 16 },
    { sno: 30, coordinator: "Dr. Dinesh Kumar", name: "Post Go Live on Revenue Management and Loss Reduction", duration: "Nov. 7-9, 2014", participants: 38 },
    { sno: 31, coordinator: "Dr. Dinesh Kumar", name: "Energy Resources", duration: "Nov. 8-12, 2014", participants: 11 },
    { sno: 32, coordinator: "Dr. M.K. Singh", name: "Real Time Digital Simulator for SHP Stations", duration: "Nov. 10-15, 2014", participants: 8 },
    { sno: 33, coordinator: "Dr. R.D. Garg", name: "Post Go Live on GIS Applications", duration: "Nov. 12-14, 2014", participants: 12 },
    { sno: 34, coordinator: "Dr. Arun Kumar", name: "Small Hydropower Development", duration: "Nov. 17-21, 2014", participants: 17 },
    { sno: 35, coordinator: "Dr. Dinesh Kumar", name: "Post Go Live on Revenue Management and Loss Reduction", duration: "Nov. 20-22, 2014", participants: 41 },
    { sno: 36, coordinator: "Dr. D.K. Khatod", name: "Real Time Digital Simulator for SHP Stations", duration: "Nov. 24-29, 2014", participants: 9 },
    { sno: 37, coordinator: "Dr. M.L. Sharma", name: "Geotechnical Earthquake Engineering", duration: "Nov. 24-26, 2014", participants: 17 },
    { sno: 38, coordinator: "Dr. Deepak Khare", name: "Project Management for River Valley Projects", duration: "Nov. 27-29, 2014", participants: 18 },
    { sno: 39, coordinator: "Dr. V.C. Srivastava", name: "Environmental Health and Safety Management in Process Industries", duration: "Nov. 27-29, 2014", participants: 16 },
    { sno: 40, coordinator: "Dr. M.K. Singhal", name: "Real Time Digital Simulator for SHP Stations", duration: "Dec. 1-6, 2014", participants: 9 },
    { sno: 41, coordinator: "Dr. S.N. Singh", name: "Selection & Design of Electro Mechanical Equipment for SHP", duration: "Dec. 1-5, 2014", participants: 13 },
    { sno: 42, coordinator: "Dr. M.L. Sharma", name: "Earthquake Resistant Structural Design/Drawings", duration: "Dec. 1-6, 2014", participants: 18 },
    { sno: 43, coordinator: "Dr. Vinod Kumar", name: "Metering Technology & AMR Application", duration: "Dec. 10-12, 2014", participants: 15 },
    { sno: 44, coordinator: "Dr. Dinesh Kumar", name: "Post Go Live on Revenue Management and Loss Reduction", duration: "Dec. 13-15, 2014", participants: 19 },
    { sno: 45, coordinator: "Dr. Y. Singh", name: "Non Linear Modelling and Seismic Response Evaluation of Structures", duration: "Dec. 14-16, 2014", participants: 69 },
    { sno: 46, coordinator: "Dr. S.K. Singal", name: "DPR Preparation and Evaluation for SHP Stations", duration: "Dec. 15-18, 2014", participants: 12 },
    { sno: 47, coordinator: "Dr. R.D. Garg", name: "Post Go Live on GIS Applications", duration: "Dec. 16-18, 2014", participants: 19 },
    { sno: 48, coordinator: "Dr. J.K. Nayak", name: "Data Analysis for Research and Publication", duration: "Dec. 20-21, 2014", participants: 19 },
    { sno: 49, coordinator: "Dr. Dinesh Kumar", name: "Post Go Live on Revenue Management and Loss Reduction", duration: "Dec. 22-24, 2014", participants: 35 },
    { sno: 50, coordinator: "Dr. Dinesh Kumar", name: "Post Go Live on Revenue Management and Loss Reduction", duration: "Dec. 25-27, 2014", participants: 10 },
    { sno: 51, coordinator: "Dr. S.K. Mishra", name: "Dam Break Analysis", duration: "Dec. 26-30, 2014", participants: 20 },
    { sno: 52, coordinator: "Dr. Dinesh Kumar", name: "Post Go Live on Revenue Management and Loss Reduction", duration: "Dec. 28-30, 2014", participants: 10 },
    { sno: 53, coordinator: "Dr. Vinod Kumar", name: "Metering Technology & AMR Application", duration: "Jan. 7-9, 2015", participants: 18 },
    { sno: 54, coordinator: "Sh. M.K. Singhal", name: "Real Time Digital Simulator for SHP Stations", duration: "Jan. 12-17, 2015", participants: 7 },
    { sno: 55, coordinator: "Dr. R.D. Garg", name: "GIS Applications", duration: "Jan. 13-15, 2015", participants: 19 },
    { sno: 56, coordinator: "Dr. Dinesh Kumar", name: "Post Go Live on Revenue Management and Loss Reduction", duration: "Jan. 16-18, 2015", participants: 23 },
    { sno: 57, coordinator: "Dr. Mahendra Singh", name: "Rock Engineering for Hydroelectric Projects", duration: "Jan. 19-21, 2015", participants: 18 },
    { sno: 58, coordinator: "Dr. R.P. Saini", name: "Performance Testing and Evaluation for SHP Stations", duration: "Jan. 19-23, 2015", participants: 10 },
    { sno: 59, coordinator: "Dr. Z. Ahmad", name: "Analysis and Design of Hydraulic Structures", duration: "Jan. 19-30, 2015", participants: 19 },
    { sno: 60, coordinator: "Dr. Dinesh Kumar", name: "Post Go Live on Revenue Management and Loss Reduction", duration: "Jan. 20-22, 2015", participants: 7 },
    { sno: 61, coordinator: "Dr. Dinesh Kumar", name: "Post Go Live on Revenue Management and Loss Reduction", duration: "Jan. 27-29, 2015", participants: 27 },
    { sno: 62, coordinator: "Dr. Dinesh Kumar", name: "Post Go Live on Revenue Management and Loss Reduction", duration: "Feb. 7-9, 2015", participants: 31 },
    { sno: 63, coordinator: "Dr. Dinesh Kumar", name: "Post Go Live on Revenue Management and Loss Reduction", duration: "Feb. 16-18, 2015", participants: 24 },
    { sno: 64, coordinator: "Dr. Z. Ahmad", name: "Analysis and Design of Hydraulic Structures", duration: "Feb. 16-27, 2015", participants: 18 },
    { sno: 65, coordinator: "Dr. S.N. Singh", name: "Operation and Maintenance of SHP Stations", duration: "Feb. 18-21, 2015", participants: 12 },
    { sno: 66, coordinator: "Dr. R.D. Garg", name: "Post Go Live on GIS Applications", duration: "Feb. 19-21, 2015", participants: 19 },
    { sno: 67, coordinator: "Dr. N.K. Goel & Dr. D.S. Arya", name: "Flood Estimation and Forecasting", duration: "Feb. 22-27, 2015", participants: 20 },
    { sno: 68, coordinator: "Dr. D.K. Khatod", name: "RTDS for In Service SHP Plant Engineers", duration: "Feb. 23-28, 2015", participants: 7 },
    { sno: 69, coordinator: "Dr. Dinesh Kumar", name: "Post Go Live on Revenue Management and Loss Reduction", duration: "Feb. 23 - 25, 2015", participants: 24 },
    { sno: 70, coordinator: "Dr. Dinesh Kumar", name: "Post Go Live on Revenue Management and Loss Reduction", duration: "March 2-4, 2015", participants: 14 },
    { sno: 71, coordinator: "Dr. Vinod Kumar", name: "Metering Technology & AMR Application", duration: "March 7-9, 2015", participants: 21 },
    { sno: 72, coordinator: "Dr. M.K. Singhal", name: "Real Time Digital Simulator for SHP Stations", duration: "March 9-14, 2015", participants: 8 },
    { sno: 73, coordinator: "Dr. Dinesh Kumar", name: "Post Go Live on Revenue Management and Loss Reduction", duration: "March 10-12, 2015", participants: 4 },
    { sno: 74, coordinator: "Dr. R.D. Garg", name: "Post Go Live on GIS Applications", duration: "March 13-15,2015", participants: 16 },
    { sno: 75, coordinator: "Dr. Dinesh Kumar", name: "Post Go Live on Revenue Management and Loss Reduction", duration: "March 14-16, 2015", participants: 14 },
    { sno: 76, coordinator: "Dr. S.K. Singal", name: "Small Hydropower Development", duration: "March 16-20,2015", participants: 17 },
    { sno: 77, coordinator: "Dr. Dinesh Kumar", name: "Post Go Live on Revenue Management and Loss Reduction", duration: "March 21-23 , 2015", participants: 17 },
    { sno: 78, coordinator: "Dr. D.K. Khatod", name: "Real Time Digital Simulator for SHP Stations", duration: "March 23-28, 2015", participants: 8 },
];

const Course201415Page = () => {
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
              Courses 2014-15
            </h1>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <h2 className="text-2xl md:text-3xl font-semibold text-center mb-8 md:mb-12">
          LIST OF SHORT-TERM COURSES CONDUCTED DURING 2014-15
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

export default Course201415Page; 