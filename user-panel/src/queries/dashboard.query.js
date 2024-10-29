const { ProductModel } = require('../models/product.model')
const { SoldProduct } = require('../models/sold.product.model')
const getAllProducts = async () => {
  try {
    return await ProductModel.find();
  } catch (error) {
    throw error;
  }
};
const getToatlRevenue = async () => {
  try {
    return await SoldProduct.find();
  } catch (error) {
    throw error;
  }
};
const getTrendingProducts = async () => {
  try {
    return await SoldProduct.aggregate([
      { $group: { _id: '$productName', totalSales: { $sum: 1 } } },
      { $sort: { totalSales: -1 } },
      { $limit: 10 }
    ]);
  } catch (error) {
    throw error;
  }
};
const TopSellingCategories = async () => {
  try {
    return await SoldProduct.aggregate([
      { $group: { _id: '$productCategory', totalSales: { $sum: '$quantity' } } },
      { $sort: { totalSales: -1 } },
      { $project: { _id: 0, categoryName: '$_id', totalSales: 1 } } 
    ]);
  } catch (error) {
    throw error;
  }
};

const getAllSoldProducts = async () => {
  try {
    return await SoldProduct.find();
  } catch (error) {
    throw error;
  }
};
const getTotalProfit = async () => {
  try {
    const totalProfitResult = await SoldProduct.aggregate([
      {
        $group: {
          _id: null,
          totalProfit: { $sum: "$profit" }
        }
      }
    ]);

    const totalProfit = totalProfitResult.length > 0 ? totalProfitResult[0].totalProfit : 0;

    return totalProfit;
  } catch (error) {
    throw error;
  }
};

const findTopSellingCategory = async () => {
  try {
    const result = await SoldProduct.aggregate([
      { $group: { _id: "$productCategory", totalQuantitySold: { $sum: "$quantity" } } },
      { $sort: { totalQuantitySold: -1 } },
      { $limit: 1 }
    ]);
    return result;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  getAllProducts,
  getTrendingProducts,
  getAllSoldProducts,
  getToatlRevenue,
  TopSellingCategories,
  getTotalProfit,
  findTopSellingCategory
}