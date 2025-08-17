"use client";
// components/Footer.tsx
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Image } from "antd";

export const Footer: React.FC = () => {
  const [year, setYear] = useState<number | null>(null);

  useEffect(() => {
    setYear(new Date().getFullYear());
  }, []);

  return (
    <footer className="bg-[#102a43] text-white py-8 px-4 sm:px-6 w-full font-inter">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {/* Left Section */}
        <div className="lg:col-span-1">
          <div className="relative flex items-center">
            <Image
              preview={false}
              src="/IITR_logo.png"
              width="96px"
              height="96px"
              className=""
              alt="IITR Logo"
            />
            <div className="border-l pl-2 text-white tracking-wide">
              <span className="text-xl">IIT ROORKEE</span>
              <p className="text-2xl font-medium">Continuing Education</p>
              <p className="text-2xl font-medium">Center</p>
            </div>
          </div>
          <address className="mt-4 not-italic font-medium text-base space-y-2">
            <p>
              Address:{" "}
              <span className="font-normal">
                Continuing Education Centre,<br />
                IIT Roorkee
              </span>
            </p>
            <p>
              Phone: <span>+91-9087654321</span>
            </p>
            <p>
              Email:{" "}
              <Link
                href="mailto:contactcec@iitr.com"
                className="hover:text-[#FFAE0E] hover:underline font-normal"
              >
                contactcec@iitr.com
              </Link>
            </p>
          </address>
          <div className="flex space-x-4 mt-4">
            <Link
              href="https://x.com/iitroorkee"
              aria-label="Twitter"
              className="w-8 h-8 flex items-center justify-center transition-all duration-200 hover:scale-110"
              target="_blank"
              rel="noopener noreferrer"
            >
              <svg className="w-5 h-5 fill-current text-white hover:text-[#FFAE0E] transition-colors duration-200" viewBox="0 0 16 16">
                <path d="M12.8 1.5h2.2l-5.1 5.8 6.1 7.7h-2.2l-3.7-4.8L3.5 15H1.3l5.5-6.2L1.3 1.5h3.9l3.3 4.4zm-0.9 12.2h1.2L5.1 2.9H3.9z"/>
              </svg>
            </Link>
            <Link
              href="https://www.facebook.com/profile.php?id=100082831977496#"
              aria-label="Facebook"
              className="w-8 h-8 flex items-center justify-center transition-all duration-200 hover:scale-110"
              target="_blank"
              rel="noopener noreferrer"
            >
              <svg className="w-5 h-5 fill-current text-white hover:text-[#FFAE0E] transition-colors duration-200" viewBox="0 0 16 16">
                <path d="M15.5 8c0-4.1-3.4-7.5-7.5-7.5S0.5 3.9 0.5 8c0 3.9 2.9 7.1 6.6 7.7v-5.5h-2V8h2V6.2c0-2.1 1.3-3.2 3.1-3.2 0.9 0 1.8 0.2 1.8 0.2v2h-1.1c-1.1 0-1.4 0.7-1.4 1.4V8h2.3l-0.4 2.3h-1.9v5.5C12.6 15.1 15.5 11.9 15.5 8z"/>
              </svg>
            </Link>
            <Link
              href="https://www.linkedin.com/company/ceciitr/"
              aria-label="LinkedIn"
              className="w-8 h-8 flex items-center justify-center transition-all duration-200 hover:scale-110"
              target="_blank"
              rel="noopener noreferrer"
            >
              <svg className="w-5 h-5 fill-current text-white hover:text-[#FFAE0E] transition-colors duration-200" viewBox="0 0 16 16">
                <path d="M13.6 13.6h-2.4v-3.7c0-0.9-0.02-2-1.2-2-1.2 0-1.4 1-1.4 2v3.7H6.2V6.7h2.3v1h0.03c0.3-0.6 1.1-1.2 2.2-1.2 2.4 0 2.8 1.6 2.8 3.6v3.5zM3.6 5c-0.8 0-1.4-0.6-1.4-1.4 0-0.8 0.6-1.4 1.4-1.4s1.4 0.6 1.4 1.4c0 0.8-0.6 1.4-1.4 1.4zm1.2 8.7H2.4V6.7h2.4v7zM14.8 0H1.2C0.5 0 0 0.5 0 1.2v13.7C0 15.5 0.5 16 1.2 16h13.6C15.5 16 16 15.5 16 14.8V1.2C16 0.5 15.5 0 14.8 0z"/>
              </svg>
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-8 tracking-wider font-medium lg:col-span-2">
          {/* Administration Section */}
          <div>
            <h4 className="text-xl mb-3">Administration</h4>
            <ul className="text-base space-y-2 tracking-wide">
              {[
                { name: "IITR Home", href: "https://www.iitr.ac.in/", target: "_blank" },
                { name: "E Learning Center", href: "https://www.iitr.ac.in/elc/", target: "_blank" },
                { name: "PG Admission", href: "#" },
                { name: "PhD Admissions", href: "#" },
                { name: "Webmail", href: "https://newwebmail.iitr.ac.in/?session=f9d8c490c90d969687b99fed91ea214a70efdf2ec9b086079795c442636b55fb46b2d4e450e72ddc9433083f15c23a4a70efdf2ec9b086079795c442636b55fb", target: "_blank" },
                { name: "TOH (Trainee Officer Hostel)", href: "/trainee-officer-hostel" },
              ].map((link, index) => (
                <li key={index}>
                  <Link
                    href={link.href}
                    target={link.target || undefined}
                    rel={link.target ? "noopener noreferrer" : undefined}
                    className="transition-all duration-200 ease-in-out hover:text-[#FFAE0E] active:scale-95"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Departments Section */}
          <div>
            <h4 className="text-xl mb-3">Departments</h4>
            <ul className="text-base space-y-2 tracking-tight">
              {[
                { name: "DOSW", href: "https://www.iitr.ac.in/dosw/", target: "_blank" },
                { name: "SRIC", href: "https://www.iitr.ac.in/sric/", target: "_blank" },
                { name: "DADAM", href: "/not-found", target: "_blank" },
                { name: "ADAA", href: "/not-found", target: "_blank" },
                { name: "Telephone Directory", href: "/not-found", target: "_blank" },
              ].map((link, index) => (
                <li key={index}>
                  <Link
                    href={link.href}
                    target={link.target || undefined}
                    rel={link.target ? "noopener noreferrer" : undefined}
                    className="transition-all duration-200 ease-in-out hover:text-[#FFAE0E] active:scale-95"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Supporting Units Section */}
          <div>
            <h4 className="text-xl mb-3">Supporting Units</h4>
            <ul className="text-base space-y-2 tracking-tight">
              {[
                { name: "NPTEL", href: "https://onlinecourses.nptel.ac.in/", target: "_blank" },
                { name: "GIAN", href: "https://gian.iitkgp.ac.in/", target: "_blank" },
                { name: "AICTE", href: "https://www.aicte-india.org/", target: "_blank" },
                { name: "TEQIP", href: "https://teqip.in/", target: "_blank" },
                { name: "QIP Principal Coordinator", href: "https://www.iitg.ac.in/cet/qip.html", target: "_blank" },
              ].map((link, index) => (
                <li key={index}>
                  <Link
                    href={link.href}
                    target={link.target || undefined}
                    rel={link.target ? "noopener noreferrer" : undefined}
                    className="transition-all duration-200 ease-in-out hover:text-[#FFAE0E] active:scale-95"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
      {/* Bottom Section */}
      <div className="text-center mt-8 border-t border-gray-600 pt-4 text-sm px-4">
        © {year ? year : ""} All Rights Reserved, IIT Roorkee
      </div>
    </footer>
  );
};
