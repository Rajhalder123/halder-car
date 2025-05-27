import React, { useState } from "react";
import { Link } from 'react-router-dom';
const SellPage = () => {
  const [formData, setFormData] = useState({
    carMake: "",
    carModel: "",
    year: "",
    mileage: "",
    price: "",
    condition: "",
    description: "",
    contactName: "",
    email: "",
    phone: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch("http://localhost:8080/sell", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!response.ok) throw new Error("Failed to submit");

      alert("Thank you! Your car listing has been submitted for review.");

      setFormData({
        carMake: "",
        carModel: "",
        year: "",
        mileage: "",
        price: "",
        condition: "",
        description: "",
        contactName: "",
        email: "",
        phone: "",
      });
    } catch (error) {
      console.error(error);
      alert("Something went wrong. Please try again later.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Styles
  const container = {
    maxWidth: 720,
    margin: "60px auto",
    padding: "0 20px",
    fontFamily:
      "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif",
    color: "#333",
    lineHeight: 1.6,
  };

  const card = {
    backgroundColor: "#fff",
    borderRadius: 12,
    boxShadow: "0 4px 18px rgba(0,0,0,0.1)",
    overflow: "hidden",
  };

  const header = {
    background: "linear-gradient(135deg,rgb(213, 224, 108), #007fff)",
    color: "#ffff",
    padding: "20px 20px",
    textAlign: "center",
  };

  const title = {
    fontSize: 28,
    fontWeight: 700,
    margin: 0,
  };

  const subtitle = {
    marginTop: 8,
    fontSize: 16,
    opacity: 0.9,
  };

  const body = {
    padding: "30px 25px 40px",
  };

  const formGroup = {
    marginBottom: 20,
  };

  const label = {
    display: "block",
    marginBottom: 8,
    fontWeight: 600,
    fontSize: 14,
    color: "#222",
  };

  const input = {
    width: "100%",
    padding: "12px 15px",
    borderRadius: 8,
    border: "1px solid #ccc",
    fontSize: 16,
    boxSizing: "border-box",
    transition: "border-color 0.3s ease",
  };

  const inputFocus = {
    borderColor: "#0052cc",
    outline: "none",
    boxShadow: "0 0 6px rgba(0, 82, 204, 0.3)",
  };

  const textarea = {
    ...input,
    minHeight: 100,
    resize: "vertical",
  };

  const select = {
    ...input,
    appearance: "none",
    backgroundColor: "#fff",
    backgroundImage:
      "url(\"data:image/svg+xml;charset=US-ASCII,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 4 5'%3E%3Cpath fill='none' stroke='%230052cc' stroke-width='1.5' d='M2 0L0 2h4zm0 5L0 3h4z'/%3E%3C/svg%3E\")",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "right 10px center",
    backgroundSize: "8px 10px",
  };

  const button = {
    width: "100%",
    padding: "14px 0",
    borderRadius: 8,
    fontSize: 18,
    fontWeight: 600,
    color: "#fff",
    backgroundColor: isSubmitting ? "#8ab1ff" : "#0052cc",
    border: "none",
    cursor: isSubmitting ? "not-allowed" : "pointer",
    transition: "background-color 0.3s ease",
    marginTop: 30,
  };

  const sectionTitle = {
    color: "#0052cc",
    fontSize: 20,
    fontWeight: 700,
    borderBottom: "2px solid #0052cc",
    paddingBottom: 8,
    marginBottom: 24,
    marginTop: 40,
  };

  const infoCardsContainer = {
    display: "flex",
    justifyContent: "space-between",
    gap: 20,
    marginTop: 30,
    flexWrap: "wrap",
  };

  const infoCard = {
    flex: "1 1 30%",
    backgroundColor: "#f9faff",
    borderRadius: 10,
    padding: 20,
    textAlign: "center",
    boxShadow: "0 2px 10px rgba(0,0,0,0.05)",
  };

  const infoIcon = {
    fontSize: 36,
    color: "#0052cc",
    marginBottom: 12,
  };

  return (
    <div style={container}>
      <div style={card}>
        <header style={header}>
          <Link to="/">
  <img
    src="/assets/img/Raj logo.jpg"
    alt="Logo"
    style={{
      width: "80px",
      height: "90px",
      borderRadius: "70%",
      objectFit: "cover",
      color: "blueviolet",
      marginRight: "10px",
      cursor: "pointer", // add pointer cursor to show it's clickable
    }}
  />
</Link>

          <h2 style={title}>Sell Your Car</h2>
          <p style={subtitle}>
            Fill out the form below to list your car for sale
          </p>
        </header>
        <section style={body}>
          <form onSubmit={handleSubmit}>
            {/* Car Information */}
            <h3 style={sectionTitle}>Car Information</h3>

            <div style={{ display: "flex", gap: 20, flexWrap: "wrap" }}>
              <div style={{ flex: "1 1 48%" }}>
                <label style={label} htmlFor="carMake">
                  Car Make *
                </label>
                <input
                  id="carMake"
                  name="carMake"
                  type="text"
                  value={formData.carMake}
                  onChange={handleInputChange}
                  placeholder="e.g., Toyota, Honda, BMW"
                  required
                  style={input}
                  onFocus={(e) => (e.target.style.borderColor = "#0052cc")}
                  onBlur={(e) => (e.target.style.borderColor = "#ccc")}
                />
              </div>

              <div style={{ flex: "1 1 48%" }}>
                <label style={label} htmlFor="carModel">
                  Car Model *
                </label>
                <input
                  id="carModel"
                  name="carModel"
                  type="text"
                  value={formData.carModel}
                  onChange={handleInputChange}
                  placeholder="e.g., Camry, Civic, X5"
                  required
                  style={input}
                  onFocus={(e) => (e.target.style.borderColor = "#0052cc")}
                  onBlur={(e) => (e.target.style.borderColor = "#ccc")}
                />
              </div>
            </div>

            <div
              style={{
                display: "flex",
                gap: 20,
                flexWrap: "wrap",
                marginTop: 20,
              }}
            >
              <div style={{ flex: "1 1 30%" }}>
                <label style={label} htmlFor="year">
                  Year *
                </label>
                <input
                  id="year"
                  name="year"
                  type="number"
                  value={formData.year}
                  onChange={handleInputChange}
                  min="1990"
                  max="2025"
                  required
                  style={input}
                  onFocus={(e) => (e.target.style.borderColor = "#0052cc")}
                  onBlur={(e) => (e.target.style.borderColor = "#ccc")}
                />
              </div>

              <div style={{ flex: "1 1 30%" }}>
                <label style={label} htmlFor="mileage">
                  Mileage *
                </label>
                <input
                  id="mileage"
                  name="mileage"
                  type="number"
                  value={formData.mileage}
                  onChange={handleInputChange}
                  placeholder="Miles"
                  required
                  style={input}
                  onFocus={(e) => (e.target.style.borderColor = "#0052cc")}
                  onBlur={(e) => (e.target.style.borderColor = "#ccc")}
                />
              </div>

              <div style={{ flex: "1 1 30%" }}>
                <label style={label} htmlFor="price">
                  Asking Price *
                </label>
                <input
                  id="price"
                  name="price"
                  type="number"
                  value={formData.price}
                  onChange={handleInputChange}
                  placeholder="$"
                  required
                  style={input}
                  onFocus={(e) => (e.target.style.borderColor = "#0052cc")}
                  onBlur={(e) => (e.target.style.borderColor = "#ccc")}
                />
              </div>
            </div>

            <div style={{ marginTop: 20, maxWidth: 300 }}>
              <label style={label} htmlFor="condition">
                Condition *
              </label>
              <select
                id="condition"
                name="condition"
                value={formData.condition}
                onChange={handleInputChange}
                required
                style={select}
                onFocus={(e) => (e.target.style.borderColor = "#0052cc")}
                onBlur={(e) => (e.target.style.borderColor = "#ccc")}
              >
                <option value="">Select condition</option>
                <option value="excellent">Excellent</option>
                <option value="good">Good</option>
                <option value="fair">Fair</option>
                <option value="poor">Poor</option>
              </select>
            </div>

            <div style={{ marginTop: 20 }}>
              <label style={label} htmlFor="description">
                Additional Details
              </label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                placeholder="Describe any special features or issues"
                style={textarea}
              />
            </div>

            {/* Contact Information */}
            <h3 style={sectionTitle}>Contact Information</h3>

            <div style={{ display: "flex", gap: 20, flexWrap: "wrap" }}>
              <div style={{ flex: "1 1 48%" }}>
                <label style={label} htmlFor="contactName">
                  Your Name *
                </label>
                <input
                  id="contactName"
                  name="contactName"
                  type="text"
                  value={formData.contactName}
                  onChange={handleInputChange}
                  required
                  style={input}
                  onFocus={(e) => (e.target.style.borderColor = "#0052cc")}
                  onBlur={(e) => (e.target.style.borderColor = "#ccc")}
                />
              </div>

              <div style={{ flex: "1 1 48%" }}>
                <label style={label} htmlFor="email">
                  Email Address *
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  style={input}
                  onFocus={(e) => (e.target.style.borderColor = "#0052cc")}
                  onBlur={(e) => (e.target.style.borderColor = "#ccc")}
                />
              </div>
            </div>

            <div style={{ marginTop: 20, maxWidth: 300 }}>
              <label style={label} htmlFor="phone">
                Phone Number *
              </label>
              <input
                id="phone"
                name="phone"
                type="tel"
                value={formData.phone}
                onChange={handleInputChange}
                required
                style={input}
                onFocus={(e) => (e.target.style.borderColor = "#0052cc")}
                onBlur={(e) => (e.target.style.borderColor = "#ccc")}
              />
            </div>

            <button type="submit" disabled={isSubmitting} style={button}>
              {isSubmitting ? "Submitting..." : "Submit Listing"}
            </button>
          </form>

          {/* Optional Info Cards - you can customize or remove */}
          <div style={infoCardsContainer}>
            <div style={infoCard}>
              <div style={infoIcon}>🚗</div>
              <h4>Wide Reach</h4>
              <p>Your car will be visible to thousands of potential buyers.</p>
            </div>
            <div style={infoCard}>
              <div style={infoIcon}>🔒</div>
              <h4>Secure Process</h4>
              <p>
                We ensure your data and transaction are safe and confidential.
              </p>
            </div>
            <div style={infoCard}>
              <div style={infoIcon}>⚡</div>
              <h4>Fast Sale</h4>
              <p>
                Get competitive offers quickly and sell your car hassle-free.
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default SellPage;
