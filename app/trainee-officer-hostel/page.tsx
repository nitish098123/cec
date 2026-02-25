"use client";

import { Image } from "antd";
import {
  GraduationCap,
  School,
  Wifi,
  Droplet,
  Coffee,
  Tv,
  MonitorCog,
  Snowflake,
  Hotel,
  MailOpen,
  Phone,
  Car,
  Shield,
  Stethoscope,
  CircleDot,
} from "lucide-react";

const facilities = [
  { icon: <Wifi className="mr-2" />, title: "Free High Speed Wi-Fi Internet" },
  { icon: <Tv className="mr-2" />, title: "23 inch or larger TV / Cable or satellite channels" },
  { icon: <Coffee className="mr-2" />, title: "Tea/Coffee Maker" },
  { icon: <Droplet className="mr-2" />, title: "Water Purification System / Mineral Water" },
  { icon: <MonitorCog className="mr-2" />, title: "Work desk / Dataport" },
  { icon: <Snowflake className="mr-2" />, title: "Air Conditioner" },
  { icon: <Car className="mr-2" />, title: "Car Parking" },
  { icon: <Phone className="mr-2" />, title: "Intercom" },
  { icon: <Shield className="mr-2" />, title: "24-hour Security service" },
  { icon: <CircleDot className="mr-2" />, title: "24 X 7 Help Desk" },
  { icon: <Stethoscope className="mr-2" />, title: "Doctor on Call / 24-hour Medical Facility" },
  { icon: <Hotel className="mr-2" />, title: "Utility Kit / Fridge" },
];

