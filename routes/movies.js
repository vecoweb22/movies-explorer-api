const movieRouter = require('express').Router();
const {
  getAllMovies,
  createMovie,
  deleteMovie,
} = require('../controllers/movies');
const {
  validCreateMovie,
  validMovieById,
} = require('../middlewares/validationMovie');

movieRouter.get('/', getAllMovies);
movieRouter.post('/', validCreateMovie, createMovie);
movieRouter.delete('/:movieId', validMovieById, deleteMovie);

module.exports = { movieRouter };
