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
        <div className="relative z-20 text-center text-white">
          <p className="inline-block text-4xl font-bold tracking-wider text-[#FFC758] border-b-4 border-[#FFC758] pb-1">
            COURSES
          </p>
          <h1 className="text-5xl font-bold mt-4">
            Data Science and ML
          </h1>
        </div>
      </section>

      {/* Main Content */}
      <main className="py-20">
        {/* About the course */}
        <section className="px-28 mb-24">
          <h2 className="text-2xl font-semibold mb-4 max-w-max border-b-4 border-b-[#FFC758] pb-1">
            ABOUT THE COURSE
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-start mt-6">
            <div className="text-lg text-gray-700 text-justify">
              <h3 className="text-4xl font-bold mb-4">
                The course on Data Science and ML
              </h3>
              <p>
                With such a humongous growth and opportunity, professionals can make a head-start with the Post Graduate Certificate Program in Data Science & Machine Learning (PGCP-DSML). PGCP-DSML is an 8-month course from IIT Roorkee with live instructor-led sessions by top IIT Roorkee faculty and industry experts. This online course is specially designed for working professionals with weekend classes to impart learning in data science, artificial intelligence, machine learning, and other related technologies. IIT Roorkee is a highly ranked institution and among the foremost institutes of national importance in higher technological education, engineering, and basic and applied research.
              </p>
              <div className="mt-12 flex gap-8 items-center">
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
                      className="border-none w-44 text-black tracking-wide"
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
                  className="text-lg underline self-center"
                >
                  Brochure
                </a>
              </div>
            </div>
            <div className="ml-8">
              <Image
                preview={false}
                src="https://d1bm918zlnq37v.cloudfront.net/CECTemp/courses_DataSci_ML.jpg"
                alt="Data Science and ML"
                className="w-full h-auto rounded-lg shadow-lg"
                style={{ width: '600px' }}
              />
            </div>
          </div>
        </section>

        {/* More details */}
        <section className="mb-24 bg-[#F0F8FF] py-16">
          <div className="container mx-auto px-16">
            <h2 className="text-3xl font-semibold mb-8 text-center">
              More details about the course
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
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
        <section className="px-28 mb-24">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl font-semibold mb-4 max-w-max border-b-4 border-b-[#FFC758] pb-1">
                Course Features
              </h2>
              <ul className="list-disc list-inside space-y-4 text-lg text-gray-700 mt-6">
                <li>2 specializations to choose from - Deep learning applications (image and speech) - Data engineering</li>
                <li>Live online teaching by IIT Roorkee faculty, TimesPro faculty and industry experts</li>
                <li>360-degree career support by Times Pro</li>
                <li>Students will have access to a Learning Management System for referring to the content</li>
                <li>The programme will be delivered in a two-way video/audio interactive mode</li>
                <li>Post Graduate certificate from CEC IIT Roorkee</li>
              </ul>
            </div>
            <div className="flex items-center justify-center">
              <div className="w-3/4">
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
        <section className="px-28 mb-24">
          <h2 className="text-3xl font-semibold mb-4 max-w-max border-b-4 border-b-[#FFC758] pb-1">
            Eligibility criteria
          </h2>
          <p className="mt-6 text-lg text-gray-700">
            [Eligibility criteria to be provided]
          </p>
        </section>

        {/* Application Process */}
        <section className="px-28 mb-16">
          <h2 className="text-3xl font-semibold mb-4 max-w-max border-b-4 border-b-[#FFC758] pb-1">
            Application Process
          </h2>
          <p className="mt-6 text-lg text-gray-700 mb-6">
            Interested candidates can apply to his course online by clicking
            on apply now button. Based on the qualification and experience the
            application will be shortlisted and eligible candidates will be
            informed through the confirmation mail.
          </p>
          <a 
            href="https://timespro.com/executive-education/iit-roorkee-post-graduate-certificate-programme-in-data-science-and-machine-learning"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xl font-semibold underline mt-6 inline-block"
          >
            Apply
          </a>
        </section>
      </main>
    </div>
  );
} 