export default function CertificatePage() {
  return (
    <div className="w-full font-inter">
      <section className="relative w-full h-[50vh] md:h-[60vh] flex items-center justify-center">
        {/* Background Image */}
        <div
          className="absolute inset-0 bg-[url('https://d1bm918zlnq37v.cloudfront.net/CECTemp/TOH_Image0.jpg')] bg-cover bg-center brightness-[0.7]"
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
                Continuing Education Centre of IITR runs a well-furnished
                Trainee Officer&apos;s Hostel. It has two Air Conditioned (AC)
                VIP Suites, 34 Air Conditioned rooms, and 1 fully Air
                Conditioned Conference Hall. All the rooms are having Satellite
                T.V. These are mainly intended for accommodating the
                participants of the programmes conducted under the auspices of
                CEC.
              </p>
              <p className="mb-4 text-gray-600 text-base md:text-lg text-justify">
                All the rooms are equipped with modern facilities, colour
                LCD/LED T.V, Wi-Fi Internet and Electronic Phone with Intercom
                in room. In addition to this Pantry service (Tea/Coffee) is
                available round the clock in the Hostel.
              </p>
              <p className="text-gray-600 text-base md:text-lg text-justify">
                Hostel and dining facilities is free of cost for participants of
                AICTE sponsored courses and having nominal charges for
                self-sponsored agencies/organization.
              </p>
              <div className="mt-8 flex flex-col sm:flex-row justify-center md:justify-start gap-6 md:gap-8">
                <div className="flex items-center gap-x-3">
                  <Hotel className="w-10 h-10 md:w-12 md:h-12" />
                  <div className="flex flex-col items-start">
                    <p className="text-xl md:text-2xl font-semibold">50</p>
                    <p className="text-base md:text-xl font-normal">Total Rooms</p>
                  </div>
                </div>
                <div className="flex items-center gap-x-3">
                  <School className="w-8 h-8 md:w-10 md:h-10" />
                  <div className="flex flex-col items-start">
                    <p className="text-xl md:text-2xl font-semibold">48</p>
                    <p className="text-base md:text-xl font-normal">Executive Standard</p>
                  </div>
                </div>
                <div className="flex items-center gap-x-3">
                  <GraduationCap className="w-8 h-8 md:w-10 md:h-10" />
                  <div className="flex flex-col items-start">
                    <p className="text-xl md:text-2xl font-semibold">02</p>
                    <p className="text-base md:text-xl font-normal">Executive Suite</p>
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
                  {facilities.slice(0, 6).map((item, index) => (
                    <li key={index} className="flex items-center text-base md:text-lg font-light">
                      {item.icon}
                      {item.title}
                    </li>
                  ))}
                </ul>
                <ul className="space-y-4">
                  {facilities.slice(6, 12).map((item, index) => (
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

        {/* Room Types Section */}
        <section className="px-4 sm:px-8 md:px-16 bg-[#E1F1F4] py-12">
          <p className="mb-8 md:mb-12 text-3xl md:text-4xl font-semibold text-center tracking-wide">
            Compare Accommodation
          </p>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 container mx-auto">
            <div className="shadow-md bg-white p-6 md:p-8 rounded-md">
              <p className="text-lg md:text-xl font-semibold mb-4">Executive Suite Rooms</p>
              <p className="text-sm md:text-base text-gray-600 mb-4">
                Max: 2 Person(s) · Bed: King-size or twin beds · View: Luxury · Size: Medium
              </p>
              <p className="text-sm md:text-base text-justify mb-4">
                The Executive Suite rooms are extremely spacious and kitted with luxury comforts.
                These rooms are generous in size with balcony. Your standard amenities include the
                tea/coffee maker, a 32&quot; Smart TV, and complimentary Wi-Fi. A three fixture
                bathroom with bath amenities like Dental kit, Shaving kit, soap &amp; Shampoo, 24
                hours dining and laundry service.
              </p>
              <p className="text-lg font-semibold text-[#E5893C]">₹ 1200 – 1400 per room + GST</p>
            </div>
            <div className="shadow-md bg-white p-6 md:p-8 rounded-md">
              <p className="text-lg md:text-xl font-semibold mb-4">Executive Standard Room</p>
              <p className="text-sm md:text-base text-gray-600 mb-4">
                Max: 2 Person(s) · Bed: King-size or twin beds · View: Standard · Size: Standard
              </p>
              <p className="text-sm md:text-base text-justify mb-4">
                The Executive standard rooms are extremely spacious and kitted with luxury comforts.
                These rooms are generous in size with balcony. Your standard amenities include the
                tea/coffee maker, a 32&quot; Smart TV, and complimentary Wi-Fi. A three fixture
                bathroom with bath amenities like Dental kit, Shaving kit, soap &amp; Shampoo, 24
                hours dining and laundry services.
              </p>
              <p className="text-lg font-semibold text-[#E5893C]">₹ 900 – 1200 per room + GST</p>
            </div>
          </div>
        </section>

        {/* Charges Section */}
        <section className="px-4 sm:px-8 md:px-16 space-y-12 md:space-y-24">
          <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-8 container mx-auto">
            <div className="text-center md:text-left">
              <p className="mb-4 text-3xl md:text-4xl font-semibold tracking-wide">
                Executive Suite Rooms
              </p>
              <p className="text-base md:text-lg text-justify leading-relaxed mb-4">
                The Executive Suite rooms are extremely spacious and kitted with luxury comforts.
                These rooms are generous in size with balcony. Your standard amenities include the
                tea/coffee maker, a 32&quot; Smart TV, and complimentary Wi-Fi. A three fixture
                bathroom with bath amenities like Dental kit, Shaving kit, soap &amp; Shampoo, 24
                hours dining and laundry service.
              </p>
              <p className="text-xl font-semibold text-[#E5893C]">₹ 1200 – 1400 per room + GST</p>
            </div>
            <div className="flex justify-center items-center lg:justify-end">
              <Image
                preview={false}
                src="https://d1bm918zlnq37v.cloudfront.net/CECTemp/TOH_Image2.jpg"
                alt="Executive Suite Rooms"
                className="w-full max-w-md object-cover rounded-lg"
              />
            </div>
          </div>
          <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-8 container mx-auto">
            <div className="flex justify-center items-center lg:justify-start row-start-2 lg:row-start-1">
              <Image
                preview={false}
                src="https://d1bm918zlnq37v.cloudfront.net/CECTemp/Toh_Image3.jpg"
                alt="Executive Standard Room"
                className="w-full max-w-md object-cover rounded-lg"
              />
            </div>
            <div className="text-center md:text-left row-start-1 lg:col-start-2">
              <p className="mb-4 text-3xl md:text-4xl font-semibold tracking-wide">
                Executive Standard Room
              </p>
              <p className="text-base md:text-lg text-justify leading-relaxed mb-4">
                The Executive standard rooms are extremely spacious and kitted with luxury comforts.
                These rooms are generous in size with balcony. Your standard amenities include the
                tea/coffee maker, a 32&quot; Smart TV, and complimentary Wi-Fi. A three fixture
                bathroom with bath amenities like Dental kit, Shaving kit, soap &amp; Shampoo, 24
                hours dining and laundry services.
              </p>
              <p className="text-xl font-semibold text-[#E5893C]">₹ 900 – 1200 per room + GST</p>
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
                Shri. Sunny John
              </p>
              <p className="text-sm md:text-base font-medium mb-1">Hospitality Officer</p>
              <p className="text-sm md:text-base">
                IIT Roorkee <br />
                Roorkee - 247667 <br />
                Uttarakhand, India
              </p>
            </div>
            <div className="shadow-md bg-white p-6 md:p-8 rounded-md flex flex-col justify-center items-center text-center">
              <MailOpen className="w-12 h-12 mb-4" />
              <p className="text-lg md:text-xl font-semibold mb-2">Email</p>
              <p className="text-sm md:text-base">
                hospitality.officer[at]iitr.ac.in
              </p>
              <div className="flex items-center gap-x-4 mt-4">
                <Phone className="w-6 h-6" />
                <p className="text-sm md:text-base">+91-1332-285570</p>
              </div>
            </div>
          </div>
        </section>
      </section>
    </div>
  );
}
