const productQuery = require("../queries/product.query");
const StatusCode = require('../../commons/utils/statusCode')
const customException = require('../../commons/exception/customException')

const addProduct = async (body, session, email) => {
  try {
    body.email = email
    const productName = body.productName.toLowerCase();
    const productSupplier = body.productSupplier.toLowerCase();
    const productManufacturer = body.productManufacturer.toLowerCase();
  
      const newProductData = {
        ...body,
        productName,
        productSupplier,
        productManufacturer,
      };
    return await productQuery.addProduct(newProductData, session);
  } catch (error) {
    throw error;
  }
};
const getAllProducts = async () => {
  try {
    const products = await productQuery.getAllProducts();
    if (!products || products.length === 0) {
      return "No products found.";
    }
    return products;
  } catch (error) {
    throw error;
  }
};

const reduceProductQuantity = async (productName, quantity) => {
  try {
      const product = await productQuery.findProductByName( productName );
      if (!product) {
        throw customException.error(
          StatusCode.SUCCESS_CODE,
          null,
          "product with the provided product name does not exist."
        );
      }
      const updatedQuantity = product.productQuantity.value - quantity;
      await productQuery.updateProductQuantity(productName, updatedQuantity);

      return { success: true };
  } catch (error) {
      throw error;
  }
};
const editProduct = async (id, updatedData, session) => {
  try {
    const result =  await productQuery.editProduct(id, updatedData, session);
    if (!result) {
      throw customException.error(
        StatusCode.SUCCESS_CODE,
        null,
        "product with the provided ID does not exist."
      );
    }
    return result
  } catch (error) {
    throw error;
  }
};
const deleteProduct = async (id, session) => {
  try {
    const result =  await productQuery.deleteProduct(id, session);
    if (!result) {
      throw customException.error(
        StatusCode.SUCCESS_CODE,
        null,
        "product with the provided ID does not exist."
      );
    }
    return result
  } catch (error) {
    throw error;
  }
};
const viewProductById = async (id) => {
  try {
    const result = await productQuery.viewProductById(id);
    if (!result) {
      throw customException.error(
        StatusCode.SUCCESS_CODE,
        null,
        "product with the provided ID does not exist."
      );
    }
    return result;
  } catch (error) {
    throw error;
  }
};
const findProductByName = async (productName) => {
  try {
    const result =  await productQuery.findProductByName(productName);
    if (!result) {
      throw customException.error(
        StatusCode.SUCCESS_CODE,
        null,
        "product with the provided name does not exist."
      );
    }
    return result
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
  reduceProductQuantity
};