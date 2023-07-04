const Movie = require('../models/movie');
const ForbiddenError = require('../errors/ForbiddenError');
const NotFoundError = require('../errors/NotFoundError');
const BadRequestError = require('../errors/BadRequestError');
const {
  MOVIE_ERROR,
  BAD_REQUEST,
  DELETE_MOVIE_ERROR,
} = require('../utils/constants');

module.exports.getAllMovies = (req, res, next) => {
  const currUserId = req.user._id;

  Movie.find({ owner: currUserId })
    .then((movies) => {
      res.send(movies);
    })
    .catch(() => {
      throw new NotFoundError(MOVIE_ERROR);
    })
    .catch(next);
};

module.exports.createMovie = (req, res, next) => {
  Movie.create({ ...req.body, owner: req.user._id })
    .then((movie) => res.status(201).send(movie))
    .catch(next);
};

module.exports.deleteMovie = (req, res, next) => {
  const currUserId = req.user._id;

  Movie.findById(req.params._id)
    .orFail()
    .then((movie) => {
      const ownerId = movie.owner.toString();
      if (ownerId !== currUserId) {
        throw new ForbiddenError(DELETE_MOVIE_ERROR);
      }
      return movie;
    })
    .then((movie) => movie.deleteOne())
    .then((movie) => res.status(200).send(movie))
    .catch((err) => {
      if (err.name === 'DocumentNotFoundError') {
        return next(new NotFoundError(MOVIE_ERROR));
      }
      if (err.name === 'CastError') {
        return next(new BadRequestError(BAD_REQUEST));
      }
      return next(err);
    });
};
