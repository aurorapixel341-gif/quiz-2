import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { sanitizeInput } from "../utils/sanitizeInput";
import { regEmailTest } from "../utils/regEmailTest";
import { charLength } from "../utils/charLength";
import "./Animation.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Step 1: Sanitize
    const sanitizedEmail = sanitizeInput(email);
    const sanitizedPassword = sanitizeInput(password);

    // Step 2: Empty Check
    if (!sanitizedEmail || !sanitizedPassword) {
      alert("Please fill in all fields.");
      return;
    }

    // Step 3: Email Validation
    if (regEmailTest(sanitizedEmail) === 0) {
      alert("Invalid email format.");
      return;
    }

    // Step 4: Password Length Check
    if (charLength(sanitizedPassword, 6, 20) === 0) {
      alert("Password must be between 6 and 20 characters.");
      return;
    }

    // Step 5: Send to Backend
    try {
      const res = await fetch("http://localhost:5000/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          regEmail: sanitizedEmail,
          password: sanitizedPassword,
        }),
      });

      const data = await res.json();

      if (data.success) {
        // ✅ Save JWT token for authentication
        localStorage.removeItem("userToken");
        localStorage.setItem("userToken", data.token);

        alert("Login successful!");
        navigate("/dashboard"); // Redirect to dashboard
      } else {
        alert(data.message || "Invalid credentials.");
      }
    } catch (err) {
      console.error("Login error:", err);
      alert("Server error. Please try again later.");
    }
  };

  const handleGoogleLogin = () => {
    alert("Google Login clicked! (Integrate Google Auth later)");
  };

  return (
    <div style={styles.container} className="weather-container">
      <div style={styles.overlay}></div>
      <div style={styles.card}>
        <h2 style={styles.title}>Welcome Back ☁</h2>
        <p style={styles.subtitle}>Sign in to your Weather Forecast Account</p>

        <form onSubmit={handleSubmit} style={styles.form}>
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

          <div style={styles.forgetPasswordContainer}>
            <a href="#" style={styles.forgetPassword}>
              Forgot Password?
            </a>
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
            Login
          </button>
        </form>

        <div style={styles.dividerContainer}>
          <hr style={styles.line} />
          <span style={styles.orText}>OR</span>
          <hr style={styles.line} />
        </div>

        <button
          style={styles.googleBtn}
          onClick={handleGoogleLogin}
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
          Login with Google
        </button>

        <p style={styles.signupText}>
          Don’t have an account?{" "}
          <Link to="/register" style={styles.signupLink}>
            Register
          </Link>
        </p>
      </div>
    </div>
  );
}

// --- Your Existing Style Object (same as before) ---
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
    // NOTE: True focus effect for inputs requires CSS-in-JS or external stylesheet
    // focused: {
    //   boxShadow: "0 0 0 3px #00aaff",
    // }
  },

  forgetPasswordContainer: {
    textAlign: "right",
    marginBottom: "20px",
  },
  forgetPassword: {
    color: "#fff",
    fontSize: "13px",
    textDecoration: "none",
    cursor: "pointer",
    transition: "color 0.3s ease, text-decoration 0.3s ease",
  },
  signupLink: {
    color: "#87cefa",
    fontWeight: "600",
    textDecoration: "none",
    cursor: "pointer",
    transition: "color 0.3s ease, text-decoration 0.3s ease",
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
    boxShadow: "0 4px 10px rgba(0, 170, 255, 0.4)", // Default subtle shadow
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
};

export default Login;
