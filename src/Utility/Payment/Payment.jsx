import { Elements } from "@stripe/react-stripe-js";
import CheckOut from "../CheckOut/CheckOut";
import { loadStripe } from "@stripe/stripe-js";
import { useLoaderData } from "react-router-dom";
import { Helmet } from "react-helmet";
import { FaLocationDot } from "react-icons/fa6";

//todo add stripe publishable key
const stripePromise = loadStripe(import.meta.env.VITE_PAYMENT_PUBLISHABLE_KEY);
const Payment = () => {
  const bookInfo = useLoaderData();

  return (
    <div className="my-12">
      <Helmet>
        <title>Nearby Care | Payment</title>
      </Helmet>
      <div className="flex flex-col lg:flex-row items-center justify-between">
      <div className="lg:w-1/2">
        <div className="w-full max-w-md px-8 py-4 mt-16 rounded-lg shadow-lg border-2">
          <div className="flex justify-center -mt-16 md:justify-end">
            <img
              src={bookInfo?.expertise_image ? bookInfo?.expertise_image :'https://i.postimg.cc/vTN8PMKb/blank-profile-picture-973460-1280.png'}
              alt=""
              className="object-cover w-full h-36 border-2 border-blue-500 rounded-md shadow-xl "
            />
        </div>

         <div className="my-5">
         <h2 className="text-2xl font-semibold  md:mt-0">
            Dr.
            {bookInfo.doctor_Name}
          </h2>
            <h2>Consultation Type : <span className="font-semibold">{bookInfo.expertise_Name}</span></h2>
            <p> Consultation Cost : <span className="font-semibold">${bookInfo.consultation_Cost}</span></p>
          <p className="mt-2 text-sm ">
            <span>Consultation Area: </span>
            <span className="flex items-center space-x-2">
              <span>
                <FaLocationDot />
              </span>
              <span>{bookInfo.area}</span>
            </span>
          </p>
         </div>
        </div>
      </div>
      <div className="lg:w-1/2">
        <h1 className="text-2xl font-semibold py-2">Insert your Bank Card Number:</h1>
      <Elements stripe={stripePromise}>
        <CheckOut bookInfo={bookInfo}></CheckOut>
      </Elements>
      </div>
      </div>
    </div>
  );
};

export default Payment;
