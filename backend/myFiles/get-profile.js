import express from "express";
import User from "../schemas/UserSchema.js";
import verifyToken from "../middleware/verifyToken.js";

const router = express.Router();

router.get("/", verifyToken, async (req, res) => {
  try {
    // ✅ req.user was set by verifyToken middleware
    const userEmail = req.user.email;

    // ✅ Fetch user data from DB
    const user = await User.findOne({ regEmail: userEmail }).select(
      "-password"
    );

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    res.json({
      success: true,
      message: "OK",
      user,
    });
  } catch (err) {
    console.error("Get profile error:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

export default router;
