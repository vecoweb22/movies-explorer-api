const mongoose = require('mongoose');
const { URL_REG_EXP, URL_ERROR } = require('../utils/constants');

const movieSchema = new mongoose.Schema({
  country: {
    type: String,
    required: true,
  },
  director: {
    type: String,
    required: true,
  },
  duration: {
    type: Number,
    required: true,
  },
  year: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    validate: {
      validator: (image) => URL_REG_EXP.test(image),
      message: URL_ERROR,
    },
    required: true,
  },
  trailerLink: {
    type: String,
    validate: {
      validator: (trailerLink) => URL_REG_EXP.test(trailerLink),
      message: URL_ERROR,
    },
    required: true,
  },
  thumbnail: {
    type: String,
    validate: {
      validator: (trailerLink) => URL_REG_EXP.test(trailerLink),
      message: URL_ERROR,
    },
    required: true,
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
  },
  movieId: {
    type: Number,
    required: true,
  },
  nameRU: {
    type: String,
    required: true,
  },
  nameEN: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model('movie', movieSchema);
