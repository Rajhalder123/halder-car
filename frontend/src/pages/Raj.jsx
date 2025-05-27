import React from "react";
import "./Raj.css";

function Raj() {
  const cars = [
    {
      id: 1,
      name: "Honda Civic",
      year: 2018,
      price: "$20,000",
      mileage: "35,000 km",
      image: "/assets/img/car1.png" , // Replace with actual image URL
    },
    {
      id: 2,
      name: "Toyota Corolla",
      year: 2020,
      price: "$22,000",
      mileage: "20,000 km",
      image: "/assets/img/car2.png", // Replace with actual image URL
    },
    {
      id: 3,
      name: "Ford Focus",
      year: 2019,
      price: "$18,000",
      mileage: "40,000 km",
      image: "/assets/img/5.png", // Replace with actual image URL
    },
  ];

  return (
    <div className="raj">
      <h1 className="title">Used Car Listings</h1>
      <div className="car-list">
        {cars.map((car) => (
          <div key={car.id} className="car-card">
            <img src={car.image} alt={`${car.name}`} className="car-image" />
            <h2 className="car-name">{car.name}</h2>
            <p className="car-details">Year: {car.year}</p>
            <p className="car-details">Price: {car.price}</p>
            <p className="car-details">Mileage: {car.mileage}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Raj;
