import {useForm} from "react-hook-form";
import {useMutation, useQueryClient} from "react-query";
import * as apiClient from "../api-client";
import {useNavigate} from "react-router-dom";
import {toast} from "react-toastify";
import OAuth from "../components/OAuth";

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
    <div className=" h-screen  grid grid-cols-[1fr_1fr]">
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
      <div className="px-8 py-12 bg-white rounded-r-lg min-w-[50%]">
        <div className="flex flex-col gap-5 max-w-[500px] min-h-[500px] shadow-md px-8 py-8 mx-auto">
          <h1 className="text-3xl font-bold self-center"> Create an Account</h1>
          <form onSubmit={onSubmit} className="flex flex-col gap-5">
            <div className="flex flex-col md:flex-row gap-5">
              <label className="flex flex-col text-gray-700 font-semibold flex-1 text-sm">
                First Name:
                <input
                  className="border rounded w-full py-1 px-2 font-normal"
                  {...register("firstName", {
                    required: "This field is required",
                  })}
                  type="text"
                />
                {errors.firstName && (
                  <span className="text-red-600">
                    {errors.firstName.message}
                  </span>
                )}
              </label>
              <label className="flex flex-col text-gray-700 font-semibold flex-1 text-sm">
                Last Name:
                <input
                  className="border rounded w-full py-1 px-2 font-normal"
                  {...register("lastName", {
                    required: "This field is required",
                  })}
                  type="text"
                />
                {errors.lastName && (
                  <span className="text-red-600">
                    {errors.lastName.message}
                  </span>
                )}
              </label>
            </div>
            <label className="flex flex-col text-gray-700 font-semibold flex-1 text-sm">
              Email:
              <input
                className="border rounded w-full py-1 px-2 font-normal"
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
                className="border rounded w-full py-1 px-2 font-normal"
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
            <label className="flex flex-col text-gray-700 font-semibold flex-1 text-sm">
              Confirm password:
              <input
                className="border rounded w-full py-1 px-2 font-normal"
                {...register("confirmPassword", {
                  validate: (val) => {
                    if (!val) {
                      return "This field is required";
                    } else if (watch("password") !== val) {
                      return "Your passwords do not match";
                    }
                  },
                })}
                type="password"
              />
              {errors.confirmPassword && (
                <span className="text-red-600">
                  {errors.confirmPassword.message}
                </span>
              )}
            </label>
            <button
              type="submit"
              className=" shadow bg-gray-100 hover:opacity-95 text-blue-600 text-lg font-bold border rounded p-2 w-full "
            >
              Create Account
            </button>
            <OAuth />
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
