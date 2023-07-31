const routers = require('express').Router();
const { movieRouter } = require('./movies');
const { userRouter } = require('./users');
const auth = require('../middlewares/auth');
const { login, createUser, logout } = require('../controllers/registration');
const { validLogin, validCreateUser } = require('../middlewares/validationUser');

const NotFoundError = require('../errors/NotFoundError');
const { URL_ERROR } = require('../utils/constants');

routers.post('/signup', validCreateUser, createUser);
routers.post('/signin', validLogin, login);
routers.post('/signout', auth, logout);

routers.use('/movies', auth, movieRouter);
routers.use('/users', auth, userRouter);

routers.use(auth, (req, res, next) => {
  next(new NotFoundError(URL_ERROR));
});

module.exports = { routers };
