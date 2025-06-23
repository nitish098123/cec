"use client";

import { Image } from "antd";
import {
  GraduationCap,
  School,
  Utensils,
  ArrowDownUp,
  Wifi,
  Droplet,
  Coffee,
  Tv,
  WashingMachine,
  CupSoda,
  MonitorCog,
  Snowflake,
  Footprints,
  Hotel,
  MailOpen,
  Phone,
} from "lucide-react";

const facilities = [
  { icon: <ArrowDownUp className="mr-2" />, title: "Lift Service" }, // Used Move as a representation for Elevator
  { icon: <Wifi className="mr-2" />, title: "Wi-Fi in hostel" },
  { icon: <CupSoda className="mr-2" />, title: "Refreshments" },
  { icon: <Droplet className="mr-2" />, title: "Aqua guard" },
  { icon: <Coffee className="mr-2" />, title: "In-room beverage" },
  { icon: <Snowflake className="mr-2" />, title: "AC Dining Hall" },
  { icon: <Tv className="mr-2" />, title: "TV with DTH" },
  { icon: <MonitorCog className="mr-2" />, title: "Cyber Cafe" },
  { icon: <WashingMachine className="mr-2" />, title: "Laundry Service" }, // Circular arrows for "refreshing" clothes
  { icon: <Footprints className="mr-2" />, title: "Shoe Shine Machine" }, // Layers as a metaphor for shoe polishing
];

