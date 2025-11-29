import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import "./Animation.css";

function ClothingSuggestions() {
  const navigate = useNavigate();

  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [suggestion, setSuggestion] = useState("");

  const apiKey = "2446aa6befab420ae365c88d4e92c5cf";

  useEffect(() => {
    const token = localStorage.getItem("userToken");

    // If token doesn't exist, redirect to login
    if (!token) {
      alert("Session expired or invalid. Please log in again.");
      navigate("/login");
    }
  }, [navigate]);

  const getWeather = async () => {
    if (apiKey === "YOUR_API_KEY_HERE") {
      setSuggestion(
        "⚠ Action Required: Please replace 'YOUR_API_KEY_HERE' in the code with your actual OpenWeatherMap API key for live data to work."
      );
      setWeather(null);
      return;
    }

    if (!city) {
      setSuggestion("Please enter a city name 🌆");
      return;
    }

    try {
      const response = await fetch(
        `        https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric
`
      );
      const data = await response.json();

      if (data.cod === "404") {
        setSuggestion("City not found ❌");
        setWeather(null);
        return;
      }

      setWeather(data);
      const temp = data.main.temp;

      if (temp < 10)
        setSuggestion(
          "🥶 It's very cold! Wear a heavy coat, gloves, scarf, and boots. Stay warm indoors!"
        );
      else if (temp < 20)
        setSuggestion(
          "🌤 Cool weather! A jacket or hoodie would be perfect. Maybe grab a coffee too ☕"
        );
      else if (temp < 30)
        setSuggestion(
          "😎 Pleasant day! Go for light clothes or T-shirts. Sunglasses recommended 🕶"
        );
      else
        setSuggestion(
          "🔥 It's hot! Stay hydrated 💧, wear cotton or loose clothes, and avoid going out in noon sun ☀"
        );
    } catch (error) {
      console.error("Error fetching weather:", error);
      setSuggestion("Something went wrong. Try again later ⚠");
    }
  };

  return (
    <div
      className="weather-container"
      style={{
        backgroundSize: "cover",
        backgroundPosition: "center",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        color: "#fff",
        textAlign: "center",
        fontFamily: "'Poppins', sans-serif",
        padding: "40px",
      }}
    >
      <div
        style={{
          background:
            "linear-gradient(-135deg, #57769fff, #6b88b3, #8ca3c3, #a0b3cc, #a0b3cc, #c9d3dfff)",
          padding: "25px",
          borderRadius: "25px",
          width: "90%",
          maxWidth: "600px",
          transition: "transform 0.3s ease, box-shadow 0.3s ease",
        }}
      >
        <h1
          style={{
            fontSize: "2.5rem",
            marginBottom: "20px",
            color: "white",
            textShadow: "0 0 5px rgba(59, 59, 59, 0.9)",
            letterSpacing: "1.5px",
          }}
        >
          👕 Clothing Suggestion Tool
        </h1>

        <p
          style={{
            marginBottom: "25px",
            fontSize: "1.2rem",
            color: "#f0f0f0",
            WebkitTextStroke: "0.3px rgba(0, 0, 0, 0.4)",
          }}
        >
          Enter your <b>city or country name</b> below to get outfit suggestions
          based on live weather!
        </p>

        <input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder="Enter your city (e.g., Karachi)"
          style={{
            padding: "12px 12px",
            borderRadius: "10px",
            border: "none",
            outline: "none",
            width: "70%",
            fontSize: "1rem",
            marginBottom: "20px",
            boxShadow: "0 0 10px rgba(255,255,255,0.2)",
            textAlign: "center",
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              getWeather(); // this triggers the button’s action
            }
          }}
        />

        <br />

        <button
          onClick={getWeather}
          style={{
            background: "linear-gradient(135deg, #00c6ff, #0072ff)",
            border: "none",
            padding: "12px 35px",
            borderRadius: "30px",
            color: "white",
            fontSize: "1.1rem",
            cursor: "pointer",
            transition: "all 0.3s ease",
          }}
          onMouseEnter={(e) => {
            e.target.style.background =
              "linear-gradient(135deg, #0072ff, #00c6ff)";
            e.target.style.transform = "translateY(-3px)";
          }}
          onMouseLeave={(e) => {
            e.target.style.background =
              "linear-gradient(135deg, #00c6ff, #0072ff)";
            e.target.style.transform = "translateY(0)";
          }}
        >
          Get Outfit Suggestion
        </button>

        {weather && (
          <div
            style={{
              marginTop: "30px",
              padding: "20px",
              boxShadow: "0 4px 15px rgba(0, 0, 0, 0.5)",

              background: "rgba(255,255,255,0.1)",
              borderRadius: "15px",
              boxShadow: "0 0 10px rgba(255,255,255,0.3)",
              fontSize: "1.2rem",
              color: "#fff",
              animation: "fadeIn 1s ease-in-out",
            }}
          >
            <h2
              style={{
                color: "white",
                textShadow: "0 0 5px rgba(59, 59, 59, 0.9)",
              }}
            >
              🌍 {weather.name}, {weather.sys.country}
            </h2>
            <p
              style={{
                color: "white",
                WebkitTextStroke: "0.3px rgba(0, 0, 0, 0.4)",
              }}
            >
              Temperature: <b>{weather.main.temp}°C</b>
              Condition: <b>{weather.weather[0].description}</b>
            </p>
          </div>
        )}

        {suggestion && (
          <div
            style={{
              boxShadow: "0 4px 15px rgba(0, 0, 0, 0.5)",

              marginTop: "25px",
              padding: "20px",
              background: "rgba(255,255,255,0.15)",
              borderRadius: "15px",
              boxShadow: "0 0 10px rgba(255,255,255,0.3)",
              fontSize: "1.3rem",
              color: "#fff",
              animation: "fadeIn 1s ease-in-out",
              WebkitTextStroke: "0.3px rgba(0, 0, 0, 0.4)",
            }}
          >
            {suggestion}
          </div>
        )}
      </div>

      <style>
        {`
          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(10px); }
            to { opacity: 1; transform: translateY(0); }
          }
        `}
      </style>
    </div>
  );
}

export default ClothingSuggestions;
