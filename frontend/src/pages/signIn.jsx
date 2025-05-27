import React, { useState } from "react";
import { useNavigate, NavLink } from "react-router-dom";

const SignInPage = () => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    firstName: "",
    lastName: "",
    phone: "",
  });

  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const toggleMode = () => {
    setIsSignUp((prev) => !prev);
    setFormData({
      email: "",
      password: "",
      confirmPassword: "",
      firstName: "",
      lastName: "",
      phone: "",
    });
    setShowPassword(false);
    setRememberMe(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isSignUp && formData.password !== formData.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    try {
      const url = isSignUp
        ? "http://localhost:8080/auth/signup"
        : "http://localhost:8080/auth/login";

      const body = isSignUp
        ? {
            name:
              formData.firstName.trim() + " " + formData.lastName.trim(),
            email: formData.email,
            password: formData.password,
          }
        : {
            email: formData.email,
            password: formData.password,
          };

      const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      let data;
      try {
        data = await response.json();
      } catch {
        alert("Received invalid response from server.");
        return;
      }

      if (response.ok) {
        alert(
          isSignUp
            ? "Sign up successful! You can now sign in."
            : "Sign in successful!"
        );

        if (!isSignUp && data.jwtToken) {
          localStorage.setItem("authToken", data.jwtToken);
          localStorage.setItem("userEmail", data.email);
          localStorage.setItem("userName", data.name);
          navigate("/");
        }

        setFormData({
          email: "",
          password: "",
          confirmPassword: "",
          firstName: "",
          lastName: "",
          phone: "",
        });

        if (isSignUp) setIsSignUp(false);
      } else {
        alert(data.message || (isSignUp ? "Sign up failed" : "Sign in failed"));
      }
    } catch (error) {
      alert("Network error: " + error.message);
    }
  };

  return (
    <div
      className="container-fluid"
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
      }}
    >
      <div
        className="row justify-content-center align-items-center"
        style={{ minHeight: "100vh" }}
      >
        <div className="col-lg-5 col-md-7 col-sm-9">
          <div className="card shadow-lg border-0">
            <div className="card-body p-5">
              <div className="text-center mb-4">
                <div className="mb-3">
                  <NavLink to="/">
                    <img
                      src="/assets/img/Raj logo.jpg"
                      alt="Logo"
                      style={{
                        width: "80px",
                        height: "90px",
                        borderRadius: "70%",
                        objectFit: "cover",
                      }}
                    />
                  </NavLink>
                </div>

                <h2 className="text-primary mb-2">
                  {isSignUp ? "Create Account" : "Welcome Back"}
                </h2>
                <p className="text-muted">
                  {isSignUp
                    ? "Join our car marketplace today"
                    : "Sign in to your account"}
                </p>
              </div>

              <form onSubmit={handleSubmit}>
                {isSignUp && (
                  <div className="row mb-3">
                    <div className="col-md-6">
                      <label className="form-label text-dark">
                        First Name *
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleInputChange}
                        placeholder="John"
                        required
                      />
                    </div>
                    <div className="col-md-6">
                      <label className="form-label text-dark">
                        Last Name *
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleInputChange}
                        placeholder="Doe"
                        required
                      />
                    </div>
                  </div>
                )}

                <div className="mb-3">
                  <label className="form-label text-dark">Email Address *</label>
                  <input
                    type="email"
                    className="form-control"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="john@example.com"
                    required
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label text-dark">Password *</label>
                  <div className="input-group">
                    <input
                      type={showPassword ? "text" : "password"}
                      className="form-control"
                      name="password"
                      value={formData.password}
                      onChange={handleInputChange}
                      placeholder="Enter your password"
                      required
                    />
                    <button
                      type="button"
                      className="btn btn-outline-secondary"
                      onClick={() => setShowPassword(!showPassword)}
                      aria-label={
                        showPassword ? "Hide password" : "Show password"
                      }
                    >
                      {showPassword ? "🙈" : "👁️"}
                    </button>
                  </div>
                </div>

                {isSignUp && (
                  <div className="mb-3">
                    <label className="form-label text-dark">
                      Confirm Password *
                    </label>
                    <input
                      type="password"
                      className="form-control"
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleInputChange}
                      placeholder="Confirm your password"
                      required
                    />
                  </div>
                )}

                {!isSignUp && (
                  <div className="d-flex justify-content-between align-items-center mb-4">
                    <div className="form-check text-dark">
                      <input
                        type="checkbox"
                        className="form-check-input"
                        id="rememberMe"
                        checked={rememberMe}
                        onChange={(e) => setRememberMe(e.target.checked)}
                      />
                      <label
                        className="form-check-label"
                        htmlFor="rememberMe"
                      >
                        Remember me
                      </label>
                    </div>
                    <button
                      type="button"
                      className="btn btn-link p-0 text-decoration-none"
                    >
                      Forgot password?
                    </button>
                  </div>
                )}

                <button
                  type="submit"
                  className="btn btn-primary btn-lg w-100 mb-4"
                >
                  {isSignUp ? "Create Account" : "Sign In"}
                </button>
              </form>

              <div className="text-center">
                <p className="text-muted mb-0">
                  {isSignUp
                    ? "Already have an account?"
                    : "Don't have an account?"}{" "}
                  <button
                    type="button"
                    className="btn btn-link p-0 ms-1 text-decoration-none"
                    onClick={toggleMode}
                  >
                    {isSignUp ? "Sign In" : "Sign Up"}
                  </button>
                </p>
              </div>
            </div>
          </div>

          <div className="text-center mt-4">
            <p className="text-white-50 small">
              By signing up, you agree to our{" "}
              <button
                type="button"
                className="btn btn-link p-0 ms-1 text-white text-decoration-underline small"
              >
                Terms of Service
              </button>{" "}
              and{" "}
              <button
                type="button"
                className="btn btn-link p-0 ms-1 text-white text-decoration-underline small"
              >
                Privacy Policy
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignInPage;
