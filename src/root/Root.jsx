import { Outlet } from "react-router-dom";
import Footer from "../layout/Footer";
import Navbar from "../layout/Navbar";
import 'react-toastify/dist/ReactToastify.css';
const Root = () => {
  return (
    <div>
      <div className="max-w-7xl m-auto">
          <nav className="sticky top-0 z-10">
            <Navbar></Navbar>
          </nav>
        <main className="min-h-[calc(100vh-432px)] px-2 lg:px-0">
          <Outlet></Outlet>
        </main>
      </div>
      <footer>
        <Footer></Footer>
      </footer>
    </div>
  );
};

export default Root;
