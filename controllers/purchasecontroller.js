const MandiPurcahse = require("../models/mandipurchaseModel");
const BrokerPurchase = require("../models/brokerpurchaseModel");
const DirectPurchase = require("../models/directpurchaseModel");
const SuspanceModel = require("../models/suspanceModel")
const mongoose = require("mongoose");
// exports.MandiPurchase = async (req, res) => {
//   try {
//     const purchaseData = req.body;

//     const receiptNumber = `BILL-${Date.now()}-${Math.floor(
//       Math.random() * 1000
//     )}`;
//     const dueAmountp = purchaseData.totalPayment - purchaseData.paidAmount;
//     console.log(dueAmountp);
//     console.log(purchaseData.paidAmount);
//     console.log(purchaseData.totalPayment);
//     console.log(`hy the payments ststus is : ${purchaseData.paymentStatus}`)
//     if (purchaseData.paymentStatus == 'Pending') {
//       purchaseData.paymentStatus = "Partially Paid";
//     }
    
//     const newPurchase = new MandiPurcahse({
//       DelarName: purchaseData.DelarName,
//       itemType: purchaseData.itemType,
//       weight: purchaseData.weight,
//       quantity: purchaseData.quantity,
//       pricePerUnit: purchaseData.pricePerUnit,
//       purchaseDate: purchaseData.purchaseDate,
//       less: purchaseData.less || 0,
//       add: purchaseData.add || 0,
//       receiptNumber: receiptNumber,
//       amountPaid: purchaseData.paidAmount || 0,
//       // totalPrice: purchaseData.totalPayment,
//       ttlprice: purchaseData.totalPayment,
//       dueamount: dueAmountp,
//       pststus:purchaseData.paymentStatus,
//       Dhami: purchaseData.dami || 2.5,
//       pal: purchaseData.pal || 4,
//     });

