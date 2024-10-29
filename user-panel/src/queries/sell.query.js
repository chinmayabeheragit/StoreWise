const {ProductModel} = require('../models/product.model')
const {Customer} = require('../models/customer.model')
const {Category} = require('../models/category.model')

const viewProducts = async () => {
  try {
    return await ProductModel.find();
  } catch (error) {
    throw error;
  }
};

const deleteProduct = async (id) => {
    try {
      return await ProductModel.findByIdAndDelete(id);
    } catch (error) {
      throw error;
    }
  };
  const deletecategory = async (id) => {
    try {
      return await ProductModel.findByIdAndDelete(id);
    } catch (error) {
      throw error;
    }
  };
  const CustomerDeatils = async (Data, session) => {
    try {
        const result = new Customer(Data);
        await result.save(session);
        return result;
    } catch (error) {
        throw error;
    }
};

const findOneProductByName = async (productName) => {
  try {
    return await ProductModel.findOne({ productName: productName });
  } catch (error) {
    throw error;
  }
};

const findOneProductById = async (productId) => {
  try {
    return await ProductModel.findOne({ productId });
  } catch (error) {
    throw error;
  }
};

const findCategoryById = async (categoryId) => {
  try {
    return await Category.findOne({ categoryId });
  } catch (error) {
    throw error;
  }
};
const findCategoryByName = async (categoryName) => {
  try {
    return await Category.findOne({ categoryName: categoryName });
  } catch (error) {
    throw error;
  }
};
const updateProductQuantity = async (productName, quantitySold, session) => {
  try {
    const product = await ProductModel.findOne({ productName: productName }).session(session);
    if (product) {
      product.productQuantity.value -= quantitySold;
      await product.save();
    }
  } catch (error) {
    throw error;
  }
};
const getAllSaleTransactions = async () => {
  try {
    return await ProductModel.find();
  } catch (error) {
    throw error;
  }
};
const getCostPrice = async (productName) => {
  try {
    const product = await ProductModel.findOne({ productName });

    return product.totalQuantityCost; 
  } catch (error) {
    throw error;
  }
};
module.exports = {
    viewProducts,
    deleteProduct,
    deletecategory,
    CustomerDeatils,
    findOneProductByName,
    findOneProductById,
    findCategoryById,
    findCategoryByName,
    updateProductQuantity,
    getAllSaleTransactions,
    getCostPrice
}