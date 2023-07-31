const Movie = require('../models/movie');
const ForbiddenError = require('../errors/ForbiddenError');
const NotFoundError = require('../errors/NotFoundError');

const {
  MOVIE_ERROR,
  DELETE_MOVIE_ERROR,
} = require('../utils/constants');

module.exports.getAllMovies = (req, res, next) => {
  const owner = req.user._id;

  Movie.find({ owner })
    .then((result) => {
      res.send(result);
    })
    .catch(() => {
      throw new NotFoundError(MOVIE_ERROR);
    })
    .catch(next);
};

module.exports.createMovie = (req, res, next) => {
  const {
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    thumbnail,
    movieId,
    nameRU,
    nameEN,
  } = req.body;

  const movieOwner = req.user;

  Movie.create({
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    thumbnail,
    owner: movieOwner,
    movieId,
    nameRU,
    nameEN,
  })
    .then((movie) => {
      movie
        .populate('owner')
        .then((movieInfo) => res.status(201).send(movieInfo))
        .catch(next);
    })
    .catch(next);
};

module.exports.deleteMovie = (req, res, next) => {
  Movie.findById(req.params.movieId)
    .orFail(() => next(new NotFoundError(MOVIE_ERROR)))
    .then((movie) => {
      if (req.user._id !== movie.owner.toString()) {
        throw new ForbiddenError(DELETE_MOVIE_ERROR);
      }
      movie
        .deleteOne()
        .then(() => res.send(movie))
        .catch(next);
    })
    .catch(next);
};
