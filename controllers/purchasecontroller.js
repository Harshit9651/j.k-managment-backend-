const MandiPurcahse = require("../models/mandipurchaseModel");
const BrokerPurchase = require("../models/brokerpurchaseModel");
const DirectPurchase = require("../models/directpurchaseModel")
const mongoose = require("mongoose");
exports.MandiPurchase = async (req, res) => {
  try {
    const purchaseData = req.body;

    const receiptNumber = `BILL-${Date.now()}-${Math.floor(
      Math.random() * 1000
    )}`;
    const dueAmountp = purchaseData.totalPayment - purchaseData.paidAmount;
    console.log(dueAmountp);
    console.log(purchaseData.paidAmount);
    console.log(purchaseData.totalPayment);
    const newPurchase = new MandiPurcahse({
      DelarName: purchaseData.DelarName,
      itemType: purchaseData.itemType,
      weight: purchaseData.weight,
      quantity: purchaseData.quantity,
      pricePerUnit: purchaseData.pricePerUnit,
      purchaseDate: purchaseData.purchaseDate,
      less: purchaseData.less || 0,
      add: purchaseData.add || 0,
      receiptNumber: receiptNumber,
      amountPaid: purchaseData.paidAmount || 0,
      // totalPrice: purchaseData.totalPayment,
      ttlprice: purchaseData.totalPayment,
      dueamount: dueAmountp,
      paymentStatus: purchaseData.paymentStatus || "Unpaid",
      Dhami: purchaseData.dami || 2.5,
      pal: purchaseData.pal || 4,
    });

    const savePurcaheData = await newPurchase.save();
    console.log(savePurcaheData);
    return res.status(201).json({
      success: true,
      message: "Purchase saved successfully!",
      data: newPurchase,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Error saving purchase",
      error: error.message,
    });
  }
};

exports.BrokerPurchase = async (req, res) => {
  try {
    const purchaseData = req.body;

    // Generate a unique bill number
    const billNumber = `BILL-${Date.now()}-${Math.floor(Math.random() * 1000)}`;

    const dueAmount = purchaseData.totalPayment - purchaseData.paidAmount;
console.log(purchaseData.dueAmount ,"due amount")
console.log(purchaseData.totalPrice)
 

    const newBrokerPurchase = new BrokerPurchase({
      itemType: purchaseData.itemType,
      quantity: purchaseData.quantity,
      weight: purchaseData.weight,
      add: purchaseData.add || 0,
      less: purchaseData.less || 0,
      pricePerUnit: purchaseData.pricePerUnit,
      ttlprice: purchaseData.totalPayment,
      amountPaid: purchaseData.paidAmount || 0,
      DAmount:dueAmount,
      brokerName: purchaseData.brokerName,
      brokerCommission: purchaseData. brokeragePercentage,
      billNumber: billNumber,
      paymentStatus: purchaseData.paymentStatus || "Unpaid",
      purchaseDate: purchaseData.purchaseDate || Date.now(),
    });

    const savedBrokerPurchase = await newBrokerPurchase.save();
    console.log(savedBrokerPurchase);

    return res.status(201).json({
      success: true,
      message: "Broker purchase saved successfully!",
      data: savedBrokerPurchase,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Error saving broker purchase",
      error: error.message,
    });
  }
};


exports.DirectPurchase = async (req, res) => {
  try {
    const purchaseData = req.body;

    
    const billNumber = `BILL-${Date.now()}-${Math.floor(Math.random() * 1000)}`;

    const dueAmount = purchaseData.totalPayment - purchaseData.paidAmount;
    console.log(`total amount is ${purchaseData. totalPayment}`)
    console.log(`paid amount is ${purchaseData.paidAmount}`)
console.log(dueAmount)

    const newDirectPurchase = new DirectPurchase({
      dealerName: purchaseData.dealerName,
      itemType: purchaseData.itemType,
      quantity: purchaseData.quantity,
      weight: purchaseData.weight,
      add: purchaseData.add || 0,
      less: purchaseData.less || 0,
      pricePerUnit: purchaseData.pricePerUnit,
      ttlprice: purchaseData.totalPayment ,
      amountPaid: purchaseData.paidAmount || 0,
      DAmount: purchaseData.dueAmount,
      billNumber: billNumber,
      paymentStatus: purchaseData.paymentStatus || "Unpaid",
      purchaseDate: purchaseData.purchaseDate || Date.now(),
    });

    const savedDirectPurchase = await newDirectPurchase.save();
    console.log(savedDirectPurchase);

    return res.status(201).json({
      success: true,
      message: "Direct purchase saved successfully!",
      data: savedDirectPurchase,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Error saving direct purchase",
      error: error.message,
    });
  }
};

exports.getAllDirectPurchases = async (req, res) => {
  try {
    const allDirectPurchases = await DirectPurchase.find();
    res.status(200).json(allDirectPurchases);
  } catch (error) {
    console.error("Error fetching direct purchases:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.getAllMandiPurchases = async (req, res) => {
  try {
    const allMandiPurchases = await MandiPurcahse.find();
    res.status(200).json(allMandiPurchases);
  } catch (error) {
    console.error("Error fetching Mandi purchases:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
