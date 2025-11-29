import express from "express";
import User from "../schemas/UserSchema.js";
import bcrypt from "bcryptjs"; // 🔑 For salted password hashing

import { sanitizeInput } from "../utils/sanitizeInput.js";
import { regEmailTest } from "../utils/regEmailTest.js";
import { regNameTest as isAlphabetOnly } from "../utils/regNameTest.js";
import { charLength } from "../utils/charLength.js";

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    let { regName, regEmail, password } = req.body;

    // Sanitize inputs
    regName = sanitizeInput(regName);
    regEmail = sanitizeInput(regEmail);
    password = sanitizeInput(password);

    // Validate data
    if (regEmailTest(regEmail) === 0)
      return res.json({ success: false, message: "Invalid email format" });

    if (isAlphabetOnly(regName) === 0)
      return res.json({
        success: false,
        message: "Name must contain only alphabets",
      });

    if (charLength(regName, 6, 35) === 0)
      return res.json({
        success: false,
        message: "Name must be 6–35 characters long",
      });

    if (charLength(password, 6, 50) === 0)
      return res.json({
        success: false,
        message: "Password must be at least 6 characters",
      });

    // Check if user already exists
    const existingUser = await User.findOne({ regEmail });
    if (existingUser)
      return res.json({ success: false, message: "Email already registered" });

    // 🔑 Hash the password with bcrypt
    const salt = await bcrypt.genSalt(10); // generate salt
    const hashedPassword = await bcrypt.hash(password, salt); // hash password

    // Save new user with hashed password
    const newUser = await User.create({
      regName,
      regEmail,
      password: hashedPassword, // store hashed password
    });

    res.json({
      success: true,
      message: "User registered successfully",
      user: { regName, regEmail },
    });
  } catch (err) {
    console.error("❌ Registration error:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

export default router;
