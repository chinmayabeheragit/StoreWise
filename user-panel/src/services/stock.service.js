const stockQuery = require('../queries/stock.query')
const StatusCode = require('../../commons/utils/statusCode')
const customException = require('../../commons/exception/customException')

const viewCurrentStockNumber = async () => {
  try {
    const unsoldProducts = await stockQuery.viewCurrentStockNumber({ status: 'unsold' });
    let totalUnsold = 0;

    for (const product of unsoldProducts) {
      if (product.productQuantity && product.productQuantity.value) {
        totalUnsold += product.productQuantity.value;
      }
    }

    return totalUnsold;
  } catch (error) {
    throw error;
  }
};


const getProductsByCategory = async (categoryName) => {
    try {
      const result = await stockQuery.findProductsByCategory(categoryName);
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

  const viewLowStockProductsNumber = async () => {
    try {
      const lowStockProducts = await stockQuery.viewLowStockProducts();
      const totalLowStock = lowStockProducts.length;
      return { totalLowStock };
    } catch (error) {
      throw error;
    }
  };
  
const getCurrentStocksByWeek = async (startDate) => {
    try {
      const endDate = new Date(startDate);
      endDate.setDate(endDate.getDate() + 7); 
      
      const products = await stockQuery.findProductsByAddedTime(startDate, endDate);
      return products;
    } catch (error) {
      throw error;
    }
  };
  const getLowStocksByWeek = async (startDate) => {
    try {
      const endDate = new Date(startDate);
      endDate.setDate(endDate.getDate() + 7); 
      
      const lowStockProducts = await stockQuery.findLowStocksByWeek(startDate, endDate);
      return lowStockProducts;
    } catch (error) {
      throw error;
    }
  };
  const getRecentlyAddedProducts = async (startDate) => {
    try {
      const endDate = new Date(startDate);
      endDate.setDate(endDate.getDate() + 7); 
      
      const recentlyAddedProducts = await stockQuery.findRecentlyAddedProducts(startDate, endDate);
      return recentlyAddedProducts;
    } catch (error) {
      throw error;
    }
  };
const UpdateInventoryQuantity = async () => {
    try {
       const result = await stockQuery.updateInventory();
      return result
    } catch (error) {
      throw error
    }
  };

  const viewCurrentStockNumberWithIncrease = async () => {
    try {
      const unsoldProducts = await stockQuery.viewCurrentStockNumber({ status: 'unsold' });
      let totalUnsold = 0;
  
      for (const product of unsoldProducts) {
        if (product.productQuantity && product.productQuantity.value) {
          totalUnsold += product.productQuantity.value;
        }
      }
  
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      const newProductsToday = await stockQuery.viewCurrentStockNumber({
        addedTime: { $gte: today },
        status: 'unsold'
      });
  
      let increasePercentage = 0;
      if (newProductsToday.length > 0) {
        let totalQuantityToday = 0;
        for (const product of newProductsToday) {
          if (product.productQuantity && product.productQuantity.value) {
            totalQuantityToday += product.productQuantity.value;
          }
        }
        increasePercentage = ((totalQuantityToday / totalUnsold) * 100) - 100;
      }
  
      return { totalUnsold, increasePercentage };
    } catch (error) {
      throw error;
    }
  };
  

module.exports = {
    viewCurrentStockNumber,
    getProductsByCategory,
    viewLowStockProductsNumber,
    getCurrentStocksByWeek,
    getLowStocksByWeek,
    getRecentlyAddedProducts,
    UpdateInventoryQuantity,
    viewCurrentStockNumberWithIncrease
    
};
