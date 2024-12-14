const express = require("express");
const router = express.Router();
const AdminController = require('../controllers/admincontroller')
router.post('/AdminFetchData',AdminController.fetchdata)
router.delete('/ResetPurchaseData', AdminController.ResetPurchaseData)
router.delete('/ResetKhataData', AdminController.ResetKhataData)
router.delete('/ResetSuspenseData', AdminController.ResetSuspenseData)
router.delete('/ResetFactoryData', AdminController.ResetFactoryData)

module.exports = router;