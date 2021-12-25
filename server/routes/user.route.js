const { Router } = require('express');
const passport = require('passport');
const { login, register, confirm } = require('../controllers/user.controller');
const userRouter = Router();

// User router for handling requests from clients
userRouter.post('/login', login);
userRouter.post('/register', register);
userRouter.post('/confirm', confirm);

module.exports = userRouter;