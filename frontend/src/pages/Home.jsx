import React, { useState, useEffect } from "react";
import Navbar from "./Navbar";
import CarSlider from "../components/carSlider";
import { NavLink } from "react-router-dom";
// ✅ All Cars Data (With Brand)
const allCars = [
  {
    id: 1,
    name: "Tesla Model S",
    brand: "Tesla",
    type: "Electric Cars",
    imgSrc: "/assets/img/tes.png",
  },
  {
    id: 2,
    name: "BMW i3",
    brand: "BMW",
    type: "Sedans",
    imgSrc: "/assets/img/bmw i3.png",
  },
  {
    id: 3,
    name: "Hyundai Ioniq",
    brand: "Tesla",
    type: "Electric Cars",
    imgSrc: "/assets/img/ioniq.jpg",
  },
  {
    id: 4,
    name: "MG Cyberster",
    brand: "Morris Garages",
    type: "Electric Cars",
    imgSrc: "/assets/img/mg.jpg",
  },
  {
    id: 5,
     name: "MG Comet EV",
     brand: "Morris Garages",
     type: "Electric Cars",
     imgSrc: "/assets/img/mg1.jpg",
  },
  
  {
    id: 6,
    name: "Ford Mustang Mach-E",
    brand: "Ford",
    type: "Electric Cars",
    imgSrc: "/assets/img/Ford1.jpg",
  },
  {
    id: 7,
    name: "Kia EV6",
    brand: "Kia",
    type: "Electric Cars",
    imgSrc: "/assets/img/kia1-ev6.jpg",
  },
  {
    id: 8,
    name: "Audi Q4 e-tron",
    brand: "Audi",
    type: "SUVs",
    imgSrc: "/assets/img/q4-etron.jpg",
  },
  {
    id: 9,
    name: "Mercedes-Benz EQC",
    brand: "Mercedes-Benz",
    type: "SUVs",
    imgSrc: "/assets/img/eqc.jpg",
  },
  {
    id: 10,
    name: "Honda Civic",
    brand: "Honda",
    type: "Sedans",
    imgSrc: "/assets/img/civic.jpg",
  },
  {
    id: 11,
    name: "Tata Nexon EV",
    brand: "Tata",
    type: "Electric Cars",
    imgSrc: "/assets/img/nexon-ev.jpg",
  },
  {
    id: 12,
    name: "Mahindra XUV400",
    brand: "Mahindra",
    type: "Electric Cars",
    imgSrc: "/assets/img/xuv400.jpg",
  },
];



// ✅ Top Picks
const ecoCars = [
  {
    id: 1,
    title: "Nexon EV Max",
    category: "Electric SUV",
    price: "Price ₹18.34 Lakh",
    fuelType: "Electric",
    transmission: "Automatic",
    imgSrc: "/assets/img/tes.png",
  },
  {
    id: 2,
    title: "Tiago EV",
    category: "Electric Hatchback",
    price: "Price ₹8.69 Lakh",
    fuelType: "Electric",
    transmission: "Automatic",
    imgSrc: "/assets/img/bmw i3.png",
  },
  {
    id: 3,
    title: "Punch EV",
    category: "Electric SUV",
    price: "Price ₹10.99 Lakh",
    fuelType: "Electric",
    transmission: "Automatic",
    imgSrc: "/assets/img/che.png",
  },
];

