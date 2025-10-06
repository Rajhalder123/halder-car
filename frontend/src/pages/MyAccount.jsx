import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const MyAccount = () => {
  const {
    userName,
    userEmail,
    logout,
    login,
    authToken,
    isAuthenticated,
    authCheckComplete,
  } = useAuth();

  const navigate = useNavigate();
  const [editMode, setEditMode] = useState(false);
  const [nameInput, setNameInput] = useState(userName);

  useEffect(() => {
    if (authCheckComplete && !isAuthenticated) {
      navigate("/signin");
    }
  }, [authCheckComplete, isAuthenticated, navigate]);

  const toggleEdit = () => {
    setEditMode((prev) => {
      if (!prev) setNameInput(userName);
      return !prev;
    });
  };

  const saveName = () => {
    if (!nameInput.trim()) {
      alert("Name can't be empty!");
      return;
    }
    login(authToken, userEmail, nameInput);
    setEditMode(false);
  };

  const handleLogout = () => {
    logout();
    navigate("/signin");
  };

  if (!authCheckComplete) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-600 to-green-800">
        <h2 className="text-white text-xl font-semibold">Loading your account...</h2>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-600 to-green-800 px-4">
      <div className="bg-white text-gray-800 w-full max-w-md p-6 rounded-xl shadow-2xl">
        <h2 className="text-2xl font-bold mb-2 text-center">Welcome, {userName} 👋</h2>
        <p className="text-gray-600 mb-6 text-center">
          This is your personal account page where you can view and update your profile information.
        </p>

        <div className="mb-6">
          <h3 className="font-semibold mb-1">Profile Information</h3>
          {!editMode ? (
            <p className="mb-2">
              <strong>Name:</strong> {userName}{" "}
              <button onClick={toggleEdit} className="ml-2 text-sm bg-green-600 text-white px-2 py-1 rounded hover:bg-green-700">
                Edit
              </button>
            </p>
          ) : (
            <>
              <input
                type="text"
                value={nameInput}
                onChange={(e) => setNameInput(e.target.value)}
                className="w-full border border-gray-300 rounded px-3 py-2 mb-2"
              />
              <div>
                <button
                  onClick={saveName}
                  className="mr-2 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
                >
                  Save
                </button>
                <button
                  onClick={toggleEdit}
                  className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                >
                  Cancel
                </button>
              </div>
            </>
          )}
          <p>
            <strong>Email:</strong> {userEmail}
          </p>
        </div>

        <div className="mb-6">
          <h3 className="font-semibold mb-1">Saved Address</h3>
          <p>123 Park Street, Kolkata, West Bengal - 700016</p>
          <p>Landmark: Near Central Metro</p>
        </div>

        <div className="mb-6">
          <h3 className="font-semibold mb-1">Recent Orders</h3>
          <ul className="list-disc list-inside">
            <li>🚘 BMW X5 - Ordered on 25 May 2025</li>
            <li>🚙 Audi Q7 - Ordered on 15 April 2025</li>
          </ul>
        </div>

        <button
          onClick={handleLogout}
          className="w-full bg-red-600 text-white py-3 rounded font-semibold hover:bg-red-700"
        >
          Log Out
        </button>
      </div>
    </div>
  );
};

export default MyAccount;