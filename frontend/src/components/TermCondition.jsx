import React, { useEffect, useRef, useState } from "react";
import "./Services.css";
import "./Animation.css";

const servicesList = [
  {
    title: "1. Data Accuracy",
    desc: "Weather data is provided for general informational purposes only. We do not guarantee 100% accuracy.",
  },
  {
    title: "2. Liability",
    desc: "The app is not responsible for any decisions or actions taken based on the forecast information.",
  },
  {
    title: "3. Privacy",
    desc: "Users must respect privacy; personal data should not be shared without consent.",
  },
  {
    title: "4. Usage Data",
    desc: "Anonymous usage data may be collected to improve the app's functionality and user experience.",
  },
  {
    title: "5. Notifications",
    desc: "Alerts and notifications do not replace official emergency services or government warnings.",
  },
  {
    title: "6. 'As-Is' Disclaimer",
    desc: "The app is provided 'as-is' without any warranties regarding performance or reliability.",
  },
  {
    title: "7. Misuse",
    desc: "Misuse of the app or violation of terms may result in restricted access or account suspension.",
  },
];

export default function Services() {
  const lineRef = useRef();
  const [visibleBoxes, setVisibleBoxes] = useState([]);
  const [ActiveService, setActiveService] = useState(null);

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
        lineRef.current.style.height = `${Math.min(progress, 93)}%`;
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="services-page weather-container">
      {/* Intro Section */}
      <section className="intro">
        <h1>Our Weather App Terms and Conditions</h1>
        <p>Please read these carefully</p>
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
      </section>
    </div>
  );
}
