import jwt from "jsonwebtoken";

const JWT_SECRET = "mySuperSecretKey_12345"; // use .env in real project

const verifyToken = (req, res, next) => {
  try {
    console.log("Authorization header:", req.headers.authorization);

    // 🔹 Get token from header
    const token = req.headers.authorization?.split(" ")[1]; // Bearer <token>

    if (!token) {
      return res
        .status(401)
        .json({ success: false, message: "No token provided" });
    }

    // 🔹 Verify token
    const decoded = jwt.verify(token, JWT_SECRET);

    // 🔹 Attach decoded user info to request for later use
    req.user = decoded;

    next(); // ✅ Allow next route handler to run
  } catch (err) {
    console.error("Token verification failed:", err.message);
    res
      .status(403)
      .json({ success: false, message: "Invalid or expired token" });
  }
};

export default verifyToken;
