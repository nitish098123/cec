"use client";

import { Card, Image } from "antd";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";

interface Sponsor {
  category: string;
  items: {
    name: string;
    imageUrl: string;
  }[];
}

const sponsors: Sponsor[] = [
  {
    category: "Ed-Tech Partners",
    items: [
      {
        name: "Futurense Technologies",
        imageUrl: "/ed-tech-partners/futurense.png",
      },
      {
        name: "Carbon U Turn Technology Private Limited",
        imageUrl: "/ed-tech-partners/carbon-uturn.png",
      },
      { name: "Hunarho", imageUrl: "/ed-tech-partners/hunarho.png" },
      { name: "Protecon", imageUrl: "/ed-tech-partners/protecon.png" },
      { name: "CloudxLab", imageUrl: "/ed-tech-partners/cloudxlab.png" },
      { name: "Coursera Inc.", imageUrl: "/ed-tech-partners/coursera.png" },
      { name: "Jaro Education", imageUrl: "/ed-tech-partners/jaro.png" },
      {
        name: "Imarticus Learning Pvt. Ltd.",
        imageUrl: "/ed-tech-partners/imarticus.png",
      },
      { name: "Simplilearn", imageUrl: "/ed-tech-partners/simplilearn.png" },
      {
        name: "Zero Code Technology",
        imageUrl: "/ed-tech-partners/zerocode.png",
      },
      { name: "Futurewiz", imageUrl: "/ed-tech-partners/futurewiz.png" },
      {
        name: "Coding Ninjas",
        imageUrl: "/ed-tech-partners/coding-ninjas.png",
      },
      { name: "USAII", imageUrl: "/ed-tech-partners/usaii.png" },
      {
        name: "Talent Sprint",
        imageUrl: "/ed-tech-partners/talent-sprint.png",
      },
      { name: "EduXLL", imageUrl: "/ed-tech-partners/eduxll.png" },
    ],
  },
  {
    category: "International Sponsors",
    items: [
      {
        name: "Asian Development Bank",
        imageUrl: "/international-sponsors/adb.png",
      },
      {
        name: "Bangladesh Water Development Board",
        imageUrl: "/international-sponsors/bwdb.png",
      },
      {
        name: "Bhutan Power Corporation Ltd., Bhutan",
        imageUrl: "/international-sponsors/bpc.png",
      },
      {
        name: "Cowater International Inc., Canada",
        imageUrl: "/international-sponsors/cowater.png",
      },
      {
        name: "Ethiopian Electricity Agency, Ethiopia",
        imageUrl: "/international-sponsors/eea.png",
      },
      {
        name: "Fundo De Energia (FUNAE) Mozambique",
        imageUrl: "/international-sponsors/funae.png",
      },
      {
        name: "Ghana Irrigation Development Authority",
        imageUrl: "/international-sponsors/gida.png",
      },
      {
        name: "Institute of Water Modelling, Bangladesh",
        imageUrl: "/international-sponsors/iwm.png",
      },
      {
        name: "International Renewable Energy Agency, UAE",
        imageUrl: "/international-sponsors/irena.png",
      },
      {
        name: "Islamic Republic of Afghanistan",
        imageUrl: "/international-sponsors/ira.png",
      },
      {
        name: "Japan International Cooperation Agency",
        imageUrl: "/international-sponsors/jica.png",
      },
      {
        name: "LEA Associates South Asia Pvt. Ltd.",
        imageUrl: "/international-sponsors/lea.png",
      },
      {
        name: "Loughborough University, U.K.",
        imageUrl: "/international-sponsors/loughborough.png",
      },
      {
        name: "Ministry of Urban Development and Sacred Area Development SRILANKA",
        imageUrl: "/international-sponsors/mud-sl.png",
      },
      {
        name: "Ministry of Agriculture, Irrigation and Livestock (MAIL), Govt. of Afghanistan",
        imageUrl: "/international-sponsors/mail.png",
      },
      {
        name: "Ministry of External Affairs",
        imageUrl: "/international-sponsors/mea.png",
      },
      {
        name: "MNanyang Technological University Singapore",
        imageUrl: "/international-sponsors/ntu.png",
      },
      {
        name: "SAARC, New Delhi",
        imageUrl: "/international-sponsors/saarc.png",
      },
      {
        name: "Vienna International Centre",
        imageUrl: "/international-sponsors/vio.png",
      },
      {
        name: "Water Management Institute, Sri Lanka",
        imageUrl: "/international-sponsors/iwmi.png",
      },
    ],
  },
  {
    category: "National Sponsors",
    items: [
      {
        name: "Alstom Projects India Limited",
        imageUrl: "/national-sponsors/alstom.png",
      },
      {
        name: "Associated Cement Company",
        imageUrl: "/national-sponsors/acc.png",
      },
      {
        name: "Bharat Heavy Electronic Limited",
        imageUrl: "/national-sponsors/bhel.png",
      },
      {
        name: "Central Pollution Control Board",
        imageUrl: "/national-sponsors/cpcb.png",
      },
      {
        name: "Central Water Commission",
        imageUrl: "/national-sponsors/cwc.png",
      },
      {
        name: "Construction Industry Development Council",
        imageUrl: "/national-sponsors/cidc.png",
      },
      {
        name: "Damodar Valley Corporation",
        imageUrl: "/national-sponsors/dvc.png",
      },
      {
        name: "Department of Science & Technology",
        imageUrl: "/national-sponsors/dst.png",
      },
      {
        name: "Hindustan College of Science & Technology",
        imageUrl: "/national-sponsors/hcst.png",
      },
      { name: "Indian Railway", imageUrl: "/national-sponsors/ir.png" },
      {
        name: "Ministry of Home Affairs",
        imageUrl: "/national-sponsors/mha.png",
      },
      {
        name: "Ministry of Human Resource",
        imageUrl: "/national-sponsors/mhrd.png",
      },
      {
        name: "Ministry of Non Conventional Energy Sources",
        imageUrl: "/national-sponsors/mnces.png",
      },
      { name: "Ministry of Power", imageUrl: "/national-sponsors/mop.png" },
      {
        name: "Ministry of Water Resources",
        imageUrl: "/national-sponsors/mowr.png",
      },
      {
        name: "Moradabad Institute of Technology",
        imageUrl: "/national-sponsors/mit.png",
      },
      {
        name: "National Bank for Agriculture & Rural Development",
        imageUrl: "/national-sponsors/nabard.png",
      },
      {
        name: "National Hydropower Corporation Ltd",
        imageUrl: "/national-sponsors/nhpc.png",
      },
      {
        name: "National Programme on Earthquake Engineering Education",
        imageUrl: "/national-sponsors/npeee.png",
      },
      {
        name: "National Rural Roads Development Agency",
        imageUrl: "/national-sponsors/nrrda.png",
      },
      {
        name: "National Thermal Power Corporation",
        imageUrl: "/national-sponsors/ntpc.png",
      },
      {
        name: "Oil & Natural Gas Corporation",
        imageUrl: "/national-sponsors/ongc.png",
      },
      {
        name: "Power Finance Corporation",
        imageUrl: "/national-sponsors/pfc.png",
      },
      { name: "PRAGYA", imageUrl: "/national-sponsors/pragya.png" },
      {
        name: "Prasar Bharti",
        imageUrl: "/national-sponsors/prasar-bharti.png",
      },
      {
        name: "Project Management Unit",
        imageUrl: "/national-sponsors/pmu.png",
      },
      {
        name: "Punjab State Electricity Board",
        imageUrl: "/national-sponsors/pseb.png",
      },
      {
        name: "Research Designs & Standard Organisation",
        imageUrl: "/national-sponsors/rdso.png",
      },
      {
        name: "Rural Engineering Services",
        imageUrl: "/national-sponsors/res.png",
      },
      { name: "Security Paper Mills", imageUrl: "/national-sponsors/spm.png" },
      {
        name: "Smt. Ram Rati Gupta Women's Polytechnic",
        imageUrl: "/national-sponsors/srrgwp.png",
      },
      {
        name: "Tamil Nadu News Print and Papers Ltd",
        imageUrl: "/national-sponsors/tnpl.png",
      },
      { name: "TIFAC-CORE", imageUrl: "/national-sponsors/tifac.png" },
      {
        name: "Uttaranchal Academy of Administration",
        imageUrl: "/national-sponsors/uaa.png",
      },
      {
        name: "Xerox Modi Corp. Ltd",
        imageUrl: "/national-sponsors/xerox.png",
      },
    ],
  },
];

