import {
  Navigation,
  Pagination,
  Scrollbar,
  Autoplay,
  EffectCoverflow,
} from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-coverflow";
import { Link } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

const Slider = () => {
    const {user,warningToast} = useAuth();
    console.log(user);
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
            <div className="p-4 lg:w-1/2 lg:ms-16 md:space-y-4 ">
              <h1 className="font-Merriweather font-medium text-4xl uppercase animate__animated animate__lightSpeedInRight">
              Your Health, Our Priority
              </h1>
              <p className="animate__animated animate__backInLeft">
              Experience a seamless journey towards better health with trusted advice and comprehensive consultations from our team of experts. Your well-being is at the heart of everything we do.
              </p>
              <div>
                <Link to={user? undefined :"/Register"} >
                  <button onClick={()=> {
                    user?
                    warningToast(' You are Already Register') : undefined }} className="btn">Register Now</button>
                    
                </Link>
              </div>
            </div>
            <div className="">
              <img
                src="https://i.postimg.cc/7ZxczcTH/sander-sammy-38-Un6-Oi5be-E-unsplash.png"
                alt="Residential Image Coming soon"
                className=""
              />
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="flex flex-col lg:flex-row bg-sky-300 rounded-lg lg:justify-between items-center">
            <div className="p-4 lg:w-1/2 lg:ms-16 md:space-y-4">
              <h1 className="font-Merriweather font-medium text-4xl uppercase animate__animated animate__lightSpeedInRight">
              Expert Guidance for Your Health
              </h1>
              <p className="animate__animated animate__backInLeft">
              Discover personalized care and insights from seasoned doctors dedicated to your well-being. Navigate your health journey with confidence.
              </p>
              <div>
              <Link to={user? undefined :"/Register"} >
                  <button onClick={()=> {
                    user?
                    warningToast(' You are Already Register') : undefined }} className="btn">Register Now</button>
                    
                </Link>
              </div>
            </div>
            <div className="">
              <img
                src="https://i.postimg.cc/xTGBH89L/michal-parzuchowski-7-TWRw-Djf-Gew-unsplash.png"
                alt="Residential Image Coming soon"
                className="im"
              />
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="flex flex-col lg:flex-row bg-purple-200 rounded-lg lg:justify-between items-center">
            <div className="p-4 lg:w-1/2 lg:ms-16 md:space-y-4">
              <h1 className="font-Merriweather font-medium text-4xl uppercase animate__animated animate__lightSpeedInRight">
              Empowering Lives Through Expert Consultations
              </h1>
              <p className="animate__animated animate__backInLeft">
              Explore a spectrum of consultation services tailored to your needs. Knowledge meets compassion in every interaction, empowering you to make informed choices for a healthier life.
              </p>
              <div>
              <Link to={user? undefined :"/Register"} >
                  <button onClick={()=> {
                    user?
                    warningToast(' You are Already Register') : undefined }} className="btn">Register Now</button>
                    
                </Link>
              </div>
            </div>
            <div className="">
              <img
                src="https://i.postimg.cc/fbPg6Rqy/kristine-wook-Zyx-NWi3-JCto-unsplash.png"
                alt="Residential Image Coming soon"
                className="lg:w-[875px]"
              />
            </div>
          </div>
        </SwiperSlide>
      </Swiper>
    </div>
  );
};

export default Slider;
