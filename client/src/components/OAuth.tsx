import {GoogleAuthProvider, getAuth, signInWithPopup} from "firebase/auth";
import {app} from "../firebase";
import {useNavigate, useLocation} from "react-router-dom";
import * as apiClient from "../api-client";
import {useMutation} from "react-query";
import {toast} from "react-toastify";
import {FormDataType} from "../api-client";
import {useQueryClient} from "react-query";
import GoogleIcon from "../images/google_g_icon.png";

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
      className="disabled:cursor-not-allowed items-center"
    >
      <img src={GoogleIcon} alt="Google" className="w-10 h-10 " />
    </button>
  );
};

export default OAuth;
