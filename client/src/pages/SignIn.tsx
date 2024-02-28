import {useForm} from "react-hook-form";
import {useNavigate} from "react-router-dom";
import {useMutation} from "react-query";
import {toast} from "react-toastify";
import * as apiClient from "../api-client";

export type SigninFormData = {
  email: string;
  password: string;
};

const signIn = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: {errors},
  } = useForm<SigninFormData>();

  const mutation = useMutation(apiClient.signin, {
    onSuccess: async () => {
      navigate("/");
      toast.success("Sign-up successfull", {className: "toast-message"});
    },
    onError: async () => {
      console.log("Login failed");
      toast.error("Login failed", {className: "toast-message-error"});
    },
  });

  const onSubmit = handleSubmit((data) => {
    mutation.mutate(data);
  });

  return (
    <div className="container mx-auto flex flex-col gap-5 py-6">
      <h1 className="text-3xl font-bold">Sign in</h1>
      <form className="flex flex-col gap-5" onSubmit={onSubmit}>
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
        <button
          type="submit"
          className=" shadow bg-gray-100 hover:opacity-95 text-blue-600 text-lg font-bold border rounded p-2 max-w-md "
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default signIn;
