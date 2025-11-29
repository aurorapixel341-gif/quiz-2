import express from "express";
import connectDB from "./db.js";
import cors from "cors";
import registerUserRoute from "./myFiles/register-user.js";
import getProfileRoute from "./myFiles/get-profile.js";
import loginUserRoute from "./myFiles/login-user.js";
import getCurrentUserRoute from "./myFiles/get-current-user.js";
import updateUserRoute from "./myFiles/update-user.js";
import updatePasswordRoute from "./myFiles/updatePassword.js";
import deleteaccountRoute from "./myFiles/deleteAccount.js";

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(express.json());

// DB Connect
connectDB();

// Routes
app.use("/register", registerUserRoute);
app.use("/get-profile", getProfileRoute);
app.use("/login", loginUserRoute);
app.use("/user/get-current-user", getCurrentUserRoute);
app.use("/user/update-user", updateUserRoute);
app.use("/user/update-password", updatePasswordRoute);
app.use("/user/delete-account", deleteaccountRoute);

// Start Server
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
