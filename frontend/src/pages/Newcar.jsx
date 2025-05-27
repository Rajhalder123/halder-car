import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import Navbar from "./Navbar";

const UnsplashCar3DGallery = () => {
  const ACCESS_KEY = "khpv4pDpfg5kY82yG5rNVy3NHgixg9q3rmKgGvHiy7Q"; // Your Unsplash API key
  const [cars, setCars] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(null);

  useEffect(() => {
    fetch(`https://api.unsplash.com/search/photos?query=car&per_page=12&page=${page}&client_id=${ACCESS_KEY}`)
      .then((res) => res.json())
      .then((data) => {
        setCars(data.results);
        setTotalPages(data.total_pages);
      })
      .catch((err) => console.error(err));
  }, [page]);

  const goNext = () => {
    if (page < totalPages) setPage((prev) => prev + 1);
  };

  const goPrev = () => {
    if (page > 1) setPage((prev) => prev - 1);
  };

  return (
    <div className="Home">
     
     <> <Navbar/>
     </>

      {/* Gallery Content */}
      <div style={{ maxWidth: 1200, margin: "auto", padding: 10 }}>
        {/* Main Heading */}
   <h1
  style={{
    color: '#667eea',
    textAlign: 'center',
    marginBottom: 10,
    fontWeight: 'bold',
  }}
>
  Car Gallery
</h1>


        {/* Subtitle showing current page and style */}
        <h3 style={{ textAlign: "center", marginBottom: 30, color: "#600a" }}>
          3D sample car — Page {page}
        </h3>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: 30,
            perspective: 1000,
          }}
        >
          {cars.map((car) => (
            <div
              key={car.id}
              style={{
                background: "#fff",
                borderRadius: 15,
                boxShadow: "0 15px 35px rgba(50,50,93,.1), 0 5px 15px rgba(0,0,0,.07)",
                transformStyle: "preserve-3d",
                transition: "transform 0.4s",
                cursor: "pointer",
                padding: 15,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
              onMouseMove={(e) => {
                const rect = e.currentTarget.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                const midX = rect.width / 2;
                const midY = rect.height / 2;
                const rotateX = ((y - midY) / midY) * 10;
                const rotateY = ((x - midX) / midX) * 10;
                e.currentTarget.style.transform = `rotateX(${-rotateX}deg) rotateY(${rotateY}deg)`;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "rotateX(0deg) rotateY(0deg)";
              }}
            >
              <img
                src={car.urls.small}
                alt={car.alt_description || "Car"}
                style={{
                  width: "100%",
                  borderRadius: 15,
                  boxShadow: "0 10px 20px rgba(0,0,0,0.15)",
                  marginBottom: 15,
                  userSelect: "none",
                }}
                loading="lazy"
              />
              <p style={{ fontWeight: "600", fontSize: 18, textTransform: "capitalize", color:"black",margin: 0 }}>
                {car.alt_description || "Car"}
              </p>
            </div>
          ))}
        </div>

        {/* Pagination buttons */}
        <div style={{ textAlign: "center", marginTop: 30 }}>
          <button
            onClick={goPrev}
            disabled={page === 1}
            style={{
              marginRight: 10,
              padding: "10px 20px",
              fontSize: 16,
              cursor: page === 1 ? "not-allowed" : "pointer",
              opacity: page === 1 ? 0.5 : 1,
            }}
          >
            Previous
          </button>
          <button
            onClick={goNext}
            disabled={totalPages && page === totalPages}
            style={{
              padding: "10px 20px",
              fontSize: 16,
              cursor: totalPages && page === totalPages ? "not-allowed" : "pointer",
              opacity: totalPages && page === totalPages ? 0.5 : 1,
            }}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default UnsplashCar3DGallery;
