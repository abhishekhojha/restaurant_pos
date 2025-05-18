const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const User = require("../models/User");

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
      callbackURL: "/auth/google/callback",
    },
    async (accessToken, refreshToken, profile, done) => {
      // 1. find existing user by email
      const email = profile.emails[0].value;
      let user = await User.findOne({ email });

      if (!user) {
        // 2a. new user — create with google provider
        user = new User({
          email,
          name: profile.displayName,
          avatar: profile.photos[0].value,
          providers: [
            {
              name: "google",
              oauthId: profile.id,
            },
          ],
        });
        await user.save();
      } else {
        // 2b. existing user — see if google is already linked
        let googleProv = user.providers.find((p) => p.name === "google");
        if (!googleProv) {
          // link it
          user.providers.push({
            name: "google",
            oauthId: profile.id,
          });
          await user.save();
        }
      }
      return done(null, user);
    }
  )
);
