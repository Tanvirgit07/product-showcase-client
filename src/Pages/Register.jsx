import { useContext, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Toaster, toast } from "sonner";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { AuthContext } from "../Provider/AuthProvider";

const Register = () => {
    const { createUser, setUser, updateUserProfile,googleLogin,setReload } =
    useContext(AuthContext);
  const [registerError, setRegisterError] = useState("");
  const [showPass, setShowPass] = useState(false);
  const navigate = useNavigate()
  const location = useLocation()
  
  const handleRegister = (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    const photo = form.photo.value;
    const email = form.email.value;
    const password = form.password.value;

    const register = {
      name,
      photo,
      email,
      password,
    };
    console.log(register);

    createUser(email, password)
      .then((result) => {
        console.log(result.user);
        updateUserProfile(name, photo).then(() => {
          setUser(result.user);
          setReload(true);
          toast.success("Register Successfully!");
          setTimeout(() => {
            navigate(location?.state ? location.state : "/");
          }, 2000);
        });
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
      className="hero min-h-[100vh] mx-auto"
      style={{
        backgroundImage:
          "url(https://i.ibb.co/6tSBKYN/triangles-1430105-1280.png)",
      }}
    >
      <div className="hero-overlay bg-opacity-60"></div>
      <div className="card shrink-0 w-full max-w-2xl shadow-2xl bg-base-100">
        <form onSubmit={handleRegister} className="card-body">
          <div className="grid lg:grid-cols-2 gap-4">
            <div className="form-control">
              <label className="label">
                <span className="label-text">Name</span>
              </label>
              <input
                type="text"
                name="name"
                placeholder="User Name"
                className="input input-bordered"
              />
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text">PhotoURL</span>
              </label>
              <input
                type="text"
                name="photo"
                placeholder="PhotoURL"
                className="input input-bordered"
              />
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                type="email"
                name="email"
                placeholder="email"
                className="input input-bordered"
                required
              />
            </div>

            <div className="form-control mt-4 relative">
            <p className="ml-1 mb-1">Password</p>
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
                name="password"
                className="grow"
                placeholder="*******"
              />
            </label>
          </div>
          <span
            className="absolute right-[45px] lg:mt-[158px] mt-[360px] text-xl"
            onClick={() => setShowPass(!showPass)}
          >
            {showPass ? <FaEyeSlash /> : <FaEye />}
          </span>
            {registerError && <p className="text-red-600">{registerError}</p>}
          </div>
          <div className="form-control mt-6">
            <button className="btn btn-primary">Register</button>
          </div>
          <div>
            <p>
              You have an account?
              <Link to="/login" className="link link-primary">
                Login
              </Link>
            </p>
          </div>
        </form>
        <div className="divider divider-secondary">Login with</div>
        <div onClick={handleGoogleIn} className="w-9/12 mx-auto flex justify-center">
          <button className="btn w-full mb-8 mt-4">
            <img
              className="w-10 h-10"
              src="https://i.ibb.co/Jz90snM/google.png"
              alt=""
            />
            Google Login
          </button>
        </div>
      </div>
      <Toaster richColors position="top-right" />
    </div>
  );
};

export default Register;
