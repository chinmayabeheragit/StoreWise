const {Category} = require('../models/category.model')

const addCategory = async (catData, session) => {
    try {
      const result = new Category({
        ...catData,
      });
        return  await result.save(session);;
    } catch (error) {
        throw error;
    }
};
const findOneCategory = async (categoryName, session) => {
  try {
    return await Category.findOne({ categoryName }).session(session);
  } catch (error) {
    throw error;
  }
};

const viewProductsName = async () => {
    try {
      return await Category.find();
    } catch (error) {
      throw error;
    }
  };
  const viewCategory = async () => {
    try {
      return await Category.find();
    } catch (error) {
      throw error;
    }
  };

  const updateCategory = async (id,updateData) => {
    try {
        const updatedCategory = await Category.findOneAndUpdate(
          {_id:id},
          updateData, 
          { new: true}
        );
        return updatedCategory;
    } catch (error) {
        throw error;
    }
};

const deleteCategory = async (id) => {
  try {
    return await Category.findByIdAndDelete(id);
  } catch (error) {
    throw error;
  }
};
module.exports = {
    addCategory,
    viewProductsName,
    viewCategory,
    updateCategory,
    deleteCategory,
    findOneCategory
}