import {Link} from "react-router-dom";

const Header = () => {
  return (
    <header className="bg-teal-800 py-6 shadow-md ">
      <div className="container mx-auto flex justify-between  items-center">
        <span className="text-lg sm:text-3xl text-white font-bold tracking-tight">
          <Link to="/">TravelMaker.com</Link>
        </span>
        <span className="flex items-center space-x-2 ">
          <Link
            to="/sign-in"
            className="text-teal-700 border rounded-sm font-medium sm:font-semibold px-1 sm:px-3 bg-white hover:bg-gray-200 hover:text-teal-900 "
          >
            Sign in
          </Link>
        </span>
      </div>
      <div className="container mx-auto text-white flex flex-col gap-2 mt-5 mb-10">
        <h1 className="text-5xl font-semibold">Find a home away from home</h1>
        <p className="text-lg ">
          Explore affordable hotel rate for your idea getaway...
        </p>
      </div>
    </header>
  );
};

export default Header;