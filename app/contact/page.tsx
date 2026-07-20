import { Phone, Mail, MapPin, Clock } from "lucide-react";

export default function ContactPage() {
  return (
    <section className="bg-gray-50 py-16">
      <div className="container mx-auto px-4 md:px-8">
        {/* Heading */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4">Contact Us</h2>
          <p className="text-lg text-gray-600">
            We'd love to hear from you. Feel free to reach out to us.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-10">
          {/* Contact Details */}
          <div className="bg-white rounded-2xl shadow-lg p-8 space-y-8">
            <div className="flex items-start gap-4">
              <MapPin className="text-blue-600 mt-1" size={28} />
              <div>
                <h3 className="font-semibold text-xl mb-1">Office Address</h3>
                <p className="text-gray-600">
                  Continuing Education Centre
                  <br />
                  Indian Institute of Technology Roorkee
                  <br />
                  Roorkee - 247667
                  <br />
                  Uttarakhand, India
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <Phone className="text-green-600 mt-1" size={28} />
              <div>
                <h3 className="font-semibold text-xl mb-1">Phone</h3>
                <a
                  href="tel:+911332285545"
                  className="block text-blue-600 hover:underline"
                >
                  +91-1332-284327
                </a>
                <a
                  href="tel:+911332284327"
                  className="block text-blue-600 hover:underline"
                >
                  +91-1332-285545
                </a>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <Mail className="text-red-600 mt-1" size={28} />
              <div>
                <h3 className="font-semibold text-xl mb-1">Email</h3>
                <a
                  href="mailto:contd@iitr.ac.in"
                  className="block text-blue-600 hover:underline"
                >
                  contd@iitr.ac.in
                </a>
                <a
                  href="mailto:coordinator.cec.qip@iitr.ac.in"
                  className="block text-blue-600 hover:underline"
                >
                  coordinator.cec.qip@iitr.ac.in
                </a>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <Clock className="text-orange-600 mt-1" size={28} />
              <div>
                <h3 className="font-semibold text-xl mb-1">Office Hours</h3>
                <p className="text-gray-600">Monday – Friday</p>
                <p className="text-gray-600">8:45 AM – 5:30 PM</p>
              </div>
            </div>
          </div>

          {/* Google Map */}
          <div className="rounded-2xl overflow-hidden shadow-lg">
            <iframe
              title="CEC IIT Roorkee"
              src="https://www.google.com/maps?q=Continuing+Education+Centre+IIT+Roorkee&output=embed"
              className="w-full h-[500px] border-0"
              loading="lazy"
              allowFullScreen
            />
          </div>
        </div>
      </div>
    </section>
  );
}