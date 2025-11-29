import express from "express";
import User from "../schemas/UserSchema.js";
import bcrypt from "bcryptjs";
import sanitizeInput from "../utils/sanitizeInput.js";
import jwt from "jsonwebtoken";

const router = express.Router();
const JWT_SECRET = "mySuperSecretKey_12345"; // move to .env in production

// Middleware to verify JWT token
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1]; // Bearer token
  if (!token)
    return res
      .status(401)
      .json({ success: false, message: "Not authenticated" });

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err)
      return res.status(403).json({ success: false, message: "Token invalid" });
    req.user = user; // attach user payload
    next();
  });
};

// Update password route
router.put("/", authenticateToken, async (req, res) => {
  try {
    let { prevPassword, newPassword, confirmPassword } = req.body;

    // Sanitize
    prevPassword = sanitizeInput(prevPassword);
    newPassword = sanitizeInput(newPassword);
    confirmPassword = sanitizeInput(confirmPassword);

    // Validate new password
    if (!prevPassword || !newPassword || !confirmPassword)
      return res.json({ success: false, message: "All fields are required" });

    if (newPassword !== confirmPassword)
      return res.json({
        success: false,
        message: "New password and confirm password do not match",
      });

    // Fetch user from DB
    const user = await User.findOne({ regEmail: req.user.email });
    if (!user) return res.json({ success: false, message: "User not found" });

    // Check previous password
    const isMatch = await bcrypt.compare(prevPassword, user.password);
    if (!isMatch)
      return res.json({
        success: false,
        message: "Previous password is incorrect",
      });

    // Hash new password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);

    // Update in DB
    user.password = hashedPassword;
    await user.save();

    res.json({ success: true, message: "Password updated successfully" });
  } catch (err) {
    console.error("Password update error:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

export default router;
