import { useGoogleLogin } from "@react-oauth/google";
import { useDispatch } from "react-redux";
import { BsGoogle } from "react-icons/bs";
import { registerWithGoogle } from "../../redux/actions/authAction";
import { useNavigate } from "react-router-dom";

function GoogleLogin() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const loginWithGoogle = useGoogleLogin({
    onSuccess: (responseGoogle) =>
      dispatch(registerWithGoogle(responseGoogle.access_token, navigate)),

    onError: (errorResponse) => {
      alert(errorResponse.error_description);
    },
  });

  return (
    <div>
      <button
        onClick={loginWithGoogle}
        className="w-full mt-4 flex gap-2 justify-center items-center p-2 bg-primary text-white font-semibold rounded-xl transition-transform transform hover:-translate-y-1 duration-200 hover:bg-primary-dark"
      >
        <BsGoogle className="text-2xl" />
        Login with Google
      </button>
    </div>
  );
}

export default GoogleLogin;
