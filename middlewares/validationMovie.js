const { Joi, celebrate } = require('celebrate');
const { URL_REG_EXP, URL_ERROR } = require('../utils/constants');

module.exports.validMovieById = celebrate({
  params: Joi.object()
    .keys({
      movieId: Joi.string().hex().required().length(24),
    }),
});

module.exports.validCreateMovie = celebrate({
  body: Joi.object()
    .keys({
      country: Joi.string().required(),
      director: Joi.string().required(),
      duration: Joi.number().required(),
      year: Joi.string().required(),
      description: Joi.string().required(),
      image: Joi.string().required().pattern(URL_REG_EXP).message(URL_ERROR),
      trailerLink: Joi.string().required().pattern(URL_REG_EXP).message(URL_ERROR),
      thumbnail: Joi.string().required().pattern(URL_REG_EXP).message(URL_ERROR),
      movieId: Joi.number().required(),
      nameRU: Joi.string().required(),
      nameEN: Joi.string().required(),
    }),
});
