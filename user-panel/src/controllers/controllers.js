const categoryService = require('../services/category.service')
const sellService = require('../services/sell.service')
const stockService = require('../services/stock.service')
const discountService = require('../services/discount.service')
const productService = require('../services/product.service')
const soldProductService = require('../services/sold.product.service')
const dashBoardService = require('../services/dasboard.service')
const UserProfileService = require("../services/profile.service")
const AdminService = require('../services/admin.service')
const employeeService = require('../services/employee.service')
const offerService = require('../services/offer.service')
const productOfferService = require('../services/productOffer.service')

const StatusCode = require("../../commons/utils/statusCode");
const response = require("../../commons/response/response");
const mongoose = require("mongoose");


const addCategory = async (req, res) => {
  let session;
  try {
    session = await mongoose.startSession();
    session.startTransaction();

    const trimmedData = {

      ...req.body,
      categoryName: req.body.categoryName.trim(),
      productNames: req.body.productNames.map(name => name.trim()),
    };
    const result = await categoryService.addCategory(
      trimmedData,
      session,
      req.userName,
    );
    await session.commitTransaction();
    return response.handleSuccessResponse(
      { successCode: StatusCode.SUCCESS_CODE, result },
      res,
      "Category Created Successfully",
      "Category Created Successfully"
    );
  } catch (error) {
    if (session) {
      await session.abortTransaction();
    }
    if (error.code === 11000) {
      return response.handleErrorResponse(
        {
          errorCode: StatusCode.SERVER_ERROR,
          message: "Duplicate category name",
          displayMessage: "Category name already exists",
        },
        res
      );
    }
    if (error.errorCode && error.message && error.displayMessage) {
      return response.handleErrorResponse(error, res);
    } else {
      return response.handleErrorResponse(
        {
          errorCode: StatusCode.SERVER_ERROR,
          message: "Internal Server Error",
          displayMessage: "Category not created successfully",
        },
        res
      );
    }
  } finally {
    if (session) {
      session.endSession();
    }
  }
};
const viewProductsName = async (req, res) => {
  let session;
  try {
    session = await mongoose.startSession();
    session.startTransaction();

    const result = await categoryService.viewProductsName(session);

    await session.commitTransaction();

    return response.handleSuccessResponse(
      { successCode: StatusCode.SUCCESS_CODE, result },
      res,
      "Products Retrieved Successfully",
      "Products Retrieved Successfully"
    );
  } catch (error) {
    if (session) {
      await session.abortTransaction();
    }
    if (error.errorCode && error.message && error.displayMessage) {
      return response.handleErrorResponse(error, res);
    } else {
      return response.handleErrorResponse(
        {
          errorCode: StatusCode.SERVER_ERROR,
          message: "Internal Server Error",
          displayMessage: "Products Name Is Not Retrived ",
        },
        res
      );
    }
  } finally {
    if (session) {
      session.endSession();
    }
  }
};
const viewCategory = async (req, res) => {
  let session;
  try {
    session = await mongoose.startSession();
    session.startTransaction();

    const result = await categoryService.viewCategory();

    await session.commitTransaction();

    return response.handleSuccessResponse(
      { successCode: StatusCode.SUCCESS_CODE, result },
      res,
      "Category Retrieved Successfully",
      "Category Retrieved Successfully"
    );
  } catch (error) {
    if (session) {
      await session.abortTransaction();
    }
    if (error.errorCode && error.message && error.displayMessage) {
      return response.handleErrorResponse(error, res);
    } else {
      return response.handleErrorResponse(
        {
          errorCode: StatusCode.SERVER_ERROR,
          message: "Internal Server Error",
          displayMessage: "category not created succesfully",
        },
        res
      );
    }
  } finally {
    if (session) {
      session.endSession();
    }
  }
};
const deleteCategory = async (req, res) => {
  let session;
  try {
    session = await mongoose.startSession();
    session.startTransaction();

    const result = await categoryService.deleteCategory(req.params.id, session);

    await session.commitTransaction();

    return response.handleSuccessResponse(
      { successCode: StatusCode.SUCCESS_CODE, result },
      res,
      "Category Deleted Successfully",
      "Category Deleted Successfully"
    );
  } catch (error) {
    if (session) {
      await session.rollback();
    }
    if (error.errorCode && error.message && error.displayMessage) {
      return response.handleErrorResponse(error, res);
    } else {
      return response.handleErrorResponse(
        {
          errorCode: StatusCode.SERVER_ERROR,
          message: "Internal Server Error",
          displayMessage: "category not created succesfully",
        },
        res
      );
    }
  } finally {
    if (session) {
      session.endSession();
    }
  }
};
const updatecategory = async (req, res) => {
  let session;
  try {
    session = await mongoose.startSession();
    session.startTransaction();
    const result = await categoryService.updatecategory(
      req.params.id,
      req.body,
      session,
    );
    await session.commitTransaction();
    if (!result) {
      return response.handleErrorResponse(
        { errorCode: StatusCode.NOT_FOUND, message: "Category not found" },
        res
      );
    }
    return response.handleSuccessResponse(
      { successCode: StatusCode.SUCCESS_CODE, result },
      res,
      "Category Updated Successfully",
      "Category Updated Successfully"
    );
  } catch (error) {
    if (session) {
      await session.abortTransaction();
    }
    if (error.errorCode && error.message && error.displayMessage) {
      return response.handleErrorResponse(error, res);
    } else {
      return response.handleErrorResponse(
        {
          errorCode: StatusCode.SERVER_ERROR,
          message: "Internal Server Error",
          displayMessage: "category not created succesfully",
        },
        res
      );
    }
  } finally {
    if (session) {
      session.endSession();
    }
  }
};


const CustomerDetails = async (req, res) => {
  let session;
  try {
    session = await mongoose.startSession();
    session.startTransaction();
    const result = await sellService.CustomerDeatils(
      req.body,
      session
    );
    await session.commitTransaction();
    return response.handleSuccessResponse(
      { successCode: StatusCode.SUCCESS_CODE, result },
      res,
      "Customer Deatails Added Succesfully",
      "Customer Deatails Added Succesfully"
    );
  } catch (error) {
    if (session) {
      await session.abortTransaction();
    }
    if (error.errorCode && error.message && error.displayMessage) {
      return response.handleErrorResponse(error, res);
    } else {
      return response.handleErrorResponse(
        {
          errorCode: StatusCode.SERVER_ERROR,
          message: "Internal Server Error",
          displayMessage: "Category not created successfully",
        },
        res
      );
    }
  } finally {
    if (session) {
      session.endSession();
    }
  }
};
const calculateProductTotal = async (req, res) => {
  let session;
  try {
    session = await mongoose.startSession();
    session.startTransaction();

    const { cartItems } = req.body;
    if (!Array.isArray(cartItems)) {
      throw {
        errorCode: StatusCode.BAD_REQUEST,
        message: "Invalid request payload",
        displayMessage: "Invalid request payload: cartItems should be an array",
      };
    }
    const result = await sellService.calculateProductTotal(cartItems,session);
    await session.commitTransaction();

    return response.handleSuccessResponse(
      { successCode: StatusCode.SUCCESS_CODE, result },
      res,
      "This Is The Total Price Of The Product",
      "This Is The Total Price Of The Product"
    );
  } catch (error) {
    if (session) {
      await session.abortTransaction();
    }
    if (error.errorCode && error.message && error.displayMessage) {
      return response.handleErrorResponse(error, res);
    } else {
      return response.handleErrorResponse(
        {
          errorCode: StatusCode.SERVER_ERROR,
          message: "Internal Server Error",
          displayMessage: "Not Getting Total Product Price",
        },
        res
      );
    }
  } finally {
    if (session) {
      session.endSession();
    }
  }
};
const calculateCartTotal = async (req, res) => {
  let session;
  try {
    session = await mongoose.startSession();
    session.startTransaction();

    const { cartItems } = req.body;
    if (!Array.isArray(cartItems)) {
      throw {
        errorCode: StatusCode.BAD_REQUEST,
        message: "Invalid request payload",
        displayMessage: "Invalid request payload: cartItems should be an array",
      };
    }
    
    const result = await sellService.calculateCartTotal(cartItems, session);
    await session.commitTransaction();

    return response.handleSuccessResponse(
      { successCode: StatusCode.SUCCESS_CODE, result },
      res,
      "Total Price of Cart",
      "Total Price of Cart"
    );
  } catch (error) {
    if (session) {
      await session.abortTransaction();
    }
    if (error.errorCode && error.message && error.displayMessage) {
      return response.handleErrorResponse(error, res);
    } else {
      return response.handleErrorResponse(
        {
          errorCode: StatusCode.SERVER_ERROR,
          message: "Internal Server Error",
          displayMessage: "Not Getting Total Cart Price",
        },
        res
      );
    }
  } finally {
    if (session) {
      session.endSession();
    }
  }
};

const viewAllSoldProducts = async (req, res) => {
  let session;
  try {
    session = await mongoose.startSession();
    session.startTransaction()
    const soldProducts = await soldProductService.getAllSoldProducts();
    await session.commitTransaction();
    return response.handleSuccessResponse(
      { successCode: StatusCode.SUCCESS_CODE, soldProducts },
      res,
      "All sold products retrieved successfully",
      "All sold products retrieved successfully"
    );
  } catch (error) {
    if (session) {
      await session.abortTransaction();
    }
    if (error.errorCode && error.message && error.displayMessage) {
      return response.handleErrorResponse(error, res);
    } else {
      return response.handleErrorResponse(
        {
          errorCode: StatusCode.SERVER_ERROR,
          message: "Internal Server Error",
          displayMessage: "Category not created successfully",
        },
        res
      );
    }
  } finally {
    if (session) {
      session.endSession();
    }
  }
};
const deleteSoldProduct = async (req, res) => {
  let session;
  try {
    session = await mongoose.startSession();
    session.startTransaction();
    const { soldProductId } = req.params;
    const deletedProduct = await soldProductService.deleteSoldProductById(soldProductId);
    await session.commitTransaction();

    if (deletedProduct) {
      return response.handleSuccessResponse(
        { successCode: StatusCode.SUCCESS_CODE },
        res,
        "Sold product deleted successfully",
        "Sold product deleted successfully"
      );
    } else {
      return response.handleErrorResponse(
        {
          errorCode: StatusCode.NOT_FOUND,
          message: "Sold product not found",
          displayMessage: "Sold product not found",
        },
        res
      );
    }
  } catch (error) {
    if (session) {
      await session.abortTransaction();
    }
    if (error.errorCode && error.message && error.displayMessage) {
      return response.handleErrorResponse(error, res);
    } else {
      return response.handleErrorResponse(
        {
          errorCode: StatusCode.SERVER_ERROR,
          message: "Internal Server Error",
          displayMessage: "Category not created successfully",
        },
        res
      );
    }
  } finally {
    if (session) {
      session.endSession();
    }
  }
};


const viewCurrentStockNumber = async (req, res) => {
  let session;
  try {
    session = await mongoose.startSession();
    session.startTransaction();
    const result = await stockService.viewCurrentStockNumber();
    await session.commitTransaction();
    return response.handleSuccessResponse(
      { successCode: StatusCode.SUCCESS_CODE, result },
      res,
      "Current stock number",
      "Current stock number"
    );
  } catch (error) {
    if (session) {
      await session.abortTransaction();
    }
    if (error.errorCode && error.message && error.displayMessage) {
      return response.handleErrorResponse(error, res);
    } else {
      return response.handleErrorResponse(
        {
          errorCode: StatusCode.SERVER_ERROR,
          message: "Internal Server Error",
          displayMessage: "Failed to retrieve current stock number",
        },
        res
      );
    }
  } finally {
    if (session) {
      session.endSession();
    }
  }
};

const viewProductsByCategory = async (req, res) => {
  let session;
  try {
    session = await mongoose.startSession();
    session.startTransaction();
    const { categoryName } = req.params;
    const result = await stockService.getProductsByCategory(categoryName,
      session,
    );
    await session.commitTransaction();
    return response.handleSuccessResponse(
      { successCode: StatusCode.SUCCESS_CODE, result },
      res,
      "Product By Category Retrive Successfully",
      "Product By Category Retrive Successfully"
    );
  } catch (error) {
    if (session) {
      await session.abortTransaction();
    }
    if (error.errorCode && error.message && error.displayMessage) {
      return response.handleErrorResponse(error, res);
    } else {
      return response.handleErrorResponse(
        {
          errorCode: StatusCode.SERVER_ERROR,
          message: "Internal Server Error",
          displayMessage: "Category not created successfully",
        },
        res
      );
    }
  } finally {
    if (session) {
      session.endSession();
    }
  }
};
const viewLowStockProductsNumber = async (req, res) => {
  let session;
  try {
    session = await mongoose.startSession();
    session.startTransaction();
    const result = await stockService.viewLowStockProductsNumber();
    await session.commitTransaction();
    return response.handleSuccessResponse(
      { successCode: StatusCode.SUCCESS_CODE, result },
      res
    );
  } catch (error) {
    if (session) {
      await session.abortTransaction();
    }
    if (error.errorCode && error.message && error.displayMessage) {
      return response.handleErrorResponse(error, res);
    } else {
      return response.handleErrorResponse(
        {
          errorCode: StatusCode.SERVER_ERROR,
          message: "Internal Server Error",
          displayMessage: "Failed to retrieve low stock products",
        },
        res
      );
    }
  } finally {
    if (session) {
      session.endSession();
    }
  }
};

