import { Link, useLoaderData } from "react-router-dom";
import Slider from "../Slider/Slider";
import Popular_Services_Card from "../Popular Services/Popular_Services_Card";
import { FaUserDoctor } from "react-icons/fa6";
import { Ri24HoursLine } from "react-icons/ri";
import { GrTechnology } from "react-icons/gr";
import { RiNumber1 } from "react-icons/ri";
import { RiNumber2 } from "react-icons/ri";
import { RiNumber3 } from "react-icons/ri";
import Contact_Us from "./Contact_Us/Contact_Us";
import { RiTeamLine } from "react-icons/ri";

const Home = () => {
  const loadServices = useLoaderData();
  // console.log(loadServices);
  const services = loadServices.slice(0, 6);
  return (
    <div>
      <div className="my-4">
        <Slider></Slider>
      </div>
      {/* This is About Us Secti  on */}
      <div className="flex flex-col my-20 items-center lg:flex-row lg:justify-between">
        <div className="1/2">
          <img src="https://i.postimg.cc/1Rjm7n7L/about3.jpg" alt="" />
        </div>
        <div className="1/2 space-y-4 lg:ms-12">
          <div className="text-center lg:text-start">
          <h1 className="text-3xl md:text-4xl font-bold">About Us</h1>
          <p className="text-2xl md:text-3xl">Welcome to Our Nearby Care....</p>
          </div>
          <div className="flex items-center space-x-4">
          <div>
            <FaUserDoctor  className="text-8xl border-8 border-sky-400 hover:border-green-400 rounded-full p-2"/>
            </div>
            <div>
            <h1 className="text-2xl font-medium">Certified Doctors:</h1>
            <p>At Consultation Services by Doctors, we understand the importance of entrusting your health to qualified professionals. <br /> That's why we've assembled a team of board-certified doctors and specialists, each with extensive training, expertise, and a passion for patient care.
            </p>
            </div>
          </div>

          <div className="flex items-center space-x-4">
          <div>
            <Ri24HoursLine  className="text-8xl border-8 border-sky-400 hover:border-green-400 rounded-full p-2"/>
            </div>
            <div>
            <h1 className="text-2xl font-medium">Emergency 24 Hours</h1>
            <p>We recognize that medical emergencies can happen at any time, <br /> which is why we offer 24-hour emergency services to ensure you receive prompt medical attention when you need it most.
            </p>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <div className="">
            <GrTechnology  className="text-8xl border-8 border-sky-400 hover:border-green-400 rounded-full p-2"/>
            </div>
            <div>
            <h1 className="text-2xl font-medium">Modern Technology</h1>
            <p>At Consultation Services by Doctors, we harness the power of modern technology to enhance your healthcare experience.
            </p>
            </div>
          </div>

        </div>
      </div>
      <div>
        {/* This is Popular service section */}
        <div className="my-4 space-y-4 border-y-2 p-4 border-dashed">
          <div className="flex justify-center items-center space-x-2"><span><RiTeamLine className="text-green-400 lg:text-5xl" /></span><span className="text-3xl md:text-4xl font-bold ">Popular Services</span></div>
          <p>
            At Consultation Services by Doctors, we understand the importance of
            accessible and specialized healthcare services. That's why we offer
            a range of popular services tailored to meet your needs. From
            routine check-ups to specialized consultations, our team of
            experienced doctors is dedicated to providing comprehensive care
            that prioritizes your well-being. Our most sought-after services
            include general check-ups, cardiac consultations, neurological
            evaluations, orthopedic assessments, and surgical consultations.
            Whether you're seeking preventive care or specialized treatment, our
            experts are here to guide you through every step of your healthcare
            journey. Contact us today to schedule your consultation and take the
            first step towards better health.
          </p>
        </div>
        <div className="my-2 grid grid-cols-1 gap-4 lg:grid-cols-3">
          {services.map((service) => (
            <Popular_Services_Card
              key={service._id}
              service={service}
            ></Popular_Services_Card>
          ))}
        </div>
        <div className="text-center my-2 border-b-2 py-5 rounded-lg">
          <Link to="/Services">
            <button className="btn">Show All</button>
          </Link>
        </div>

        {/* why use to user Nearby Care website */}
        <div className="my-20 flex flex-col items-center lg:flex-row lg:justify-center">
          <div className="1/2 space-y-4">
            <h1 className="text-3xl md:text-4xl font-bold">Why Use Nearby Care?</h1>


            <div className="flex items-center">
              <div>
              <RiNumber1 className="text-6xl text-green-500" />
              </div>
              <div className="ms-2">
              <h1 className="text-3xl font-normal">Personalized Care Plans</h1>
              <p> Our website offers personalized care plans tailored to each user's unique health needs and preferences.</p>
              </div>
            </div>
            <div className="flex items-center">
              <div>
              <RiNumber2 className="text-6xl text-green-500" />
              </div>
              <div className="ms-2">
              <h1 className="text-3xl font-normal">Transparent Pricing and Fees</h1>
              <p>Users can expect transparent pricing and fees for all healthcare services offered on our website. </p>
              </div>
            </div>
            <div className="flex items-center">
              <div>
              <RiNumber3 className="text-6xl text-green-500" />
              </div>
              <div className="ms-2">
              <h1 className="text-3xl font-normal">Comprehensive Healthcare Solutions</h1>
              <p>Whether users are seeking routine check-ups, specialized treatments, or emergency care, our website offers comprehensive healthcare solutions to meet their diverse needs.</p>
              </div>
            </div>

          </div>
          <div className="1/2">
            <img src="https://i.postimg.cc/VNZnk9Fz/mobile-hand.webp" alt="" />
          </div>
        </div>
        {/* this is contact us section */}
        <Contact_Us></Contact_Us>
      </div>
    </div>
  );
};

export default Home;
