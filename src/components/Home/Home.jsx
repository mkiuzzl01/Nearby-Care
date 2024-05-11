import { useLoaderData } from "react-router-dom";
import Popular_Services from "../Popular Services/Popular_Services_Card";
import Slider from "../Slider/Slider";
import Popular_Services_Card from "../Popular Services/Popular_Services_Card";

const Home = () => {
    const loadServices = useLoaderData();
    return (
        <div>
           <div className="my-4">
            <Slider></Slider>
           </div>
           <div>
            <div className="my-4 space-y-4 border-y-2 p-4 border-dashed">
                <h1 className="text-3xl text-center font-bold">Popular Services</h1>
                <p>At Consultation Services by Doctors, we understand the importance of accessible and specialized healthcare services. That's why we offer a range of popular services tailored to meet your needs. From routine check-ups to specialized consultations, our team of experienced doctors is dedicated to providing comprehensive care that prioritizes your well-being. Our most sought-after services include general check-ups, cardiac consultations, neurological evaluations, orthopedic assessments, and surgical consultations. Whether you're seeking preventive care or specialized treatment, our experts are here to guide you through every step of your healthcare journey. Contact us today to schedule your consultation and take the first step towards better health.</p>
            </div>
            <div className="my-2">
            {
                loadServices.map(service=> <Popular_Services_Card key={service._id} service={service}></Popular_Services_Card>)
            }
            </div>
           </div>
        </div>
    );
};

export default Home;