const sellQueries = require('../queries/sell.query')
const StatusCode = require('../../commons/utils/statusCode')
const soldProductQuery = require('../queries/sold.product.query')

const viewProducts = async () => {
  try {
    const products = await sellQueries.viewProducts();
    if (!products || products.length === 0) {
      return "No products found.";
    }
    return products;
  } catch (error) {
    throw error;
  }
};
const deleteProduct = async (id, session) => {
  try {
    const result = await sellQueries.deleteProduct(id, session);
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
const CustomerDeatils = async (body, session) => {
  try {
    const result = await sellQueries.CustomerDeatils(body, session);
    return result;
  } catch (error) {
    throw error;
  }
}

const calculateProductTotal = async (cartItems) => {
  try {
    let totalDiscountedPrice = 0;
    let detailedItems = [];

    for (const item of cartItems) {
      const { productName, quantity, manualDiscount } = item;
      const product = await sellQueries.findOneProductByName(productName);

      if (product) {
        let discount = 0;
        const category = await sellQueries.findCategoryByName(product.productCategory);
        const gstPercentage = category ? category.gstPercentage : 0;

        if (product.productDiscount) {
          discount = product.productDiscount;
        } else if (category && category.discount) {
          discount = category.discount;
        }

        if (manualDiscount !== undefined) {
          discount = manualDiscount;
        }

        let totalPriceForItem = 0;
        const quantityValue = quantity ? quantity.value : 1;

        totalPriceForItem = (product.productSellingPrice * quantityValue) + (product.productSellingPrice * gstPercentage / 100 * quantityValue);

        const discountedPrice = totalPriceForItem - (totalPriceForItem * discount / 100);
        totalDiscountedPrice += discountedPrice;

        const costPrice = product.productCost;
        const profit = discountedPrice - (costPrice * quantityValue);

        detailedItems.push({
          productName,
          category: product.productCategory,
          quantity: `${quantityValue}${quantity && quantity.unit ? ` ${quantity.unit}` : ''}`,
          totalPriceForItem: discountedPrice,
          profit,
          gstPercentage
        });
      } else {
        return {
          httpStatusCode: StatusCode.NOT_FOUND,
          message: `Product not found for productName: ${productName}`,
          status: false
        };
      }
    }

    return { totalDiscountedPrice, detailedItems };
  } catch (error) {
    throw error;
  }
};



const calculateCartTotal = async (cartItems) => {
  try {
    let totalQuantity = 0;
    let totalPrice = 0;
    const productNames = [];

    const { totalDiscountedPrice, detailedItems } = await calculateProductTotal(cartItems);

    for (const item of detailedItems) {
      const { productName, quantity, totalPriceForItem, category, profit, gstPercentage } = item;
      productNames.push(productName);

      const quantityValue = parseInt(quantity.split(' ')[0], 10);

      await sellQueries.updateProductQuantity(productName, -quantityValue);  
      await soldProductQuery.createSoldProduct(productName, quantityValue, totalPriceForItem, category, profit, gstPercentage);
    }

    totalQuantity = cartItems.length;

    totalPrice = totalDiscountedPrice;

    return { totalQuantity, totalPrice, productNames };
  } catch (error) {
    throw error;
  }
};



const sellProducts = async (cartItems) => {
  try {
    const saleTransactions = [];
    for (const item of cartItems) {
      const { productName, quantity } = item;
      const product = await sellQueries.findOneProductByName(productName);
      if (product) {
        await sellQueries.updateProductQuantity(productName, -quantity);

        const saleTransaction = {
          productName,
          quantity,
          sellingPrice: product.productSellingPrice,
          totalRevenue: product.productSellingPrice * quantity,
          transactionDate: new Date()
        };
        saleTransactions.push(saleTransaction);
      } else {
        return {
          httpStatusCode: StatusCode.NOT_FOUND,
          message: `Product not found for productName: ${productName}`,
          status: false
        };
      }
    }
    return saleTransactions;
  } catch (error) {
    throw error;
  }
};
const getTotalSales = async () => {
  try {
    const saleTransactions = await sellQueries.getAllSaleTransactions();
    let totalSales = 0;
    let totalRevenue = 0;
    for (const transaction of saleTransactions) {
      totalSales += transaction.quantity;
      totalRevenue += transaction.totalRevenue;
    }
    return { totalSales, totalRevenue, saleTransactions };
  } catch (error) {
    throw error;
  }
};


module.exports = {
  viewProducts,
  deleteProduct,
  CustomerDeatils,
  calculateProductTotal,
  calculateCartTotal,
  sellProducts,
  getTotalSales
}


































































