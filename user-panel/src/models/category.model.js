const mongoose = require("mongoose");
const shortId = require("shortid");

const categorySchema = new mongoose.Schema(
  {
    _id: {
      type: String,
      default: () => `PRODUCT-CATEGORY-${shortId.generate()}`,
    },
    categoryName: {
      type: String,
      required: true,
      unique: true,
    },
    productNames: [{
      type: String,
      required: true,
    }],
    gstPercentage: {
      type: Number,
      required: true,
    },
    gstRate: {
      type: Number,
      required: true,
    },
    discount: {
      type: Number,
    },
    email: {
      type: String,
      required: true,
    }
  },
);

const Category = mongoose.model("Categories", categorySchema);
module.exports = { Category };
