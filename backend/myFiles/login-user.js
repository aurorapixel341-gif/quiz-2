import express from "express";
import jwt from "jsonwebtoken";
import User from "../schemas/UserSchema.js";
import sanitizeInput from "../utils/sanitizeInput.js";
import bcrypt from "bcryptjs"; // 🔑 for comparing hashed passwords

const router = express.Router();
const JWT_SECRET = "mySuperSecretKey_12345"; // move to .env later

router.post("/", async (req, res) => {
  try {
    let { regEmail, password } = req.body;

    // 🧼 Sanitize inputs
    regEmail = sanitizeInput(regEmail);
    password = sanitizeInput(password);

    // 🔍 Check if user exists
    const user = await User.findOne({ regEmail });
    if (!user) return res.json({ success: false, message: "User not found" });

    // 🔐 Compare password with hashed password in DB
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.json({ success: false, message: "Invalid password" });

    // 🪪 Create payload
    const payload = { email: user.regEmail, name: user.regName };

    // 🔥 Generate JWT token
    const token = jwt.sign(payload, JWT_SECRET, { expiresIn: "1h" });

    // ✅ Return response
    res.status(200).json({
      success: true,
      message: "Login successful",
      token, // send back to frontend
      user: { regName: user.regName, regEmail: user.regEmail },
    });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

export default router;
