import React, { useState, useEffect } from "react";

function WeatherCard({ searchCity }) {
  // receive as prop
  const [weather, setWeather] = useState(null);

  useEffect(() => {
    if (!searchCity) return;

    const Apikey = "2446aa6befab420ae365c88d4e92c5cf";
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${searchCity}&units=metric&appid=${Apikey}`;

    fetch(url)
      .then((response) => response.json())
      .then((data) => setWeather(data))
      .catch((error) => console.error("Error fetching weather data:", error));
  }, [searchCity]);

  if (!weather || !weather.main || !weather.weather) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          fontSize: "50px",
        }}
      >
        Loading Data From Api
      </div>
    );
  }

  return (
    <>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          padding: "20px",
          background:
            "linear-gradient(-135deg, #57769fff, #6b88b3, #8ca3c3, #a0b3cc, #a0b3cc, #c9d3dfff)",
          boxShadow: "0 4px 15px rgba(0, 0, 0, 0.5)",
          gap: "15px",
          borderRadius: "15px",
          width: "94%",
          margin: "20px auto",
          flexWrap: "wrap", // allow wrapping on small screens
        }}
      >
        <div
          style={{
            background:
              "linear-gradient(-135deg, #5177a9ff, #6b88b3, #8ca3c3, #a0b3cc, #a0b3cc, #c9d3dfff)",
            width: "45%",
            alignItems: "center",
            borderRadius: "14px",
            display: "flex",
            flexDirection: "column",
            boxShadow: "0 4px 15px rgba(3, 19, 49, 0.5)",

            padding: "20px",
            gap: "20px",
            flex: 1,
          }}
        >
          {/* Main Weather Info */}
          <div
            style={{
              position: "relative", // parent relative for absolute positioning
              width: "100%",
              height: "100%", // keep height as is
            }}
          >
            {/* Left-top */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                position: "absolute",
                top: "0",
                left: "0",
              }}
            >
              <p>
                {weather.name}, {weather.sys.country}
              </p>
              <h2>{new Date().toLocaleDateString()}</h2>
            </div>

            {/* Center */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
              }}
            >
              <img
                src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
                width="150"
                height="150"
                alt={weather.weather[0].description}
              />
            </div>

            {/* Bottom-right */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                position: "absolute",
                bottom: "0",
                right: "0",
              }}
            >
              <h1>{weather.main.temp}°C</h1>
              <p>Feels like {weather.main.feels_like}°C</p>
              <h2>{weather.weather[0].description}</h2>
            </div>
          </div>
        </div>

        {/* Right Highlights */}
        <div
          style={{
            background:
              "linear-gradient(-135deg, #5177a9ff, #6b88b3, #6b88b3, #6b88b3, #8ca3c3, #a0b3cc, #a0b3cc, #c9d3dfff)",
            display: "flex",
            boxShadow: "0 4px 15px rgba(3, 19, 49, 0.5)",
            flexDirection: "column",
            padding: "30px",
            borderRadius: "14px",
            gap: "20px",
            flex: 1,
          }}
        >
          <h1 style={{ textAlign: "center" }}>Today's Highlight</h1>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: "15px",
              width: "100%",
            }}
          >
            {/* Wind Status */}
            <div
              style={{
                background:
                  "linear-gradient(-135deg, #4a6fa1, #6d83b5, #a7b5c9, #d9dbe0, #8a8fa3,0.1)",
                backdropFilter: "blur(20px)",
                boxShadow: "0 4px 15px rgba(3, 19, 49, 0.5)",
                padding: "15px",
                borderRadius: "10px",
                textAlign: "center",
              }}
            >
              <p>
                <img
                  src="https://cdn-icons-png.flaticon.com/512/1146/1146869.png"
                  alt="Wind Icon"
                  style={{
                    width: "25px",
                    height: "25px",
                    marginRight: "8px",
                    filter: "grayscale(100%) brightness(90%)",
                  }}
                />
                Wind Status
              </p>
              <h2>{weather.wind.speed} km/h</h2>
            </div>

            {/* Humidity */}
            <div
              style={{
                background:
                  "linear-gradient(-135deg, #4a6fa1, #6d83b5, #a7b5c9, #d9dbe0, #8a8fa3,0.1)",
                backdropFilter: "blur(20px)",
                boxShadow: "0 4px 15px rgba(3, 19, 49, 0.5)",
                padding: "15px",
                borderRadius: "10px",
                textAlign: "center",
              }}
            >
              <p
                style={{
                  marginBottom: "8px",
                  fontSize: "1.2rem",
                  marginTop: "0",
                  opacity: 0.7,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <img
                  src="https://cdn-icons-png.flaticon.com/512/728/728093.png"
                  alt="Humidity Icon"
                  style={{
                    width: "25px",
                    height: "25px",
                    marginRight: "8px",
                    filter: "grayscale(100%) brightness(90%)",
                  }}
                />
                Humidity
              </p>
              <h2>{weather.main.humidity}%</h2>
            </div>

            {/* Sunrise */}
            <div
              style={{
                background:
                  "linear-gradient(-135deg, #4a6fa1, #6d83b5, #a7b5c9, #d9dbe0, #8a8fa3,0.1)",
                backdropFilter: "blur(20px)",
                boxShadow: "0 4px 15px rgba(3, 19, 49, 0.5)",
                padding: "15px",
                borderRadius: "10px",
                textAlign: "center",
              }}
            >
              <p
                style={{
                  marginBottom: "8px",
                  fontSize: "1.2rem",
                  marginTop: "0",
                  opacity: 0.7,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <img
                  src="https://cdn-icons-png.flaticon.com/512/869/869869.png"
                  alt="Sunrise Icon"
                  style={{
                    width: "25px",
                    height: "25px",
                    marginRight: "8px",
                    filter: "grayscale(100%) brightness(90%)",
                  }}
                />
                Sunrise
              </p>
              <h2>
                {new Date(weather.sys.sunrise * 1000).toLocaleTimeString()}
              </h2>
            </div>

            {/* UV Index */}
            <div
              style={{
                background:
                  "linear-gradient(-135deg, #4a6fa1, #6d83b5, #a7b5c9, #d9dbe0, #8a8fa3,0.1)",
                backdropFilter: "blur(20px)",
                boxShadow: "0 4px 15px rgba(3, 19, 49, 0.5)",
                padding: "15px",
                borderRadius: "10px",
                textAlign: "center",
              }}
            >
              <p
                style={{
                  marginBottom: "8px",
                  fontSize: "1.2rem",
                  marginTop: "0",
                  opacity: 0.7,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <img
                  src="https://cdn-icons-png.flaticon.com/512/4837/4837671.png"
                  alt="Pressure Icon"
                  style={{
                    width: "25px",
                    height: "25px",
                    marginRight: "8px",
                    filter: "grayscale(100%) brightness(90%)",
                  }}
                />
                Pressure
              </p>
              <h2>{weather.main.pressure} hPa</h2>
            </div>

            {/* Visibility */}
            <div
              style={{
                background:
                  "linear-gradient(-135deg, #4a6fa1, #6d83b5, #a7b5c9, #d9dbe0, #8a8fa3,0.1)",
                backdropFilter: "blur(20px)",
                boxShadow: "0 4px 15px rgba(3, 19, 49, 0.5)",
                padding: "15px",
                borderRadius: "10px",
                textAlign: "center",
              }}
            >
              <p
                style={{
                  marginBottom: "8px",
                  fontSize: "1.2rem",
                  marginTop: "0",
                  opacity: 0.7,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <img
                  src="https://cdn-icons-png.flaticon.com/512/445/445270.png"
                  alt="Visibility Icon"
                  style={{
                    width: "25px",
                    height: "25px",
                    marginRight: "8px",
                    filter: "grayscale(100%) brightness(90%)",
                  }}
                />
                Visibility
              </p>
              <h2>{(weather.visibility / 1000).toFixed(1)} km</h2>
            </div>

            {/* Sunset */}
            <div
              style={{
                background:
                  "linear-gradient(-135deg, #4a6fa1, #6d83b5, #a7b5c9, #d9dbe0, #8a8fa3,0.1)",
                backdropFilter: "blur(20px)",
                boxShadow: "0 4px 15px rgba(3, 19, 49, 0.5)",
                padding: "15px",
                borderRadius: "10px",
                textAlign: "center",
              }}
            >
              <p
                style={{
                  marginBottom: "8px",
                  fontSize: "1.2rem",
                  marginTop: "0",
                  opacity: 0.7,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <img
                  src="https://cdn-icons-png.flaticon.com/512/3039/3039280.png"
                  alt="Sunset Icon"
                  style={{
                    width: "25px",
                    height: "25px",
                    marginRight: "8px",
                    filter: "grayscale(100%) brightness(90%)",
                  }}
                />
                Sunset
              </p>
              <h2>
                {new Date(weather.sys.sunset * 1000).toLocaleTimeString()}
              </h2>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default WeatherCard;
