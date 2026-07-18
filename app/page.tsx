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
  CalendarClock,
} from "lucide-react";
import { SearchOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";

import type { PublicCourse } from "@/lib/course-enrich";
import { INITIAL_COURSES } from "@/lib/initial-courses";
import { enrichCoursesForPublic } from "@/lib/course-enrich";
import { TEAM_MEMBERS } from "@/lib/team-members";
import { TeamMemberGrid } from "@/components/TeamMemberGrid";
import { LeadershipMessageCard } from "@/components/LeadershipMessageCard";

type NewsItem = {
  id: number;
  title: string;
  description: string;
  date: string;
  source: string;
  image: string;
  link?: string;
};

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
    title: "IIT Roorkee in tie up with Jaro Education to offer PG programme in Data Science, AI",
    description: "Post Graduate Certificate Programme in Applied Data Science & AI at IIT Roorkee, offered by the Continuing Education Centre in collaboration with Jaro Education.",
    date: "31 August 2024",
    source: "By The Hindu",
    image: "https://d1bm918zlnq37v.cloudfront.net/CECTemp/11July2022.png",
    link: "https://www.thehindu.com/business/iit-roorkee-in-tie-up-with-jaro-education-to-offer-pg-programme-in-data-science-ai/article68582602.ece",
  },
  {
    id: 2,
    title: "IIT-Roorkee, Futurense announce GenAI-powered cybersecurity programme",
    description: "India's first postgraduate certificate in AI/GenAI-powered cybersecurity, addressing deepfakes, AI-authored phishing, and LLM exploits.",
    date: "21 August 2025",
    source: "By Indian Express",
    image: "https://d1bm918zlnq37v.cloudfront.net/CECTemp/12Aug2020.jpg",
    link: "https://indianexpress.com/article/education/iit-roorkee-generative-ai-powered-cybersecurity-programme-artifiial-intelligence-course-jee-main-advanced-2026-10200303/",
  },
  {
    id: 3,
    title: "IIT Roorkee, Scaler to Jointly Launch Advanced AI-Focused Courses",
    description: "Advanced AI Engineering programme through CEC IIT Roorkee with Scaler—live online classes, hands-on projects, and two-day campus immersion.",
    date: "12 May 2025",
    source: "By Times Now",
    image: "https://d1bm918zlnq37v.cloudfront.net/CECTemp/11July2022.png",
    link: "https://www.timesnownews.com/education/iit-roorkee-scaler-to-jointly-launch-advanced-ai-focused-courses-article-151617477",
  },
  {
    id: 4,
    title: "IIT-Roorkee launches new advanced certificate course in Quantum Computing – Algorithms and AI/ML",
    description: "6.5-month online programme in Quantum Computing with Qiskit, PennyLane, and IBM Quantum Systems, offered by CEC in collaboration with TimesPro.",
    date: "16 October 2025",
    source: "By Indian Express",
    image: "/IITR_building.jpeg",
    link: "https://indianexpress.com/article/education/iit-roorkee-launches-new-advanced-certificate-quantum-computing-algorithms-ai-ml-jee-main-2026-advanced-10307863/",
  },
];

