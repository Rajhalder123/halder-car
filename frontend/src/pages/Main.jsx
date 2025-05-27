import React, { useRef } from "react";
import { NavLink } from "react-router-dom";
import "./Home.css";

function Home() {
  const carouselRef = useRef(null);

  const scrollLeft = () => {
    carouselRef.current.scrollBy({ left: -300, behavior: "smooth" });
  };

  const scrollRight = () => {
    carouselRef.current.scrollBy({ left: 300, behavior: "smooth" });
  };

  return (
    <div className="Home">
      {/* Navbar */}
     <nav className="navbar navbar-expand-lg">
  <div className="container">
    {/* <NavLink to="/" className="navbar-brand d-flex align-items-center">
      <img
        src="/assets/img/logo.png"
        alt="Logo"
        className="img"
        style={{
          width: "200px",
          height: "100px",
          objectFit: "contain",
          marginRight: "8px",
        }}
      />
    </NavLink> */}

    <button
      className="navbar-toggler"
      type="button"
      data-bs-toggle="collapse"
      data-bs-target="#NavbarIcon"
      aria-controls="NavbarIcon"
      aria-expanded="false"
      aria-label="Toggle navigation"
    >
      <img src="/assets/img/bar.png" alt="Menu" />
    </button>

    <div className="collapse navbar-collapse" id="NavbarIcon">
      <ul className="navbar-nav ms-auto">
        <li className="nav-item">
          <a href="#upcoming-cars" className="nav-link">
            🚗 New Upcoming Cars
          </a>
        </li>
        <li className="nav-item">
          <NavLink to="/new-cars" className="nav-link">
            🖼 3D Car Gallery
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink to="/sell" className="nav-link btn btn-warning text-dark px-3 ms-2">
            💰 Sell
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink to="/support" className="nav-link">
            🛠 Support
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink to="/signin" className="nav-link">
            🔑 Sign In
          </NavLink>
        </li>
      </ul>
    </div>
  </div>
</nav>

      {/* Hero Section */}
      <section className="section1 text-center">
        <div className="container">
          <h1>
            Say hello to your next <br /> awesome vehicle
          </h1>
          <p className="featur">
            Featuring Used, Wholesale and Salvage Cars, Trucks & SUVs for Sale
          </p>
        </div>
      </section>




















      {/* Popular Brands Section */}
     {/* Popular Brands Section */}
<section
  style={{
    padding: "3rem 1rem",
    backgroundColor: "#f8f9fa",
    textAlign: "center",
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
  }}
>
  <div style={{ maxWidth: 1140, margin: "0 auto" }}>
    <h2 style={{ marginBottom: "1rem", fontWeight: "700", color: "#2c3e50" }}>
      Our Popular Brands
    </h2>
    <p
      style={{
        color: "#6c757d",
        marginBottom: "2.5rem",
        fontSize: "1.1rem",
        maxWidth: 600,
        marginLeft: "auto",
        marginRight: "auto",
      }}
    >
      Explore top car brands trusted by thousands of customers worldwide.
    </p>

    <div
      style={{
        display: "flex",
        justifyContent: "center",
        flexWrap: "wrap",
        gap: "2rem",
      }}
    >
      {[1, 3, 2, 4, 5, 6].map((num) => (
        <div
          key={num}
          style={{
            flex: "0 1 120px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <img
            src={`/assets/img/${num}.png`}
            alt={`Brand logo ${num}`}
            style={{ maxWidth: "100%", height: "auto", filter: "grayscale(30%)" }}
            onMouseOver={(e) => (e.currentTarget.style.filter = "grayscale(0%)")}
            onMouseOut={(e) => (e.currentTarget.style.filter = "grayscale(30%)")}
          />
        </div>
      ))}
    </div>
  </div>
</section>




     










      {/* Trending Cars */}
      <section className="section3">
        <div className="container">
          <h3>Trending Near You</h3>
          <div className="row">
            {[1, 2, 3].map((car) => (
              <div key={car} className="col-md-4 mb-4">
                <div className="card">
                  <img
                    src={`/assets/img/car${car}.png`}
                    className="card-img-top"
                    alt={`Car ${car}`}
                  />
                  <div className="card-body">
                    <h5>Subaru Forester</h5>
                    <p>11,475 Miles</p>
                    <p>
                      AWD <img src="/assets/img/dot.svg" alt="dot" /> lorem
                      ipsum
                    </p>
                    <div className="d-flex gap-2">
                      <button className="btn btn-outline-primary">
                        ₹20 Lakhs
                      </button>
                      <button className="btn btn-primary">Buy Now</button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Upcoming Cars Carousel */}
      <section className="section4" id="upcoming-cars">
        <div className="container">
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h4>New Upcoming Cars</h4>
            <div>
              <button onClick={scrollLeft} className="btn btn-light me-2">
                <img src="/assets/img/arrowLeft.png" alt="Left" width="24" />
              </button>
              <button onClick={scrollRight} className="btn btn-light">
                <img src="/assets/img/arrowRight.png" alt="Right" width="24" />
              </button>
            </div>
          </div>
          <div className="d-flex overflow-auto gap-3" ref={carouselRef}>
            {[
              { brand: "Toyota", count: "23,457", img: "car1.png" },
              { brand: "Hyundai", count: "18,900", img: "car2.png" },
              { brand: "Lamborghini", count: "5,320", img: "car3.png" },
              { brand: "SUV", count: "9,100", img: "car4.png" },
              { brand: "Swift", count: "12,000", img: "car5.jpg" },
            ].map((item, index) => (
              <div
                key={index}
                className="card p-2"
                style={{ minWidth: "220px" }}
              >
                <img
                  src={`/assets/img/car/${item.img}`}
                  className="card-img-top"
                  alt={item.brand}
                />
                <div className="card-body text-center">
                  <h6>{item.brand}</h6>
                  <button className="btn btn-sm btn-outline-primary">
                    {item.count} vehicles
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer mt-5 bg-light pt-4 pb-2">
        <div className="container">
          <div className="row text-center text-md-start">
            <div className="col-md-4 mb-3">
              <h5>Contact Us</h5>
              <p>1234 Street Name, City</p>
              <p>Email: info@example.com</p>
              <p>Phone: (123) 456-7890</p>
            </div>
            <div className="col-md-4 mb-3">
              <h5>Locations</h5>
              <p>5678 Main St, Another City</p>
              <p>91011 Third Ave, Next City</p>
            </div>
            <div className="col-md-4 mb-3">
              <h5>About</h5>
              <ul className="list-unstyled">
                <li>
                  <a href="/">Privacy Policy</a>
                </li>
                <li>
                  <a href="/">Terms</a>
                </li>
                <li>
                  <a href="/">Support</a>
                </li>
              </ul>
            </div>
          </div>
          <div className="text-center">
            <small>
              &copy; 2024 Halder Car Dealership. All rights reserved.
            </small>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Home;
