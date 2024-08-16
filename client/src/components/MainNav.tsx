import {Link} from "react-router-dom";
import {useAppContext} from "../contexts/AppContext";
import SignOutButton from "./SignOutButton";
import {useQuery, useQueryClient} from "react-query";
import * as apiClient from "../api-client";

const MainNav = () => {
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
    <div className="flex justify-between items-center font-semibold space-x-4">
      <Link
        className="text-base   text-white hover:text-slate-400"
        to={"/about"}
      >
        About
      </Link>

      {isLoggedIn && (
        <Link
          className="text-base  text-white hover:text-slate-400"
          to={"/my-hotels"}
        >
          My Hotels
        </Link>
      )}

      {isLoggedIn && (
        <Link
          className="text-base   text-white hover:text-slate-400"
          to={"/my-bookings"}
        >
          My bookings
        </Link>
      )}

      {isLoggedIn && (
        <Link className="" to={`/profile/${currentUser?._id}`}>
          <span className="">
            <img
              src={currentUser?.avatar}
              className="object-center object-cover w-6 h-6 rounded-full hover:border-slate-400"
            />
          </span>
        </Link>
      )}

      {isLoggedIn ? (
        <span className="text-white font-semibold text-base">
          <SignOutButton />
        </span>
      ) : (
        <Link
          className="text-base font-semibold text-white  hover:text-slate-400"
          to={`/sign-in`}
        >
          Sign In
        </Link>
      )}
    </div>
  );
};

export default MainNav;
