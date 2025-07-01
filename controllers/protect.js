import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import User from "../models/usersmodel.js";
dotenv.config();

const protect = async (req, res, next) => {
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer ")
  ) {
    try {
      const header_array = req.headers.authorization.split(" ");
      const token = header_array[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
      req.user = await User.findById(decoded.id).select("-password");
      next();
    } catch (e) {
      if (e.name === "TokenExpiredError") {
        return res.status(401).json({ message: "Token expired" });
      } else if (e.name === "JsonWebTokenError") {
        return res.status(401).json({ message: "Invalid token" });
      } else {
        return res.status(500).json({ message: "Something went wrong" });
      };
    }
  } else {
    return res
      .status(400)
      .json({ message: "You are not authorized to access this page" });
  }
};

export default protect;
