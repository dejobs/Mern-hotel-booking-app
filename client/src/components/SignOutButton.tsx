import {useMutation, useQueryClient} from "react-query";
import * as apiClient from "../api-client";

const SignOutButton = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation(apiClient.signout, {
    onSuccess: async () => {
      queryClient.invalidateQueries("validateToken");
    },
    onError: async () => {
      queryClient.invalidateQueries("validateToken");
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
