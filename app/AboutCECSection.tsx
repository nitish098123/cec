"use client";

export default function AboutCECSection() {
  return (
    <section className="px-16 py-12">
      <div className="w-full grid grid-cols-2 container mx-auto">
        <div className="ml-0 md:ml-8 mt-4 md:mt-0 text-center md:text-left">
          <p className="mb-4 text-4xl font-semibold tracking-wide">
            Dream Big, Achieve More at CEC
          </p>
          <p className="mb-4 text-gray-600 text-xl text-justify">
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
          <div className="mt-4 flex justify-between gap-8">
            <div className="flex gap-x-3">
              <span className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center">🎓</span>
              <div className="flex flex-col items-start">
                <p className="text-2xl font-semibold">250+</p>
                <p className="text-xl font-normal">Courses</p>
              </div>
            </div>
            <div className="flex gap-x-3">
              <span className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">👥</span>
              <div className="flex flex-col items-start">
                <p className="text-2xl font-semibold">10000+</p>
                <p className="text-xl font-normal">Participants</p>
              </div>
            </div>
            <div className="flex gap-x-3">
              <span className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">🤝</span>
              <div className="flex flex-col items-start">
                <p className="text-2xl font-semibold">140+</p>
                <p className="text-xl font-normal">Sponsors</p>
              </div>
            </div>
          </div>
          <div className="w-full flex gap-x-12 mt-6">
            <button className="border-none w-full py-2.5 px-6 text-black text-lg font-normal tracking-wide bg-[#FFAE0E] hover:bg-[#E5893C] hover:text-[#2C2C2C] rounded">Download Brochure</button>
            <button className="w-full py-2.5 px-6 text-lg font-normal tracking-wide border border-[#FFAE0E] text-[#FFAE0E] hover:bg-white hover:text-[#FFAE0E] hover:border-[#FFAE0E] rounded">Know More</button>
          </div>
        </div>
        <div className="flex justify-center items-center">
          <img
            src="/AboutUsImage.png?v=2"
            alt="About CEC Image"
            width="350"
            className="object-cover aspect-square rounded-xl shadow-xl"
          />
        </div>
      </div>
    </section>
  );
} 