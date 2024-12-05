const MandiPurchase = require("../models/mandipurchaseModel");
const BrokerPurchase = require("../models/brokerpurchaseModel");
const DirectPurchase = require("../models/directpurchaseModel");
const MustardOilKhata = require("../models/mustardOilKahataModel");
const RowMustardOilKhata = require("../models/rowMustardKhataModel");
const CottonCake = require("../models/cuttonCakeKhataModel");
const RowCottonCake = require("../models/rowCuttonKhataModel");
const SuspenseData = require("../models/suspanceModel");



exports.fetchdata = async (req, res) => {
    const { category, startDate, endDate } = req.body;
  
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
          data = await MandiPurchase.find({
            createdAt: { $gte: new Date(startDate), $lte: new Date(endDate) },
          });
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
  
