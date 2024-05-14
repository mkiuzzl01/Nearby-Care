import Popular_Services_Card from "../components/Popular Services/Popular_Services_Card";
import axios from "axios";
import { useEffect, useState } from "react";

const Services = () => {
  const [search, setSearch] = useState("");
  const [services, setServices] = useState([]);
  const All_ServicesPage = true;

  useEffect(() => {
    const getData = async () => {
      const { data } = await axios.get(
        `http://localhost:5000/Search?search=${search}`
      );
      setServices(data);
    };
    getData();
  }, [search]);

  const handleSearch = (e) => {
    e.preventDefault();
    const search = e.target.value;
    setSearch(search);
  };

  return (
    <div className="pt-4">
      <div className="my-4">
        <label className="input lg:w-1/2 input-bordered flex items-center gap-2">
          <input
            onChange={handleSearch}
            type="text"
            className="grow"
            name="key"
            placeholder="Search"
          />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            fill="currentColor"
            className="w-4 h-4 opacity-70"
          >
            <path
              fillRule="evenodd"
              d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
              clipRule="evenodd"
            />
          </svg>
        </label>
      </div>
      <div className="grid gap-4">
        {services.length > 0 ? (
          services?.map((service) => (
            <Popular_Services_Card
              key={service._id}
              service={service}
              All_ServicesPage={All_ServicesPage}
            ></Popular_Services_Card>
          ))
        ) : (
          <h1 className="text-6xl text-center mt-10">Empty</h1>
        )}
      </div>
    </div>
  );
};

export default Services;
