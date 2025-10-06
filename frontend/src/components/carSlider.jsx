// src/components/CarSlider.jsx
import React, { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const CarSlider = ({ cars, toggleSave, savedCars }) => {
  const [selectedCar, setSelectedCar] = useState(null);

  return (
    <div className="w-full max-w-7xl mx-auto py-16">
     

      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        spaceBetween={25}
        slidesPerView={1}
        navigation
        pagination={{ clickable: true }}
        autoplay={{ delay: 3000, disableOnInteraction: false }}
        breakpoints={{
          640: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
        }}
      >
        {cars.map((car) => (
          <SwiperSlide key={car.id}>
            <div className="bg-white/80 backdrop-blur-md rounded-2xl shadow-xl overflow-hidden transform transition duration-300 hover:scale-105 hover:shadow-2xl">
              {/* Car Image with Heart */}
              <div className="relative group">
                <img
                  src={car.imgSrc}
                  alt={car.title}
                  className="w-full h-52 object-cover"
                />
                <button
                  onClick={() => toggleSave(car.id)}
                  className={`absolute top-3 right-3 text-2xl transition transform hover:scale-125 ${
                    savedCars.has(car.id) ? 'text-red-500 drop-shadow-lg' : 'text-gray-300 hover:text-red-400'
                  }`}
                >
                  ♥
                </button>
              </div>

              {/* Car Info */}
              <div className="p-5 space-y-3">
                <span className="text-xs font-semibold px-3 py-1 bg-green-100 text-green-700 rounded-full">
                  {car.category}
                </span>
                <h3 className="font-bold text-xl text-gray-800">{car.title}</h3>

                <div className="grid grid-cols-2 text-sm text-gray-600">
                  <div><span className="font-semibold">⚡ Fuel:</span> {car.fuelType}</div>
                  <div><span className="font-semibold">⚙️ Trans.:</span> {car.transmission}</div>
                </div>

                <div className="text-emerald-600 font-extrabold text-lg">{car.price}</div>

                {/* Button */}
                <button
                  onClick={() => setSelectedCar(car)}
                  className="w-full py-2 rounded-xl font-semibold text-white bg-gradient-to-r from-green-500 to-emerald-700 hover:from-green-600 hover:to-emerald-800 transition"
                >
                  View Details
                </button>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Modal Popup */}
      {selectedCar && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full p-6 relative animate-fadeIn">
            {/* Close */}
            <button
              onClick={() => setSelectedCar(null)}
              className="absolute top-3 right-3 text-gray-600 hover:text-black text-2xl"
            >
              ✕
            </button>

            <img
              src={selectedCar.imgSrc}
              alt={selectedCar.title}
              className="w-full h-64 object-cover rounded-xl"
            />
            <h2 className="text-2xl font-bold mt-4">{selectedCar.title}</h2>
            <p className="text-gray-500">{selectedCar.category}</p>
            <p><strong>Fuel:</strong> {selectedCar.fuelType}</p>
            <p><strong>Transmission:</strong> {selectedCar.transmission}</p>
            <p className="text-emerald-600 font-bold text-xl mt-3">{selectedCar.price}</p>

           
          </div>
        </div>
      )}
    </div>
  );
};

export default CarSlider;
