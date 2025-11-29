import React, { useEffect, useState } from "react";
import "../App.css";
import WeatherCard from "./Weathercard";
import Hourlyforecast from "./Hourlyforecast";
import Dayforcast from "./Dayforecast";
import "./Animation.css";
import { useNavigate } from "react-router-dom";

function LandingPage({ searchCity }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const checkToken = async () => {
      const token = localStorage.getItem("userToken");

      if (!token) {
        // Just redirect silently, no alert here
        navigate("/login");
        return;
      }

      try {
        const res = await fetch("http://localhost:5000/get-profile", {
          method: "GET",
          headers: { Authorization: `Bearer ${token}` },
        });

        const data = await res.json();

        if (data.message === "OK") {
          setIsAuthenticated(true);
        } else {
          // Single alert for expired/invalid token
          alert("Session expired or invalid. Please log in again.");
          localStorage.removeItem("userToken");
          navigate("/login");
        }
      } catch (err) {
        console.error("Token verification failed:", err);
        navigate("/login");
      } finally {
        setLoading(false);
      }
    };

    checkToken();
  }, [navigate]);

  if (loading)
    return <p style={{ color: "white", textAlign: "center" }}>Loading...</p>;

  if (!isAuthenticated) return null;

  return (
    <div style={{ minHeight: "100vh" }} className="app weather-container">
      <WeatherCard searchCity={searchCity} />
      <Hourlyforecast searchCity={searchCity} />
      <Dayforcast searchCity={searchCity} />
    </div>
  );
}

export default LandingPage;
