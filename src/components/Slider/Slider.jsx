import {
  Navigation,
  Pagination,
  Scrollbar,
  Autoplay,
  EffectCoverflow,
} from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import 'animate.css';
// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-coverflow";
import { Link } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import { FaArrowRightLong } from "react-icons/fa6";
const Slider = () => {
    const {user,warningToast,dark} = useAuth();

  return (
    <div>
      <Swiper
        modules={[Navigation, Pagination, Scrollbar, EffectCoverflow, Autoplay]}
        spaceBetween={50}
        effect={"coverflow"}
        coverflowEffect={{
          rotate: 50,
          stretch: 0,
          depth: 100,
          modifier: 1,
          slideShadows: true,
        }}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        slidesPerView={1}
        navigation
        loop={true}
        pagination={{ clickable: true }}
      >
        <SwiperSlide>
          <div className="flex flex-col lg:flex-row bg-orange-300 rounded-lg lg:justify-between items-center">
            <div className="p-4 lg:w-1/2 lg:ms-16 md:space-y-4 text-black ">
              <h1 className="font-Merriweather font-medium text-4xl uppercase animate__animated animate__lightSpeedInRight">
              Your Health, Our Priority
              </h1>
              <p className="animate__animated animate__backInLeft">
              Experience a seamless journey towards better health with trusted advice and comprehensive consultations from our team of experts.
              </p>
              <div className="space-x-2 flex">
                <Link to={user? undefined :"/Register"} >
                  <button onClick={()=> {
                    user?
                    warningToast(' You are Already Register') : undefined }} className="btn">Register Now</button>
                    
                </Link>
                <Link to="/Services" >
                    <button className={dark?`flex items-center btn bg-white text-black border-none hover:text-white`:`flex items-center btn btn-outline`}><span>Get Appointment</span><span><FaArrowRightLong /></span></button>
                </Link>
              </div>
            </div>
            <div className="">
              <img
                src="https://i.postimg.cc/fy0wxSzz/home-slider1-resized-700x500.png"
                alt="Residential Image Coming soon"
                className=" md:w-full"
              />
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="flex flex-col lg:flex-row bg-sky-300 rounded-lg lg:justify-between items-center">
            <div className="p-4 lg:w-1/2 lg:ms-16 md:space-y-4 text-black">
              <h1 className="font-Merriweather font-medium text-4xl uppercase animate__animated animate__lightSpeedInRight">
              Expert Guidance for Your Health
              </h1>
              <p className="animate__animated animate__backInLeft">
              Discover personalized care and insights from seasoned doctors dedicated to your well-being. Navigate your health journey with confidence.
              </p>
              <div className="space-x-2 flex">
                <Link to={user? undefined :"/Register"} >
                  <button onClick={()=> {
                    user?
                    warningToast(' You are Already Register') : undefined }} className="btn">Register Now</button>
                    
                </Link>
                <Link to="/Services" >
                    <button className={dark ? "flex items-center btn  btn-primary":"flex items-center btn btn-outline btn-primary"}><span>Get Appointment</span><span><FaArrowRightLong /></span></button>
                </Link>
              </div>
            </div>
            <div className="">
              <img
                src="https://i.postimg.cc/Z0tJjYnr/home-slider2-resized-700x500.png"
                alt="Residential Image Coming soon"
                className="md:w-full"
              />
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="flex flex-col lg:flex-row bg-purple-200 rounded-lg lg:justify-between items-center">
            <div className="p-4 lg:w-1/2 lg:ms-16 md:space-y-4 text-black">
              <h1 className="font-Merriweather font-medium text-4xl uppercase animate__animated animate__lightSpeedInRight">
              Expert Consultations
              </h1>
              <p className="animate__animated animate__backInLeft">
              Explore a spectrum of consultation services tailored to your needs. Knowledge meets compassion in every interaction.
              </p>
              <div className="space-x-2 flex">
                <Link to={user? undefined :"/Register"} >
                  <button onClick={()=> {
                    user?
                    warningToast(' You are Already Register') : undefined }} className="btn">Register Now</button>
                    
                </Link>
                <Link to="/Services" >
                    <button className={dark ?"flex items-center btn  btn-secondary":"flex items-center btn btn-outline btn-secondary"}><span>Get Appointment</span><span><FaArrowRightLong /></span></button>
                </Link>
              </div>
            </div>
            <div className="">
              <img
                src="https://i.postimg.cc/qRFJhxdD/home-slider3-resized-700x500.png"
                alt="Residential Image Coming soon"
                className=" md:w-full"
              />
            </div>
          </div>
        </SwiperSlide>
      </Swiper>
    </div>
  );
};

export default Slider;
