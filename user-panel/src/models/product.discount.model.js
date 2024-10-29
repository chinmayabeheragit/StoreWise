const mongoose = require("mongoose");

const productDiscountSchema = new mongoose.Schema({
  categoryName: {
    type: String,
    required: true,
  },
  productName: {
    type: String,
    required: true,
  },
  productDiscount: {
    type: Number,
    required: true,
  },
});

const ProductDiscount = mongoose.model("ProductDiscount", productDiscountSchema);

module.exports = { ProductDiscount };
