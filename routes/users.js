const express = require('express');
const { validateUpdateUser } = require('../middlewares/validation');

const {
  updateUser,
  getUserMe,
} = require('../controllers/users');

const usersRoutes = express.Router();

//  возвращает информацию о пользователе (email и имя)
usersRoutes.get('/me', getUserMe);

// # обновляет информацию о пользователе (email и имя)
usersRoutes.patch('/me', validateUpdateUser, updateUser);

module.exports = { usersRoutes };
