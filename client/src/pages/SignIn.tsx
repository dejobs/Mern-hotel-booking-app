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

const SignIn = () => {
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
    <div className="bg-gradient-to-br from-orange-500 to-gray-300 h-screen flex items-center justify-center">
      <div className=" bg-gradient-to-br from-gray-300 to-teal-700 rounded-lg p-6 sm:p-16  shadow-md border border-gray-200 w-[600px] h-[500px]">
        <h1 className="text-3xl font-semibold text-orange-500 border-b pb-2 border-gray-400">
          Welcome back!{" "}
          <span className="text-2xl text-black hidden sm:inline">
            to your account
          </span>
        </h1>
        <span className="text-black">Sign in to continue</span>

        <form className="flex flex-col mt-5 " onSubmit={onSubmit}>
          <label className="flex flex-col mb-4 ">
            Email
            <input
              className="border-b border-orange-500 p-2 focus:outline-none bg-transparent "
              {...register("email", {required: "This field is required"})}
              type="email"
              placeholder="Enter your email"
            />
            {errors.email && (
              <span className="text-red-600 ">{errors.email.message}</span>
            )}{" "}
          </label>

          <label className="flex flex-col mb-4">
            Password
            <input
              className="border-b border-gray-400 p-2 focus:outline-none bg-transparent"
              {...register("password", {
                required: "This field is required",
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters",
                },
              })}
              type="password"
              placeholder="Enter your password"
            />
            {errors.password && (
              <span className="text-red-600">{errors.password.message}</span>
            )}{" "}
          </label>

          <button
            disabled={mutation.isLoading}
            className="bg-orange-500 text-white rounded p-2 disabled:cursor-not-allowed"
            type="submit"
          >
            Sign In
          </button>
        </form>

        <p className="text-gray-700 mt-4 flex justify-center">
          Or continue with:
        </p>
        <div className="flex mt-2 items-center justify-center">
          <OAuth />
        </div>
        <span className="flex justify-center tracking-wide">
          Dont have an account?
          <Link className="text-white font-medium" to={"/sign-up"}>
            Signup here!
          </Link>
        </span>
      </div>
    </div>
  );
};

export default SignIn;
