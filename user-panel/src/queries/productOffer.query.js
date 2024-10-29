const {ProductOffer } = require("../models/ProductOffer.model");
const addproductOffer = async (productofferData, session) => {
    try {
        const result = new ProductOffer(productofferData);
        await result.save(session);
        return result;
    } catch (error) {
        throw error;
    }
  };
  const viewproductOffers = async () => {
    try {
      const result = await ProductOffer.find();
      return result;
    } catch (error) {
      throw error;
    }
  };
  

const editproductOffer = async (id, updatedData) => {
  try {
      const result = await ProductOffer.findOneAndUpdate({ _id: id }, updatedData, { new: true});
      return result;
  } catch (error) {
      throw error;
  }
};
const deleteproductOffer = async (id) => {
  try {
      const result = await ProductOffer.findByIdAndDelete( id );
      return result;
  } catch (error) {
      throw error;
  }
};

module.exports = {
    addproductOffer,
    viewproductOffers,
    editproductOffer,
    deleteproductOffer,
};