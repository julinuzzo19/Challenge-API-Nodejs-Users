const express = require('express');

const router = express.Router();

const {createUser, update} = require('../controllers/user-controller');

router.post('/', createUser);
router.put('/:id', update);

module.exports = router;
