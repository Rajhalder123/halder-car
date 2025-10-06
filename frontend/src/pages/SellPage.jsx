import React, { useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "./Navbar";

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
  const [images, setImages] = useState([]);
  const [imagePreviews, setImagePreviews] = useState([]);

  // Handle text input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle image uploads
  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    const selectedFiles = files.slice(0, 10); // Max 10 images

    setImages(selectedFiles);

    const previews = selectedFiles.map((file) => URL.createObjectURL(file));
    setImagePreviews(previews);
  };

  // Remove image preview
  const removeImage = (index) => {
    const newImages = [...images];
    const newPreviews = [...imagePreviews];
    newImages.splice(index, 1);
    newPreviews.splice(index, 1);
    setImages(newImages);
    setImagePreviews(newPreviews);
  };

  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const formDataToSend = new FormData();

      // Append text fields
      Object.keys(formData).forEach((key) => {
        formDataToSend.append(key, formData[key]);
      });

      // Append images
      images.forEach((image) => {
        formDataToSend.append("images", image);
      });

      const response = await fetch("http://localhost:8080/sell", {
        method: "POST",
        body: formDataToSend,
      });

      if (!response.ok) throw new Error("Failed to submit");

      alert("✅ Thank you! Your car listing has been submitted for review.");

      // Reset form
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
      setImages([]);
      setImagePreviews([]);
    } catch (error) {
      console.error(error);
      alert("❌ Something went wrong. Please try again later.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto my-12 px-4">
      {/* Fixed Navbar */}
      <header className="fixed top-0 left-0 w-full z-50 bg-white dark:bg-gray-900 shadow-md">
        <Navbar />
      </header>

      <div className="bg-white shadow-2xl rounded-xl overflow-hidden mt-24">
        <div className="bg-gradient-to-r from-green-500 to-emerald-700 text-white p-6 text-center">
          <h2 className="text-3xl font-bold">Sell Your Car</h2>
          <p className="text-sm opacity-90 mt-1">
            Fill out the form below to list your car for sale
          </p>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Car Information */}
          <div>
            <h3 className="text-xl font-semibold text-green-700 border-b pb-2 mb-4">
              Car Information
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="font-medium">Car Make *</label>
                <input
                  type="text"
                  name="carMake"
                  value={formData.carMake}
                  onChange={handleInputChange}
                  required
                  className="mt-1 w-full p-2 border rounded-md"
                />
              </div>
              <div>
                <label className="font-medium">Car Model *</label>
                <input
                  type="text"
                  name="carModel"
                  value={formData.carModel}
                  onChange={handleInputChange}
                  required
                  className="mt-1 w-full p-2 border rounded-md"
                />
              </div>
              <div>
                <label className="font-medium">Year *</label>
                <input
                  type="number"
                  name="year"
                  value={formData.year}
                  onChange={handleInputChange}
                  min="1990"
                  max="2025"
                  required
                  className="mt-1 w-full p-2 border rounded-md"
                />
              </div>
              <div>
                <label className="font-medium">Mileage *</label>
                <input
                  type="number"
                  name="mileage"
                  value={formData.mileage}
                  onChange={handleInputChange}
                  required
                  className="mt-1 w-full p-2 border rounded-md"
                />
              </div>
              <div>
                <label className="font-medium">Asking Price *</label>
                <input
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleInputChange}
                  required
                  className="mt-1 w-full p-2 border rounded-md"
                />
              </div>
              <div>
                <label className="font-medium">Condition *</label>
                <select
                  name="condition"
                  value={formData.condition}
                  onChange={handleInputChange}
                  required
                  className="mt-1 w-full p-2 border rounded-md"
                >
                  <option value="">Select condition</option>
                  <option value="excellent">Excellent</option>
                  <option value="good">Good</option>
                  <option value="fair">Fair</option>
                  <option value="poor">Poor</option>
                </select>
              </div>
            </div>

            {/* Image Upload */}
            <div className="mt-8">
              <h3 className="text-2xl font-semibold text-green-700 border-b-2 border-green-200 pb-2 mb-6">
                Car Images *
              </h3>
              <div className="space-y-4">
                <div>
                  <label className="block mb-3 font-medium text-gray-700">
                    Upload Photos (Max 10)
                  </label>
                  <input
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={handleImageChange}
                    className="w-full p-3 border-2 border-dashed border-gray-300 rounded-lg 
                    file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 
                    file:bg-green-600 file:text-white hover:file:bg-green-700 
                    file:font-medium cursor-pointer"
                  />
                  <p className="text-sm text-gray-500 mt-2">
                    📸 Upload clear photos from different angles. The first photo
                    will be the main image.
                  </p>
                </div>

                {/* Image Preview */}
                {imagePreviews.length > 0 ? (
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
                    {imagePreviews.map((preview, index) => (
                      <div key={index} className="relative group">
                        <img
                          src={preview}
                          alt={`Car ${index + 1}`}
                          className="w-full h-40 object-cover rounded-lg border-2 border-gray-200 shadow-sm"
                        />
                        {index === 0 && (
                          <span className="absolute top-2 left-2 bg-green-600 text-white text-xs px-3 py-1 rounded-full font-semibold shadow-md">
                            Main
                          </span>
                        )}
                        <button
                          type="button"
                          onClick={() => removeImage(index)}
                          className="absolute top-2 right-2 bg-red-500 hover:bg-red-600 text-white rounded-full w-8 h-8 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity shadow-md font-bold text-lg"
                        >
                          ×
                        </button>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center text-gray-400">
                    <p>No images uploaded yet</p>
                  </div>
                )}
              </div>
            </div>

            {/* Description */}
            <div className="md:col-span-2 mt-8">
              <label className="font-medium">Additional Details</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                rows={4}
                className="mt-1 w-full p-2 border rounded-md"
              ></textarea>
            </div>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-xl font-semibold text-green-700 border-b pb-2 mb-4">
              Contact Information
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="font-medium">Your Name *</label>
                <input
                  type="text"
                  name="contactName"
                  value={formData.contactName}
                  onChange={handleInputChange}
                  required
                  className="mt-1 w-full p-2 border rounded-md"
                />
              </div>
              <div>
                <label className="font-medium">Email Address *</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className="mt-1 w-full p-2 border rounded-md"
                />
              </div>
              <div className="md:col-span-2">
                <label className="font-medium">Phone Number *</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  required
                  className="mt-1 w-full p-2 border rounded-md"
                />
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-full py-3 rounded-lg text-white font-semibold transition ${
              isSubmitting
                ? "bg-blue-300 cursor-not-allowed"
                : "bg-green-600 hover:bg-green-800"
            }`}
          >
            {isSubmitting ? "Submitting..." : "Submit Listing"}
          </button>

          {/* Info Cards */}
          <div className="mt-10 grid md:grid-cols-3 gap-6 text-center">
            <div className="bg-green-50 p-4 rounded-xl shadow-sm">
              <div className="text-3xl">🚗</div>
              <h4 className="font-semibold mt-2">Wide Reach</h4>
              <p className="text-sm text-gray-600">
                Your car will be visible to thousands of potential buyers.
              </p>
            </div>
            <div className="bg-green-50 p-4 rounded-xl shadow-sm">
              <div className="text-3xl">🔒</div>
              <h4 className="font-semibold mt-2">Secure Process</h4>
              <p className="text-sm text-gray-600">
                We ensure your data and transactions are safe and confidential.
              </p>
            </div>
            <div className="bg-green-50 p-4 rounded-xl shadow-sm">
              <div className="text-3xl">⚡</div>
              <h4 className="font-semibold mt-2">Fast Sale</h4>
              <p className="text-sm text-gray-600">
                Get competitive offers quickly and sell your car hassle-free.
              </p>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SellPage;
