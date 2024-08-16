import {Link} from "react-router-dom";
import {FaMoon} from "react-icons/fa";
import {CiLight} from "react-icons/ci";
import {Button} from "flowbite-react";
import {useTheme} from "../contexts/ThemeContext";
import {useEffect} from "react";
import MobileNav from "./MobileNav";
import MainNav from "./MainNav";

const Header = () => {
  const {theme, toggleTheme} = useTheme();

  useEffect(() => {
    document.querySelector("html")?.classList.remove("dark", "light");
    document.querySelector("html")?.classList.add(theme);
  }, [theme]);

  return (
    <header className="container mx-auto bg-teal-800 dark:bg-slate-700 pb-10 pt-6 ">
      <div className="flex justify-between items-center">
        <Link
          to={"/"}
          className="self-center whitespace-nowrap text-2xl md:text-3xl text-white font-semibold dark:text-white"
        >
          TravelMaker.com
        </Link>
        <div className="flex justify-between items-center space-x-4"></div>
        <Button
          onClick={toggleTheme}
          className="flex items-center w-6 h-6 rounded-full focus:ring-0  ml-auto mr-3 p-2  bg-gray-200 dark:bg-gray-800"
          color="gray"
          pill
        >
          {theme === "light" ? <FaMoon /> : <CiLight />}
        </Button>
        <div>
          <span className="hidden md:block ">
            <MainNav />
          </span>
          <span className="md:hidden">
            <MobileNav />
          </span>
        </div>
      </div>
    </header>
  );
};

export default Header;
