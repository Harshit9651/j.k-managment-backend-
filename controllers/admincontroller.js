const MandiPurchase = require("../models/mandipurchaseModel");
const BrokerPurchase = require("../models/brokerpurchaseModel");
const DirectPurchase = require("../models/directpurchaseModel");
const MustardOilKhata = require("../models/mustardOilKahataModel");
const RowMustardOilKhata = require("../models/rowMustardKhataModel");
const CottonCake = require("../models/cuttonCakeKhataModel");
const RowCottonCake = require("../models/rowCuttonKhataModel");
const SuspenseData = require("../models/suspanceModel");

exports.ResetFactoryData = async (req, res) => {
  try {
   

    const models = [
      MandiPurchase,
      BrokerPurchase,
      DirectPurchase,
      MustardOilKhata,
      RowMustardOilKhata,
      CottonCake,
      RowCottonCake,
      SuspenseData
    ];

 
    const resetPromises = models.map((model) => model.deleteMany({}));

  
    await Promise.all(resetPromises);

 
    res.status(200).json({ message: "Factory data has been reset successfully." });
  } catch (error) {
   
    console.error("Error resetting factory data:", error);
    res.status(500).json({ error: "An error occurred while resetting factory data." });
  }
};



exports.ResetPurchaseData = async (req, res) => {
  try {
    await Promise.all([
      MandiPurchase.deleteMany({}),
      BrokerPurchase.deleteMany({}),
      DirectPurchase.deleteMany({})
    ]);
    res.status(200).json({ message: "Purchase data has been reset successfully." });
  } catch (error) {
    console.error("Error resetting purchase data:", error);
    res.status(500).json({ error: "An error occurred while resetting purchase data." });
  }
};

exports.ResetKhataData = async (req, res) => {
  try {
    await Promise.all([
      MustardOilKhata.deleteMany({}),
      RowMustardOilKhata.deleteMany({}),
      CottonCake.deleteMany({}),
      RowCottonCake.deleteMany({})
    ]);
    res.status(200).json({ message: "Khata data has been reset successfully." });
  } catch (error) {
    console.error("Error resetting khata data:", error);
    res.status(500).json({ error: "An error occurred while resetting khata data." });
  }
};

exports.ResetSuspenseData = async (req, res) => {
  try {
    await SuspenseData.deleteMany({});
    res.status(200).json({ message: "Suspense data has been reset successfully." });
  } catch (error) {
    console.error("Error resetting suspense data:", error);
    res.status(500).json({ error: "An error occurred while resetting suspense data." });
  }
};

exports.fetchdata = async (req, res) => {
    console.log('teri bhn da fudaa maru')
    const { category, startDate, endDate } = req.body;
  console.log(category, startDate, endDate)
    if (!category || !startDate || !endDate) {
      return res.status(400).json({
        success: false,
        message: "Category, start date, and end date are required.",
      });
    }
  
    try {
      let data = [];
  
      // Use switch to handle different categories
      switch (category) {
        case "mandiPurchase":
            console.log('hello')
          data = await MandiPurchase.find({

            createdAt: { $gte: new Date(startDate), $lte: new Date(endDate) },
          });
          console.log(data)
          break;
  
        case "brokerPurchase":
          data = await BrokerPurchase.find({
            createdAt: { $gte: new Date(startDate), $lte: new Date(endDate) },
          });
          break;
  
        case "directPurchase":
          data = await DirectPurchase.find({
            createdAt: { $gte: new Date(startDate), $lte: new Date(endDate) },
          });
          break;
  
        case "mustardOilKhata":
          data = await MustardOilKhata.find({
            createdAt: { $gte: new Date(startDate), $lte: new Date(endDate) },
          });
          break;
  
        case "rowMustardOilKhata":
          data = await RowMustardOilKhata.find({
            createdAt: { $gte: new Date(startDate), $lte: new Date(endDate) },
          });
          break;
  
        case "cottonCake":
          data = await CottonCake.find({
            createdAt: { $gte: new Date(startDate), $lte: new Date(endDate) },
          });
          break;
  
        case "rowCottonCake":
          data = await RowCottonCake.find({
            createdAt: { $gte: new Date(startDate), $lte: new Date(endDate) },
          });
          break;
  
        case "suspenseData":
          data = await SuspenseData.find({
            createdAt: { $gte: new Date(startDate), $lte: new Date(endDate) },
          });
          break;
  
        default:
          return res.status(400).json({
            success: false,
            message: "Invalid category provided.",
          });
      }
  
      res.status(200).json({
        success: true,
        data,
      });
    } catch (error) {
      console.error("Error fetching data:", error);
      res.status(500).json({
        success: false,
        message: "Failed to fetch data.",
      });
    }
  }
  
