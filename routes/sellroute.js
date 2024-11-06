const express = require('express');
const router = express.Router();
const SellController = require('../controllers/sellController')
router.post('/SellData',SellController.createOrder)

module.exports = router