const getCurrentStocksByWeek = async (req, res) => {
  let session;
  try {
    session = await mongoose.startSession();
    session.startTransaction();
    const { startDate } = req.params;
    const result = await stockService.getCurrentStocksByWeek(startDate);
    await session.commitTransaction();

    return response.handleSuccessResponse(
      { successCode: StatusCode.SUCCESS_CODE, result },
      res
    );
  } catch (error) {
    if (session) {
      await session.abortTransaction();
    }
    if (error.errorCode && error.message && error.displayMessage) {
      return response.handleErrorResponse(error, res);
    } else {
      return response.handleErrorResponse(
        {
          errorCode: StatusCode.SERVER_ERROR,
          message: "Internal Server Error",
          displayMessage: "Category not created successfully",
        },
        res
      );
    }
  } finally {
    if (session) {
      session.endSession();
    }
  }
};
const getLowStocksByWeek = async (req, res) => {
  let session;
  try {
    session = await mongoose.startSession();
    session.startTransaction();
    const { startDate } = req.params;
    const result = await stockService.getLowStocksByWeek(startDate);
    await session.commitTransaction();

    return response.handleSuccessResponse(
      { successCode: StatusCode.SUCCESS_CODE, result },
      res
    );
  } catch (error) {
    if (session) {
      await session.abortTransaction();
    }
    if (error.errorCode && error.message && error.displayMessage) {
      return response.handleErrorResponse(error, res);
    } else {
      return response.handleErrorResponse(
        {
          errorCode: StatusCode.SERVER_ERROR,
          message: "Internal Server Error",
          displayMessage: "Category not created successfully",
        },
        res
      );
    }
  } finally {
    if (session) {
      session.endSession();
    }
  }
};
const getRecentlyAddedProducts = async (req, res) => {
  let session;

  try {
    session = await mongoose.startSession();
    session.startTransaction();
    const { startDate } = req.params;
    const result = await stockService.getRecentlyAddedProducts(startDate);
    await session.commitTransaction();

    return response.handleSuccessResponse(
      { successCode: StatusCode.SUCCESS_CODE, result },
      res
    );
  } catch (error) {
    if (session) {
      await session.abortTransaction();
    }
    if (error.errorCode && error.message && error.displayMessage) {
      return response.handleErrorResponse(error, res);
    } else {
      return response.handleErrorResponse(
        {
          errorCode: StatusCode.SERVER_ERROR,
          message: "Internal Server Error",
          displayMessage: "Category not created successfully",
        },
        res
      );
    }
  } finally {
    if (session) {
      session.endSession();
    }
  }
};
const UpdateInventoryQuantity = async (req, res) => {
  let session;
  try {
    session = await mongoose.startSession();
    session.startTransaction();

    const result = await stockService.UpdateInventoryQuantity();

    await session.commitTransaction();

    return response.handleSuccessResponse(
      {
        successCode: StatusCode.SUCCESS_CODE,
        result
      },
      res,
      "Product sold successfully and inventory updated."
    );
  } catch (error) {
    if (session) {
      await session.abortTransaction();
    }
    if (error.errorCode && error.message && error.displayMessage) {
      return response.handleErrorResponse(error, res);
    } else {
      return response.handleErrorResponse(
        {
          errorCode: StatusCode.SERVER_ERROR,
          message: "Internal Server Error",
          displayMessage: "Category not created successfully",
        },
        res
      );
    }
  } finally {
    if (session) {
      session.endSession();
    }
  }
};


const addProductDiscount = async (req, res) => {
  let session;
  try {
    session = await mongoose.startSession();
    session.startTransaction();

    const { categoryName, productName, productDiscount } = req.body;

    if (typeof categoryName !== 'string' || typeof productName !== 'string' || typeof productDiscount !== 'number') {
      throw new Error('categoryName, productName, and productDiscount must be provided with correct types.');
    }

    const result = await discountService.addProductDiscount(
      categoryName,
      productName,
      productDiscount,
      session
    );

    await session.commitTransaction();

    return response.handleSuccessResponse(
      { successCode: StatusCode.SUCCESS_CODE, result },
      res,
      "Product Discount Added Successfully",
      "Product Discount Added Successfully"
    );
  } catch (error) {
    if (session) {
      await session.abortTransaction();
    }
    if (error.code === 11000) {
      return response.handleErrorResponse(
        {
          errorCode: StatusCode.SERVER_ERROR,
          message: "Duplicate product discount",
          displayMessage: "Product discount already exists",
        },
        res
      );
    }
    if (error.message) {
      return response.handleErrorResponse(
        {
          errorCode: StatusCode.BAD_REQUEST,
          message: error.message,
          displayMessage: error.message,
        },
        res
      );
    } else {
      return response.handleErrorResponse(
        {
          errorCode: StatusCode.SERVER_ERROR,
          message: "Internal Server Error",
          displayMessage: "Product discount not added successfully",
        },
        res
      );
    }
  } finally {
    if (session) {
      session.endSession();
    }
  }
};


const addCategoryDiscount = async (req, res) => {
  let session;
  try {
    session = await mongoose.startSession();
    session.startTransaction();

    const { categoryName, discount } = req.body;

    const result = await discountService.addCategoryDiscount(
      categoryName,
      discount,
      session,
    );
    await session.commitTransaction();

    return response.handleSuccessResponse(
      { successCode: StatusCode.SUCCESS_CODE, result },
      res,
      "Category Discount Added Successfully",
      "Category Discount Added Successfully"
    );
  } catch (error) {
    if (session) {
      await session.abortTransaction();
    }
    if (error.code === 11000) {
      return response.handleErrorResponse(
        {
          errorCode: StatusCode.SERVER_ERROR,
          message: "Duplicate category discount",
          displayMessage: "Category discount already exists",
        },
        res
      );
    }
    if (error.errorCode && error.message && error.displayMessage) {
      return response.handleErrorResponse(error, res);
    } else {
      return response.handleErrorResponse(
        {
          errorCode: StatusCode.SERVER_ERROR,
          message: "Internal Server Error",
          displayMessage: "Category discount not added successfully",
        },
        res
      );
    }
  } finally {
    if (session) {
      session.endSession();
    }
  }
};

const getCategoryDiscounts = async (req, res) => {
  try {
    const categoryDiscounts = await discountService.getCategoryDiscounts();
    return response.handleSuccessResponse(
      { successCode: StatusCode.SUCCESS_CODE, categoryDiscounts },
      res,
      "Category Discounts Retrieved Successfully",
      "Category Discounts Retrieved Successfully"
    );
  } catch (error) {
    return response.handleErrorResponse(
      {
        errorCode: StatusCode.SERVER_ERROR,
        message: "Internal Server Error",
        displayMessage: "Failed to retrieve category discounts",
      },
      res
    );
  }
};

const viewProductDiscount = async (req, res) => {
  try {
    const productDiscounts = await discountService.getProductDiscounts();
    return response.handleSuccessResponse(
      { successCode: StatusCode.SUCCESS_CODE, productDiscounts },
      res,
      "Product Discounts Retrieved Successfully",
      "Product Discounts Retrieved Successfully"
    );
  } catch (error) {

    return response.handleErrorResponse(
      {
        errorCode: StatusCode.SERVER_ERROR,
        message: "Internal Server Error",
        displayMessage: "Failed to retrieve product discounts",
      },
      res
    );
  }
};

const updateCategoryDiscount = async (req, res) => {
  const { categoryName, newDiscount } = req.body;

  try {
    const updatedDiscount = await discountService.updateCategoryDiscount(categoryName, newDiscount);
    return response.handleSuccessResponse(
      { successCode: StatusCode.SUCCESS_CODE, updatedDiscount },
      res,
      "Category Discount Updated Successfully",
      "Category Discount Updated Successfully"
    );
  } catch (error) {

    return response.handleErrorResponse(
      {
        errorCode: StatusCode.SERVER_ERROR,
        message: "Internal Server Error",
        displayMessage: "Failed to update category discount",
      },
      res
    );
  }
};

const updateProductDiscount = async (req, res) => {
  const { categoryName, productName, newDiscount } = req.body;

  try {
    const updatedDiscount = await discountService.updateProductDiscount(categoryName, productName, newDiscount);
    if (!updatedDiscount) {
      return response.handleErrorResponse(
        {
          errorCode: StatusCode.NOT_FOUND,
          message: "Product Discount Not Found",
          displayMessage: "Failed to update product discount",
        },
        res
      );
    }
    return response.handleSuccessResponse(
      { successCode: StatusCode.SUCCESS_CODE, updatedDiscount },
      res,
      "Product Discount Updated Successfully",
      "Product Discount Updated Successfully"
    );
  } catch (error) {
    return response.handleErrorResponse(
      {
        errorCode: StatusCode.SERVER_ERROR,
        message: "Internal Server Error",
        displayMessage: "Failed to update product discount",
      },
      res
    );
  }
};
const deleteProductDiscount = async (req, res) => {
  const { categoryName, productName } = req.body;

  try {
    const deletedDiscount = await discountService.deleteProductDiscount(categoryName, productName);
    return response.handleSuccessResponse(
      { successCode: StatusCode.SUCCESS_CODE, deletedDiscount },
      res,
      "Product Discount Deleted Successfully",
      "Product Discount Deleted Successfully"
    );
  } catch (error) {

    return response.handleErrorResponse(
      {
        errorCode: StatusCode.SERVER_ERROR,
        message: "Internal Server Error",
        displayMessage: "Failed to delete product discount",
      },
      res
    );
  }
};

const deleteCategoryDiscount = async (req, res) => {
  const { categoryName } = req.body;

  try {
    const deletedDiscount = await discountService.deleteCategoryDiscount(categoryName);
    return response.handleSuccessResponse(
      { successCode: StatusCode.SUCCESS_CODE, deletedDiscount },
      res,
      "Category Discount Deleted Successfully",
      "Category Discount Deleted Successfully"
    );
  } catch (error) {

    return response.handleErrorResponse(
      {
        errorCode: StatusCode.SERVER_ERROR,
        message: "Internal Server Error",
        displayMessage: "Failed to delete category discount",
      },
      res
    );
  }
};



const addProduct = async (req, res) => {
  let session;
  try {
    session = await mongoose.startSession();
    session.startTransaction();
    const result = await productService.addProduct(
      req.body,
      session,
      req.userName
    );
    await session.commitTransaction();
    return response.handleSuccessResponse(
      { successCode: StatusCode.SUCCESS_CODE, result },
      res,
      "Product added successfully."
    );
  } catch (error) {
    if (session) {
      await session.abortTransaction();
    }
    if (error.errorCode && error.message && error.displayMessage) {
      return response.handleErrorResponse(error, res);
    } else {
      return response.handleErrorResponse(
        { errorCode: StatusCode.SERVER_ERROR, message: "Internal Server Error" },
        res
      );
    }
  } finally {
    if (session) {
      session.endSession();
    }
  }
};
const editProduct = async (req, res) => {
  let session;
  try {
    const updatedProduct = await productService.editProduct(
      req.params.id,
      req.body
    );
    return response.handleSuccessResponse(
      { successCode: StatusCode.SUCCESS_CODE, updatedProduct },
      res
    );
  } catch (error) {
    if (session) {
      await session.abortTransaction();
    }
    if (error.errorCode && error.message && error.displayMessage) {
      return response.handleErrorResponse(error, res);
    } else {
      return response.handleErrorResponse(
        { errorCode: StatusCode.SERVER_ERROR, message: "Internal Server Error" },
        res
      );
    }
  } finally {
    if (session) {
      session.endSession();
    }
  }
};
const viewProductById = async (req, res) => {
  let session;
  try {
    const product = await productService.viewProductById(req.params.id);
    return response.handleSuccessResponse(
      { successCode: StatusCode.SUCCESS_CODE, product },
      res
    );
  } catch (error) {
    if (session) {
      await session.abortTransaction();
    }
    if (error.errorCode && error.message && error.displayMessage) {
      return response.handleErrorResponse(error, res);
    } else {
      return response.handleErrorResponse(
        { errorCode: StatusCode.SERVER_ERROR, message: "Internal Server Error" },
        res
      );
    }
  } finally {
    if (session) {
      session.endSession();
    }
  }
};

