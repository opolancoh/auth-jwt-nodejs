const express = require('express');
const router = express.Router();

const authController = require('../auth/auth.controller');

router.use('/', authController);

module.exports = router;
