const { ProductModel } = require("../models/product.model");
const addProduct = async (productData, session) => {
  try {
    const product = new ProductModel(productData);
    await product.save(session);
    return product;
  } catch (error) {
    throw error;
  }
};
const getAllProducts = async () => {
  try {
    return await ProductModel.find();
  } catch (error) {
    throw error;
  }
};
const editProduct = async (id, updatedData) => {
  try {
    return await ProductModel.findOneAndUpdate(
      { _id: id },
      updatedData,
      { new: true }
    );
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
const viewProductById = async (id) => {
  try {
    return await ProductModel.findById(id);
  } catch (error) {
    throw error;
  }
};

const findProductByName = async (productName) => {
  try {
    return await ProductModel.findOne({ productName });
  } catch (error) {
    throw error;
  }
};
const updateProductQuantity = async (productName, productCategory, quantity) => {
  try {
      await ProductModel.findOneAndUpdate(
          { productName, productCategory },
          { $inc: { "productQuantity.value": quantity } }
      );
  } catch (error) {
      throw error;
  }
};
const updateInventory = async (productName, quantity) => {
  try {
    await ProductModel.findOneAndUpdate(
      { productName: productName },
      { $inc: { productQuantity: -quantity } },
      { new: true }
    );
  } catch (error) {
    throw error;
  }
};

const getCostPrice = async (productName) => {
  try {
    const product = await ProductModel.findOne({ productName: productName });
    return product.productCost;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  addProduct,
  getAllProducts,
  editProduct,
  deleteProduct,
  viewProductById,
  findProductByName,
  updateProductQuantity,
  updateInventory,
  getCostPrice
};