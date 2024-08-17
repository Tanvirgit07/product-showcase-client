import { useContext, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../Provider/AuthProvider";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { toast } from "sonner";

const Login = () => {
  const { loginUser, googleLogin } = useContext(AuthContext);
  const [showPass, setShowPass] = useState(false);
  const [registerError, setRegisterError] = useState("");
  const location = useLocation();
  const navigate = useNavigate();
  const handleLogin = (e) => {
    e.preventDefault();
    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;
    console.log(email, password);
    setRegisterError("");

    loginUser(email, password)
      .then((result) => {
        console.log(result.user);
        navigate(location?.state ? location?.state : "/");
        toast.success("Login Successfully!");
        setTimeout(() => {
          navigate(location?.state ? location.state : "/");
        }, 2000);
      })
      .catch((error) => {
        console.log(error.message);
        setRegisterError(error.message);
      });
  };

  const handleGoogleIn = () => {
    googleLogin()
      .then((result) => {
        console.log(result.user);
        toast.success("Login Successfully!");
        setTimeout(() => {
          navigate(location?.state ? location.state : "/");
        }, 2000);
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  return (
    <div
      className="mt-2 mb-5 py-5"
      style={{
        backgroundImage:
          "url(https://i.ibb.co/6tSBKYN/triangles-1430105-1280.png)",
      }}
    >
      <div className="text-center my-2"></div>
      <div className="max-w-lg mx-auto border-solid border-2 border-indigo-600 px-8 py-10 rounded-xl shadow-2xl">
        <form onSubmit={handleLogin} className="">
          <div className="">
            <div className="mb-4">
              <p className="text-lg font-medium mb-1">Email</p>
              <label className="input input-bordered flex items-center gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 16 16"
                  fill="currentColor"
                  className="w-4 h-4 opacity-70"
                >
                  <path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
                  <path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
                </svg>
                <input
                  type="email"
                  className="grow"
                  name="email"
                  placeholder="Email"
                />
              </label>
            </div>
            <div className="relative">
              <p className="text-lg font-medium mb-1">Password</p>
              <label className="input input-bordered flex items-center gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 16 16"
                  fill="currentColor"
                  className="w-4 h-4 opacity-70"
                >
                  <path
                    fillRule="evenodd"
                    d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
                    clipRule="evenodd"
                  />
                </svg>
                <input
                  type={showPass ? "text" : "password"}
                  className="grow"
                  name="password"
                  placeholder="Password"
                />
              </label>
              <span
                className="absolute top-[46px] right-3 text-xl"
                onClick={() => setShowPass(!showPass)}
              >
                {showPass ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>
            {registerError && <p className="text-red-600">{registerError}</p>}
            <div className="my-3">
              <p>
                You have no account ?
                <Link to="/register">
                  <span className="text-lg font-semibold text-blue-800 btn btn-link">
                    Register
                  </span>
                </Link>
              </p>
            </div>
            <div>
              <button className="btn btn-active btn-primary w-full mb-3">
                Login
              </button>
            </div>
          </div>
        </form>

        <div className="divider divider-secondary text-lg font-bold">Login with</div>
        <div className="flex justify-center gap-10 mt-6">
          <div onClick={handleGoogleIn} className="w-10 h-10 cursor-pointer">
            <img
              src="https://i.ibb.co/LZ0c82V/google-1088004-1280.png"
              alt=""
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