const getAllProducts = async (req, res) => {
  let session;
  try {
    session = await mongoose.startSession();
    session.startTransaction();

    const results = await productService.getAllProducts();

    await session.commitTransaction();

    return response.handleSuccessResponse(
      { successCode: StatusCode.SUCCESS_CODE, results },
      res,
      "Products Retrieved Successfully",
      "Products Retrieved Successfully"
    );
  } catch (error) {
    if (session) {
      await session.abortTransaction();
    }
    if (error.errorCode && error.message && error.displayMessage) {
      return response.handleErrorResponse(error, res);
    } else {
      return response.handleErrorResponse(
        {
          errorCode: StatusCode.SERVER_ERROR,
          message: "Internal Server Error",
          displayMessage: "Category not created successfully",
        },
        res
      );
    }
  } finally {
    if (session) {
      session.endSession();
    }
  }
};
const deleteProduct = async (req, res) => {
  let session;
  try {
    session = await mongoose.startSession();
    session.startTransaction();
    const result = await sellService.deleteProduct(req.params.id);
    await session.commitTransaction();
    return response.handleSuccessResponse(
      { successCode: StatusCode.SUCCESS_CODE, result },
      res,
      "Product Deleted Successfully",
      "Product Deleted Successfully"
    );
  } catch (error) {
    if (session) {
      await session.abortTransaction();
    }
    if (error.errorCode && error.message && error.displayMessage) {
      return response.handleErrorResponse(error, res);
    } else {
      return response.handleErrorResponse(
        {
          errorCode: StatusCode.SERVER_ERROR,
          message: "Internal Server Error",
          displayMessage: "product not deleted",
        },
        res
      );
    }
  } finally {
    if (session) {
      session.endSession();
    }
  }
};
const getTotalProfit = async (req, res) => {
  let session;
  try {
    session = await mongoose.startSession();
    session.startTransaction();

    const profit = await dashBoardService.getTotalProfit();

    await session.commitTransaction();

    return response.handleSuccessResponse(
      { profit },
      res,
      "Total profit calculated successfully."
    );
  } catch (error) {
    if (session) {
      await session.abortTransaction();
    }
    if (error.errorCode && error.message && error.displayMessage) {
      return response.handleErrorResponse(error, res);
    } else {
      return response.handleErrorResponse(
        {
          errorCode: StatusCode.SERVER_ERROR,
          message: error.message,
          displayMessage: "Failed to calculate total profit",
        },
        res
      );
    }
  } finally {
    if (session) {
      session.endSession();
    }
  }
};


const getToatlRevenue = async (req, res) => {
  let session;
  try {
    session = await mongoose.startSession();
    session.startTransaction();
    const totalPrice = await dashBoardService.getToatlRevenue();
    await session.commitTransaction();
    return response.handleSuccessResponse(
      { totalPrice },
      res,
      "Total price of sold products calculated successfully"
    );
  } catch (error) {
    if (session) {
      await session.abortTransaction();
    }
    if (error.errorCode && error.message && error.displayMessage) {
      return response.handleErrorResponse(error, res);
    } else {
      return response.handleErrorResponse(
        {
          errorCode: StatusCode.SERVER_ERROR,
          message: "Internal Server Error",
          displayMessage: "Category not created successfully",
        },
        res
      );
    }
  } finally {
    if (session) {
      session.endSession();
    }
  }
};
const getRemainingDaysUntilExpiry = async (req, res) => {
  let session;
  try {
    session = await mongoose.startSession()
    session.startTransaction();
    const result = await dashBoardService.getRemainingDaysUntilExpiry();
    await session.commitTransaction();
    return response.handleSuccessResponse(
      { result },
      res,
      "date calculated successfully."
    );
  } catch (error) {
    if (session) {
      await session.abortTransaction();
    }
    if (error.errorCode && error.message && error.displayMessage) {
      return response.handleErrorResponse(error, res)
    } else {
      return response.handleErrorResponse(
        {
          errorCode: StatusCode.SERVER_ERROR,
          message: "Internal Server Error",
          displayMessage: "Failed to get remaining days until expiry",
        },
        res
      )
    }
  } finally {
    if (session) {
      session.endSession();
    }
  }
};
const getTrendingProducts = async (req, res) => {
  let session;
  try {
    session = await mongoose.startSession()
    session.startTransaction();
    const result = await dashBoardService.getTrendingProducts();
    return response.handleSuccessResponse(
      { result },
      res,
      "these are the trending product."
    );
  } catch (error) {
    if (session) {
      await session.abortTransaction();
    }
    if (error.errorCode && error.message && error.displayMessage) {
      return response.handleErrorResponse(error, res)
    } else {
      return response.handleErrorResponse(
        {
          errorCode: StatusCode.SERVER_ERROR, message: error.message
        },
        res
      )
    }
  } finally {
    if (session) {
      session.endSession();
    }
  }
};
const topSellingCategories = async (req, res) => {
  let session;
  try {
    session = await mongoose.startSession();
    session.startTransaction();
    const result = await dashBoardService.topSellingCategories();
    await session.commitTransaction();
    return response.handleSuccessResponse(
      { result },
      res,
      "Top selling category retrieved successfully."
    );
  } catch (error) {
    if (session) {
      await session.abortTransaction();
    }
    return response.handleErrorResponse(error, res);
  } finally {
    if (session) {
      session.endSession();
    }
  }
};


const createProfile = async (req, res) => {
  let session;
  try {
    session = await mongoose.startSession();
    session.startTransaction();
    const result = await UserProfileService.createProfile(
      req.body,
      session,
      req.userName
    );
    await session.commitTransaction();
    return response.handleSuccessResponse(
      { successCode: StatusCode.SUCCESS_CODE, result },
      res
    );
  } catch (error) {
    if (session) {
      await session.abortTransaction();
    }
    if (error.errorCode && error.message && error.displayMessage) {
      return response.handleErrorResponse(error, res);
    } else {
      return response.handleErrorResponse(
        {
          errorCode: StatusCode.SERVER_ERROR,
          message: "Internal Server Error",
          displayMessage: "profile not created successfully",
        },
        res
      );
    }
  } finally {
    if (session) {
      session.endSession();
    }
  }
};
const updateProfile = async (req, res) => {
  let session
  try {
    const result = await UserProfileService.updateProfile(
      req.params.id,
      req.body,
    );
    return response.handleSuccessResponse(
      { successCode: StatusCode.SUCCESS_CODE, result },
      res
    );
  } catch (error) {
    if (session) {
      await session.abortTransaction();
    }
    if (error.errorCode && error.message && error.displayMessage) {
      return response.handleErrorResponse(error, res);
    } else {
      return response.handleErrorResponse(
        { errorCode: statusCode.SERVER_ERROR, message: "Internal Server Error" },
        res
      );
    }
  } finally {
    if (session) {
      session.endSession();
    }
  }
};
const viewUserProfile = async (req, res) => {
  let session;
  try {
    const result = await UserProfileService.viewUserProfile();
    return response.handleSuccessResponse(
      { successCode: StatusCode.SUCCESS_CODE, result },
      res
    );
  } catch (error) {
    if (session) {
      await session.abortTransaction();
    }
    if (error.errorCode && error.message && error.displayMessage) {
      return response.handleErrorResponse(error, res);
    } else {
      return response.handleErrorResponse(
        { errorCode: statusCode.SERVER_ERROR, message: "Internal Server Error" },
        res
      );
    }
  } finally {
    if (session) {
      session.endSession();
    }
  }
};
const viewUserProfileById = async (req, res) => {
  let session;
  try {
    const result = await UserProfileService.viewUserProfileById(
      req.params.id,
    );
    return response.handleSuccessResponse(
      { successCode: StatusCode.SUCCESS_CODE, result },
      res
    );
  } catch (error) {
    if (session) {
      await session.abortTransaction();
    }
    if (error.errorCode && error.message && error.displayMessage) {
      return response.handleErrorResponse(error, res);
    } else {
      return response.handleErrorResponse(
        { errorCode: statusCode.SERVER_ERROR, message: "Internal Server Error" },
        res
      );
    }
  } finally {
    if (session) {
      session.endSession();
    }
  }
};

const Adminlogin = async (req, res) => {
  let session;
  try {
    session = await mongoose.startSession();
    session.startTransaction()
    const result = await AdminService.login(req.body);
    await session.commitTransaction();
    return response.handleSuccessResponse(
      { successCode: StatusCode.SUCCESS_CODE, result },
      res,
      "admin login successfully."
    );
  } catch (error) {
    if (session) {
      await session.abortTransaction();
    }
    if (error.errorCode && error.message && error.displayMessage) {
      return response.handleErrorResponse(error, res);
    } else {
      return response.handleErrorResponse(
        { errorCode: StatusCode.SERVER_ERROR, message: "Internal Server Error" },
        res
      );
    }
  } finally {
    if (session) {
      session.endSession();
    }
  }
};
const Employeelogin = async (req, res) => {
  let session;
  try {
    session = await mongoose.startSession();
    session.startTransaction()
    const result = await employeeService.employeelogin(req.body);
    await session.commitTransaction();
    return response.handleSuccessResponse(
      { successCode: StatusCode.SUCCESS_CODE, result },
      res,
      "employee login successfully."
    );
  } catch (error) {
    if (session) {
      await session.abortTransaction();
    }
    if (error.errorCode && error.message && error.displayMessage) {
      return response.handleErrorResponse(error, res);
    } else {
      return response.handleErrorResponse(
        { errorCode: StatusCode.SERVER_ERROR, message: "Internal Server Error" },
        res
      );
    }
  } finally {
    if (session) {
      session.endSession();
    }
  }
};

const forgotPassword = async (req, res) => {
  let session;
  try {
    session = await mongoose.startSession();
    session.startTransaction()
      const result = await AdminService.fogotPassword(req.body)
      await session.commitTransaction();
      return response.handleSuccessResponse(
          {successCode: StatusCode.SUCCESS_CODE,result},
          res,
          "Reset link sent successfully",
          "Reset link sent successfully"
      );
  } catch (error) {
    if (session) {
      await session.abortTransaction();
    }
    if (error.errorCode && error.message && error.displayMessage) {
      return response.handleErrorResponse(error, res);
    } else {
      return response.handleErrorResponse(
        { errorCode: StatusCode.SERVER_ERROR, message: "Internal Server Error" },
        res
      );
    }
  } finally {
    if (session) {
      session.endSession();
    }
  }
};

const userPasswordReset = async (req, res) => {
  let session;
  try {
    session = await mongoose.startSession();
    session.startTransaction()
      const result = await AdminService.userPasswordReset(req)
      await session.commitTransaction();
      return response.handleSuccessResponse(
          {successCode: StatusCode.SUCCESS_CODE,result},
          res,
          "Password changed successfully",
          "Password changed successfully"
      );
  } catch (error) {
    if (session) {
      await session.abortTransaction();
    }
    if (error.errorCode && error.message && error.displayMessage) {
      return response.handleErrorResponse(error, res);
    } else {
      return response.handleErrorResponse(
        { errorCode: StatusCode.SERVER_ERROR, message: "Internal Server Error" },
        res
      );
    }
  } finally {
    if (session) {
      session.endSession();
    }
  }
};

const addEmployee = async (req, res) => {
  let session;
  try {
    session = await mongoose.startSession();
    session.startTransaction();
    const result = await employeeService.addEmployee(req.body, session);
    await session.commitTransaction();
    return response.handleSuccessResponse(
      { successCode: StatusCode.SUCCESS_CODE, result },
      res,
      "Employee added successfully."
    );
  } catch (error) {

    if (session) {
      await session.abortTransaction();
    }
    if (error.errorCode && error.message && error.displayMessage) {
      return response.handleErrorResponse(error, res);
    } else {
      return response.handleErrorResponse(
        { errorCode: StatusCode.SERVER_ERROR, message: "Internal Server Error" },
        res
      );
    }
  } finally {
    if (session) {
      session.endSession();
    }
  }
};

const updateEmployee = async (req, res) => {
  let session;
  try {
    session = await mongoose.startSession();
    session.startTransaction();
    const result = await employeeService.updateEmployee(req.params.id, req.body, session);
    await session.commitTransaction();
    return response.handleSuccessResponse(
      { successCode: StatusCode.SUCCESS_CODE, result },
      res,
      "Employee updated successfully."
    );
  } catch (error) {
    if (session) {
      await session.abortTransaction();
    }
    if (error.errorCode && error.message && error.displayMessage) {
      return response.handleErrorResponse(error, res);
    } else {
      return response.handleErrorResponse(
        { errorCode: StatusCode.SERVER_ERROR, message: "Internal Server Error" },
        res
      );
    }
  } finally {
    if (session) {
      session.endSession();
    }
  }
};

