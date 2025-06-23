"use client";

import { Image } from "antd";
import { DoubleLeftOutlined, DoubleRightOutlined } from "@ant-design/icons";

export default function GalleryPage() {
  return (
    <div className="w-full font-inter">
      <section className="relative w-full h-[80vh] flex items-center justify-center">
        {/* Background Image */}
        <div
          className="absolute inset-0 bg-[url('/gallery_background.jpeg')] bg-cover bg-center brightness-[0.7]"
          aria-hidden="true"
        ></div>
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent z-10"></div>

        {/* Content */}
        <div className="relative flex items-center z-20">
          <Image
            preview={false}
            src="/IITR_logo.png"
            width="164px"
            height="164px"
            className=""
            alt="IITR Logo"
          />
          <div className="border-l pl-2 text-white">
            <span className="text-2xl">IIT ROORKEE</span>
            <p className="text-4xl">CEC</p>
            <p className="text-4xl">Photo Gallery</p>
          </div>
        </div>
      </section>
      <section className="py-6">
        <div className="container mx-auto p-6">
          <h2 className="text-center text-4xl font-semibold mb-8">
          Snapshots of Joy: Capturing CEC Memories
          </h2>
          <p className="text-center space-x-4 text-3xl mb-16 text-gray-500">
            <DoubleLeftOutlined /> <span className="">2024-2025</span>{" "}
            <DoubleRightOutlined />
          </p>
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="relative col-span-2">
              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-20"></div>
              <Image
                src="/gallery-1.png"
                width="100%"
                height="100%"
                className="aspect-video object-cover"
                alt="Image"
              />
              <div className="absolute bottom-4 left-4 text-white font-medium text-sm md:text-xl z-30">
                MOU Signing: CEC IITR and Protecon BTG{" "}
              </div>
            </div>
            <div className="relative">
              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-20"></div>
              <Image
                src="/gallery-2.png"
                width="100%"
                height="100%"
                className="aspect-square object-cover"
                alt="Image"
              />
              <div className="absolute bottom-4 left-4 text-white font-medium text-sm md:text-xl z-30">
                CEC Meet 2024{" "}
              </div>
            </div>
            <div className="relative">
              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-20"></div>
              <Image
                src="/gallery-3.png"
                width="100%"
                height="100%"
                className="aspect-square object-cover"
                alt="Image"
              />
              <div className="absolute bottom-4 left-4 text-white font-medium text-sm md:text-xl z-30">
                Siemeons Authorization{" "}
              </div>
            </div>
            <div className="relative">
              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-20"></div>
              <Image
                src="/gallery-4.png"
                width="100%"
                height="100%"
                className="aspect-square object-cover"
                alt="Image"
              />
              <div className="absolute bottom-4 left-4 text-white font-medium text-sm md:text-xl z-30">
                HRM & Analytics Session{" "}
              </div>
            </div>
            <div className="relative">
              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-20"></div>
              <Image
                src="/gallery-5.png"
                width="100%"
                height="100%"
                className="aspect-square object-cover"
                alt="Image"
              />
              <div className="absolute bottom-4 left-4 text-white font-medium text-sm md:text-xl z-30">
                Internship Certificate{" "}
              </div>
            </div>
            <div className="relative">
              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-20"></div>
              <Image
                src="/gallery-6.png"
                width="100%"
                height="100%"
                className="aspect-square object-cover"
                alt="Image"
              />
              <div className="absolute bottom-4 left-4 text-white font-medium text-sm md:text-xl z-30">
                Research Awards{" "}
              </div>
            </div>
            <div className="relative col-span-2">
              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-20"></div>
              <Image
                src="/gallery-7.png"
                width="100%"
                height="100%"
                className="aspect-video object-cover"
                alt="Image"
              />
              <div className="absolute bottom-4 left-4 text-white font-medium text-sm md:text-xl z-30">
                Academic Meeting : CEC IITR 2024{" "}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
