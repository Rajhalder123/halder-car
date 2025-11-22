import React, { useState } from "react";
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
    image: null,
  });

  const [preview, setPreview] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData((prev) => ({ ...prev, image: file }));
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.image) {
      alert("❌ Please upload an image");
      return;
    }

    setIsSubmitting(true);

    try {
      const data = new FormData();

      Object.keys(formData).forEach((key) => {
        if (key !== "image") data.append(key, formData[key]);
      });

      data.append("image", formData.image); // multer field

      const response = await fetch("http://localhost:8080/sell", {
        method: "POST",
        body: data,
      });

      if (!response.ok) throw new Error("Upload failed");

      alert("✅ Car listed successfully!");

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
        image: null,
      });

      setPreview(null);

    } catch (err) {
      console.error(err);
      alert("❌ Something went wrong!");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <header className="fixed top-0 left-0 w-full z-50 bg-white shadow-md">
        <Navbar />
      </header>

      <div className="max-w-4xl mx-auto mt-32 mb-12 px-4">
        <div className="bg-white shadow-2xl rounded-xl overflow-hidden">
          <div className="bg-gradient-to-r from-green-500 to-emerald-700 text-white p-6 text-center">
            <h2 className="text-3xl font-bold">Sell Your Car</h2>
            <p className="text-sm opacity-90 mt-1">
              Upload your car details with image
            </p>
          </div>

          <form onSubmit={handleSubmit} className="p-6 space-y-6">

            {/* Car Info */}
            <div>
              <h3 className="text-xl font-semibold text-green-700 border-b pb-2 mb-4">
                Car Information
              </h3>

              <div className="grid md:grid-cols-2 gap-4">
                <input type="text" name="carMake" placeholder="Car Name" value={formData.carMake} onChange={handleInputChange} required className="p-3 border rounded" />
                <input type="text" name="carModel" placeholder="Car Model" value={formData.carModel} onChange={handleInputChange} required className="p-3 border rounded" />

                <input type="number" name="year" placeholder="Year" value={formData.year} onChange={handleInputChange} required className="p-3 border rounded" />
                <input type="number" name="mileage" placeholder="Mileage" value={formData.mileage} onChange={handleInputChange} required className="p-3 border rounded" />

                <input type="number" name="price" placeholder="Price" value={formData.price} onChange={handleInputChange} required className="p-3 border rounded" />

                <select name="condition" value={formData.condition} onChange={handleInputChange} required className="p-3 border rounded">
                  <option value="">Select Condition</option>
                  <option value="excellent">Excellent</option>
                  <option value="good">Good</option>
                  <option value="fair">Fair</option>
                  <option value="poor">Poor</option>
                </select>

                <textarea
                  name="description"
                  placeholder="Additional details"
                  value={formData.description}
                  onChange={handleInputChange}
                  rows="4"
                  className="md:col-span-2 p-3 border rounded"
                />

                {/* Image Upload */}
                <div className="md:col-span-2">
                  <label className="font-semibold">Upload Car Image *</label>
                  <input
                    type="file"
                    name="image"
                    accept="image/*"
                    onChange={handleImageChange}
                    required
                    className="mt-2 w-full p-2 border rounded"
                  />

                  {preview && (
                    <img
                      src={preview}
                      alt="Preview"
                      className="mt-4 h-40 object-cover rounded-lg border"
                    />
                  )}
                </div>
              </div>
            </div>

            {/* Contact Info */}
            <div>
              <h3 className="text-xl font-semibold text-green-700 border-b pb-2 mb-4">
                Contact Information
              </h3>

              <div className="grid md:grid-cols-2 gap-4">
                <input type="text" name="contactName" placeholder="Your Name" value={formData.contactName} onChange={handleInputChange} required className="p-3 border rounded" />
                <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleInputChange} required className="p-3 border rounded" />
                <input type="tel" name="phone" placeholder="Phone number" value={formData.phone} onChange={handleInputChange} required className="md:col-span-2 p-3 border rounded" />
              </div>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full py-4 rounded-lg text-white text-lg font-bold transition 
              ${isSubmitting ? "bg-gray-400" : "bg-green-600 hover:bg-green-700"}`}
            >
              {isSubmitting ? "Submitting..." : "Submit Listing"}
            </button>

          </form>
        </div>
      </div>
    </>
  );
};

export default SellPage;
