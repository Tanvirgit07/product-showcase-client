import { Link } from "react-router-dom";
import { AuthContext } from "../Provider/AuthProvider";
import { useContext } from "react";
import { MdLogin, MdLogout } from "react-icons/md";
import { RiSearchEyeFill } from "react-icons/ri";

const Nav = () => {
  const { user } = useContext(AuthContext);
  const { userLogout } = useContext(AuthContext);

  const handleLogout = () => {
    userLogout()
      .then(() => {
        console.log("successfully logOut!");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div>
      <div className="navbar bg-base-100">
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
            >
              <li className="text-lg font-semibold">
                <Link to="/product">Products</Link>
              </li>
              <li className="text-lg font-semibold">
                <Link to='/add-items'>Add Item</Link>
              </li>
              <li className="text-lg font-semibold">
                <Link>Blogs</Link>
              </li>
            </ul>
          </div>
          <div className="relative">
            <p className="text-xl font-bold text-pink-600">Ponno Khuji</p>
            <div>
              <RiSearchEyeFill className="absolute top-0 -right-6 text-2xl text-green-500 font-bold" />
            </div>
          </div>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">
            <li className="text-lg font-semibold">
              <Link to="/product">Products</Link>
            </li>
            <li className="text-lg font-semibold">
              <Link to='/add-items'>Add Item</Link>
            </li>
            <li className="text-lg font-semibold">
              <Link to='/user'>Users</Link>
            </li>
          </ul>
        </div>

        <div className="navbar-end">
          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar mr-4 mt-1"
            >
              {user ? (
                <div className="w-14 rounded-full">
                  <img
                    alt="Tailwind CSS Navbar component"
                    src={user.photoURL}
                  />
                </div>
              ) : (
                <div className="w-14 rounded-full">
                  <img
                    alt="Tailwind CSS Navbar component"
                    src="https://i.ibb.co/prcjd2h/blank-profile-picture-973460-1280.png"
                  />
                </div>
              )}
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
            >
              {user ? (
                <li>
                  <Link
                    className="text-xl font-bold flex items-center"
                    to="/login"
                  >
                    <div onClick={handleLogout} className="flex gap-1">
                      <p>Logout</p>
                      <p className="text-2xl text-red-600 font-bold mt-1">
                        <MdLogout />
                      </p>
                    </div>
                  </Link>
                </li>
              ) : (
                <li>
                  <Link
                    className="text-xl font-bold flex items-center"
                    to="/login"
                  >
                    <div className="flex gap-1">
                      <p>Login</p>
                      <p className="text-2xl text-green-500 font-bold mt-1">
                        <MdLogin />
                      </p>
                    </div>
                  </Link>
                </li>
              )}
            </ul>
          </div>
          <Link to="/login">
            <button className="btn btn-outline btn-info text-lg">Login</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Nav;
