const express = require("express");
const router = express.Router();
const SellCar = require("../Models/sell");

// GET all car listings
router.get("/", async (req, res) => {
  try {
    const cars = await SellCar.find();
    res.json(cars);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
