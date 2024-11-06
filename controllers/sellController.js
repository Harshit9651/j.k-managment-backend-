const Selldata = require('../models/sellModel');


exports.createOrder = async (req, res) => {
  try {
    const { customerName, orderDate, products, totalPayment } = req.body;

    // Create a new order document
    const newOrder = new Selldata({
      customerName,
      orderDate,
      products,
      totalPayment,
    });

    // Save the order to the database
   const sellorderdata =  await newOrder.save();
   console.log(sellorderdata)

    // Respond with success
    res.status(200).json({ message: 'Order submitted successfully', order: newOrder });
  } catch (error) {
    console.error('Error submitting order:', error);
    res.status(500).json({ message: 'Error occurred while submitting the order.' });
  }
};

