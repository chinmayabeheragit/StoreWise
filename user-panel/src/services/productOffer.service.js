const productofferQuery = require("../queries/productOffer.query");
const addproductOffer = async (body, session) => {
  try {
    return await productofferQuery.addproductOffer(body, session); 
  } catch (error) {
    throw error;
  }
};
const viewproductOffers = async () => {
  try {
    const banners = await productofferQuery.viewproductOffers();
    return banners;
  } catch (error) {
    throw error;
  }
};

const editproductOffer = async (id, updatedData, session) => {
  try {
    const result = await productofferQuery.editproductOffer(id, updatedData, session);
    return result;
  } catch (error) {
    throw error;
  }
};
const deleteproductOffer = async (id, session) => {
  try {
    const result = await productofferQuery.deleteproductOffer(id);
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