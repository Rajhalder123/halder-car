const mongoose = require("mongoose");

const carSchema = new mongoose.Schema({
    name: String,
    price: Number,
    status: { type: String, default: "available" }, // available / sold
    buyer: {
        name: String,
        email: String
    }
});

module.exports = mongoose.model("Car", carSchema);