function SponsorsContent() {
  const searchParams = useSearchParams();
  const activeCategory =
    searchParams.get("category") || "Ed-Tech Partners";

  return (
    <div className="w-full font-inter">
      {/* Hero Section */}
      <div className="relative w-full h-[30vh] md:h-[40vh] flex items-center justify-center">
        <div
          className="absolute inset-0 bg-[url('/sponsors_background.jpeg')] bg-cover bg-center brightness-[0.5]"
          aria-hidden="true"
        ></div>
        <div className="relative z-10 text-white text-center px-4">
          <h1 className="text-3xl md:text-5xl font-bold">Our Sponsors</h1>
          <p className="text-sm md:text-lg mt-2">
            Partners in our mission to provide continuing education.
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="px-4 sm:px-8 md:px-16 py-12 md:py-16">
        <div className="container mx-auto">
          {/* Category Filters */}
          <div className="flex flex-wrap justify-center gap-2 md:gap-4 mb-8 md:mb-12">
            {sponsors.map(({ category }) => (
              <a
                key={category}
                href={`?category=${category}`}
                className={`px-4 py-2 text-sm md:text-base font-medium rounded-full transition-colors duration-300 ${
                  activeCategory === category
                    ? "bg-[#0B2447] text-white"
                    : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                }`}
              >
                {category}
              </a>
            ))}
          </div>

          {/* Sponsors Grid */}
          <div>
            {sponsors
              .filter(({ category }) => category === activeCategory)
              .map(({ category, items }) => (
                <div key={category}>
                  <h2 className="text-2xl md:text-3xl font-semibold text-center mb-8">
                    {category}
                  </h2>
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-8">
                    {items.map(({ name, imageUrl }) => (
                      <Card
                        key={name}
                        hoverable
                        className="group overflow-hidden flex flex-col items-center justify-center p-4 min-h-[210px] md:min-h-[250px]"
                        styles={{ body: { padding: 0 } }}
                      >
                        <div className="flex items-center justify-center w-full h-24 md:h-32">
                          <Image
                            src={imageUrl}
                            alt={name}
                            preview={false}
                            className="max-h-full max-w-full object-contain transition-transform duration-300 group-hover:scale-110"
                          />
                        </div>
                        <div className="mt-7 text-center w-full">
                          <p className="font-semibold text-xs md:text-sm leading-tight h-8 md:h-10 overflow-hidden text-ellipsis whitespace-normal line-clamp-2">{name}</p>
                        </div>
                      </Card>
                    ))}
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function SponsorsPage() {
  return (
    <Suspense fallback={
      <div className="w-full font-inter">
        <div className="relative w-full h-[30vh] md:h-[40vh] flex items-center justify-center">
          <div
            className="absolute inset-0 bg-[url('/sponsors_background.jpeg')] bg-cover bg-center brightness-[0.5]"
            aria-hidden="true"
          ></div>
          <div className="relative z-10 text-white text-center px-4">
            <h1 className="text-3xl md:text-5xl font-bold">Our Sponsors</h1>
            <p className="text-sm md:text-lg mt-2">
              Partners in our mission to provide continuing education.
            </p>
          </div>
        </div>
        <div className="px-4 sm:px-8 md:px-16 py-12 md:py-16">
          <div className="container mx-auto">
            <div className="flex flex-wrap justify-center gap-2 md:gap-4 mb-8 md:mb-12">
              {sponsors.map(({ category }) => (
                <div
                  key={category}
                  className="px-4 py-2 text-sm md:text-base font-medium rounded-full bg-gray-200 text-gray-700"
                >
                  {category}
                </div>
              ))}
            </div>
            <div className="text-center text-gray-600">Loading sponsors...</div>
          </div>
        </div>
      </div>
    }>
      <SponsorsContent />
    </Suspense>
  );
}
