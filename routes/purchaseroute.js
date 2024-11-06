const express = require('express');
const router = express.Router();
const {validateMandiPurchase,validateBrokerPurchase,validateDirectPurchase} = require('../validator/purchaseValidator');
const PurcahseController = require('../controllers/purchasecontroller')
router.post('/Mandi-purchase',validateMandiPurchase,PurcahseController.MandiPurchase)
router.post('/Brocker-Purchase',validateBrokerPurchase,PurcahseController.BrokerPurchase)
router.post('/Direct-Purchase',validateDirectPurchase,PurcahseController.DirectPurchase)
router.get('/AllMandiPurchase',PurcahseController.getAllMandiPurchases);
module.exports = router

