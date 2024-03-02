import {useMutation, useQueryClient} from "react-query";
import * as apiClient from "../api-client";
import {toast} from "react-toastify";

const SignOutButton = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation(apiClient.signout, {
    onSuccess: async () => {
      toast.success("Sign-out successfull", {className: "toast-message"});
      queryClient.invalidateQueries("validateToken");
    },
    onError: (error: Error) => {
      toast.error(error.message, {className: "toast-message"});
    },
  });

  const handleClick = async () => {
    mutation.mutate();
  };

  return (
    <button
      className="text-blue-600 px-3 font-semibold rounded bg-white hover:bg-gray-200"
      onClick={handleClick}
    >
      Sign Out
    </button>
  );
};

export default SignOutButton;