export default function CertificatePage() {
  return (
    <div className="w-full font-inter">
      <section className="relative w-full h-[50vh] md:h-[60vh] flex items-center justify-center">
        {/* Background Image */}
        <div
          className="absolute inset-0 bg-[url('/TOH_background.jpeg')] bg-cover bg-center brightness-[0.7]"
          aria-hidden="true"
        ></div>
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent z-10"></div>

        {/* Content */}
        <div className="relative flex items-center z-20 px-4">
          <Image
            preview={false}
            src="/IITR_logo.png"
            className="w-24 h-24 md:w-40 md:h-40"
            alt="IITR Logo"
          />
          <div className="border-l pl-2 md:pl-4 text-white">
            <span className="text-xl md:text-2xl">IIT ROORKEE</span>
            <p className="text-2xl md:text-4xl">Trainee</p>
            <p className="text-2xl md:text-4xl">Officer&apos;s Hostel</p>
          </div>
        </div>
      </section>
      <section className="py-8 md:py-16 space-y-12 md:space-y-16">
        {/* Header Section */}
        <section className="px-4 sm:px-8 md:px-16">
          <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-8 container mx-auto">
            <div className="flex items-center justify-center">
              <div className="bg-[#E2F1FF] p-4 max-w-sm -rotate-2 space-y-1">
                <Image
                  preview={false}
                  src="/TOH-1.png"
                  alt="Trainee Officer's Hostel"
                  className="object-cover aspect-square w-full"
                />
                <p className="font-semibold text-lg md:text-xl">
                  Trainee Officer&apos;s Hostel
                </p>
                <p className="font-normal text-sm md:text-base">
                  IIT Roorkee Campus
                </p>
              </div>
            </div>
            <div className="text-center md:text-left">
              <p className="mb-4 text-3xl md:text-4xl font-semibold tracking-wide">
                Trainee Officer&apos;s Hostel (TOH)
              </p>
              <p className="mb-4 text-gray-600 text-base md:text-lg text-justify">
                The Continuing Education Centre (CEC) at IITR offers
                well-furnished accommodations through its Trainee Officer&apos;s
                Hostel, which is designed to provide a comfortable stay for
                participants in CEC programs. The hostel features two VIP suites
                and 34 additional rooms, all of which are air-conditioned.
                Additionally, there is a fully air-conditioned conference hall
                available.
              </p>
              <p className="mb-4 text-gray-600 text-base md:text-lg text-justify">
                Each room is equipped with modern amenities, including satellite
                TV, color LCD/LED TV, Wi-Fi internet, and an electronic phone
                with intercom. The hostel also offers 24/7 pantry service,
                providing tea and coffee at any time.
              </p>
              <p className="text-gray-600 text-base md:text-lg text-justify">
                Participants of AICTE-sponsored courses enjoy complimentary
                hostel and dining facilities, while nominal charges apply for
                those from self-sponsored agencies or organizations.
              </p>
              <div className="mt-8 flex flex-col sm:flex-row justify-center md:justify-start gap-6 md:gap-8">
                <div className="flex items-center gap-x-3">
                  <GraduationCap className="w-10 h-10 md:w-12 md:h-12" />
                  <div className="flex flex-col items-start">
                    <p className="text-xl md:text-2xl font-semibold">02</p>
                    <p className="text-base md:text-xl font-normal">VIP Suites</p>
                  </div>
                </div>
                <div className="flex items-center gap-x-3">
                  <School className="w-8 h-8 md:w-10 md:h-10" />
                  <div className="flex flex-col items-start">
                    <p className="text-xl md:text-2xl font-semibold">34</p>
                    <p className="text-base md:text-xl font-normal">AC Rooms</p>
                  </div>
                </div>
                <div className="flex items-center gap-x-3">
                  <Utensils className="w-8 h-8 md:w-10 md:h-10" />
                  <div className="flex flex-col items-start">
                    <p className="text-xl md:text-2xl font-semibold">24/7</p>
                    <p className="text-base md:text-xl font-normal">Refreshments</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Facilities Section */}
        <section className="px-4 sm:px-8 md:px-16">
          <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-8 container mx-auto">
            <div className="text-center md:text-left">
              <p className="mb-4 text-3xl md:text-4xl font-semibold tracking-wide">
                Facilities available at Trainee Officer&apos;s Hostel
              </p>
              <div className="bg-[#FFFAF1] mt-8 grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-6 max-w-full md:max-w-max p-8 rounded-lg">
                <ul className="space-y-4">
                  {facilities.slice(0, 5).map((item, index) => (
                    <li key={index} className="flex items-center text-base md:text-lg font-light">
                      {item.icon}
                      {item.title}
                    </li>
                  ))}
                </ul>
                <ul className="space-y-4">
                  {facilities.slice(5, 10).map((item, index) => (
                    <li key={index} className="flex items-center text-base md:text-lg font-light">
                      {item.icon}
                      {item.title}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="flex justify-center items-center lg:justify-end">
              <Image
                preview={false}
                src="https://d1bm918zlnq37v.cloudfront.net/CECTemp/TOH_Image1.jpg"
                alt="Facilities Image"
                className="w-full max-w-md object-cover rounded-lg"
              />
            </div>
          </div>
        </section>

        {/* Categories Section */}
        <section className="px-4 sm:px-8 md:px-16 bg-[#E1F1F4] py-12">
          <p className="mb-8 md:mb-12 text-3xl md:text-4xl font-semibold text-center tracking-wide">
            Categories
          </p>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 container mx-auto">
            <div className="shadow-md bg-white p-6 md:p-8 rounded-md">
              <p className=" text-lg md:text-xl font-semibold mb-6">Category - I</p>
              <ul className="space-y-3 list-disc list-outside pl-6 text-sm md:text-base">
                <li>
                  Faculty and Staff of all IITs, including their guests (if the
                  faculty/staff covers the expenses).
                </li>
                <li>Spouses and parents of IIT students.</li>
                <li>Retired IIT employees.</li>
                <li>
                  Visitors attending workshops, conferences, short-term courses,
                  and IIT alumni.
                </li>
              </ul>
            </div>
            <div className="shadow-md bg-white p-6 md:p-8 rounded-md">
              <p className="text-lg md:text-xl font-semibold mb-6">Category - II</p>
              <ul className="space-y-3 list-disc list-outside pl-6 text-sm md:text-base">
                <li>
                  Faculty and Staff of all IITs, including their guests (if the
                  faculty/staff covers the expenses).
                </li>
                <li>Spouses and parents of IIT students.</li>
                <li>Retired IIT employees.</li>
                <li>
                  Visitors attending workshops, conferences, short-term courses,
                  and IIT alumni.
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* Charges Section */}
        <section className="px-4 sm:px-8 md:px-16 space-y-12 md:space-y-24">
          <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-8 container mx-auto">
            <div className="text-center md:text-left">
              <p className="mb-4 text-3xl md:text-4xl font-semibold tracking-wide">
                Charges for VIP Suite
              </p>
              <p className="text-base md:text-lg text-justify leading-relaxed">
                Experience the Ultimate in Luxury Living with Our VIP Suite.
                This Comprehensive Pricing Breakdown Covers Every Detail, from
                the Exclusive Amenities Designed to Pamper You, to the
                Personalized Services Catered to Your Needs. Explore the Costs
                Involved to Make an Informed Decision About Your Stay. <br />{" "}
                Boarding and Lodging Charges for
              </p>
              <ul className="list-disc list-inside pl-2 text-base md:text-lg leading-relaxed">
                <li>Category I is Rs.- 1200/-</li>
                <li>Category II is Rs.- 1800/-</li>
              </ul>
            </div>
            <div className="flex justify-center items-center lg:justify-end">
              <Image
                preview={false}
                src="https://d1bm918zlnq37v.cloudfront.net/CECTemp/TOH_Image2.jpg"
                alt="VIP Suite Charges Image"
                className="w-full max-w-md object-cover rounded-lg"
              />
            </div>
          </div>
          <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-8 container mx-auto">
            <div className="flex justify-center items-center lg:justify-start row-start-2 lg:row-start-1">
              <Image
                preview={false}
                src="https://d1bm918zlnq37v.cloudfront.net/CECTemp/TOH_Image3.jpg"
                alt="AC Room Charges Image"
                className="w-full max-w-md object-cover rounded-lg"
              />
            </div>
            <div className="text-center md:text-left row-start-1 lg:col-start-2">
              <p className="mb-4 text-3xl md:text-4xl font-semibold tracking-wide">
                Charges for AC Room
              </p>
              <p className="text-base md:text-lg text-justify leading-relaxed">
                Discover the Perfect Blend of Comfort and Affordability with Our
                AC Rooms. This Detailed Pricing Guide Provides a Clear Overview
                of the Costs Involved to Make an Informed Decision About Your Stay. <br /> Boarding
                and Lodging Charges for
              </p>
              <ul className="list-disc list-inside pl-2 text-base md:text-lg leading-relaxed">
                <li>Category I is Rs.- 900/-</li>
                <li>Category II is Rs.- 1200/-</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section className="px-4 sm:px-8 md:px-16 bg-[#E1F1F4] py-12">
          <p className="mb-8 md:mb-12 text-3xl md:text-4xl font-semibold text-center tracking-wide">
            Contact
          </p>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 container mx-auto">
            <div className="shadow-md bg-white p-6 md:p-8 rounded-md flex flex-col justify-center items-center text-center">
              <Hotel className="w-12 h-12 mb-4" />
              <p className="text-lg md:text-xl font-semibold mb-2">
                Manager, Trainee Officer&apos;s Hostel
              </p>
              <p className="text-sm md:text-base">
                Continuing Education Centre <br />
                Indian Institute Of Technology Roorkee <br />
                Roorkee - 247667 (Uttarakhand)
              </p>
            </div>
            <div className="shadow-md bg-white p-6 md:p-8 rounded-md flex flex-col justify-center items-center text-center">
              <MailOpen className="w-12 h-12 mb-4" />
              <p className="text-lg md:text-xl font-semibold mb-2">Email</p>
              <p className="text-sm md:text-base">
                manager.toh@iitr.ac.in <br /> cec-toh@iitr.ac.in
              </p>
              <div className="flex items-center gap-x-4 mt-4">
                <Phone className="w-6 h-6" />
                <p className="text-sm md:text-base">01332-284327, 285227, 285545</p>
              </div>
            </div>
          </div>
        </section>
      </section>
    </div>
  );
}
