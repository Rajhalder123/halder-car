import React, { useRef } from "react";
import { NavLink } from "react-router-dom";
import "./Home.css";
import Navbar from "./Navbar";
function Home() {
  const carouselRef = useRef(null);

  const scrollLeft = () => {
    carouselRef.current.scrollBy({ left: -300, behavior: "smooth" });
  };

  const scrollRight = () => {
    carouselRef.current.scrollBy({ left: 300, behavior: "smooth" });
  };

  return (
    <>
      {/* Navigation */}
      <nav >
        <div >
          {/* Nav Links */}
          <>
            <Navbar />
          </>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="hero" id="home">
        <div
          className="particle"
          style={{
            top: "20%",
            left: "10%",
            width: "4px",
            height: "4px",
            animationDelay: "0s",
          }}
        ></div>
        <div
          className="particle"
          style={{
            top: "60%",
            left: "80%",
            width: "6px",
            height: "6px",
            animationDelay: "2s",
          }}
        ></div>
        <div
          className="particle"
          style={{
            top: "30%",
            left: "70%",
            width: "3px",
            height: "3px",
            animationDelay: "4s",
          }}
        ></div>
        <div
          className="particle"
          style={{
            top: "80%",
            left: "20%",
            width: "5px",
            height: "5px",
            animationDelay: "1s",
          }}
        ></div>

        <div className="hero-content">
          <h1>Drive Your Dreams</h1>
          <p className="hero-subtitle">
            Discover the world's most exclusive collection of luxury and
            performance vehicles
          </p>
          <div className="hero-cta">
            <a href="#cars" className="btn-primary">
              Explore Cars
            </a>
            <a href="#about" className="btn-secondary">
              Learn More
            </a>
          </div>
        </div>
      </section>

      {/* Featured Cars Section */}
      <section className="featured-section" id="cars">
        <div className="section-header">
          <h2 className="section-title">Featured Vehicles</h2>
          <p className="section-subtitle">
            Handpicked premium cars from our exclusive collection
          </p>
        </div>

        <div className="car-grid">
          {/* Car Cards */}
          {[
            {
              imgSrc: "/assets/img/car/f.png",
              title: "Ferrari 488 GTB",
              specs: ["V8 Turbo", "661 HP", "2020"],
              price: "$285,000",
            },
            {
              imgSrc: "/assets/img/car/l.png",
              title: "Lamborghini Huracán",
              specs: ["V10", "610 HP", "2021"],
              price: "$230,000",
            },
            {
              imgSrc: "/assets/img/car/pp.png",
              title: "Porsche 911 Turbo S",
              specs: ["Flat-6 Turbo", "640 HP", "2022"],
              price: "$207,000",
            },
            {
              imgSrc: "/assets/img/car/t.png",
              title: "Tesla Model S Plaid",
              specs: ["Electric", "1020 HP", "2023"],
              price: "$129,990",
            },
            {
              imgSrc: "/assets/img/car/mc.png",
              title: "McLaren 720S",
              specs: ["V8 Turbo", "710 HP", "2021"],
              price: "$299,000",
            },
            {
              imgSrc: "/assets/img/car/as.png",
              title: "Aston Martin DB11",
              specs: ["V12 Turbo", "630 HP", "2022"],
              price: "$215,000",
            },
          ].map((car, index) => (
            <div className="car-card" key={index}>
              <div className="car-image">
                <img
                  src={car.imgSrc}
                  alt={car.title}
                  style={{
                    width: "100%",
                    height: "200px",
                    objectFit: "cover",
                    borderTopLeftRadius: "10px",
                    borderTopRightRadius: "10px",
                  }}
                />
              </div>
              <div className="car-info">
                <h3>{car.title}</h3>
                <div className="car-specs">
                  {car.specs.map((spec, i) => (
                    <span className="spec" key={i}>
                      {spec}
                    </span>
                  ))}
                </div>
                <div className="car-price">{car.price}</div>
                <div className="car-action">
                  <a href="#" className="btn-small btn-view">
                    View Details
                  </a>
                  <a href="#" className="btn-small btn-wishlist">
                    ♡ Save
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Stats Section */}
      <section className="stats-section">
        <div className="stats-container">
          <div className="stat-item" style={{ animationDelay: "0.1s" }}>
            <span className="stat-number">500+</span>
            <span className="stat-label">Premium Vehicles</span>
          </div>
          <div className="stat-item" style={{ animationDelay: "0.3s" }}>
            <span className="stat-number">50k+</span>
            <span className="stat-label">Happy Customers</span>
          </div>
          <div className="stat-item" style={{ animationDelay: "0.5s" }}>
            <span className="stat-number">25+</span>
            <span className="stat-label">Luxury Brands</span>
          </div>
          <div className="stat-item" style={{ animationDelay: "0.7s" }}>
            <span className="stat-number">99%</span>
            <span className="stat-label">Satisfaction Rate</span>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-content">
          <div className="footer-section">
            <h4>Drive By Raj</h4>
            <p style={{ color: "#666", marginTop: "1rem" }}>
              Your premier destination for luxury and performance vehicles.
              Experience excellence in every drive.
            </p>
          </div>
          <div className="footer-section">
            <h4>Quick Links</h4>
            <a href="#home">Home</a>
            <a href="#cars">Browse Cars</a>
            <a href="#about">About Us</a>
            <a href="#contact">Contact</a>
          </div>
          <div className="footer-section">
            <h4>Categories</h4>
            <a href="#">Luxury Cars</a>
            <a href="#">Sports Cars</a>
            <a href="#">Electric Vehicles</a>
            <a href="#">Classics</a>
          </div>
          <div className="footer-section">
            <h4>Support</h4>
            <a href="#">Help Center</a>
            <a href="#">Financing</a>
            <a href="#">Insurance</a>
            <a href="#">Warranty</a>
          </div>
        </div>
        <div className="footer-bottom">
          <p>
            &copy; 2025 Drive By Raj. All rights reserved. | Designed for luxury
            car enthusiasts.
          </p>
        </div>
      </footer>
    </>
  );
}

export default Home;
