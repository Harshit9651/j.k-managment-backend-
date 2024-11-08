const Selldata = require('../models/sellModel');
const MustardOilKhata = require('../models/mustardOilKahataModel');
const CuttonCakeKhata = require('../models/cuttonCakeKhataModel');
const RawMustardKhata = require('../models/rowMustardKhataModel'); 
const RawCottonKhata = require('../models/rowCuttonKhataModel'); 
// exports.createOrder = async (req, res) => {
//   try {
//     const { customerName, orderDate, products, totalPayment } = req.body;

//     // Save the complete order in Selldata
//     const newOrder = new Selldata({
//       customerName,
//       orderDate,
//       products,
//       totalPayment,
//     });
//     const savedOrder = await newOrder.save();
//     console.log('Order saved in Selldata:', savedOrder);


//     for (let product of products) {
//       const productType = product.name.toLowerCase();
//       console.log(productType)
//       let KhataModel;

//       if (productType === 'mustard oil') {
//         KhataModel = MustardOilKhata;
//       } else if (productType === 'cutton cake') {
//         KhataModel = CuttonCakeKhata;
//       } else if (productType === 'row of mustard') {
//         KhataModel = RawMustardKhata;
//       } else if (productType === 'row of cotton') {
//         KhataModel = RawCottonKhata;
//       } else {
//         console.warn(`Invalid product type: ${productType}`);
//         continue; 
//       }


//       const newKhata = new KhataModel({
//         customerName,
//         orderDate,
//         name: product.name,
//         weight: product.weight,
//         quantity: product.quantity,
//         pricePerUnit: product.pricePerUnit,
//         ttlprice: product.pricePerUnit * product.quantity,
//         paymentStatus: 'Unpaid',
//       });

//       const savedKhata = await newKhata.save();
//       console.log(`Khata entry saved for ${product.name}:`, savedKhata);
//     }

//     return res.status(200).json({
//       message: 'Order submitted successfully, and khata entries created for each product.',
//       order: savedOrder,
//     });
//   } catch (error) {
//     console.error('Error submitting order:', error);
//     res.status(500).json({ message: 'Error occurred while submitting the order.' });
//   }
// };

exports.createOrder = async (req, res) => {
  try {
    const { customerName, orderDate, products, totalPayment } = req.body;

    // Save the complete order in Selldata
    const newOrder = new Selldata({
      customerName,
      orderDate,
      products,
      totalPayment,
    });
    const savedOrder = await newOrder.save();
    console.log('Order saved in Selldata:', savedOrder);

    // Iterate over each product in the order
    for (let product of products) {
      const productType = product.name.toLowerCase();
      let KhataModel;

      if (productType === 'mustard oil') {
        KhataModel = MustardOilKhata;
      } else if (productType === 'cutton cake') {
        KhataModel = CuttonCakeKhata;
      } else if (productType === 'row of mustard') {
        KhataModel = RawMustardKhata;
      } else if (productType === 'row of cotton') {
        KhataModel = RawCottonKhata;
      } else {
        console.warn(`Invalid product type: ${productType}`);
        continue; 
      }

      // Check if the customer already has an existing Khata (ledger) entry
      let existingKhata = await KhataModel.findOne({ customerName });

      // If no existing Khata, create a new one
      if (!existingKhata) {
        existingKhata = new KhataModel({
          customerName,
          orderDate,
          name: product.name,
          weight: product.weight,
          quantity: product.quantity,
          pricePerUnit: product.pricePerUnit,
          ttlprice: product.pricePerUnit * product.quantity,
          paymentStatus: 'Unpaid',
        });
      } else {
        // If Khata exists, just add the new entry to the customer's ledger
        existingKhata.products.push({
          name: product.name,
          weight: product.weight,
          quantity: product.quantity,
          pricePerUnit: product.pricePerUnit,
          ttlprice: product.pricePerUnit * product.quantity,
          paymentStatus: 'Unpaid',
        });
      }

      // Save or update the Khata entry
      const savedKhata = await existingKhata.save();
      console.log(`Khata entry saved for ${product.name}:`, savedKhata);
    }

    return res.status(200).json({
      message: 'Order submitted successfully, and khata entries created/updated for each product.',
      order: savedOrder,
    });
  } catch (error) {
    console.error('Error submitting order:', error);
    res.status(500).json({ message: 'Error occurred while submitting the order.' });
  }
};


exports.getMustardOilKhata = async (req, res) => {
  try {
    const khataEntries = await MustardOilKhata.find();
    return res.status(200).json(khataEntries);
  } catch (error) {
    console.error('Error fetching Mustard Oil Khata entries:', error);
    return res.status(500).json({ message: 'Error fetching Mustard Oil Khata entries.' });
  }
};


exports.getCottonCakeKhata = async (req, res) => {
  try {
    const khataEntries = await CuttonCakeKhata.find();
    return res.status(200).json(khataEntries);
  } catch (error) {
    console.error('Error fetching Cotton Cake Khata entries:', error);
    return res.status(500).json({ message: 'Error fetching Cotton Cake Khata entries.' });
  }
};

exports.getRawMustardKhata = async (req, res) => {
  try {
    const khataEntries = await RawMustardKhata.find();
    return res.status(200).json(khataEntries);
  } catch (error) {
    console.error('Error fetching Raw Mustard Khata entries:', error);
    return res.status(500).json({ message: 'Error fetching Raw Mustard Khata entries.' });
  }
};


exports.getRawCottonKhata = async (req, res) => {
  try {
    const khataEntries = await RawCottonKhata.find();
    return res.status(200).json(khataEntries);
  } catch (error) {
    console.error('Error fetching Raw Cotton Khata entries:', error);
    return res.status(500).json({ message: 'Error fetching Raw Cotton Khata entries.' });
  }
};





