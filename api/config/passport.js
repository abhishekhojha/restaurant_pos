const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const User = require("../models/User");

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
      callbackURL: process.env.CallbackURL || "/auth/google/callback",
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        const email = profile.emails[0].value;

        let user = await User.findOne({ email });

        if (user) {
          // ✅ User exists (local or google) — merge if needed
          if (user.authProvider !== "google") {
            // Upgrade to google login
            user.authProvider = "google";
            user.googleId = profile.id;
            user.avatar = profile.photos?.[0]?.value || user.avatar;
            await user.save();
          } else if (!user.googleId) {
            // Existing google login but no googleId stored
            user.googleId = profile.id;
            await user.save();
          }

          return done(null, user);
        }

        // ❌ No user — create new one
        const newUser = new User({
          email,
          name: profile.displayName,
          avatar: profile.photos?.[0]?.value,
          authProvider: "google",
          googleId: profile.id,
        });
        await newUser.save();

        return done(null, newUser);
      } catch (err) {
        return done(err, null);
      }
    }
  )
);
