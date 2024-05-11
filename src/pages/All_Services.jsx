import { useLoaderData } from "react-router-dom";
import Popular_Services_Card from "../components/Popular Services/Popular_Services_Card";

const All_Services = () => {
  const loadServices = useLoaderData();
    const All_ServicesPage = true;
  return (
    <div className="my-4">
        <div>
           
        </div>
      <div className="grid gap-4">
        {loadServices.map((service) => (
          <Popular_Services_Card
            key={service._id}
            service={service}
            All_ServicesPage={All_ServicesPage}
          ></Popular_Services_Card>
        ))}
      </div>
    </div>
  );
};

export default All_Services;
