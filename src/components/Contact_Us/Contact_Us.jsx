import Swal from "sweetalert2";
import useAuth from "../../hooks/useAuth";
import useAxiosPublic from "../../hooks/useAxiosPublic";

const Contact_Us = () => {
  const { user, errorToast } = useAuth();
  const axiosPublic = useAxiosPublic();

  const handleContact = async (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    const email = form.email.value;
    const query = form.query.value;
    const userQueryInfo = { name, email, query };

    try {
      const { data } = await axiosPublic.post(`/Contact_us`, userQueryInfo);
      // console.log(data);
      if (data.insertedId) {
        Swal.fire({
          title: "Success!",
          text: "Your Query Submitted Successfully!",
          icon: "success",
          confirmButtonText: "Ok",
        });
      }
      form.reset();
    } catch (error) {
      // console.log(error.message);
      errorToast("Something Wrong");
      return;
    }
  };
  return (
    <div>
      <div className="my-4" data-aos="zoom-in">
        <section className="rounded-lg bg-[url(https://i.postimg.cc/28XPfMs6/kristine-wook-Zyx-NWi3-JCto-unsplash.png)]  bg-no-repeat bg-cover bg-center">
          <div className="grid items-center grid-cols-1 p-10 mx-auto md:grid-cols-2 md:divide-x bg-opacity-50 bg-sky-900 rounded-lg">
            <div className="py-6 md:py-0 md:px-6">
              <h1 className="text-4xl font-bold text-yellow-200">
                Get in touch
              </h1>
              <p className="pt-2 pb-4 text-white">
                Fill in the form to start a conversation
              </p>
              <div className="space-y-4 text-white">
                <p className="flex items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    className="w-5 h-5 mr-2 sm:mr-6"
                  >
                    <path
                      fillRule="evenodd"
                      d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                  <span>Ghulshan-1,Euro Tower</span>
                </p>
                <p className="flex items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    className="w-5 h-5 mr-2 sm:mr-6"
                  >
                    <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z"></path>
                  </svg>
                  <span>+8801757433007</span>
                </p>
                <p className="flex items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    className="w-5 h-5 mr-2 sm:mr-6"
                  >
                    <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"></path>
                    <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"></path>
                  </svg>
                  <span>mkiuzzal007@gmail.com</span>
                </p>
              </div>
            </div>
            <form
              onSubmit={handleContact}
              noValidate=""
              className="flex flex-col py-6 space-y-6 md:py-0 md:px-6"
            >
              <label className="block">
                <span className="mb-1 text-white">Full name</span>
                <input
                  type="text"
                  name="name"
                  defaultValue={user ? user?.displayName : ""}
                  placeholder="Enter Your Name"
                  required
                  className="block input w-full"
                />
              </label>
              <label className="block">
                <span className="mb-1 text-white">Email address</span>
                <input
                  name="email"
                  type="email"
                  required
                  defaultValue={user ? user?.email : ""}
                  placeholder="Enter Your Email"
                  className="block w-full input "
                />
              </label>
              <label className="block">
                <span className="mb-1 text-white">Message</span>
                <textarea
                  name="query"
                  rows="3"
                  required
                  className="block w-full textarea "
                ></textarea>
              </label>
              <button className="block w-full p-3 text-center rounded-sm text-black bg-yellow-200  hover:bg-green-600">
                Submit
              </button>
            </form>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Contact_Us;
