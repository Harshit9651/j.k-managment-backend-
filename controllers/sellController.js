const Selldata = require('../models/sellModel');
const MustardOilKhata = require('../models/mustardOilKahataModel');
const CuttonCakeKhata = require('../models/cuttonCakeKhataModel');
const RawMustardKhata = require('../models/rowMustardKhataModel'); 
const RawCottonKhata = require('../models/rowCuttonKhataModel'); 
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


    for (let product of products) {
      const productType = product.name.toLowerCase();
      console.log(productType)
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


      const newKhata = new KhataModel({
        customerName,
        orderDate,
        name: product.name,
        weight: product.weight,
        quantity: product.quantity,
        pricePerUnit: product.pricePerUnit,
        ttlprice: product.pricePerUnit * product.quantity,
        paymentStatus: 'Unpaid',
      });

      // Save the khata entry
      const savedKhata = await newKhata.save();
      console.log(`Khata entry saved for ${product.name}:`, savedKhata);
    }

    return res.status(200).json({
      message: 'Order submitted successfully, and khata entries created for each product.',
      order: savedOrder,
    });
  } catch (error) {
    console.error('Error submitting order:', error);
    res.status(500).json({ message: 'Error occurred while submitting the order.' });
  }
};



