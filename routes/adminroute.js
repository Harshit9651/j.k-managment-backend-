const express = require("express");
const router = express.Router();
const AdminController = require('../controllers/admincontroller')

router.post('/Login',AuthController.login)

module.exports = router;