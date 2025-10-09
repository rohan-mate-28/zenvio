import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { User, IUser } from "../models/User";

// This declaration is necessary to correctly augment the Express Request object
// with your Mongoose user type (IUser).
declare global {
  namespace Express {
    interface Request {
      user?: IUser;
    }
  }
}

export const isAunthicated = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  // 1. Find the token in one of three locations: Header, Query, or Cookie.
  let token: string | undefined;

  // Priority A: Check Authorization Header (Bearer token from frontend OAuth validation)
  const authHeader = req.headers.authorization;
  if (authHeader && authHeader.startsWith('Bearer ')) {
    token = authHeader.split(' ')[1];
  }

  // Priority B: Check Query Parameter (Used by direct redirects/Postman tests)
  if (!token && req.query.token) {
    token = req.query.token as string;
  }

  // Priority C: Check HTTP-only Cookie (Standard login flow)
  if (!token && req.cookies.token) {
    token = req.cookies.token;
  }


  if (!token) {
    res.status(401).json({ message: "Authentication required (No token found)", success: false });
    return;
  }

  try {
    // Verify the token payload to get the user ID
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { id: string };

    // Look up the user in the database
    const user = await User.findById(decoded.id).select("+role");

    if (!user) {
      res.status(401).json({ message: "User not found or token invalid", success: false });
      return;
    }

    req.user = user;
    next();
  } catch (err) {
    res.status(401).json({ message: "Invalid or expired token", success: false });
  }
};

export const isAdmin = (req: Request, res: Response, next: NextFunction) => {
  const user = req.user as IUser;

  if (user.role !== "admin") {
      res.status(403).json({
      message: "Admin access only",
      success: false,
    });
  }

  console.log("Current user role:", user.role);
  next();
};
