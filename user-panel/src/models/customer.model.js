const mongoose = require("mongoose");
const shortId = require("shortid");

const customerSchema = new mongoose.Schema(
  {
    _id: {
      type: String,
      default: () => `CUSTOMER-DETAILS-${shortId.generate()}`,
    },
    cutomerName: {
      type: String,
      required: true,
      unique: true,
    },
    mobileNumber: {
      type: Number,
      required: true,
    },
    GSTNumber: {
      type: Number,
      required: true
    }

  },
);

const Customer = mongoose.model("Customer", customerSchema);
module.exports = { Customer };
