import React from "react";
import { useState, useEffect } from "react";
import "./About.css";
import "./Animation.css";

function About() {
  const [fill, setFill] = useState({
    teamwork: "0%",
    creativity: "0%",
    innovation: "0%",
  });

  useEffect(() => {
    // Fill bars after component mounts
    setTimeout(() => {
      setFill({
        teamwork: "100%",
        creativity: "95%",
        innovation: "90%",
      });
    }, 2000);
  }, []);

  return (
    <div className="about-container weather-container">
      <div className="hero">
        <h1 className="about-title">About aurorapixel</h1>
        <p className="about-text">
          We are a passionate trio—Amna, Tatheer, and Umara—working side by side
          to bring ideas to life. From planning and designing to coding and
          testing, we do everything together, combining our skills and
          creativity to build modern, user-friendly web applications. Our shared
          vision is to create digital experiences that are not only functional
          but also engaging and memorable.
        </p>
      </div>

      <h1
        style={{ textShadow: "2px 2px 3px rgba(0, 0, 0, 0.95)" }}
        className="about-title"
      >
        why aurorapixel?
      </h1>
      <div className="about-cards">
        <div className="card">
          <h2>🚀 Innovation</h2>
          <p>We bring new ideas to life using cutting-edge technology.</p>
        </div>
        <div className="card">
          <h2>💡 Creativity</h2>
          <p>Designs that inspire, engage, and make a difference.</p>
        </div>
        <div className="card">
          <h2>🤝 Teamwork</h2>
          <p>Together we achieve excellence with collaboration and trust.</p>
        </div>
      </div>

      <div className="skills">
        <h2 style={{ textShadow: "2px 2px 3px rgba(0, 0, 0, 0.95)" }}>
          Teamwork
        </h2>
        <div className="skill-bar">
          <div style={{ width: fill.teamwork }}></div>
        </div>

        <h2 style={{ textShadow: "2px 2px 3px rgba(0, 0, 0, 0.95)" }}>
          Creativity
        </h2>
        <div className="skill-bar">
          <div style={{ width: fill.creativity }}></div>
        </div>

        <h2 style={{ textShadow: "2px 2px 3px rgba(0, 0, 0, 0.95)" }}>
          Innovation
        </h2>
        <div className="skill-bar">
          <div style={{ width: fill.innovation }}></div>
        </div>
      </div>

      <section className="team-section">
        <h2 style={{ textShadow: "2px 2px 3px rgba(0, 0, 0, 0.95)" }}>
          Meet Our Team
        </h2>
        <div className="team-grid">
          <div className="team-member">
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR6u-oKiykQBjvktvPLp9FezSxSDsp44R1-Kg&s"
              alt="member"
            />
            <h3>Amna Batool</h3>
          </div>
          <div className="team-member">
            <img
              src="  https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ2_VIkQw36yJbEnpUOAFdQMfLaciv50WaHuw&s"
              alt="member"
            />

            <h3>Tatheer Sabir</h3>
          </div>
          <div className="team-member">
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRI9qTOf2VykAgGEq9fIYxdp-HtbL7oWAd0XA&s"
              alt="member"
            />
            <h3>Umara Riasat</h3>
          </div>
        </div>
      </section>
    </div>
  );
}

export default About;
