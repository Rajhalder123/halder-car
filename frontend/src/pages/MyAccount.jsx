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
    authCheckComplete, // ✅ use it
  } = useAuth();

  const navigate = useNavigate();
  const [editMode, setEditMode] = useState(false);
  const [nameInput, setNameInput] = useState(userName);

  // ✅ Smooth redirect only after auth check is complete
  useEffect(() => {
    if (authCheckComplete && !isAuthenticated) {
      navigate("/signin");
    }
  }, [authCheckComplete, isAuthenticated, navigate]);

  // Reset input when toggling edit mode on
  const toggleEdit = () => {
    setEditMode((prev) => {
      if (!prev) {
        setNameInput(userName);
      }
      return !prev;
    });
  };

  const saveName = () => {
    if (!nameInput.trim()) {
      alert("Name can't be empty!");
      return;
    }
    login(authToken, userEmail, nameInput); // update context & localStorage
    setEditMode(false);
  };

  const handleLogout = () => {
    logout();
    navigate("/signin");
  };

  // ✅ Loading UI while checking auth
  if (!authCheckComplete) {
    return (
      <div style={styles.container}>
        <div style={{ ...styles.card, textAlign: "center" }}>
          <h2 style={{ color: "#444" }}>Loading your account...</h2>
        </div>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={{ marginBottom: "0.5rem" }}>Welcome, {userName} 👋</h2>
        <p style={{ color: "#666", marginBottom: "2rem" }}>
          This is your personal account page where you can view and update your
          profile information.
        </p>

        {/* Editable Username Section */}
        <div style={styles.section}>
          <h3>Profile Information</h3>
          {!editMode ? (
            <p>
              <strong>Name:</strong> {userName}{" "}
              <button onClick={toggleEdit} style={styles.editBtn}>
                Edit
              </button>
            </p>
          ) : (
            <>
              <input
                type="text"
                value={nameInput}
                onChange={(e) => setNameInput(e.target.value)}
                style={styles.input}
              />
              <div>
                <button onClick={saveName} style={styles.saveBtn}>
                  Save
                </button>
                <button onClick={toggleEdit} style={styles.cancelBtn}>
                  Cancel
                </button>
              </div>
            </>
          )}
          <p>
            <strong>Email:</strong> {userEmail}
          </p>
        </div>

        {/* Static Address Section */}
        <div style={styles.section}>
          <h3>Saved Address</h3>
          <p>123 Park Street, Kolkata, West Bengal - 700016</p>
          <p>Landmark: Near Central Metro</p>
        </div>

        {/* Simple Orders Summary */}
        <div style={styles.section}>
          <h3>Recent Orders</h3>
          <ul style={{ paddingLeft: "20px" }}>
            <li>🚘 BMW X5 - Ordered on 25 May 2025</li>
            <li>🚙 Audi Q7 - Ordered on 15 April 2025</li>
          </ul>
        </div>

        <button onClick={handleLogout} style={styles.logoutButton}>
          Log Out
        </button>
      </div>
    </div>
  );
};

// Inline styles
const styles = {
  container: {
    minHeight: "100vh",
    background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    color: "#fff",
    padding: "20px",
    boxSizing: "border-box",
  },
  card: {
    background: "#fff",
    color: "#333",
    padding: "2.5rem 3rem",
    borderRadius: "12px",
    boxShadow: "0 0 15px rgba(0, 0, 0, 0.3)",
    minWidth: "320px",
    maxWidth: "450px",
    textAlign: "center",
    animation: "fadeIn 0.5s ease-in-out",
  },
  section: {
    marginBottom: "1.8rem",
    textAlign: "left",
  },
  editBtn: {
    marginLeft: "10px",
    padding: "3px 8px",
    fontSize: "0.85rem",
    cursor: "pointer",
    background: "#667eea",
    color: "#fff",
    border: "none",
    borderRadius: "6px",
  },
  input: {
    width: "100%",
    padding: "8px 10px",
    fontSize: "1rem",
    borderRadius: "8px",
    border: "1.5px solid #ccc",
    marginBottom: "8px",
  },
  saveBtn: {
    padding: "8px 16px",
    backgroundColor: "#2a9d8f",
    color: "#fff",
    border: "none",
    borderRadius: "8px",
    marginRight: "10px",
    cursor: "pointer",
  },
  cancelBtn: {
    padding: "8px 16px",
    backgroundColor: "#e76f51",
    color: "#fff",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
  },
  logoutButton: {
    marginTop: "1rem",
    padding: "12px 28px",
    border: "none",
    borderRadius: "8px",
    background: "#e63946",
    color: "#fff",
    cursor: "pointer",
    fontWeight: "600",
    fontSize: "1rem",
    width: "100%",
  },
};

export default MyAccount;
