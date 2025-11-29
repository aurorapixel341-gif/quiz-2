import React, { useState } from "react";
import { sanitizeInput } from "../utils/sanitizeInput";
import { regEmailTest } from "../utils/regEmailTest";
import { regNameTest } from "../utils/regNameTest";
import { charLength } from "../utils/charLength";
import { Link } from "react-router-dom";
import "./Animation.css";

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Step 1: Sanitize all inputs
    const sanitizedName = sanitizeInput(name);
    const sanitizedEmail = sanitizeInput(email);
    const sanitizedPassword = sanitizeInput(password);
    const sanitizedConfirmPassword = sanitizeInput(confirmPassword);

    // Step 2: Validation (same as before)
    if (
      !sanitizedName ||
      !sanitizedEmail ||
      !sanitizedPassword ||
      !sanitizedConfirmPassword
    ) {
      alert("Please fill in all fields.");
      return;
    }

    if (regNameTest(sanitizedName) === 0) {
      alert("Name can only contain alphabets and spaces.");
      return;
    }

    if (regEmailTest(sanitizedEmail) === 0) {
      alert("Invalid email format.");
      return;
    }

    if (charLength(sanitizedPassword, 6, 20) === 0) {
      alert("Password must be between 6 and 20 characters.");
      return;
    }

    if (sanitizedPassword !== sanitizedConfirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    // ✅ Step 3: Send to backend
    try {
      const response = await fetch("http://localhost:5000/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          regName: sanitizedName,
          regEmail: sanitizedEmail,
          password: sanitizedPassword,
        }),
      });

      const data = await response.json();
      console.log("Backend Response:", data);

      if (data.success) {
        window.location.replace("/Login");
      } else {
        alert(`❌ ${data.message}`);
      }
    } catch (err) {
      console.error("Error sending data:", err);
      alert("Server error, please try again later.");
    }
  };

  const handleGoogleRegister = () => {
    alert("Google Register clicked! (Integrate Google Auth later)");
  };

  return (
    <div style={styles.container} className="weather-container">
      <div style={styles.overlay}></div>
      <div style={styles.card}>
        <h2 style={styles.title}>Create Account ☀</h2>
        <p style={styles.subtitle}>Join the Weather Forecast Family</p>

        <form onSubmit={handleSubmit} style={styles.form}>
          <div style={styles.inputGroup}>
            <label style={styles.label}>Full Name</label>
            <input
              type="text"
              placeholder="Enter your full name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              style={styles.input}
            />
          </div>

          <div style={styles.inputGroup}>
            <label style={styles.label}>Email</label>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              style={styles.input}
            />
          </div>

          <div style={styles.inputGroup}>
            <label style={styles.label}>Password</label>
            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              style={styles.input}
            />
          </div>

          <div style={styles.inputGroup}>
            <label style={styles.label}>Confirm Password</label>
            <input
              type="password"
              placeholder="Confirm your password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              style={styles.input}
            />
          </div>

          <button
            type="submit"
            style={styles.loginBtn}
            onMouseOver={(e) =>
              (e.currentTarget.style.boxShadow = styles.loginBtnHover.boxShadow)
            }
            onMouseOut={(e) =>
              (e.currentTarget.style.boxShadow = styles.loginBtn.boxShadow)
            }
            onMouseDown={(e) =>
              (e.currentTarget.style.background =
                styles.loginBtnActive.background)
            }
            onMouseUp={(e) =>
              (e.currentTarget.style.background = styles.loginBtn.background)
            }
          >
            Register
          </button>
        </form>

        <div style={styles.dividerContainer}>
          <hr style={styles.line} />
          <span style={styles.orText}>OR</span>
          <hr style={styles.line} />
        </div>

        <button
          style={styles.googleBtn}
          onClick={handleGoogleRegister}
          onMouseOver={(e) =>
            (e.currentTarget.style.boxShadow = styles.googleBtnHover.boxShadow)
          }
          onMouseOut={(e) =>
            (e.currentTarget.style.boxShadow = styles.googleBtn.boxShadow)
          }
          onMouseDown={(e) =>
            (e.currentTarget.style.transform = styles.googleBtnActive.transform)
          }
          onMouseUp={(e) =>
            (e.currentTarget.style.transform = styles.googleBtn.transform)
          }
        >
          <img
            src="https://cdn-icons-png.flaticon.com/512/281/281764.png"
            alt="Google"
            style={styles.googleIcon}
          />
          Register with Google
        </button>

        <p style={styles.signupText}>
          Already have an account?{" "}
          <Link to="/login" style={styles.signupLink}>
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}

