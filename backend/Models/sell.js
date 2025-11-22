const mongoose = require("mongoose");

const sellCarSchema = new mongoose.Schema({
  carMake: String,
  carModel: String,

  images: [String],   // Multiple images stored here ✅

  year: Number,
  mileage: Number,
  price: Number,
  condition: String,
  description: String,
  contactName: String,
  email: String,
  phone: String,
  dateListed: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("SellCar", sellCarSchema);
