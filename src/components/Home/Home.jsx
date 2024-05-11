import { Link, useLoaderData } from "react-router-dom";
import Slider from "../Slider/Slider";
import Popular_Services_Card from "../Popular Services/Popular_Services_Card";

const Home = () => {
    const loadServices = useLoaderData();
    const services = loadServices.slice(0,6);
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
            <div className="my-2 grid grid-cols-1 gap-4 lg:grid-cols-3">
            {
                services.map(service=> <Popular_Services_Card key={service._id} service={service}></Popular_Services_Card>)
            }
            </div>
            <div className="text-center my-2 border-b-2 py-5 rounded-lg">
                <Link><button className="btn">Show All</button></Link>
            </div>
           </div>
        </div>
    );
};

export default Home;