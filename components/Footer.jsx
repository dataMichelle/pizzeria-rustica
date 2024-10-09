import { FaFacebookF, FaInstagram, FaYelp, FaGoogle } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-black text-white py-10">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left md:px-4 md:pb-4">
        {/* Location Section */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Location</h3>
          <p>123 Main St. Ste 1234</p>
          <p>Anywhere, MD 12345</p>
        </div>

        {/* Hours Section */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Hours</h3>
          <p>Mon, Tue, Wed, Thur: 4:00 PM - 9:00 PM</p>
          <p>Fri: 12:00 PM - 10:00 PM</p>
          <p>Sat: 11:30 AM - 10:00 PM</p>
          <p>Sun: 11:30 AM - 9:00 PM</p>
        </div>

        {/* Contact and Social Links Section */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Find us on...</h3>
          <div className="flex justify-center md:justify-start space-x-4 mb-4">
            <a
              href="https://www.facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
              className="text-white hover:text-gray-400"
            >
              <FaFacebookF size={24} />
            </a>
            <a
              href="https://www.instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="text-white hover:text-gray-400"
            >
              <FaInstagram size={24} />
            </a>
            <a
              href="https://www.yelp.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Yelp"
              className="text-white hover:text-gray-400"
            >
              <FaYelp size={24} />
            </a>
            <a
              href="https://www.google.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Google"
              className="text-white hover:text-gray-400"
            >
              <FaGoogle size={24} />
            </a>
          </div>

          <h3 className="text-lg font-semibold mb-3">Contact us</h3>
          <p>(123)-978-5432</p>
          <p>pizzeriarustica@gmail.com</p>
        </div>
      </div>
    </footer>
  );
}
