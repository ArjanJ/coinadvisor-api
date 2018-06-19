const { Router } = require('express');

const authRouter = Router();

authRouter.post('/google', (req, res) => res.status(200));

module.exports = authRouter;
