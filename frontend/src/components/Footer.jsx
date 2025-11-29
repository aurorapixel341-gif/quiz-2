import React from "react";
import {
  FaGithub,
  FaLinkedin,
  FaInstagram,
  FaWhatsapp,
  FaTwitter,
  FaFacebook,
} from "react-icons/fa";
import logoGif from "../assets/forest-unscreen.gif";
import { Link } from "react-router-dom";

function Footer() {
  // Hover handler functions
  const handleMouseEnter = (e) => {
    e.target.style.color = "#00bfff"; // highlight color
    e.target.style.textDecoration = "underline";
  };

  const handleMouseLeave = (e) => {
    e.target.style.color = "white";
    e.target.style.textDecoration = "none";
  };

  return (
    <div
      style={{
        left: 0,
        width: "100%",
        zIndex: 9999,
        background: "#57769f73",
        backdropFilter: "blur(10px)",
        WebkitBackdropFilter: "blur(10px)",
        color: "white",
        transition: "all 0.3s ease",
        boxShadow: "0 -4px 10px rgba(0,0,0,0.4)",
        fontFamily: "Poppins, sans-serif",
      }}
    >
      <hr style={{ borderColor: "rgba(255,255,255,0.1)" }} />
      <div
        style={{
          display: "flex",
          justifyContent: "space-around",
          padding: "20px",
        }}
      >
        <div>
          <h3 style={{ color: "#00bfff" }}>Weather App</h3>
          <Link
            to="/"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            style={{
              display: "block",
              margin: "5px 0",
              textDecoration: "none",
              color: "white",
              paddingLeft: "20px",
            }}
          >
            Home
          </Link>
          <Link
            to="/contact"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            style={{
              display: "block",
              margin: "5px 0",
              textDecoration: "none",
              color: "white",
              paddingLeft: "20px",
            }}
          >
            Contact Us
          </Link>
          <Link
            to="/about"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            style={{
              display: "block",
              margin: "5px 0",
              textDecoration: "none",
              color: "white",
              paddingLeft: "20px",
            }}
          >
            About us
          </Link>
          <Link
            to="/termANDconditions"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            style={{
              display: "block",
              margin: "5px 0",
              textDecoration: "none",
              color: "white",
              paddingLeft: "20px",
            }}
          >
            Term & Conditions
          </Link>
        </div>
        <div>
          <h3 style={{ color: "#00bfff" }}>Services</h3>
          <Link
            to="/services"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            style={{
              display: "block",
              margin: "5px 0",
              textDecoration: "none",
              color: "white",
              paddingLeft: "20px",
            }}
          >
            services
          </Link>
          <Link
            to="/MapService"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            style={{
              display: "block",
              margin: "5px 0",
              textDecoration: "none",
              color: "white",
              paddingLeft: "20px",
            }}
          >
            Live Map
          </Link>
          <Link
            to="/ClothingSuggestions"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            style={{
              display: "block",
              margin: "5px 0",
              textDecoration: "none",
              color: "white",
              paddingLeft: "20px",
            }}
          >
            Clothing Suggestions
          </Link>
          <Link
            to="/AirQualityIndex"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            style={{
              display: "block",
              margin: "5px 0",
              textDecoration: "none",
              color: "white",
              paddingLeft: "20px",
            }}
          >
            Air Quality Index
          </Link>
        </div>
        <div>
          <h3 style={{ color: "#00bfff" }}>Social Links</h3>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              marginTop: "10px",
            }}
          >
            <div style={{ display: "flex", gap: "30px", paddingLeft: "20px" }}>
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: "black", fontSize: "24px" }}
              >
                <FaGithub />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: "#0e76a8", fontSize: "24px" }}
              >
                <FaLinkedin />
              </a>
            </div>
            <div style={{ display: "flex", gap: "30px", paddingLeft: "20px" }}>
              <a
                href="https://www.instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: "#C13584", fontSize: "24px" }}
              >
                <FaInstagram />
              </a>
              <a
                href="https://web.whatsapp.com"
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: "#25D366", fontSize: "24px" }}
              >
                <FaWhatsapp />
              </a>
            </div>
            <div style={{ display: "flex", gap: "30px", paddingLeft: "20px" }}>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: "#1DA1F2", fontSize: "24px" }}
              >
                <FaTwitter />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: "#1877F2", fontSize: "24px" }}
              >
                <FaFacebook />
              </a>
            </div>
          </div>
        </div>
        <div>
          <Link to="/">
            <img
              src={logoGif}
              alt="Logo GIF"
              style={{ width: "100px", height: "auto" }}
            />
          </Link>
        </div>
      </div>
      <div
        style={{
          padding: "20px",
          borderTop: "1px solid #ccc",
          textAlign: "center",
        }}
      >
        <p>&copy; Aurora Pixels. All rights reserved.</p>
      </div>
    </div>
  );
}

export default Footer;
