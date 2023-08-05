require('dotenv').config();
const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const { secretKey } = require('../utils/config');
const BadRequestError = require('../errors/BadRequestError');
const RegisterError = require('../errors/RegisterError');

const {
  BAD_REQUEST,
  EMAIL_ERROR,
  LOGOUT_SUCCESS,
} = require('../utils/constants');

module.exports.createUser = (req, res, next) => {
  const { email, password, name } = req.body;

  bcrypt.hash(password, 10)
    .then((hash) => {
      User.create({ email, password: hash, name })
        .then((user) => {
          res.status(201).send({
            email: user.email,
            name: user.name,
          });
        })
        .catch((err) => {
          if (err.code === 11000) {
            next(new RegisterError(EMAIL_ERROR));
          } else if (err instanceof mongoose.Error.ValidationError) {
            next(new BadRequestError(BAD_REQUEST));
          } else {
            next(err);
          }
        });
    });
};

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;

  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user.id }, secretKey, { expiresIn: '7d' });
      res
        .cookie('jwt', token, {
          maxAge: 3600000 * 24 * 7,
          sameSite: 'none',
          httpOnly: true,
          secure: true,
        })
        .send({ token });
    })
    .catch(next);
};

module.exports.logout = (req, res) => {
  res.clearCookie('jwt');
  res.status(200).send({ message: LOGOUT_SUCCESS });
  res.end();
};
