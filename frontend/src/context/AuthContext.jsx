import React, { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [authToken, setAuthToken] = useState(null);
  const [userEmail, setUserEmail] = useState("");
  const [userName, setUserName] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authCheckComplete, setAuthCheckComplete] = useState(false);

  useEffect(() => {
    // Load auth state from localStorage on mount
    const token = localStorage.getItem("authToken");
    const email = localStorage.getItem("userEmail");
    const name = localStorage.getItem("userName");

    if (token) {
      setAuthToken(token);
      setUserEmail(email);
      setUserName(name);
      setIsAuthenticated(true);
    }

    setAuthCheckComplete(true); // Mark check complete after loading
  }, []);

  const login = (token, email, name) => {
    // Save to localStorage
    localStorage.setItem("authToken", token);
    localStorage.setItem("userEmail", email);
    localStorage.setItem("userName", name);

    // Update context state
    setAuthToken(token);
    setUserEmail(email);
    setUserName(name);
    setIsAuthenticated(true);
  };

  const logout = () => {
    // Clear localStorage
    localStorage.removeItem("authToken");
    localStorage.removeItem("userEmail");
    localStorage.removeItem("userName");

    // Reset context state
    setAuthToken(null);
    setUserEmail("");
    setUserName("");
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider
      value={{
        authToken,
        userEmail,
        userName,
        isAuthenticated,
        authCheckComplete,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook for accessing AuthContext
export const useAuth = () => useContext(AuthContext);
