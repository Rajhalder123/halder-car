import React, { useEffect, useState } from "react";
import { DollarSign, Star, Phone, IndianRupee } from "lucide-react";

const ListedCars = () => {
  const [cars, setCars] = useState([]);
  const [currentImage, setCurrentImage] = useState({});

  useEffect(() => {
    const fetchCars = async () => {
      try {
        const res = await fetch("http://localhost:8080/sell");
        if (!res.ok) throw new Error("Failed to fetch cars");
        const data = await res.json();
        setCars(data);

        // Initialize current image index
        const initialIndex = {};
        data.forEach((car) => (initialIndex[car._id] = 0));
        setCurrentImage(initialIndex);
      } catch (err) {
        console.error(err);
      }
    };
    fetchCars();
  }, []);

  const nextImage = (carId, length) => {
    setCurrentImage((prev) => ({
      ...prev,
      [carId]: (prev[carId] + 1) % length,
    }));
  };

  const prevImage = (carId, length) => {
    setCurrentImage((prev) => ({
      ...prev,
      [carId]: (prev[carId] - 1 + length) % length,
    }));
  };

  return (
    <div className="min-h-screen py-12 px-4 bg-gradient-to-br from-green-50 via-white to-green-100 dark:from-gray-900 dark:to-gray-800">
      <div className="max-w-7xl mx-auto grid sm:grid-cols-2 md:grid-cols-3 gap-8">
        {cars.length === 0 && (
          <p className="col-span-3 text-center text-gray-500">No cars listed yet.</p>
        )}

        {cars.map((car) => (
          <div
            key={car._id}
            className="bg-white dark:bg-gray-800 rounded-2xl shadow-md hover:shadow-2xl transform hover:-translate-y-1 hover:scale-[1.02] transition-all duration-300 p-5 relative border border-green-100 dark:border-green-700"
          >
            {/* Image Slider */}
            <div className="h-44 rounded-xl overflow-hidden mb-4 relative">
              {car.images && car.images.length > 0 && (
                <>
                  <img
                    src={`http://localhost:8080${car.images[currentImage[car._id]]}`}
                    alt={`${car.carMake} ${car.carModel}`}
                    className="w-full h-full object-cover rounded-xl group-hover:scale-110 transition-transform duration-300"
                  />
                  {car.images.length > 1 && (
                    <>
                      <button
                        onClick={() => prevImage(car._id, car.images.length)}
                        className="absolute top-1/2 left-2 -translate-y-1/2 bg-black bg-opacity-30 text-white px-2 py-1 rounded hover:bg-opacity-50 transition"
                      >
                        &#10094;
                      </button>
                      <button
                        onClick={() => nextImage(car._id, car.images.length)}
                        className="absolute top-1/2 right-2 -translate-y-1/2 bg-black bg-opacity-30 text-white px-2 py-1 rounded hover:bg-opacity-50 transition"
                      >
                        &#10095;
                      </button>
                    </>
                  )}
                </>
              )}
            </div>

            {/* Car Details */}
            <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-1">
              {car.carMake} {car.carModel}
            </h3>
            
            <div className="text-gray-500 text-sm mb-2">{car.year}</div>
            <div className="text-sm text-gray-700 dark:text-gray-300 mb-1">

              <span className="font-medium">Mileage:</span> {car.mileage}
            </div>
            
            <div className="text-sm text-gray-700 dark:text-gray-300 mb-1">
              <span className="font-medium">Condition:</span> {car.condition || "N/A"}
            </div>

            {/* Description */}
            {car.description && (
              <p className="text-gray-600 text-sm mb-2 line-clamp-3">
                {car.description}
              </p>
            )}

            {/* Price and Rating */}
            <div className="flex justify-between items-center mt-2">
              <div className="text-green-700 font-semibold flex items-center gap-1">
                <IndianRupee className="w-4 h-4" />{car.price}
              </div>
              
            </div>

            {/* Seller Contact */}
            <div className="mt-4 flex flex-col gap-2">
              <div className="text-sm text-gray-700">
                <span className="font-medium">Seller:</span> {car.contactName}
              </div>
              <a
                href={`tel:${car.phone}`}
                className="w-full inline-flex justify-center items-center gap-2 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-emerald-600 hover:to-green-700 text-white py-2 rounded-xl shadow hover:shadow-lg transition"
              >
                <Phone className="w-5 h-5" /> Call
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ListedCars;
