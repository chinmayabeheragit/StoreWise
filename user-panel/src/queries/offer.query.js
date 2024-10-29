const {Offer } = require("../models/offer.model");
const addOffer = async (offerData, session) => {
    try {
        const result = new Offer(offerData);
        await result.save(session);
        return result;
    } catch (error) {
        throw error;
    }
  };
  const viewOffer = async () => {
    try {
      const result = await Offer.find();
      return result;
    } catch (error) {
      throw error;
    }
  };
  

const editOffer = async (id, updatedData) => {
  try {
      const result = await Offer.findOneAndUpdate({ _id: id }, updatedData, { new: true});
      return result;
  } catch (error) {
      throw error;
  }
};
const deleteOffer = async (id) => {
  try {
      const result = await Offer.findByIdAndDelete( id );
      return result;
  } catch (error) {
      throw error;
  }
};


module.exports = {
    addOffer,
    viewOffer,
    editOffer,
    deleteOffer,
};