const viewEmployeeById = async (req, res) => {
  try {
    const { id } = req.params;
    const employee = await employeeService.getEmployeeById(id);
    if (!employee) {
      return response.handleNotFoundResponse(
        "Employee not found",
        res
      );
    }
    return response.handleSuccessResponse(
      { successCode: StatusCode.SUCCESS_CODE, employee },
      res,
      "Employee retrieved successfully."
    );
  } catch (error) {
    return response.handleErrorResponse(
      { errorCode: StatusCode.SERVER_ERROR, message: "Internal Server Error" },
      res
    );
  }
};
const viewAllEmployees = async (req, res) => {
  try {
    const employees = await employeeService.getAllEmployees();
    return response.handleSuccessResponse(
      { successCode: StatusCode.SUCCESS_CODE, employees },
      res,
      "Employees retrieved successfully."
    );
  } catch (error) {
    return response.handleErrorResponse(
      { errorCode: StatusCode.SERVER_ERROR, message: "Internal Server Error" },
      res
    );
  }
};
const deleteEmployee = async (req, res) => {
  try {
    const { id } = req.params;
    await employeeService.deleteEmployeeById(id);
    return response.handleSuccessResponse(
      { successCode: StatusCode.SUCCESS_CODE },
      res,
      "Employee deleted successfully."
    );
  } catch (error) {

    return response.handleErrorResponse(
      { errorCode: StatusCode.SERVER_ERROR, message: "Internal Server Error" },
      res
    );
  }
};

const viewCurrentStockNumberWithIncrease = async (req, res) => {
  let session;
  try {
    session = await mongoose.startSession();
    session.startTransaction();
    const { totalUnsold, increasePercentage } = await stockService.viewCurrentStockNumberWithIncrease();
    await session.commitTransaction();
    return response.handleSuccessResponse(
      { totalUnsold, increasePercentage },
      res,
      "Current stock number with increase percentage",
      "Current stock number with increase percentage"
    );
  } catch (error) {
    if (session) {
      await session.abortTransaction();
    }
    if (error.errorCode && error.message && error.displayMessage) {
      return response.handleErrorResponse(error, res);
    } else {
      return response.handleErrorResponse(
        {
          errorCode: StatusCode.SERVER_ERROR,
          message: "Internal Server Error",
          displayMessage: "Failed to retrieve current stock number with increase percentage",
        },
        res
      );
    }
  } finally {
    if (session) {
      session.endSession();
    }
  }
};

const addOffer = async (req, res) => {
  const session = await mongoose.startSession();
  try {
    session.startTransaction();
    const result = await offerService.addOffer(req.body, session);
    await session.commitTransaction();
    session.endSession();
    return response.handleSuccessResponse(
      { successCode: StatusCode.SUCCESS_CODE, result },
      res
    );
  } catch (error) {
    if (session) {
      await session.abortTransaction();
    }
    if (error.errorCode && error.message && error.displayMessage) {
      return response.handleErrorResponse(error, res);
    } else {
      return response.handleErrorResponse(
        { errorCode: StatusCode.SERVER_ERROR, message: "Internal Server Error" },
        res
      );
    }
  } finally {
    if (session) {
      session.endSession();
    }
  }
};
const viewOffer = async (req, res) => {
  let session;
  try {
    const result = await offerService.viewOffer();
    return response.handleSuccessResponse(
      { successCode: StatusCode.SUCCESS_CODE, result },
      res
    );
  } catch (error) {
    if (session) {
      await session.abortTransaction();
    }
    if (error.errorCode && error.message && error.displayMessage) {
      return response.handleErrorResponse(error, res);
    } else {
      return response.handleErrorResponse(
        {
          errorCode: StatusCode.SERVER_ERROR,
          message: "Internal Server Error",
          displayMessage: "Banner not created successfully",
        },
        res
      );
    }
  } finally {
    if (session) {
      session.endSession();
    }
  }
};
const editOffer = async (req, res) => {
  let session;
  try {
    const result = await offerService.editOffer(
      req.params.id,
      req.body
    );
    return response.handleSuccessResponse(
      { successCode: StatusCode.SUCCESS_CODE, result },
      res
    );
  } catch (error) {
    if (session) {
      await session.abortTransaction();
    }
    if (error.errorCode && error.message && error.displayMessage) {
      return response.handleErrorResponse(error, res);
    } else {
      return response.handleErrorResponse(
        { errorCode: StatusCode.SERVER_ERROR, message: "Internal Server Error" },
        res
      );
    }
  } finally {
    if (session) {
      session.endSession();
    }
  }
};
const deleteOffer = async (req, res) => {
  let session;
  try {
    const result = await offerService.deleteOffer(req.params.id);
    return response.handleSuccessResponse(
      { successCode: StatusCode.SUCCESS_CODE, result },
      res
    );
  } catch (error) {
    if (session) {
      await session.abortTransaction();
    }
    if (error.errorCode && error.message && error.displayMessage) {
      return response.handleErrorResponse(error, res);
    } else {
      return response.handleErrorResponse(
        { errorCode: StatusCode.SERVER_ERROR, message: "Internal Server Error" },
        res
      );
    }
  } finally {
    if (session) {
      session.endSession();
    }
  }
};

const addproductOffer = async (req, res) => {
  const session = await mongoose.startSession();
  try {
    session.startTransaction();
    const result = await productOfferService.addproductOffer(req.body, session);

    await session.commitTransaction();
    session.endSession();
    return response.handleSuccessResponse(
      { successCode: StatusCode.SUCCESS_CODE, result },
      res
    );
  } catch (error) {
    if (session) {
      await session.abortTransaction();
    }
    if (error.errorCode && error.message && error.displayMessage) {
      return response.handleErrorResponse(error, res);
    } else {
      return response.handleErrorResponse(
        { errorCode: StatusCode.SERVER_ERROR, message: "Internal Server Error" },
        res
      );
    }
  } finally {
    if (session) {
      session.endSession();
    }
  }
};
const viewproductOffers  = async (req, res) => {
  let session;
  try {
    const result = await productOfferService.viewproductOffers();
    return response.handleSuccessResponse(
      { successCode: StatusCode.SUCCESS_CODE, result },
      res
    );
  } catch (error) {
    if (session) {
      await session.abortTransaction();
    }
    if (error.errorCode && error.message && error.displayMessage) {
      return response.handleErrorResponse(error, res);
    } else {
      return response.handleErrorResponse(
        {
          errorCode: StatusCode.SERVER_ERROR,
          message: "Internal Server Error",
          displayMessage: "Banner not created successfully",
        },
        res
      );
    }
  } finally {
    if (session) {
      session.endSession();
    }
  }
};
const editproductOffer = async (req, res) => {
  let session;
  try {
    const result = await productOfferService.editproductOffer(
      req.params.id,
      req.body
    );
    return response.handleSuccessResponse(
      { successCode: StatusCode.SUCCESS_CODE, result },
      res
    );
  } catch (error) {
    if (session) {
      await session.abortTransaction();
    }
    if (error.errorCode && error.message && error.displayMessage) {
      return response.handleErrorResponse(error, res);
    } else {
      return response.handleErrorResponse(
        { errorCode: StatusCode.SERVER_ERROR, message: "Internal Server Error" },
        res
      );
    }
  } finally {
    if (session) {
      session.endSession();
    }
  }
};
const deleteproductOffer = async (req, res) => {
  let session;
  try {
    const result = await productOfferService.deleteproductOffer(req.params.id);
    return response.handleSuccessResponse(
      { successCode: StatusCode.SUCCESS_CODE, result },
      res
    );
  } catch (error) {
    if (session) {
      await session.abortTransaction();
    }
    if (error.errorCode && error.message && error.displayMessage) {
      return response.handleErrorResponse(error, res);
    } else {
      return response.handleErrorResponse(
        { errorCode: StatusCode.SERVER_ERROR, message: "Internal Server Error" },
        res
      );
    }
  } finally {
    if (session) {
      session.endSession();
    }
  }
};


