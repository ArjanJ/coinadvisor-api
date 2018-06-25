const { Router } = require('express');
const passport = require('passport');

const userRouter = Router();

// Just for testing/playing around right now.
userRouter.get(
  '/arjan',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    console.log(req);
    res.status(200).send({ success: true });
  },
);

module.exports = userRouter;
