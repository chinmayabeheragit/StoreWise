const mongoose = require("mongoose");
const shortId = require("shortid");
 
const AdminSchema = new mongoose.Schema({
  _id: {
    type: String,
    default: () => `ADMIN-${shortId.generate()}`,
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
  phoneNumber: {
    type: String,
    required: true,
  },
  address: {
    type: String,
  },
  profilePicture: {
    type: String,
  },
  role: {
    type: String,
    default: 'admin'
  },
  resetPasswordToken: String,
  resetPasswordExpires: Date,
});
 
const Admin = mongoose.model("Admin", AdminSchema);
 
module.exports = {Admin};