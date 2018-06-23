const { Router } = require('express');
const passport = require('passport');
const jwt = require('jsonwebtoken');

const buildProfile = require('../utils/buildProfile');

const { JWT_SECRET } = process.env;

const authRouter = Router();

authRouter.get(
  '/google',
  passport.authenticate('google', {
    scope: ['profile', 'email'],
  }),
);

authRouter.get(
  '/google/callback',
  passport.authenticate('google', { failureRedirect: '/login' }),
  (req, res) => {
    // Strip out uneeded fields to reduce token size.
    const profile = buildProfile(req.user);
    // 1 week from now.
    const expiresIn = 86400 * 7;
    const token = jwt.sign(profile, JWT_SECRET, {
      expiresIn,
    });
    res.cookie('SID', token).redirect('/');
  },
);

module.exports = authRouter;
