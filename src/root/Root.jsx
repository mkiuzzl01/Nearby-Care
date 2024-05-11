import { Outlet } from "react-router-dom";
import Footer from "../layout/Footer";
import Navbar from "../layout/Navbar";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
const Root = () => {
  return (
    <div>
      <div className="max-w-7xl m-auto">
        <header>
          <nav>
            <Navbar></Navbar>
          </nav>
        </header>
        <main className="min-h-[calc(100vh-270px)]">
          <Outlet></Outlet>
          <ToastContainer limit={3} autoClose={1000}/>
        </main>
      </div>
      <footer>
        <Footer></Footer>
      </footer>
    </div>
  );
};

export default Root;
