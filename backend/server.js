require("dotenv").config(); // Load environment variables

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");

// Routers
const AuthRouter = require("./Routes/AuthRouter");
const SellCarRouter = require("./Routes/SellCarRoute");
const ProductRouter = require("./Routes/ProductRouter");
const BuyCarRouter = require("./Routes/BuyCarRoute");

const app = express();
const PORT = process.env.PORT || 8080;
const mongo_url = process.env.MONGO_CONN;

// Check MongoDB connection string
if (!mongo_url) {
  console.error("Error: MONGO_CONN environment variable is not defined!");
  process.exit(1);
}

// Connect to MongoDB
mongoose
  .connect(mongo_url)
  .then(() => console.log("✅ MongoDB connected..."))
  .catch((err) => {
    console.error("❌ MongoDB connection error:", err);
    process.exit(1);
  });

// ✅ Middleware (DO NOT use bodyParser.json here)
app.use(cors());
app.use(express.json()); // OK for normal JSON routes

// ✅ Static folder for uploaded images
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Routes
app.get("/ping", (req, res) => {
  res.send("Server working ✅");
});

app.use("/auth", AuthRouter);
app.use("/sell", SellCarRouter);
app.use("/products", ProductRouter);
app.use("/buy", BuyCarRouter);

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
});
