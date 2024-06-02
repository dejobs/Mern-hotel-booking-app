import Header from "../components/Header";
import Footer from "../components/Footer";
import {Outlet} from "react-router-dom";
import {ToastContainer} from "react-toastify";
import SearchBar from "../components/SearchBar";
import "react-toastify/dist/ReactToastify.css";

const Layout = () => {
  return (
    <div className="flex flex-col min-h-screen dark:bg-slate-800 ">
      <Header />
      <ToastContainer position="top-right" autoClose={2000} />
      <div className="container mx-auto -mt-8 ">
        <SearchBar />
      </div>
      <main className="container mx-auto mb-[50px]  ">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
