import React from "react";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import "./Animation.css"; // Assuming you keep your animations here

// --- Cloud-Themed Colors (Accents for Text, Buttons, Glow) ---
const CLOUD_ACCENT = "#bfdbfe"; // Soft light blue/cloud color
const CLOUD_GLOW = "rgba(255, 255, 255, 0.4)"; // Ethereal white glow

// --- Data Definitions (Unchanged) ---
const articles = [
  {
    title: "How to Protect Yourself from Heatwaves",
    description:
      "Learn the best practices to stay safe during extreme heat and keep your body hydrated.",
    content:
      "Heatwaves can be dangerous. Stay hydrated, avoid direct sun, wear light clothing, and protect children, elderly, and pets.",
  },
  {
    title: "Understanding Air Quality Indexes",
    description:
      "Discover what AQI means and how to adjust your activities according to air quality levels.",
    content:
      "The AQI (Air Quality Index) measures air pollution. Lower numbers mean cleaner air. Limit outdoor activity when AQI is high.",
  },
  {
    title: "Smart Tips for Rainy Days",
    description:
      "Stay prepared during rain with clothing, travel, and safety tips.",
    content:
      "During rainy days, wear waterproof clothing, keep electronics protected, plan travel carefully, and avoid flooded areas.",
  },
];

const features = [
  {
    title: "Comprehensive Weather Reports",
    icon: "🌦",
    description:
      "Get a complete, real-time overview of the current weather. Visualize key metrics including temperature, humidity, wind pressure, and visibility in detailed hourly graphs and data tables.",
    details: [
      "Real-time data synchronization.",
      "In-depth hourly metric breakdowns.",
      "Forecast summaries to guide your planning.",
    ],
    // NOTE: Update these paths to point to your actual screenshot images!
    imgSrc: "src/assets/image copy 3.png",
    layout: "text-left",
  },
  {
    title: "Dynamic 7-Day Forecast View",
    icon: "📅",
    description:
      "View your entire week at a glance. Our sleek, interactive forecast cards summarize daily high/low temperatures, precipitation chances, and wind patterns, allowing for effortless long-term planning.",
    details: [
      "Sleek visual forecast cards.",
      "High/low temperature trends.",
      "Supported by satellite visuals.",
    ],
    imgSrc: "src/assets/image copy 2.png",
    layout: "text-right",
  },
  {
    title: "Proactive Air Quality Monitoring",
    icon: "🚨",
    description:
      "Stay safe with real-time Air Quality Index (AQI) alerts. Receive instant notifications for dangerous pollution levels and get contextual advice on recommended outdoor activities and personal safety measures.",
    details: [
      "Real-time AQI level alerts.",
      "Recommendations for outdoor activity.",
      "Data ranging from 'Good' to 'Hazardous'.",
    ],
    imgSrc: "src/assets/image copy 4.png",
    layout: "text-left",
  },
  {
    title: "Interactive Global Map View",
    icon: "🌎",
    description:
      "Explore weather patterns directly on a dynamic, high-definition map. Zoom in for city-specific microclimate data or pan across continents to track major weather fronts in an engaging, fluid interface.",
    details: [
      "Dynamic, high-definition map layer.",
      "Global to local-area data visualization.",
      "Intuitive climate pattern exploration.",
    ],
    imgSrc: "src/assets/image.png",
    layout: "text-right",
  },
  {
    title: "Smart Clothing Recommendations",
    icon: "👕",
    description:
      "Lume gives you personalized outfit tips based on your city's exact temperature and conditions. Never be caught off-guard by a sudden temperature drop or unexpected rain again.",
    details: [
      "Personalized outfit suggestions.",
      "Tips for sun, rain, and cold.",
      "Stay comfortable and prepared.",
    ],
    imgSrc: "src/assets/image copy.png",
    layout: "text-left",
  },
];

// --- Dynamic Feature Section Styles (The Split-Glow Design) ---
const featureContainerStyle = {
  borderTop: `1px solid ${CLOUD_ACCENT}`,
  paddingTop: "5rem",
};

