const {ProductModel} = require('../models/product.model')
const {SoldProduct} = require('../models/sold.product.model')

const viewCurrentStockNumber = async () => {
  try {
    return await ProductModel.find({ status: 'unsold' });
  } catch (error) {
    throw error;
  }
};
  
  const findProductsByCategory = async (categoryName) => {
    try {
      return await ProductModel.find({ productCategory: categoryName });
    } catch (error) {
      throw error;
    }
  };
  
  const viewLowStockProducts = async () => {
    try {
      return await ProductModel.find({ "productQuantity.value": { $lte: 10 } });
    } catch (error) {
      throw error;
    }
  };
  
  
  const findProductsByAddedTime = async (startDate, endDate) => {
    try {
      return await ProductModel.find({
        addedTime: {
          $gte: new Date(startDate),
          $lte: new Date(endDate)
        }
      });
    } catch (error) {
      throw error;
    }
  };
  const findLowStocksByWeek = async (startDate, endDate) => {
    try {
      return await ProductModel.find({
        productQuantity: { $lte: 10 },
        addedTime: {
          $gte: new Date(startDate),
          $lte: new Date(endDate)
        }
      });
    } catch (error) {
      throw error;
    }
  };
  const findRecentlyAddedProducts = async (startDate, endDate) => {
    try {
      return await ProductModel.find({
        addedTime: {
          $gte: new Date(startDate),
          $lte: new Date(endDate)
        }
      }).sort({ addedTime: -1 }); 
    } catch (error) {
      throw error;
    }
  };
  
  const updateInventory = async () => {
    try {
      const soldProducts = await SoldProduct.find();
      const categoryQuantities = {};
  
      soldProducts.forEach((soldProduct) => {
        const { productCategory, productQuantity } = soldProduct;
        if (productQuantity) { 
          const { value, unit } = productQuantity;
          
          const standardQuantity = convertToStandardUnit(value, unit);
          categoryQuantities[productCategory] = (categoryQuantities[productCategory] || 0) + standardQuantity;
        }
      });
  
      for (const category in categoryQuantities) {
        const quantitySold = categoryQuantities[category];
        await ProductModel.updateMany(
          { productCategory: category },
          { $inc: { 'productQuantity.value': -quantitySold } }
        );
      }
  
    } catch (error) {
      throw error;
    }
  };
  

  
module.exports = {
    viewCurrentStockNumber,
    findProductsByCategory,
    findProductsByAddedTime,
    findLowStocksByWeek,
    findRecentlyAddedProducts,
    updateInventory,
    viewLowStockProducts
};
