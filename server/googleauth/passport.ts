import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import { User } from "../models/User"; 

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      callbackURL: `${process.env.BASE_URL}/api/auth/google/callback`,
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        let user = await User.findOne({ email: profile.emails![0].value });
        if (!user) {
          user = await User.create({
            name: profile.displayName,
            email: profile.emails![0].value,
            password: Math.random().toString(36).slice(-8), // random password
            phone: 0, // optional placeholder
          });
        }
        done(null, user);
      } catch (err) {
        done(err, undefined);
      }
    }
  )
);

// Optional, if using sessions
passport.serializeUser((user: any, done) => done(null, user._id));
passport.deserializeUser(async (id, done) => {
  const user = await User.findById(id);
  done(null, user);
});

export default passport;
