const mongoose = require("mongoose");
const shortid = require("shortid");

const employeeSchema = new mongoose.Schema({
  _id: {
    type: String,
    default: () => `EMP-${shortid.generate()}`
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  phoneNumber: {
    type: String,
    required: true
  },
  address: {
    type: String,
    required: true
  },
  adharNumber: {
    type: String,
    required: true,
    unique: true
  },
  access: {
    sellProduct: {
      type: Boolean,
      default: false
    },
    addProduct: {
      type: Boolean,
      default: false
    }
  },
  role: {
    type: String,
    default: 'employee'
  },
});

const Employee = mongoose.model("Employee", employeeSchema);

module.exports = {
  Employee
};
