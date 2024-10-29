const { required } = require("joi");
const mongoose = require("mongoose");
const shortid = require("shortid");

const productSchema = new mongoose.Schema({
  _id: {
    type: String,
    default: () => `PRODUCT-${shortid.generate()}`,
  },
  productId: {
    type: String,
    required: true,
    unique: true,
  },
  productCategory: {
    type: String,
    required: true,
  },
  productName: {
    type: String,
    required: true,
  },
  totalQuantityCost: {
    type: Number,
    required: true
  },
  productCost: {
    type: Number,
    required: true,
  },
  productSellingPrice: {
    type: Number,
    required: true,
  },
  productDiscount: {
    type: Number,
    required: true,
  },
  productSupplier: {
    type: String,
    required: true,
  },
  productManufacturer: {
    type: String,
    required: true,
  },
  totalQuantityCost: {
    type: Number,
    required: true

  },
  productQuantity: {
    value: {
      type: Number,
      required: true,
      min: 1,
    },
    unit: {
      type: String,
      enum: ["g", "kg", "l", "ml", "q", "T","pcs"],
    },
  },
  expiryDate: {
    type: String,
    default: null,
  },
  addedTime: {
    type: Date,
    default: Date.now,
  },
  HSNnumber: {
    type: Number,
    required: true
  },
  email: {
    type: String,
    required: true
  }
});

const ProductModel = mongoose.model("Product", productSchema);

module.exports = {
  ProductModel,
};
