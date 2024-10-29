const mongoose = require('mongoose');
const shortid = require("shortid");

const ProductOfferSchema = new mongoose.Schema({
    _id: {
        type: String,
        default: () => `OFFER-${shortid.generate()}`,
    },
    productName: {
        type: String,
        required: true,
      },
    categoryName: {
        type: String,
        required: true,
      },
    offerName: {
        type: String,
        required: true,
    },
    startDate: {
        type: String,
        required: true,
    },
    EndDate: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: ['active', 'inactive'],
        default: 'active'
    }
});

const ProductOffer = mongoose.model("ProductOffer", ProductOfferSchema);

module.exports = { ProductOffer };