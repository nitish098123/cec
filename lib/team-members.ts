export interface TeamMember {
  image_url: string;
  name: string;
  designation: string;
  phone: string;
  email?: string;
}

export const TEAM_MEMBERS: TeamMember[] = [
  {
    image_url:
      "https://d1bm918zlnq37v.cloudfront.net/CECTemp/co-ordinator.jpeg",
    name: "Prof. Soumitra Satapathi",
    designation: "Coordinator CEC",
    phone: "01332-285227/5545",
    email: "Coordinator.cec.qip@iitr.ac.in",
  },
  {
    image_url: "/staff/sonal-kumar.png",
    name: "Mr. Sonal Kumar",
    designation: "Jr. Superintendent",
    phone: "01332-285247",
  },
  {
    image_url: "/staff/prabhat-nautiyal.jpg",
    name: "Mr. Prabhat Nautiyal",
    designation: "Jr. Assistant",
    phone: "01332-284327",
  },
  {
    image_url: "/staff/sharad-sharma.jpg",
    name: "Mr. Sharad Sharma",
    designation: "Project Associate",
    phone: "01332-285545",
  },
  {
    image_url: "/staff/shakti-sahni.jpg",
    name: "Ms. Shakti Sahni",
    designation: "Computer Operator",
    phone: "01332-285545",
  },
  {
    image_url: "/staff/anand-singh.jpg",
    name: "Mr. Anand Singh",
    designation: "Updater Services Ltd. Staff",
    phone: "01332-285545",
  },
  {
    image_url: "https://d1bm918zlnq37v.cloudfront.net/CECTemp/shubham.jpeg",
    name: "Mr. Shubham",
    designation: "Updater Services Ltd. Staff",
    phone: "01332-284327",
  },
];
