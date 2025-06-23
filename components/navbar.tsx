"use client";

import React, { useEffect, useState } from "react";
import { Image } from "antd";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";

export const Navbar: React.FC = () => {
  const pathname = usePathname();
  const [activePage, setActivePage] = useState<string>("home");
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    // Set the active page based on the current route
    const currentPage = pathname === "/" ? "home" : pathname.slice(1);
    setActivePage(currentPage);
    if (typeof window !== "undefined") {
      localStorage.setItem("activePage", currentPage);
    }
    // Close mobile menu on page change
    setIsMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    // Retrieve the active page from local storage on mount (client only)
    if (typeof window !== "undefined") {
      const storedPage = localStorage.getItem("activePage");
      if (storedPage) {
        setActivePage(storedPage);
      }
    }
  }, []);

  const isActive = (page: string) => activePage === page;

  const navLinks = [
    {
      label: "Home",
      href: "/",
      submenu: [
        { title: "Home", href: "/" },
        { title: "About CEC", href: "/about-us" },
        { title: "CEC Brochure", href: "https://d1bm918zlnq37v.cloudfront.net/CECTemp/CEC-brochure.pdf", target: "_blank" },
        { title: "Amenities", href: "/trainee-officer-hostel" },
        { title: "IITR Home", href: "https://iitr.ac.in/", target: "_blank" },
      ],
    },
    {
      label: "Courses",
      href: "",
      submenu: [
        { title: "2024-25", href: "https://d1bm918zlnq37v.cloudfront.net/CECTemp/2024-25.pdf", target: "_blank" },
        { title: "2023-24", href: "https://d1bm918zlnq37v.cloudfront.net/CECTemp/STC-CEC-2023-24.pdf", target: "_blank" },
        { title: "2022-23", href: "https://d1bm918zlnq37v.cloudfront.net/CECTemp/List_of_courses-2022-23.pdf", target: "_blank" },
        { title: "2021-22", href: "https://d1bm918zlnq37v.cloudfront.net/CECTemp/Courses_2021-22.pdf", target: "_blank" },
        { title: "2020-21", href: "/course-2020-21" },
        { title: "2019-20", href: "/course-2019-20" },
        { title: "2018-19", href: "/course-2018-19" },
        { title: "2017-18", href: "/course-2017-18" },
        { title: "2016-17", href: "/course-2016-17" },
        { title: "2015-16", href: "/course-2015-16" },
        { title: "2014-15", href: "/course-2014-15" },
        { title: "2013-14", href: "/course-2013-14" },
      ],
    },
    {
      label: "Sponsors",
      href: "/sponsors",
      submenu: [
        { title: "International Sponsors", href: "/sponsors?section=international" },
        { title: "National Sponsors", href: "/sponsors?section=national" },
        { title: "Ed-tech sponsers", href: "/sponsors?section=edtech" },
      ],
    },
    {
      label: "QIP",
      href: "",
      submenu: [
        { title: "About", href: "/" },
        {
          title: "Selected Candidates (Sponsored)",
          href: "/",
        },
        {
          title: "Selected Candidates (Self-Financed)",
          href: "/",
        },
        { title: "NQCC Members", href: "/" },
      ],
    },
    { label: "TOH", href: "/trainee-officer-hostel", submenu: [] },
    {
      label: "People",
      href: "/staff",
      submenu: [{ title: "CEC Staff", href: "/staff" }],
    },
    {
      label: "Newsletter",
      href: "https://d1bm918zlnq37v.cloudfront.net/CECTemp/CEC-IITR_Newsletter_V1.pdf",
      target: "_blank",
      submenu: [
        {
          title: "Volume 1",
          href: "https://d1bm918zlnq37v.cloudfront.net/CECTemp/CEC-IITR_Newsletter_V1.pdf",
          target: "_blank",
        },
        {
          title: "Volume 2",
          href: "https://d1bm918zlnq37v.cloudfront.net/CECTemp/CEC-IITR_Newsletter_V2.pdf",
          target: "_blank",
        },
        {
          title: "Volume 3",
          href: "https://d1bm918zlnq37v.cloudfront.net/CECTemp/CEC-IITR_Newsletter_V3.pdf",
          target: "_blank",
        },
      ],
    },
    {
      label: "Download",
      href: "/forms",
      submenu: [
        { title: "CEC new forms", href: "/forms" },
        { title: "CEC old forms", href: "/old-forms" },
        {
          title: "Sample Certificate",
          href: "https://d1bm918zlnq37v.cloudfront.net/CECTemp/sample_cert (1).pdf",
          target: "_blank",
        },
        { title: "Calendar", href: "/" },
      ],
    },
    { label: "Certificate", href: "/certificate", submenu: [] },
    { label: "Gallery", href: "/gallery", submenu: [] },
  ];

  return (
    <nav className="text-white py-3 px-4 sm:px-6 w-full absolute top-0 left-0 z-50 font-inter">
      <div className="container mx-auto flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="relative flex items-center space-x-2 z-10">
          <Image
            preview={false}
            src="/IITR_logo.png"
            width="60px"
            height="60px"
            className=""
            alt="IITR Logo"
          />
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <span className="font-bold text-xs text-white">
              Quality Improvement
            </span>
            <span className="font-bold text-xs text-white">
              & Continuing Education Center
            </span>
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <div className="hidden md:flex items-center space-x-6 relative">
          {navLinks.map((item) => (
            <div key={item.label} className="relative group">
              <Link
                href={item.href}
                className={`hover:text-gray-300 py-2 ${
                  isActive(item.label.toLowerCase())
                    ? "text-[#ffa500]"
                    : "text-white"
                }`}
                target={item.target || undefined}
              >
                {item.label}
              </Link>
              {item.submenu.length > 0 && (
                <div className="absolute left-0 top-full w-48 bg-[#1f2937] text-white shadow-lg rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 invisible group-hover:visible z-50">
                  <div className="absolute h-2 w-full -top-2 bg-transparent"></div>
                  {item.submenu.map((subItem) => (
                    <Link
                      key={subItem.title}
                      href={subItem.href}
                      target={subItem.target || undefined}
                      className="block px-4 py-2 hover:bg-[#374151] uppercase cursor-pointer text-sm"
                    >
                      {subItem.title}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-[#1f2937] text-white mt-2 py-4">
          {navLinks.map((item) => (
            <div key={item.label} className="px-4 py-2">
              <Link
                href={item.href}
                className={`block ${
                  isActive(item.label.toLowerCase()) ? "text-[#ffa500]" : ""
                }`}
                target={item.target || undefined}
              >
                {item.label}
              </Link>
              {item.submenu.length > 0 && (
                <div className="pl-4 mt-2">
                  {item.submenu.map((subItem) => (
                    <Link
                      key={subItem.title}
                      href={subItem.href}
                      target={subItem.target || undefined}
                      className="block py-1 text-sm text-gray-300 hover:text-white"
                    >
                      {subItem.title}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </nav>
  );
};
