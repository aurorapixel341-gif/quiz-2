import React, { useState, useEffect } from "react";

function UpdateName() {
  const [email, setEmail] = useState("");
  const [prevName, setPrevName] = useState("");
  const [newName, setNewName] = useState("");
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
          setPrevName(data.user.name);
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
    if (!newName) {
      setMessage("Please enter a new username.");
      return;
    }

    try {
      const token = localStorage.getItem("userToken");

      const res = await fetch(
        `http://localhost:5000/user/update-user/${email}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ newName, email }),
        }
      );

      const data = await res.json();

      if (data.success) {
        setPrevName(newName);
        setNewName("");
        setMessage("Username updated successfully!");
      } else {
        setMessage(data.message || "Failed to update username.");
      }
    } catch (err) {
      console.error(err);
      setMessage("Failed to update username.");
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.overlay}></div>

      <div style={styles.card}>
        <h2 style={styles.title}>Update Username 📝</h2>
        <p style={styles.subtitle}>Refresh your identity smartly</p>

        <label style={styles.label}>Email</label>
        <input
          type="email"
          value={email}
          disabled
          style={{ ...styles.input, background: "rgba(255,255,255,0.8)" }}
        />

        <label style={styles.label}>Previous Username</label>
        <input
          type="text"
          value={prevName}
          disabled
          style={{ ...styles.input, background: "rgba(255,255,255,0.8)" }}
        />

        <label style={styles.label}>New Username</label>
        <input
          type="text"
          value={newName}
          onChange={(e) => setNewName(e.target.value)}
          placeholder="Enter new username"
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
          Update Username
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

export default UpdateName;
