import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

function Header({ onSearch, onCurrentLocation }) {
  // **ADDED onCurrentLocation prop**
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [openMenu, setOpenMenu] = useState(false);
  const [city, setCity] = useState("");

  // Function to handle city search
  const handleLogout = () => {
    localStorage.removeItem("userToken");
    localStorage.removeItem("userEmail");
    localStorage.removeItem("bgImage");
    navigate("/login"); // Redirect after logout
  };

  const handleSearch = () => {
    if (city.trim() !== "") {
      onSearch(city);
      setCity("");
    }
  };

  // **NEW FUNCTIONALITY: Get current location**
  const handleCurrentLocation = () => {
    if (onCurrentLocation) {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            // Success: call the prop with coordinates
            onCurrentLocation({
              lat: position.coords.latitude,
              lon: position.coords.longitude,
            });
          },
          (error) => {
            // Error handling
            console.error("Geolocation error:", error);
            alert(
              "Could not retrieve your location. Please ensure location services are enabled."
            );
          }
        );
      } else {
        alert("Geolocation is not supported by this browser.");
      }
    }
  };
  // **END NEW FUNCTIONALITY**

  return (
    <div
      style={{
        position: "relative", // Add this
        zIndex: 10,
        padding: "10px",
        background: "#57769f73",
        color: "white",
        backdropFilter: "blur(10px)",
        WebkitBackdropFilter: "blur(10px)",
        transition: "all 0.3s ease",
        boxShadow: "0 4px 10px rgba(0,0,0,0.4)",
        borderBottom: "1px solid rgba(255,255,255,0.1)",
        fontFamily: "Poppins, sans-serif",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          padding: "5px",
          alignItems: "center",
        }}
      >
        <h1
          style={{
            padding: "5px",
            color: "#00bfff",
            transition: "all 0.3s ease",
            cursor: "pointer",
          }}
          onMouseEnter={(e) => (e.target.style.color = "#ffffff")}
          onMouseLeave={(e) => (e.target.style.color = "#00bfff")}
        >
          The Lume
        </h1>

        <div
          style={{
            width: "45%",
            padding: "5px",
            display: "flex",
            gap: "5px",
          }}
        >
          <style>
            {`
              input::placeholder {
                color: white;
                opacity: 1;
              }
            `}
          </style>
          <input
            style={{
              width: "90%",
              padding: "8px 10px",
              border: "1px solid rgba(255,255,255,0.2)",
              borderRadius: "8px",
              background: "rgba(255,255,255,0.1)",
              color: "white",
              outline: "none",
              transition: "all 0.3s ease",
            }}
            onFocus={(e) => {
              e.target.style.background = "rgba(255,255,255,0.2)";
              e.target.style.border = "1px solid #00bfff";
            }}
            onBlur={(e) => {
              e.target.style.background = "rgba(255,255,255,0.1)";
              e.target.style.border = "1px solid rgba(255,255,255,0.2)";
            }}
            type="text"
            placeholder="Search a City..."
            value={city}
            onChange={(e) => setCity(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleSearch(); // this triggers the button’s action
              }
            }}
          />
          <button
            style={{
              height: "5.5vh",
              width: "10%",
              background: "#00bfff",
              border: "none",
              borderRadius: "8px",
              color: "white",
              cursor: "pointer",
              fontSize: "1.1rem",
              transition: "all 0.3s ease",
            }}
            onClick={handleSearch}
            onMouseEnter={(e) => {
              e.target.style.background = "#009fd9";
              e.target.style.transform = "scale(1.05)";
            }}
            onMouseLeave={(e) => {
              e.target.style.background = "#00bfff";
              e.target.style.transform = "scale(1)";
            }}
          >
            🔍
          </button>
        </div>

        <button
          style={{
            padding: "8px 14px",
            fontSize: "1rem",
            background: "#00bfff",
            color: "white",
            border: "none",
            borderRadius: "8px",
            fontWeight: "500",
            cursor: "pointer",
            transition: "all 0.3s ease",
          }}
          onMouseEnter={(e) => {
            e.target.style.background = "#009fd9";
            e.target.style.transform = "scale(1.05)";
          }}
          onClick={handleCurrentLocation}
          onMouseLeave={(e) => {
            e.target.style.background = "#00bfff";
            e.target.style.transform = "scale(1)";
          }}
        >
          Current location
        </button>
      </div>

      <hr style={{ borderColor: "rgba(255,255,255,0.1)" }} />
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <div
          style={{
            padding: "5px",
            display: "flex",
            gap: "20px",
            justifyContent: "flex-start",
            alignItems: "center",
          }}
        >
          <Link
            to="/"
            style={{
              padding: "5px",
              textDecoration: "none",
              color: "white",
              fontWeight: "500",
              transition: "color 0.3s ease",
            }}
            onMouseEnter={(e) => (e.target.style.color = "#00bfff")}
            onMouseLeave={(e) => (e.target.style.color = "white")}
          >
            Home
          </Link>

          <Link
            to="/dashboard"
            style={{
              padding: "5px",
              textDecoration: "none",
              color: "white",
              fontWeight: "500",
              transition: "color 0.3s ease",
            }}
            onMouseEnter={(e) => (e.target.style.color = "#00bfff")}
            onMouseLeave={(e) => (e.target.style.color = "white")}
          >
            Dashboard
          </Link>

          <div
            style={{
              position: "relative",
              display: "inline-block",
            }}
            onMouseEnter={() => setOpen(true)}
            onMouseLeave={() => setOpen(false)}
          >
            <button
              style={{
                fontSize: "16px",
                padding: "5px",
                textDecoration: "none",
                color: "white",
                backgroundColor: "transparent",
                border: "none",
                fontWeight: "600", // made bold
                cursor: "pointer",
                transition: "color 0.3s ease",
              }}
              onMouseEnter={(e) => (e.target.style.color = "#00bfff")}
              onMouseLeave={(e) => (e.target.style.color = "white")}
            >
              Services ▼
            </button>

            {open && (
              <div
                style={{
                  position: "absolute",
                  top: "100%",
                  left: 0,
                  background: "rgba(20,20,20,0.95)",
                  borderRadius: "10px",
                  boxShadow: "0 8px 16px rgba(0,0,0,0.5)",
                  display: "flex",
                  flexDirection: "column",
                  minWidth: "170px",
                  zIndex: 999999,
                  transition: "opacity 0.3s ease",
                }}
              >
                {[
                  { name: "All Services", to: "/services" },
                  { name: "Live Map", to: "/MapService" },
                  { name: "Clothing Suggestions", to: "/ClothingSuggestions" },
                  { name: "Air Quality Index", to: "/AirQualityIndex" },
                ].map((item) => (
                  <Link
                    key={item.to}
                    to={item.to}
                    style={{
                      padding: "8px 12px",
                      textDecoration: "none",
                      color: "white",
                      fontWeight: "500",
                      fontSize: "13px", // slightly bigger for readability
                      transition: "all 0.3s ease",
                    }}
                    onMouseEnter={(e) => {
                      e.target.style.background = "#00bfff";
                      e.target.style.color = "black";
                      e.target.style.fontWeight = "600"; // bolder on hover
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.background = "transparent";
                      e.target.style.color = "white";
                      e.target.style.fontWeight = "500";
                    }}
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
            )}
          </div>

          <Link
            to="/about"
            style={{
              padding: "5px",
              textDecoration: "none",
              color: "white",
              fontWeight: "500",
              transition: "color 0.3s ease",
            }}
            onMouseEnter={(e) => (e.target.style.color = "#00bfff")}
            onMouseLeave={(e) => (e.target.style.color = "white")}
          >
            About us
          </Link>
          <Link
            to="/contact"
            style={{
              padding: "5px",
              textDecoration: "none",
              color: "white",
              fontWeight: "500",
              transition: "color 0.3s ease",
            }}
            onMouseEnter={(e) => (e.target.style.color = "#00bfff")}
            onMouseLeave={(e) => (e.target.style.color = "white")}
          >
            Contact us
          </Link>

          <Link
            to="/termANDconditions"
            style={{
              padding: "5px",
              textDecoration: "none",
              color: "white",
              fontWeight: "500",
              transition: "color 0.3s ease",
            }}
            onMouseEnter={(e) => (e.target.style.color = "#00bfff")}
            onMouseLeave={(e) => (e.target.style.color = "white")}
          >
            Term & Conditions
          </Link>
        </div>

        <div
          style={{
            padding: "5px",
            display: "flex",
            gap: "20px",
            justifyContent: "flex-start",
            alignItems: "center",
          }}
        >
          <div
            style={{
              position: "relative",
              display: "inline-block",
            }}
            onMouseEnter={() => setOpenMenu(true)}
            onMouseLeave={() => setOpenMenu(false)}
          >
            <button
              style={{
                fontSize: "16px",
                padding: "5px",
                textDecoration: "none",
                color: "white",
                backgroundColor: "transparent",
                border: "none",
                fontWeight: "600", // made bold
                cursor: "pointer",
                transition: "color 0.3s ease",
              }}
              onMouseEnter={(e) => (e.target.style.color = "#00bfff")}
              onMouseLeave={(e) => (e.target.style.color = "white")}
            >
              Menu ▼
            </button>

            {openMenu && (
              <div
                style={{
                  position: "absolute",
                  top: "100%",
                  left: 0,
                  background: "rgba(20,20,20,0.95)",
                  borderRadius: "10px",
                  boxShadow: "0 8px 16px rgba(0,0,0,0.5)",
                  display: "flex",
                  flexDirection: "column",
                  minWidth: "170px",
                  zIndex: 999999,
                  transition: "opacity 0.3s ease",
                }}
              >
                {/* Blue links */}
                <Link
                  to="/changepassword"
                  style={{
                    padding: "8px 12px",
                    textDecoration: "none",
                    color: "white",
                    fontWeight: "500",
                    fontSize: "13px",
                    transition: "all 0.3s ease",
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.background = "#00bfff";
                    e.target.style.color = "black";
                    e.target.style.fontWeight = "600"; // slightly bolder on hover
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.background = "transparent";
                    e.target.style.color = "white";
                    e.target.style.fontWeight = "500";
                  }}
                >
                  Change Password
                </Link>

                <Link
                  to="/changeusername"
                  style={{
                    padding: "8px 12px",
                    textDecoration: "none",
                    color: "white",
                    fontWeight: "500",
                    fontSize: "13px",
                    transition: "all 0.3s ease",
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.background = "#00bfff";
                    e.target.style.color = "black";
                    e.target.style.fontWeight = "600";
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.background = "transparent";
                    e.target.style.color = "white";
                    e.target.style.fontWeight = "500";
                  }}
                >
                  Change Username
                </Link>

                {/* Red links */}
                <Link
                  to="/deleteaccount"
                  style={{
                    padding: "8px 12px",
                    textDecoration: "none",
                    color: "white",
                    fontWeight: "500",
                    fontSize: "13px",
                    transition: "all 0.3s ease",
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.background = "#ef4444"; // red hover
                    e.target.style.color = "white";
                    e.target.style.fontWeight = "600";
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.background = "transparent";
                    e.target.style.color = "white";
                    e.target.style.fontWeight = "500";
                  }}
                >
                  Delete Account
                </Link>

                <button
                  onClick={handleLogout}
                  style={{
                    padding: "8px 12px",
                    textDecoration: "none",
                    color: "white",
                    background: "transparent",
                    border: "none",
                    width: "100%",
                    textAlign: "left",
                    cursor: "pointer",
                    fontSize: "13px",
                    fontWeight: "500",
                    transition: "all 0.3s ease",
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.background = "#ef4444"; // red hover
                    e.target.style.color = "white";
                    e.target.style.fontWeight = "600";
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.background = "transparent";
                    e.target.style.color = "white";
                    e.target.style.fontWeight = "500";
                  }}
                >
                  Logout
                </button>
              </div>
            )}
          </div>

          <Link
            to="/register"
            style={{
              padding: "5px",
              textDecoration: "none",
              color: "white",
              fontWeight: "500",
              transition: "color 0.3s ease",
            }}
            onMouseEnter={(e) => (e.target.style.color = "#00bfff")}
            onMouseLeave={(e) => (e.target.style.color = "white")}
          >
            Register
          </Link>
          <Link
            to="/login"
            style={{
              padding: "5px",
              textDecoration: "none",
              color: "white",
              fontWeight: "500",
              transition: "color 0.3s ease",
            }}
            onMouseEnter={(e) => (e.target.style.color = "#00bfff")}
            onMouseLeave={(e) => (e.target.style.color = "white")}
          >
            Login
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Header;
