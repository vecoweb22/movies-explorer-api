const userRouter = require('express').Router();
const { getFindUser, findUserAndUpdate } = require('../controllers/users');
const { validUpdateUser } = require('../middlewares/validationUser');

userRouter.get('/me', getFindUser);
userRouter.patch('/me', validUpdateUser, findUserAndUpdate);

module.exports = { userRouter };
