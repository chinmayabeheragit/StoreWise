const discountquery = require('../queries/discount.query')
const customException = require('../../commons/exception/customException')
const statusCode = require('../../commons/utils/statusCode')

const addProductDiscount = async (categoryName, productName, productDiscount, session) => {
  try {
    const product = await discountquery.findProductByCategoryAndName(categoryName, productName, session);
    if (!product) {
      throw customException.error(
        statusCode.NOT_FOUND,
        null,
        "Product with the provided category name and product name does not exist."
      );
    }

    const newProductDiscountData = {
      categoryName,
      productName,
      productDiscount,
    };

    await discountquery.createProductDiscount(newProductDiscountData, session);

    product.productDiscount = productDiscount;

    await product.save({ session });

    return product;
  } catch (error) {
    throw error;
  }
};






const addCategoryDiscount = async (categoryName, discount, session) => {
  try {
    const category = await discountquery.findCategoryByName(categoryName, session)

    if (!category) {
      throw customException.error(
        statusCode.SUCCESS_CODE,
        null,
        "Category with the provided name does not exist."
      );
    }

    await discountquery.createCategoryDiscount(categoryName, discount, session)
    category.discount = discount;
    return category;
  } catch (error) {
    throw error;
  }
};
const getCategoryDiscounts = async () => {
  try {
    const categoryDiscounts = await discountquery.getAllCategoryDiscounts();
    return categoryDiscounts;
  } catch (error) {
    throw error;
  }
};
const getProductDiscounts = async () => {
  try {
    return await discountquery.getAllProductDiscounts();
  } catch (error) {
    throw error;
  }
};
const updateCategoryDiscount = async (categoryName, newDiscount) => {
  try {
    return await discountquery.updateCategoryDiscount(categoryName, newDiscount);
  } catch (error) {
    throw error;
  }
};
const updateProductDiscount = async (categoryName, productName, newDiscount) => {
  try {
    return await discountquery.updateProductDiscount(categoryName, productName, newDiscount);
  } catch (error) {
    throw error;
  }
};
const deleteProductDiscount = async (categoryName, productName) => {
  try {
    return await discountquery.deleteProductDiscount(categoryName, productName);
  } catch (error) {
    throw error;
  }
};
const deleteCategoryDiscount = async (categoryName) => {
  try {
    return await discountquery.deleteCategoryDiscount(categoryName);
  } catch (error) {
    throw error;
  }
};

  module.exports = {
    addProductDiscount,
    addCategoryDiscount,
    getCategoryDiscounts,
    getProductDiscounts,
    updateCategoryDiscount,
    updateProductDiscount,
    deleteProductDiscount,
    deleteCategoryDiscount
  }
  