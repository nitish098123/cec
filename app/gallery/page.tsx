"use client";

import { Image } from "antd";
import { DoubleLeftOutlined, DoubleRightOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";

export default function GalleryPage() {
  const galleryData = [
    {
      year: "2025-26",
      images: [
        "https://d1bm918zlnq37v.cloudfront.net/CECTemp/CECGallery/2025-26/2025-26_Photo1.jpg",
        "https://d1bm918zlnq37v.cloudfront.net/CECTemp/CECGallery/2025-26/2025-26_Photo2.jpg",
        "https://d1bm918zlnq37v.cloudfront.net/CECTemp/CECGallery/2025-26/2025-26_Photo3.jpg",
      ],
      captions: [
        "MoU signing between IIT Roorkee and Scaler",
        "Lecture session in the Campus Immersion of Applied Data Science and AI",
        "MoU signing between IIT Roorkee and Indian Army at Shimla",
      ],
    },
    {
      year: "2024-25",
      images: [
        "https://d1bm918zlnq37v.cloudfront.net/CECTemp/CECGallery/2024-25/2024-25_Photo1.jpg",
        "https://d1bm918zlnq37v.cloudfront.net/CECTemp/CECGallery/2024-25/2024-25_Photo2.jpg",
        "https://d1bm918zlnq37v.cloudfront.net/CECTemp/CECGallery/2024-25/2024-25_Photo3.jpg",
        "https://d1bm918zlnq37v.cloudfront.net/CECTemp/CECGallery/2024-25/2024-25_Photo4.jpg",
        "https://d1bm918zlnq37v.cloudfront.net/CECTemp/CECGallery/2024-25/2024-25_Photo5.jpg",
        "https://d1bm918zlnq37v.cloudfront.net/CECTemp/CECGallery/2024-25/2024-25_Photo6.jpg",
      ],
      captions: [
        "Course Inauguration - Capacity Building of Civil Engineers",
        "Course Inauguration - HRM & Analytics",
        "Group Photo - Training on MY Bharat and Digital Literacy",
        "Group Photo - Training program on AI & Deep Learning",
        "Training program on Automative Embedded System",
        "Group Photo- Big Data Analytics for ITS Officers",
      ],
    },
    {
      year: "2023-24",
      images: [
        "https://d1bm918zlnq37v.cloudfront.net/CECTemp/CECGallery/2023-24/2023-24_Photo1.jpg",
        "https://d1bm918zlnq37v.cloudfront.net/CECTemp/CECGallery/2023-24/2023-24_photo2.jpg",
        "https://d1bm918zlnq37v.cloudfront.net/CECTemp/CECGallery/2023-24/2023-24_Photo3.jpg",
        "https://d1bm918zlnq37v.cloudfront.net/CECTemp/CECGallery/2023-24/2023-24_Photo4.jpg",
        "https://d1bm918zlnq37v.cloudfront.net/CECTemp/CECGallery/2023-24/2023-24_Photo5.jpg",
        "https://d1bm918zlnq37v.cloudfront.net/CECTemp/CECGallery/2023-24/2023-24_Photo6.jpg",
        "https://d1bm918zlnq37v.cloudfront.net/CECTemp/CECGallery/2023-24/2023-24_Photo7.jpg",
        "https://d1bm918zlnq37v.cloudfront.net/CECTemp/CECGallery/2023-24/2023-24_Photo8.jpg",
      ],
      captions: [
        "Certificate distribution in Digital Marketing course",
        "Course inaugural for the RASTER 2023 sponsored by ISRO Disaster Management Support Programme",
        "MoU signing - CEC IITR & Protecon BTG",
        "MoU between CEC IITR and Protecon BTG",
        "Flipkart Augmentation of Industrial Relations program sponsored by Flipkart",
        "Electricity (power) markets program sponsored by NTPC",
        "New Technologies including FDR program sponsored by PMGSY Cell",
        "Certificate distribution ceremony in PMGSY Cell sponsored program",
      ],
    },
    {
      year: "2022-23",
      images: [
        "https://d1bm918zlnq37v.cloudfront.net/CECTemp/CECGallery/2022-23/2022-23_Photo1.jpg",
        "https://d1bm918zlnq37v.cloudfront.net/CECTemp/CECGallery/2022-23/2022-23_Photo2.jpg",
        "https://d1bm918zlnq37v.cloudfront.net/CECTemp/CECGallery/2022-23/2022-23_Photo3.jpg",
        "https://d1bm918zlnq37v.cloudfront.net/CECTemp/CECGallery/2022-23/2022-23_Photo4.jpg",
        "https://d1bm918zlnq37v.cloudfront.net/CECTemp/CECGallery/2022-23/2022-23_Photo5.jpg",
        "https://d1bm918zlnq37v.cloudfront.net/CECTemp/CECGallery/2022-23/2022-23_Photo6.jpg",
        "https://d1bm918zlnq37v.cloudfront.net/CECTemp/CECGallery/2022-23/2022-23_Photo7.jpg",
      ],
      captions: [],
    },
    {
      year: "2021-22",
      images: [
        "https://d1bm918zlnq37v.cloudfront.net/CECTemp/CECGallery/2021-22/2021-22_Photo1.jpg",
        "https://d1bm918zlnq37v.cloudfront.net/CECTemp/CECGallery/2021-22/2021-22_Photo2.jpg",
        "https://d1bm918zlnq37v.cloudfront.net/CECTemp/CECGallery/2021-22/2021-22_Photo3.jpg",
        "https://d1bm918zlnq37v.cloudfront.net/CECTemp/CECGallery/2021-22/2021-22_Photo4.jpg",
        "https://d1bm918zlnq37v.cloudfront.net/CECTemp/CECGallery/2021-22/2021-22_Photo5.jpg",
        "https://d1bm918zlnq37v.cloudfront.net/CECTemp/CECGallery/2021-22/2021-22_Photo6.jpg",
        "https://d1bm918zlnq37v.cloudfront.net/CECTemp/CECGallery/2021-22/2021-22_Photo7.jpg",
        "https://d1bm918zlnq37v.cloudfront.net/CECTemp/CECGallery/2021-22/2021-22_Photo8.jpg",
      ],
      captions: [],
    },
  ];

  const [activeTab, setActiveTab] = useState(0);

  // Auto-switch tabs every 7 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveTab((prev) => (prev + 1) % galleryData.length);
    }, 7000);
    return () => clearInterval(interval);
  }, [galleryData.length]);

  return (
    <div className="w-full font-inter">
      <section className="relative w-full h-[60vh] md:h-[80vh] flex items-center justify-center">
        {/* Background Image */}
        <div
          className="absolute inset-0 bg-[url('/gallery_background.jpeg')] bg-cover bg-center brightness-[0.7]"
          aria-hidden="true"
        ></div>
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent z-10"></div>

        {/* Content */}
        <div className="relative flex flex-col sm:flex-row items-center sm:items-center z-20 px-4 text-center sm:text-left gap-4">
          <Image
            preview={false}
            src="/IITR_logo.png"
            width="140px"
            height="140px"
            className="w-[120px] h-[120px] sm:w-[140px] sm:h-[140px]"
            alt="IITR Logo"
          />
          <div className="sm:border-l sm:pl-2 text-white">
            <span className="text-xl md:text-2xl">IIT ROORKEE</span>
            <p className="text-3xl md:text-4xl">CEC</p>
            <p className="text-3xl md:text-4xl">Photo Gallery</p>
          </div>
        </div>
      </section>
      <section className="py-6">
        <div className="container mx-auto px-4 sm:px-6 py-6">
          <h2 className="text-center text-2xl sm:text-3xl md:text-4xl font-semibold mb-6 sm:mb-8">
            Snapshots of Joy: Capturing CEC Memories
          </h2>
          {/* Year Tabs */}
          <div className="flex flex-wrap sm:flex-nowrap justify-center gap-3 sm:gap-4 mb-6 sm:mb-8 overflow-x-auto sm:overflow-visible px-2">
            {galleryData.map((year, idx) => (
              <button
                key={year.year}
                className={`px-4 sm:px-6 py-2 rounded-t-lg font-semibold text-base sm:text-lg focus:outline-none transition-colors duration-200 whitespace-nowrap ${
                  activeTab === idx
                    ? "bg-[#b3dafc] text-black"
                    : "bg-gray-200 text-gray-600"
                }`}
                onClick={() => setActiveTab(idx)}
              >
                {year.year}
              </button>
            ))}
          </div>
          {/* Gallery Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {galleryData[activeTab].images.map((img, i) => (
              <div className="relative overflow-hidden rounded-xl" key={img}>
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-20 pointer-events-none"></div>
                <Image
                  src={img}
                  width="100%"
                  height="100%"
                  className="aspect-square object-cover"
                  alt={`Gallery ${galleryData[activeTab].year} Image ${i + 1}`}
                />
                {/* Caption Overlay if available */}
                {galleryData[activeTab].captions && galleryData[activeTab].captions[i] && (
                  <div className="absolute bottom-0 left-0 w-full bg-black/60 text-white text-xs sm:text-sm md:text-base font-medium px-2 py-2 z-30 rounded-b-xl">
                    {galleryData[activeTab].captions[i]}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
