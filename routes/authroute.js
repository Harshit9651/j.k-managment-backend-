const express = require("express");
const router = express.Router();
const AuthController = require('../controllers/authcontroller')

router.post('/Login',AuthController.login)

module.exports = router;