//     const savePurcaheData = await newPurchase.save();
//     console.log(savePurcaheData);
//     return res.status(201).json({
//       success: true,
//       message: "Purchase saved successfully!",
//       data: newPurchase,
//     });
//   } catch (error) {
//     console.error(error);
//     return res.status(500).json({
//       success: false,
//       message: "Error saving purchase",
//       error: error.message,
//     });
//   }
// };
exports.MandiPurchase = async (req, res) => {
  try {
    const purchaseData = req.body;

    // Generate receipt number
    const receiptNumber = `BILL-${Date.now()}-${Math.floor(
      Math.random() * 1000
    )}`;

    // Parse payment values and calculate due amount
    const totalPayment = parseFloat(purchaseData.totalPayment || 0);
    let paidAmount = parseFloat(purchaseData.paidAmount || 0);
    let dueAmount = totalPayment - paidAmount;

    // Adjust values based on payment status
    let paymentStatus = purchaseData.paymentStatus || "Unpaid";

    if (paymentStatus === "Unpaid") {
      paidAmount = 0;
      dueAmount = totalPayment;
    } else if (paymentStatus === "Pending") {
      paymentStatus = "Partially Paid";
    } else if (paidAmount >= totalPayment) {
      paymentStatus = "Paid";
      dueAmount = 0;
    }

    // Create new purchase document
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
      amountPaid: paidAmount,
      ttlprice: totalPayment,
      dueamount: dueAmount,
      paymentStatus:paymentStatus,
      Dhami: purchaseData.Dhami || 2.5,
      pal: purchaseData.pal || 4,
    });

    // Save to database
    const savePurchaseData = await newPurchase.save();
    console.log(savePurchaseData);

    return res.status(201).json({
      success: true,
      message: "Purchase saved successfully!",
      data: savePurchaseData,
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

// exports.BrokerPurchase = async (req, res) => {
//   try {
//     const purchaseData = req.body;

//     // Generate a unique bill number
//     const billNumber = `BILL-${Date.now()}-${Math.floor(Math.random() * 1000)}`;

//     const dueAmount = purchaseData.totalPayment - purchaseData.paidAmount;
// console.log(purchaseData.dueAmount ,"due amount")
// console.log(purchaseData.totalPrice)
// if (purchaseData.paymentStatus == 'Pending') {
//   purchaseData.paymentStatus = "Partially Paid";
// }



//     const newBrokerPurchase = new BrokerPurchase({
//       itemType: purchaseData.itemType,
//       quantity: purchaseData.quantity,
//       weight: purchaseData.weight,
//       add: purchaseData.add || 0,
//       less: purchaseData.less || 0,
//       pricePerUnit: purchaseData.pricePerUnit,
//       ttlprice: purchaseData.totalPayment,
//       amountPaid: purchaseData.paidAmount || 0,
//       DAmount:dueAmount,
//       brokerName: purchaseData.brokerName,
//       brokerCommission: purchaseData. brokeragePercentage,
//       billNumber: billNumber,
//       pststus: paymentStatus,
//       purchaseDate: purchaseData.purchaseDate || Date.now(),
//     });

//     const savedBrokerPurchase = await newBrokerPurchase.save();
//     console.log(savedBrokerPurchase);

//     return res.status(201).json({
//       success: true,
//       message: "Broker purchase saved successfully!",
//       data: savedBrokerPurchase,
//     });
//   } catch (error) {
//     console.error(error);
//     return res.status(500).json({
//       success: false,
//       message: "Error saving broker purchase",
//       error: error.message,
//     });
//   }
// };


// exports.DirectPurchase = async (req, res) => {
//   try {
//     const purchaseData = req.body;

    
//     const billNumber = `BILL-${Date.now()}-${Math.floor(Math.random() * 1000)}`;

//     const dueAmount = purchaseData.totalPayment - purchaseData.paidAmount;
//     console.log(`total amount is ${purchaseData. totalPayment}`)
//     console.log(`paid amount is ${purchaseData.paidAmount}`)
// console.log(dueAmount)
// if (purchaseData.paymentStatus == 'Pending') {
//   purchaseData.paymentStatus = "Partially Paid";
// }



//     const newDirectPurchase = new DirectPurchase({
//       dealerName: purchaseData.dealerName,
//       itemType: purchaseData.itemType,
//       quantity: purchaseData.quantity,
//       weight: purchaseData.weight,
//       add: purchaseData.add || 0,
//       less: purchaseData.less || 0,
//       pricePerUnit: purchaseData.pricePerUnit,
//       ttlprice: purchaseData.totalPayment ,
//       amountPaid: purchaseData.paidAmount || 0,
//       DAmount: purchaseData.dueAmount,
//       billNumber: billNumber,
//       pststus: paymentStatus,
//       purchaseDate: purchaseData.purchaseDate || Date.now(),
//     });

//     const savedDirectPurchase = await newDirectPurchase.save();
//     console.log(savedDirectPurchase);

//     return res.status(201).json({
//       success: true,
//       message: "Direct purchase saved successfully!",
//       data: savedDirectPurchase,
//     });
//   } catch (error) {
//     console.error(error);
//     return res.status(500).json({
//       success: false,
//       message: "Error saving direct purchase",
//       error: error.message,
//     });
//   }
// };



exports.BrokerPurchase = async (req, res) => {
  try {
    const purchaseData = req.body;

    // Generate a unique bill number
    const billNumber = `BILL-${Date.now()}-${Math.floor(Math.random() * 1000)}`;

    // Parse payment values and calculate due amount
    const totalPayment = parseFloat(purchaseData.totalPayment || 0);
    let paidAmount = parseFloat(purchaseData.paidAmount || 0);
    let dueAmount = totalPayment - paidAmount;

    // Adjust values based on payment status
    let paymentStatus = purchaseData.paymentStatus || "Unpaid";

    if (paymentStatus === "Unpaid") {
      paidAmount = 0;
      dueAmount = totalPayment;
    } else if (paymentStatus === "Pending") {
      paymentStatus = "Partially Paid";
    } else if (paidAmount >= totalPayment) {
      paymentStatus = "Paid";
      dueAmount = 0;
    }

    // Create new broker purchase document
    const newBrokerPurchase = new BrokerPurchase({
      itemType: purchaseData.itemType,
      quantity: purchaseData.quantity,
      weight: purchaseData.weight,
      add: purchaseData.add || 0,
      less: purchaseData.less || 0,
      pricePerUnit: purchaseData.pricePerUnit,
      ttlprice: totalPayment,
      amountPaid: paidAmount,
      DAmount: dueAmount,
      brokerName: purchaseData.brokerName,
      brokerCommission: purchaseData.brokeragePercentage,
      billNumber: billNumber,
      paymentStatus: paymentStatus,
      purchaseDate: purchaseData.purchaseDate || Date.now(),
    });

    // Save to database
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

    // Generate a unique bill number
    const billNumber = `BILL-${Date.now()}-${Math.floor(Math.random() * 1000)}`;

    // Parse payment values and calculate due amount
    const totalPayment = parseFloat(purchaseData.totalPayment || 0);
    let paidAmount = parseFloat(purchaseData.paidAmount || 0);
    let dueAmount = totalPayment - paidAmount;

    // Adjust values based on payment status
    let paymentStatus = purchaseData.paymentStatus || "Unpaid";

    if (paymentStatus === "Unpaid") {
      paidAmount = 0;
      dueAmount = totalPayment;
    } else if (paymentStatus === "Pending") {
      paymentStatus = "Partially Paid";
    } else if (paidAmount >= totalPayment) {
      paymentStatus = "Paid";
      dueAmount = 0;
    }

    // Create new direct purchase document
    const newDirectPurchase = new DirectPurchase({
      dealerName: purchaseData.dealerName,
      itemType: purchaseData.itemType,
      quantity: purchaseData.quantity,
      weight: purchaseData.weight,
      add: purchaseData.add || 0,
      less: purchaseData.less || 0,
      pricePerUnit: purchaseData.pricePerUnit,
      ttlprice: totalPayment,
      amountPaid: paidAmount,
      DAmount: dueAmount,
      billNumber: billNumber,
      paymentStatus: paymentStatus,
      purchaseDate: purchaseData.purchaseDate || Date.now(),
    });

    // Save to database
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
    console.log(allDirectPurchases)
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

exports.getAllBrockerPurchases = async (req, res) => {
  try {
    const allBrokcerPurchases = await BrokerPurchase.find();
    console.log("all brocker purchase data:",allBrokcerPurchases)
    res.status(200).json( allBrokcerPurchases);
  } catch (error) {
    console.error("Error fetching direct purchases:", error);
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


exports.Admin_Updated_BrockerPurchase_data = async (req, res) => {
  try {
      console.log("Request received to update Brocker Purchase data");

      const { id, totalPayment, paid,  DAmount, paymentStatus } = req.body;
      console.log("the id is ",id)
      console.log("the ttlpayment is ",totalPayment)
      console.log("the paid is ",paid)
      console.log("the due is ", DAmount)
      console.log("the paymentstatus is ",totalPayment)

      // Validate required fields
      if (!id || totalPayment === undefined || paid === undefined ||  DAmount=== undefined || !paymentStatus) {
          return res.status(400).json({ error: "Missing required fields" });
      }


      const updatedBrockerPurchase = await BrokerPurchase.findByIdAndUpdate(
          id,
          {
            ttlprice:  totalPayment,
            amountPaid: paid,
            DAmount:  DAmount,
            paymentStatus:paymentStatus,
          },
          { new: true } 
      );


      if (!updatedBrockerPurchase ) {
          return res.status(404).json({ error: "Mandi purchase record not found" });
      }
      console.log("hy the data is updated pleace chekout",updatedBrockerPurchase )

      res.status(200).json({ message: "Mandi purchase updated successfully", data: updatedBrockerPurchase  });
  } catch (error) {
      console.error("Error updating Mandi Purchase data:", error);
      res.status(500).json({ error: "Internal server error" });
  }
};
exports.Admin_Updated_directPurchase_data = async (req, res) => {
  try {
      console.log("Request received to update Direct Purchase data");

      const { id, totalPayment, paid, DAmount, paymentStatus } = req.body;
      console.log("The ID is:", id);
      console.log("The total payment is:", totalPayment);
      console.log("The paid amount is:", paid);
      console.log("The due amount is:", DAmount);
      console.log("The payment status is:", paymentStatus);

      // Validate required fields
      if (!id || totalPayment === undefined || paid === undefined || DAmount === undefined || !paymentStatus || paymentStatus.trim() === '') {
          return res.status(400).json({ error: "Missing or invalid required fields" });
      }

      // Find the record by ID
      const data = await DirectPurchase.findById(id);
      if (!data) {
        console.log("ma ki chut ")
          return res.status(404).json({ error: "Mandi purchase record not found" });
      }
      console.log("Existing record:", data);

      // Update the record
      const updatedDirectPurchase = await DirectPurchase.findByIdAndUpdate(
          id,
          {
              ttlprice: totalPayment,
              amountPaid: paid,
              DAmount: DAmount,
              paymentStatus: paymentStatus,
          },
          { new: true } // Return the updated document
      );

      if (!updatedDirectPurchase) {
          console.log("Error occurred while updating");
          return res.status(404).json({ error: "Mandi purchase record not found" });
      }

      console.log("Data updated successfully. Updated record:", updatedDirectPurchase);
      res.status(200).json({ message: "Mandi purchase updated successfully", data:updatedDirectPurchase});
  } catch (error) {
      console.error("Error updating Mandi Purchase data:", error);
      res.status(500).json({ error: "Internal server error" });
  }
};
exports.SuspanceData = async (req, res) => {
  const { itemType, suspenseDate, amount, description } = req.body;
  if (!itemType || !suspenseDate || !amount || !description) {
    return res.status(400).json({ message: 'All fields are required.' });
  }

  try {
    const newSuspance = new SuspanceModel({
      expenseType:itemType,
      expenseDate:suspenseDate,
      amount:amount,
      description:description,
    });
   const suspance_data= await newSuspance.save();
   console.log("here is suspance data",suspance_data)
    res.status(201).json({ message: 'Suspense data saved successfully!', data: newSuspance });
  } catch (error) {
    console.error('Error saving suspense data:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};


exports.All_Suspance_data = async(req,res)=>{
  console.log("hello")
  const all_suspance_data = await SuspanceModel.find({});
  console.log(all_suspance_data);
  res.send(all_suspance_data)
}