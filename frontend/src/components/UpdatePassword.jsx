import React, { useState, useEffect } from "react";

function UpdatePassword() {
  const [email, setEmail] = useState("");
  const [prevPassword, setPrevPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");

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

        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
        const data = await res.json();

        if (data.success && data.user) {
          setEmail(data.user.email);
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

  const handleUpdate = async () => {
    if (!prevPassword || !newPassword || !confirmPassword) {
      setMessage("Please fill in all fields.");
      return;
    }

    if (newPassword !== confirmPassword) {
      setMessage("New password and confirm password do not match.");
      return;
    }

    try {
      const token = localStorage.getItem("userToken");
      if (!token) {
        setMessage("You must be logged in.");
        return;
      }

      const res = await fetch("http://localhost:5000/user/update-password", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ prevPassword, newPassword, confirmPassword }),
      });

      let data;
      const text = await res.text();
      try {
        data = JSON.parse(text);
      } catch (err) {
        console.error("Failed to parse JSON:", text);
        setMessage("Server returned unexpected response.");
        return;
      }

      setMessage(data.message || "Operation completed.");

      if (data.success) {
        setPrevPassword("");
        setNewPassword("");
        setConfirmPassword("");
      }
    } catch (err) {
      console.error(err);
      setMessage("Failed to update password.");
    }
  };

  return (
    <div style={styles.container} className="weather-container">
      <div style={styles.overlay}></div>

      <div style={styles.card}>
        <h2 style={styles.title}>Update Password 🔐</h2>
        <p style={styles.subtitle}>Secure your weather account</p>

        <label style={styles.label}>Email</label>
        <input
          type="email"
          value={email}
          disabled
          style={{ ...styles.input, background: "rgba(255,255,255,0.8)" }}
        />

        <label style={styles.label}>Previous Password</label>
        <input
          type="password"
          value={prevPassword}
          onChange={(e) => setPrevPassword(e.target.value)}
          placeholder="Enter previous password"
          style={styles.input}
        />

        <label style={styles.label}>New Password</label>
        <input
          type="password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          placeholder="Enter new password"
          style={styles.input}
        />

        <label style={styles.label}>Confirm New Password</label>
        <input
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          placeholder="Confirm new password"
          style={styles.input}
        />

        <button
          onClick={handleUpdate}
          style={styles.updateBtn}
          onMouseOver={(e) =>
            (e.currentTarget.style.boxShadow = styles.updateBtnHover.boxShadow)
          }
          onMouseOut={(e) =>
            (e.currentTarget.style.boxShadow = styles.updateBtn.boxShadow)
          }
        >
          Update Password
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
    height: "110vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
    overflow: "hidden",
    backgroundImage:
      'url("https://www.pexels.com/photo/island-during-golden-hour-and-upcoming-storm-1118873/")',
    backgroundSize: "cover",
    backgroundPosition: "center",
    fontFamily: "'Poppins', sans-serif",
  },

  overlay: {
    position: "absolute",
    width: "100%",
    height: "100%",
  },

  card: {
    position: "relative",
    background: "rgba(255,255,255,0.15)",
    border: "1px solid rgba(255,255,255,0.2)",
    padding: "40px",
    borderRadius: "20px",
    boxShadow: "0 10px 40px rgba(0,0,0,0.6)",
    width: "350px",
    textAlign: "center",
    zIndex: 1,
    color: "#fff",
  },

  title: {
    fontSize: "28px",
    marginBottom: "10px",
    letterSpacing: "1px",
  },

  subtitle: {
    fontSize: "14px",
    marginBottom: "25px",
    color: "#e0e0e0",
  },

  label: {
    textAlign: "left",
    display: "block",
    fontSize: "14px",
    marginBottom: "5px",
  },

  input: {
    width: "100%",
    padding: "12px",
    marginBottom: "15px",
    borderRadius: "10px",
    border: "none",
    outline: "none",
    fontSize: "16px",
    background: "rgba(255,255,255,0.95)",
    color: "#333",
  },

  updateBtn: {
    width: "100%",
    padding: "14px",
    background: "#00aaff",
    color: "#fff",
    fontWeight: "600",
    border: "none",
    fontSize: "16px",
    borderRadius: "10px",
    cursor: "pointer",
    transition: "all 0.3s ease",
    boxShadow: "0 4px 10px rgba(0,170,255,0.4)",
  },

  updateBtnHover: {
    boxShadow: "0 8px 15px rgba(0,170,255,0.6)",
  },
};

export default UpdatePassword;
