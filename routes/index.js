const express = require('express');
const { createUser, login } = require('../controllers/users');
const { validateCreateUser, validateLoginUser } = require('../middlewares/validation');
const { usersRoutes } = require('./users');
const { moviesRoutes } = require('./movies');
const auth = require('../middlewares/auth');
const NotFoundError = require('../errors/not-found-err');

const routes = express.Router();

routes.use('/signup', validateCreateUser, createUser);
routes.use('/signin', validateLoginUser, login);

routes.use(auth);
routes.use('/users', usersRoutes);
routes.use('/movies', moviesRoutes);
routes.use('/*', (req, res, next) => next(
  new NotFoundError('Страница не найдена.'),
));

module.exports = {
  routes,
};
