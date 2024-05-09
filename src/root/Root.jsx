import { Outlet } from "react-router-dom";
import Footer from "../layout/Footer";
import Navbar from "../layout/Navbar";

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
        </main>
      </div>
      <footer>
        <Footer></Footer>
      </footer>
    </div>
  );
};

export default Root;
