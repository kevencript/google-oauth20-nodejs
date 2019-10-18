const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const { googleClientID, googleClientSecret } = require("../config/keys");

passport.serializeUser((user, done) => {
  done(null, user);
});

//used to deserialize the user from the session
passport.deserializeUser((user, done) => {
  done(null, user);
});

passport.use(
  new GoogleStrategy(
    {
      clientID: googleClientID,
      clientSecret: googleClientSecret,
      callbackURL: "/auth/google/callback",
      proxy: true
    },
    async (accessToken, refreshToken, profile, done) => {
      // getting data from the profile
      const {
        sub,
        name,
        given_name,
        family_name,
        picture,
        email
      } = profile._json;

      const userCreated = {
        googleId: sub,
        nomeCompleto: name,
        nome: given_name,
        sobrenome: family_name,
        email,
        picture
      };

      console.log(userCreated);

      done(null, userCreated);
    }
  )
);
