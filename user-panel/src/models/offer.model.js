const mongoose = require('mongoose');
const shortid = require("shortid");

const OfferSchema = new mongoose.Schema({
    _id: {
        type: String,
        default: () => `OFFER-${shortid.generate()}`,
    },
    offerName: {
        type: String,
        required: true,
    },
    OfferDiscount: {
        type: Number,
        required: true
    },
    MinimumQuantity: {
        type: Number,
        default:1
    },
    status: {
        type: String,
        enum: ['active', 'inactive'],
        default: 'active'
    }
});

const Offer = mongoose.model("Offer", OfferSchema);

module.exports = { Offer };