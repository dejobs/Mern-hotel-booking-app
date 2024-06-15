import {Link, useLocation} from "react-router-dom";
import {useAppContext} from "../contexts/AppContext";
import SignOutButton from "./SignOutButton";
import {FaMoon} from "react-icons/fa";
import {CiLight} from "react-icons/ci";
import {Button, Navbar} from "flowbite-react";
import {useTheme} from "../contexts/ThemeContext";
import {useEffect} from "react";
import {useQuery, useQueryClient} from "react-query";
import * as apiClient from "../api-client";

const Header = () => {
  const {isLoggedIn} = useAppContext();
  const {pathname: path} = useLocation();
  const {theme, toggleTheme} = useTheme();
  const queryClient = useQueryClient();

  const {data: currentUser} = useQuery(
    "fetchUserData",
    apiClient.fetchCurrentUser,
    {
      onSuccess: async () => {
        await queryClient.invalidateQueries("fetchUserData");
      },
    }
  );

  useEffect(() => {
    document.querySelector("html")?.classList.remove("dark", "light");
    document.querySelector("html")?.classList.add(theme);
  }, [theme]);

  return (
    <header className="bg-teal-800 dark:bg-slate-700 pb-10 pt-6 ">
      <Navbar
        rounded
        className="bg-transparent  container mx-auto dark:bg-transparent"
      >
        {/* Brand */}
        <Navbar.Brand>
          <Link
            to={"/"}
            className="self-center whitespace-nowrap text-2xl md:text-3xl text-white font-semibold dark:text-white"
          >
            TravelMaker.com
          </Link>
        </Navbar.Brand>

        {/* Light/Dark Toggle Button */}
        <Button
          onClick={toggleTheme}
          className="flex items-center w-6 h-6 rounded-full focus:ring-0  ml-auto mr-3 p-2  bg-gray-200 dark:bg-gray-800"
          color="gray"
          pill
        >
          {theme === "light" ? <FaMoon /> : <CiLight />}
        </Button>

        {/* Navigation Links */}
        <Navbar.Toggle />

        <Navbar.Collapse>
          {isLoggedIn && (
            <Navbar.Link active={path === "/"}>
              <Link
                className="md:hidden text-white  text-base  hover:text-black"
                to={"/"}
              >
                Home
              </Link>
            </Navbar.Link>
          )}
          <Navbar.Link className="" active={path === "/about"}>
            <Link
              className="text-base   text-white hover:text-black md:hover:text-slate-400 md:text-sm"
              to={"/about"}
            >
              About
            </Link>
          </Navbar.Link>

          {isLoggedIn && (
            <>
              <Navbar.Link active={path === "/my-hotels"}>
                <Link
                  className="text-white text-base hover:text-black md:hover:text-slate-400 md:text-sm"
                  to={"/my-hotels"}
                >
                  My Hotels
                </Link>
              </Navbar.Link>
              <Navbar.Link active={path === "/my-bookings"}>
                <Link
                  className="text-white  text-base  hover:text-black md:hover:text-slate-400 md:text-sm"
                  to={"/my-bookings"}
                >
                  My bookings
                </Link>
              </Navbar.Link>
              <Navbar.Link active={path === `/profile/${currentUser?._id}`}>
                <Link
                  className="text-white  text-base  hover:text-black md:hover:text-slate-400 md:text-sm"
                  to={`/profile/${currentUser?._id}`}
                >
                  <span className="">
                    <img
                      src={currentUser?.avatar}
                      className="object-center object-cover w-6 h-6 rounded-full"
                    />
                  </span>
                </Link>
              </Navbar.Link>
            </>
          )}

          {/* Sign-In or Sign-Out Button */}
          {isLoggedIn ? (
            <Navbar.Link>
              <SignOutButton />
            </Navbar.Link>
          ) : (
            <Navbar.Link>
              <Link
                to={"/sign-in"}
                className="block text-white hover:text-black md:hover:text-slate-400 md:text-sm"
              >
                Sign In
              </Link>
            </Navbar.Link>
          )}
        </Navbar.Collapse>
      </Navbar>
      <div className="container mx-auto my-4 ">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-slate-400 hidden md:inline">
          Finding a home away from home
        </h1>
      </div>
    </header>
  );
};

export default Header;
