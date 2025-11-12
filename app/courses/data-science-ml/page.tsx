"use client";
import { Button, ConfigProvider, Image } from "antd";

export default function DataScienceMLCoursePage() {
  return (
    <div className="w-full font-inter">
      {/* Header Section */}
      <section className="relative w-full h-[50vh] flex items-center justify-center">
        {/* Background Image */}
        <div
          className="absolute inset-0 bg-[url('https://d1bm918zlnq37v.cloudfront.net/CECTemp/BgImage_courses.png')] bg-cover bg-center brightness-[0.6]"
          aria-hidden="true"
        ></div>
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent z-10"></div>

        {/* Content */}
        <div className="relative z-20 text-center text-white px-4">
          <p className="inline-block text-2xl sm:text-3xl md:text-4xl font-bold tracking-wider text-[#FFC758] border-b-4 border-[#FFC758] pb-1">
            COURSES
          </p>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mt-4">
            Data Science, Machine Learning & Generative AI
          </h1>
        </div>
      </section>

      {/* Main Content */}
      <main className="py-12 md:py-20">
        {/* About the course */}
        <section className="px-4 sm:px-8 md:px-16 lg:px-28 mb-16 md:mb-20 lg:mb-24">
          <h2 className="text-2xl font-semibold mb-4 max-w-max border-b-4 border-b-[#FFC758] pb-1">
            ABOUT THE COURSE
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-start mt-6">
            <div className="text-base sm:text-lg text-gray-700 text-justify">
              <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4">
                The course on Data Science, Machine Learning & Generative AI
              </h3>
              <p>
                With such a humongous growth and opportunity, professionals can make a head-start with the Post Graduate Certificate Program in Data Science & Machine Learning (PGCP-DSML). PGCP-DSML is an 8-month course from IIT Roorkee with live instructor-led sessions by top IIT Roorkee faculty and industry experts. This online course is specially designed for working professionals with weekend classes to impart learning in data science, artificial intelligence, machine learning, and other related technologies. IIT Roorkee is a highly ranked institution and among the foremost institutes of national importance in higher technological education, engineering, and basic and applied research.
              </p>
              <div className="mt-8 md:mt-12 flex flex-col sm:flex-row gap-4 sm:gap-6 md:gap-8 items-start sm:items-center">
                <ConfigProvider
                  theme={{
                    components: {
                      Button: {
                        defaultBg: "#FFAE0E",
                        defaultHoverBg: "#E5893C",
                        defaultHoverColor: "#2C2C2C",
                      },
                    },
                  }}
                >
                  <a 
                    href="https://timespro.com/executive-education/iit-roorkee-post-graduate-certificate-programme-in-data-science-and-machine-learning"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Button
                      type="default"
                      size="large"
                      className="border-none w-full sm:w-44 text-black tracking-wide"
                      style={{ fontWeight: 'bold', height: '45px', fontSize: '19px' }}
                    >
                      Apply
                    </Button>
                  </a>
                </ConfigProvider>
                <a 
                  href="https://timespro.com/executive-education/iit-roorkee-post-graduate-certificate-programme-in-data-science-and-machine-learning"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-base sm:text-lg underline sm:self-center"
                >
                  Brochure
                </a>
              </div>
            </div>
            <div className="mt-8 md:mt-0 md:ml-8 flex justify-center">
              <Image
                preview={false}
                src="https://d1bm918zlnq37v.cloudfront.net/CECTemp/courses_DataSci_ML.jpg"
                alt="Data Science, Machine Learning & Generative AI"
                className="w-full h-auto max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-[600px] rounded-lg shadow-lg"
                style={{ width: '100%', maxWidth: 600 }}
              />
            </div>
          </div>
        </section>

        {/* More details */}
        <section className="mb-24 bg-[#F0F8FF] py-16">
          <div className="container mx-auto px-4 sm:px-8 lg:px-16">
            <h2 className="text-2xl sm:text-3xl font-semibold mb-6 sm:mb-8 text-center">
              More details about the course
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 sm:gap-8 text-center">
              <div className="border border-gray-300 p-6 rounded-lg bg-white">
                <h4 className="font-semibold text-lg mb-3">Course Coordinator</h4>
                <hr className="my-3" />
                <p>Prof. Alok Bhardwaj, IIT Roorkee</p>
              </div>
              <div className="border border-gray-300 p-6 rounded-lg bg-white">
                <h4 className="font-semibold text-lg mb-3">Program Partner</h4>
                <hr className="my-3" />
                <p>Times Pro</p>
              </div>
              <div className="border border-gray-300 p-6 rounded-lg bg-white">
                <h4 className="font-semibold text-lg mb-3">Course Duration</h4>
                <hr className="my-3" />
                <p>8 Months</p>
              </div>
              <div className="border border-gray-300 p-6 rounded-lg bg-white">
                <h4 className="font-semibold text-lg mb-3">Mode</h4>
                <hr className="my-3" />
                <p>Online</p>
              </div>
            </div>
            <p className="text-center mt-8 text-sm text-gray-600">
              * Certificates will be released upon successful completion of the
              course.
            </p>
          </div>
        </section>

        {/* Course Features */}
        <section className="px-4 sm:px-8 md:px-16 lg:px-28 mb-16 md:mb-20 lg:mb-24">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-center">
            <div>
              <h2 className="text-2xl sm:text-3xl font-semibold mb-4 max-w-max border-b-4 border-b-[#FFC758] pb-1">
                Course Features
              </h2>
              <ul className="list-disc list-inside space-y-4 text-base sm:text-lg text-gray-700 mt-6">
                <li>2 specializations to choose from - Deep learning applications (image and speech) - Data engineering</li>
                <li>Live online teaching by IIT Roorkee faculty, TimesPro faculty and industry experts</li>
                <li>360-degree career support by Times Pro</li>
                <li>Students will have access to a Learning Management System for referring to the content</li>
                <li>The programme will be delivered in a two-way video/audio interactive mode</li>
                <li>Post Graduate certificate from CEC IIT Roorkee</li>
              </ul>
            </div>
            <div className="flex items-center justify-center">
              <div className="w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-xl">
                <Image
                  preview={false}
                  src="https://d1bm918zlnq37v.cloudfront.net/CECTemp/SampleCert.jpg"
                  alt="Certificate"
                  className="rounded-lg shadow-lg"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Eligibility Criteria */}
        <section className="px-4 sm:px-8 md:px-16 lg:px-28 mb-16 md:mb-20 lg:mb-24">
          <h2 className="text-2xl sm:text-3xl font-semibold mb-4 max-w-max border-b-4 border-b-[#FFC758] pb-1">
            Eligibility criteria
          </h2>
          <p className="mt-6 text-base sm:text-lg text-gray-700">
            [Eligibility criteria to be provided]
          </p>
        </section>

        {/* Application Process */}
        <section className="px-4 sm:px-8 md:px-16 lg:px-28 mb-12 md:mb-16">
          <h2 className="text-2xl sm:text-3xl font-semibold mb-4 max-w-max border-b-4 border-b-[#FFC758] pb-1">
            Application Process
          </h2>
          <p className="mt-6 text-base sm:text-lg text-gray-700 mb-6">
            Interested candidates can apply to his course online by clicking
            on apply now button. Based on the qualification and experience the
            application will be shortlisted and eligible candidates will be
            informed through the confirmation mail.
          </p>
          <a 
            href="https://timespro.com/executive-education/iit-roorkee-post-graduate-certificate-programme-in-data-science-and-machine-learning"
            target="_blank"
            rel="noopener noreferrer"
            className="text-lg md:text-xl font-semibold underline mt-6 inline-block"
          >
            Apply
          </a>
        </section>
      </main>
    </div>
  );
} 