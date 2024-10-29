const mongoose = require('mongoose');
const shortid = require("shortid");

const SoldProductSchema = new mongoose.Schema({
  _id: {
    type: String,
    default: () => `PRODUCT-SOLD-${shortid.generate()}`,
  },
  productCategory: {
    type: String,
    required: true,
  },
  productName: {
    type: String,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
  totalPrice: {
    type: Number,
    required: true,
  },
  profit: {
    type: Number,
    required: true,
  },
  soldAt: {
    type: Date,
    default: Date.now,
  },
  gstPercentage: {
    type: Number,
    required: true,
  },
});

const SoldProduct = mongoose.model('SoldProduct', SoldProductSchema);

module.exports = {
  SoldProduct,
};
