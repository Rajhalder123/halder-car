import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";

const CarDekho = () => {
  const ACCESS_KEY = "khpv4pDpfg5kY82yG5rNVy3NHgixg9q3rmKgGvHiy7Q";
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
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-green-100 dark:from-gray-900 dark:to-gray-800 pb-12 pt-24 px-4">
      
      {/* Fixed Navbar */}
      <header className="fixed top-0 left-0 w-full z-50 bg-white dark:bg-gray-900 shadow-md">
        <Navbar />
      </header>

   {/* Heading */}
<div className="max-w-6xl mx-auto text-center mb-10 px-4">
  <h1 className="text-4xl md:text-5xl font-semibold text-green-600 dark:text-green-400 mb-2">
  
  </h1>
  <p className="text-gray-600 dark:text-gray-300 text-base md:text-lg">
  Discover a wide range of premium vehicles — from everyday drives to future-ready innovations.
</p>

</div>



      {/* Gallery Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {cars.map((car) => (
          <div
            key={car.id}
            className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-4 transform transition-transform duration-300 group"
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
              loading="lazy"
              className="w-full h-48 object-cover rounded-xl mb-4 shadow-md"
            />
            <p className="text-lg font-semibold text-gray-900 dark:text-white capitalize">
              {car.alt_description || "Car"}
            </p>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="mt-12 text-center flex justify-center gap-4">
        <button
          onClick={goPrev}
          disabled={page === 1}
          className={`px-6 py-2 rounded-lg text-white text-sm font-medium shadow ${
            page === 1
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-green-600 hover:bg-green-700"
          }`}
        >
          Previous
        </button>
        <button
          onClick={goNext}
          disabled={totalPages && page === totalPages}
          className={`px-6 py-2 rounded-lg text-white text-sm font-medium shadow ${
            totalPages && page === totalPages
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-green-600 hover:bg-green-700"
          }`}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default CarDekho;
