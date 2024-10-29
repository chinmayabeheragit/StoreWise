const { required } = require("joi");
const mongoose = require("mongoose");
const shortid = require("shortid");
const bannerSchema = new mongoose.Schema({
  _id: {
    type: String,
    default: () => `BANNER-${shortid.generate()}`,
  },
  bannerName: {
    type: String,
    required: true,
  },
  URL: {
    type: String,
    required: true,
  },
  displayStatus: {
    type: Boolean,
    default: true,
  },
  email: {
    type: String,
    
  },
});
const BannerModel = mongoose.model("Banner", bannerSchema);
module.exports = {
  BannerModel,
};