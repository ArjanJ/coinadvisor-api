const passport = require('passport');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;

const {
  GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET,
  JWT_ISSUER,
  JWT_SECRET,
} = process.env;

const passportConfig = () => {
  const opts = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme('Bearer'),
    secretOrKey: JWT_SECRET,
  };

  passport.use(
    new JwtStrategy(opts, (jwtPayload, done) => {
      return done(null, jwtPayload);
    }),
  );

  passport.use(
    new GoogleStrategy(
      {
        clientID: GOOGLE_CLIENT_ID,
        clientSecret: GOOGLE_CLIENT_SECRET,
        callbackURL: 'http://localhost:8080/api/auth/google/callback',
      },
      (_accessToken, _refreshToken, profile, done) => {
        done(null, profile);
      },
    ),
  );

  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser((id, done) => {});
};

module.exports = passportConfig;
