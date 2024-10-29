const mongoose = require("mongoose");

const categoryDiscountSchema = new mongoose.Schema({
  categoryName: {
    type: String,
    required: true,
  },
  discount: {
    type: Number,
    required: true,
  },
});

const CategoryDiscount = mongoose.model("CategoryDiscount", categoryDiscountSchema);

module.exports = {CategoryDiscount};
