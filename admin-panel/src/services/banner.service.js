const bannerQuery = require("../queries/banner.queries");
const addBanner = async ({ email, bannerName, URL, displayStatus }, session) => {
  try {
    const bannerData = {
      email,
      bannerName,
      URL,
      displayStatus,
    };
    const result = await bannerQuery.addBanner(bannerData, session);
    return result;
  } catch (error) {
    throw error;
  }
};

const listBanners = async () => {
  try {
    const banners = await bannerQuery.listBanners();
    return banners;
  } catch (error) {
    throw error;
  }
};
const editBanner = async (id, updatedData, session) => {
  try {
    const result = await bannerQuery.editBanner(id, updatedData, session);
    return result;
  } catch (error) {
    throw error;
  }
};
const deleteBanner = async (id, session) => {
  try {
    const result = await bannerQuery.deleteBanner(id);
    return result;
  } catch (error) {
    throw error;
  }
};
const viewBannerById = async (id) => {
    try {
      const result = await bannerQuery.viewBannerById( id );
      if (!result) {
        return "Banner not found.";
      }
      return result;
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