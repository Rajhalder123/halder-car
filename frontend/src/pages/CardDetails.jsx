import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const carDetails = [
  { id: 1, name: "Tesla Model S", brand: "Tesla", type: "Electric Cars", imgSrc: "/assets/img/tes.png" },
  { id: 2, name: "BMW i3", brand: "BMW", type: "Sedans", imgSrc: "/assets/img/bmw i3.png" },
  { id: 3, name: "Hyundai Ioniq", brand: "Tesla", type: "Electric Cars", imgSrc: "/assets/img/ioniq.jpg" },
  { id: 4, name: "MG Cyberster", brand: "Morris Garages", type: "Electric Cars", imgSrc: "/assets/img/mg.jpg" },
  { id: 5, name: "MG Comet EV", brand: "Morris Garages", type: "Electric Cars", imgSrc: "/assets/img/mg1.jpg" },
  { id: 6, name: "Ford Mustang Mach-E", brand: "Ford", type: "Electric Cars", imgSrc: "/assets/img/Ford1.jpg" },
  { id: 7, name: "Kia EV6", brand: "Kia", type: "Electric Cars", imgSrc: "/assets/img/kia1-ev6.jpg" },
  { id: 8, name: "Audi Q4 e-tron", brand: "Audi", type: "SUVs", imgSrc: "/assets/img/q4-etron.jpg" },
  { id: 9, name: "Mercedes-Benz EQC", brand: "Mercedes-Benz", type: "SUVs", imgSrc: "/assets/img/eqc.jpg" },
  { id: 10, name: "Honda Civic", brand: "Honda", type: "Sedans", imgSrc: "/assets/img/civic.jpg" },
  { id: 11, name: "Tata Nexon EV", brand: "Tata", type: "Electric Cars", imgSrc: "/assets/img/nexon-ev.jpg" },
  { id: 12, name: "Mahindra XUV400", brand: "Mahindra", type: "Electric Cars", imgSrc: "/assets/img/xuv400.jpg" },
];

const CarDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // ✅ Show/hide form
  const [showForm, setShowForm] = useState(false);

  // ✅ All user fields
  const [buyerName, setBuyerName] = useState("");
  const [buyerEmail, setBuyerEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [pincode, setPincode] = useState("");
  const [payment, setPayment] = useState("Cash on Delivery");

  const car = carDetails.find((c) => c.id === parseInt(id));

  if (!car) {
    return (
      <div className="p-8 text-center text-red-500 font-semibold text-xl">
        Car not found.
      </div>
    );
  }

  const handleSchedule = () => {
    navigate("/schedule-drive", { state: { carName: car.name } });
  };

  const handlePurchase = async () => {
    if (!buyerName || !buyerEmail || !phone || !address || !city || !pincode) {
      alert("⚠️ Please fill all fields before confirming the purchase.");
      return;
    }

    try {
      const response = await fetch("http://localhost:8080/buy", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          carId: car.id,
          carName: car.name,
          name: buyerName,
          email: buyerEmail,
          phone,
          address,
          city,
          pincode,
          payment,
        }),
      });

      if (!response.ok) throw new Error("Server error");

      navigate("/confirm-purchase", {
        state: {
          carName: car.name,
          price: "₹24,99,000",
          buyerName,
          buyerEmail,
          phone,
          address,
          city,
          pincode,
          payment,
        },
      });
    } catch (error) {
      console.error("❌ Error saving purchase:", error);
      alert("Failed to confirm purchase. Try again.");
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 mt-8 bg-white shadow-xl rounded-2xl">
      <div className="flex flex-col md:flex-row items-center gap-6">
        <img src={car.imgSrc} alt={car.name} className="w-full md:w-1/2 h-72 object-cover rounded-lg" />

        <div className="flex-1">
          <h2 className="text-3xl font-bold text-gray-800 mb-2">{car.name}</h2>
          <p className="text-gray-600 text-lg mb-1"><strong>Brand:</strong> {car.brand}</p>
          <p className="text-gray-600 text-lg mb-3"><strong>Type:</strong> {car.type}</p>
          <p className="text-xl font-semibold text-green-700 mb-6">Price: ₹24,99,000</p>

          {/* Step 1: Show buttons only */}
          {!showForm && (
            <div className="flex gap-4">
              <button
                onClick={handleSchedule}
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
              >
                Schedule Test Drive
              </button>
              <button
                onClick={() => setShowForm(true)}
                className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
              >
                Confirm Purchase
              </button>
            </div>
          )}

          {/* Step 2: Show input fields only after confirm */}
          {showForm && (
            <div className="mt-6 space-y-4">
              <input type="text" placeholder="Your Name" value={buyerName} onChange={(e) => setBuyerName(e.target.value)} className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
              <input type="email" placeholder="Your Email" value={buyerEmail} onChange={(e) => setBuyerEmail(e.target.value)} className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
              <input type="text" placeholder="Phone Number" value={phone} onChange={(e) => setPhone(e.target.value)} className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
              <input type="text" placeholder="Full Address" value={address} onChange={(e) => setAddress(e.target.value)} className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
              <input type="text" placeholder="City" value={city} onChange={(e) => setCity(e.target.value)} className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
              <input type="text" placeholder="Pincode" value={pincode} onChange={(e) => setPincode(e.target.value)} className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />

              {/* Payment Selection */}
              <select value={payment} onChange={(e) => setPayment(e.target.value)} className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                <option value="Cash on Delivery">Cash on Delivery</option>
                <option value="Online Payment">Online Payment</option>
              </select>

              <button
                onClick={handlePurchase}
                className="w-full px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
              >
                Submit Purchase
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CarDetails;
