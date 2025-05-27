import React from 'react';
import { Link } from 'react-router-dom';

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
  ,
 {
  id: 4,
  name: 'BMW i3',
  batteryRange: '153 miles',
  chargeTime: '6 hours (Level 2)',
  price: '$44,450',
  description: "Stylish and sustainable electric hatchback with agile handling, innovative design, and ideal for city commuting.",
  image: '/assets/img/bmw i3.png',
}

  // Add more cars here if you want
];

const EcoFriendlyCars = () => {
  return (
    <>
      <style>{`
        body, html, #root {
          height: 100%;
          margin: 0;
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
          background: linear-gradient(135deg, #e0f7fa, #ffffff);
        }

        #eco-cars {
          min-height: 100vh;
          padding: 3rem 2rem;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
        }

        .page-header {
          text-align: center;
          margin-bottom: 3rem;
          color: #00796b;
          text-shadow: 0 1px 3px rgba(0,0,0,0.1);
        }

        .page-header h1 {
          font-size: 3rem;
          margin-bottom: 0.3rem;
        }

        .page-header p {
          font-size: 1.25rem;
          font-weight: 500;
          max-width: 650px;
          margin: 0 auto;
          color: #004d40;
          opacity: 0.85;
        }

        .car-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 2rem;
          margin-bottom: 4rem;
        }

        .car-card {
          background: #ffffff;
          border-radius: 15px;
          box-shadow: 0 8px 20px rgba(0,0,0,0.12);
          display: flex;
          flex-direction: column;
          transition: transform 0.3s ease, box-shadow 0.3s ease;
          overflow: hidden;
          cursor: pointer;
        }

        .car-card:hover {
          transform: translateY(-10px);
          box-shadow: 0 15px 35px rgba(0,0,0,0.25);
        }

        .car-img {
          width: 100%;
          height: 180px;
          object-fit: cover;
          border-radius: 15px 15px 0 0;
          background: #e0f2f1;
        }

        .car-body {
          flex-grow: 1;
          padding: 1.5rem 1.5rem 2rem 1.5rem;
          display: flex;
          flex-direction: column;
        }

        .car-title {
          font-size: 1.5rem;
          color: #00796b;
          margin-bottom: 0.5rem;
          font-weight: 700;
        }

        .car-desc {
          flex-grow: 1;
          font-size: 1rem;
          color: #004d40;
          margin-bottom: 1rem;
          line-height: 1.4;
          opacity: 0.9;
        }

        .car-specs {
          list-style: none;
          padding: 0;
          margin: 0 0 1rem 0;
          color: #00796b;
          font-weight: 600;
          font-size: 0.95rem;
        }

        .car-specs li {
          margin-bottom: 0.3rem;
        }

        .btn-view {
          background-color: #00796b;
          border: none;
          color: #fff;
          padding: 0.6rem 1.1rem;
          border-radius: 30px;
          font-weight: 600;
          font-size: 1rem;
          align-self: flex-start;
          transition: background-color 0.25s ease;
          text-decoration: none;
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          box-shadow: 0 3px 8px rgba(0,0,0,0.12);
        }

        .btn-view:hover {
          background-color: #004d40;
          text-decoration: none;
          color: white;
          box-shadow: 0 5px 15px rgba(0,0,0,0.25);
        }

        footer {
          text-align: center;
          padding: 1rem 0;
          color: #004d40;
          font-weight: 500;
          border-top: 1px solid #b2dfdb;
          font-size: 0.9rem;
          user-select: none;
        }

        @media (max-width: 576px) {
          .page-header h1 {
            font-size: 2.2rem;
          }
          .page-header p {
            font-size: 1rem;
          }
        }
      `}</style>

      <main id="eco-cars">
        <header className="page-header">
          <h1>🌱 Eco-Friendly Cars</h1>
          <p>
            Explore 100% battery-powered electric vehicles with zero emissions, top performance, and innovative design — driving us toward a sustainable future.
          </p>
        </header>

        <section className="car-grid">
          {ecoFriendlyCars.map((car) => (
            <article key={car.id} className="car-card" tabIndex={0}>
              <img
                src={car.image}
                alt={car.name}
                className="car-img"
                onError={(e) => (e.target.src = '/images/default-car.jpg')}
              />
              <div className="car-body">
                <h2 className="car-title">{car.name}</h2>
                <p className="car-desc">{car.description}</p>
                <ul className="car-specs">
                  <li>🔋 Range: {car.batteryRange}</li>
                  <li>⚡ Charge Time: {car.chargeTime}</li>
                  <li>💰 Price: {car.price}</li>
                </ul>
                <Link to={`/car/${car.id}`} className="btn-view" aria-label={`View details of ${car.name}`}>
                  🚗 View Details
                </Link>
              </div>
            </article>
          ))}
        </section>

        <footer>
          &copy; {new Date().getFullYear()} EcoCars by Raj Haldar. All rights reserved.
        </footer>
      </main>
    </>
  );
};

export default EcoFriendlyCars;
