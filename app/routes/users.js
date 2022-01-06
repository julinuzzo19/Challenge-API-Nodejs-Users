const express = require('express');

const router = express.Router();

const {
  createUser,
  update,
  remove,
  getUsersById
} = require('../controllers/user-controller');

router
  .post('/', createUser)
  .put('/:id', update)
  .delete('/:id', remove)
  .get('/:ids', getUsersById);

module.exports = router;
