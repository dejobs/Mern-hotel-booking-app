import {useForm} from "react-hook-form";
import {useNavigate} from "react-router-dom";
import {useMutation, useQueryClient} from "react-query";
import {toast} from "react-toastify";
import * as apiClient from "../api-client";
import {Link, useLocation} from "react-router-dom";
import OAuth from "../components/OAuth";

export type SigninFormData = {
  email: string;
  password: string;
};

const signIn = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const queryClient = useQueryClient();

  const {
    register,
    handleSubmit,
    formState: {errors},
  } = useForm<SigninFormData>();

  const mutation = useMutation(apiClient.signin, {
    onSuccess: async () => {
      await queryClient.invalidateQueries("validateToken");
      navigate(location.state?.from?.pathname || "/");
      toast.success("Sign-in successful", {className: "toast-message"});
    },
    onError: async (error: Error) => {
      console.log("Login failed", error);
      toast.error("Login failed", {className: "toast-message-error"});
    },
  });

  const onSubmit = handleSubmit((data) => {
    mutation.mutate(data);
  });

  return (
    <div className="h-screen  grid grid-cols-[1fr_1fr]">
      <div className=" p-10 lg:p-20  bg-teal-500 rounded-l-lg text-gray-600 min-w-[50%] ">
        <h2 className=" text-4xl lg:text-6xl  font-bold mb-6 ">
          Welcome to <span className="text-slate-300">TravelMaker</span>
        </h2>
        <p className="text-xl  font-semibold py-4 ">
          Find your perfect stay with us
        </p>
        <p className="text-xl font-semibold py-4 truncate">
          Explore our collections of hotel and book your dream room
        </p>
      </div>
      <div className=" px-8 py-10 bg-white rounded-r-lg min-w-[50%]">
        <div className="flex flex-col gap-5 max-w-[500px] min-h-[500px] mx-auto rounded-md  shadow-md px-8 py-8 mb-4 bg-white">
          <h1 className="text-3xl font-bold self-center text-stone-900 ">
            User Login
          </h1>
          <form className="flex flex-col gap-5" onSubmit={onSubmit}>
            <label className="flex flex-col text-gray-700 font-semibold flex-1 text-sm">
              Email:
              <input
                className="border rounded w-full py-2 px-2 font-normal"
                {...register("email", {required: "This field is required"})}
                type="email"
              />
              {errors.email && (
                <span className="text-red-600">{errors.email.message}</span>
              )}
            </label>
            <label className="flex flex-col text-gray-700 font-semibold flex-1 text-sm">
              Password:
              <input
                className="border rounded w-full py-2 px-2 font-normal"
                {...register("password", {
                  required: "This field is required",
                  minLength: {
                    value: 6,
                    message: "Password must be at least 6 characters",
                  },
                })}
                type="password"
              />
              {errors.password && (
                <span className="text-red-600">{errors.password.message}</span>
              )}
            </label>
            <OAuth />
            <span className="flex justify-between items-center">
              <span className="text-sm">
                <span>
                  Dont have an account?{" "}
                  <Link
                    className="text-blue-900 underline font-medium"
                    to={"/sign-up"}
                  >
                    Signup here
                  </Link>
                </span>
              </span>

              <button
                type="submit"
                className=" shadow bg-gray-100 hover:opacity-95 text-blue-600 text-lg font-bold border rounded p-2"
              >
                Login
              </button>
            </span>
          </form>
        </div>
      </div>
    </div>
  );
};

export default signIn;
