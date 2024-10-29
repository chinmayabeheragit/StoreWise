const {BannerModel } = require("../models/banner.model");
const addBanner = async (bannerData, session) => {
    try {
        const banner = new BannerModel(bannerData);
        await banner.save(session);
        return banner;
    } catch (error) {
        throw error;
    }
  };
  const listBanners = async () => {
    try {
      const allBanners = await BannerModel.find();
      return allBanners;
    } catch (error) {
      throw error;
    }
  };
const editBanner = async (id, updatedData) => {
  try {
      const result = await BannerModel.findOneAndUpdate({ _id: id }, updatedData, { new: true});
      return result;
  } catch (error) {
      throw error;
  }
};
const deleteBanner = async (id) => {
  try {
      const result = await BannerModel.findByIdAndDelete( id );
      return result;
  } catch (error) {
      throw error;
  }
};
const viewBannerById = async (id) => {
  try {
    return await BannerModel.findById({ _id: id } );
  } catch (error) {
    throw error;
  }
};
module.exports = {
    addBanner,
    listBanners,
    editBanner,
    deleteBanner,
    viewBannerById
};