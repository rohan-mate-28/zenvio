import { Request, Response } from "express";
import { User, IUser } from "../models/User";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

// Utility: Set token cookie
const generateTokenAndSetCookie = (
  userId: string,
  res: Response,
  message: string,
  user: IUser // Use IUser type for better safety
): void => {
  const token = jwt.sign({ id: userId }, process.env.JWT_SECRET!, {
    expiresIn: "7d",
  });

  // Ensure user object is prepared for client response (remove password)
  const userForResponse = user.toObject({ getters: true });
  delete userForResponse.password;


  res
    .status(200)
    .cookie("token", token, {
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    })
    .json({ success: true, message, token, user: userForResponse }); // Return user object excluding password
};

// Register
export const register = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, email, phone, password } = req.body;

    const userexist = await User.findOne({ email });
    if (userexist) {
      res.status(400).json({ message: "User already exists", success: false });
      return;
    }

    // Mongoose pre-save hook handles password hashing
    const user: IUser = await User.create({ name, email, phone, password });

    generateTokenAndSetCookie(user._id.toString(), res,  "Registered successfully", user);
  } catch (err) {
    res.status(500).json({ message: "Registration failed", success: false });
  }
};

// Login
export const login = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body;

    // Must select password explicitly since it's hidden in the schema
    const user: IUser | null = await User.findOne({ email }).select("+password");
    if (!user) {
      res.status(401).json({ message: "Incorrect email", success: false });
      return;
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      res.status(401).json({ message: "Invalid password", success: false });
      return;
    }

    generateTokenAndSetCookie(user._id.toString(), res, "Logged in successfully", user);
  } catch (err) {
    res.status(500).json({ message: "Login failed", success: false });
  }
};

// Logout
export const logout = async (req: Request, res: Response): Promise<void> => {
  try {
    res
      .status(200)
      .cookie("token", "", {
        httpOnly: true,
        expires: new Date(0),
      })
      .json({ success: true, message: "Logged out successfully" });
  } catch (err) {
    res.status(500).json({ message: "Logout failed", success: false });
  }
};

// Update profile
export const updateprofile = async (req: Request, res: Response): Promise<void> => {
  try {
    const user = req.user as IUser;
    const { name, email, phone, password } = req.body;

    if (name) user.name = name;
    if (email) user.email = email;
    if (phone) user.phone = phone;
    if (password) user.password = password;


    await user.save();

    res.status(200).json({ message: "Profile updated", success: true });
  } catch (err) {
    res.status(500).json({ message: "Failed to update profile", success: false });
  }
};


export const getCurrentUser = async (req: Request, res: Response): Promise<void> => {
  try {
    // Check query parameter, Authorization header, or cookie
    const token = req.query.token || req.headers.authorization?.split(" ")[1] || req.cookies.token;

    if (!token || typeof token !== "string") {
      res.status(401).json({ message: "No token provided" });
      return;
    }

    const decoded: any = jwt.verify(token, process.env.JWT_SECRET!);
    // Find user, but exclude the password field
    const user = await User.findById(decoded.id).select("-password");
    if (!user) {
      res.status(404).json({ message: "User not found" });
      return;
    }

    // If token was passed via query/header, we need to ensure the client gets the user object
    res.status(200).json({ user });
  } catch (err: any) {
    console.error(err);
    res.status(401).json({ message: "Invalid token" });
  }
};
