import React, { useState, useEffect } from "react";
import { Battery, Zap, DollarSign, Star, Heart as HeartOutline, ShoppingCart } from "lucide-react";
import { HeartIcon as HeartSolid } from "@heroicons/react/24/solid";
import { NavLink } from "react-router-dom";
import Navbar from "./Navbar";

const ecoFriendlyCars = [
  { id: 1, name: "Tesla Model S", brand: "Tesla", fuel: "Electric", range: "396 miles", price: "$89,990", rating: 4.9, imgSrc: "/assets/img/tes.png" },
  { id: 2, name: "BMW i3", brand: "BMW", fuel: "Electric", range: "153 miles", price: "$44,450", rating: 4.5, imgSrc: "/assets/img/bmw i3.png" },
  { id: 3, name: "Hyundai Ioniq", brand: "Hyundai", fuel: "Electric", range: "170 miles", price: "$33,045", rating: 4.6, imgSrc: "/assets/img/ioniq.jpg" },
  { id: 4, name: "MG Cyberster", brand: "Morris Garages", fuel: "Electric", range: "310 miles", price: "$45,000", rating: 4.7, imgSrc: "/assets/img/mg.jpg" },
  { id: 5, name: "MG Comet EV", brand: "Morris Garages", fuel: "Electric", range: "143 miles", price: "$9,700", rating: 4.2, imgSrc: "/assets/img/mg1.jpg" },
  { id: 6, name: "Ford Mustang Mach-E", brand: "Ford", fuel: "Electric", range: "312 miles", price: "$42,995", rating: 4.8, imgSrc: "/assets/img/Ford1.jpg" },
  { id: 7, name: "Kia EV6", brand: "Kia", fuel: "Electric", range: "310 miles", price: "$48,700", rating: 4.7, imgSrc: "/assets/img/kia1-ev6.jpg" },
  { id: 8, name: "Audi Q4 e-tron", brand: "Audi", fuel: "Electric", range: "265 miles", price: "$49,800", rating: 4.6, imgSrc: "/assets/img/q4-etron.jpg" },
  { id: 9, name: "Mercedes-Benz EQC", brand: "Mercedes-Benz", fuel: "Electric", range: "279 miles", price: "$67,900", rating: 4.8, imgSrc: "/assets/img/eqc.jpg" },
  { id: 10, name: "Honda Civic", brand: "Honda", fuel: "Petrol / Hybrid", range: "35 MPG", price: "$24,650", rating: 4.4, imgSrc: "/assets/img/civic.jpg" },
  { id: 11, name: "Tata Nexon EV", brand: "Tata", fuel: "Electric", range: "213 miles", price: "$19,500", rating: 4.5, imgSrc: "/assets/img/nexon-ev.jpg" },
  { id: 12, name: "Mahindra XUV400", brand: "Mahindra", fuel: "Electric", range: "233 miles", price: "$20,200", rating: 4.6, imgSrc: "/assets/img/xuv400.jpg" }
];

