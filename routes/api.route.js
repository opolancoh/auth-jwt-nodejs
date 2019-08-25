const express = require('express');
const router = express.Router();

const userController = require('../api/user/user.controller');

router.use('/users', userController);

module.exports = router;