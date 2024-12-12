const express = require('express');
const router = express.Router();
const {validateMandiPurchase,validateBrokerPurchase,validateDirectPurchase} = require('../validator/purchaseValidator');
const PurcahseController = require('../controllers/purchasecontroller')
const { authenticateToken } = require("../middleware/auth");
router.post('/Mandi-purchase',validateMandiPurchase,PurcahseController.MandiPurchase)
router.post('/Brocker-Purchase',validateBrokerPurchase,PurcahseController.BrokerPurchase)
router.post('/Direct-Purchase',validateDirectPurchase,PurcahseController.DirectPurchase)
router.post('/updateMandiPurchasedata',PurcahseController.Admin_Updated_MandiPurchase_data)
router.post('/updateBrockerPurchasedata',PurcahseController.Admin_Updated_BrockerPurchase_data)
router.post('/updateDirectPurchasedata',PurcahseController.Admin_Updated_directPurchase_data)
router.post('/SuspanceData',PurcahseController.SuspanceData)
router.get('/AllMandiPurchase',PurcahseController.getAllMandiPurchases);
router.get('/AllBrockerPurchase',PurcahseController.getAllBrockerPurchases)
router.get('/AllDirectPurchase',PurcahseController.getAllDirectPurchases)
router.get('/AllSuspanceData', authenticateToken, PurcahseController.All_Suspance_data );


module.exports = router