module.exports = {
  //CATEGORY
  /**
   * @swagger
   * definitions:
   *   Category:
   *     type: object
   *     required:
   *       - categoryName
   *       - productNames
   *       - gstPercentage
   *       - gstRate
   *     properties:
   *       categoryName:
   *         type: string
   *         description: Name of the category
   *       productNames:
   *         type: array
   *         items:
   *           type: string
   *         description: Names of the products associated with the category
   *       gstPercentage:
   *         type: number
   *         format: float
   *         minimum: 0
   *         description: GST percentage for the category
   *       gstRate:
   *         type: number
   *         format: float
   *         minimum: 0
   *       discount:
   *         type: number
   *         description: GST rate for the category
   */
  addCategory,
  /**
   * @swagger
   * /addcategory:
   *   post:
   *     summary: Adds a new category
   *     description: Use this API to add a new category
   *     tags:
   *       - category
   *     consumes:
   *       - application/json
   *     produces:
   *       - application/json
   *     parameters:
   *       - in: header
   *         name: Authorization
   *         description: JWT token obtained during authentication
   *         required: true
   *         type: string
   *       - in: body
   *         name: category
   *         description: Category details to store
   *         required: true
   *         schema:
   *           $ref: '#/definitions/Category'
   *     responses:
   *       200:
   *         description: Operation completed successfully
   *       400:
   *         description: Bad request, invalid input parameters
   *       401:
   *         description: Unauthorized, invalid or missing JWT token
   *       500:
   *         description: Internal server error
   */
  viewProductsName,
  /**
   * @swagger
   * /viewproductsname:
   *   get:
   *     summary: View all products associated with categories
   *     description: Use this API to retrieve all products associated with categories
   *     tags:
   *       - category
   *     produces:
   *       - application/json
   *     parameters:
   *       - in: header
   *         name: Authorization
   *         description: JWT token obtained during authentication
   *         required: true
   *         type: string
   *     responses:
   *       200:
   *         description: Operation completed successfully
   *         schema:
   *           type: object
   *           properties:
   *             httpStatusCode:
   *               type: integer
   *               example: 200
   *             customStatusCode:
   *               type: integer
   *               example: null
   *             result:
   *               type: object
   *               properties:
   *                 data:
   *                   type: array
   *                   items:
   *                     type: object
   *                     properties:
   *                       categoryName:
   *                         type: string
   *                         description: Name of the category
   *                       productNames:
   *                         type: array
   *                         items:
   *                           type: string
   *                         description: Names of the products associated with the category
   *                       gstPercentage:
   *                         type: number
   *                         format: float
   *                         minimum: 0
   *                         description: GST percentage for the category
   *                       gstRate:
   *                         type: number
   *                         format: float
   *                         minimum: 0
   *                         description: GST rate for the category
   *               example: null
   *             displayMessage:
   *               type: string
   *               example: "Operation completed successfully."
   *             status:
   *               type: boolean
   *               example: true
   *       400:
   *         description: Bad request, invalid input parameters
   *       401:
   *         description: Unauthorized, invalid or missing JWT token
   *       500:
   *         description: Internal server error
   */
  viewCategory,
  /**
   * @swagger
   * /viewcategory:
   *   get:
   *     summary: View all category names
   *     description: Use this API to retrieve all category names
   *     tags:
   *       - category
   *     parameters:
   *       - in: header
   *         name: Authorization
   *         description: JWT token obtained during authentication
   *         required: true
   *         type: string
   *     produces:
   *       - application/json
   *     responses:
   *       200:
   *         description: Operation completed successfully
   *         schema:
   *           type: object
   *           properties:
   *             httpStatusCode:
   *               type: integer
   *               example: 200
   *             customStatusCode:
   *               type: integer
   *               example: null
   *             result:
   *               type: object
   *               properties:
   *                 data:
   *                   type: array
   *                   items:
   *                     type: object
   *                     properties:
   *                       categoryName:
   *                         type: string
   *                         description: Name of the category
   *             displayMessage:
   *               type: string
   *               example: "Operation completed successfully."
   *             status:
   *               type: boolean
   *               example: true
   *       400:
   *         description: Bad request, invalid input parameters
   *       401:
   *         description: Unauthorized, invalid or missing JWT token
   *       500:
   *         description: Internal server error
   */
  deleteCategory,
  /**
   * @swagger
   * /delete-category/{id}:
   *   delete:
   *     summary: Delete a category by ID
   *     description: Use this API to delete an existing category by its ID.
   *     tags:
   *       - category
   *     parameters:
   *       - in: header
   *         name: Authorization
   *         description: JWT token obtained during authentication
   *         required: true
   *         type: string
   *       - in: path
   *         name: id
   *         required: true
   *         schema:
   *           type: string
   *         description: ID of the category to delete
   *     responses:
   *       200:
   *         description: Category deleted successfully
   *       400:
   *         description: Bad request, invalid input parameters
   *       401:
   *         description: Unauthorized, invalid or missing JWT token
   *       404:
   *         description: Category not found
   *       500:
   *         description: Internal server error
   */
  updatecategory,
  /**
   * @swagger
   * /updatecategory/{id}:
   *   put:
   *     summary: Update a category by ID
   *     tags:
   *       - category
   *     parameters:
   *       - in: header
   *         name: Authorization
   *         description: JWT token obtained during authentication
   *         required: true
   *         type: string
   *       - in: path
   *         name: id
   *         required: true
   *         schema:
   *           type: string
   *         description: Category ID
   *       - in: body
   *         name: body
   *         description: Category details to update
   *         required: true
   *         schema:
   *           type: object
   *           properties:
   *             categoryName:
   *               type: string
   *               description: Name of the category
   *             productNames:
   *               type: array
   *               items:
   *                 type: string
   *               description: List of product names
   *             gstPercentage:
   *               type: number
   *               description: GST percentage
   *             gstRate:
   *               type: number
   *               description: GST rate
   *             discount:
   *               type: number
   *               description: Discount
   *     responses:
   *       200:
   *         description: Successful operation
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 categoryName:
   *                   type: string
   *                   description: Name of the category
   *                 productNames:
   *                   type: array
   *                   items:
   *                     type: string
   *                   description: List of product names
   *                 gstPercentage:
   *                   type: number
   *                   description: GST percentage
   *                 gstRate:
   *                   type: number
   *                   description: GST rate
   *                 discount:
   *                   type: number
   *                   description: Discount
   *       400:
   *         description: Invalid request data
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 message:
   *                   type: string
   *                   example: "Invalid request data"
   *       404:
   *         description: Category not found
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 message:
   *                   type: string
   *                   example: "Category not found"
   */


  //INVENTORY
  viewCurrentStockNumber,
  /**
   * @swagger
   * /view-current-stock-number:
   *   get:
   *     summary: Get total quantity of unsold products
   *     description: Retrieves the total quantity of unsold products in the inventory
   *     tags:
   *       - inventory
   *     produces:
   *       - application/json
   *     parameters:
   *       - in: header
   *         name: Authorization
   *         description: JWT token obtained during authentication
   *         required: true
   *         type: string
   *     responses:
   *       200:
   *         description: Successful operation
   *         schema:
   *           type: object
   *           properties:
   *             totalUnsold:
   *               type: number
   *               description: Total quantity of unsold products
   *       400:
   *         description: Bad request, invalid input parameters
   *       401:
   *         description: Unauthorized, invalid or missing JWT token
   *       500:
   *         description: Internal server error
   */
  viewProductsByCategory,
  /**
   * @swagger
   * /products-by-category/{categoryName}:
   *   get:
   *     summary: Get products by category
   *     description: Retrieves all products for a given category
   *     tags:
   *       - inventory
   *     produces:
   *       - application/json
   *     parameters:
   *       - in: header
   *         name: Authorization
   *         description: JWT token obtained during authentication
   *         required: true
   *         type: string
   *       - in: path
   *         name: categoryName
   *         required: true
   *         schema:
   *           type: string
   *         description: Name of the category to filter products
   *     responses:
   *       200:
   *         description: Successful operation
   *       400:
   *         description: Bad request, invalid input parameters
   *       401:
   *         description: Unauthorized, invalid or missing JWT token
   *       500:
   *         description: Internal server error
   */
  viewLowStockProductsNumber,
  /**
   * @swagger
   * /view-total-low-stock-number:
   *   get:
   *     summary: Get total quantity of low stock products
   *     description: Retrieves the total quantity of products with low stock (quantity <= 10)
   *     tags:
   *       - inventory
   *     produces:
   *       - application/json
   *     parameters:
   *       - in: header
   *         name: Authorization
   *         description: JWT token obtained during authentication
   *         required: true
   *         type: string
   *     responses:
   *       200:
   *         description: Successful operation
   *         schema:
   *           type: object
   *           properties:
   *             totalLowStock:
   *               type: number
   *               description: Total quantity of low stock products
   *       400:
   *         description: Bad request, invalid input parameters
   *       401:
   *         description: Unauthorized, invalid or missing JWT token
   *       500:
   *         description: Internal server error
   */
  getCurrentStocksByWeek,
  /**
   * @swagger
   * /current-stocks-by-week/{startDate}:
   *   get:
   *     summary: View current stocks by week
   *     description: Retrieves all products added within a specific week
   *     tags:
   *       - inventory
   *     produces:
   *       - application/json
   *     parameters:
   *       - in: header
   *         name: Authorization
   *         description: JWT token obtained during authentication
   *         required: true
   *         type: string
   *       - in: path
   *         name: startDate
   *         required: true
   *         schema:
   *           type: string
   *           format: date-time
   *         description: Start date of the week to filter products
   *     responses:
   *       200:
   *         description: Successful operation
   *       400:
   *         description: Bad request, invalid input parameters
   *       401:
   *         description: Unauthorized, invalid or missing JWT token
   *       500:
   *         description: Internal server error
   */
  getLowStocksByWeek,
  /**
   * @swagger
   * /low-stocks-by-week/{startDate}:
   *   get:
   *     summary: View low stocks by week
   *     description: Retrieves products with low stock quantity added within a specific week
   *     tags:
   *       - inventory
   *     produces:
   *       - application/json
   *     parameters:
   *       - in: header
   *         name: Authorization
   *         description: JWT token obtained during authentication
   *         required: true
   *         type: string
   *       - in: path
   *         name: startDate
   *         required: true
   *         schema:
   *           type: string
   *           format: date-time
   *         description: Start date of the week to filter products
   *     responses:
   *       200:
   *         description: Successful operation
   *       400:
   *         description: Bad request, invalid input parameters
   *       401:
   *         description: Unauthorized, invalid or missing JWT token
   *       500:
   *         description: Internal server error
   */
  getRecentlyAddedProducts,
  /**
   * @swagger
   * /recently-added-products/{startDate}:
   *   get:
   *     summary: View recently added products by week
   *     description: Retrieves products added within a specific week based on the added time
   *     tags:
   *       - inventory
   *     produces:
   *       - application/json
   *     parameters:
   *       - in: header
   *         name: Authorization
   *         description: JWT token obtained during authentication
   *         required: true
   *         type: string
   *       - in: path
   *         name: startDate
   *         required: true
   *         schema:
   *           type: string
   *           format: date-time
   *         description: Start date of the week to filter products
   *     responses:
   *       200:
   *         description: Successful operation
   *       400:
   *         description: Bad request, invalid input parameters
   *       401:
   *         description: Unauthorized, invalid or missing JWT token
   *       500:
   *         description: Internal server error
   */
  UpdateInventoryQuantity,
  /**
 * @swagger
 * /updateInventory:
 *   get:
 *     summary: Update inventory quantities based on sold products
 *     tags:
 *       - inventory
 *     parameters:
 *       - in: header
 *         name: Authorization
 *         description: JWT token obtained during authentication
 *         required: true
 *         type: string
 *     responses:
 *       '200':
 *         description: Inventory updated successfully
 *       '500':
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Error message
 */
  viewCurrentStockNumberWithIncrease,
  /**
 * @swagger
 * /currentStockWithIncrease:
 *   get:
 *     summary: Get current stock number with increase percentage
 *     description: Retrieves the current total unsold stock number along with the percentage increase in stock number if new products are added today.
 *     tags:
 *       - inventory
 *     produces:
 *       - application/json
 *     parameters:
 *       - in: header
 *         name: Authorization
 *         description: JWT token obtained during authentication
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: Successful operation
 *         schema:
 *           type: object
 *           properties:
 *             totalUnsold:
 *               type: integer
 *               description: Total unsold stock number
 *             increasePercentage:
 *               type: number
 *               format: float
 *               description: Percentage increase in stock number if new products are added today
 *       500:
 *         description: Internal Server Error
 */

/**
 * @swagger
 * definitions:
 *   ProductDiscount:
 *     type: object
 *     required:
 *       - categoryName
 *       - productName
 *       - productDiscount
 *     properties:
 *       categoryName:
 *         type: string
 *         description: Name of the category
 *       productName:
 *         type: string
 *         description: Name of the product
 *       productDiscount:
 *         type: number
 *         format: float
 *         minimum: 0
 *         description: Discount percentage for the product
 */


  //DISCOUNT
  addProductDiscount,
 /**
 * @swagger
 * /add-product-discount:
 *   post:
 *     summary: Add product discount
 *     description: Endpoint to add a discount for a product.
 *     tags:
 *       - Discount
 *     consumes:
 *       - application/json
 *     produces:
 *       - application/json
 *     parameters:
 *       - in: header
 *         name: Authorization
 *         description: JWT token obtained during authentication
 *         required: true
 *         type: string
 *       - in: body
 *         name: productDiscount
 *         description: Product discount details to store
 *         required: true
 *         schema:
 *           $ref: '#/definitions/ProductDiscount'
 *     responses:
 *       200:
 *         description: Product discount added successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 successCode:
 *                   type: number
 *                   description: Success code.
 *                 result:
 *                   $ref: '#/definitions/ProductDiscount'
 *       400:
 *         description: Bad request. Invalid input data.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 errorCode:
 *                   type: number
 *                   description: Error code.
 *                 message:
 *                   type: string
 *                   description: Error message.
 *                 displayMessage:
 *                   type: string
 *                   description: Error display message.
 *       404:
 *         description: Product not found. The provided category name and product name do not exist.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 errorCode:
 *                   type: number
 *                   description: Error code.
 *                 message:
 *                   type: string
 *                   description: Error message.
 *       500:
 *         description: Internal server error.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 errorCode:
 *                   type: number
 *                   description: Error code.
 *                 message:
 *                   type: string
 *                   description: Error message.
 *                 displayMessage:
 *                   type: string
 *                   description: Error display message.
 */


  addCategoryDiscount,
  /**
 * @swagger
 * /add-category-discount:
 *   post:
 *     summary: Add discount to a category
 *     tags:
 *       - Discount
 *     consumes:
 *       - application/json
 *     produces:
 *       - application/json
 *     parameters:

 *       - in: body
 *         name: categoryDiscount
 *         description: Category discount details
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             categoryName:
 *               type: string
 *               example: "Electronics"
 *             discount:
 *               type: number
 *               example: 10
 *     responses:
 *       200:
 *         description: Category discount added successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: Category Discount Added Successfully
 *                 data:
 *                   type: object
 *                   properties:
 *                     categoryName:
 *                       type: string
 *                       example: "Electronics"
 *                     discount:
 *                       type: number
 *                       example: 10
 *       400:
 *         description: Invalid request data or category not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 errorCode:
 *                   type: number
 *                   example: 400
 *                 message:
 *                   type: string
 *                   example: "Invalid request data"
 *                 displayMessage:
 *                   type: string
 *                   example: "Category Name is Required"
 */
  getCategoryDiscounts,
  /**
 * @swagger
 * /category-discounts:
 *   get:
 *     summary: Get all category discounts
 *     tags:
 *       - Discount
 *     produces:
 *       - application/json
 *     parameters:
 *       - in: header
 *         name: Authorization
 *         description: JWT token obtained during authentication
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: An array of category discounts
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   categoryName:
 *                     type: string
 *                     description: The name of the category
 *                   discount:
 *                     type: number
 *                     description: The discount percentage for the category
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 errorCode:
 *                   type: number
 *                   example: 500
 *                 message:
 *                   type: string
 *                   example: Internal Server Error
 *                 displayMessage:
 *                   type: string
 *                   example: Failed to retrieve category discounts
 */
  viewProductDiscount,
 /**
 * @swagger
 * /product-discounts:
 *   get:
 *     summary: View all product discounts
 *     tags:
 *       - Discount
 *     produces:
 *       - application/json
 *     parameters:
 *       - in: header
 *         name: Authorization
 *         description: JWT token obtained during authentication
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: An array of product discounts
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                   productName:
 *                     type: string
 *                   discountPercentage:
 *                     type: number
 *                   startDate:
 *                     type: string
 *                     format: date-time
 *                   endDate:
 *                     type: string
 *                     format: date-time
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 errorCode:
 *                   type: number
 *                 message:
 *                   type: string
 *                 displayMessage:
 *                   type: string
 */

 updateCategoryDiscount,
/**
 * @swagger
 * /update-category-discount:
 *   put:
 *     summary: Update category discount
 *     tags:
 *       - Discount
 *     consumes:
 *       - application/json
 *     produces:
 *       - application/json
 *     parameters:
 *       - in: header
 *         name: Authorization
 *         description: JWT token obtained during authentication
 *         required: true
 *         schema:
 *           type: string
 *       - in: body
 *         name: categoryDiscount
 *         description: Category discount update details
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             categoryName:
 *               type: string
 *               example: "Electronics"
 *             newDiscount:
 *               type: number
 *               example: 15
 *     responses:
 *       200:
 *         description: Category discount updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: "Category Discount Updated Successfully"
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 errorCode:
 *                   type: number
 *                   example: 500
 *                 message:
 *                   type: string
 *                   example: "Internal Server Error"
 *                 displayMessage:
 *                   type: string
 *                   example: "Failed to update category discount"
 */

updateProductDiscount,
/**
 * @swagger
 * /update-product-discount:
 *   put:
 *     summary: Update product discount
 *     tags:
 *       - Discount
 *     consumes:
 *       - application/json
 *     produces:
 *       - application/json
 *     parameters:
 *       - in: header
 *         name: Authorization
 *         description: JWT token obtained during authentication
 *         required: true
 *         schema:
 *           type: string
 *       - in: body
 *         name: productDiscount
 *         description: Product discount update details
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             categoryName:
 *               type: string
 *               example: "Electronics"
 *             productName:
 *               type: string
 *               example: "Smartphone"
 *             newDiscount:
 *               type: number
 *               example: 15
 *     responses:
 *       200:
 *         description: Product discount updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: "Product Discount Updated Successfully"
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 errorCode:
 *                   type: number
 *                   example: 500
 *                 message:
 *                   type: string
 *                   example: "Internal Server Error"
 *                 displayMessage:
 *                   type: string
 *                   example: "Failed to update product discount"
 */

deleteProductDiscount,
/**
 * @swagger
 * /delete-product-discount:
 *   delete:
 *     summary: Delete product discount
 *     tags:
 *       - Discount
 *     consumes:
 *       - application/json
 *     produces:
 *       - application/json
 *     parameters:
 *       - in: header
 *         name: Authorization
 *         description: JWT token obtained during authentication
 *         required: true
 *         schema:
 *           type: string
 *       - in: body
 *         name: productDiscount
 *         description: Product discount deletion details
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             categoryName:
 *               type: string
 *               example: "Electronics"
 *             productName:
 *               type: string
 *               example: "Smartphone"
 *     responses:
 *       200:
 *         description: Product discount deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: "Product Discount Deleted Successfully"
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 errorCode:
 *                   type: number
 *                   example: 500
 *                 message:
 *                   type: string
 *                   example: "Internal Server Error"
 *                 displayMessage:
 *                   type: string
 *                   example: "Failed to delete product discount"
 */


deleteCategoryDiscount,
/**
 * @swagger
 * /delete-category-discount:
 *   delete:
 *     summary: Delete category discount
 *     tags:
 *       - Discount
 *     consumes:
 *       - application/json
 *     produces:
 *       - application/json
 *     parameters:
 *       - in: header
 *         name: Authorization
 *         description: JWT token obtained during authentication
 *         required: true
 *         schema:
 *           type: string
 *       - in: body
 *         name: categoryDiscount
 *         description: Category discount deletion details
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             categoryName:
 *               type: string
 *               example: "Electronics"
 *     responses:
 *       200:
 *         description: Category discount deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: "Category Discount Deleted Successfully"
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 errorCode:
 *                   type: number
 *                   example: 500
 *                 message:
 *                   type: string
 *                   example: "Internal Server Error"
 *                 displayMessage:
 *                   type: string
 *                   example: "Failed to delete category discount"
 */


  //SELL
  /**
   * @swagger
   * definitions:
   *   Product:
   *     type: object
   *     properties:
   *       productId:
   *         type: string
   *         description: Unique identifier for the product
   *       productCategory:
   *         type: string
   *         required: true
   *         description: Category to which the product belongs
   *       productName:
   *         type: string
   *         required: true
   *         description: Name of the product
   *       productCost:
   *         type: number
   *         required: true
   *         description: Cost price of the product
   *       productSellingPrice:
   *         type: number
   *         required: true
   *         description: Selling price of the product
   *       productDiscount:
   *         type: number
   *         required: true
   *         description: Discount on the product
   *       HSNnumber:
   *         type: number
   *         required: true
   *         description: HSN number for product
   *       productSupplier:
   *         type: string
   *         required: true
   *         description: Supplier of the product
   *       productManufacturer:
   *         type: string
   *         required: true
   *         description: Manufacturer of the product
   *       productQuantity:
   *         type: object
   *         properties:
   *           value:
   *             type: number
   *             minimum: 1
   *             description: Quantity value of the product
   *           unit:
   *             type: string
   *             enum: ["g", "kg", "l", "ml", "q", "T","PCK"]
   *             description: Unit of the product (e.g., g, kg, l, ml, quintal)
   *       totalQuantityCost:
   *         type: number
   *         required: true
   *       expiryDate:
   *         type: string
   *         description: Expiry date of the product
   */
  CustomerDetails,
  /**
   * @swagger
   * /customer-details:
   *   post:
   *     summary: Add customer details
   *     description: Use this API to add customer details
   *     tags:
   *       - sell
   *     consumes:
   *       - application/json
   *     produces:
   *       - application/json
   *     parameters:
   *       - in: header
   *         name: Authorization
   *         description: JWT token obtained during authentication
   *         required: true
   *         type: string
   *       - in: body
   *         name: customerDetails
   *         description: Customer details to add
   *         required: true
   *         schema:
   *           type: object
   *           properties:
   *             cutomerName:
   *               type: string
   *               description: Name of the customer
   *               example: "John Doe"
   *             mobileNumber:
   *               type: string
   *             GSTNumber:
   *               type: number
   *               description: GST number of the customer
   *               example: 123456789012
   *     responses:
   *       200:
   *         description: Operation completed successfully
   *         schema:
   *           type: object
   *           properties:
   *             httpStatusCode:
   *               type: integer
   *               example: 200
   *             customStatusCode:
   *               type: integer
   *               example: null
   *             result:
   *               type: object
   *               properties:
   *                 data:
   *                   type: object
   *                   properties:
   *                     message:
   *                       type: string
   *                       example: "Customer details added successfully."
   *               example: null
   *             displayMessage:
   *               type: string
   *               example: "Operation completed successfully."
   *             status:
   *               type: boolean
   *               example: true
   *       400:
   *         description: Bad request, invalid input parameters
   *       500:
   *         description: Internal server error
   */
  calculateProductTotal,
  /**
 * @swagger
 * /calculate-product-total:
 *   post:
 *     summary: Calculate total price for products in the cart considering product and category discounts
 *     tags:
 *       - sell
 *     consumes:
 *       - application/json
 *     produces:
 *       - application/json
 *     parameters:
 *       - in: header
 *         name: Authorization
 *         description: JWT token obtained during authentication
 *         required: true
 *         type: string
 *       - in: body
 *         name: cartItems
 *         description: List of items in the cart
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             cartItems:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   productName:
 *                     type: string
 *                   quantity:
 *                     type: object
 *                     properties:
 *                       value:
 *                         type: integer
 *                         example: 5
 *                       unit:
 *                         type: string
 *                         enum: ["G", "KG", "L", "ML", "Q","pcs","T"]
 *                     example:
 *                       value: 5
 *                       unit: "KG"
 *                   manualDiscount:
 *                     type: number
 *                     format: float
 *                     example: 5
 *     responses:
 *       200:
 *         description: Successful operation
 *         schema:
 *           type: object
 *           properties:
 *             totalDiscountedPrice:
 *               type: number
 *               format: float
 *             detailedItems:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   productName:
 *                     type: string
 *                   category:
 *                     type: string
 *                   gstPercentage:
 *                     type: number
 *                   quantity:
 *                     type: string
 *                   totalPriceForItem:
 *                     type: number
 *                     format: float
 *                   profit:
 *                     type: number
 *                     format: float
 *       400:
 *         description: Invalid request data
 */

  calculateCartTotal,
 /**
 * @swagger
 * /calculate-cart-total:
 *   post:
 *     summary: Calculate the total price of the cart, update inventory, and record sold products
 *     description: This API calculates the total price of the cart including discounts and GST, updates the inventory, and records the sold products.
 *     tags:
 *       - sell
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: array
 *             items:
 *               type: object
 *               properties:
 *                 productName:
 *                   type: string
 *                   example: sev
 *                 quantity:
 *                   type: object
 *                   properties:
 *                     value:
 *                       type: integer
 *                       example: 5
 *                     unit:
 *                       type: string
 *                       example: pcs
 *                 manualDiscount:
 *                   type: integer
 *                   example: 0
 *     responses:
 *       '200':
 *         description: Calculation successful
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 totalQuantity:
 *                   type: integer
 *                 totalPrice:
 *                   type: number
 *                 productNames:
 *                   type: array
 *                   items:
 *                     type: string
 *       '400':
 *         description: Invalid request payload
 *       '500':
 *         description: Internal Server Error
 */
  viewAllSoldProducts,
  /**
   * @swagger
   * /view-all-sold-products:
   *   get:
   *     summary: View All Sold Products
   *     description: Retrieve all sold products from the database.
   *     tags:
   *       - Sold Product
   *     produces:
   *       - application/json
   *     parameters:
   *       - in: header
   *         name: Authorization
   *         description: JWT token obtained during authentication
   *         required: true
   *         type: string
   *     responses:
   *       '200':
   *         description: Successful operation
   *         schema:
   *           type: object
   *           properties:
   *             successCode:
   *               type: integer
   *               example: 200
   *             soldProducts:
   *               type: array
   *               items:
   *                 $ref: '#/definitions/SoldProduct'
   *       '500':
   *         description: Internal Server Error
   * definitions:
   *   SoldProduct:
   *     type: object
   *     properties:
   *       productName:
   *         type: string
   *         description: Name of the sold product
   *         example: "Product 1"
   *       quantity:
   *         type: integer
   *         description: Quantity of the sold product
   *         example: 2
   *       totalPrice:
   *         type: number
   *         description: Total price of the sold product
   *         example: 20.5
   */
  deleteSoldProduct,
  /**
   * @swagger
   * /delete-sold-product/{soldProductId}:
   *   delete:
   *     summary: Delete Sold Product
   *     description: Delete a sold product by its ID.
   *     tags:
   *       - Sold Product
   *     parameters:
   *       - in: header
   *         name: Authorization
   *         description: JWT token obtained during authentication
   *         required: true
   *         type: string
   *       - in: path
   *         name: soldProductId
   *         required: true
   *         schema:
   *           type: string
   *         description: ID of the sold product to delete
   *     responses:
   *       '200':
   *         description: Successful operation
   *       '404':
   *         description: Sold product not found
   *       '500':
   *         description: Internal Server Error
   */


  //PRODUCT
  addProduct,
  /**
   * @swagger
   * /addproduct:
   *   post:
   *     summary: Add a new product
   *     tags:
   *       - product
   *     consumes:
   *       - application/json
   *     produces:
   *       - application/json
   *     parameters:
   *       - in: header
   *         name: Authorization
   *         description: JWT token obtained during authentication
   *         required: true
   *         type: string
   *       - in: body
   *         name: product
   *         description: Product object to be added
   *         required: true
   *         schema:
   *           $ref: '#/definitions/Product'
   *     responses:
   *       200:
   *         description: Successfully added the product
   *       400:
   *         description: Invalid input data
   */
  editProduct,
  /**
   * @swagger
   * /product/edit/{id}:
   *   put:
   *     summary: Edit a product by ID
   *     tags:
   *       - product
   *     parameters:
   *       - in: header
   *         name: Authorization
   *         description: JWT token obtained during authentication
   *         required: true
   *         type: string 
   *       - name: id
   *         in: path
   *         description: ID of the product to edit
   *         required: true
   *         type: string
   *       - in: body
   *         name: product
   *         description: Product details to update
   *         required: true
   *         schema:
   *           $ref: '#/definitions/Product'
   *     produces:
   *       - application/json
   *     responses:
   *       200:
   *         description: Product updated successfully
   *         schema:
   *           $ref: '#/definitions/Product'
   *       400:
   *         description: Invalid product data provided
   *         schema:
   *           type: object
   *           properties:
   *             message:
   *               type: string
   *               example: "Invalid product data provided"
   *       404:
   *         description: Product not found
   *         schema:
   *           type: object
   *           properties:
   *             message:
   *               type: string
   *               example: "Product not found"
   *       500:
   *         description: Internal server error
   *         schema:
   *           type: object
   *           properties:
   *             message:
   *               type: string
   *               example: "Internal Server Error"
   */
  viewProductById,
  /**
   * @swagger
   * /viewproduct-by-id/{id}:
   *   get:
   *     summary: Get product details by ID
   *     tags:
   *       - product
   *     parameters:
   *       - in: header
   *         name: Authorization
   *         description: JWT token obtained during authentication
   *         required: true
   *         type: string     
   *       - in: path
   *         name: id
   *         required: true
   *         type: string
   *         description: ID of the product to fetch
   *     produces:
   *       - application/json
   *     responses:
   *       200:
   *         description: Successful operation
   *         schema:
   *           $ref: '#/definitions/Product'
   *       404:
   *         description: Product not found
   *         schema:
   *           type: object
   *           properties:
   *             message:
   *               type: string
   *               example: "Product not found"
   *       500:
   *         description: Internal server error
   *         schema:
   *           type: object
   *           properties:
   *             message:
   *               type: string
   *               example: "Internal Server Error"
   */

  getAllProducts,
  /**
   * @swagger
   * /viewproduct:
   *   get:
   *     summary: View specific product details
   *     description: Use this API to retrieve specific product details for display in a panel
   *     tags:
   *       - product
   *     produces:
   *       - application/json
   *     parameters:
   *       - in: header
   *         name: Authorization
   *         description: JWT token obtained during authentication
   *         required: true
   *         type: string
   *     responses:
   *       200:
   *         description: Operation completed successfully
   *         schema:
   *           type: object
   *           properties:
   *             httpStatusCode:
   *               type: integer
   *               example: 200
   *             customStatusCode:
   *               type: integer
   *               example: null
   *             result:
   *               type: object
   *               properties:
   *                 data:
   *                   type: array
   *                   items:
   *                     type: object
   *                     properties:
   *                       productId:
   *                         type: string
   *                         description: Unique ID of the product
   *                       productCategory:
   *                         type: string
   *                         description: Category of the product
   *                       productName:
   *                         type: string
   *                         description: Name of the product
   *                       productExpireDate:
   *                         type: string
   *                         format: date
   *                         description: Expiry date of the product
   *                       productTax:
   *                         type: number
   *                         description: Tax rate of the product
   *                       productSellingPrice:
   *                         type: number
   *                         description: Selling price of the product
   *               example: null
   *             displayMessage:
   *               type: string
   *               example: "Operation completed successfully."
   *             status:
   *               type: boolean
   *               example: true
   *       400:
   *         description: Bad request, invalid input parameters
   *       401:
   *         description: Unauthorized, invalid or missing JWT token
   *       500:
   *         description: Internal server error
   */
  deleteProduct,
  /**
   * @swagger
   * /delete-product/{id}:
   *   delete:
   *     summary: Delete a product
   *     description: Use this API to delete a product by its ID
   *     tags:
   *       - product
   *     parameters:
   *       - in: header
   *         name: Authorization
   *         description: JWT token obtained during authentication
   *         required: true
   *         type: string
   *       - in: path
   *         name: id
   *         required: true
   *         schema:
   *           type: string
   *         description: Product ID to delete
   *     responses:
   *       200:
   *         description: Product deleted successfully
   *         schema:
   *           type: object
   *           properties:
   *             httpStatusCode:
   *               type: integer
   *               example: 200
   *             customStatusCode:
   *               type: integer
   *               example: null
   *             result:
   *               type: object
   *               properties:
   *                 data:
   *                   type: object
   *                   properties:
   *                     message:
   *                       type: string
   *                       example: "Product deleted successfully."
   *               example: null
   *             displayMessage:
   *               type: string
   *               example: "Product deleted successfully."
   *             status:
   *               type: boolean
   *               example: true
   *       400:
   *         description: Bad request, invalid input parameters
   *       500:
   *         description: Internal server error
   */

  //DASHBOARD
  getTotalProfit,
  /**
 * @swagger
 * /totalProfit:
 *   get:
 *     summary: Get total profit from all sold products
 *     tags:
 *       - Dashboard
 *     produces:
 *       - application/json
 *     parameters:
 *       - in: header
 *         name: Authorization
 *         description: JWT token obtained during authentication
 *         required: true
 *         type: string
 *     responses:
 *       '200':
 *         description: Successful operation
 *         schema:
 *           type: object
 *           properties:
 *             totalProfit:
 *               type: number
 *               description: Total profit from all sold products
 *             message:
 *               type: string
 *               description: Success message
 *       '500':
 *         description: Internal server error
 *         schema:
 *           type: object
 *           properties:
 *             message:
 *               type: string
 *               description: Error message
 */
  getRemainingDaysUntilExpiry,
   /**
  * @swagger
  * /getRemainingDaysUntilExpiry:
  *   get:
  *     summary: Get remaining days until expiry
  *     description: Retrieve the remaining days until expiry for products
  *     tags:
  *       - Dashboard
  *     produces:
  *       - application/json
  *     parameters:
  *       - in: header
  *         name: Authorization
  *         description: JWT token obtained during authentication
  *         required: true
  *         type: string
  *     responses:
  *       '200':
  *         description: Successful operation
  *         schema:
  *           type: object
  *           properties:
  *             productName:
  *               type: string
  *               description: The name of the product
  *             category:
  *               type: string
  *               description: The category of the product
  *             remainingDays:
  *               type: integer
  *               description: The number of remaining days until expiry
  *       '500':
  *         description: Internal server error
  *         schema:
  *           type: object
  *           properties:
  *             error:
  *               type: string
  *               description: Error message
  */
  getTrendingProducts,
  /**
  * @swagger
  * /trending-products:
  *   get:
  *     summary: Get trending products
  *     description: Retrieve a list of trending products based on total sales
  *     tags:
  *       - Dashboard
  *     produces:
  *       - application/json
  *     parameters:
  *       - in: header
  *         name: Authorization
  *         description: JWT token obtained during authentication
  *         required: true
  *         type: string
  *     responses:
  *       200:
  *         description: A list of trending products
  *         schema:
  *           type: array
  *           items:
  *             type: object
  *             properties:
  *               productName:
  *                 type: string
  *                 description: The name of the trending product
  *               totalSales:
  *                 type: integer
  *                 description: The total number of times the product has been sold
  *       500:
  *         description: Internal server error
  *         schema:
  *           type: object
  *           properties:
  *             error:
  *               type: string
  *               description: Error message
  */
  getToatlRevenue,
  /**
  * @swagger
  * /get-total-revenue:
  *   get:
  *     summary: Get total price of all sold products
  *     tags:
  *       - Dashboard
  *     produces:
  *       - application/json
  *     parameters:
  *       - in: header
  *         name: Authorization
  *         description: JWT token obtained during authentication
  *         required: true
  *         type: string
  *     responses:
  *       '200':
  *         description: Successful operation
  *         schema:
  *           type: object
  *           properties:
  *             totalPrice:
  *               type: number
  *               description: Total price of all sold products
  *       '500':
  *         description: Internal server error
  *         schema:
  *           type: object
  *           properties:
  *             message:
  *               type: string
  *               description: Error message
  */
  topSellingCategories,
  /**
  * @swagger
  * topselling-categories:
  *   get:
  *     summary: Get top selling category
  *     tags:
  *       - Dashboard
  *     produces:
  *       - application/json
  *     parameters:
  *       - in: header
  *         name: Authorization
  *         description: JWT token obtained during authentication
  *         required: true
  *         type: string
  *     responses:
  *       '200':
  *         description: Successful operation
  *         schema:
  *           type: object
  *           properties:
  *             result:
  *               type: object
  *               description: Top selling category
  *       '500':
  *         description: Internal server error
  *         schema:
  *           type: object
  *           properties:
  *             message:
  *               type: string
  *               description: Error message
  */

  //profile
  /**
 * @swagger
 * definitions:
 *   UserProfile:
 *     type: object
 *     properties:
 *       name:
 *         type: string
 *         description: Name of the user
 *         required: true
 *       mobileNo:
 *         type: string
 *         description: Mobile number of the user
 *         required: true
 *       address:
 *         type: string
 *         description: Address of the user
 *       profilePicture:
 *         type: string
 *         description: URL of the user's profile picture
 */
  createProfile,
  /**
   * @swagger
   * /create/profile:
   *   post:
   *     summary: Create user profile
   *     description: Use this API to create a new user profile.
   *     tags:
   *       - User Profile Management
   *     parameters:
   *       - in: header
   *         name: Authorization
   *         description: JWT token obtained during authentication
   *         required: true
   *         type: string
   *       - in: body
   *         name: userProfile
   *         description: User profile data to create
   *         required: true
   *         schema:
   *           $ref: '#/definitions/UserProfile'
   *     responses:
   *       200:
   *         description: User profile created successfully
   *       500:
   *         description: Internal Server Error
   */
  updateProfile,
  /**
   * @swagger
   * /update/profile/{id}:
   *   put:
   *     summary: Update user profile
   *     description: Use this API to update the user profile.
   *     tags:
   *       - User Profile Management
   *     parameters:
   *       - in: header
   *         name: Authorization
   *         description: JWT token obtained during authentication
   *         required: true
   *         type: string
   *       - in: path
   *         name: id
   *         description: ID of the profile to edit
   *         required: true
   *         schema:
   *           type: string
   *       - in: body
   *         name: updatedProfile
   *         description: Updated user profile data
   *         required: true
   *         schema:
   *           type: object
   *           properties:
   *             name:
   *               type: string
   *               description: Name of the user
   *               example: John Doe
   *             mobileNo:
   *               type: string
   *               description: Mobile number of the user
   *               example: "+1234567890"
   *             address:
   *               type: string
   *               description: Address of the user
   *               example: "123 Street, City, Country"
   *             profilePicture:
   *               type: string
   *               description: URL of the user's profile picture
   *     responses:
   *       200:
   *         description: User profile updated successfully
   *       500:
   *         description: Internal Server Error
   */
  viewUserProfile,
  /**
   * @swagger
   * /getUserProfile:
   *   get:
   *     summary: View user profile
   *     description: Use this API to view user profile.
   *     tags:
   *       - User Profile Management
   *     parameters:
   *       - in: header
   *         name: Authorization
   *         description: JWT token obtained during authentication
   *         required: true
   *         type: string
   *     responses:
   *       200:
   *         description: Success
   *       500:
   *         description: Internal Server Error
   */
  viewUserProfileById,
  /**
   * @swagger
   * /getUserProfileById/{id}:
   *   get:
   *     summary: View user profile by ID
   *     description: Use this API to view user profile by ID.
   *     tags:
   *       - User Profile Management
   *     parameters:
   *       - in: header
   *         name: Authorization
   *         description: JWT token obtained during authentication
   *         required: true
   *         type: string
   *       - in: path
   *         name: id
   *         description: ID of the profile to retrieve
   *         required: true
   *     responses:
   *       200:
   *         description: Success
   *       404:
   *         description: User profile not found
   *       500:
   *         description: Internal Server Error
   */

  //ADMIN
  Adminlogin,
  /**
* @swagger
* /admin-login:
*   post:
*     summary: Login for admin
*     description: Use this API to log in an admin.
*     tags:
*       - Admin
*     consumes:
*       - application/json
*     produces:
*       - application/json
*     parameters:
*       - in: body
*         name: credentials
*         description: admin credentials for login.
*         required: true
*         schema:
*           type: object
*           properties:
*             username:
*               type: string
*               description: The email address of the employee.
*             password:
*               type: string
*               description: The password of the employee.
*           required:
*             - username
*             - password
*     responses:
*       '200':
*         description: Employee logged in successfully
*       '400':
*         description: Bad request
*       '401':
*         description: Unauthorized - Invalid credentials
*       '500':
*         description: Internal Server Error
*/
  Employeelogin,
  /**
 * @swagger
 * /employee-login:
 *   post:
 *     summary: Login for employees
 *     description: Use this API to log in an employee.
 *     tags:
 *       - Admin
 *     consumes:
 *       - application/json
 *     produces:
 *       - application/json
 *     parameters:
 *       - in: body
 *         name: credentials
 *         description: Employee credentials for login.
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             username:
 *               type: string
 *               description: The email address of the employee.
 *             password:
 *               type: string
 *               description: The password of the employee.
 *           required:
 *             - username
 *             - password
 *     responses:
 *       '200':
 *         description: Employee logged in successfully
 *       '400':
 *         description: Bad request
 *       '401':
 *         description: Unauthorized - Invalid credentials
 *       '500':
 *         description: Internal Server Error
 */
  addEmployee,
  /**
  * @swagger
  * /addEmployee:
  *   post:
  *     summary: Add a new employee
  *     description: Use this API to add an employee and give access.
  *     tags:
  *       - Admin
  *     consumes:
  *       - application/json
  *     produces:
  *       - application/json
  *     parameters:
  *       - in: header
  *         name: Authorization
  *         description: JWT token obtained during authentication
  *         required: true
  *         type: string
  *       - in: body
  *         name: employee
  *         description: Employee details to store.
  *         required: true
  *         schema:
  *           type: object
  *           properties:
  *             email:
  *               type: string
  *               format: email
  *             password:
  *               type: string
  *             name:
  *               type: string
  *             phoneNumber:
  *               type: string
  *             address:
  *               type: string
  *             adharNumber:
  *               type: string
  *             access:
  *               type: object
  *               properties:
  *                 sellProduct:
  *                   type: boolean
  *                 addProduct:
  *                   type: boolean
  *           required:
  *             - email
  *             - password
  *             - name
  *             - phoneNumber
  *             - address
  *             - adharNumber
  *             - access
  *     responses:
  *       '200':
  *         description: Employee added successfully
  *       '400':
  *         description: Bad request
  *       '500':
  *         description: Internal Server Error
  */
  updateEmployee,
  /**
  * @swagger
  * /updateEmployee/{id}:
  *   put:
  *     summary: Update an existing employee
  *     description: Use this API to update an employee's information.
  *     tags:
  *       - Admin
  *     parameters:
  *       - in: header
  *         name: Authorization
  *         description: JWT token obtained during authentication
  *         required: true
  *         type: string
  *       - in: path
  *         name: id
  *         description: ID of the employee to update
  *         required: true
  *         schema:
  *           type: string
  *       - in: body
  *         name: employee
  *         description: Employee details to update
  *         required: true
  *         schema:
  *           type: object
  *           properties:
  *             email:
  *               type: string
  *               format: email
  *             password:
  *               type: string
  *             name:
  *               type: string
  *             phoneNumber:
  *               type: string
  *             address:
  *               type: string
  *             adharNumber:
  *               type: string
  *             access:
  *               type: object
  *               properties:
  *                 sellProduct:
  *                   type: boolean
  *                 addProduct:
  *                   type: boolean
  *     responses:
  *       '200':
  *         description: Employee updated successfully
  *       '400':
  *         description: Bad request
  *       '500':
  *         description: Internal Server Error
  */
  viewEmployeeById,
  /**
  * @swagger
  * /viewEmployee/{id}:
  *   get:
  *     summary: View employee details
  *     description: Use this API to view details of a specific employee.
  *     tags:
  *       - Admin
  *     parameters:
  *       - in: header
  *         name: Authorization
  *         description: JWT token obtained during authentication
  *         required: true
  *         type: string
  *       - in: path
  *         name: id
  *         description: ID of the employee to view
  *         required: true
  *         schema:
  *           type: string
  *     responses:
  *       '200':
  *         description: Employee details retrieved successfully
  *       '404':
  *         description: Employee not found
  *       '500':
  *         description: Internal Server Error
  */
  viewAllEmployees,
  /**
  * @swagger
  * /viewAllEmployees:
  *   get:
  *     summary: View all employees
  *     description: Use this API to view details of all employees.
  *     tags:
  *       - Admin
  *     parameters:
  *       - in: header
  *         name: Authorization
  *         description: JWT token obtained during authentication
  *         required: true
  *         type: string
  *     responses:
  *       '200':
  *         description: Employees details retrieved successfully
  *       '500':
  *         description: Internal Server Error
  */
  deleteEmployee,
  /**
 * @swagger
 * /deleteEmployee/{id}:
 *   delete:
 *     summary: Delete an employee
 *     description: Use this API to delete an employee by ID.
 *     tags:
 *       - Admin
 *     parameters:
 *       - in: header
 *         name: Authorization
 *         description: JWT token obtained during authentication
 *         required: true
 *         type: string
 *       - in: path
 *         name: id
 *         description: ID of the employee to delete.
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Employee deleted successfully
 *       '500':
 *         description: Internal Server Error
 */

  forgotPassword,
  /**
 * @swagger
 * tags:
 *   - name: User login
 *     description: APIs for Super Admin login Management
 *
 * /forgot-password:
 *   post:
 *     summary: Forget Password
 *     description: Use this API to initiate the password reset process
 *     tags:
 *       - User login
 *     produces:
 *       - application/json
 *     consumes:
 *       - application/json
 *     parameters:
 *       - in: body
 *         name: email
 *         description: The email of the user
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             email:
 *               type: string
 *               description: The email of the user
 *               example: john@gmail.com
 *     responses:
 *       200:
 *         description: Successful response indicating that the password reset process has been initiated
 *       400:
 *         description: Bad request - Missing or invalid parameters
 *       401:
 *         description: Unauthorized - Invalid credentials
 *       500:
 *         description: Internal server error
 */
  userPasswordReset,
  /**
 * @swagger
 * tags:
 *   - name: User login
 *     description: APIs for Super Admin login Management
 *
 * /password-reset/{token}:
 *   post:
 *     summary: Update Password
 *     description: Use this API to update the password using a reset token
 *     tags:
 *       - User login
 *     produces:
 *       - application/json
 *     consumes:
 *       - application/json
 *     parameters:
 *       - in: path
 *         name: token
 *         description: The reset token received via email
 *         required: true
 *         schema:
 *           type: string
 *           example: "resetToken123"
 *       - in: body
 *         name: passwordData
 *         description: The new password and confirm password
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             password:
 *               type: string
 *               description: The new password
 *               example: new1234
 *             confirm_password:
 *               type: string
 *               description: The confirm password
 *               example: new1234
 *     responses:
 *       200:
 *         description: Successful response indicating successful password update
 *       400:
 *         description: Bad request - Missing or invalid parameters
 *       401:
 *         description: Unauthorized - Invalid or expired token
 *       440:
 *         description: session expired
 *       500:
 *         description: Internal server error
 */
// OFFER
/**
  * @swagger
  * tags:
  *   - name: Offer
  *     description: API to add an offer
  * definitions:
  *   Offer:
  *     type: object
  *     properties:
  *       offerName:
  *         type: string
  *         required: true
  *       OfferDiscount:
  *         type: number
  *         required: true
  *       MinimumQuantity:
  *         type: number
  *       status:
  *         type: string
  *         enum:
  *           - active
  *           - inactives
  *         default: active
  */
addOffer,
/**
  * @swagger
  * /offer/add:
  *   post:
  *     summary: Add a new offer
  *     description: Use this API to save a new offer
  *     tags:
  *       - Offer
  *     produces:
  *       - application/json
  *     consumes:
  *       - application/json
  *     parameters:
  *       - in: header
  *         name: Authorization
  *         description: JWT token obtained during authentication
  *         required: true
  *         type: string
  *       - in: body
  *         name: offer
  *         description: Offer details to store
  *         schema:
  *           $ref: '#/definitions/Offer'
  *     responses:
  *       200:
  *         description: OK
  */
viewOffer,
/**
  * @swagger
  * /offer:
  *   get:
  *     summary: View all offers
  *     description: Retrieve a list of all offers
  *     tags:
  *       - Offer
  *     produces:
  *       - application/json
  *     parameters:
  *       - in: header
  *         name: Authorization
  *         description: JWT token obtained during authentication
  *         required: true
  *         type: string
  *     responses:
  *       200:
  *         description: OK
  *         schema:
  *           type: array
  *           items:
  *             $ref: '#/definitions/Offer'
  *       401:
  *         description: Unauthorized
  *       500:
  *         description: Internal Server Error
  */
editOffer,
/**
  * @swagger
  * /offer/edit/{id}:
  *   put:
  *     summary: Edit an existing offer
  *     description: Update details of an existing offer by ID
  *     tags:
  *       - Offer
  *     produces:
  *       - application/json
  *     consumes:
  *       - application/json
  *     parameters:
  *       - in: header
  *         name: Authorization
  *         description: JWT token obtained during authentication
  *         required: true
  *         type: string
  *       - in: path
  *         name: id
  *         description: ID of the offer to edit
  *         required: true
  *         type: string
  *       - in: body
  *         name: offer
  *         description: Offer details to update
  *         schema:
  *           $ref: '#/definitions/Offer'
  *     responses:
  *       200:
  *         description: OK
  *       400:
  *         description: Bad Request
  *       401:
  *         description: Unauthorized
  *       404:
  *         description: Not Found
  *       500:
  *         description: Internal Server Error
  */
deleteOffer,
/**
  * @swagger
  * /offer/delete/{id}:
  *   delete:
  *     summary: Delete an offer
  *     description: Remove an existing offer by ID
  *     tags:
  *       - Offer
  *     produces:
  *       - application/json
  *     parameters:
  *       - in: header
  *         name: Authorization
  *         description: JWT token obtained during authentication
  *         required: true
  *         type: string
  *       - in: path
  *         name: id
  *         description: ID of the offer to delete
  *         required: true
  *         type: string
  *     responses:
  *       200:
  *         description: OK
  *       401:
  *         description: Unauthorized
  *       404:
  *         description: Not Found
  *       500:
  *         description: Internal Server Error
  */
  
// PRODUCT OFFER
/**
  * @swagger
  * tags:
  *   - name: ProductOffer
  *     description: API to add a product offer
  * definitions:
  *   ProductOffer:
  *     type: object
  *     properties:
  *       productName:
  *         type: string
  *         description: Name of the product
  *         required: true
  *       categoryName:
  *         type: string
  *         description: Category of the product
  *         required: true
  *       offerName:
  *         type: string
  *         description: Name of the offer
  *         required: true
  *       startDate:
  *         type: string
  *         description: Start date of the offer
  *         required: true
  *       EndDate:
  *         type: string
  *         description: End date of the offer
  *         required: true
  */
addproductOffer,
/**
  * @swagger
  * /ProductOffer/add:
  *   post:
  *     summary: Add a new product offer
  *     description: Use this API to save a new product offer
  *     tags:
  *       - ProductOffer
  *     produces:
  *       - application/json
  *     consumes:
  *       - application/json
  *     parameters:
  *       - in: header
  *         name: Authorization
  *         description: JWT token obtained during authentication
  *         required: true
  *         type: string
  *       - in: body
  *         name: productOffer
  *         description: Product offer details to store
  *         schema:
  *           $ref: '#/definitions/ProductOffer'
  *     responses:
  *       200:
  *         description: OK
  *       400:
  *         description: Bad Request
  *       401:
  *         description: Unauthorized
  *       500:
  *         description: Internal Server Error
  */
viewproductOffers,
/**
  * @swagger
  * /ProductOffer:
  *   get:
  *     summary: View all product offers
  *     description: Retrieve a list of all product offers
  *     tags:
  *       - ProductOffer
  *     produces:
  *       - application/json
  *     parameters:
  *       - in: header
  *         name: Authorization
  *         description: JWT token obtained during authentication
  *         required: true
  *         type: string
  *     responses:
  *       200:
  *         description: OK
  *         schema:
  *           type: array
  *           items:
  *             $ref: '#/definitions/ProductOffer'
  *       401:
  *         description: Unauthorized
  *       500:
  *         description: Internal Server Error
  */
editproductOffer,
/**
  * @swagger
  * /ProductOffer/edit/{id}:
  *   put:
  *     summary: Edit an existing product offer
  *     description: Update details of an existing product offer by ID
  *     tags:
  *       - ProductOffer
  *     produces:
  *       - application/json
  *     consumes:
  *       - application/json
  *     parameters:
  *       - in: header
  *         name: Authorization
  *         description: JWT token obtained during authentication
  *         required: true
  *         type: string
  *       - in: path
  *         name: id
  *         description: ID of the product offer to edit
  *         required: true
  *         type: string
  *       - in: body
  *         name: productOffer
  *         description: Product offer details to update
  *         schema:
  *           $ref: '#/definitions/ProductOffer'
  *     responses:
  *       200:
  *         description: OK
  *       400:
  *         description: Bad Request
  *       401:
  *         description: Unauthorized
  *       404:
  *         description: Not Found
  *       500:
  *         description: Internal Server Error
  */
deleteproductOffer,
/**
  * @swagger
  * /ProductOffer/delete/{id}:
  *   delete:
  *     summary: Delete a product offer
  *     description: Remove an existing product offer by ID
  *     tags:
  *       - ProductOffer
  *     produces:
  *       - application/json
  *     parameters:
  *       - in: header
  *         name: Authorization
  *         description: JWT token obtained during authentication
  *         required: true
  *         type: string
  *       - in: path
  *         name: id
  *         description: ID of the product offer to delete
  *         required: true
  *         type: string
  *     responses:
  *       200:
  *         description: OK
  *       401:
  *         description: Unauthorized
  *       404:
  *         description: Not Found
  *       500:
  *         description: Internal Server Error
  */

}