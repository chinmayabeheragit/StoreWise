const offerQuery = require("../queries/offer.query");
const addOffer = async (body, session) => {
  try {
    return await offerQuery.addOffer(body, session); 
  } catch (error) {
    throw error;
  }
};
const viewOffer = async () => {
  try {
    const banners = await offerQuery.viewOffer();
    return banners;
  } catch (error) {
    throw error;
  }
};

const editOffer = async (id, updatedData, session) => {
  try {
    const result = await offerQuery.editOffer(id, updatedData, session);
    return result;
  } catch (error) {
    throw error;
  }
};
const deleteOffer = async (id, session) => {
  try {
    const result = await offerQuery.deleteOffer(id);
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