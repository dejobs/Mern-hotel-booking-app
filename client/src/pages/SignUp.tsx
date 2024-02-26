import {useForm} from "react-hook-form";
import {useMutation} from "react-query";
import * as apiClient from "../api-client";
import {useNavigate} from "react-router-dom";
import {toast} from "react-toastify";

export type SignupFormData = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
};

const SignUp = () => {
  const navigate = useNavigate();

  const {
    register,
    watch,
    handleSubmit,
    formState: {errors},
  } = useForm<SignupFormData>();

  const mutation = useMutation(apiClient.signup, {
    onSuccess: () => {
      console.log("registartion successful!");
      navigate("/sign-in");
      toast.success("Sign-up sucessfull");
    },
    onError: (error: Error) => {
      console.log(error.message);
    },
  });

  const onSubmit = handleSubmit((data) => {
    mutation.mutate(data);
  });

  return (
    <div className=" container mx-auto flex flex-col gap-5 py-6">
      <h1 className="text-3xl font-semibold"> Create an Account</h1>
      <form onSubmit={onSubmit} className="flex flex-col gap-5">
        <div className="flex flex-col md:flex-row gap-5">
          <label className="flex flex-col text-gray-700 font-semibold flex-1 text-sm">
            First Name:
            <input
              className="border rounded w-full py-1 px-2 font-normal"
              {...register("firstName", {required: "This field is required"})}
              type="text"
            />
            {errors.firstName && (
              <span className="text-red-600">{errors.firstName.message}</span>
            )}
          </label>
          <label className="flex flex-col text-gray-700 font-semibold flex-1 text-sm">
            Last Name:
            <input
              className="border rounded w-full py-1 px-2 font-normal"
              {...register("lastName", {required: "This field is required"})}
              type="text"
            />
            {errors.lastName && (
              <span className="text-red-600">{errors.lastName.message}</span>
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
          className=" shadow bg-gray-100 hover:opacity-95 text-blue-600 text-lg font-semibold border rounded p-2 max-w-md "
        >
          Create Account
        </button>
      </form>
    </div>
  );
};

export default SignUp;
