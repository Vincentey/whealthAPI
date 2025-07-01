import User from "../models/usersmodel.js";
import { v4 as uuidv4 } from "uuid";
import { hashPassword, generateToken } from "../utility/utils.js";
import bcrypt from "bcryptjs";

const registerUser = async (req, res) => {
  const { email, password, firstName, lastName, category } = req.body;
  if (!email || !password || !firstName || !lastName || !category) {
    return res.status(400).json({ message: "Please fill form appropriately" });
  }

  try {
    const userSearchResult = await User.findOne({ email: email });
    if (userSearchResult) {
      return res.status(400).json({ message: "User already exists" });
    }
    const hashed = await hashPassword(password);
    const UserId = uuidv4();
    const newUser = new User({
      email,
      password: hashed,
      userId: UserId,
      firstName,
      lastName,
      category,
    });
    const result = await newUser.save();
    console.log(result);
    return res.status(201).json({ message: "user created successfully" });
    
  } catch (error) {
    console.error("Error creating user:", error);
    return res.status(500).json({ message: "Error creating user" });
  }
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res
      .status(403)
      .json({ message: "Please enter your login details properly" });
  }

  try {
    const knownUserDetails = await User.findOne({ email: email});
    if (!knownUserDetails) {
      return res.status(404).json({ message: "User not found" });
    }
    const userDetailsObj = knownUserDetails.toObject();
    console.log({ userDetailsObj });

    const validated = await bcrypt.compare(password, userDetailsObj.password);
    if (validated) {
      const { password, ...userWithoutPasswords } = userDetailsObj;
      return res.status(200).json({
        message: "Login successful",
        data: userWithoutPasswords,
        token: generateToken(userDetailsObj.userId),
      });
    } else {
      return res.status(401).json({ message: "Invalid login details" });
    }
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export { registerUser, loginUser };
