const Movies = require('../models/movie');
const { OK, CREATE } = require('../utils/constans');
const NotFoundError = require('../errors/not-found-err');
const BadRequestError = require('../errors/bad-request-err');
const ForbiddenError = require('../errors/forbidden-err');

module.exports.getMovies = (req, res, next) => {
  Movies.find({ owner: req.user._id })
    .then((movies) => res.status(OK).send(movies))
    .catch((err) => {
      if (err.name === 'CastError') {
        throw new BadRequestError(
          'Переданы некорректные данные при создании фильма',
        );
      } else {
        next(err);
      }
    });
};

module.exports.createMovies = (req, res, next) => {
  const {
    country, director, duration, year, description, image, trailerLink, nameRU, nameEN, thumbnail, movieId,
  } = req.body;
  const owner = req.user._id;

  Movies.create({
    country, director, duration, year, description, image, trailerLink, nameRU, nameEN, thumbnail, movieId, owner,
  })
    .then((movie) => res.status(CREATE).send(movie))
    .catch((err) => {
      if (err.name === 'CastError' || err.name === 'ValidationError') {
        return next(new BadRequestError(
          'Переданы некорректные данные при создании фильма',
        ));
      }
      return next(err);
    });
};

module.exports.deleteMovies = (req, res, next) => {
  Movies.findById(req.params._id)
    .then((movie) => {
      if (!movie) {
        throw new NotFoundError('Фильм с указанным _id не найден.');
      }
      if (String(movie.owner) !== String(req.user._id)) {
        throw new ForbiddenError('Недостаточно прав');
      }
      return Movies.findByIdAndRemove(req.params._id);
    })
    .then((movie) => res.status(OK).send(movie))
    .catch(next);
};
