import {useForm} from "react-hook-form";
import {useEffect} from "react";
import {useMutation, useQueryClient, useQuery} from "react-query";
import * as apiClient from "../api-client";
import {toast} from "react-toastify";
import {useParams} from "react-router-dom";

type UserProfileFormData = {
  password?: string;
  confirmPassword?: string;
  firstName: string;
  lastName: string;
  email: string;
  avatar?: FileList;
};

const Profile = () => {
  const {userId} = useParams();
  const queryClient = useQueryClient();

  const {data: currentUser} = useQuery(
    "fetchUser",
    apiClient.fetchCurrentUser,
    {
      onSuccess: async () => {
        await queryClient.invalidateQueries("fetchUser");
      },
    }
  );

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: {errors},
  } = useForm<UserProfileFormData>();

  useEffect(() => {
    if (currentUser) {
      setValue("firstName", currentUser.firstName);
      setValue("lastName", currentUser.lastName);
      setValue("email", currentUser.email);
    }
  }, [currentUser, setValue]);

  const {mutate} = useMutation(apiClient.updateProfile, {
    onSuccess: async () => {
      toast.success("Updated", {className: "toast-message"});
      await queryClient.invalidateQueries("validateToken");
    },
    onError: async () => {
      toast.error("Update failed", {className: "toast-message-error"});
      await queryClient.invalidateQueries("validateToken");
    },
  });

  const onSubmit = handleSubmit((formDataJson: UserProfileFormData) => {
    const formData = new FormData();
    if (userId) {
      formData.append("userId", userId);
    }

    formData.append("firstName", formDataJson.firstName);
    formData.append("lastName", formDataJson.lastName);
    formData.append("email", formDataJson.email);

    if (formDataJson.password && formDataJson.password.length > 6) {
      formData.append("password", formDataJson.password);
    }

    if (formDataJson.avatar && Array.from(formDataJson.avatar).length === 1) {
      Array.from(formDataJson.avatar).forEach((image) =>
        formData.append(`avatar`, image)
      );
    }

    mutate(formData);
  });

  return (
    <div className="mt-[20px]">
      <form
        onSubmit={onSubmit}
        className="max-w-[500px] mx-auto  p-10 bg-gradient-to-bl from-white via-slate-100 to-white rounded"
      >
        <div className="flex flex-col justify-center items-center">
          <div>
            {currentUser && (
              <img
                src={currentUser.avatar}
                alt="profile image"
                className="rounded-full object-cover object-center w-24 h-24"
              />
            )}
          </div>
          <input
            type="file"
            accept="image/*"
            className="w-full mb-2 px-2 py-1"
            {...register("avatar")}
          />
        </div>
        <label className="text-sm gap-2">
          First Name
          <input
            type="text"
            placeholder="First Name"
            {...register("firstName")}
            readOnly
            className="w-full mb-2 px-2 py-1 border rounded"
          />
        </label>
        <label className="text-sm gap-2">
          Last Name
          <input
            type="text"
            placeholder="Last Name"
            {...register("lastName")}
            readOnly
            className="w-full mb-2 px-2 py-1 border rounded"
          />
        </label>
        <label className="text-sm gap-2">
          Email
          <input
            type="email"
            placeholder="Email"
            {...register("email", {required: "This field is required"})}
            className="w-full mb-2 px-2 py-1 border rounded"
          />
        </label>
        <label className="text-sm gap-2">
          New Password
          <input
            type="password"
            placeholder="Password"
            {...register("password", {
              minLength: {
                value: 6,
                message: "Password must be atleast 6 characters",
              },
            })}
            className="w-full mb-2 px-2 py-1 border rounded"
          />
          <span className="text-red-500">
            {errors.password && errors.password.message}
          </span>
        </label>
        <label className="text-sm gap-2">
          Confirm New Password
          <input
            type="password"
            placeholder="Password"
            {...register("confirmPassword", {
              validate: (val) => {
                if (watch("password") !== val) {
                  return "Passwords do not match";
                }
              },
            })}
            className="w-full mb-2 px-2 py-1 border rounded"
          />
          <span className="text-red-500">
            {errors.confirmPassword && errors.confirmPassword.message}
          </span>
        </label>

        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 mt-5"
        >
          Update Profile
        </button>
      </form>
    </div>
  );
};

export default Profile;
