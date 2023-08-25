const errorsHandler = (err, req, res, next) => {
  const { statusCode, message } = err;
  if (!err.statusCode) {
    res.status(statusCode).send({
      // проверяем статус и выставляем сообщение в зависимости от него
      message: statusCode === 500 ? 'На сервере произошла ошибка' : message,
    });
  }
  res.status(err.statusCode).send({ message: err.message });

  next();
};

module.exports = errorsHandler;