const featureImageContainerStyle = {
  flex: "1 1 420px",
  maxWidth: "450px",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  padding: "1rem",
  background: "none",
};

const featureImageStyle = {
  width: "100%",
  borderRadius: "25px",
  objectFit: "cover",
  transform: "none",
  // The 'Glow' - thin, atmospheric white/blue box shadow for ethereal depth
  boxShadow: `0 0 40px ${CLOUD_GLOW}, 0 8px 15px rgba(0, 0, 0, 0.5)`,
  transition: "box-shadow 0.5s ease",
  border: "4px solid #334155", // Subtle frame for the device
};

const featureTextBlockStyle = {
  flex: "1 1 420px",
  background: "none",
  padding: "1rem 0 1rem 2.5rem",
  color: "white",
  height: "auto",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "flex-start",
  textAlign: "left",
};

function HomePage() {
  const [openIndex, setOpenIndex] = useState(null);
  const [dynamicBgUrl, setDynamicBgUrl] = useState(""); // State for dynamic background

  // --- Dynamic Background Fetch Simulation ---

  // --- Style Object for Dark Sections with Dynamic Background and Overlay ---
  const dynamicSectionStyle = {
    // Gradient overlay (rgba) ensures light text is readable on ANY background image
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    backgroundAttachment: "fixed", // Keeps image fixed for parallax effect (Optional)
    color: "white",
    minHeight: "400px",
    position: "relative",
    padding: "6rem 8%",
  };

  return (
    <div
      className="weather-container"
      style={{
        fontFamily: "Poppins, sans-serif",
        color: "#1e293b",
        overflowX: "hidden",
      }}
    >
      {/* --- HERO SECTION (Kept the soft light CLOUD background) --- */}
      <section
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          flexWrap: "wrap",
          minHeight: "19vh",
          position: "relative",
          // Cloud Gradient: Light, soft, and misty
          background:
            "linear-gradient(-135deg, #a0ccf0, #c3e0f0, #e0f2ff, #c3e0f0, #a0ccf0)",
          padding: "5rem 8% 5rem 8%", // Ensure padding for the light section
        }}
      >
        {/* Left Side (Text) - Dark Text on Light Cloud Background */}
        <div
          style={{
            zIndex: 1,
            paddingRight: "25px",
            flex: "1 1 50%",
            minWidth: "350px",
          }}
        >
          <h1
            style={{
              fontSize: "4rem",
              fontWeight: "800",
              color: "#1e293b", // Dark text for contrast
              marginBottom: "1rem",
              textShadow: "0 4px 10px rgba(255,255,255,0.4)",
            }}
          >
            The Lume
          </h1>
          <p
            style={{
              fontSize: "1.2rem",
              lineHeight: "1.8",
              color: "#334155", // Darker body text
              marginBottom: "2rem",
              maxWidth: "550px",
            }}
          >
            Where the unpredictable sky meets unshakeable trust. Stay one step
            ahead with accurate, real-time weather forecasts — all in a
            beautifully designed interface that makes planning effortless.
          </p>

          <button
            style={{
              // Light, Airy Button Gradient
              background: "linear-gradient(90deg, #dbeafe, #eff6ff)",
              color: "#1e3a8a", // Dark blue text
              border: "none",
              padding: "0.9rem 2.2rem",
              borderRadius: "50px",
              fontSize: "1.1rem",
              cursor: "pointer",
              boxShadow: "0 8px 20px rgba(0,0,0,0.1)",
              transition: "all 0.3s ease",
            }}
            onMouseOver={(e) => (e.target.style.transform = "translateY(-4px)")}
            onMouseOut={(e) => (e.target.style.transform = "translateY(0)")}
          >
            <Link
              style={{
                color: "#1e3a8a",
                textDecoration: "none",
                fontWeight: "700",
                letterSpacing: "0.5px",
              }}
              to="/"
            >
              Explore Weather
            </Link>
          </button>
        </div>

        {/* Right Side (Image) */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 1,
            flex: "1 1 40%",
            minWidth: "300px",
          }}
        >
          <img
            src={
              "https://i.pinimg.com/originals/68/85/c4/6885c4b9f5e11a405c94f2ab0192fa9c.gif"
            }
            alt="Weather preview"
            style={{
              width: "100%",
              maxWidth: "650px",
              boxShadow: "0 12px 35px rgba(0,0,0,0.3)",
              transform: "scale(1)",
              transition: "transform 0.4s ease",
            }}
          />
        </div>
      </section>

      {/* --- WHAT'S INSIDE SECTION (NOW DYNAMIC) --- */}
      <section
        style={{
          background: "rgba(0, 0, 0, 0.13)",
          ...dynamicSectionStyle,
          textAlign: "center",
        }}
      >
        <h2
          style={{
            fontSize: "5rem",
            fontWeight: "700",
            marginBottom: "3rem",
            color: "white",
            textShadow: "0 4px 15px rgba(0, 0, 0, 0.9)",
          }}
        >
          What`s inside?
        </h2>
        <p
          style={{
            fontSize: "1.1rem",
            color: "white",
            textShadow: "0 2px 6px rgba(0, 0, 0, 0.6)",
            maxWidth: "800px",
            margin: "0 auto 3rem",
            lineHeight: "1.7",
          }}
        >
          At <b>The Lume</b>, we provide live and precise weather updates based
          on your current location. You can instantly access your local weather,
          track your city’s hourly changes, and view detailed metrics like
          longitude, latitude, wind pressure, humidity, and temperature. With
          real-time alerts, we ensure you stay ahead of any weather shift.
        </p>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
            gap: "2rem",
          }}
        >
          <div
            style={{
              background:
                "linear-gradient(-135deg, #5177a9ff, #6b88b3, #8ca3c3, #a0b3cc, #a0b3cc, #c9d3dfff)",
              backdropFilter: "blur(5px)", // Frosted glass effect (Optional)
              borderRadius: "12px",
              padding: "2rem",
              boxShadow: "0 4px 10px rgba(0,0,0,0.4)",
              color: "white",
            }}
          >
            <img
              src="https://cdn-icons-png.flaticon.com/512/1116/1116453.png"
              alt="Location"
              style={{
                filter: "invert(100%)",
                width: "60px",
                marginBottom: "1rem",
              }} // Invert for white icon
            />
            <h3>Live Location</h3>
            <p style={{ color: "white" }}>
              Get instant weather reports using your live GPS location.
            </p>
          </div>

          <div
            style={{
              background:
                "linear-gradient(-135deg, #5177a9ff, #6b88b3, #8ca3c3, #a0b3cc, #a0b3cc, #c9d3dfff)",
              backdropFilter: "blur(5px)",
              borderRadius: "12px",
              padding: "2rem",
              boxShadow: "0 4px 10px rgba(0,0,0,0.4)",
              color: "white",
            }}
          >
            <img
              src="https://cdn-icons-png.flaticon.com/512/2938/2938179.png"
              alt="Analytics"
              style={{
                filter: "invert(100%)",
                width: "60px",
                marginBottom: "1rem",
              }}
            />
            <h3>Detailed Metrics</h3>
            <p style={{ color: "white" }}>
              Track wind speed, humidity, pressure, and other vital stats.
            </p>
          </div>

          <div
            style={{
              backdropFilter: "blur(5px)",
              borderRadius: "12px",
              padding: "2rem",
              boxShadow: "0 4px 10px rgba(0,0,0,0.4)",
              color: "white",
              background:
                "linear-gradient(-135deg, #5177a9ff, #6b88b3, #8ca3c3, #a0b3cc, #a0b3cc, #c9d3dfff)",
            }}
          >
            <img
              src="https://cdn-icons-png.flaticon.com/512/535/535239.png"
              alt="Alerts"
              style={{
                filter: "invert(100%)",
                width: "60px",
                marginBottom: "1rem",
              }}
            />
            <h3>Weather Alerts</h3>
            <p style={{ color: "white" }}>
              Stay updated with timely alerts for sudden weather changes.
            </p>
          </div>
        </div>
      </section>

      {/* --- DYNAMIC FEATURE SECTION (NOW DYNAMIC) --- */}
      <section
        style={{
          ...dynamicSectionStyle,
          // Adjust padding to work with the fixed background
          backgroundAttachment: "scroll",
        }}
      >
        {/* Heading */}
        <div
          style={{
            textAlign: "center",
            position: "relative",
            zIndex: 1,
            paddingBottom: "4rem",
          }}
        >
          <h2
            style={{
              fontSize: "4rem",
              fontWeight: "800",
              color: "#ffffff",
              letterSpacing: "1px",
              textShadow: "0 4px 18px rgba(0, 0, 0, 0.6)",
              marginBottom: "1.5rem",
            }}
          >
            Advanced Features, Structured
          </h2>
          <p
            style={{
              fontSize: "1.2rem",
              color: "rgba(255,255,255,0.8)",
              maxWidth: "800px",
              margin: "0 auto",
              lineHeight: "1.8",
            }}
          >
            Lume integrates powerful weather technology into a clean, modern
            experience. Discover the clarity of next-generation weather
            prediction.
          </p>
        </div>

        {/* Mapped Features with Alternating Layout */}
        {features.map((feature, i) => (
          <div
            key={i}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              // Alternate layout direction
              flexDirection:
                feature.layout === "text-left" ? "row" : "row-reverse",
              flexWrap: "wrap",
              gap: "4rem",
              marginTop: "5rem",
              position: "relative",
              zIndex: 1,
              ...featureContainerStyle,
            }}
          >
            {/* TEXT BLOCK (With Vertical Accent) */}
            <div
              style={{
                ...featureTextBlockStyle,
                // Adjust border based on layout direction for symmetry
                borderLeft:
                  feature.layout === "text-left"
                    ? `4px solid ${CLOUD_ACCENT}`
                    : "none",
                borderRight:
                  feature.layout === "text-right"
                    ? `4px solid ${CLOUD_ACCENT}`
                    : "none",
                paddingLeft: feature.layout === "text-left" ? "2.5rem" : "1rem",
                paddingRight:
                  feature.layout === "text-right" ? "2.5rem" : "1rem",
              }}
            >
              <h2
                style={{
                  fontSize: "2.5rem",
                  fontWeight: "700",
                  color: "#ffffff",
                  marginBottom: "1rem",
                  // Cloud Accent Shadow
                  textShadow: `1px 1px 0 ${CLOUD_ACCENT}`,
                }}
              >
                {feature.icon} {feature.title}
              </h2>
              <p
                style={{
                  fontSize: "1.15rem",
                  lineHeight: "1.8",
                  color: "#cbd5e1",
                  marginBottom: "1.5rem",
                }}
              >
                {feature.description}
              </p>
              <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
                {feature.details.map((detail, dIndex) => (
                  <li
                    key={dIndex}
                    style={{
                      fontSize: "1.05rem",
                      lineHeight: "2.2",
                      fontWeight: "500",
                      color: CLOUD_ACCENT,
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    <span
                      style={{
                        color: CLOUD_ACCENT,
                        fontSize: "1.2rem",
                        marginRight: "0.8rem",
                      }}
                    >
                      ➤
                    </span>
                    <span style={{ color: "#e2e8f0" }}>{detail}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* IMAGE BLOCK (The Static Mockup with CLOUD Glow) */}
            <div
              style={featureImageContainerStyle}
              // Add a hover effect for dynamic glow
              onMouseOver={(e) =>
                (e.currentTarget.firstChild.style.boxShadow = `0 0 60px rgba(255, 255, 255, 0.6), 0 12px 20px rgba(0, 0, 0, 0.7)`)
              }
              onMouseOut={(e) =>
                (e.currentTarget.firstChild.style.boxShadow = `0 0 40px ${CLOUD_GLOW}, 0 8px 15px rgba(0, 0, 0, 0.5)`)
              }
            >
              <img
                src={feature.imgSrc}
                alt={feature.title}
                style={featureImageStyle}
              />
            </div>
          </div>
        ))}
      </section>

      {/* --- WHY CHOOSE US SECTION (NOW DYNAMIC) --- */}
      <section
        style={{
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          backgroundAttachment: "fixed", // Keeps image fixed for parallax effect (Optional)
          color: "white",
          position: "relative",
          padding: "4rem 8%",
          textAlign: "center",
          background: `linear-gradient(rgba(30, 41, 59, 0.8), rgba(67, 86, 114, 0.9)), url(${dynamicBgUrl})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <h2
          style={{
            fontSize: "4rem",
            fontWeight: "700",
            color: "#ffffff",
            textShadow: "0 3px 10px rgba(0,0,0,0.4)",
            marginBottom: "2rem",
            letterSpacing: "1px",
          }}
        >
          Why Choose Us?
        </h2>

        <p
          style={{
            maxWidth: "800px",
            margin: "0 auto",
            fontSize: "1.3rem",
            fontWeight: "500",
            color: "#f8fafc",
            lineHeight: "1.8",
            textShadow: "0 2px 6px rgba(0,0,0,0.5)",
          }}
        >
          Because we’re more than just a weather app.{" "}
          <b
            style={{
              color: CLOUD_ACCENT, // Cloud Accent
              fontSize: "1.5rem",
              fontWeight: "800",
            }}
          >
            The Lume
          </b>{" "}
          combines simplicity, reliability, and speed — ensuring you get
          accurate weather insights without delays or clutter. Our mission is to
          make sure you experience the world through the lens of trust and
          clarity.
        </p>
      </section>

      {/* --- TESTIMONIALS SECTION (NOW DYNAMIC) --- */}
      <section
        style={{
          ...dynamicSectionStyle,
          backgroundAttachment: "scroll",
        }}
      >
        <h2
          style={{
            fontSize: "3.5rem",
            fontWeight: "800",
            marginBottom: "1rem",
            textShadow: "0 4px 12px rgba(0,0,0,0.6)",
            letterSpacing: "1px",
            textAlign: "center",
          }}
        >
          What Our Users Say
        </h2>
        <p
          style={{
            fontSize: "1.2rem",
            color: "rgba(255,255,255,0.8)",
            maxWidth: "750px",
            margin: "0 auto 4rem",
            lineHeight: "1.8",
            textAlign: "center",
          }}
        >
          Trusted by thousands of users worldwide — <b>The Lume</b> has become
          the go-to platform for precise, elegant, and reliable weather
          insights.
        </p>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
            gap: "2.5rem",
            justifyContent: "center",
            alignItems: "stretch",
          }}
        >
          {[
            {
              name: "Sarah Malik",
              title: "Travel Blogger",
              review:
                "“Lume helps me plan my trips with confidence. Its hourly updates are spot on, and the interface is stunning!”",
              rating: "★★★★★",
              img: "https://i.pravatar.cc/100?img=47",
            },
            {
              name: "Ahmad Raza",
              title: "Software Engineer",
              review:
                "“Accurate, fast, and clean. I use it daily before heading to work. A truly professional weather experience.”",
              rating: "★★★★★",
              img: "https://i.pravatar.cc/100?img=12",
            },
            {
              name: "Mina Fatima",
              title: "Student & Photographer",
              review:
                "“The real-time alerts are a lifesaver! Lume keeps me informed before sudden weather changes hit.”",
              rating: "★★★★☆",
              img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSggwf1smlV8c3knwfOjmaD5wE-FRCBsPrG9g&s",
            },
          ].map((user, i) => (
            <div
              key={i}
              style={{
                background: "rgba(255,255,255,0.15)", // Transparent card
                backdropFilter: "blur(4px)",
                borderRadius: "16px",
                padding: "2.5rem 2rem",
                boxShadow: "0 8px 25px rgba(0,0,0,0.4)",
                background:
                  "linear-gradient(-135deg, #5177a9ff, #6b88b3, #8ca3c3, #a0b3cc, #a0b3cc, #c9d3dfff)",

                transition: "transform 0.3s ease, box-shadow 0.3s ease",
                textAlign: "center",
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.transform = "translateY(-6px)";
                e.currentTarget.style.boxShadow = "0 12px 30px rgba(0,0,0,0.6)";
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "0 8px 25px rgba(0,0,0,0.4)";
              }}
            >
              <img
                src={user.img}
                alt={user.name}
                style={{
                  width: "70px",
                  height: "70px",
                  borderRadius: "50%",
                  objectFit: "cover",
                  border: `3px solid ${CLOUD_ACCENT}`, // Cloud Accent Border
                  marginBottom: "1.2rem",
                }}
              />
              <p
                style={{
                  fontSize: "1.05rem",
                  lineHeight: "1.8",
                  color: "rgba(255,255,255,0.9)",
                  marginBottom: "1.2rem",
                }}
              >
                {user.review}
              </p>
              <h3
                style={{
                  fontWeight: "600",
                  fontSize: "1.2rem",
                  color: "#f8fafc",
                  marginBottom: "0.2rem",
                }}
              >
                {user.name}
              </h3>
              <p
                style={{
                  color: CLOUD_ACCENT, // Cloud Accent
                  fontSize: "0.95rem",
                  marginBottom: "0.5rem",
                }}
              >
                {user.title}
              </p>
              <p
                style={{
                  color: "#facc15",
                  fontSize: "1.2rem",
                  letterSpacing: "1px",
                }}
              >
                {user.rating}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* --- TIPS & INSIGHTS SECTION (NOW DYNAMIC) --- */}
      <section
        style={{
          ...dynamicSectionStyle,
          textAlign: "center",
        }}
      >
        <h2
          style={{
            fontSize: "3.5rem",
            fontWeight: "800",
            marginBottom: "3rem",
            textShadow: "0 4px 12px rgba(0,0,0,0.6)",
          }}
        >
          Weather Tips & Insights
        </h2>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
            gap: "2rem",
            justifyContent: "center",
          }}
        >
          {articles.map((article, i) => (
            <div
              key={i}
              style={{
                background:
                  "linear-gradient(-135deg, #5177a9ff, #6b88b3, #8ca3c3, #a0b3cc, #a0b3cc, #c9d3dfff)",
                backdropFilter: "blur(4px)",
                borderRadius: "16px",
                padding: "2rem",
                boxShadow: "0 8px 25px rgba(0,0,0,0.4)",

                transition: "transform 0.3s ease, box-shadow 0.3s ease",
                cursor: "pointer",
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.transform = "translateY(-6px)";
                e.currentTarget.style.boxShadow = "0 12px 30px rgba(0,0,0,0.6)";
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "0 8px 25px rgba(0,0,0,0.4)";
              }}
              onClick={() => setOpenIndex(openIndex === i ? null : i)}
            >
              <h3
                style={{
                  fontSize: "1.5rem",
                  fontWeight: "700",
                  marginBottom: "1rem",
                }}
              >
                {article.title}
              </h3>
              <p
                style={{
                  fontSize: "1rem",
                  lineHeight: "1.6",
                  marginBottom: "1rem",
                  color: "#cbd5e1",
                }}
              >
                {article.description}
              </p>
              <span
                style={{
                  fontWeight: "600",
                  color: CLOUD_ACCENT, // Cloud Accent
                  textDecoration: "none",
                  fontSize: "1rem",
                  cursor: "pointer",
                }}
              >
                {openIndex === i ? "Show Less ↑" : "Read More →"}
              </span>

              {openIndex === i && (
                <div
                  style={{
                    marginTop: "1rem",
                    fontSize: "1rem",
                    lineHeight: "1.6",
                    color: "#e2e8f0",
                    textAlign: "left",
                    borderTop: "1px solid rgba(255,255,255,0.2)",
                    paddingTop: "1rem",
                  }}
                >
                  {article.content}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* --- LOGIN/REGISTER SECTION (NOW DYNAMIC) --- */}
      {/* --- LOGIN/REGISTER SECTION (NOW DYNAMIC & STYLED) --- */}
      <section
        style={{
          padding: "4rem 8%",
          textAlign: "center",
          // Use a lighter overlay for a 'footer' feel
          background: `linear-gradient(rgba(30, 41, 59, 0.8), rgba(67, 86, 114, 0.9)), url(${dynamicBgUrl})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <h2
          style={{
            fontSize: "2.5rem",
            fontWeight: "700",
            marginBottom: "2.5rem",
            color: "white",
            textShadow: "0 2px 6px rgba(0, 0, 0, 0.6)",
            letterSpacing: "0.5px",
          }}
        >
          Ready to See Your World Clearly?
        </h2>
        <div style={{ display: "flex", justifyContent: "center", gap: "2rem" }}>
          {/* --- LOGIN BUTTON (Solid Cloud Accent) --- */}
          <button
            style={{
              backgroundColor: CLOUD_ACCENT, // Solid Cloud Accent
              color: "#1e3a8a", // Dark navy text for contrast
              border: "none",
              padding: "0.9rem 2.2rem",
              borderRadius: "50px",
              fontSize: "1.1rem",
              cursor: "pointer",
              fontWeight: "700",
              boxShadow: "0 6px 15px rgba(0, 0, 0, 0.3)",
              transition: "all 0.3s ease",
            }}
            onMouseOver={(e) => {
              e.target.style.transform = "translateY(-3px)";
              e.target.style.boxShadow = "0 8px 20px rgba(0, 0, 0, 0.5)";
            }}
            onMouseOut={(e) => {
              e.target.style.transform = "translateY(0)";
              e.target.style.boxShadow = "0 6px 15px rgba(0, 0, 0, 0.3)";
            }}
          >
            <Link
              to="/login"
              style={{
                color: "inherit",
                textDecoration: "none",
              }}
            >
              Login to Your Account
            </Link>
          </button>

          {/* --- REGISTER BUTTON (Outlined and Animated Hover) --- */}
          <button
            style={{
              backgroundColor: "transparent",
              color: CLOUD_ACCENT,
              border: `2px solid ${CLOUD_ACCENT}`,
              padding: "0.9rem 2.2rem",
              borderRadius: "50px",
              fontSize: "1.1rem",
              cursor: "pointer",
              fontWeight: "700",
              boxShadow: `0 0 10px ${CLOUD_GLOW}`, // Subtle glow
              transition: "all 0.3s ease",
            }}
            onMouseOver={(e) => {
              // Fill effect on hover
              e.target.style.backgroundColor = CLOUD_ACCENT;
              e.target.style.color = "#1e3a8a"; // Text changes to dark navy
              e.target.style.boxShadow = "0 6px 15px rgba(0, 0, 0, 0.5)";
              e.target.style.transform = "translateY(-3px)";
            }}
            onMouseOut={(e) => {
              // Reset to outlined look
              e.target.style.backgroundColor = "transparent";
              e.target.style.color = CLOUD_ACCENT;
              e.target.style.boxShadow = `0 0 10px ${CLOUD_GLOW}`;
              e.target.style.transform = "translateY(0)";
            }}
          >
            <Link
              to="/register"
              style={{
                color: "inherit",
                textDecoration: "none",
              }}
            >
              Create a Free Account
            </Link>
          </button>
        </div>
      </section>
    </div>
  );
}

export default HomePage;
