import express from "express";
import myUser from "../schemas/UserSchema.js";
import verifyToken from "../middleware/verifyToken.js"; // ✅ import your middleware

const router = express.Router();

// ✅ Use verifyToken to protect route and get email from token
router.get("/", verifyToken, async (req, res) => {
  console.log(
    "Authorization header BEFORE verifyToken:",
    req.headers.authorization
  );

  if (!req.headers.authorization) {
    return res
      .status(400)
      .json({ success: false, message: "No token sent from frontend" });
  }

  try {
    console.log("Decoded user from token:", req.user.email); // Debugging line
    const userEmail = req.user.email; // decoded from JWT

    if (!userEmail) {
      return res
        .status(400)
        .json({ success: false, message: "No email found in token" });
    }

    const user = await myUser.findOne({ regEmail: userEmail });

    console.log("User found in DB:", user); // Debugging line

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    console.log("Returning user data for:", user.email); // Debugging line
    console.log(user._doc.regEmail);
    console.log(user._doc.regName);
    res.json({
      success: true,
      user: {
        name: user._doc.regName,
        email: user._doc.regEmail,
      },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

export default router;
