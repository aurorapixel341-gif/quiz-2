import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import "./Animation.css";

const aqiLevels = [
  {
    max: 50,
    status: "Good",
    color: "#00E676",
    text: "Air quality is satisfactory, and air pollution poses little or no risk.",
  },
  {
    max: 100,
    status: "Moderate",
    color: "#FFEB3B",
    text: "Air quality is acceptable; however, there may be a moderate health concern for sensitive people.",
  },
  {
    max: 150,
    status: "Unhealthy for Sensitive Groups",
    color: "#FF9800",
    text: "Sensitive groups may experience health effects; others are less likely to be affected.",
  },
  {
    max: 200,
    status: "Unhealthy",
    color: "#F44336",
    text: "Everyone may begin to experience health effects; sensitive groups may experience more serious effects.",
  },
  {
    max: 300,
    status: "Very Unhealthy",
    color: "#9C27B0",
    text: "Health warnings of emergency conditions. The entire population is more likely to be affected.",
  },
  {
    max: 500,
    status: "Hazardous",
    color: "#B71C1C",
    text: "Health alert: everyone may experience serious health effects.",
  },
];

const getAqiData = (aqi) => {
  for (const level of aqiLevels) {
    if (aqi <= level.max) return level;
  }
  return aqiLevels[aqiLevels.length - 1];
};

function AirQualityIndex() {
  const [city, setCity] = useState("gujrat");
  const [currentAqi, setCurrentAqi] = useState(117);
  const [aqiResult, setAqiResult] = useState(getAqiData(117));
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("userToken");

    // If token doesn't exist, redirect to login
    if (!token) {
      alert("Session expired or invalid. Please log in again.");
      navigate("/login");
    }
  }, [navigate]);

  const fetchAqiData = () => {
    if (city.trim() === "") return;
    setLoading(true);
    setTimeout(() => {
      const mockAqi = 10 + Math.floor(Math.random() * 200);
      setCurrentAqi(mockAqi);
      setAqiResult(getAqiData(mockAqi));
      setLoading(false);
    }, 1200);
  };

  useEffect(() => {
    fetchAqiData();
  }, []);

  return (
    <div className="weather-container" style={styles.container}>
      <div style={styles.overlay}></div>

      <div style={styles.card}>
        <h1 style={styles.title}>☁ Air Quality Index (AQI) Checker</h1>
        <p style={styles.subtitle}>
          Check your city’s air quality and plan your day with confidence.
        </p>

        {/* Input and Button */}
        <div style={styles.searchContainer}>
          <input
            type="text"
            placeholder="Enter city name..."
            value={city}
            onChange={(e) => setCity(e.target.value)}
            style={styles.input}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                fetchAqiData(); // this triggers the button’s action
              }
            }}
          />
          <button
            onClick={fetchAqiData}
            disabled={loading}
            style={loading ? styles.btnDisabled : styles.btn}
          >
            {loading ? "Checking..." : "Check AQI"}
          </button>
        </div>

        {/* AQI Display */}
        {!loading ? (
          <>
            <div style={styles.resultBox}>
              <h2 style={styles.city}>{city.toUpperCase()}</h2>
              <div
                style={{
                  ...styles.aqiCircle,
                  background:
                    "linear-gradient(135deg, ${aqiResult.color}, ${aqiResult.color}cc)",
                  boxShadow: "0 0 30px ${aqiResult.color}90",
                }}
                className="aqi-animate"
              >
                {currentAqi}
              </div>
              <div
                style={{
                  ...styles.status,
                  background: aqiResult.color,
                }}
              >
                {aqiResult.status.toUpperCase()}
              </div>
              <p style={styles.desc}>{aqiResult.text}</p>
            </div>

            {/* Legend */}
            <h2 style={styles.legendTitle}>AQI Levels</h2>
            <div style={styles.legend}>
              {aqiLevels.map((lvl, i) => (
                <div
                  key={i}
                  style={{
                    ...styles.legendItem,
                    borderLeft: "6px solid ${lvl.color}",
                  }}
                >
                  <span>{lvl.status}</span>
                  <span style={{ fontSize: "12px", color: "#ECEFF1" }}>
                    ({lvl.max - 49}-{lvl.max})
                  </span>
                </div>
              ))}
            </div>
          </>
        ) : (
          <div style={styles.loadingBox}>
            <div style={styles.spinner}></div>
            <p>Analyzing air quality...</p>
          </div>
        )}
      </div>

      <style>
        {`
          @keyframes colorPulse {
            0% { filter: brightness(1); }
            50% { filter: brightness(1.4); }
            100% { filter: brightness(1); }
          }
          .aqi-animate {
            animation: colorPulse 3s ease-in-out infinite;
          }
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
          button:hover {
            transform: scale(1.05);
            box-shadow: 0 0 15px rgba(255,255,255,0.5);
          }
        `}
      </style>
    </div>
  );
}

