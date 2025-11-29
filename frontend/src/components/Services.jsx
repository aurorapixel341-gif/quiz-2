import React, { useEffect, useRef, useState } from "react";
import "./Services.css";
import Hourlyforecast from "../components/Hourlyforecast";
import Dayforecast from "../components/Dayforecast";
import Weathercard from "../components/Weathercard";
import "./Animation.css";

const servicesList = [
  {
    title: "Live Weather Forecasts",
    desc: " live weather updates including temperature, humidity, and wind.",
    type: "current",
  },
  {
    title: "Hourly Forecast",
    desc: "Detailed predictions for the next 48 hours.",
    type: "hourly",
  },
  {
    title: "5-Day Forecast",
    desc: "Reliable daily weather outlook for the next 7 days with hourly breakdown.",
    type: "daily",
  },
  {
    title: "15-Day Forecast",
    desc: "Extended daily weather outlook for the next 15 days.",
    type: "daily-15",
  },
  {
    title: "Weather by Location",
    desc: "Get weather automatically based on your browser location.",
    type: "location",
  },
  {
    title: "Live Weather Map",
    desc: "View real-time global weather conditions, forecasts, and map visuals powered by live data.",
    type: "location",
  },
  {
    title: "Clothing Suggestion",
    desc: "Get personalized outfit recommendations based on your city’s current temperature and weather.",
    type: "location",
  },
  {
    title: "Air Quality Index",
    desc: "We're providing real-time air quality index updates to help you breathe easier and stay informed about the air quality in your area.",
    type: "location",
  },
];

export default function Services({ searchCity }) {
  const lineRef = useRef();
  const [visibleBoxes, setVisibleBoxes] = useState([]);
  const [activeService, setActiveService] = useState(null);

  useEffect(() => {
    const boxes = document.querySelectorAll(".service-box");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = Number(entry.target.dataset.index);
            setVisibleBoxes((prev) => [...new Set([...prev, index])]);
          }
        });
      },
      { threshold: 0.5 }
    );

    boxes.forEach((box) => observer.observe(box));

    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.body.scrollHeight - window.innerHeight;
      const progress = (scrollTop / docHeight) * 100;
      if (lineRef.current) {
        lineRef.current.style.height = `${Math.min(progress, 85)}%`;
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="services-page weather-container">
      {/* Intro Section */}
      <section className="intro">
        <h1>Our Premium Weather Services</h1>
        <p>
          From real-time alerts to personalized lifestyle tips, explore the
          tools designed to keep you informed, prepared, and one step ahead of
          the weather.
        </p>
      </section>

      {/* Services Timeline */}
      <section className="services-timeline">
        <div className="line" ref={lineRef}></div>
        {servicesList.map((service, index) => (
          <div
            key={index}
            data-index={index}
            className={`service-box ${index % 2 === 0 ? "left" : "right"} ${
              visibleBoxes.includes(index) ? "visible" : ""
            }`}
            onClick={() => setActiveService(service)}
          >
            <div className="content">
              <h2>{service.title}</h2>
              <p>{service.desc}</p>
            </div>
          </div>
        ))}

        {activeService && (
          <div className="modal-overlay" onClick={() => setActiveService(null)}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
              {activeService.type === "hourly" ? (
                <Hourlyforecast searchCity={searchCity} />
              ) : activeService.type === "current" ? (
                <Weathercard searchCity={searchCity} />
              ) : activeService.type === "daily" ? (
                <Dayforecast searchCity={searchCity} />
              ) : (
                <p>{activeService.desc}</p>
              )}
              <button onClick={() => setActiveService(null)}>Close</button>
            </div>
          </div>
        )}
      </section>
    </div>
  );
}
