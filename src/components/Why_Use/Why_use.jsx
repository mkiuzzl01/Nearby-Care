import { RiNumber1 } from "react-icons/ri";
import { RiNumber2 } from "react-icons/ri";
import { RiNumber3 } from "react-icons/ri";

const Why_use = () => {
    return (
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
    );
};

export default Why_use;