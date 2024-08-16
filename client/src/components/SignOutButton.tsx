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
    <span
      className="text-lg hover:text-orange-500 md:hover:text-slate-400"
      onClick={handleClick}
    >
      Sign out
    </span>
  );
};

export default SignOutButton;
