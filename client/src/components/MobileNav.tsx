import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetTitle,
  SheetDescription,
} from "./ui/sheet";
import {Separator} from "./ui/separator";
import {Menu} from "lucide-react";
import {NavLink} from "react-router-dom";
import {useAppContext} from "../contexts/AppContext";
import SignOutButton from "./SignOutButton";
import {useQuery, useQueryClient} from "react-query";
import * as apiClient from "../api-client";

const MobileNav = () => {
  const {isLoggedIn} = useAppContext();
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

  return (
    <Sheet>
      <SheetTrigger>
        <Menu className="text-slate-800 dark:text-white" />
      </SheetTrigger>
      <SheetContent className="space-y-3 dark:bg-slate-600">
        <SheetTitle>
          <span>Welcome to TravelMaker</span>
        </SheetTitle>
        <Separator />
        <SheetDescription className="space-y-3">
          {isLoggedIn && (
            <div className="flex flex-col space-y-3">
              <NavLink
                className={({isActive}) =>
                  isActive
                    ? " text-lg p-1 bg-teal-300"
                    : " text-lg p-1  hover:text-orange-500 hover:bg-slate-200"
                }
                to={"/"}
              >
                Home
              </NavLink>
              <NavLink
                className={({isActive}) =>
                  isActive
                    ? "text-lg p-1  bg-teal-300"
                    : "text-lg p-1  hover:text-orange-500 hover:bg-slate-200"
                }
                to={"/my-hotels"}
              >
                My Hotels
              </NavLink>
              <NavLink
                className={({isActive}) =>
                  isActive
                    ? "text-lg p-1 bg-teal-300"
                    : "text-lg p-1  hover:text-orange-500 hover:bg-slate-200"
                }
                to={"/my-bookings"}
              >
                My bookings
              </NavLink>
              <NavLink
                className={({isActive}) =>
                  isActive ? "p-1 bg-teal-300" : "hover:bg-slate-200 p-1"
                }
                to={`/profile/${currentUser?._id}`}
              >
                <span className="">
                  <img
                    src={currentUser?.avatar}
                    className="object-center object-cover w-7 h-7 rounded-full"
                  />
                </span>
              </NavLink>
            </div>
          )}
          <div className="flex flex-col space-y-3">
            <NavLink
              className={({isActive}) =>
                isActive
                  ? "text-lg p-1 bg-teal-300"
                  : "text-lg p-1  hover:text-orange-500 hover:bg-slate-200"
              }
              to={"/about"}
            >
              About
            </NavLink>
            {isLoggedIn ? (
              <span className="text-lg p-1 hover:bg-slate-200">
                <SignOutButton />
              </span>
            ) : (
              <NavLink
                className="text-lg p-1  hover:text-orange-500 hover:bg-slate-200"
                to={`/sign-in`}
              >
                Sign In
              </NavLink>
            )}
          </div>
        </SheetDescription>
      </SheetContent>
    </Sheet>
  );
};

export default MobileNav;
