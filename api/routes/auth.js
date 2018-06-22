const { Router } = require('express');
const passport = require('passport');
const jwt = require('jsonwebtoken');

const { JWT_SECRET } = process.env;

const authRouter = Router();

const buildProfile = user => ({
  displayName: user.displayName,
  emails: user.emails,
  id: user.id,
  name: user.name,
});

authRouter.get(
  '/google',
  passport.authenticate('google', {
    scope: ['https://www.googleapis.com/auth/plus.login'],
  }),
);

authRouter.get(
  '/google/callback',
  passport.authenticate('google', { failureRedirect: '/login' }),
  (req, res) => {
    // Strip out uneeded fields to reduce token size.
    const profile = buildProfile(req.user);
    const token = jwt.sign(profile, JWT_SECRET);
    res.cookie('SID', token).redirect('/');
  },
);

module.exports = authRouter;
