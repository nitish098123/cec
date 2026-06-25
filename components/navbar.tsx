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
        {
          title: "Current Courses",
          href: "/#explore-courses",
        },
        {
          title: "Past Courses",
          submenu: [
            { title: "2025-26", href: "/past-courses/2025-26" },
            { title: "2024-25", href: "/past-courses/2024-25" },
            { title: "2023-24", href: "/past-courses/2023-24" },
            { title: "2022-23", href: "/past-courses/2022-23" },
            { title: "2021-22", href: "/past-courses/2021-22" },
            { title: "2020-21", href: "/course-2020-21" },
            { title: "2019-20", href: "/course-2019-20" },
            { title: "2018-19", href: "/course-2018-19" },
            { title: "2017-18", href: "/course-2017-18" },
            { title: "2016-17", href: "/course-2016-17" },
            { title: "2015-16", href: "/course-2015-16" },
            { title: "2014-15", href: "/course-2014-15" },
          ],
        },
      ],
    },
    {
      label: "Sponsors",
      href: "/sponsors",
      submenu: [
        { title: "International Sponsors", href: "/sponsors?category=International Sponsors" },
        { title: "National Sponsors", href: "/sponsors?category=National Sponsors" },
        { title: "Ed-Tech Partners", href: "/sponsors?category=Ed-Tech Partners" },
      ],
    },
    {
      label: "QIP",
      href: "/qip",
      target: "_blank",
      submenu: [
        { title: "About", href: "/qip", target: "_blank" },
        { title: "Current Courses", href: "https://qippg.aicte.gov.in/", target: "_blank" },
        { title: "NQCC Members", href: "/qip/nqcc-members" },
      ],
    },
    {
      label: "People",
      href: "/staff",
      submenu: [
        { title: "Coordinator", href: "/staff?tab=coordinator" },
        { title: "CEC Staff", href: "/staff?tab=staff" },
      ],
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
      label: "Apply Forms",
      href: "/forms",
      submenu: [
        { title: "CEC new forms", href: "/forms" },
        { title: "CEC old forms", href: "/old-forms" },
        { title: "Other forms", href: "/forms/other-forms" },
      ],
    },
    {
      label: "Certificate",
      href: "/certificate",
      submenu: [
        { title: "Download Certificate", href: "/certificate" },
        {
          title: "Sample Certificate",
          href: "https://d1bm918zlnq37v.cloudfront.net/CECTemp/sample_cert (1).pdf",
          target: "_blank",
        },
      ],
    },
    { label: "Gallery", href: "/gallery", submenu: [] },
  ];

  return (
    <nav className="sticky top-0 z-50 w-full bg-[#2441B6] py-2 text-white font-inter shadow-sm">
      <div className="flex items-center pl-4 sm:pl-6 lg:pl-8">
        {/* Logo */}
        <Link href="/" className="relative flex shrink-0 items-center gap-2 sm:gap-3 z-10">
          <Image
            preview={false}
            src="/IITR_logo.png"
            width="56px"
            height="56px"
            className="!w-12 !h-12 sm:!w-14 sm:!h-14"
            alt="IITR Logo"
          />
          <span className="font-bold text-lg sm:text-xl md:text-2xl text-white whitespace-nowrap">
            CEC IITR
          </span>
        </Link>
      </div>

      {/* Desktop Navigation Links */}
      <div className="hidden md:flex absolute right-3 sm:right-5 lg:right-8 xl:right-10 top-1/2 -translate-y-1/2 items-center gap-x-5 lg:gap-x-7 xl:gap-x-9">
          {navLinks.map((item) => (
            <div key={item.label} className="relative group">
              <Link
                href={item.href}
                className={`py-1.5 text-sm lg:text-[15px] text-white transition-colors duration-200 whitespace-nowrap ${
                  isActive(item.label.toLowerCase())
                    ? "font-semibold underline underline-offset-4"
                    : "hover:text-white/80"
                }`}
                target={item.target || undefined}
              >
                {item.label}
              </Link>
              {item.submenu.length > 0 && (
                <div className="absolute left-0 top-full w-48 bg-[#1f2937] text-white shadow-lg rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 invisible group-hover:visible z-50">
                  <div className="absolute h-2 w-full -top-2 bg-transparent"></div>
                  {item.submenu.map((subItem) =>
                    'submenu' in subItem && Array.isArray(subItem.submenu) ? (
                      <div key={subItem.title} className="relative group/submenu">
                        <span className="block px-4 py-2 hover:bg-[#374151] uppercase cursor-pointer text-sm flex justify-between items-center">
                          {subItem.title}
                          <svg className="w-3 h-3 ml-2" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" /></svg>
                        </span>
                        <div className="absolute left-full top-0 w-48 bg-[#1f2937] text-white shadow-lg rounded-lg opacity-0 group-hover/submenu:opacity-100 transition-opacity duration-200 invisible group-hover/submenu:visible z-50">
                          <div className="absolute h-2 w-full -top-2 bg-transparent"></div>
                          {subItem.submenu.map((yearItem: any) => (
                            typeof yearItem.href === 'string' ? (
                              <Link
                                key={yearItem.title}
                                href={yearItem.href}
                                {...('target' in yearItem ? { target: yearItem.target } : {})}
                                className="block px-4 py-2 hover:bg-[#374151] uppercase cursor-pointer text-sm"
                              >
                                {yearItem.title}
                              </Link>
                            ) : null
                          ))}
                        </div>
                      </div>
                    ) : (
                      typeof subItem.href === 'string' ? (
                        <Link
                          key={subItem.title}
                          href={subItem.href}
                          {...('target' in subItem ? { target: subItem.target } : {})}
                          className="block px-4 py-2 hover:bg-[#374151] uppercase cursor-pointer text-sm"
                        >
                          {subItem.title}
                        </Link>
                      ) : null
                    )
                  )}
                </div>
              )}
            </div>
          ))}
        </div>

      {/* Mobile Menu Button */}
      <div className="md:hidden absolute right-3 sm:right-5 top-1/2 -translate-y-1/2">
          <button
            type="button"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="text-white"
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          >
            {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-[#1f2937] text-white mt-2 py-4">
          {navLinks.map((item) => (
            <div key={item.label} className="px-4 py-2">
              <Link
                href={item.href}
                className={`block text-white ${
                  isActive(item.label.toLowerCase())
                    ? "font-semibold underline underline-offset-4"
                    : "hover:text-white/80"
                }`}
                target={item.target || undefined}
              >
                {item.label}
              </Link>
              {item.submenu.length > 0 && (
                <div className="pl-4 mt-2">
                  {item.submenu.map((subItem) =>
                    'submenu' in subItem && Array.isArray(subItem.submenu) ? (
                      <div key={subItem.title}>
                        <span className="block py-1 text-sm text-gray-300 hover:text-white cursor-pointer flex justify-between items-center">
                          {subItem.title}
                          <svg className="w-3 h-3 ml-2" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" /></svg>
                        </span>
                        <div className="pl-4 mt-2">
                          {subItem.submenu.map((yearItem: any) => (
                            typeof yearItem.href === 'string' ? (
                              <Link
                                key={yearItem.title}
                                href={yearItem.href}
                                {...('target' in yearItem ? { target: yearItem.target } : {})}
                                className="block py-1 text-sm text-gray-300 hover:text-white"
                              >
                                {yearItem.title}
                              </Link>
                            ) : null
                          ))}
                        </div>
                      </div>
                    ) : (
                      typeof subItem.href === 'string' ? (
                        <Link
                          key={subItem.title}
                          href={subItem.href}
                          {...('target' in subItem ? { target: subItem.target } : {})}
                          className="block py-1 text-sm text-gray-300 hover:text-white"
                        >
                          {subItem.title}
                        </Link>
                      ) : null
                    )
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </nav>
  );
};
