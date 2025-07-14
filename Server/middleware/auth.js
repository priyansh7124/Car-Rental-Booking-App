import jwt from "jsonwebtoken";
import User from "../models/User.js";

// Get User data using Token (JWT)
// Middleware to protect routes
export const protect = async (req, res, next) => {
  // next is a function that passes control to the next middleware function in the stack
  // Check if the request has an authorization header
  // if not, return an error response
  // If the token is present, decode it to get the user ID
  // If the user ID is valid, fetch the user from the database
  // If the user is found, attach it to the request object
  // If the user is not found, return an error response
  // If any error occurs during the process, catch it and return an error response
  const token = req.headers.authorization;
  if (!token) {
    return res.json({ success: false, message: "not authorised" });
  }

  try {
    const userId = jwt.decode(token, process.env.JWT_SECRET);

    if (!userId) {
      return res.json({
        success: false,
        message: "not authorized",
      });
    }

    req.user = await User.findById(userId).select("-password");
    next();
  } catch (error) {
    return res.json({ success: false, message: "not authorised" });
  }
};
// middleware are used to protect routes , so that only authenticated users can access them
// This middleware checks if the user is authenticated by verifying the JWT token
// If the token is valid, it fetches the user data and attaches it to the request object
// If the token is invalid or not present, it returns an error response
