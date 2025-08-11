"use client";

import { Image, Button, ConfigProvider, Input, Card, Row, Col } from "antd";
import {
  GraduationCap,
  Users,
  Handshake,
  Clock,
  Wifi,
  Star,
  Sun,
  MapPin,
  Pen,
  CalendarMinus2,
} from "lucide-react";
import { SearchOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";

interface Course {
  id: number;
  name: string;
  duration: string;
  mode: string;
  students: string;
  partner: string;
  category: string;
  image?: string;
}

type NewsItem = {
  id: number;
  title: string;
  description: string;
  date: string;
  source: string;
  image: string;
  link?: string;
};

const courses: Course[] = [
  // Emerging Technologies
  {
    id: 1,
    name: "GenAI/Agentic AI & ML Applications for Engineers",
    duration: "11 Months",
    mode: "Online",
    students: "1000+",
    partner: "Futurense",
    category: "Emerging Technologies",
    image: "https://d1bm918zlnq37v.cloudfront.net/CECTemp/Courses_GenAI.jpg",
  },
  {
    id: 2,
    name: "Data Science and AI",
    duration: "12 Months",
    mode: "Online",
    students: "800+",
    partner: "CloudxLab",
    category: "Emerging Technologies",
    image: "https://d1bm918zlnq37v.cloudfront.net/CECTemp/Courses_DataSci.jpg",
  },
  {
    id: 3,
    name: "Applied Data Science & AI",
    duration: "6-8 Months",
    mode: "Online",
    students: "750+",
    partner: "Jaro Education",
    category: "Emerging Technologies",
    image: "https://d1bm918zlnq37v.cloudfront.net/CECTemp/Courses_AppliedData.jpg",
  },
  {
    id: 4,
    name: "Accelerators for Deep Learning",
    duration: "3 Months",
    mode: "Online",
    students: "600+",
    partner: "CloudxLab",
    category: "Emerging Technologies",
    image: "https://d1bm918zlnq37v.cloudfront.net/CECTemp/courses_Accelerators.png",
  },
  {
    id: 5,
    name: "AI/ML Applications in Manufacturing Operations",
    duration: "30 Hrs",
    mode: "Online",
    students: "700+",
    partner: "ZeroZeta",
    category: "Emerging Technologies",
    image: "https://d1bm918zlnq37v.cloudfront.net/CECTemp/courses_AIML.png",
  },
  {
    id: 6,
    name: "Data Science & Machine Learning",
    duration: "8 Months",
    mode: "Online",
    students: "900+",
    partner: "Times Pro",
    category: "Emerging Technologies",
    image: "https://d1bm918zlnq37v.cloudfront.net/CECTemp/courses_DataSci_ML.jpg",
  },
  // Hardware & IT
  {
    id: 7,
    name: "VLSI Training and Internship Program",
    duration: "6 Months",
    mode: "Online",
    students: "400+",
    partner: "FutureWiz",
    category: "Hardware & IT",
    image: "https://d1bm918zlnq37v.cloudfront.net/CECTemp/courses_VLSI.png",
  },
  // Management
  {
    id: 8,
    name: "HR Management and Analytics",
    duration: "6 Months",
    mode: "Online",
    students: "500+",
    partner: "Imarticus",
    category: "Management",
    image: "https://d1bm918zlnq37v.cloudfront.net/CECTemp/courses_HR.jpg",
  },
  {
    id: 9,
    name: "Product Management Accelerator",
    duration: "2 Weeks",
    mode: "Online",
    students: "300+",
    partner: "HelloPM",
    category: "Management",
    image: "https://d1bm918zlnq37v.cloudfront.net/CECTemp/courses_Product.jpg",
  },
  {
    id: 10,
    name: "SCM & Analytics",
    duration: "6 Months",
    mode: "Online",
    students: "450+",
    partner: "Imarticus",
    category: "Management",
    image: "https://d1bm918zlnq37v.cloudfront.net/CECTemp/courses_SCM.png",
  },
  {
    id: 11,
    name: "Digital Marketing and MarTech",
    duration: "4.5 Months",
    mode: "Online",
    students: "600+",
    partner: "Imarticus Learning",
    category: "Management",
    image: "https://d1bm918zlnq37v.cloudfront.net/CECTemp/courses_digital.png",
  },
  {
    id: 12,
    name: "Strategic Product Management",
    duration: "5 Months",
    mode: "Online",
    students: "400+",
    partner: "Jaro Education",
    category: "Management",
    image: "https://d1bm918zlnq37v.cloudfront.net/CECTemp/courses_Strategic.jpg",
  },
  // Sustainability
  {
    id: 13,
    name: "Sustainability, ESG and GRI Standards",
    duration: "5 Months",
    mode: "Online",
    students: "350+",
    partner: "Eduxll",
    category: "Sustainability",
    image: "https://d1bm918zlnq37v.cloudfront.net/CECTemp/courses_sustain.jpg",
  },
  // Miscellaneous
  {
    id: 14,
    name: "Data-Driven Frontiers: Blockchain, Social Networks, and Multimedia",
    duration: "June 01- 10, 2025",
    mode: "Online",
    students: "250+",
    partner: "Open Course",
    category: "Miscellaneous",
    image: "https://d1bm918zlnq37v.cloudfront.net/CECTemp/courses_Data-Driven.jpg",
  },
];

const testimonials = [
  {
    quote:
      "It was truly an amazing experience to be part of this hackathon - it was full of learning, fun, and enjoyment. It was my first ever hackathon and it was nice to see so many enthusiastic participants. As we all know, we are in the midst of an era of tremendous change fueled by technology and innovation. How quickly and frequently we learn will determine our ability to absorb and apply related information, If more of these inventive Hackathons are held, I am convinced that we will be able to discover and adopt new technologies to cope with change and tackle current and future issues. I'd want to express my gratitude to IIT Roorkee for offering such a fantastic opportunity.",
    name: "Anubhav Jain",
    designation: "Lead Knowledge Analysts - BCG (Germany)",
    image: "https://placehold.co/56x56/E1F1F4/102a43?text=AJ",
  },
  {
    quote:
      "Took this up out of curiosity 6 months back to know more about how the future of the BFSI industry would look like with AI and its application in it. But ended up learning so much and more curious about this plethoral field of AI and ML humbled and thankful to share that I have completed AI in BSFI, thanks to our amazing mentors, team for the amazing online class platform and support, to various industry experts that took time out of their busy schedule to share with us the current scenario of AI in BSFI and especially IIT Roorkee faculty for so much support throughout.",
    name: "Pulak Mittal",
    designation: "Moody's Analytics",
    image: "https://placehold.co/56x56/E1F1F4/102a43?text=PM",
  },
  {
    quote:
      "PGCP-DSML course has helped me revamp my learning and my knowledge base via introducing me to amazing insights of Data Science and state-of-the-art knowledge in Machine Learning. The curriculum is very vast and detailed. Extremely knowledgeable faculties who are always ready to support. PGCP-DSML syllabus is perfectly designed and thoroughly executed! It provides an at par advantage of IIT Roorkee an esteemed institution. Highly recommended!",
    name: "Ritesh Aggarwal",
    designation: "Program Manager, Ricoh India Ltd.",
    image: "https://placehold.co/56x56/E1F1F4/102a43?text=RA",
  },
];

const newsData: NewsItem[] = [
  {
    id: 1,
    title: "IIT Roorkee to offer executive programme in Business Analytics for professionals",
    description: "IIT Roorkee to offer executive programme in Business Analytics for professionals",
    date: "11 July 2022",
    source: "By Indianexpress",
    image: "https://d1bm918zlnq37v.cloudfront.net/CECTemp/11July2022.png",
  },
  {
    id: 2,
    title: "IIT Roorkee Partners With Coursera To Offer Online Programs In High Demand Fields",
    description: "IIT Roorkee Partners With Coursera To Offer Online Programs In High Demand Fields",
    date: "12 August 2020",
    source: "By businessworld",
    image: "https://d1bm918zlnq37v.cloudfront.net/CECTemp/12Aug2020.jpg",
    link: "https://www.bweducation.com/article/iit-roorkee-partners-with-coursera-to-offer-online-programs-in-high-demand-fields-307893",
  },
  {
    id: 4,
    title:
      "IIT-Roorkee joins hands with WileyNXT to curate 'AI in banking' Program",
    description:
      "Our state-of-the-art research labs are equipped with the latest technology, providing students with hands-on experience",
    date: "06 Jul 2020",
    source: "By Indianexpress",
    image: "https://d1bm918zlnq37v.cloudfront.net/CECTemp/11July2022.png",
    link: "https://indianexpress.com/article/education/iit-roorkee-to-offer-ai-in-banking-programme-6492581/?fbclid=IwAR2PUdH_2AzfsQjLIXCGNG5YLwmhdu27NU0bm5YQd7u3XOfgkT77iimWqkw",
  },
  {
    id: 3,
    title: "IIT Roorkee inks MoU with CloudXLab on big data and AI",
    description: "IIT Roorkee's Electronics and Information and Communications Technology Academy (E&ICT) Academy inked a memorandum of understanding with CloudxLab, a tech venture",
    date: "12 August 2019",
    source: "By TOI",
    image: "/IITR_building.jpeg",
    link: "https://timesofindia.indiatimes.com/city/dehradun/iit-roorkee-inks-mou-with-cloudxlab-on-big-data-and-ai/articleshow/70810833.cms",
  },
];

const noticeItems = [
  {
    text: "AICTE QIP PG Certificate Program on Wireless Technology and IoT at IIT Roorkee ",
    link: "https://qippg.aicte.gov.in/"
  },
  {
    text: "AICTE QIP PG Certificate Program on Advanced Digital Manufacturing: Integrating Precision, Composites, and Manufacturing Technology for Industry 4.0 ",
    link: "https://qippg.aicte.gov.in/"
  },
  {
    text: "Signed the partnership MoU with Jaro Education (EdTech) ",
    link: "https://d1bm918zlnq37v.cloudfront.net/CECTemp/JaroEducation.jpg"
  },
  {
    text: "Signed the partnership MoU with Truechip (EdTech) ",
    link: "https://d1bm918zlnq37v.cloudfront.net/CECTemp/Truechip.jpg"
  }
];
const items = Array(10).fill(noticeItems).flat();

export default function HomePage() {
  const [filteredCourses, setFilteredCourses] = useState<Course[]>(courses);
  const [activeCategory, setActiveCategory] = useState<string>(
    "Emerging Technologies"
  );
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [lines, setLines] = useState<string[]>([]);
  const [isTyping, setIsTyping] = useState(true);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [showNoticePopup, setShowNoticePopup] = useState(false);

  const heroImages = [
    "https://d1bm918zlnq37v.cloudfront.net/CECTemp/HeroPhoto.JPG",
    "https://d1bm918zlnq37v.cloudfront.net/CECTemp/Header1.png",
    "https://d1bm918zlnq37v.cloudfront.net/CECTemp/Header2.png",
    "https://d1bm918zlnq37v.cloudfront.net/CECTemp/Header3.png",
  ];

  const heroTexts = [
    "IIT ROORKEE",
    "Quality",
    "Improvement",
    "& Continuing",
    "Education Center",
  ];

  useEffect(() => {
    let filtered: Course[] = [];
    if (searchTerm.trim()) {
      const searchLower = searchTerm.toLowerCase();
      filtered = courses.filter((course) =>
        course.name.toLowerCase().includes(searchLower) ||
        course.partner.toLowerCase().includes(searchLower) ||
        course.category.toLowerCase().includes(searchLower) ||
        course.duration.toLowerCase().includes(searchLower)
      );
    } else {
      filtered = courses.filter((course) => course.category === activeCategory);
    }
    setFilteredCourses(filtered);
  }, [activeCategory, searchTerm]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) =>
        prevIndex === heroImages.length - 1 ? 0 : prevIndex + 1
      );
    }, 4000); // Change image every 4 seconds

    return () => clearInterval(interval);
  }, [heroImages.length]);

  // Typing animation effect
  useEffect(() => {
    let lineIndex = 0;
    let charIndex = 0;
    let timeout: NodeJS.Timeout;

    const type = () => {
      if (lineIndex === heroTexts.length) {
        setIsTyping(false);
        return;
      }
      const currentLine = heroTexts[lineIndex];
      if (charIndex < currentLine.length) {
        setLines((prev) => {
          const newLines = [...prev];
          newLines[lineIndex] = currentLine.substring(0, charIndex + 1);
          return newLines;
        });
        charIndex++;
        timeout = setTimeout(type, 50);
      } else {
        lineIndex++;
        charIndex = 0;
        timeout = setTimeout(type, 250);
      }
    };

    setLines(Array(heroTexts.length).fill(""));
    setIsTyping(true);
    type();

    return () => clearTimeout(timeout);
  }, []); // Run only on mount

  // Scroll to top functionality
  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 300);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <div className="w-full font-inter">
      <section className="relative w-full h-[60vh] md:h-[80vh] flex items-center justify-center overflow-hidden">
        {/* Background Images Slider */}
        {heroImages.map((image, index) => (
          <div
            key={index}
            className={`absolute inset-0 bg-cover bg-center transition-opacity duration-1000 ease-in-out ${
              index === currentImageIndex ? "opacity-100" : "opacity-0"
            }`}
            style={{
              backgroundImage: `url(${image})`,
              filter: "brightness(0.7)",
            }}
            aria-hidden="true"
          />
        ))}
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-transparent via-50% to-transparent z-10"></div>

        {/* Image Indicators */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-30 flex space-x-2">
          {heroImages.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentImageIndex(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentImageIndex
                  ? "bg-white scale-125"
                  : "bg-white/50 hover:bg-white/75"
              }`}
              aria-label={`Go to image ${index + 1}`}
            />
          ))}
        </div>
      </section>

      {/* Notice section */}
      <section className="bg-[#F5F5F5] relative">
        <div className="w-full overflow-hidden">
          <div className="flex animate-scroll whitespace-nowrap py-2.5">
            <ul className="flex list-disc">
              {items.map((item, index) => (
                <li key={index} className="mx-6 text-xl font-normal list-disc">
                  <a 
                    href={item.link} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="hover:text-[#FFAE0E] transition-colors duration-200 cursor-pointer"
                  >
                    {item.text}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
        
        {/* View All Button */}
        <div className="absolute right-4 top-1/2 transform -translate-y-1/2 z-10">
          <button
            onClick={() => setShowNoticePopup(true)}
            className="bg-[#FFAE0E] hover:bg-[#E5893C] text-black px-4 py-2 rounded-lg font-medium transition-all duration-200 shadow-[0_4px_12px_rgba(255,174,14,0.3)] hover:shadow-[0_8px_20px_rgba(255,174,14,0.4)]"
          >
            View All
          </button>
        </div>
      </section>

      {/* Notice Popup */}
      {showNoticePopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[80vh] overflow-y-auto">
            <div className="flex justify-between items-center p-6 border-b">
              <h2 className="text-2xl font-semibold text-gray-800">All Notices</h2>
              <button
                onClick={() => setShowNoticePopup(false)}
                className="text-gray-500 hover:text-gray-700 text-2xl font-bold"
              >
                ×
              </button>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                {noticeItems.map((item, index) => (
                  <div key={index} className="border-b border-gray-200 pb-4 last:border-b-0">
                    <a 
                      href={item.link} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="block hover:bg-gray-50 p-3 rounded-lg transition-colors duration-200"
                    >
                      <div className="flex items-start gap-3">
                        <div className="w-2 h-2 bg-[#FFAE0E] rounded-full mt-3 flex-shrink-0"></div>
                        <div className="flex-1">
                          <p className="text-lg font-medium text-gray-800 hover:text-[#FFAE0E] transition-colors duration-200">
                            {item.text}
                          </p>
                          <p className="text-sm text-gray-500 mt-1">
                            Click to view details →
                          </p>
                        </div>
                      </div>
                    </a>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/*  */}
      <section className="py-8 md:py-16 space-y-8 md:space-y-16">
        {/* Header Section */}
        <section className="px-4 sm:px-8 md:px-16 py-8 md:py-12">
          <div className="w-full grid grid-cols-1 lg:grid-cols-2 container mx-auto gap-8">
            <div className="flex items-center justify-center">
              <div className="bg-[#E2F1FF] p-4 max-w-sm -rotate-2 space-y-1">
                <Image
                  preview={false}
                  src="/TOH-1.png"
                  alt="Trainee Officer's Hostel"
                  className="w-full object-cover aspect-square"
                />
                <p className="font-semibold text-lg md:text-xl">
                  Continuing Education Center
                </p>
                <p className="font-normal text-sm md:text-base">
                  Mon to Fri - 8.45 am to 5.30 pm
                </p>
              </div>
            </div>
            <div className="text-center md:text-left">
              <p className="mb-4 text-3xl md:text-4xl font-semibold tracking-wide">
                Dream Big, Achieve More at CEC
              </p>
              <p className="mb-4 text-gray-600 text-lg md:text-xl text-justify">
                The Continuing Education Center (CEC) of IIT Roorkee,
                established in 1955, is dedicated to advancing knowledge through
                specialized courses for in-service professionals from
                government, public and private sectors, research institutions,
                and industries. Each year, the center conducts 60-70 short-term
                courses in management, engineering, science, and technology,
                attracting participants from across India and neighboring
                countries. These innovative and accessible programs address the
                current needs of professionals and are supported by IIT
                Roorkee's technical expertise, with additional insights from
                industry and R&D experts.
              </p>
              <div className="mt-4 flex flex-col sm:flex-row justify-center sm:justify-between gap-8">
                <div className="flex items-center gap-x-3 justify-center">
                  <GraduationCap className="w-10 h-10 md:w-12 md:h-12" />
                  <div className="flex flex-col items-start">
                    <p className="text-xl md:text-2xl font-semibold">250+</p>
                    <p className="text-lg md:text-xl font-normal">Courses</p>
                  </div>
                </div>
                <div className="flex items-center gap-x-3 justify-center">
                  <Users className="w-8 h-8 md:w-10 md:h-10" />
                  <div className="flex flex-col items-start">
                    <p className="text-xl md:text-2xl font-semibold">10000+</p>
                    <p className="text-lg md:text-xl font-normal">Participants</p>
                  </div>
                </div>
                <div className="flex items-center gap-x-3 justify-center">
                  <Handshake className="w-8 h-8 md:w-10 md:h-10" />
                  <div className="flex flex-col items-start">
                    <p className="text-xl md:text-2xl font-semibold">140+</p>
                    <p className="text-lg md:text-xl font-normal">Sponsors</p>
                  </div>
                </div>
              </div>
              <div className="w-full flex flex-col sm:flex-row gap-4 sm:gap-x-12 mt-6">
                <a
                  href="https://d1bm918zlnq37v.cloudfront.net/CECTemp/CEC-brochure.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full"
                >
                  <ConfigProvider
                    theme={{
                      components: {
                        Button: {
                          defaultBg: "#FFAE0E",
                          defaultHoverBg: "#E5893C",
                          defaultHoverColor: "#2C2C2C",
                          fontWeight: 600,
                        },
                      },
                    }}
                  >
                    <Button
                      type="default"
                      className="border-none w-full py-4 px-8 text-black text-base md:text-lg tracking-wide"
                      style={{ fontWeight: 600 }}
                    >
                      Download Brochure
                    </Button>
                  </ConfigProvider>
                </a>
                <Link href="/about-us" className="w-full">
                  <ConfigProvider
                    theme={{
                      components: {
                        Button: {
                          defaultColor: "#FFAE0E",
                          defaultBorderColor: "#FFAE0E",
                          defaultHoverBg: "#FFFFFF",
                          defaultHoverColor: "#FFAE0E",
                          defaultHoverBorderColor: "#FFAE0E",
                        },
                      },
                    }}
                  >
                    <Button
                      color="default"
                      variant="outlined"
                      className="w-full py-2.5 px-6 text-base md:text-lg font-normal tracking-wide"
                    >
                      Know More
                    </Button>
                  </ConfigProvider>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* New section: Message from the Co-ordinator */}
        <section className="py-16 bg-[#E2F1FF]">
          <div className="container mx-auto px-4">
            <div className="mb-8">
              <h2 className="text-3xl md:text-4xl font-bold text-[#1a237e] mb-2">Message from the Co-ordinator</h2>
            </div>
            <div className="flex flex-col md:flex-row items-start gap-10 md:gap-12">
              <div className="flex-shrink-0 flex flex-col items-center w-full md:w-auto">
                <img
                  src="/staff/kaushik-ghosh.png"
                  alt="Prof. Kaushik Ghosh"
                  className="object-cover rounded-2xl w-80 h-96 shadow-xl border-4 border-white"
                  style={{ maxWidth: '100%', height: 'auto' }}
                />
                <div className="mt-4 text-center">
                  <p className="text-xl md:text-2xl font-semibold text-black mb-1">Prof. Kaushik Ghosh</p>
                  <p className="text-base md:text-lg font-normal text-gray-700 mb-1">Coordinator, Continuing Education Centre</p>
                  <p className="text-base md:text-lg font-normal text-gray-700 mb-1">IIT Roorkee</p>
                  <p className="text-base md:text-lg font-normal text-gray-700 mb-1">Phone no.: 01332-285227/5545</p>
                  <p className="text-base md:text-lg font-normal text-gray-700 mb-0">Email id: coordinator.cec.qip@iitr.ac.in</p>
                </div>
              </div>
              <div className="flex-1">
                <div className="bg-white p-6 md:p-10 rounded-2xl shadow-xl h-full flex items-center">
                  <p className="text-gray-800 text-base md:text-lg leading-relaxed">
                    CEC IIT Roorkee, we are committed to making high-quality and transformational education accessible to all. Our programs are designed to provide executives, professionals, and aspiring individuals a launchpad for taking them to next level in their career. In addition to sponsored short-term courses, which form a large part of the training and upskilling effort, CEC IITR has launched a new major initiative to offer the longer duration programs (up to a year) having PG and Advanced Certifications. CEC IITR courses are available in both asynchronous and hybrid learning modes. Our courses are designed to provide learners a specialization, which will enable them to master in-demand skills needed to work on the latest problems in industry and research. These include Data Science, Machine Learning, Artificial Intelligence, 5G, Cyber Security, VLSI, DevOps, as well as emerging technologies in engineering, science, and management. Through these open participation programs, we aim to reach out to aspiring individuals and professionals to develop cutting-edge competencies in their professional careers. CEC has signed partnership MoUs with many organizations to offer courses and training programs in diverse areas. Some of our major partners for sponsored courses are SAIL, TATA Steel, NTPC, BEL, SAARC, NIC, etc. In the year 2024-2025, the CEC has introduced new sponsored courses for many organizations Department of Income Tax (Systems), New Delhi, IRDE Dehradun, DRDO, MeraYuva Bharat (MY BHARAT), New Delhi, Navodaya Vidyalaya Samiti, National Health Mission, Odisha, Tata Tisconm, National Mission for Clean Ganga (NMCG), New Delhi etc.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Courses Section */}
        <section id="explore-courses" className="px-4 sm:px-8 md:px-16 py-8 md:py-12">
          <div className="flex flex-col md:flex-row justify-between md:items-end mb-8 container mx-auto">
            <div className="mb-4 md:mb-0">
              <h1 className="text-3xl md:text-4xl font-semibold mb-2">
                Explore Our Courses
              </h1>
              <p className="text-lg md:text-xl font-normal text-gray-500">
                Find the right course to advance your education and career
                goals.
              </p>
            </div>
            {/* Search Bar */}
            <Input
              placeholder="Search Courses"
              prefix={<SearchOutlined />}
              className="w-full md:w-1/3 lg:w-1/4"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              allowClear
            />
          </div>

          {/* Search and Categories */}
          <div className="flex flex-wrap items-center justify-start gap-3 md:gap-x-6 mb-6 container mx-auto">
            <div
              className={`${
                activeCategory === "Emerging Technologies"
                  ? "bg-[#E2F1FF] font-medium"
                  : "font-normal border-2"
              } py-2 px-3 md:py-2.5 md:px-4 text-base md:text-xl cursor-pointer`}
              onClick={() => setActiveCategory("Emerging Technologies")}
            >
              Emerging Technologies
            </div>
            <div
              className={`${
                activeCategory === "Hardware & IT"
                  ? "bg-[#E2F1FF] font-medium"
                  : "font-normal border-2"
              } py-2 px-3 md:py-2.5 md:px-4 text-base md:text-xl cursor-pointer`}
              onClick={() => setActiveCategory("Hardware & IT")}
            >
              Hardware & IT
            </div>
            <div
              className={`${
                activeCategory === "Management"
                  ? "bg-[#E2F1FF] font-medium"
                  : "font-normal border-2"
              } py-2 px-3 md:py-2.5 md:px-4 text-base md:text-xl cursor-pointer`}
              onClick={() => setActiveCategory("Management")}
            >
              Management
            </div>
            <div
              className={`${
                activeCategory === "Sustainability"
                  ? "bg-[#E2F1FF] font-medium"
                  : "font-normal border-2"
              } py-2 px-3 md:py-2.5 md:px-4 text-base md:text-xl cursor-pointer`}
              onClick={() => setActiveCategory("Sustainability")}
            >
              Sustainability
            </div>
            <div
              className={`${
                activeCategory === "Miscellaneous"
                  ? "bg-[#E2F1FF] font-medium"
                  : "font-normal border-2"
              } py-2 px-3 md:py-2.5 md:px-4 text-base md:text-xl cursor-pointer`}
              onClick={() => setActiveCategory("Miscellaneous")}
            >
              Miscellaneous
            </div>
          </div>

          {/* Courses List */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 container mx-auto">
            {filteredCourses.length > 0 ? (
              <>
                {searchTerm && (
                  <div className="col-span-full mb-4">
                    <p className="text-gray-600">
                      Found {filteredCourses.length} course{filteredCourses.length !== 1 ? 's' : ''} for "{searchTerm}"
                    </p>
                  </div>
                )}
                {filteredCourses.map((course) => (
                  <Link
                    key={course.id}
                    href={
                      course.id === 1 ? "https://futurense.com/uni/genai" :
                      course.id === 2 ? "https://cloudxlab.com/course/188/pg-certificate-program-in-data-science-ai-by-cec-iit-roorkee" :
                      course.id === 3 ? "/courses/applied-data-science" :
                      course.id === 4 ? "/courses/accelerators-deep-learning" :
                      course.id === 5 ? "https://iitroorkee.manufacturing.zerozeta.com/" :
                      course.id === 6 ? "/courses/data-science-ml" :
                      course.id === 7 ? "https://tejasiitr.com/" :
                      course.id === 8 ? "https://imarticus.org/certification-program-in-human-resource-management-and-analytics-iit-roorkee/" :
                      course.id === 9 ? "https://hellopm.co/pm-accelerator-iitr/" :
                      course.id === 10 ? "https://imarticus.org/professional-certification-in-supply-chain-management-and-analytics-by-IIT-Roorkee/" :
                      course.id === 11 ? "https://imarticus.org/advanced-certification-in-digital-marketing-and-martech-iit-roorkee/" :
                      course.id === 12 ? "https://www.jaroeducation.com/strategic-product-certification-iit-roorkee/" :
                      course.id === 13 ? "https://www.eduxll.com/programmes/SUSTAINABILITY-ESG-AND-GRI-STANDARDS" :
                      course.id === 14 ? "https://cec.iitr.ac.in/Brochure/Information_brochure.pdf" :
                      "#"
                    }
                    target={course.id === 1 || course.id === 2 || course.id === 5 || course.id === 7 || course.id === 8 || course.id === 9 || course.id === 10 || course.id === 11 || course.id === 12 || course.id === 13 || course.id === 14 ? "_blank" : undefined}
                    rel={course.id === 1 || course.id === 2 || course.id === 5 || course.id === 7 || course.id === 8 || course.id === 9 || course.id === 10 || course.id === 11 || course.id === 12 || course.id === 13 || course.id === 14 ? "noopener noreferrer" : undefined}
                    className="block"
                  >
                    <div className="transition-all duration-300 hover:shadow-[0_0_12px_rgba(255,174,14,0.4)] hover:scale-[1.02] rounded-md">
                      <Card
                        hoverable={false}
                        className="border rounded-md shadow-md h-full flex flex-col overflow-hidden cursor-pointer"
                        styles={{
                          body: {
                            padding: 0,
                            display: "flex",
                            flexDirection: "column",
                            flexGrow: 1,
                          }
                        }}
                      >
                        <Image
                          preview={false}
                          src={course.image || "/course.jpeg"}
                          alt={course.name}
                          className="h-40 w-full object-cover"
                          style={{ aspectRatio: "16/9" }}
                        />

                        <div className="p-4 flex flex-col flex-grow">
                          <div>
                            <h3 className="font-semibold text-xl">{course.name}</h3>

                            <div className="w-full flex justify-between items-center my-2 text-base font-normal">
                              <p className="flex items-center gap-1">
                                <Clock className="w-[16px] h-[16px]" />
                                {course.duration}
                              </p>
                              <p className="flex items-center gap-1">
                                <Wifi className="w-[16px] h-[16px]" />
                                {course.mode}
                              </p>
                              <p className="flex items-center gap-1">
                                <GraduationCap className="w-[16px] h-[16px]" />
                                {course.students}
                              </p>
                            </div>
                          </div>

                          <div>
                            <div className="w-full flex justify-between items-center mt-2">
                              <div>
                                <p className="text-base font-medium">{course.partner}</p>
                                <p className="font-light text-base">Program Partner</p>
                              </div>
                              <div className="text-[#FFAE0E] mt-2 inline-block text-base font-medium self-end">
                                Know More
                              </div>
                            </div>
                          </div>
                        </div>
                      </Card>
                    </div>
                  </Link>
                ))}
              </>
            ) : (
              <div className="col-span-full text-center py-12">
                <div className="max-w-md mx-auto">
                  <div className="text-6xl mb-4">🔍</div>
                  <h3 className="text-xl font-semibold text-gray-700 mb-2">
                    No courses found
                  </h3>
                  <p className="text-gray-500 mb-4">
                    {searchTerm 
                      ? `No courses match your search for "${searchTerm}". Try different keywords or browse all categories.`
                      : "No courses available in this category at the moment."
                    }
                  </p>
                  {searchTerm && (
                    <button
                      onClick={() => setSearchTerm("")}
                      className="text-[#FFAE0E] hover:text-[#E5893C] font-medium"
                    >
                      Clear search
                    </button>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Sponsors Section */}
          <div className="mt-12">
            <h2 className="text-2xl md:text-3xl font-semibold mb-4 text-center border-b-4 max-w-max mx-auto pb-2 border-b-[#FFC758] tracking-wide">
              Our Sponsors
            </h2>
            <div className="w-full overflow-hidden">
              <div className="flex gap-x-12 animate-scroll whitespace-nowrap py-6">
                {/* Ed-Tech Partners */}
                <Image
                  height="40px"
                  className="object-contain mx-6 md:mx-8"
                  alt="Futurense"
                  preview={false}
                  src="/ed-tech-partners/futurense.png"
                  style={{ flexShrink: 0 }}
                />
                <Image
                  height="40px"
                  className="object-contain mx-6 md:mx-8"
                  alt="CloudxLab"
                  preview={false}
                  src="/ed-tech-partners/cloudxlab.png"
                  style={{ flexShrink: 0 }}
                />
                <Image
                  height="40px"
                  className="object-contain mx-6 md:mx-8"
                  alt="Jaro Education"
                  preview={false}
                  src="/ed-tech-partners/jaro.png"
                  style={{ flexShrink: 0 }}
                />
                <Image
                  height="40px"
                  className="object-contain mx-6 md:mx-8"
                  alt="Imarticus"
                  preview={false}
                  src="/ed-tech-partners/imarticus.png"
                  style={{ flexShrink: 0 }}
                />
                <Image
                  height="40px"
                  className="object-contain mx-6 md:mx-8"
                  alt="Coursera"
                  preview={false}
                  src="/ed-tech-partners/coursera.png"
                  style={{ flexShrink: 0 }}
                />
                <Image
                  height="40px"
                  className="object-contain mx-6 md:mx-8"
                  alt="Simplilearn"
                  preview={false}
                  src="/ed-tech-partners/simplilearn.png"
                  style={{ flexShrink: 0 }}
                />
                <Image
                  height="40px"
                  className="object-contain mx-6 md:mx-8"
                  alt="Futurewiz"
                  preview={false}
                  src="/ed-tech-partners/futurewiz.png"
                  style={{ flexShrink: 0 }}
                />
                <Image
                  height="40px"
                  className="object-contain mx-6 md:mx-8"
                  alt="EduXLL"
                  preview={false}
                  src="/ed-tech-partners/eduxll.png"
                  style={{ flexShrink: 0 }}
                />
                
                {/* National Sponsors */}
                <Image
                  height="40px"
                  className="object-contain mx-6 md:mx-8"
                  alt="BHEL"
                  preview={false}
                  src="/national-sponsors/bhel.png"
                  style={{ flexShrink: 0 }}
                />
                <Image
                  height="40px"
                  className="object-contain mx-6 md:mx-8"
                  alt="NHPC"
                  preview={false}
                  src="/national-sponsors/nhpc.png"
                  style={{ flexShrink: 0 }}
                />
                <Image
                  height="40px"
                  className="object-contain mx-6 md:mx-8"
                  alt="NTPC"
                  preview={false}
                  src="/national-sponsors/ntpc.png"
                  style={{ flexShrink: 0 }}
                />
                <Image
                  height="40px"
                  className="object-contain mx-6 md:mx-8"
                  alt="ONGC"
                  preview={false}
                  src="/national-sponsors/ongc.png"
                  style={{ flexShrink: 0 }}
                />
                <Image
                  height="40px"
                  className="object-contain mx-6 md:mx-8"
                  alt="DST"
                  preview={false}
                  src="/national-sponsors/dst.png"
                  style={{ flexShrink: 0 }}
                />
                <Image
                  height="40px"
                  className="object-contain mx-6 md:mx-8"
                  alt="CWC"
                  preview={false}
                  src="/national-sponsors/cwc.png"
                  style={{ flexShrink: 0 }}
                />
                <Image
                  height="40px"
                  className="object-contain mx-6 md:mx-8"
                  alt="CPCB"
                  preview={false}
                  src="/national-sponsors/cpcb.png"
                  style={{ flexShrink: 0 }}
                />
                <Image
                  height="40px"
                  className="object-contain mx-6 md:mx-8"
                  alt="Alstom"
                  preview={false}
                  src="/national-sponsors/alstom.png"
                  style={{ flexShrink: 0 }}
                />
                
                {/* International Sponsors */}
                <Image
                  height="40px"
                  className="object-contain mx-6 md:mx-8"
                  alt="JICA"
                  preview={false}
                  src="/international-sponsors/jica.png"
                  style={{ flexShrink: 0 }}
                />
                <Image
                  height="40px"
                  className="object-contain mx-6 md:mx-8"
                  alt="ADB"
                  preview={false}
                  src="/international-sponsors/adb.png"
                  style={{ flexShrink: 0 }}
                />
                <Image
                  height="40px"
                  className="object-contain mx-6 md:mx-8"
                  alt="IRENA"
                  preview={false}
                  src="/international-sponsors/irena.png"
                  style={{ flexShrink: 0 }}
                />
                <Image
                  height="40px"
                  className="object-contain mx-6 md:mx-8"
                  alt="MEA"
                  preview={false}
                  src="/international-sponsors/mea.png"
                  style={{ flexShrink: 0 }}
                />
                <Image
                  height="40px"
                  className="object-contain mx-6 md:mx-8"
                  alt="SAARC"
                  preview={false}
                  src="/international-sponsors/saarc.png"
                  style={{ flexShrink: 0 }}
                />
                <Image
                  height="40px"
                  className="object-contain mx-6 md:mx-8"
                  alt="NTU Singapore"
                  preview={false}
                  src="/international-sponsors/ntu.png"
                  style={{ flexShrink: 0 }}
                />
                <Image
                  height="40px"
                  className="object-contain mx-6 md:mx-8"
                  alt="Loughborough"
                  preview={false}
                  src="/international-sponsors/loughborough.png"
                  style={{ flexShrink: 0 }}
                />
                <Image
                  height="40px"
                  className="object-contain mx-6 md:mx-8"
                  alt="VIO"
                  preview={false}
                  src="/international-sponsors/vio.png"
                  style={{ flexShrink: 0 }}
                />
              </div>
            </div>
            
            {/* View All Sponsors Link */}
            <div className="text-center mt-6">
              <Link
                href="/sponsors"
                className="inline-flex items-center gap-2 text-[#FFAE0E] hover:text-[#E5893C] font-medium transition-colors duration-200"
              >
                View All Sponsors
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          </div>
        </section>

        {/* Testimonial Section */}
        <section className="bg-[#E1F1F4] px-4 sm:px-8 md:px-16 py-8 md:py-12">
          <div className="container mx-auto">
            <Row gutter={[50, 32]} className="mb-12">
              <Col xs={24} lg={8}>
                <div className="space-y-2 text-center lg:text-left">
                  <div className="p-4 bg-white rounded-full max-w-max mx-auto lg:mx-0">
                    <GraduationCap className="w-8 h-8" />
                  </div>
                  <p className="text-lg md:text-xl font-medium inline-block lg:max-w-max border-b-2 border-b-[#666666] pb-2 pr-0 lg:pr-8 tracking-wide">
                    Why Choose us ?
                  </p>
                  <p className="text-base font-light pt-3 text-justify">
                    A leading center of excellence in science, engineering,
                    technology, and management, we are dedicated to developing
                    top-tier professionals equipped to meet the evolving demands
                    of their fields.
                  </p>
                </div>
              </Col>
              <Col xs={24} lg={8}>
                <div className="space-y-2 text-center lg:text-left">
                  <div className="p-4 bg-white rounded-full max-w-max mx-auto lg:mx-0">
                    <Star className="w-8 h-8" />
                  </div>
                  <p className="text-lg md:text-xl font-medium inline-block lg:max-w-max border-b-2 border-b-[#666666] pb-2 pr-0 lg:pr-8 tracking-wide">
                    Our Mission
                  </p>
                  <p className="text-base font-light pt-3 text-justify">
                    To establish a center dedicated to delivering high-quality
                    technical education through cutting-edge technological
                    interventions, fostering economic growth and development
                    across the nation.
                  </p>
                </div>
              </Col>
              <Col xs={24} lg={8}>
                <div className="space-y-2 text-center lg:text-left">
                  <div className="p-4 bg-white rounded-full max-w-max mx-auto lg:mx-0">
                    <Sun className="w-8 h-8" />
                  </div>
                  <p className="text-lg md:text-xl font-medium inline-block lg:max-w-max border-b-2 border-b-[#666666] pb-2 pr-0 lg:pr-8 tracking-wide">
                    Our Vision
                  </p>
                  <p className="text-base font-light pt-3 text-justify">
                    To create comprehensive avenues for acquiring in-depth
                    knowledge and hands-on experience in specialized fields,
                    empowering individuals to excel and lead in their chosen
                    careers.
                  </p>
                </div>
              </Col>
            </Row>

            {/* Student Testimonials */}
            <div className="text-center text-3xl md:text-4xl font-semibold mb-8">
              <p>Hear from Our Students</p>
            </div>
            
            {/* Testimonials Container */}
            {testimonials.length > 0 ? (
              <div className="relative overflow-hidden">
                <div className="flex gap-6 animate-testimonial-scroll">
                  {/* Original testimonials */}
                  {testimonials.map((testimonial, index) => (
                    <div key={index} className="flex-shrink-0 w-full md:w-1/2 lg:w-1/3">
                      <Card
                        className="shadow-lg rounded-lg h-full"
                        bordered={false}
                        styles={{
                          body: {
                            height: "100%",
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "space-between",
                            padding: "24px",
                          },
                        }}
                      >
                        <div className="flex-grow">
                          <p className="text-sm font-light text-justify leading-relaxed">
                            &quot;{testimonial.quote}&quot;
                          </p>
                        </div>
                        <div className="flex items-center mt-6 gap-x-3">
                          <Image
                            preview={false}
                            src={testimonial.image}
                            alt={testimonial.name}
                            width="56px"
                            height="56px"
                            className="rounded-full object-cover flex-shrink-0"
                          />
                          <div className="min-w-0 flex-1">
                            <p className="text-lg font-medium tracking-wide truncate">
                              {testimonial.name}
                            </p>
                            <p className="text-sm font-light text-[#2C2C2C] truncate">
                              {testimonial.designation}
                            </p>
                          </div>
                        </div>
                      </Card>
                    </div>
                  ))}
                  
                  {/* Duplicate testimonials for seamless scrolling */}
                  {testimonials.map((testimonial, index) => (
                    <div key={`duplicate-${index}`} className="flex-shrink-0 w-full md:w-1/2 lg:w-1/3">
                      <Card
                        className="shadow-lg rounded-lg h-full"
                        bordered={false}
                        styles={{
                          body: {
                            height: "100%",
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "space-between",
                            padding: "24px",
                          },
                        }}
                      >
                        <div className="flex-grow">
                          <p className="text-sm font-light text-justify leading-relaxed">
                            &quot;{testimonial.quote}&quot;
                          </p>
                        </div>
                        <div className="flex items-center mt-6 gap-x-3">
                          <Image
                            preview={false}
                            src={testimonial.image}
                            alt={testimonial.name}
                            width="56px"
                            height="56px"
                            className="rounded-full object-cover flex-shrink-0"
                          />
                          <div className="min-w-0 flex-1">
                            <p className="text-lg font-medium tracking-wide truncate">
                              {testimonial.name}
                            </p>
                            <p className="text-sm font-light text-[#2C2C2C] truncate">
                              {testimonial.designation}
                            </p>
                          </div>
                        </div>
                      </Card>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="text-center py-12">
                <div className="max-w-md mx-auto">
                  <div className="text-6xl mb-4">💬</div>
                  <h3 className="text-xl font-semibold text-gray-700 mb-2">
                    No testimonials available
                  </h3>
                  <p className="text-gray-500">
                    Student testimonials will appear here once they are added.
                  </p>
                </div>
              </div>
            )}
          </div>
        </section>

        {/* Events Section */}
        <section className="bg-[#FFFAF1] px-4 sm:px-8 md:px-16 py-8 md:py-12">
          <div className="container mx-auto">
            <div className="text-center mb-8">
              <h1 className="text-3xl md:text-4xl font-semibold mb-2">Upcoming Events & Courses</h1>
              <p className="text-lg md:text-xl font-normal text-gray-500">
                Stay updated with our latest courses and events
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Featured Event 1 */}
              <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-300">
                <div className="flex items-center justify-between mb-4">
                  <span className="bg-[#FFAE0E] text-white px-3 py-1 rounded-full text-sm font-medium">
                    Featured
                  </span>
                  <span className="text-gray-500 text-sm">June 2025</span>
                </div>
                <h3 className="text-xl font-semibold mb-2 text-[#102a43]">
                  Data-Driven Frontiers: Blockchain, Social Networks, and Multimedia
                </h3>
                <p className="text-gray-600 mb-4">
                  An intensive course covering cutting-edge technologies in blockchain, social network analysis, and multimedia processing.
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-[#FFAE0E] font-medium">Open Course</span>
                  <a 
                    href="https://cec.iitr.ac.in/Brochure/Information_brochure.pdf" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:text-blue-800 font-medium"
                  >
                    Learn More →
                  </a>
                </div>
              </div>

              {/* Featured Event 2 */}
              <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-300">
                <div className="flex items-center justify-between mb-4">
                  <span className="bg-green-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                    New
                  </span>
                  <span className="text-gray-500 text-sm">Ongoing</span>
                </div>
                <h3 className="text-xl font-semibold mb-2 text-[#102a43]">
                  GenAI/Agentic AI & ML Applications for Engineers
                </h3>
                <p className="text-gray-600 mb-4">
                  Comprehensive program on Generative AI and Machine Learning applications for engineering professionals.
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-[#FFAE0E] font-medium">Futurense</span>
                  <a 
                    href="https://futurense.com/uni/genai" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:text-blue-800 font-medium"
                  >
                    Enroll Now →
                  </a>
                </div>
              </div>

              {/* Featured Event 3 */}
              <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-300">
                <div className="flex items-center justify-between mb-4">
                  <span className="bg-blue-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                    Popular
                  </span>
                  <span className="text-gray-500 text-sm">12 Months</span>
                </div>
                <h3 className="text-xl font-semibold mb-2 text-[#102a43]">
                  Data Science and AI Certification Program
                </h3>
                <p className="text-gray-600 mb-4">
                  Advanced certification program in Data Science and Artificial Intelligence with hands-on projects.
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-[#FFAE0E] font-medium">CloudxLab</span>
                  <a 
                    href="https://cloudxlab.com/course/188/pg-certificate-program-in-data-science-ai-by-cec-iit-roorkee" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:text-blue-800 font-medium"
                  >
                    Apply Now →
                  </a>
                </div>
              </div>
            </div>

            {/* Call to Action */}
            <div className="text-center mt-8">
              <p className="text-lg text-gray-700 mb-4">
                Explore our complete course catalog and find the perfect program for your career growth
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="https://d1bm918zlnq37v.cloudfront.net/CECTemp/CEC-brochure.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-[#FFAE0E] text-black px-6 py-3 rounded-lg font-medium hover:bg-[#E5893C] transition-colors duration-200"
                >
                  Download Course Brochure
                </a>
                <a
                  href="#explore-courses"
                  className="border-2 border-[#FFAE0E] text-[#FFAE0E] px-6 py-3 rounded-lg font-medium hover:bg-[#FFAE0E] hover:text-black transition-colors duration-200"
                >
                  View All Courses
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* News Section */}
        <section className="px-4 sm:px-8 md:px-16 py-8 md:py-12">
          <div className="container mx-auto">
            <h2 className="text-2xl md:text-3xl font-semibold mb-8 text-left text-[#102a43] tracking-wide">Latest News</h2>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
              {/* Left Section: Featured News */}
              <div className="space-y-4">
                <div className="bg-white rounded-lg overflow-hidden">
                  <Image
                    preview={false}
                    alt={newsData[0].title}
                    src={newsData[0].image}
                    className="w-full h-48 md:h-64 object-cover rounded-t-lg"
                  />
                  <div className="p-6">
                    <div className="flex flex-wrap gap-4 items-center mb-3 text-sm text-gray-600">
                      <p className="flex items-center gap-2">
                        <CalendarMinus2 className="w-4 h-4" />
                        {newsData[0].date}
                      </p>
                      <p className="flex items-center gap-2">
                        <Pen className="w-4 h-4" />
                        {newsData[0].source}
                      </p>
                    </div>
                    <a 
                      href="https://indianexpress.com/article/education/iit-roorkee-to-offer-executive-program-in-business-analytics-for-professionals-8022611/" 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="text-lg md:text-xl font-semibold text-[#102a43] hover:text-[#FFAE0E] transition-colors duration-200 block mb-3"
                    >
                      {newsData[0].title}
                    </a>
                    <p className="text-sm md:text-base font-light text-gray-600">
                      {newsData[0].description}
                    </p>
                  </div>
                </div>
              </div>

              {/* Right Section: Smaller News */}
              <div className="space-y-6">
                {newsData.slice(1).map((news) => (
                  <div key={news.id} className="bg-white rounded-lg overflow-hidden">
                    <div className="flex flex-col sm:flex-row">
                      <div className="sm:w-1/3">
                        <Image
                          preview={false}
                          alt={news.title}
                          src={news.image}
                          className="w-full h-32 sm:h-full object-cover rounded-t-lg sm:rounded-l-lg sm:rounded-t-none"
                        />
                      </div>
                      <div className="sm:w-2/3 p-4 sm:p-6">
                        <div className="flex flex-wrap gap-4 items-center mb-3 text-sm text-gray-600">
                          <p className="flex items-center gap-2">
                            <CalendarMinus2 className="w-4 h-4" />
                            {news.date}
                          </p>
                          <p className="flex items-center gap-2">
                            <Pen className="w-4 h-4" />
                            {news.source}
                          </p>
                        </div>
                        <a 
                          href={news.link} 
                          target="_blank" 
                          rel="noopener noreferrer" 
                          className="text-base md:text-lg font-semibold text-[#102a43] hover:text-[#FFAE0E] transition-colors duration-200 block mb-2"
                        >
                          {news.title}
                        </a>
                        <p className="text-sm font-light text-gray-600">
                          {news.description}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </section>

      {/* Back to Top Button */}
      {showBackToTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 bg-[#FFAE0E] text-black p-3 rounded-full shadow-lg hover:bg-[#E5893C] transition-all duration-300 z-50"
          aria-label="Back to top"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
          </svg>
        </button>
      )}
    </div>
  );
}
