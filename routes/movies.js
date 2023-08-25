const express = require('express');
const { validateCreateMovies, validateDeleteMovies } = require('../middlewares/validation');

const {
  getMovies, createMovies, deleteMovies,
} = require('../controllers/movies');

const moviesRoutes = express.Router();

moviesRoutes.get('/', getMovies);
moviesRoutes.post('/', validateCreateMovies, createMovies);

moviesRoutes.delete('/:_id', validateDeleteMovies, deleteMovies);

module.exports = { moviesRoutes };
