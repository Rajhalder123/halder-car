import React, { useState } from "react";
import { useParams } from "react-router-dom";

const BuyNow = ({ cars }) => {
  const { id } = useParams();
  const selectedCar = cars.find((car) => car.id === parseInt(id));

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    pincode: "",
    payment: "Cash on Delivery",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmitBooking = (e) => {
    e.preventDefault();
    alert(`Booking confirmed for ${selectedCar.name}`);
    setFormData({
      name: "",
      email: "",
      phone: "",
      address: "",
      city: "",
      pincode: "",
      payment: "Cash on Delivery",
    });
  };

  if (!selectedCar) {
    return <h2 className="text-center mt-10">Car not found</h2>;
  }

  return (
    <div className="max-w-lg mx-auto mt-10 bg-white p-6 rounded shadow">
      <h2 className="text-xl font-bold mb-4">
        Book {selectedCar.name}
      </h2>
      <form onSubmit={handleSubmitBooking} className="flex flex-col gap-3">
        <input type="text" name="name" placeholder="Full Name" required
          value={formData.name} onChange={handleChange} className="border p-2 rounded"/>
        <input type="email" name="email" placeholder="Email" required
          value={formData.email} onChange={handleChange} className="border p-2 rounded"/>
        <input type="text" name="phone" placeholder="Phone Number" required
          value={formData.phone} onChange={handleChange} className="border p-2 rounded"/>
        <input type="text" name="address" placeholder="Address" required
          value={formData.address} onChange={handleChange} className="border p-2 rounded"/>
        <input type="text" name="city" placeholder="City" required
          value={formData.city} onChange={handleChange} className="border p-2 rounded"/>
        <input type="text" name="pincode" placeholder="Pincode" required
          value={formData.pincode} onChange={handleChange} className="border p-2 rounded"/>
        <select name="payment" value={formData.payment} onChange={handleChange} className="border p-2 rounded">
          <option>Cash on Delivery</option>
          <option>Online Payment</option>
        </select>

        <button type="submit" className="bg-green-600 text-white py-2 rounded">
          Confirm Booking
        </button>
      </form>
    </div>
  );
};

export default BuyNow;
