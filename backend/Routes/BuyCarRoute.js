const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

// ✅ Schema for car booking with all details
const BuySchema = new mongoose.Schema({
  carId: { type: Number, required: true },   // Car ID from frontend
  carName: { type: String, required: true }, // Car name/model
  name: { type: String, required: true },    // User full name
  email: { type: String, required: true },
  phone: { type: String, required: true },
  address: { type: String, required: true },
  city: { type: String, required: true },
  pincode: { type: String, required: true },
  payment: { type: String, enum: ["Cash on Delivery", "Online Payment"], default: "Cash on Delivery" },
  date: { type: Date, default: Date.now },
});

// ✅ Avoid OverwriteModelError
const BuyCar = mongoose.models.BuyCar || mongoose.model("BuyCar", BuySchema);

// ✅ POST /buy (create booking)
router.post("/", async (req, res) => {
  try {
    const { carId, carName, name, email, phone, address, city, pincode, payment } = req.body;

    // Validation
    if (!carId || !carName || !name || !email || !phone || !address || !city || !pincode) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Save booking
    const purchase = new BuyCar({ carId, carName, name, email, phone, address, city, pincode, payment });
    await purchase.save();

    res.status(201).json({
      success: true,
      message: `✅ Booking confirmed for ${carName}`,
      purchase,
    });
  } catch (error) {
    console.error("❌ BuyCar Error:", error);
    res.status(500).json({ message: "Server Error" });
  }
});

// ✅ GET /buy (list all bookings for admin panel)
router.get("/", async (req, res) => {
  try {
    const purchases = await BuyCar.find().sort({ date: -1 });
    res.json(purchases);
  } catch (error) {
    console.error("❌ Fetch Error:", error);
    res.status(500).json({ message: "Server Error" });
  }
});

module.exports = router;
