import {GoogleAuthProvider, getAuth, signInWithPopup} from "firebase/auth";
import {app} from "../firebase";
import {useNavigate, useLocation} from "react-router-dom";
import * as apiClient from "../api-client";
import {useMutation} from "react-query";
import {toast} from "react-toastify";
import {FormDataType} from "../api-client";
import {useQueryClient} from "react-query";

const OAuth = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const queryClient = useQueryClient();

  const {mutate, isLoading} = useMutation(apiClient.google, {
    onSuccess: async () => {
      await queryClient.invalidateQueries("validateToken");
      navigate(location.state?.from?.pathname || "/");
      toast.success("Sign-up successful", {className: "toast-message"});
    },
    onError: (error: Error) => {
      toast.error(error.message, {className: "toast-message-error"});
    },
  });

  const handleGoogleClick = async () => {
    const provider = new GoogleAuthProvider();
    const auth = getAuth(app);

    const result = await signInWithPopup(auth, provider);

    const {user} = result;

    const formData: FormDataType = {
      name: user.displayName,
      email: user.email,
      photo: user.photoURL,
    };

    mutate(formData);
  };

  return (
    <button
      disabled={isLoading}
      onClick={handleGoogleClick}
      type="button"
      className="bg-red-500 text-white p-2 rounded-md uppercase hover:opacity-95 font-normal"
    >
      continue with google
    </button>
  );
};

export default OAuth;
