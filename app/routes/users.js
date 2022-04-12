const express = require('express');
const fileUpload = require('express-fileupload');

const router = express.Router();

const {
  createUser,
  update,
  remove,
  getUsersById,
  getAll
} = require('../controllers/user-controller');

router
  .post(
    '/:id',
    fileUpload({useTempFiles: true, tempFileDir: '../../uploads'}),
    createUser
  )
  .put('/:id', update)
  .delete('/:id', remove)
  .get('/:ids', getUsersById)
  .get('/', getAll);

module.exports = router;
