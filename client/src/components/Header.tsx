import {Link, useLocation} from "react-router-dom";
import {useAppContext} from "../contexts/AppContext";
import SignOutButton from "./SignOutButton";
import {FaMoon} from "react-icons/fa";
import {Button, Navbar} from "flowbite-react";
import {useState} from "react";

const Header = () => {
  const {isLoggedIn} = useAppContext();
  const path = useLocation().pathname;
  const [darkMode, setDarkMode] = useState(false);

  console.log(isLoggedIn);
  console.log([darkMode, "mode"]);

  const handleClick = () => {
    setDarkMode((prevState) => !prevState);
  };

  return (
    <header className="bg-teal-800 pb-10 pt-6 ">
      <Navbar rounded className="bg-transparent  container mx-auto">
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
          className="flex items-center w-7 h-7 rounded-full ml-auto mr-3 p-2  bg-gray-200 dark:bg-gray-800"
          color="gray"
          pill
        >
          <FaMoon onClick={handleClick} />
        </Button>

        {/* Navigation Links */}
        <Navbar.Toggle />

        <Navbar.Collapse>
          {isLoggedIn && (
            <>
              <Navbar.Link className="md:hidden" active={path === "/about"}>
                <Link
                  className="block   text-white hover:text-black "
                  to={"/about"}
                >
                  About us
                </Link>
              </Navbar.Link>
              <Navbar.Link active={path === "/my-hotels"}>
                <Link
                  className="text-white text-base hover:text-black"
                  to={"/my-hotels"}
                >
                  My Hotels
                </Link>
              </Navbar.Link>
              <Navbar.Link active={path === "/my-bookings"}>
                <Link
                  className="text-white  text-base  hover:text-black"
                  to={"/my-bookings"}
                >
                  My bookings
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
                className="block text-white hover:text-black"
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

/**
 const Header = () => {
  const {isLoggedIn} = useAppContext();
  const path = useLocation().pathname;
  console.log(isLoggedIn);
  return (
    <header className="bg-teal-800 pb-10 pt-6 ">
      <Navbar className="bg-transparent">
        <Link to="/">
          <span className="text-lg sm:text-3xl tracking-tight whitespace-nowrap font-bold text-white">
            TravelMaker.com
          </span>
        </Link>
        <div className="flex gap-4 md:hidden items-center">
          <Button className="w-10 h-8 ml-auto mr-3 p-2 rounded-md bg-gray-200 dark:bg-gray-800" color="gray" pill>
            <FaMoon className="self-center" />
          </Button>
          <Navbar.Toggle />
        </div>

        <Navbar.Collapse>
          {isLoggedIn ? (
            <>
              <Navbar.Link
                active={path === "/my-bookings"}
                className="hover:bg-gray-400"
              >
                <Link className="text-white text-base" to={"/my-bookings"}>
                  My Bookings
                </Link>
              </Navbar.Link>
              <Navbar.Link
                active={path === "/my-hotels"}
                className="hover:bg-gray-400"
              >
                <Link className="text-white text-base" to={"/my-hotels"}>
                  My Hotels
                </Link>
              </Navbar.Link>
              <Navbar.Link className="hover:bg-gray-400">
                <SignOutButton />
              </Navbar.Link>
            </>
          ) : (
            <Navbar.Link active={path === "/"}>
              <Link className="text-white text-base" to={"/sign-in"}>
                Sign In
              </Link>
            </Navbar.Link>
          )}
        </Navbar.Collapse>
      </Navbar>
      <div className="container mx-auto  my-5">
        <span className=" text-2xl sm:text-3xl md:text-4xl font-semibold md:font-bold text-gray-400">
          Finding home away from home
        </span>
      </div>
    </header>
  );
};

export default Header;
 */

/**
 * 
 import {Link, useLocation} from "react-router-dom";
import {useAppContext} from "../contexts/AppContext";
import SignOutButton from "./SignOutButton";
import {FaMoon} from "react-icons/fa";
import {Button, Navbar} from "flowbite-react";

const Header = () => {
  const {isLoggedIn} = useAppContext();
  const path = useLocation().pathname;
  console.log(isLoggedIn);
  return (
    <header className="bg-teal-800 pb-10 pt-6 ">
      <Navbar fluid rounded className="bg-transparent ">
       
        <Navbar.Brand>
          <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
            TravelMaker.com
          </span>
        </Navbar.Brand>

        
        <button
          className="ml-auto mr-3 p-2 rounded-md bg-gray-200 dark:bg-gray-800"
          onClick={() => {
            // Handle theme toggle logic here
          }}
        >
          Toggle Theme
        </button>

       
        {isLoggedIn ? (
          <SignOutButton />
        ) : (
          <button className="mr-3 p-2 rounded-md bg-blue-500 text-white">
            <Link to={"/sign-in"}>Sign In</Link>
          </button>
        )}

        
        <Navbar.Toggle />

        <Navbar.Collapse>
          {isLoggedIn && (
            <>
              <Navbar.Link href="#">My Hotels</Navbar.Link>
              <Navbar.Link href="#">My Bookings</Navbar.Link>
              <Navbar.Link className="md:hidden" href="#">
                About us
              </Navbar.Link>
            </>
          )}
        </Navbar.Collapse>
      </Navbar>
    </header>
  );
};

export default Header;

 */
