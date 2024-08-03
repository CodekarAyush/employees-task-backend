const express = require('express');
const { userSignup, userLogin } = require('../controller/auth.controller');
const router = express.Router();
require('dotenv').config();

router.post('/register', userSignup);
router.post('/login', userLogin);

module.exports = router
