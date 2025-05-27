import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';

const ecoFriendlyCars = [
  {
    id: 1,
    name: 'Tesla Model 3',
    batteryRange: '358 miles',
    chargeTime: '8.5 hours (Level 2)',
    price: '$39,990',
    description: 'High-performance electric sedan with autopilot and minimalist design.',
    image: '/assets/img/tes.png',
  },
  {
    id: 2,
    name: 'Nissan Leaf',
    batteryRange: '226 miles',
    chargeTime: '7.5 hours (Level 2)',
    price: '$27,400',
    description: 'Affordable electric car with smooth driving experience and advanced safety features.',
    image: '/assets/img/nisan.png',
  },
  {
    id: 3,
    name: 'Chevrolet Bolt EV',
    batteryRange: '259 miles',
    chargeTime: '10 hours (Level 2)',
    price: '$31,000',
    description: 'Compact electric hatchback with excellent range and quick acceleration.',
    image: '/assets/img/che.png',
  },

  {
    id: 4,
    name: 'BMW i3',
    batteryRange: '259 miles',
    chargeTime: '10 hours (Level 2)',
    price: '$31,000',
    description: 'Compact electric hatchback with excellent range and quick acceleration.',
    image: '/assets/img/bmw i3.png',
  },
];

const positiveDescriptions = {
  1: "The Tesla Model 3 leads the electric revolution with impressive range, innovative autopilot features, and a sleek design that embodies the future of driving.",
  2: "Nissan Leaf offers an affordable and reliable electric ride, ideal for everyday city commuting with zero emissions and impressive efficiency.",
  3: "Hyundai Ioniq 5 is a spacious and futuristic SUV combining ultra-fast charging with eye-catching style and comfort.",
  4:"The BMW i3 stands out with its futuristic design, sustainable materials, and quick acceleration — a premium urban EV offering comfort, innovation, and responsible driving."
  // Add descriptions for others as needed
};

const CarDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const car = ecoFriendlyCars.find((c) => c.id === parseInt(id));

  if (!car) {
    return (
      <main className="container py-5 text-center">
        <h2>Car not found</h2>
        <Link to="/" className="btn btn-primary mt-3">
          Back to list
        </Link>
      </main>
    );
  }

  return (
    <>
      <style>{`
        main.container {
          max-width: 900px;
        }

        h1 {
          color: #00796b;
          font-weight: 700;
          margin-bottom: 1rem;
        }

        .lead.text-success {
          font-size: 1.25rem;
          font-weight: 500;
          opacity: 0.85;
        }

        .card {
          border-radius: 15px;
          box-shadow: 0 8px 20px rgba(0,0,0,0.12);
        }

        .list-group-item {
          font-weight: 600;
          color: #004d40;
        }

        button.btn-secondary {
          background-color: #00796b;
          border: none;
          font-weight: 600;
          transition: background-color 0.3s ease;
        }
        button.btn-secondary:hover {
          background-color: #004d40;
        }

        a.btn-primary {
          background-color: #00796b;
          border: none;
          font-weight: 600;
          transition: background-color 0.3s ease;
        }
        a.btn-primary:hover {
          background-color: #004d40;
          text-decoration: none;
        }
      `}</style>

      <main className="container py-5">
        <button onClick={() => navigate(-1)} className="btn btn-secondary mb-4">
          ← Back
        </button>
        <div className="card shadow-sm p-4">
          <img
            src={car.image}
            alt={car.name}
            className="img-fluid rounded mb-4"
            style={{ maxHeight: '400px', objectFit: 'cover', width: '100%' }}
            onError={(e) => (e.target.src = '/images/default-car.jpg')}
          />
          <h1>{car.name}</h1>
          <p className="lead text-success mb-3">{positiveDescriptions[car.id]}</p>
          <ul className="list-group list-group-flush mb-4">
            <li className="list-group-item"><strong>Range:</strong> {car.batteryRange}</li>
            <li className="list-group-item"><strong>Charge Time:</strong> {car.chargeTime}</li>
            <li className="list-group-item"><strong>Price:</strong> {car.price}</li>
          </ul>
          <Link to="/" className="btn btn-primary">
            Back to Eco-Friendly Cars
          </Link>
        </div>
      </main>
    </>
  );
};

export default CarDetails;
