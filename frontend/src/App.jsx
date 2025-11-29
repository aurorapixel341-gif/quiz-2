import React from "react";
import { useState } from "react";
import "../src/App.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Contact from "./components/Contact";
import About from "./components/About";
import Services from "./components/Services";
import Landinpage from "./components/Landinpage";
import TermCondition from "./components/TermCondition";
import HomePage from "./components/HomePage";
import Login from "./components/Login";
import Register from "./components/Register";
import Map from "./components/Map";
import ClothingSuggestions from "./components/ClothingSuggestions";
import AirQualityIndex from "./components/AirQualityIndex";
import Logout from "./components/logout";
import UpdateName from "./components/UpdateName";
import UpdatePassword from "./components/UpdatePassword";
import DeleteAccount from "./components/DeleteAccount";

// API key is hardcoded in WeatherCard and Hourlyforecast, so we'll use it here too.
const Apikey = "2446aa6befab420ae365c88d4e92c5cf";

function App() {
  const [searchCity, setSearchCity] = useState("gujrat");

  // Existing function for city-based search
  const handleSearch = (city) => {
    setSearchCity(city);
    console.log("Searched city:", city);
  };

  // **NEW FUNCTIONALITY: Geolocation search**
  const handleCurrentLocation = ({ lat, lon }) => {
    // OpenWeatherMap Reverse Geocoding API to get city name from coordinates
    const reverseGeocodeUrl = `https://api.openweathermap.org/geo/1.0/reverse?lat=${lat}&lon=${lon}&limit=1&appid=${Apikey}`;

    fetch(reverseGeocodeUrl)
      .then((response) => response.json())
      .then((data) => {
        if (data && data.length > 0 && data[0].name) {
          const cityName = data[0].name;
          setSearchCity(cityName);
          console.log("Current location searched:", cityName);
        } else {
          console.error("Could not find city name for coordinates.");
          // Fallback to a default or keep the current city
        }
      })
      .catch((error) =>
        console.error("Error fetching city from coordinates:", error)
      );
  };
  // **END NEW FUNCTIONALITY**

  return (
    <div>
      <Router>
        {/* **PASSING THE NEW PROP** */}
        <Header
          onSearch={handleSearch}
          onCurrentLocation={handleCurrentLocation}
        />

        <Routes>
          <Route exact path="/" element={<HomePage />} />

          <Route
            exact
            path="/dashboard"
            element={<Landinpage searchCity={searchCity} />}
          />
          <Route
            exact
            path="/services"
            element={<Services searchCity={searchCity} />}
          />
          <Route
            exact
            path="/MapService"
            element={<Map initialCity={searchCity} />}
          />
          <Route exact path="/AirQualityIndex" element={<AirQualityIndex />} />
          <Route exact path="/changeusername" element={<UpdateName />} />
          <Route exact path="/changepassword" element={<UpdatePassword />} />
          <Route exact path="/deleteaccount" element={<DeleteAccount />} />

          <Route exact path="/logout" element={<Logout />} />

          <Route
            exact
            path="/ClothingSuggestions"
            element={<ClothingSuggestions />}
          />
          <Route exact path="/about" element={<About />} />
          <Route exact path="/contact" element={<Contact />} />
          <Route exact path="/termANDconditions" element={<TermCondition />} />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/register" element={<Register />} />
        </Routes>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
