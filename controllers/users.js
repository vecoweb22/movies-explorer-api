const User = require('../models/user');
const NotFoundError = require('../errors/NotFoundError');
const RegisterError = require('../errors/RegisterError');
const { USER_ERROR, EMAIL_ERROR } = require('../utils/constants');

module.exports.getFindUser = (req, res, next) => {
  const id = req.user._id;
  User.findById(id)
    .orFail(() => next(new NotFoundError(USER_ERROR)))
    .then((user) => res.send(user))
    .catch(next);
};

module.exports.findUserAndUpdate = (req, res, next) => {
  const id = req.user._id;
  const { name, email } = req.body;

  User.findByIdAndUpdate(id, { name, email }, { new: true, runValidators: true })
    .orFail(() => next(new NotFoundError(USER_ERROR)))
    .then((user) => res.send(user))
    .catch((err) => {
      if (err.code === 11000) {
        next(new RegisterError(EMAIL_ERROR));
      }
      next(err);
    });
};
