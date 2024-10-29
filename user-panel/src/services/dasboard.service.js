const DashboardQuery = require('../queries/dashboard.query')
const productQuery = require('../queries/product.query')
const moment = require('moment');


const sellProductAndUpdateProfit = async (productName, quantity, totalPrice) => {
  try {
    await productQuery.updateInventory(productName, quantity);
    const profit = totalPrice - await productQuery.getCostPrice(productName);
    return profit;
  } catch(error){
    throw error;
  }
  }
const getTotalProfit = async () => {
  try {
    const totalProfit = await DashboardQuery.getTotalProfit();
    return totalProfit;
  } catch (error) {
    throw error;
  }
};

const getRemainingDaysUntilExpiry = async () => {
    try {
      const products = await DashboardQuery.getAllProducts();
      const currentDate = moment();
      const results = [];
  
      for (const product of products) {
        const expiryDate = moment(product.expiryDate, 'MM-YY');
        const remainingDays = expiryDate.diff(currentDate, 'days');
        results.push({
          productName: product.productName,
          productCategory: product.productCategory,
          remainingDaysUntilExpiry: remainingDays
        });
      }
  
      return results;
    } catch (error) {
      throw error;
    }
  };
const getTrendingProducts = async () => {
    try {
      const trendingProducts = await DashboardQuery.getTrendingProducts();
      return trendingProducts;
    } catch (error) {
      throw error;
    }
  }
  const topSellingCategories = async () => {
    try {
      const topSellingCategories = await DashboardQuery.findTopSellingCategory();
      return topSellingCategories;
    } catch (error) {
      throw error;
    }
  };
  
  const getToatlRevenue = async () => {
    try {
      const soldProducts = await DashboardQuery.getToatlRevenue();
      let totalPrice = 0;
  
      soldProducts.forEach((product) => {
        totalPrice += product.totalPrice;
      });
  
      return totalPrice;
    } catch (error) {
      throw error;
    }
  };
  
module.exports = { 
  sellProductAndUpdateProfit,
    getRemainingDaysUntilExpiry,
    getTrendingProducts,
    topSellingCategories,
    getToatlRevenue,
    getTotalProfit

}