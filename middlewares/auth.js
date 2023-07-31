const jwt = require('jsonwebtoken');
const { secretKey } = require('../utils/config');
const AuthorizationError = require('../errors/AuthorizationError');
const { AUTHORIZATION_ERROR } = require('../utils/constants');
require('dotenv').config();

module.exports = (req, res, next) => {
  const token = req.cookies.jwt;
  if (!token) {
    return next(new AuthorizationError(AUTHORIZATION_ERROR));
  }
  let payload;
  try {
    payload = jwt.verify(token, secretKey);
  } catch (err) {
    return next(new AuthorizationError(AUTHORIZATION_ERROR));
  }

  req.user = payload;

  return next();
};
