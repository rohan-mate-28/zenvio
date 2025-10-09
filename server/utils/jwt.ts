// utils/jwt.ts
import jwt from "jsonwebtoken";

export const createJWT = (user: any) => {
  return jwt.sign(
    { id: user._id, email: user.email, role: user.role },
    process.env.JWT_SECRET!,
    { expiresIn: "7d" }
  );
};
