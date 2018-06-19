const { Router } = require('express');
const path = require('path');

const router = Router();
const authRouter = require('./auth');

router.use('/auth', authRouter);

module.exports = router;
