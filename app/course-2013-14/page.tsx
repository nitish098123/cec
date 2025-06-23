import React from "react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Courses 2013-14 | CEC",
  description: "Continuing Education Centre, IIT Roorkee",
};

const courses = [
    { sno: 1, coordinator: "Dr. Umesh K. Sharma (Civil)", name: "Latest Trends in Building Materials and Construction Techniques", duration: "Jan. 11-13, 2012", participants: 24 },
    { sno: 2, coordinator: "Dr. S.K. Singhal (AHEC)", name: "", duration: "Jan. 11-14, 2012", participants: 15 },
    { sno: 3, coordinator: "Dr. Deepak Khare (WRDM)", name: "DPR Preparation & Evaluation for SHP Projects", duration: "Jan. 16 - 20, 2012", participants: 11 },
    { sno: 4, coordinator: "Dr. Pradeep Kumar & Dr. Inderdeep Singh & Dr. A. Dwivedi (M& I.E.D.)", name: "Project Management for River Valley Projects", duration: "Jan. 20 - 22, 2012", participants: 11 },
    { sno: 5, coordinator: "Dr. S.K. Singhal (AHEC)", name: "Advanced Materials and Manufacturing", duration: "Jan. 31-Feb. 11, 2012", participants: 33 },
    { sno: 6, coordinator: "Dr. S. Rangnekar (DOMS)", name: "International Course on Small Hydro Power", duration: "2012", participants: 12 },
    { sno: 7, coordinator: "Dr. Manoj Tripathy, Dr. Y.V. Hote", name: "Development", duration: "Feb. 4, 2012", participants: 15 },
    { sno: 8, coordinator: "Dr. G.B. Kumbhar", name: "Managerial Excellence", duration: "Feb. 13 -17, 2012", participants: 6 },
    { sno: 9, coordinator: "Dr. D.K. Khatod (AHEC)", name: "New Trends in Power System Protection and Control", duration: "Feb. 13-18, 2012", participants: 5 },
    { sno: 10, coordinator: "Dr. S.K. Tripathi (WRDM)", name: "Techniques", duration: "Feb. 16, 2012", participants: 25 },
    { sno: 11, coordinator: "Dr. N.K. Goel & Dr. D.S. Arya (Hydrology)", name: "Int. Course on Climate Change Effect on Flood Estimates & Hydrological Variables", duration: "March 5-14, 2012", participants: 11 },
    { sno: 12, coordinator: "Dr. Arun Kumar (AHEC)", name: "Int. Course on Rural Electrification with Small", duration: "March 6-17, 2012", participants: 11 },
    { sno: 13, coordinator: "Dr. D.K. Khatod (AHEC)", name: "Hydropower Development", duration: "March 12-21, 2012", participants: 5 },
    { sno: 14, coordinator: "Dr. Dharmendra Singh (E&C.E)", name: "Real Time digital Simulator for SHP Development", duration: "March 19-23, 2012", participants: 10 },
    { sno: 15, coordinator: "Dr. S.K. Ghosh (Civil)", name: "Advanced Microwave and Radar Systems", duration: "March 19-29, 2012", participants: 19 },
    { sno: 16, coordinator: "Dr. D.K. Khatod (AHEC)", name: "Digital Mapping Technology", duration: "April 10-19, 2012", participants: 6 },
    { sno: 17, coordinator: "Dr. S.K. Singhal (AHEC)", name: "Real Time Digital Simulator for SHP Development", duration: "April 11-14, 2012", participants: 5 },
    { sno: 18, coordinator: "Dr. M.K. Barua (DOMS)", name: "DPR Preparation and Evaluation for SHP Projects", duration: "April 13-15, 2012", participants: 12 },
    { sno: 19, coordinator: "Dr. S. Rangnekar (DOMS)", name: "Research Methodology : Tools and Techniques", duration: "April 14-15, 2012", participants: 10 },
    { sno: 20, coordinator: "Dr. M.K. Singhal (AHEC)", name: "Administration Management in Academic and Research Institutes", duration: "May 7-12, 2012", participants: 6 },
    { sno: 21, coordinator: "", name: "", duration: "May 16-19, 2012", participants: 25 },
    { sno: 22, coordinator: "Dr. Umesh K. Sharma", name: "Real Time Digital Simulator for Small Hydropower", duration: "May 21-June 2, 2012", participants: 33 },
    { sno: 23, coordinator: "Dr. S.N. Singh (AHEC)", name: "Operation and Maintenance of Small Hydropower Stations", duration: "June 5-8, 2012", participants: 14 },
    { sno: 24, coordinator: "", name: "Real Time Digital Simulator for Small Hydropower", duration: "June 5-14, 2012", participants: 4 },
    { sno: 25, coordinator: "Dr. D.K. Khatod (AHEC)", name: "Development", duration: "June 11-16, 2012", participants: 22 },
    { sno: 26, coordinator: "", name: "Int. Training Course on Operation and Maintenance of Irrigation Schemes", duration: "June 11-20, 2012", participants: 15 },
    { sno: 27, coordinator: "Dr. Ashish Pandey (WRDM)", name: "Int. Training Course on Hydrological Analysis for Water Resources Planning and Management", duration: "June 18-22, 2012", participants: 16 },
    { sno: 28, coordinator: "", name: "", duration: "June 18-22, 2012", participants: 15 },
    { sno: 29, coordinator: "Dr. N.K. Goel (Hydrology)", name: "Small Hydropower Development", duration: "June 18-29, 2012", participants: 30 },
    { sno: 30, coordinator: "", name: "", duration: "July 2-28, 2012", participants: 16 },
    { sno: 31, coordinator: "Dr. S.K. Singhal (AHEC)", name: "Technical Aspects of pulp and Paper Making Process", duration: "July 18-21, 2012", participants: 13 },
    { sno: 32, coordinator: "", name: "Int. Training Course on Techniques for Earthquake Resistant Structures", duration: "July 23-27, 2012", participants: 20 },
];

const Course201314Page = () => {
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
              Courses 2013-14
            </h1>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <h2 className="text-2xl md:text-3xl font-semibold text-center mb-8 md:mb-12">
          LIST OF SHORT-TERM COURSES CONDUCTED DURING 2013-14
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

export default Course201314Page; 