const styles = {
  container: {
    minHeight: "100vh",

    padding: "20px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
  },
  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    background: "rgba(0, 0, 0, 0.45)",
    zIndex: 1,
  },
  card: {
    position: "relative",
    zIndex: 2,
    background:
      "linear-gradient(-135deg, #5177a9ff, #6b88b3, #8ca3c3, #a0b3cc, #a0b3cc, #c9d3dfff)",
    backdropFilter: "blur(15px)",
    borderRadius: "25px",
    padding: "15px",
    maxWidth: "550px",
    width: "90%",
    textAlign: "center",
    boxShadow: "0 4px 15px rgba(0, 0, 0, 0.5)",
    transition: "all 0.4s ease",
  },
  title: {
    color: "#ffffffff",
    marginBottom: "10px",
    textShadow: "0 0 5px rgba(59, 59, 59, 0.9)",
  },
  subtitle: {
    color: "#E1F5FE",
    marginBottom: "38px",
    WebkitTextStroke: "0.3px rgba(0, 0, 0, 0.4)",
  },
  searchContainer: {
    display: "flex",
    gap: "10px",
    flexWrap: "wrap",
    justifyContent: "center",
    marginBottom: "30px",
  },
  input: {
    flexGrow: 1,
    minWidth: "200px",
    padding: "12px",
    borderRadius: "10px",
    border: "none",
    fontSize: "16px",
  },
  btn: {
    padding: "12px 20px",
    background: "#03A9F4",
    color: "#fff",
    fontWeight: "700",
    borderRadius: "10px",
    border: "none",
    cursor: "pointer",
    transition: "all 0.3s ease",
  },
  btnDisabled: {
    padding: "12px 20px",
    background: "#78909C",
    color: "#fff",
    borderRadius: "10px",
    border: "none",
  },
  resultBox: {
    marginBottom: "30px",
  },
  city: {
    fontSize: "22px",
    color: "#FFEB3B",
  },
  aqiCircle: {
    width: "160px",
    height: "160px",
    borderRadius: "50%",
    color: "#fff",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontSize: "50px",
    fontWeight: "900",
    margin: "20px auto",
    border: "5px solid rgba(255,255,255,0.6)",
    transition: "background 0.6s ease, box-shadow 0.6s ease",
  },
  status: {
    fontWeight: "700",
    color: "#fff",
    padding: "8px 16px",
    borderRadius: "20px",
    marginBottom: "10px",
    display: "inline-block",
  },
  desc: {
    color: "#E0F7FA",
    fontSize: "15px",
    lineHeight: "1.5",
  },
  legendTitle: {
    textAlign: "left",
    marginBottom: "10px",
    color: "#ffffffff",
    fontWeight: "600",
    textShadow: "0 0 5px rgba(59, 59, 59, 0.9)",
  },
  legend: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))",
    gap: "10px",
  },
  legendItem: {
    background: "rgba(255, 255, 255, 0.08)",
    padding: "8px 10px",
    fontSize: "20px",
    borderRadius: "8px",
    display: "flex",
    flexDirection: "column",
    transition: "0.3s",
  },
  spinner: {
    border: "5px solid rgba(255, 255, 255, 0.2)",
    borderTop: "5px solid #4FC3F7",
    borderRadius: "50%",
    width: "40px",
    height: "40px",
    margin: "20px auto",
    animation: "spin 1s linear infinite",
  },
  loadingBox: {
    color: "#B3E5FC",
    textAlign: "center",
  },
};

export default AirQualityIndex;