const Home = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [savedCars, setSavedCars] = useState(new Set());
  const [activeBrand, setActiveBrand] = useState("All");

  const brands = ["All", ...new Set(allCars.map((car) => car.brand))];

  const filteredCars =
    activeBrand === "All"
      ? allCars
      : allCars.filter((car) => car.brand === activeBrand);

  const toggleSave = (carId) => {
    setSavedCars((prev) => {
      const newSet = new Set(prev);
      newSet.has(carId) ? newSet.delete(carId) : newSet.add(carId);
      return newSet;
    });
  };

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <div
      className={`transition-opacity duration-700 ${
        isLoaded ? "opacity-100" : "opacity-0"
      }`}
    >
      <Navbar />

      {/*  HERO SECTION */}
      <section
        className="relative w-full min-h-screen bg-cover bg-center flex items-center justify-center px-4"
        style={{ backgroundImage: "url('/assets/visualcar.png')" }}
      >
        <div className="absolute inset-0 bg-black/50 z-0"></div>
        <div className="relative z-10 text-center text-white max-w-4xl p-6">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold mb-4 leading-tight drop-shadow-md">
            Drive <span className="text-green-400">Electric.</span>
            <br />
            Drive the <span className="text-green-400">Future.</span>
          </h1>
          <p className="text-base sm:text-lg text-gray-100 max-w-3xl mx-auto mt-4">
            Discover premium eco-friendly electric vehicles with expert guidance
            and services.
          </p>
        </div>
      </section>

     <section className="py-12 bg-gray-50 text-center min-h-screen">
      <h2 className="text-2xl font-bold mb-6">Browse by Brand</h2>
      <div className="flex flex-wrap justify-center gap-3 mb-6">
        {brands.map((brand) => (
          <button
            key={brand}
            onClick={() => setActiveBrand(brand)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition ${
              activeBrand === brand
                ? "bg-green-600 text-white"
                : "bg-white border border-gray-300 text-gray-600 hover:bg-gray-100"
            }`}
          >
            {brand}
          </button>
        ))}
      </div>

      {/* ✅ Filtered Cars */}
     {/* ✅ Filtered Cars */}
<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 px-4 max-w-6xl mx-auto">
  {filteredCars.map((car) => (
    <div
      key={car.id}
      className="bg-white rounded-lg shadow hover:shadow-lg transition p-4 text-left"
    >
      <img
        src={car.imgSrc}
        alt={car.name}
        className="w-full h-40 object-cover rounded"
      />
      <h3 className="mt-4 font-bold text-lg text-gray-800">
        {car.name}
      </h3>
      <p className="text-sm text-gray-500">{car.brand}</p>
      <p className="text-sm text-gray-600 mt-1">{car.type}</p>

      <div className="flex gap-3 mt-3">
        {/* View Details Button */}
        <NavLink
          to={`/car/${car.id}`}
          className="px-4 py-2 bg-blue-600 text-white text-sm rounded hover:bg-blue-700 transition"
        >
          View Details
        </NavLink>

        {/* Buy Now Button */}
        <NavLink
          to={`/buy/${car.id}`}
          className="px-4 py-2 bg-green-600 text-white text-sm rounded hover:bg-green-700 transition"
        >
          Buy Now
        </NavLink>
      </div>
    </div>
  ))}
</div>

    </section>
      {/*  CAR SLIDER */}
      <section className="bg-white py-12">
        <div className="max-w-6xl mx-auto px-4">
         <h2 className="text-3xl font-extrabold text-center mb-10 bg-gradient-to-r from-green-500 to-emerald-700 bg-clip-text text-transparent">
        🚗 Top Luxury & Eco-Friendly Cars
      </h2>
          <CarSlider
            cars={ecoCars}
            toggleSave={toggleSave}
            savedCars={savedCars}
          />
        </div>
      </section>

      {/* INNOVATION SECTION */}
      <section className="py-12 bg-green-50">
        <div className="max-w-5xl mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold mb-4">Innovation in Every Mile</h2>
          <p className="text-gray-600 max-w-2xl mx-auto mb-8">
            Leading the charge in sustainable mobility with cutting-edge
            technology and design excellence.
          </p>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              ["⚡", "Electric Powertrain", "Advanced electric tech with zero emissions."],
              ["🔋", "Long Range Battery", "Extended range for long journeys."],
              ["🛡️", "Safety First", "Top safety ratings and full protection."],
            ].map(([icon, title, desc], i) => (
              <div key={i} className="bg-white p-6 rounded shadow text-left">
                <div className="text-3xl mb-2">{icon}</div>
                <h3 className="font-semibold text-lg">{title}</h3>
                <p className="text-sm text-gray-600">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-gr-900 text-black-600 py-12">
        <div className="max-w-6xl mx-auto px-4 grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-2">Drive by Raj</h3>
            <p className="text-sm text-gray-400">
              India’s trusted name in sustainable mobility and driving
              education, empowering journeys since inception.
            </p>
          </div>
          {[
            ["Vehicles", ["Electric Cars", "Sedans", "Hatchbacks", "SUVs"]],
            ["Services", ["Book Test Drive", "Service Booking", "Finance", "Insurance"]],
            ["Support", ["Customer Care", "Warranty", "Owner's Manual", "FAQ"]],
          
          ].map(([title, links], i) => (
            <div key={i}>
              <h4 className="font-semibold mb-2">{title}</h4>
              <ul className="space-y-1">
                {links.map((link, j) => (
                  <li key={j}>
                    <a
                      href="#"
                      className="text-sm text-gray-400 hover:text-green-500 transition"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-10 border-t border-gray-700 pt-4 text-sm text-gray-500 text-center">
          <p>&copy; 2025 Drive by Raj. All rights reserved.</p>
          <p className="mt-1 text-xs">
            *Prices are Ex-showroom and subject to change. Contact your nearest
            dealer.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Home;
