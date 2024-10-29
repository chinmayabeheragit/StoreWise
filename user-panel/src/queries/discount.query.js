const {Category} = require('../models/category.model')
const {ProductModel} = require('../models/product.model')
const {ProductDiscount} = require('../models/product.discount.model')
const {CategoryDiscount} = require('../models/category.discount.model')

const findProductByCategoryAndName = async (categoryName, productName, session) => {
  try {
    return await ProductModel.findOne({ productCategory: categoryName, productName }).session(session);
  } catch (error) {
    throw error;
  }
};

const createProductDiscount = async (discountData, session) => {
  try {
    const productDiscount = new ProductDiscount(discountData);
    await productDiscount.save({ session });
    return productDiscount;
  } catch (error) {
    throw error;
  }
};


const findCategoryByName = async (categoryName, session) => {
  try {
    return await Category.findOne({ categoryName }).session(session);
  } catch (error) {
    throw error;
  }
};


  
  const createCategoryDiscount = async (categoryName, discountValue, session) => {
    try {
      const discountData = {
        categoryName,
        discount:discountValue
      };
  
      const categoryDiscount = new CategoryDiscount(discountData);
      await categoryDiscount.save({ session });
  
      return categoryDiscount;
    } catch (error) {
      throw error;
    }
  };

  const getAllCategoryDiscounts = async () => {
    try {
      const categoryDiscounts = await CategoryDiscount.find();
      return categoryDiscounts;
    } catch (error) {
      throw error;
    }
  };

  const getAllProductDiscounts = async () => {
    try {
      return await ProductDiscount.find({});
    } catch (error) {
      throw error;
    }
  };
  
  const updateCategoryDiscount = async (categoryName, newDiscount) => {
    try {
      return await CategoryDiscount.findOneAndUpdate(
        { categoryName },
        { discount: newDiscount },
        { new: true }
      );
    } catch (error) {
      throw error;
    }
  };
    
  const updateProductDiscount = async (categoryName, productName, newDiscount) => {
    try {
      const updatedDiscount = await ProductDiscount.findOneAndUpdate(
        { categoryName, productName },
        { $set: { productDiscount: newDiscount } },
        { new: true, useFindAndModify: false }
      );
      return updatedDiscount;
    } catch (error) {
      throw error;
    }
  };

  const deleteProductDiscount = async (categoryName, productName) => {
    try {
      return await ProductDiscount.findOneAndDelete({ categoryName, productName });
    } catch (error) {
      throw error;
    }
  };

  const deleteCategoryDiscount = async (categoryName) => {
    try {
      return await CategoryDiscount.findOneAndDelete({ categoryName });
    } catch (error) {
      throw error;
    }
  };
module.exports = {
  findProductByCategoryAndName,
    createProductDiscount,
    createCategoryDiscount,
    findCategoryByName,
    getAllCategoryDiscounts,
    getAllProductDiscounts,
    updateCategoryDiscount,
    updateProductDiscount,
    deleteProductDiscount,
    deleteCategoryDiscount

}  