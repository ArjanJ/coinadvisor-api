const { Router } = require('express');
const passport = require('passport');
const path = require('path');

const router = Router();
const authRouter = require('./auth');
const userRouter = require('./user');

router.use('/api/auth', authRouter);
router.use('/api/user', userRouter);

module.exports = router;
