import express from "express";
import passport from "../googleauth/passport"; // import configured passport
import { createJWT } from "../utils/jwt";

const router = express.Router();

router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

router.get(
  "/google/callback",
  passport.authenticate("google", { session: false }),
  (req, res) => {
    // Create JWT
    const token = createJWT(req.user);
    // Redirect to frontend with token
    res.redirect(`${process.env.FRONTEND_URL}/auth/login?token=${token}`);
  }
);

export default router;
