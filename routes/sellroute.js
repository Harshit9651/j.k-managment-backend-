const express = require("express");
const router = express.Router();
const SellController = require("../controllers/sellController");
router.post("/SellData", SellController.createOrder);

router.get("/mustardOilKhata", SellController.getMustardOilKhata);
router.get("/cottonCakeKhata", SellController.getCottonCakeKhata);
router.get("/rawMustardKhata", SellController.getRawMustardKhata);
router.get("/rawCottonKhata", SellController.getRawCottonKhata);
router.get("/customerOrders/:customerId/:productType",SellController.FetchCustomer)


router.delete("/rawMustardKhata/:customerId", SellController.deleteCustomer_RowOfMustard);
router.delete("/rowofCuttonkhata/:customerId", SellController.deleteCustomer_RowOfCutton);
router.delete("/Cuttonkhata/:customerId", SellController.deleteCustomer_CuttonCakeKhata);
router.delete("/MustardOilKhata/:customerId", SellController.deleteCustomer_MustardOil);


router.put('/customerpayment/:customerId/:productType',SellController.updatePaymentStatus );



module.exports = router;
