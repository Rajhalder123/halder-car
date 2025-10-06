const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const UserModel = require("../Models/User");

const signup = async (req, res) => {
  try {
    const { name, lastName, email, password } = req.body;

    // Check required fields
    if (!name || !lastName || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Check if user already exists
    const existingUser = await UserModel.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ 
        message: "User already exists, you can login" 
      });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Save new user
    const newUser = new UserModel({
      name,
      lastName,
      email,
      password: hashedPassword,
    });

    await newUser.save();

    // Create token
    const token = jwt.sign(
      { id: newUser._id, email: newUser.email },
      process.env.JWT_SECRET || "defaultsecret",
      { expiresIn: "1h" }
    );

    res.status(201).json({
      message: "Signup successful",
      user: { id: newUser._id, name: newUser.name, lastName: newUser.lastName, email: newUser.email },
      token,
    });

  } catch (err) {
    console.error("Signup Error:", err); // 🔴 log full error
    res.status(500).json({ message: "Internal server error", error: err.message });
  }
};

const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Check if JWT_SECRET is defined
        if (!process.env.JWT_SECRET) {
            throw new Error("JWT_SECRET is not defined in environment variables");
        }

        // Find user by email
        const user = await UserModel.findOne({ email });
        const errorMsg = 'Wrong Password....!';

        // If user is not found
        if (!user) {
            return res.status(403).json({ message: errorMsg, success: false });
        }

        // Check if passwords match
        const isPassEqual = await bcrypt.compare(password, user.password);
        if (!isPassEqual) {
            return res.status(403).json({ message: errorMsg, success: false });
        }

        // Generate JWT token
        const jwtToken = jwt.sign(
            { email: user.email, _id: user._id },
            process.env.JWT_SECRET,
            { expiresIn: '24h' }
        );

        // Respond with success
        return res.status(200).json({
            message: 'Login successful',
            success: true,
            jwtToken,
            email,
            name: user.name,
        });

        } catch (err) {
        // Log the error for debugging
        console.error("Error during login:", {
            email: req.body?.email,
            error: err.message,
        });

        // Respond with a server error
        return res.status(500).json({
            message: 'Internal server error',
            success: false,
        });
    }
};


module.exports = {
    signup,
    login
};
