const express = require('express');
const multer = require('multer');
const upload = multer({dest: 'uploads/'});
const router = express.Router();

const {
  createUser,
  update,
  remove,
  getUsersById,
  getAll,
  uploadImageUser
} = require('../controllers/user-controller');

router
  .post('/:id', createUser)
  .put('/:id', update)
  .delete('/:id', remove)
  .get('/:ids', getUsersById)
  .get('/', getAll)
  .post('/image/:id', upload.single('image'), uploadImageUser);

module.exports = router;