const EcoFriendlyCars = () => {
  const [favorites, setFavorites] = useState(new Set());
  const [isLoading, setIsLoading] = useState(true);

  const [selectedCar, setSelectedCar] = useState(null);
  const [formData, setFormData] = useState({
    name: "", email: "", phone: "", address: "", city: "", pincode: "", payment: "Cash on Delivery"
  });

  useEffect(() => {
    const timeout = setTimeout(() => setIsLoading(false), 800);
    return () => clearTimeout(timeout);
  }, []);

  const toggleFavorite = (id) => {
    const updated = new Set(favorites);
    updated.has(id) ? updated.delete(id) : updated.add(id);
    setFavorites(new Set(updated));
  };

  const openBookingForm = (car) => {
    setSelectedCar(car);
    setFormData({ name: "", email: "", phone: "", address: "", city: "", pincode: "", payment: "Cash on Delivery" });
  };

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmitBooking = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:8080/buy", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, carId: selectedCar.id, carName: selectedCar.name })
      });
      if (!response.ok) throw new Error(`Booking failed: ${response.statusText}`);
      const data = await response.json();
      alert(`✅ ${data.message || `Booking confirmed for ${selectedCar.name}`}`);
      setSelectedCar(null);
    } catch (error) {
      console.error(error);
      alert(`❌ Failed to book ${selectedCar.name}. Please try again later.`);
    }
  };

  return (
    <>
      <header className="fixed top-0 left-0 w-full z-50 bg-white dark:bg-gray-900 shadow-md">
        <Navbar />
      </header>

      <main className="min-h-screen pt-20 bg-gradient-to-br from-green-50 via-white to-green-100 dark:from-gray-900 dark:to-gray-800 py-12 px-4 z-10 relative">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {isLoading ? (
            Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="bg-white dark:bg-gray-800 rounded-2xl p-4 animate-pulse shadow-lg">
                <div className="h-40 bg-gray-200 dark:bg-gray-700 rounded-xl mb-3" />
                <div className="h-4 bg-gray-300 dark:bg-gray-600 w-3/4 mb-2" />
                <div className="h-3 bg-gray-300 dark:bg-gray-600 w-1/2" />
              </div>
            ))
          ) : (
            ecoFriendlyCars.map((car) => (
              <div key={car.id} className="bg-white dark:bg-gray-800 rounded-2xl shadow-md hover:shadow-2xl transform hover:-translate-y-1 hover:scale-[1.02] transition-all duration-300 p-5 relative group border border-green-100 dark:border-green-700">
                <button onClick={() => toggleFavorite(car.id)} className="absolute top-3 right-3 bg-white dark:bg-gray-700 p-2 rounded-full shadow z-10">
                  {favorites.has(car.id) ? <HeartSolid className="w-5 h-5 text-red-500" /> : <HeartOutline className="w-5 h-5 text-gray-400" />}
                </button>

                <div className="h-44 rounded-xl overflow-hidden mb-4">
                  <img src={car.imgSrc} alt={car.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300" />
                </div>

                <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-1">{car.name}</h3>
                <div className="text-gray-500 text-sm mb-1">{car.brand}</div>

                <div className="text-sm text-gray-700 dark:text-gray-300 flex flex-wrap gap-2 mb-1">
                  <span className="flex items-center"><Battery className="w-4 h-4 mr-1 text-green-600" />{car.range}</span>
                  <span className="flex items-center"><Zap className="w-4 h-4 mr-1 text-blue-600" />{car.fuel}</span>
                </div>

                <div className="mt-1 text-sm font-semibold text-green-700"><DollarSign className="inline w-4 h-4 mr-1" />{car.price}</div>
                <div className="text-yellow-500 text-sm flex items-center gap-1"><Star className="w-4 h-4" />{car.rating}</div>

                <button onClick={() => openBookingForm(car)} className="mt-4 w-full bg-gradient-to-r from-green-500 to-emerald-600 hover:from-emerald-600 hover:to-green-700 text-white py-2 rounded-xl text-sm flex items-center justify-center gap-2 shadow hover:shadow-lg transition">
                  <ShoppingCart size={16} /> Buy Now
                </button>
              </div>
            ))
          )}
        </div>

        {/* Booking Modal */}
        {selectedCar && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg w-96 shadow-lg">
              <h2 className="text-xl font-bold mb-4">Book {selectedCar.name}</h2>
              <form onSubmit={handleSubmitBooking} className="flex flex-col gap-3">
                {["name","email","phone","address","city","pincode"].map((field) => (
                  <input key={field} type={field==="email"?"email":"text"} name={field} placeholder={field.charAt(0).toUpperCase() + field.slice(1)} required value={formData[field]} onChange={handleChange} className="border p-2 rounded"/>
                ))}
                <select name="payment" value={formData.payment} onChange={handleChange} className="border p-2 rounded">
                  <option>Cash on Delivery</option>
                  <option>Online Payment</option>
                </select>
                <button type="submit" className="bg-green-600 text-white py-2 rounded">Confirm Booking</button>
              </form>
              <button onClick={() => setSelectedCar(null)} className="mt-3 text-red-500">Cancel</button>
            </div>
          </div>
        )}
      </main>
    </>
  );
};

export default EcoFriendlyCars;
