require('dotenv').config();
const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

const { secretKey } = require('../utils/config');
const BadRequestError = require('../errors/BadRequestError');
const RegisterError = require('../errors/RegisterError');
const AuthorizationError = require('../errors/AuthorizationError');
const {
  BAD_REQUEST,
  EMAIL_ERROR,
  LOGOUT_SUCCESS,
  AUTHORIZATION_ERROR,
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

  User.findOne({ email }).select('+password')
    .then((user) => {
      if (!user) {
        return next(new AuthorizationError(AUTHORIZATION_ERROR));
      }

      return bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            return next(new AuthorizationError(AUTHORIZATION_ERROR));
          }

          const token = jwt.sign(
            { _id: user._id },
            secretKey,
            { expiresIn: '7d' },
          );

          res.cookie('jwt', token, {
            maxAge: 7 * 24 * 60 * 60 * 1000,
            httpOnly: true,
            saneSite: true,
          });

          return res.send(user.toJSON({ useProjection: true }));
        });
    })

    .catch(next);
};

module.exports.logout = (req, res) => {
  res.clearCookie('jwt');
  res.status(200).send({ message: LOGOUT_SUCCESS });
  res.end();
};
