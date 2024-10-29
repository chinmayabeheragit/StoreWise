const mongoose = require("mongoose");
const shortId = require("shortid");
const superadminSchema = new mongoose.Schema({
  _id: {
    type: String,
    default: () => `SUPERADMIN-${shortId.generate()}`,
  },
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  mobileNumber: {
    type: String,
    required: true,
  },
  address: {
    type: String,
  },
  profilePicture: {
    type: String,
  },
  resetPasswordToken: String,
  resetPasswordExpires: Date,
});
const superadmin = mongoose.model("superadmin", superadminSchema);
module.exports = {superadmin};
 