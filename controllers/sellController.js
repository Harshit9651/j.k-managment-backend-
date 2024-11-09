const Selldata = require("../models/sellModel");
const MustardOilKhata = require("../models/mustardOilKahataModel");
const CuttonCakeKhata = require("../models/cuttonCakeKhataModel");
const RawMustardKhata = require("../models/rowMustardKhataModel");
const RawCottonKhata = require("../models/rowCuttonKhataModel");

exports.createOrder = async (req, res) => {
  try {
    const { customerName, orderDate, products, totalPayment } = req.body;

    const newOrder = new Selldata({
      customerName,
      orderDate,
      products,
      totalPayment,
    });
    const savedOrder = await newOrder.save();
    console.log("Order saved in Selldata:", savedOrder);

    for (let product of products) {
      const receiptNumber = `BILL-${Date.now()}-${Math.floor(
        Math.random() * 1000
      )}`;
      const productType = product.name.toLowerCase();
      let KhataModel;

      if (productType === "mustard oil") {
        KhataModel = MustardOilKhata;
      } else if (productType === "cutton cake") {
        KhataModel = CuttonCakeKhata;
      } else if (productType === "row of mustard") {
        KhataModel = RawMustardKhata;
      } else if (productType === "row of cotton") {
        KhataModel = RawCottonKhata;
      } else {
        console.warn(`Invalid product type: ${productType}`);
        continue;
      }

    
      let existingKhata = await KhataModel.findOne({ customerName });

      const productEntry = {
        name: product.name,
        weight: product.weight,
        quantity: product.quantity,
        pricePerUnit: product.pricePerUnit,
        ttlprice: product.pricePerUnit * product.quantity,
        paymentStatus: "Unpaid",
        billNumber: receiptNumber
      };

      if (!existingKhata) {
        existingKhata = new KhataModel({
          customerName,
          orderDate,
          products: [productEntry],
        });
      } else {
        existingKhata.products.push(productEntry);
      }

      const savedKhata = await existingKhata.save();
      console.log(`Khata entry saved for ${product.name}:`, savedKhata);
    }

    return res.status(200).json({
      message:
        "Order submitted successfully, and khata entries created/updated for each product.",
      order: savedOrder,
    });
  } catch (error) {
    console.error("Error submitting order:", error);
    res
      .status(500)
      .json({ message: "Error occurred while submitting the order." });
  }
};

exports.getMustardOilKhata = async (req, res) => {
  try {
    const khataEntries = await MustardOilKhata.find();
    return res.status(200).json(khataEntries);
  } catch (error) {
    console.error("Error fetching Mustard Oil Khata entries:", error);
    return res
      .status(500)
      .json({ message: "Error fetching Mustard Oil Khata entries." });
  }
};

exports.getCottonCakeKhata = async (req, res) => {
  try {
    const khataEntries = await CuttonCakeKhata.find();
    return res.status(200).json(khataEntries);
  } catch (error) {
    console.error("Error fetching Cotton Cake Khata entries:", error);
    return res
      .status(500)
      .json({ message: "Error fetching Cotton Cake Khata entries." });
  }
};
exports.getRawMustardKhata = async (req, res) => {
  try {
    const khataEntries = await RawMustardKhata.find();
    return res.status(200).json(khataEntries);
  } catch (error) {
    console.error("Error fetching Raw Mustard Khata entries:", error);
    return res
      .status(500)
      .json({ message: "Error fetching Raw Mustard Khata entries." });
  }
};

exports.getRawCottonKhata = async (req, res) => {
  try {
    const khataEntries = await RawCottonKhata.find();
    return res.status(200).json(khataEntries);
  } catch (error) {
    console.error("Error fetching Raw Cotton Khata entries:", error);
    return res
      .status(500)
      .json({ message: "Error fetching Raw Cotton Khata entries." });
  }
};


exports.FetchCustomer = async(req,res)=>{
  const { customerId, productType } = req.params;
console.log(customerId,productType)

  let Model;
  switch (productType.toLowerCase()) {
    case 'mustardoil':
      Model = MustardOilKhata;
      break;
    case 'cuttoncake':
      Model = CuttonCakeKhata;
      break;
    case 'rowofmustard':
      Model = RawMustardKhata;
      break;
    case 'rowofcotton':
      Model = RawCottonKhata;
      break;
    default:
      return res.status(400).json({ message: "Invalid product type" });
  }

  try {
    console.log("hello")
    const customerOrders = await Model.findOne({ _id: customerId }).lean();
    console.log(customerOrders)
    res.status(200).json(customerOrders);
  } catch (error) {
    console.error("Error fetching customer orders:", error);
    res.status(500).json({ message: "Error fetching customer orders" });
  }
}

exports.updatePaymentStatus = async (req, res) => {
  const { recordId, productType } = req.params;
  const { paymentStatus } = req.body;

  console.log(`customerId is ${recordId}`)
  console.log(`product Type is ${productType}`)
  console.log(`status is ${paymentStatus}`)
  // Determine the model based on the product type
  let Model;
  switch (productType.toLowerCase()) {
    case 'mustardoil':
      Model = MustardOilKhata;
      break;
    case 'cuttoncake':
      Model = CuttonCakeKhata;
      break;
    case 'rowofmustard':
      Model = RawMustardKhata;
      break;
    case 'rowofcotton':
      Model = RawCottonKhata;
      break;
    default:
      return res.status(400).json({ message: "Invalid product type" });
  }

  try {

    const updatedRecord = await Model.findByIdAndUpdate(
      recordId,
      { paymentStatus },
      { new: true }
    );

    if (!updatedRecord) {
      return res.status(404).json({ message: "Record not found" });
    }

    res.status(200).json({ message: "Payment status updated successfully", updatedRecord });
  } catch (error) {
    console.error("Error updating payment status:", error);
    res.status(500).json({ message: "Error updating payment status" });
  }
};




// delete data from khatas 
exports.deleteCustomer_RowOfMustard = async (req, res) => {
  
  try {
    const { customerId } = req.params;
   const deletedCustomer= await RawMustardKhata.findByIdAndDelete(customerId);
   console.log(deletedCustomer)
    res.status(200).json({ message: "Customer deleted successfully" });
  } catch (error) {
    console.error("Error deleting customer:", error);
    res.status(500).json({ message: "Error deleting customer" });
  }
};
exports.deleteCustomer_RowOfCutton= async (req, res) => {
  
  try {
    const { customerId } = req.params;
   const deletedCustomer= await RawCottonKhata.findByIdAndDelete(customerId);
   console.log(deletedCustomer)
    res.status(200).json({ message: "Customer deleted successfully" });
  } catch (error) {
    console.error("Error deleting customer:", error);
    res.status(500).json({ message: "Error deleting customer" });
  }
};
exports.deleteCustomer_MustardOil = async (req, res) => {
  
  try {
    const { customerId } = req.params;
   const deletedCustomer= await MustardOilKhata.findByIdAndDelete(customerId);
   console.log(deletedCustomer)
    res.status(200).json({ message: "Customer deleted successfully" });
  } catch (error) {
    console.error("Error deleting customer:", error);
    res.status(500).json({ message: "Error deleting customer" });
  }
};
exports.deleteCustomer_CuttonCakeKhata= async (req, res) => {
  
  try {
    const { customerId } = req.params;
   const deletedCustomer= await CuttonCakeKhata.findByIdAndDelete(customerId);
   console.log(deletedCustomer)
    res.status(200).json({ message: "Customer deleted successfully" });
  } catch (error) {
    console.error("Error deleting customer:", error);
    res.status(500).json({ message: "Error deleting customer" });
  }
};
