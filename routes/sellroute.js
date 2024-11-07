const express = require("express");
const router = express.Router();
const SellController = require("../controllers/sellController");
router.post("/SellData", SellController.createOrder);
router.get("/mustardOilKhata", SellController.getMustardOilKhata);
router.get("/cottonCakeKhata", SellController.getCottonCakeKhata);
router.get("/rawMustardKhata", SellController.getRawMustardKhata);
router.get("/rawCottonKhata", SellController.getRawCottonKhata);
module.exports = router;