const noticeItems = [
  {
    text: "AICTE QIP PG Certificate Programmes ",
    link: "https://qippg.aicte.gov.in/"
  },
  {
    text: "Signed the partnership MoU with Physics Wallah (EdTech) ",
    link: "https://d1bm918zlnq37v.cloudfront.net/CECTemp/MoU_PW.jpg"
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

const COORDINATOR_IMAGE_URL =
 "/staff/ss_ceciitr.png";

const DIRECTOR_IMAGE_URL =
  "https://d1bm918zlnq37v.cloudfront.net/CECTemp/Director.jpeg";

const directorMessage =
  "One of the key goals of I.I.T. Roorkee and CEC I.I.T. Roorkee is to ensure that the impact of cutting-edge research and knowledge creation at IIT Roorkee extends beyond its campus. In addition to the short-term courses, a major new initiative of offering open participation long-duration courses in specialized domains such as AI/ML, Data Science, Cyber Security, 5G, and allied technologies has been started. The objective of these programs is to fill the gap in the availability of trained manpower in the latest and in-demand areas that the country needs. CEC IITR has also partnered with leading EdTechs to expand I.I.T. Roorkee outreach in delivering high-quality content for a wider audience nationally and internationally. Several new courses have been sponsored by organizations like Deloitte, Indian Army, BEL, etc. are planned to be organized by CEC. I appeal to all faculty members to provide their valuable inputs and submit proposals under various calls for organizing courses sponsored by Govt. departments/ public/ private organisations to disseminate the research knowledge beyond the campus.";

const coordinatorMessage =
  "We are committed to making high-quality and transformational education accessible to all. Our programs are designed to provide executives, professionals, and aspiring individuals a launchpad for taking them to next level in their career. In addition to sponsored short-term courses, which form a large part of the training and upskilling effort, CEC IITR has launched a new major initiative to offer the longer duration programs (up to a year) having PG and Advanced Certifications. CEC IITR courses are available in both asynchronous and hybrid learning modes. Our courses are designed to provide learners a specialization, which will enable them to master in-demand skills needed to work on the latest problems in industry and research. Through these open participation programs, we aim to reach out to aspiring individuals and professionals to develop cutting-edge competencies in their professional careers. CEC has signed partnership MoUs with many organizations to offer courses and training programs in diverse areas. Some of our major partners for sponsored courses are SAIL, TATA Steel, NTPC, BEL, SAARC, NIC, etc.";

const leadershipProfiles = [
  {
    title: "Message from Director",
    name: "Prof. Kamal Kishore Pant",
    role: "Director, IIT Roorkee",
    institute: "IIT Roorkee",
    image: DIRECTOR_IMAGE_URL,
    imageAlt: "Prof. Kamal Kishore Pant",
    message: directorMessage,
  },
  {
    title: "Message from Coordinator",
    name: "Prof. Soumitra Satapathi",
    role: "Coordinator, Continuing Education Centre",
    institute: "IIT Roorkee",
    image: COORDINATOR_IMAGE_URL,
    imageAlt: "Prof. Soumitra Satapathi",
    message: coordinatorMessage,
  },
];

const upcomingEvents = [
  {
    badge: "New Batch",
    badgeClass: "bg-[#2441B6] text-white",
    duration: "6-8 Months",
    title: "PG Certificate Programme in Applied Data Science & AI",
    description:
      "Upskills working professionals in data science and AI fundamentals, practical software technologies, and prescribing the best course of action across business and application contexts.",
    partner: "Jaro Education",
    ctaLabel: "Learn More →",
    href: "https://www.jaroeducation.com/applied-data-science-ai-certificate-iitr",
  },
  {
    badge: "New Batch",
    badgeClass: "bg-green-500 text-white",
    duration: "11 Months",
    title: "GenAI/Agentic AI & ML Applications for Engineers",
    description:
      "Comprehensive program on Generative AI and Machine Learning applications for engineering professionals.",
    partner: "Futurense",
    ctaLabel: "Learn More →",
    href: "https://futurense.com/iit-roorkee/genai-and-agentic-ai-iit-rorkee",
  },
  {
    badge: "New Batch",
    badgeClass: "bg-blue-500 text-white",
    duration: "9 Months",
    title: "AI Engineering on Cloud and AlOps",
    description:
      "Comprehensive program on AI Engineering on Cloud and AIOps for engineering professionals.",
    partner: "Futurense",
    ctaLabel: "Learn More →",
    href: "https://futurense.com/iit-roorkee/aiops",
  },
];

export default function HomePage() {
  const [courses, setCourses] = useState<PublicCourse[]>(
    enrichCoursesForPublic(INITIAL_COURSES)
  );
  const [filteredCourses, setFilteredCourses] = useState<PublicCourse[]>(
    enrichCoursesForPublic(INITIAL_COURSES)
  );
  const [activeCategory, setActiveCategory] = useState<string>(
    "Emerging Technologies"
  );
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [lines, setLines] = useState<string[]>([]);
  const [isTyping, setIsTyping] = useState(true);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [showNoticePopup, setShowNoticePopup] = useState(false);
  const [courseViewTab, setCourseViewTab] = useState<"ongoing" | "upcoming">(
    "ongoing"
  );

  useEffect(() => {
    fetch("/api/courses", { cache: "no-store" })
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data.courses) && data.courses.length > 0) {
          setCourses(data.courses);
        }
      })
      .catch(() => {
        // Keep INITIAL_COURSES fallback when API is unavailable.
      });
  }, []);

  const heroImages = [
    "https://d1bm918zlnq37v.cloudfront.net/CECTemp/Header4.png",
    "https://d1bm918zlnq37v.cloudfront.net/CECTemp/HeroPhoto.JPG",
     "/ed-tech-partners/sl.jpg",
       "/ed-tech-partners/new_fin.png",
        "/ed-tech-partners/m1.png",
       
  ];

  const heroTexts = [
    "IIT ROORKEE",
    "Quality",
    "Improvement",
    "& Continuing",
    "Education Center",
  ];

  useEffect(() => {
    let filtered: PublicCourse[] = [];
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
  }, [activeCategory, searchTerm, courses]);

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

  const renderCourseCard = (course: PublicCourse) => (
    <Link
      key={course.id}
      href={course.redirectHref || course.redirectLink || "#"}
      target={course.openInNewTab ? "_blank" : undefined}
      rel={course.openInNewTab ? "noopener noreferrer" : undefined}
      className="block h-full"
    >
      <div className="transition-all duration-300 hover:shadow-[0_0_12px_rgba(36,65,182,0.4)] hover:scale-[1.02] rounded-md h-full">
        <Card
          hoverable={false}
          className="border rounded-md shadow-md h-full flex flex-col overflow-hidden cursor-pointer"
          styles={{
            body: {
              padding: 0,
              display: "flex",
              flexDirection: "column",
              flexGrow: 1,
              height: "100%",
            }
          }}
        >
          <Image
            preview={false}
            src={course.imageUrl || course.image || "/course.jpeg"}
            alt={course.name}
            className="h-40 w-full object-cover flex-shrink-0"
            style={{ aspectRatio: "16/9" }}
          />

          <div className="p-4 flex flex-col h-full">
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

            <div className="flex-grow"></div>

            <div>
              <div className="w-full flex justify-between items-center mt-2">
                <div>
                  <p className="text-base font-medium">{course.partner}</p>
                  <p className="font-light text-base">Program Partner</p>
                </div>
                <div className="text-[#2441B6] mt-2 inline-block text-base font-medium self-end">
                  Know More
                </div>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </Link>
  );

  return (
    <div className="w-full font-inter">
      <section className="relative w-full h-[60vh] md:h-[80vh] overflow-hidden">
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
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/30 z-10"></div>

       <div className="absolute bottom-28 md:bottom-28 left-1/2 -translate-x-1/2 z-20 w-full max-w-7xl px-2 sm:px-8 text-center">
          <h1 className="whitespace-nowrap text-[clamp(10px,3.4vw,3rem)] font-bold text-white leading-tight drop-shadow-[0_2px_8px_rgba(0,0,0,0.6)]">
            Build future-ready skills with CEC, IIT Roorkee
          </h1>
        </div>

        {/* Social links - hero */}
        <div className="absolute bottom-14 md:bottom-8 right-3 sm:right-8 md:right-12 flex items-center gap-2.5 md:gap-4 z-30">
          <a
            href="https://x.com/iitroorkee"
            aria-label="Twitter"
            className="w-9 h-9 md:w-12 md:h-12 flex items-center justify-center rounded-full bg-white/10 backdrop-blur-sm text-white hover:text-[#2441B6] hover:bg-white/20 transition-all duration-200 hover:scale-110"
            target="_blank"
            rel="noopener noreferrer"
          >
            <svg className="w-4 h-4 md:w-6 md:h-6 fill-current" viewBox="0 0 16 16">
              <path d="M12.8 1.5h2.2l-5.1 5.8 6.1 7.7h-2.2l-3.7-4.8L3.5 15H1.3l5.5-6.2L1.3 1.5h3.9l3.3 4.4zm-0.9 12.2h1.2L5.1 2.9H3.9z"/>
            </svg>
          </a>
          <a
            href="https://www.facebook.com/profile.php?id=100082831977496#"
            aria-label="Facebook"
            className="w-9 h-9 md:w-12 md:h-12 flex items-center justify-center rounded-full bg-white/10 backdrop-blur-sm text-white hover:text-[#2441B6] hover:bg-white/20 transition-all duration-200 hover:scale-110"
            target="_blank"
            rel="noopener noreferrer"
          >
            <svg className="w-4 h-4 md:w-6 md:h-6 fill-current" viewBox="0 0 16 16">
              <path d="M15.5 8c0-4.1-3.4-7.5-7.5-7.5S0.5 3.9 0.5 8c0 3.9 2.9 7.1 6.6 7.7v-5.5h-2V8h2V6.2c0-2.1 1.3-3.2 3.1-3.2 0.9 0 1.8 0.2 1.8 0.2v2h-1.1c-1.1 0-1.4 0.7-1.4 1.4V8h2.3l-0.4 2.3h-1.9v5.5C12.6 15.1 15.5 11.9 15.5 8z"/>
            </svg>
          </a>
          <a
            href="https://www.linkedin.com/company/ceciitr/"
            aria-label="LinkedIn"
            className="w-9 h-9 md:w-12 md:h-12 flex items-center justify-center rounded-full bg-white/10 backdrop-blur-sm text-white hover:text-[#2441B6] hover:bg-white/20 transition-all duration-200 hover:scale-110"
            target="_blank"
            rel="noopener noreferrer"
          >
            <svg className="w-4 h-4 md:w-6 md:h-6 fill-current" viewBox="0 0 16 16">
              <path d="M13.6 13.6h-2.4v-3.7c0-0.9-0.02-2-1.2-2-1.2 0-1.4 1-1.4 2v3.7H6.2V6.7h2.3v1h0.03c0.3-0.6 1.1-1.2 2.2-1.2 2.4 0 2.8 1.6 2.8 3.6v3.5zM3.6 5c-0.8 0-1.4-0.6-1.4-1.4 0-0.8 0.6-1.4 1.4-1.4s1.4 0.6 1.4 1.4c0 0.8-0.6 1.4-1.4 1.4zm1.2 8.7H2.4V6.7h2.4v7zM14.8 0H1.2C0.5 0 0 0.5 0 1.2v13.7C0 15.5 0.5 16 1.2 16h13.6C15.5 16 16 15.5 16 14.8V1.2C16 0.5 15.5 0 14.8 0z"/>
            </svg>
          </a>
        </div>

        {/* Image Indicators */}
        <div className="absolute bottom-4 md:bottom-8 left-1/2 transform -translate-x-1/2 z-30 flex space-x-2">
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
      <section className="bg-[#E2F1FF] relative">
        {/* Mobile Notice Ticker */}
        <div className="md:hidden px-4 py-4">
          <div className="w-full overflow-hidden">
            <div className="notice-mobile-track py-2">
              {[...noticeItems, ...noticeItems].map((item, index) => (
                <div
                  key={`${item.text}-${index}`}
                  className="flex items-center gap-2 pr-6 whitespace-nowrap text-sm"
                >
                  <span className="w-2 h-2 bg-[#2441B6] rounded-full flex-shrink-0"></span>
                  <a
                    href={item.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-medium text-gray-800 hover:text-[#2441B6] transition-colors duration-200"
                  >
                    {item.text}
                  </a>
                </div>
              ))}
            </div>
          </div>
          <button
            onClick={() => setShowNoticePopup(true)}
            className="mt-3 w-full bg-[#2441B6] hover:bg-[#2441B6] text-white py-2 font-medium text-base underline transition-all duration-200 shadow-[0_4px_12px_rgba(36,65,182,0.3)] hover:shadow-[0_8px_20px_rgba(36,65,182,0.4)]"
          >
            View All
          </button>
        </div>

        {/* Desktop Notice Ticker */}
        <div className="hidden md:block">
          <div className="w-full overflow-hidden pr-32">
            <div className="flex animate-scroll whitespace-nowrap py-2.5">
              <ul className="flex list-disc">
                {items.map((item, index) => (
                  <li key={index} className="mx-6 text-xl font-normal list-disc">
                    <a 
                      href={item.link} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="hover:text-[#2441B6] transition-colors duration-200 cursor-pointer"
                    >
                      {item.text}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* View All Button */}
        <div className="hidden md:block absolute right-0 top-0 h-full z-10">
          <button
            onClick={() => setShowNoticePopup(true)}
            className="bg-[#2441B6] hover:bg-[#2441B6] text-white px-6 h-full font-medium text-lg underline transition-all duration-200 shadow-[0_4px_12px_rgba(36,65,182,0.3)] hover:shadow-[0_8px_20px_rgba(36,65,182,0.4)]"
          >
            View All
          </button>
        </div>
      </section>

      {/* Notice Popup */}
      {showNoticePopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-sky-100 rounded-lg shadow-xl max-w-2xl w-full max-h-[80vh] overflow-y-auto">
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
                      className="block hover:bg-sky-200 p-3 rounded-lg transition-colors duration-200"
                    >
                      <div className="flex items-start gap-3">
                        <div className="w-2 h-2 bg-[#2441B6] rounded-full mt-3 flex-shrink-0"></div>
                        <div className="flex-1">
                          <p className="text-lg font-medium text-gray-800 hover:text-[#2441B6] transition-colors duration-200">
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
        <section className="px-4 sm:px-6 md:px-10 lg:pl-2 lg:pr-16 py-8 md:py-12">
          <div className="w-full grid grid-cols-1 lg:grid-cols-[1.15fr_0.85fr] container mx-auto gap-8 lg:gap-10 items-center">
            <div className="flex w-full items-center justify-start lg:-ml-2">
              <div className="flex w-full items-center justify-start lg:-ml-2">
  <div className="relative w-full overflow-hidden rounded-2xl shadow-xl aspect-video">
    <iframe
      className="absolute top-0 left-0 w-full h-full"
      src="https://www.youtube.com/embed/jxPHXwp-Bgw"
      title="Continuing Education Centre, IIT Roorkee"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
      allowFullScreen
    ></iframe>
  </div>
</div>
            </div>
            <div className="text-center lg:text-left flex flex-col justify-center">
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
                    <p className="text-sm text-gray-500">In last 5 years</p>
                  </div>
                </div>
                <div className="flex items-center gap-x-3 justify-center">
                  <Users className="w-8 h-8 md:w-10 md:h-10" />
                  <div className="flex flex-col items-start">
                    <p className="text-xl md:text-2xl font-semibold">10000+</p>
                    <p className="text-lg md:text-xl font-normal">Participants</p>
                    <p className="text-sm text-gray-500">In last 5 years</p>
                  </div>
                </div>
                <div className="flex items-center gap-x-3 justify-center">
                  <Handshake className="w-8 h-8 md:w-10 md:h-10" />
                  <div className="flex flex-col items-start">
                    <p className="text-xl md:text-2xl font-semibold">150+</p>
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
                          defaultBg: "#2441B6",
                        defaultHoverBg: "#2441B6",
                        defaultColor: "#FFFFFF",
                        defaultHoverColor: "#FFFFFF",
                          fontWeight: 600,
                        },
                      },
                    }}
                  >
                    <Button
                      type="default"
                      className="border-none w-full py-4 px-8 text-white text-base md:text-lg tracking-wide"
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
                          defaultColor: "#2441B6",
                          defaultBorderColor: "#2441B6",
                          defaultHoverBg: "#FFFFFF",
                          defaultHoverColor: "#2441B6",
                          defaultHoverBorderColor: "#2441B6",
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

        {/* Messages from Director & Coordinator */}
        <section className="bg-gray-50 py-16 md:py-20">
          <div className="container mx-auto px-4 sm:px-6">
            <div className="mb-10 text-center md:mb-12">
              <h2 className="text-2xl font-semibold text-gray-900 md:text-3xl">
                Leadership Messages
              </h2>
              <p className="mt-2 text-base text-gray-500 md:text-lg">
                Insights from our Director and Continuing Education Coordinator
              </p>
            </div>
            <div className="grid grid-cols-1 items-stretch gap-8 lg:grid-cols-2 lg:gap-10">
              {leadershipProfiles.map((profile, index) => (
                <LeadershipMessageCard
                  key={profile.title}
                  title={profile.title}
                  name={profile.name}
                  role={profile.role}
                  institute={profile.institute}
                  image={profile.image}
                  imageAlt={profile.imageAlt}
                  message={profile.message}
                  index={index}
                />
              ))}
            </div>
          </div>
        </section>

        {/* Courses Section */}
        <section id="explore-courses" className="px-4 sm:px-8 md:px-16 py-8 md:py-12">
          <div className="flex flex-col md:flex-row justify-between md:items-start mb-8 container mx-auto gap-6">
            <div className="mb-4 md:mb-0">
              <h1 className="text-3xl md:text-4xl font-semibold mb-2">
                Explore Our Courses
              </h1>
              <p className="text-lg md:text-xl font-normal text-gray-500">
                Find the right course to advance your education and career
                goals.
              </p>
              <div
                className="mt-5 inline-flex items-center rounded-full bg-white p-1 border border-gray-200 shadow-sm"
                role="tablist"
                aria-label="Course availability"
              >
                <button
                  type="button"
                  role="tab"
                  aria-selected={courseViewTab === "ongoing"}
                  onClick={() => setCourseViewTab("ongoing")}
                  className={`inline-flex items-center gap-1.5 rounded-full px-4 py-1.5 text-sm md:text-base font-medium transition-all duration-200 ${
                    courseViewTab === "ongoing"
                      ? "bg-[#2441B6] text-white shadow-sm"
                      : "text-gray-600 hover:text-[#2441B6] hover:bg-[#E2F1FF]/50"
                  }`}
                >
                  <GraduationCap className="h-4 w-4 shrink-0" />
                  Ongoing
                </button>
                <button
                  type="button"
                  role="tab"
                  aria-selected={courseViewTab === "upcoming"}
                  onClick={() => setCourseViewTab("upcoming")}
                  className={`inline-flex items-center gap-1.5 rounded-full px-4 py-1.5 text-sm md:text-base font-medium transition-all duration-200 ${
                    courseViewTab === "upcoming"
                      ? "bg-[#2441B6] text-white shadow-sm"
                      : "text-gray-600 hover:text-[#2441B6] hover:bg-[#E2F1FF]/50"
                  }`}
                >
                  <CalendarClock className="h-4 w-4 shrink-0" />
                  Upcoming
                </button>
              </div>
            </div>
            {courseViewTab === "ongoing" && (
              <Input
                placeholder="Search Courses"
                prefix={<SearchOutlined />}
                className="w-full md:w-1/3 lg:w-1/4 md:mt-1"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                allowClear
              />
            )}
          </div>

          <div className="container mx-auto space-y-6">
          {courseViewTab === "ongoing" && (
            <>
          {/* Search and Categories */}
          <div className="flex flex-wrap items-center justify-start gap-3 md:gap-x-6">
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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" style={{ gridAutoRows: '1fr' }}>
            {filteredCourses.length > 0 ? (
              <>
                {searchTerm && (
                  <div className="col-span-full mb-4">
                    <p className="text-gray-600">
                      Found {filteredCourses.length} course{filteredCourses.length !== 1 ? 's' : ''} for "{searchTerm}"
                    </p>
                  </div>
                )}
                {filteredCourses.map(renderCourseCard)}
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
                      className="text-[#2441B6] hover:text-[#2441B6] font-medium"
                    >
                      Clear search
                    </button>
                  )}
                </div>
              </div>
            )}
          </div>
            </>
          )}

          {courseViewTab === "upcoming" && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {upcomingEvents.map((event) => (
                <article
                  key={event.title}
                  className="group flex flex-col overflow-hidden rounded-2xl border border-[#d6e4f5] bg-gradient-to-b from-[#F5F9FF] to-white transition-all duration-300 hover:-translate-y-1 hover:border-[#2441B6]/40 hover:shadow-xl"
                >
                  <div className="h-1.5 w-full bg-[#2441B6]" />
                  <div className="flex flex-1 flex-col p-6">
                    <div className="mb-4 flex items-center justify-between gap-3">
                      <span className="rounded-md border border-[#2441B6]/30 bg-white px-2.5 py-1 text-xs font-semibold uppercase tracking-wide text-[#2441B6]">
                        {event.badge}
                      </span>
                      <span className="inline-flex items-center gap-1.5 text-sm text-gray-500">
                        <CalendarClock className="h-4 w-4 shrink-0 text-[#2441B6]" />
                        {event.duration}
                      </span>
                    </div>

                    <p className="mb-2 text-sm font-medium text-[#2441B6]">
                      {event.partner}
                    </p>
                    <h3 className="mb-3 text-lg font-semibold leading-snug text-[#102a43] md:text-xl">
                      {event.title}
                    </h3>
                    <p className="mb-6 flex-1 text-sm leading-relaxed text-gray-600 md:text-base">
                      {event.description}
                    </p>

                    <a
                      href={event.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-auto inline-flex w-full items-center justify-center rounded-lg bg-[#2441B6] px-4 py-2.5 text-sm font-semibold text-white transition-colors duration-200 hover:bg-[#1c3494]"
                    >
                      {event.ctaLabel.replace(" →", "")}
                    </a>
                  </div>
                </article>
              ))}
            </div>
          )}
          </div>

          {/* Sponsors Section */}
          <div className="mt-12">
            <h2 className="text-2xl md:text-3xl font-semibold mb-4 text-center border-b-4 max-w-max mx-auto pb-2 border-b-[#2441B6] tracking-wide">
              Sponsors & EdTech Partners
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
                  alt="Teamlease"
                  preview={false}
                  src="https://d1bm918zlnq37v.cloudfront.net/CECTemp/teamlease.png"
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
                <Image
                  height="40px"
                  className="object-contain mx-6 md:mx-8"
                  alt="eAsia Academy"
                  preview={false}
                  src="https://d1bm918zlnq37v.cloudfront.net/CECTemp/easia.png"
                  style={{ flexShrink: 0 }}
                />
                <Image
                  height="40px"
                  width="auto"
                  className="object-contain mx-6 md:mx-8"
                  alt="Physics Wallah"
                  preview={false}
                  src="https://d1bm918zlnq37v.cloudfront.net/CECTemp/Physics_wallah.png"
                  style={{ flexShrink: 0, maxWidth: "120px", maxHeight: "40px" }}
                />
                <Image
                  height="40px"
                  className="object-contain mx-6 md:mx-8"
                  alt="Scaler"
                  preview={false}
                  src="https://d1bm918zlnq37v.cloudfront.net/CECTemp/Scaler_Logo.png"
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
                <Image
                  height="40px"
                  className="object-contain mx-6 md:mx-8"
                  alt="ISRO"
                  preview={false}
                  src="https://d1bm918zlnq37v.cloudfront.net/CECTemp/NationalSponser/isro.png"
                  style={{ flexShrink: 0 }}
                />
                <Image
                  height="40px"
                  className="object-contain mx-6 md:mx-8"
                  alt="Odisha Sashan"
                  preview={false}
                  src="https://d1bm918zlnq37v.cloudfront.net/CECTemp/NationalSponser/odisha.png"
                  style={{ flexShrink: 0 }}
                />
                <Image
                  height="40px"
                  className="object-contain mx-6 md:mx-8"
                  alt="Indian Army"
                  preview={false}
                  src="https://d1bm918zlnq37v.cloudfront.net/CECTemp/NationalSponser/army.png"
                  style={{ flexShrink: 0 }}
                />
                <Image
                  height="40px"
                  className="object-contain mx-6 md:mx-8"
                  alt="MoRTH"
                  preview={false}
                  src="https://d1bm918zlnq37v.cloudfront.net/CECTemp/NationalSponser/morth.png"
                  style={{ flexShrink: 0 }}
                />
                <Image
                  height="40px"
                  className="object-contain mx-6 md:mx-8"
                  alt="Larsen & Toubro"
                  preview={false}
                  src="https://d1bm918zlnq37v.cloudfront.net/CECTemp/NationalSponser/LT.jpg"
                  style={{ flexShrink: 0 }}
                />
                <Image
                  height="40px"
                  className="object-contain mx-6 md:mx-8"
                  alt="Flipkart"
                  preview={false}
                  src="https://d1bm918zlnq37v.cloudfront.net/CECTemp/NationalSponser/flipkart.png"
                  style={{ flexShrink: 0 }}
                />
                <Image
                  height="40px"
                  className="object-contain mx-6 md:mx-8"
                  alt="Navodaya Vidhyala"
                  preview={false}
                  src="https://d1bm918zlnq37v.cloudfront.net/CECTemp/NationalSponser/navodaya.png"
                  style={{ flexShrink: 0 }}
                />
                <Image
                  height="40px"
                  className="object-contain mx-6 md:mx-8"
                  alt="Bihar Board"
                  preview={false}
                  src="https://d1bm918zlnq37v.cloudfront.net/CECTemp/NationalSponser/bihar.png"
                  style={{ flexShrink: 0 }}
                />
                <Image
                  height="40px"
                  className="object-contain mx-6 md:mx-8"
                  alt="PCBL"
                  preview={false}
                  src="https://d1bm918zlnq37v.cloudfront.net/CECTemp/NationalSponser/pcbl.png"
                  style={{ flexShrink: 0 }}
                />
                <Image
                  height="40px"
                  className="object-contain mx-6 md:mx-8"
                  alt="Maruti Suzuki"
                  preview={false}
                  src="https://d1bm918zlnq37v.cloudfront.net/CECTemp/NationalSponser/suzuki.png"
                  style={{ flexShrink: 0 }}
                />
                <Image
                  height="40px"
                  className="object-contain mx-6 md:mx-8"
                  alt="Deloitte"
                  preview={false}
                  src="https://d1bm918zlnq37v.cloudfront.net/CECTemp/NationalSponser/deloitte.png"
                  style={{ flexShrink: 0 }}
                />
                <Image
                  height="40px"
                  className="object-contain mx-6 md:mx-8"
                  alt="Namami Gange"
                  preview={false}
                  src="https://d1bm918zlnq37v.cloudfront.net/CECTemp/NationalSponser/namami.jpg"
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
                className="inline-flex items-center gap-2 text-[#2441B6] hover:text-[#2441B6] font-medium transition-colors duration-200"
              >
                View All
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          </div>
        </section>

        {/* Our Team Section */}
        <section className="py-12 md:py-16 bg-[#FFFAF1]">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-center text-3xl md:text-4xl font-semibold text-[#102a43] mb-10 md:mb-12">
              Our Team
            </h2>
            <TeamMemberGrid members={TEAM_MEMBERS} />
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
              {upcomingEvents.map((event) => (
                <div
                  key={event.title}
                  className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-300 flex flex-col"
                >
                  <div className="flex items-center justify-between mb-4">
                    <span
                      className={`${event.badgeClass} px-3 py-1 rounded-full text-sm font-medium`}
                    >
                      {event.badge}
                    </span>
                    <span className="text-gray-500 text-sm">{event.duration}</span>
                  </div>
                  <h3 className="text-xl font-semibold mb-2 text-[#102a43]">
                    {event.title}
                  </h3>
                  <p className="text-gray-600 mb-4 flex-1">{event.description}</p>
                  <div className="flex items-center justify-between mt-auto">
                    <span className="text-[#2441B6] font-medium">{event.partner}</span>
                    <a
                      href={event.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:text-blue-800 font-medium"
                    >
                      {event.ctaLabel}
                    </a>
                  </div>
                </div>
              ))}
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
                  className="bg-[#2441B6] text-white px-6 py-3 rounded-lg font-medium hover:bg-[#2441B6] transition-colors duration-200"
                >
                  Download Brochure
                </a>
                <a
                  href="#explore-courses"
                  className="border-2 border-[#2441B6] text-[#2441B6] px-6 py-3 rounded-lg font-medium hover:bg-[#2441B6] hover:text-white transition-colors duration-200"
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
                      href={newsData[0].link} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="text-lg md:text-xl font-semibold text-[#102a43] hover:text-[#2441B6] transition-colors duration-200 block mb-3"
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
                          className="text-base md:text-lg font-semibold text-[#102a43] hover:text-[#2441B6] transition-colors duration-200 block mb-2"
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
          className="fixed bottom-8 right-8 bg-[#2441B6] text-white p-3 rounded-full shadow-lg hover:bg-[#2441B6] transition-all duration-300 z-50"
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
