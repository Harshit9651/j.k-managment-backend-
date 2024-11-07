const mongoose = require('mongoose');

const sellSchema = new mongoose.Schema({
  customerName: { type: String, required: true },
  orderDate: { type: Date, required: true },
  products: [
    {
      name: { type: String, required: true },
      quantity: { type: Number, required: true },
      weight: { type: String, required: true },
      pricePerUnit: { type: Number, required: true },
      totalPrice: { type: Number, required: true },
    }
  ],
  totalPayment: { type: Number, required: true },
}, { timestamps: true });

const Sell = mongoose.model('Order', sellSchema);

module.exports = Sell;
