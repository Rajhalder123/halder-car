const express = require("express");
const router = express.Router();
const path = require("path");
const SellCar = require("../Models/sell");
const upload = require("../Middlewares/upload"); // multer middleware

// ✅ GET all cars
router.get("/", async (req, res) => {
  try {
    const cars = await SellCar.find().sort({ createdAt: -1 }); // latest first
    res.status(200).json(cars);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "❌ Failed to fetch cars" });
  }
});

// ✅ POST route to sell a car
router.post(
  "/",
  upload.fields([
    { name: "image", maxCount: 1 },   // single image
    { name: "images", maxCount: 10 }  // multiple images
  ]),
  async (req, res) => {
    try {
      let imagePaths = [];

      // Single image
      if (req.files.image) {
        imagePaths.push(`/uploads/${req.files.image[0].filename}`);
      }

      // Multiple images
      if (req.files.images) {
        const multiImages = req.files.images.map(
          (file) => `/uploads/${file.filename}`
        );
        imagePaths = imagePaths.concat(multiImages);
      }

      // Create new car
      const newCar = new SellCar({
        carMake: req.body.carMake,
        carModel: req.body.carModel,
        images: imagePaths,
        year: req.body.year,
        mileage: req.body.mileage,
        price: req.body.price,
        condition: req.body.condition,
        description: req.body.description,
        contactName: req.body.contactName,
        email: req.body.email,
        phone: req.body.phone,
      });

      await newCar.save();

      res.status(201).json({
        message: "✅ Car listed successfully",
        data: newCar,
      });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "❌ Upload failed" });
    }
  }
);

module.exports = router;
