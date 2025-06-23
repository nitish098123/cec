"use client";

import { Image, Row, Col } from "antd";
import { Star, Sun, LocateFixed } from "lucide-react";

export default function AboutUsPage() {
  return (
    <div className="w-full font-inter">
      <section className="relative w-full h-[50vh] md:h-[60vh] flex items-center justify-center">
        {/* Background Image */}
        <div
          className="absolute inset-0 bg-[url('/home_background.png')] bg-cover bg-center brightness-[0.7]"
          aria-hidden="true"
        ></div>
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent z-10"></div>

        {/* Content */}
        <div className="relative flex items-center z-20 px-4">
          <Image
            preview={false}
            src="/IITR_logo.png"
            alt="IITR Logo"
            className="w-24 h-24 md:w-40 md:h-40"
          />
          <div className="border-l pl-2 md:pl-4 text-white">
            <span className="text-xl md:text-2xl">QIP-CEC</span>
            <p className="text-3xl md:text-4xl">About Us</p>
          </div>
        </div>
      </section>

      <section className="py-8 md:py-16">
        {/* Header Section */}
        <section className="px-4 sm:px-8 md:px-16 py-8 md:py-12">
          <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-8 container mx-auto">
            <div className="text-center md:text-left">
              <p className="mb-4 text-3xl md:text-4xl font-semibold tracking-wide">
                Continuing Education Centre
              </p>
              <p className="mb-4 text-gray-600 text-base md:text-lg text-justify">
                Continuing education center of IIT Roorkee was established in
                1955 for the promotion of knowledge upgradation activity in our
                country by organizing refresher/specialist courses for
                in-service technical and professional person from various
                Govt./Semi Govt. organisations, public and private undertakings,
                research institutions and industries. The center conducts about
                60 to 70 short terms courses (sponsored by different
                agencies/organisation) in continuing education every year in
                various disciplines of management, engineering, science and
                technology in which the professionals are trained from all parts
                of the country as well as from the neighbour countries. Courses
                organized by this Centre are innovative, accessible and
                stimulating and address to the current needs of the
                professionals. Courses are being organised through the technical
                expertise available in the departments and centres of the
                Institute. Experts from industries and R&D organisations are
                also invited to deliver lectures wherever necessary.
              </p>
              <p className="mb-4 text-gray-600 text-base md:text-lg text-justify">
                Centre organizes the courses in the beautiful campus of the
                Institute and also outside the Institute in consultancy as well
                as in sponsored mode that respond to client&apos;s continuing
                professional development needs. The Centre is fully equipped
                with the facility of conference hall, accommodation, dining and
                recreation.
              </p>
            </div>
            <div className="flex items-center">
              <img
                src="https://d1bm918zlnq37v.cloudfront.net/CECTemp/AboutUsImage.png"
                alt="About CEC Image"
                className="w-full max-w-sm object-contain rounded-xl shadow-xl mx-auto"
              />
            </div>
          </div>
        </section>

        <section className="bg-[#E1F1F4] px-4 sm:px-8 md:px-16 py-12">
          <div className="container mx-auto">
            <Row gutter={[50, 32]} className="">
              <Col xs={24} md={8}>
                <div className="space-y-2 text-center md:text-left">
                  <div className="p-4 bg-white rounded-full max-w-max mx-auto md:mx-0">
                    <Sun className="w-8 h-8" />
                  </div>
                  <p className="text-lg md:text-xl font-medium inline-block md:max-w-max border-b-2 border-b-[#666666] pb-2 tracking-wide">
                    Our Vision
                  </p>
                  <p className="text-sm font-light pt-3 text-justify">
                    A front line centre in science, engineering, technology and
                    management making significant contributions to human
                    resource development envisaging dynamic needs of the
                    professionals.
                  </p>
                </div>
              </Col>
              <Col xs={24} md={8}>
                <div className="space-y-2 text-center md:text-left">
                  <div className="p-4 bg-white rounded-full max-w-max mx-auto md:mx-0">
                    <Star className="w-8 h-8" />
                  </div>
                  <p className="text-lg md:text-xl font-medium inline-block md:max-w-max border-b-2 border-b-[#666666] pb-2 tracking-wide">
                    Our Mission
                  </p>
                  <p className="text-sm font-light pt-3 text-justify">
                    To establish a center for imparting technical education
                    through technological interventions for the economic
                    development of the country.
                  </p>
                </div>
              </Col>
              <Col xs={24} md={8}>
                <div className="space-y-2 text-center md:text-left">
                  <div className="p-4 bg-white rounded-full max-w-max mx-auto md:mx-0">
                    <LocateFixed className="w-8 h-8" />
                  </div>
                  <p className="text-lg md:text-xl font-medium inline-block md:max-w-max border-b-2 border-b-[#666666] pb-2 tracking-wide">
                    Objective
                  </p>
                  <ul className="text-sm font-light pt-3 list-disc pl-5 text-justify">
                    <li>
                      To create opportunity for gaining experience and more
                      knowledge in a particular field.
                    </li>
                    <li>
                      To create awareness in the technical community regarding
                      the advances in their area of interest and expertise of
                      IITR.
                    </li>
                    <li>
                      To provide a platform for interaction of Faculty,
                      Consultants, Industries and users.
                    </li>
                    <li>
                      To provide an opportunity to study at IIT Roorkee for a
                      short period of time.
                    </li>
                    <li>To provide requisite inputs for improvements.</li>
                  </ul>
                </div>
              </Col>
            </Row>
          </div>
        </section>

        {/* Statistics Section */}
        <section className="bg-[#0B2447] text-white py-12 md:py-16">
          <div className="container mx-auto grid grid-cols-2 sm:grid-cols-4 gap-8 text-center px-4">
            <div>
              <h2 className="text-4xl md:text-5xl font-bold text-[#FFA500] mb-4">10000+</h2>
              <p className="text-sm">
                Participants Trained
                <br className="hidden sm:inline" />
                (In Past 5 Years)
              </p>
            </div>
            <div>
              <h2 className="text-4xl md:text-5xl font-bold text-[#FFA500] mb-4">250+</h2>
              <p className="text-sm">
                Courses
                <br className="hidden sm:inline" />
                (In Past 5 Years)
              </p>
            </div>
            <div>
              <h2 className="text-4xl md:text-5xl font-bold text-[#FFA500] mb-4">40+</h2>
              <p className="text-sm">International Sponsors</p>
            </div>
            <div>
              <h2 className="text-4xl md:text-5xl font-bold text-[#FFA500] mb-4">100+</h2>
              <p className="text-sm">National Sponsors</p>
            </div>
          </div>
        </section>

        {/* Information Sections */}
        <section className="bg-[#FFFAF1] px-4 sm:px-8 md:px-16 py-12 md:py-16">
          <div className="container mx-auto space-y-12 md:space-y-16">
            <div>
              <h2 className="text-2xl md:text-3xl font-semibold mb-4">
                Who comes to attend the courses
              </h2>
              <p className="text-gray-700 mb-4 text-justify">
                Participants who enroll in our courses are interested in
                lifelong learning. Many participants attend courses to develop
                professional skills, many because they love learning and many
                for both of these reasons.
              </p>
              <p className="text-gray-700 text-justify">
                The participant of the courses are in-service technical persons
                from various Govt./Semi Govt. organisations, public and private
                undertakings, research institutions and industries.
              </p>
            </div>

            <hr className="border-[#FFAE0E] border-dotted" />

            <div>
              <h2 className="text-2xl md:text-3xl font-semibold mb-4">Fee Structure</h2>
              <p className="text-gray-700 text-justify">
                The fee of each course may vary according to the duration of
                course, subject area and number of participants etc.
              </p>
            </div>

            <hr className="border-[#FFAE0E] border-dotted" />

            <div>
              <h2 className="text-2xl md:text-3xl font-semibold mb-4">Venue</h2>
              <p className="text-gray-700 text-justify">
                CEC is organizing courses at three campuses of IIT Roorkee i.e.
                Roorkee, Saharanpur and GNEC campus. Also, courses are organised
                at sponsorers&apos; location/industry as well as via online mode
                using various e-learning platforms.
              </p>
            </div>
          </div>
        </section>
      </section>
    </div>
  );
}
