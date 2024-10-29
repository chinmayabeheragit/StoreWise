const {SoldProduct} = require('../models/sold.product.model');
const {ProductModel} = require('../models/product.model')
// service.js

const createSoldProduct = async (productName, quantity, totalPrice, productCategory, profit,gstPercentage) => {
    try {
        const soldProduct = await SoldProduct.create({
            productName,
            quantity,
            totalPrice,
            productCategory,
            profit,
            gstPercentage
        });
        return soldProduct;
    } catch (error) {
        throw error;
    }
};



const getAllSoldProducts = async () => {
    try {
        const soldProducts = await SoldProduct.find();
        return soldProducts;
    } catch (error) {
        throw error;
    }
};
const deleteSoldProductById = async (soldProductId) => {
    try {
        const deletedProduct = await SoldProduct.findByIdAndDelete(soldProductId);
        return deletedProduct;
    } catch (error) {
        throw error;
    }
};
const reduceProductQuantity = async (productName, quantity, session) => {
    try {
        await ProductModel.findOneAndUpdate({ productName }, { $inc: { 'productQuantity.value': -quantity } }, { session });

        return { success: true };
    } catch (error) {
        throw error;
    }
};

const findSoldProductByNameAndCategory = async (productName, productCategory) => {
    try {
        return await SoldProduct.find({ productName, productCategory });
    } catch (error) {
        throw error;
    }
};

module.exports = {
    createSoldProduct,
    getAllSoldProducts,
    deleteSoldProductById,
    reduceProductQuantity,
    findSoldProductByNameAndCategory
};
