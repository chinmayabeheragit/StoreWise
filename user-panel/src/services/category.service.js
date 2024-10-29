const categoryQueries = require('../queries/category.query')
const customException = require('../../commons/exception/customException')
const statusCode = require('../../commons/utils/statusCode')

const addCategory = async (catData, session,email) => {
  try {
    const categoryName = catData.categoryName.toLowerCase();
    const productNames = catData.productNames.map(name => name.toLowerCase());
    let category = await categoryQueries.findOneCategory(categoryName);

    if (category) {
      const uniqueProducts = productNames.filter(
        productName => !category.productNames.some(name => name.toLowerCase() === productName)
      );

      category.productNames.push(...uniqueProducts);
      await category.save({ session });
      return category;
    } else {

      const newCategoryData = {
        ...catData,
        categoryName,
        productNames,
        email
      };
      const newCategory = await categoryQueries.addCategory(newCategoryData, session);
      return newCategory;
    }
  } catch (error) {
    throw error;
  }
};

const viewProductsName = async()=>{
    try {
        return await categoryQueries.viewProductsName();
    } catch (error) {
       throw error; 
    }
}
const viewCategory = async () => {
    try {
      return await categoryQueries.viewCategory();
    } catch (error) {
      throw error;
    }
  };
  const updatecategory = async (id, catData, session) => {
    try {
      const { categoryName, ...restCatData } = catData;
      const lowercasedCategoryName = categoryName.toLowerCase();
  
      const updatedCategoryData = {
        categoryName: lowercasedCategoryName,
        ...restCatData,
      };
  
      const result = await categoryQueries.updateCategory(id, updatedCategoryData, session);
      if (!result) {
        throw customException.error(
          statusCode.SUCCESS_CODE,
          null,
          "Category with the provided ID does not exist."
        );
      }  
      return result;
    } catch (error) {
      throw error;
    }
  };
  


const deleteCategory = async (id, session) => {
    try {
      const result =  await categoryQueries.deleteCategory(id, session);
      if (!result) {
        throw customException.error(
          statusCode.SUCCESS_CODE,
          null,
          "Category with the provided ID does not exist."
        );
      }
      return result
    } catch (error) {
      throw error;
    }
  };
module.exports = {
    addCategory,
    viewProductsName,
    viewCategory,
    updatecategory,
    deleteCategory
}