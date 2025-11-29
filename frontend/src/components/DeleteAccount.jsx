import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function DeleteAccount() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  // Fetch current logged-in user
  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem("userToken");
      if (!token) {
        setMessage("You must be logged in.");
        return;
      }

      try {
        const res = await fetch("http://localhost:5000/user/get-current-user", {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (!res.ok) throw new Error(`HTTP error: ${res.status}`);

        const data = await res.json();
        if (data.success && data.user) {
          setEmail(data.user.email);
          setUsername(data.user.name);
        } else {
          setMessage(data.message || "Failed to fetch user data.");
        }
      } catch (err) {
        console.error(err);
        setMessage("Failed to fetch user data.");
      }
    };

    fetchUser();
  }, []);

  // Handle delete account
  const handleDelete = async () => {
    if (!password) {
      setMessage("Please enter your password.");
      return;
    }

    const confirmDelete = window.confirm(
      "Are you sure you want to delete your account? This action cannot be reversed."
    );
    if (!confirmDelete) return;

    try {
      const token = localStorage.getItem("userToken");

      const res = await fetch("http://localhost:5000/user/delete-account", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ password }),
      });

      const data = await res.json();
      setMessage(data.message || "Operation completed.");

      if (data.success) {
        localStorage.removeItem("userToken");
        setPassword("");

        setTimeout(() => {
          navigate("/login");
        }, 1500);
      }
    } catch (err) {
      console.error(err);
      setMessage("Failed to delete account.");
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.title}>Delete Account</h2>

        <label>Email</label>
        <input
          type="email"
          value={email}
          disabled
          style={{ ...styles.input, background: "#f0f0f0" }}
        />

        <label>Username</label>
        <input
          type="text"
          value={username}
          disabled
          style={{ ...styles.input, background: "#f0f0f0" }}
        />

        <label>Password (required)</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter your password"
          style={styles.input}
        />

        <button
          onClick={handleDelete}
          style={{ ...styles.button, background: "#ef4444" }}
          onMouseOver={(e) =>
            (e.currentTarget.style.boxShadow =
              "0 6px 12px rgba(239, 68, 68, 0.5)")
          }
          onMouseOut={(e) =>
            (e.currentTarget.style.boxShadow = "0 0 0 rgba(0,0,0,0)")
          }
          onMouseDown={(e) =>
            (e.currentTarget.style.transform = "translateY(1px)")
          }
          onMouseUp={(e) => (e.currentTarget.style.transform = "translateY(0)")}
        >
          Delete Account
        </button>

        {message && (
          <p style={{ marginTop: "15px", color: "yellow" }}>{message}</p>
        )}
      </div>
    </div>
  );
}
const styles = {
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "110vh",
    position: "relative",
    overflow: "hidden",
    backgroundImage:
      'url("https://www.pexels.com/photo/island-during-golden-hour-and-upcoming-storm-1118873/")',
    backgroundSize: "cover",
    backgroundPosition: "center",
    fontFamily: "'Poppins', sans-serif",
    color: "#fff",
  },

  overlay: {
    position: "absolute",
    width: "100%",
    height: "100%",
    background: "rgba(0, 0, 0, 0.5)",
    backgroundImage:
      "linear-gradient(135deg, rgba(0, 170, 255, 0.2), rgba(0, 0, 0, 0.5))",
    zIndex: 0,
  },

  card: {
    position: "relative",
    background: "rgba(255, 255, 255, 0.15)",
    border: "1px solid rgba(255, 255, 255, 0.2)",
    padding: "40px",
    borderRadius: "20px",
    boxShadow: "0 10px 40px rgba(0, 0, 0, 0.6)",
    width: "360px",
    textAlign: "center",
    zIndex: 1,
  },

  title: {
    fontSize: "26px",
    fontWeight: "600",
    marginBottom: "20px",
    letterSpacing: "0.5px",
    color: "#ffffff",
  },

  input: {
    width: "100%",
    padding: "12px",
    marginBottom: "12px",
    borderRadius: "10px",
    border: "none",
    outline: "none",
    fontSize: "16px",
    transition: "all 0.3s ease",
    background: "rgba(255, 255, 255, 0.95)",
    color: "#333",
  },

  button: {
    width: "100%",
    padding: "14px",
    borderRadius: "10px",
    border: "none",
    cursor: "pointer",
    fontWeight: "600",
    fontSize: "16px",
    transition: "all 0.3s ease",
    boxShadow: "0 4px 10px rgba(239, 68, 68, 0.4)",
    background: "#ef4444",
    color: "#fff",
  },

  buttonHover: {
    boxShadow: "0 8px 15px rgba(239, 68, 68, 0.6)",
  },

  buttonActive: {
    transform: "translateY(1px)",
  },

  message: {
    marginTop: "15px",
    color: "yellow",
  },
};

export default DeleteAccount;
