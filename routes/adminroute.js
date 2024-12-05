const express = require("express");
const router = express.Router();
const AdminController = require('../controllers/admincontroller')
router.post('/AdminFetchData',AdminController.fetchdata)

module.exports = router;