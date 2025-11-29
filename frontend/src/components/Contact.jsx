import React, { useState } from "react";
import "./Contact.css";
import "./Animation.css";
import {
  FaEnvelope,
  FaMapMarkerAlt,
  FaGlobe,
  FaGithub,
  FaWhatsapp,
} from "react-icons/fa";
import { FaEnvelope as FaEnvelopeSolid } from "react-icons/fa6";

function Contact() {
  const [active, setActive] = useState("form");

  const [formMessage, setFormMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormMessage("✅ Message sent! We'll get back to you soon.");
    e.target.reset();
  };

  return (
    <div className="contact-container weather-container">
      {/* Nav Pills */}
      <div className="pill-nav">
        <button
          className={`pill-btn ${active === "form" ? "active" : ""} `}
          onClick={() => setActive("form")}
        >
          Contact Form
        </button>
        <button
          className={`pill-btn ${active === "location" ? "active" : ""}`}
          onClick={() => setActive("location")}
        >
          Location
        </button>
        <button
          className={`pill-btn ${active === "socials" ? "active" : ""}`}
          onClick={() => setActive("socials")}
        >
          Socials
        </button>
      </div>

      <div className="tab-content">
        {active === "form" && (
          <div className="tab-pane weather-container">
            <h2 style={{ display: "flex", gap: "10px", padding: "10px" }}>
              <FaEnvelope /> Get in Touch
            </h2>

            <form className="contact-form" onSubmit={handleSubmit}>
              <input type="text" placeholder="Your Name" required />
              <input type="email" placeholder="Your Email" required />
              <textarea placeholder="Write your message..." rows="4" required />
              <button type="submit">Send Message</button>
            </form>

            {formMessage && (
              <p
                style={{
                  marginTop: "10px",
                  fontWeight: "bold",
                  color: "white",
                  backgroundColor: "black",
                  padding: "8px",
                  borderRadius: "5px",
                }}
              >
                {formMessage}
              </p>
            )}
          </div>
        )}

        {active === "location" && (
          <div className="tab-pane weather-container">
            <h2
              style={{
                display: "flex",
                gap: "10px",
                paddingBottom: "10px",
                paddingLeft: "10px",
              }}
            >
              <FaMapMarkerAlt style={{ color: "red" }} /> Our Location
            </h2>
            <iframe
              title="map"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3401.30999274054!2d74.07840797553622!3d32.57319099694695!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x391f0f1ab68b97f7%3A0x917c6b8f079bf7c9!2sGujrat%2C%20Punjab%2C%20Pakistan!5e0!3m2!1sen!2s!4v1735954321111!5m2!1sen!2s"
              width="100%"
              height="300"
              style={{ border: 0, borderRadius: "12px" }}
              allowFullScreen
              loading="lazy"
            ></iframe>
          </div>
        )}

        {active === "socials" && (
          <div className="tab-pane weather-container">
            <h2
              style={{
                display: "flex",
                gap: "10px",
                paddingBottom: "10px",
                paddingLeft: "10px",
              }}
            >
              <FaGlobe style={{ color: "#c9c7c7ff" }} /> Connect with Us
            </h2>
            <h3
              style={{ textAlign: "center", padding: "10px", fontSize: "30px" }}
            >
              Aurora Pixel
            </h3>
            <p
              style={{
                textAlign: "center",
                marginBottom: "20px",
                color: "white",
                lineHeight: "1.6",
              }}
            >
              Where code meets creativity,
              <br />
              and pixels tell stories.
              <br />
              Let’s make the web a little more alive ✨
            </p>
            <ul className="social-links">
              <li>
                <a href="https://github.com/aurorapixel341-gif">
                  <FaGithub style={{ fontSize: "30px" }} />
                </a>
              </li>
              <li>
                <a href="mailto:aurorapixel341@gmail.com">
                  <FaEnvelopeSolid style={{ fontSize: "30px" }} />
                </a>
              </li>
              <li>
                <a
                  href="https://wa.me/923066473361"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaWhatsapp style={{ fontSize: "30px" }} />
                </a>
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}

export default Contact;
