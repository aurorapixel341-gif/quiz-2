// File: update-user.js
import express from "express";
import myUser from "../schemas/UserSchema.js"; // Your User schema
import verifyToken from "../middleware/verifyToken.js"; // optional: if you want auth

const router = express.Router();

// PUT /user/update-user/:email
router.put("/:email", verifyToken, async (req, res) => {
  try {
    const emailParam = req.params.email; // email from URL
    const { newName } = req.body; // new username from request body

    if (!newName) {
      return res
        .status(400)
        .json({ success: false, message: "New username is required" });
    }

    // Find the user by regEmail in DB
    const user = await myUser.findOne({ regEmail: emailParam });

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    // Update username
    user.regName = newName;
    await user.save();

    res.json({
      success: true,
      message: "Username updated successfully!",
      updatedData: { regEmail: user.regEmail, regName: user.regName },
    });
  } catch (err) {
    console.error("Error updating username:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

export default router;
