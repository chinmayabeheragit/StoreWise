const mongoose = require("mongoose");
const shortId = require("shortid");

const profileSchema = new mongoose.Schema(
  {
    _id: {
      type: String,
      default: () => `USER-PROFILE-${shortId.generate()}`,
      unique: true,
    },
    name: {
      type: String,
      required: true,
    },
    mobileNo: {
      type: String,
      required: true,
    },
    address: {
      type: String,
    },
    profilePicture: {
      type: String,
    },
    email: {
      type: String
    }
  },
  { timestamps: true }
);

const UserProfile = mongoose.model("user profile", profileSchema);
module.exports = { UserProfile };