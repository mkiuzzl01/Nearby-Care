import { CiFacebook } from "react-icons/ci";
import { FaLinkedinIn } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { Link } from "react-router-dom";
const Footer = () => {
  return (
    <div>
      <footer className="bg-white dark:bg-gray-900">
        <div className="p-6 max-w-7xl m-auto">
          <div className="lg:flex">
            <div className="mt-6">
              <div className="grid grid-cols-1 gap-10 items-center sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                <div className="">
                  <img
                    src="https://i.postimg.cc/C5qTrVN9/Nearby-Care-1-removebg-preview.png"
                    alt=""
                  />
                  <p className="max-w-sm mt-2 text-gray-500 dark:text-gray-400">
                    At Consultation Services by Doctors, we understand the
                    importance of accessible and specialized healthcare
                    services.
                  </p>
                </div>
                <div>
                  <h3 className="text-gray-700 uppercase dark:text-white">
                    Our Services
                  </h3>
                  <a
                    href="#"
                    className="block mt-2 text-sm text-gray-600 dark:text-gray-400 hover:underline"
                  >
                    Personalized Care Plans
                  </a>
                  <a
                    href="#"
                    className="block mt-2 text-sm text-gray-600 dark:text-gray-400 hover:underline"
                  >
                    Transparent Pricing and Fees
                  </a>
                  <a
                    href="#"
                    className="block mt-2 text-sm text-gray-600 dark:text-gray-400 hover:underline"
                  >
                    Comprehensive Healthcare
                  </a>
                </div>

                <div>
                  <h3 className="text-gray-700 uppercase dark:text-white">
                    Pages
                  </h3>
                  <Link
                    to="Add_Appointment"
                    className="block mt-2 text-sm text-gray-600 dark:text-gray-400 hover:underline"
                  >
                    Add Appointment
                  </Link>
                  <Link
                    to="Services"
                    className="block mt-2 text-sm text-gray-600 dark:text-gray-400 hover:underline"
                  >
                    Popular Services
                  </Link>
                  <Link
                    to="Manage_Appointment"
                    className="block mt-2 text-sm text-gray-600 dark:text-gray-400 hover:underline"
                  >
                    Manage Appointment
                  </Link>
                </div>

                <div className="space-y-2">
                  <h3 className="text-gray-700 uppercase dark:text-white">
                    Contact Us
                  </h3>
                  <div className="text-gray-400 space-y-2">
                    <p className="flex items-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        className="w-5 h-5 mr-2 sm:mr-6"
                      >
                        <path
                          fillRule="evenodd"
                          d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                          clipRule="evenodd"
                        ></path>
                      </svg>
                      <span>Ghulshan-1,Euro Tower</span>
                    </p>
                    <p className="flex items-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        className="w-5 h-5 mr-2 sm:mr-6"
                      >
                        <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z"></path>
                      </svg>
                      <span>+8801757433007</span>
                    </p>
                    <p className="flex items-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        className="w-5 h-5 mr-2 sm:mr-6"
                      >
                        <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"></path>
                        <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"></path>
                      </svg>
                      <span>mkiuzzal007@gmail.com</span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className=" my-4 flex justify-center space-x-4">
            <Link>
              <CiFacebook className="text-3xl text-white" />
            </Link>
            <Link>
              <FaLinkedinIn className="text-3xl text-white" />
            </Link>
            <Link>
              <FaInstagram className="text-3xl text-white" />
            </Link>
          </div>
          <div className="my-5">
            <hr />
          </div>
          <div>
            <p className="text-center text-gray-500 dark:text-gray-400">
              © Nearby Care 2024 - All rights reserved
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
