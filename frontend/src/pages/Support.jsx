import React, { useState } from "react";
import { NavLink } from "react-router-dom";

const SupportPage = () => {
  const [contactForm, setContactForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [activeTab, setActiveTab] = useState("contact");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setContactForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Support form submitted:", contactForm);
    alert(
      "Thank you! Your message has been sent. We will get back to you within 24 hours."
    );
    setContactForm({
      name: "",
      email: "",
      subject: "",
      message: "",
    });
  };

  const faqs = [
    {
      question: "How do I list my car for sale?",
      answer:
        "Go to our Sell page, fill out the car details form with your vehicle information, contact details, and submit. Your listing will be reviewed and published within 24 hours.",
    },
    {
      question: "Is it free to list my car?",
      answer:
        "Yes, listing your car on our platform is completely free. We don't charge any fees for basic listings.",
    },
    {
      question: "How do I contact a seller?",
      answer:
        "Click on any car listing to view details. You'll find the seller's contact information including phone number and email address.",
    },
    {
      question: "Can I edit my car listing after posting?",
      answer:
        "Yes, you can edit your listing by contacting our support team with your listing ID and the changes you'd like to make.",
    },
    {
      question: "How long does my listing stay active?",
      answer:
        "Car listings remain active for 60 days. You can renew your listing for free by contacting us before it expires.",
    },
    {
      question: "What payment methods do you accept?",
      answer:
        "We facilitate connections between buyers and sellers. All payment arrangements are made directly between the buyer and seller.",
    },
  ];

  const primaryBlue = "#667eea"; // your theme blue color
  const gradientBlue = "linear-gradient(135deg, #667eea 0%, #764ba2 100%)";

  // Inline styles
  const pageStyle = {
    background: `radial-gradient(
    ellipse at center,
    rgba(57, 175, 199, 0.15) 0%,
    rgba(26, 26, 46, 1) 75%
  )`,
    minHeight: "100vh",
    padding: "40px 20px",
  };

  const cardStyle = {
    boxShadow: "0 0.125rem 0.25rem rgba(38, 208, 180, 0.07)",
    border: "none",
    backgroundColor: "#fff",
  };

  const cardHeaderStyle = {
    backgroundColor: "#fff",
    borderBottom: `2px solid ${primaryBlue}`,
    color: primaryBlue,
  };

  const buttonStyle = {
    background: gradientBlue,
    border: "none",
    color: "#fff",
    padding: "10px 25px",
    borderRadius: "5px",
    fontWeight: "bold",
  };

  const navLinkActiveStyle = {
    color: primaryBlue,
    borderColor: primaryBlue,
  };

  return (
    <div style={pageStyle}>

     
      {/* Header */}
      <div className="text-center mb-5">

        <NavLink to="/">
                  <img
                    src="/assets/img/Raj logo.jpg"
                    alt="Logo"
                    style={{
                      width: "80px",
                      height: "90px",
                      borderRadius: "70%",
                      objectFit: "cover",
                      color:"blueviolet",
                      marginRight: "10px",
                    }}
                  />
          
                </NavLink>
        <h1 className="display-4" style={{ color: primaryBlue }}>
          Support Center
        </h1>
        <p className="lead text-muted">
          We're here to help you with any questions or concerns.
        </p>
      </div>

      {/* Tabs */}
      <ul className="nav nav-tabs mb-4">
        {[
          { key: "contact", label: "Contact Form" },
          { key: "faq", label: "FAQ" },
          { key: "guides", label: "Help Guides" },
        ].map((tab) => (
          <li className="nav-item" key={tab.key}>
            <button
              className={`nav-link ${activeTab === tab.key ? "active" : ""}`}
              onClick={() => setActiveTab(tab.key)}
              style={activeTab === tab.key ? navLinkActiveStyle : undefined}
            >
              {tab.label}
            </button>
          </li>
        ))}
      </ul>

      {/* Tab Content */}
      {activeTab === "contact" && (
        <div className="row justify-content-center">
          <div className="col-lg-8">
            <div className="card" style={cardStyle}>
              <div className="card-header" style={cardHeaderStyle}>
                <h4 className="mb-0">Send us a Message</h4>
              </div>
              <div className="card-body">
                <form onSubmit={handleSubmit}>
                  <div className="row mb-3">
                    <div className="col-md-6">
                      <label
                        className="form-label"
                        style={{ color: primaryBlue }}
                      >
                        Name *
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        name="name"
                        value={contactForm.name}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <div className="col-md-6">
                      <label
                        className="form-label"
                        style={{ color: primaryBlue }}
                      >
                        Email *
                      </label>
                      <input
                        type="email"
                        className="form-control"
                        name="email"
                        value={contactForm.email}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                  </div>
                  <div className="mb-3">
                    <label
                      className="form-label"
                      style={{ color: primaryBlue }}
                    >
                      Subject *
                    </label>
                    <select
                      className="form-select"
                      name="subject"
                      value={contactForm.subject}
                      onChange={handleInputChange}
                      required
                    >
                      <option value="">Select a topic</option>
                      <option value="listing">Car Listing Issues</option>
                      <option value="account">Account Problems</option>
                      <option value="payment">Payment Questions</option>
                      <option value="technical">Technical Support</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                  <div className="mb-3">
                    <label
                      className="form-label"
                      style={{ color: primaryBlue }}
                    >
                      Message *
                    </label>
                    <textarea
                      className="form-control"
                      name="message"
                      rows="5"
                      value={contactForm.message}
                      onChange={handleInputChange}
                      placeholder="Please describe your issue or question in detail..."
                      required
                    ></textarea>
                  </div>
                  <button
                    type="submit"
                    className="btn btn-lg"
                    style={buttonStyle}
                  >
                    Send Message
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === "faq" && (
        <div className="row justify-content-center">
          <div className="col-lg-10">
            <div className="card" style={cardStyle}>
              <div className="card-header" style={cardHeaderStyle}>
                <h4 className="mb-0">Frequently Asked Questions</h4>
              </div>
              <div className="card-body">
                <div className="accordion" id="faqAccordion">
                  {faqs.map((faq, index) => (
                    <div className="accordion-item mb-3" key={index}>
                      <h6 className="accordion-header">
                        <button
                          className="accordion-button collapsed"
                          type="button"
                          data-bs-toggle="collapse"
                          data-bs-target={`#faq${index}`}
                          style={{ color: primaryBlue }}
                        >
                          {faq.question}
                        </button>
                      </h6>
                      <div
                        id={`faq${index}`}
                        className="accordion-collapse collapse"
                      >
                        <div
                          className="accordion-body"
                          style={{ color: "black" }}
                        >
                          {faq.answer}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === "guides" && (
        <div className="row">
          {[
            {
              icon: "fa-car",
              title: "Selling Your Car",
              desc: "Step-by-step guide to create an effective car listing.",
              tips: [
                "Taking great photos",
                "Writing descriptions",
                "Pricing strategies",
              ],
            },
            {
              icon: "fa-search",
              title: "Buying a Car",
              desc: "Tips for finding the perfect car and making a smart purchase.",
              tips: [
                "Search filters",
                "Inspection checklist",
                "Negotiation tips",
              ],
            },
            {
              icon: "fa-shield-alt",
              title: "Safety Tips",
              desc: "Stay safe when buying or selling cars online.",
              tips: ["Meeting safely", "Payment security", "Avoiding scams"],
            },
            {
              icon: "fa-file-alt",
              title: "Documentation",
              desc: "Understanding the paperwork for car transactions.",
              tips: ["Title transfer", "Registration", "Insurance"],
            },
          ].map((guide, i) => (
            <div className="col-md-6 mb-4" key={i}>
              <div className="card" style={cardStyle}>
                <div className="card-body">
                  <h5 style={{ color: primaryBlue }}>
                    <i className={`fa ${guide.icon} me-2`}></i> {guide.title}
                  </h5>
                  <p style={{ color: "black" }}>{guide.desc}</p>
                  <ul>
                    {guide.tips.map((tip, idx) => (
                      <li key={idx} style={{ color: "black" }}>
                        {tip}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Link back to Home */}
      <div className="text-center mt-5">
        <NavLink
          to="/"
          style={{
            textDecoration: "none",
            color: primaryBlue,
            fontWeight: "bold",
          }}
        >
          &larr; Back to Home
        </NavLink>
      </div>
    </div>
  );
};

export default SupportPage;
