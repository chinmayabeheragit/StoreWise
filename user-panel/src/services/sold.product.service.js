const SoldProductQuery = require('../queries/sold.product.query');
const productService = require('../services/product.service')

const getAllSoldProducts = async () => {
    try {
        const soldProducts = await SoldProductQuery.getAllSoldProducts();
        return soldProducts;
    } catch (error) {
        throw error;
    }
};
const deleteSoldProductById = async (soldProductId) => {
    try {
        const result = await SoldProductQuery.deleteSoldProductById(soldProductId);
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
const sellProduct = async (productName, productCategory,quantity, totalPrice, session) => {
    try {
        const soldProduct = await SoldProductQuery.createSoldProduct(productName,productCategory, quantity, totalPrice, session);
        await productService.reduceProductQuantity(productName,productCategory, quantity, session);

        return soldProduct;
    } catch (error) {
        throw error;
    }
};
module.exports = {
    getAllSoldProducts,
    deleteSoldProductById,
    sellProduct
};
