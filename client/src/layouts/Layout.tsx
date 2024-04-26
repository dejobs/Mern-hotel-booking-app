import Header from "../components/Header";
import Footer from "../components/Footer";
import {Outlet} from "react-router-dom";
import {ToastContainer} from "react-toastify";
import SearchBar from "../components/SearchBar";
import "react-toastify/dist/ReactToastify.css";

const Layout = () => {
  return (
    <div className="flex flex-col min-h-screen ">
      <Header />
      <ToastContainer position="top-right" autoClose={2000} />
      <div className="container mx-auto">
        <SearchBar />
      </div>
      <main>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
