import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  // Check login state on mount
  useEffect(() => {
    const token = localStorage.getItem("authToken");
    setIsLoggedIn(!!token);
  }, []);

  // Optional: Logout handler
  const handleLogout = () => {
    localStorage.removeItem("authToken");
    setIsLoggedIn(false);
    navigate("/signin");
  };

  return (
    <nav className="navbar navbar-expand-lg bg-white shadow-sm py-3">
      <div className="container">
        {/* Logo + Brand */}
        <NavLink to="/" className="navbar-brand d-flex align-items-center">
          <img
            src="/assets/img/Raj logo.jpg"
            alt="Logo"
            style={{
              width: "80px",
              height: "90px",
              borderRadius: "70%",
              objectFit: "cover",
              marginRight: "10px",
            }}
          />
          <span className="brand-3d-text">Drive BY Raj</span>
        </NavLink>

        {/* Toggle Button */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#NavbarIcon"
          aria-controls="NavbarIcon"
          aria-expanded="false"
          aria-label="Toggle navigation"
          style={{ borderColor: "black" }}
        >
          <span
            className="navbar-toggler-icon"
            style={{
              backgroundImage:
                "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 30 30'%3E%3Cpath stroke='black' stroke-width='2' d='M4 7h22M4 15h22M4 23h22'/%3E%3C/svg%3E\")",
            }}
          ></span>
        </button>

        {/* Nav Links */}
        <div className="collapse navbar-collapse" id="NavbarIcon">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <NavLink to="/upcoming-cars" className="nav-link text-dark px-3">
                🌿 Eco Cars
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/new-cars" className="nav-link text-dark px-3">
                🖼️ 3D Gallery
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/sell" className="nav-link text-dark px-3">
                💼 Sell Your Car
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/support" className="nav-link text-dark px-3">
                📞 Support
              </NavLink>
            </li>

            {isLoggedIn ? (
              <>
                <li className="nav-item">
                  <NavLink to="/my-account" className="nav-link text-dark px-3">
                    👤 My Account
                  </NavLink>
                </li>
                <li className="nav-item">
                  <button
                    className="nav-link text-dark px-3 btn btn-link"
                    style={{ textDecoration: "none" }}
                    onClick={handleLogout}
                  >
                    🚪 Logout
                  </button>
                </li>
              </>
            ) : (
              <li className="nav-item">
                <NavLink to="/signin" className="nav-link text-dark px-3">
                  👤 Sign In
                </NavLink>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
