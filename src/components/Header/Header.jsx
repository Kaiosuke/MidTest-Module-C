import React, { useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import useAppContext from "../../hooks/useAppContext";
import { loginUser } from "../../reducer/actions";

const Header = () => {
  const { state, dispatch } = useAppContext();

  const { currentUser } = state;
  const nav = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    dispatch(loginUser(null));
    if (currentUser) {
      nav("/");
    }
  };

  // useEffect(() => {
  //   if (!currentUser) {
  //     nav("/");
  //   }
  // }, [currentUser]);

  const handleNotification = () => {
    if (!currentUser) {
      confirm("Vui lòng đăng nhập") && nav("/users/login");
    }
  };

  const handleIsAdmin = () => {
    if (currentUser && !currentUser.isAdmin) {
      alert("Bạn không phải là Admin Nên không xem được Products");
    } else {
      nav("/products");
    }
  };

  return (
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
            <li>
              <NavLink to="/">Home</NavLink>
            </li>
            <li>
              {currentUser ? (
                <div>
                  <div onClick={handleIsAdmin}>Products</div>
                </div>
              ) : (
                <div onClick={handleNotification}>product</div>
              )}
            </li>
          </ul>
        </div>
        <a className="btn btn-ghost text-xl">daisyUI</a>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">
          <li>
            <NavLink to="/">Home</NavLink>
          </li>
          <li>
            {currentUser ? (
              <div onClick={handleIsAdmin}>Products</div>
            ) : (
              <div onClick={handleNotification}>product</div>
            )}
          </li>
        </ul>
      </div>
      <div>
        {currentUser ? (
          <>
            <span>{currentUser.userName}</span>
            <button className="btn" onClick={handleLogout}>
              Logout
            </button>
          </>
        ) : (
          <NavLink to="/users/login" className="btn">
            Login
          </NavLink>
        )}
      </div>
    </div>
  );
};

export default Header;
