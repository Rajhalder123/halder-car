const express = require("express");
const router = express.Router();
const SellCar = require("../Models/sell");
const upload = require("../Middlewares/upload"); // multer middleware

// POST route to sell a car
router.post(
  "/",
  upload.fields([
    { name: "image", maxCount: 1 },   // single image
    { name: "images", maxCount: 10 }  // multiple images
  ]),
  async (req, res) => {
    try {
      let imagePaths = [];

      if (req.files.image) {
        imagePaths.push(`/uploads/${req.files.image[0].filename}`);
      }

      if (req.files.images) {
        const multiImages = req.files.images.map(
          (file) => `/uploads/${file.filename}`
        );
        imagePaths = imagePaths.concat(multiImages);
      }

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
