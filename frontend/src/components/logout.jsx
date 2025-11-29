import React from "react";
import { useNavigate } from "react-router-dom";

function LogoutButton() {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Remove token and any other user data
    localStorage.removeItem("userToken");
    localStorage.removeItem("userEmail");
    localStorage.removeItem("bgImage");

    // Redirect to login
    navigate("/login");
  };

  return (
    <button
      onClick={handleLogout}
      style={{
        padding: "8px 16px",
        fontSize: "14px",
        cursor: "pointer",
        borderRadius: "4px",
        backgroundColor: "#f44336",
        color: "white",
        border: "none",
      }}
    >
      Log Out
    </button>
  );
}

export default LogoutButton;
