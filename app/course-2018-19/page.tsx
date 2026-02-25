import React from "react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Courses 2018-19 | CEC",
  description: "Continuing Education Centre, IIT Roorkee",
};

const courses = [
    { sno: 1, name: "Real Time Digital Simulator for Hydropower Plant for In Service Engineers AH-1222/18-19", investigator: "Dr. S.K. Singal", duration: "May 7-12, 2018", sponsor: "BBMB, Chandigarh", participants: 8 },
    { sno: 2, name: "Linearized Power Amplifiers CO-1510/18-19", investigator: "Dr. Karun Rawat Dr. Meenakshi Rawat", duration: "July 19-21, 2018", sponsor: "BEL, Bangalore", participants: 18 },
    { sno: 3, name: "GET Induction Programme CO-1478/17-18", investigator: "Dr. Dinesh Kumar & Dr. S. Rangnekar", duration: "August 1-4, 2018", sponsor: "Everest Industries Ltd., Noida", participants: 29 },
    { sno: 4, name: "Slope Stability and Stabilization Techniques, Treatment with Geo- Synthetics for HE Projects CO-1506/18-19", investigator: "Dr. Mahendra Singh & Dr. Ashish Pandey", duration: "August 6-10, 2018", sponsor: "NHPC", participants: 17 },
    { sno: 5, name: "Project Management for River Valley Projects Co-1509/18-19", investigator: "Dr. Ashish Pandey & Dr. S.K. Mishra", duration: "August 20-24, 2018", sponsor: "NHPC", participants: 18 },
    { sno: 6, name: "Water Resources Management Co-1507/18-19", investigator: "Dr. M.K. Jain", duration: "August 13-31, 2018", sponsor: "Eastern & Southern Africa Div.,MEA", participants: 25 },
    { sno: 7, name: "Vibration and Shock Isolation Techniques in Electronics Packaging", investigator: "Dr. Anil Kumar", duration: "Sept. 17-21, 2018", sponsor: "BEL, Bangalore", participants: 17 },
    { sno: 8, name: "Int. Course on Small Hydropower Policy and RegulationsAH-1223/18-19", investigator: "Dr. Arun Kumar", duration: "Sept. 17-29, 2018", sponsor: "Africa India Forum Summit-III", participants: 25 },
    { sno: 9, name: "Real Time Digital Simulator for SHP StationsAH-1224/18-19", investigator: "Dr. M.K. Singhal", duration: "Oct. 8-13, 2018", sponsor: "MNRE", participants: 8 },
    { sno: 10, name: "Real Time Digital Simulator for SHP StationsAH-1226/18-19", investigator: "Dr. M.K. Singhal", duration: "Nov. 12-17, 2018", sponsor: "MNRE", participants: 8 },
    { sno: 11, name: "Int. Course on Water Resources ManagementCO-1511/18-19", investigator: "Dr. M.K. Jain", duration: "Nov. 26-Dec. 14, 2018", sponsor: "MEA", participants: 18 },
    { sno: 12, name: "DPR Preparation and Evaluation for SHP StationsAH-1227/18-19", investigator: "Dr. S.K. Singal", duration: "Nov. 27-30, 2018", sponsor: "MNRE", participants: 8 },
    { sno: 13, name: "DPR Preparation and Evaluation for SHP StationsAH-1228/18-19", investigator: "Dr. M.K. Singhal", duration: "Dec. 3-8, 2018", sponsor: "MNRE", participants: 8 },
    { sno: 14, name: "O&M of SHP StationsAH-1229/18-19", investigator: "Dr. R.P. Saini", duration: "Dec. 10-13, 2018", sponsor: "MNRE", participants: 19 },
    { sno: 15, name: "Control Theory and Its ApplicationsCo-1512/18-19", investigator: "Dr. Y.V. Hote", duration: "Dec. 20-22, 2018", sponsor: "BEL, Bangalore", participants: 13 },
    { sno: 16, name: "Small Hydropower DevelopmentAH-1225/18-19", investigator: "Dr. Arun Kumar", duration: "Jan. 15-19, 2019", sponsor: "MNRE", participants: 21 },
    { sno: 17, name: "Technical Issues of HydropowerCO-1515/18-19", investigator: "Dr. Ashish Pandey", duration: "Jan. 21-28, 2019", sponsor: "SJVN Ltd., Shimla", participants: 21 },
    { sno: 18, name: "Carbon Sequestration Estimation and Nitrogen Footprint AssessmentCO-1517/18-19", investigator: "Dr. B.K. Yadav", duration: "Jan. 28-30, 2019", sponsor: "CPCB, Delhi", participants: 21 },
    { sno: 19, name: "Comprehensive Module on Civil Engg. ConceptsCO-1513/18-19", investigator: "Dr. N.K. Samadhiya", duration: "Jan. 29-Feb. 2, 2019", sponsor: "IOCL, Noida", participants: 25 },
    { sno: 20, name: "Construction Practices for Sustainable and Resilient BuildingsCO-1516/18-19", investigator: "Dr. Umesh K. Sharma", duration: "Jan. 31-Feb. 2, 2019", sponsor: "Tata Steel", participants: 32 },
    { sno: 21, name: "Int. Course on Small Hydropower Resources and PlanningAH-1232/18-19", investigator: "Dr. Arun Kumar", duration: "Feb. 4-16, 2019", sponsor: "Africa India Forum Summit-III", participants: 26 },
    { sno: 22, name: "Int. Course on Water Audit and Rainwater HarvestingCO-1518/18-19", investigator: "Dr. Ashish Pandey", duration: "Feb. 18-22, 2019", sponsor: "MEA", participants: 45 },
];

const Course201819Page = () => {
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
              Courses 2018-19
            </h1>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <h2 className="text-2xl md:text-3xl font-semibold text-center mb-8 md:mb-12">
          LIST OF SHORT-TERM COURSES CONDUCTED DURING 2018-19
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
                  <td className="py-4 px-6 whitespace-nowrap">{course.sponsor}</td>
                  <td className="py-4 px-6">{course.name}</td>
                  <td className="py-4 px-6">{course.investigator}</td>
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

export default Course201819Page; 