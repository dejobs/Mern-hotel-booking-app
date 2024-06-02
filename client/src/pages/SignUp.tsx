import {useForm} from "react-hook-form";
import {useMutation, useQueryClient} from "react-query";
import * as apiClient from "../api-client";
import {useNavigate} from "react-router-dom";
import {toast} from "react-toastify";
import OAuth from "../components/OAuth";
import {Link} from "react-router-dom";
import image from "../images/sign-in-page-background.jpg";

export type SignupFormData = {
  firstName: string;
  lastName: string;
  email: string;
  password?: string;
  confirmPassword?: string;
};
const SignUp = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const {
    register,
    watch,
    handleSubmit,
    formState: {errors},
  } = useForm<SignupFormData>();

  const mutation = useMutation(apiClient.signup, {
    onSuccess: async () => {
      toast.success("Sign-up successful", {className: "toast-message"});
      await queryClient.invalidateQueries("validateToken");
      navigate("/");
    },
    onError: (error: Error) => {
      console.log(error.message);
      toast.error(error.message, {className: "toast-message-error"});
    },
  });

  const onSubmit = handleSubmit((data) => {
    mutation.mutate(data);
  });

  return (
    <div
      className="bg-cover bg-center bg-fixed h-screen flex items-center justify-center "
      style={{backgroundImage: `url(${image})`}}
    >
      <div className=" bg-gradient-to-br from-gray-300 via-gray-300  to-teal-700 rounded-lg py-6 px-6 sm:px-16  shadow-md border border-gray-200 w-[600px] h-fit sm:h-[600px]">
        <h1 className="text-3xl font-semibold text-orange-500 border-b pb-1 border-gray-400">
          Create an Account!
        </h1>

        <form className="flex flex-col mt-5 " onSubmit={onSubmit}>
          <div className="flex flex-col sm:flex-row sm:gap-5">
            <label className="flex flex-col mb-4 flex-1 font-semibold ">
              First Name
              <input
                className="font-normal border-0 border-b border-orange-500 px-2 py-1 outline-none focus:border-orange-500 focus:ring-0 bg-transparent "
                {...register("firstName", {required: "This field is required"})}
                type="text"
                placeholder="Enter your first name"
              />
              {errors.firstName && (
                <span className="text-red-600 text-xs truncate font-normal">
                  {errors.firstName.message}
                </span>
              )}{" "}
            </label>
            <label className="flex flex-col mb-4 flex-1 font-semibold">
              Last Name
              <input
                className="font-normal border-0 border-b border-orange-500 px-2 py-1 outline-none focus:border-orange-500 focus:ring-0 bg-transparent  "
                {...register("lastName", {required: "This field is required"})}
                type="text"
                placeholder="Enter your last name"
              />
              {errors.lastName && (
                <span className="text-red-600 text-xs truncate font-normal">
                  {errors.lastName.message}
                </span>
              )}{" "}
            </label>
          </div>

          <label className="flex flex-col mb-4 font-semibold ">
            Email
            <input
              className="font-normal border-0 border-b border-orange-500 px-2 py-1 outline-none focus:border-orange-500 focus:ring-0 bg-transparent  "
              {...register("email", {required: "This field is required"})}
              type="email"
              placeholder="Enter your email"
            />
            {errors.email && (
              <span className="text-red-600 text-xs truncate font-normal">
                {errors.email.message}
              </span>
            )}{" "}
          </label>

          <label className="flex flex-col mb-4 font-semibold">
            Password
            <input
              className="font-normal border-0 border-b border-orange-500 px-2 py-1 outline-none focus:border-orange-500 focus:ring-0 bg-transparent "
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
              <span className="text-red-600 text-xs truncate font-normal">
                {errors.password.message}
              </span>
            )}{" "}
          </label>
          <label className="flex flex-col mb-4 font-semibold">
            Confirm password
            <input
              className="font-normal border-0 border-b border-orange-500 px-2 py-1 outline-none focus:border-orange-500 focus:ring-0 bg-transparent"
              {...register("confirmPassword", {
                required: "This field is required",
                validate: (val) => {
                  if (!val) {
                    return "This field is required";
                  } else if (watch("password") !== val) {
                    return "Your passwords do not match";
                  }
                },
              })}
              type="password"
              placeholder="Enter your password"
            />
            {errors.password && (
              <span className="text-red-600 text-xs truncate font-normal">
                {errors.password.message}
              </span>
            )}{" "}
          </label>

          <button
            disabled={mutation.isLoading}
            className="bg-orange-500 text-white rounded p-2 disabled:cursor-not-allowed"
            type="submit"
          >
            Sign Up
          </button>
        </form>

        <p className="text-gray-700 mt-2 flex justify-center">
          Or continue with:
        </p>
        <div className="flex mt-1 items-center justify-center">
          <OAuth />
        </div>
        <span className="flex justify-center tracking-wide">
          Have an account?
          <Link className="text-white font-medium ml-2" to={"/sign-in"}>
            Signin here!
          </Link>
        </span>
      </div>
    </div>
  );
};

export default SignUp;
