import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";

import "./Animation.css";

// ⭐️ CHANGE 1: The component now accepts 'initialCity' as a prop
function Map({ initialCity }) {
  // ⭐️ CHANGE 2: Removed local 'city' state as it's now a prop
  const [iframeSrc, setIframeSrc] = useState(
    "https://embed.windy.com/embed2.html?lat=24.86&lon=67.0&zoom=5&level=surface&overlay=temperature" // Initial map location (Gujrat)
  );
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("userToken");

    // If token doesn't exist, redirect to login
    if (!token) {
      alert("Session expired or invalid. Please log in again.");
      navigate("/login");
    }
  }, [navigate]);

  // Using Nominatim (OpenStreetMap) for geocoding
  // ⭐️ CHANGE 3: Function now explicitly takes 'city' as an argument
  const fetchCityCoordinates = useCallback(async (city) => {
    if (!city) return;

    // Optional: Log to see when the search is triggered
    console.log("Map component is searching for:", city);

    try {
      const res = await fetch(
        `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(
          city
        )}&format=json&limit=1`
      );
      const data = await res.json();

      if (data && data.length > 0) {
        const { lat, lon } = data[0];
        // ⭐️ IMPORTANT: Setting zoom to 9 for a better city-level view
        setIframeSrc(
          `https://embed.windy.com/embed2.html?lat=${lat}&lon=${lon}&zoom=9&level=surface&overlay=temperature`
        );
      } else {
        // You might want a less disruptive error for a map widget
        console.error(`Location "${city}" not found.`);
        // alert("Location not found!"); // Keeping the alert from your original code
      }
    } catch (error) {
      console.error("Error fetching location:", error);
      alert("Failed to fetch location. Try again.");
    }
  }, []); // useCallback memoizes the function

  // ⭐️ CHANGE 4: Use useEffect to trigger the search when initialCity prop changes
  useEffect(() => {
    // Only fetch coordinates if a city is provided (to avoid unnecessary initial fetch if 'gujrat' is the default)
    if (initialCity) {
      fetchCityCoordinates(initialCity);
    }
  }, [initialCity, fetchCityCoordinates]); // Dependencies: Re-run when initialCity or the fetch function changes

  return (
    <div className="weather-container">
      {/* ⭐️ CHANGE 5: Removed the local search input and button from Map.js */}
      {/* The search functionality is now solely in the Header component. */}

      <iframe
        key={iframeSrc} // Add a key to force re-render if needed, though changing src should suffice
        src={iframeSrc}
        width="100%"
        height="500vh"
        frameBorder="0"
        title="Windy Map"
      ></iframe>
    </div>
  );
}

export default Map;
