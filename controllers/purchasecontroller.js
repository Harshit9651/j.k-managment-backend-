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
    console.log("the data of mandi purchase is",allMandiPurchases)
    res.status(200).json(allMandiPurchases);
  } catch (error) {
    console.error("Error fetching Mandi purchases:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};


exports.Admin_Updated_MandiPurchase_data = async (req, res) => {
  try {
      console.log("Request received to update Mandi Purchase data");

      const { id, totalPayment, paid, due, paymentStatus } = req.body;
      console.log("the id is ",id)
      console.log("the ttlpayment is ",totalPayment)
      console.log("the paid is ",paid)
      console.log("the due is ",due)
      console.log("the paymentstatus is ",totalPayment)

      // Validate required fields
      if (!id || totalPayment === undefined || paid === undefined || due === undefined || !paymentStatus) {
          return res.status(400).json({ error: "Missing required fields" });
      }


      const updatedMandiPurchase = await MandiPurcahse.findByIdAndUpdate(
          id,
          {
            ttlprice:  totalPayment,
            amountPaid: paid,
            dueamount: due,
            paymentStatus:paymentStatus,
          },
          { new: true } 
      );


      if (!updatedMandiPurchase) {
          return res.status(404).json({ error: "Mandi purchase record not found" });
      }
      console.log("hy the data is updated pleace chekout",updatedMandiPurchase)

      res.status(200).json({ message: "Mandi purchase updated successfully", data: updatedMandiPurchase });
  } catch (error) {
      console.error("Error updating Mandi Purchase data:", error);
      res.status(500).json({ error: "Internal server error" });
  }
};