const styles = {
  container: {
    height: "130vh",
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
    color: "#ffffff",
  },
  overlay: {
    position: "absolute",
    width: "100%",
    height: "100%",
  },
  card: {
    position: "relative",
    background: "rgba(255, 255, 255, 0.15)",
    border: "1px solid rgba(255, 255, 255, 0.2)",
    padding: "40px",
    borderRadius: "20px",
    boxShadow: "0 10px 40px rgba(0, 0, 0, 0.6)",
    width: "350px",
    textAlign: "center",
    zIndex: 1,
  },
  title: {
    fontSize: "30px",
    marginBottom: "8px",
    letterSpacing: "1px",
    color: "#ffffff",
  },
  subtitle: {
    fontSize: "14px",
    marginBottom: "30px",
    color: "#e0e0e0",
  },
  form: {
    display: "flex",
    flexDirection: "column",
  },
  inputGroup: {
    marginBottom: "20px",
    textAlign: "left",
  },
  label: {
    fontSize: "14px",
    fontWeight: "500",
    color: "#ffffff",
  },
  input: {
    width: "100%",
    padding: "12px",
    marginTop: "5px",
    borderRadius: "10px",
    border: "none",
    outline: "none",
    fontSize: "16px",
    transition: "all 0.3s ease",
    background: "rgba(255, 255, 255, 0.95)",
    color: "#333",
  },
  loginBtn: {
    width: "100%",
    padding: "14px",
    background: "#00aaff",
    color: "#ffffff",
    fontWeight: "600",
    fontSize: "16px",
    border: "none",
    borderRadius: "10px",
    cursor: "pointer",
    transition: "all 0.3s ease",
    boxShadow: "0 4px 10px rgba(0, 170, 255, 0.4)",
  },
  loginBtnHover: {
    boxShadow: "0 8px 15px rgba(0, 170, 255, 0.6)",
  },
  loginBtnActive: {
    background: "#0088cc",
  },
  googleBtn: {
    width: "100%",
    padding: "14px",
    background: "#fff",
    color: "#333",
    fontWeight: "600",
    fontSize: "15px",
    border: "none",
    borderRadius: "10px",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "10px",
    transition: "all 0.3s ease",
    boxShadow: "0 4px 10px rgba(0, 0, 0, 0.2)",
    transform: "translateY(0)",
  },
  googleBtnHover: {
    boxShadow: "0 6px 12px rgba(0, 0, 0, 0.3)",
  },
  googleBtnActive: {
    transform: "translateY(1px)",
  },
  googleIcon: {
    width: "20px",
    height: "20px",
  },
  dividerContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    margin: "25px 0",
  },
  line: {
    width: "35%",
    border: "1px solid rgba(255, 255, 255, 0.3)",
  },
  orText: {
    margin: "0 10px",
    color: "#fff",
    fontSize: "14px",
  },
  signupText: {
    marginTop: "25px",
    fontSize: "14px",
    color: "#ffffff",
  },
  signupLink: {
    color: "#87cefa",
    fontWeight: "600",
    textDecoration: "none",
    cursor: "pointer",
    transition: "color 0.3s ease, text-decoration 0.3s ease",
  },
};

export default Register;
