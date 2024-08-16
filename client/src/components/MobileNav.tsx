import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetTitle,
  SheetDescription,
} from "./ui/sheet";
import {Separator} from "./ui/separator";
import {Menu} from "lucide-react";
import {Link} from "react-router-dom";
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
        <Menu className="text-slate-800" />
      </SheetTrigger>
      <SheetContent className="space-y-3">
        <SheetTitle>
          <span>Welcome to TravelMaker</span>
        </SheetTitle>
        <Separator />
        <SheetDescription className="space-y-3">
          {isLoggedIn && (
            <div className="flex flex-col space-y-3">
              <Link className=" text-lg  hover:text-orange-500" to={"/"}>
                Home
              </Link>
              <Link
                className="text-lg  hover:text-orange-500"
                to={"/my-hotels"}
              >
                My Hotels
              </Link>
              <Link
                className="text-lg  hover:text-orange-500"
                to={"/my-bookings"}
              >
                My bookings
              </Link>
              <Link className="" to={`/profile/${currentUser?._id}`}>
                <span className="">
                  <img
                    src={currentUser?.avatar}
                    className="object-center object-cover w-7 h-7 rounded-full"
                  />
                </span>
              </Link>
            </div>
          )}
          <div className="flex flex-col space-y-3">
            <Link className="text-lg  hover:text-orange-500" to={"/about"}>
              About
            </Link>
            {isLoggedIn ? (
              <SignOutButton />
            ) : (
              <Link className="text-lg  hover:text-orange-500" to={`/sign-in`}>
                Sign In
              </Link>
            )}
          </div>
        </SheetDescription>
      </SheetContent>
    </Sheet>
  );
};

export default MobileNav;
