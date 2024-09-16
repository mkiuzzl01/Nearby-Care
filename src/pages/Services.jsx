import Popular_Services_Card from "../components/Popular Services/Popular_Services_Card";
import axios from "axios";
import { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { FaArrowLeftLong } from "react-icons/fa6";
import { FaArrowRightLong } from "react-icons/fa6";
import Loading from "../layout/Loading";
import Empty from "../layout/Empty";

const Services = () => {
  const [search, setSearch] = useState("");
  const [services, setServices] = useState([]);
  const [itemsPerPage, setItemsPerPage] = useState(6);
  const [count, setCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const All_ServicesPage = true;
  const [isDataFetched, setIsDataFetched] = useState(false);

  useEffect(() => {
    const getData = async () => {
      setIsDataFetched(true);
      const { data } = await axios.get(
        `${
          import.meta.env.VITE_API_URL
        }/All_Services?search=${search}&page=${currentPage}&size=${itemsPerPage}`
      );
      setServices(data);
      setIsDataFetched(false);
    };
    getData();
  }, [search, currentPage, itemsPerPage]);

  //Pages Count
  useEffect(() => {
    const getCount = async () => {
      const { data } = await axios.get(
        `${import.meta.env.VITE_API_URL}/Services_count?search=${search}`
      );
      setCount(data.numbers);
    };
    getCount();
  }, [search]);

  //handle Search
  const handleSearch = (e) => {
    e.preventDefault();
    const search = e.target.value;
    setSearch(search);
  };

  //pagination
  const numberOfPages = Math.ceil(count / itemsPerPage);
  const pages = [...Array(numberOfPages).keys()].map((element) => element + 1);

  const handlePagination = (value) => {
    setCurrentPage(value);
  };

  return (
    <div className="py-4">
      <Helmet>
        <title>Nearby Care | Services </title>
      </Helmet>
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
        {isDataFetched && <Loading></Loading>}
        {services.length > 0 ? (
          services?.map((service) => (
            <Popular_Services_Card
              key={service._id}
              service={service}
              All_ServicesPage={All_ServicesPage}
            ></Popular_Services_Card>
          ))
        ) : (
          !isDataFetched && <Empty></Empty>
        )}
      </div>
      {/* pagination */}
      <div className="text-center my-20 space-x-4">
        <button
          disabled={currentPage === 1}
          onClick={() => handlePagination(currentPage - 1)}
          className="btn items-center"
        >
          <span>
            <FaArrowLeftLong className="text-blue-400 " />
          </span>
          <span>Prev</span>
        </button>
        {pages.map((page) => (
          <button
            className={currentPage === page ? " btn bg-green-500" : "btn"}
            onClick={() => handlePagination(page)}
            key={page}
          >
            {page}
          </button>
        ))}
        <button
          disabled={currentPage === numberOfPages}
          onClick={() => handlePagination(currentPage + 1)}
          className="btn items-center"
        >
          <span>Next</span>
          <span>
            <FaArrowRightLong className="text-blue-400 " />
          </span>
        </button>
      </div>
    </div>
  );
};

export default Services;
