const Joi = require('joi');
const response = require("../../commons/response/response");
const StatusCodes = require("../../commons/utils/statusCode");


const validateProduct = (req, res, next) => {
  const schema = Joi.object({
    productId: Joi.string().required().label("Enter Valid ProductID"),
    productCategory: Joi.string().required().label("Product Category is Required"),
    productName: Joi.string().required().label("Product Name is Required"),
    productCost: Joi.number().required().label("Product Cost Is Required"),
    productSellingPrice: Joi.number().required().label("Product Selling Price is Required"),
    productDiscount: Joi.number().required().label("Product Discount is Required"),
    totalQuantityCost:Joi.number().required().label("total quantity cost is required"),
    productSupplier: Joi.string().required().label("Product Supplier is Required"),
    productManufacturer: Joi.string().required().label("Product Manufacturer is Required"),
    productQuantity: Joi.object({
      value: Joi.number().min(1).required().label("Product Quantity value"),
      unit: Joi.string().valid("g", "kg", "l", "ml", "q", "T").label("Product Quantity unit"),
    }).required().label("Product Quantity"),
    expiryDate: Joi.string().allow(null).optional().label("Expiry Date"),
    status: Joi.string().valid("unsold", "sold").default("unsold").label("Enter valid Status"),
  });

  const validateResult = schema.validate(req.body);
  if (validateResult.error) {
    let errorMessage = validateResult.error.details[0].context.label;
    let displayMessage = errorMessage;
    if (!errorMessage) {
      errorMessage = StatusCodes.BAD_REQUEST;
    }
    return response.handleErrorResponse(
      {
        errorCode: StatusCodes.BAD_REQUEST,
        message: errorMessage,
        displayMessage: displayMessage,
      },
      res
    );
  }
  next();
};


const  validateCategory = (req, res, next) => {
    const schema = Joi.object({
        categoryName: Joi.string().required().label("Category Name is Required"),
        productNames: Joi.array().items(Joi.string()).required().label("Product Names is Required"),
        gstPercentage: Joi.number().min(1).required().label("GST Percentage is Required"),
        gstRate: Joi.number().min(1).required().label("GST Rate is Required"),
        discount: Joi.number().min(1).label("Discount is Required")
    });

    const validateResult = schema.validate(req.body);
    if (validateResult.error) {
        let errorMessage = validateResult.error.details[0].context.label;
        let displayMessage = errorMessage;
        if (!errorMessage) {
            errorMessage = StatusCodes.BAD_REQUEST;
        }
        return response.handleErrorResponse({ errorCode: StatusCodes.BAD_REQUEST, message: errorMessage, displayMessage: displayMessage }, res);
    }u
    next();
}

const validateProductDiscount = (req, res, next) => {
    const schema = Joi.object({
      productId: Joi.string().required().label("Product ID is Required"),
      productDiscount: Joi.number().min(1).required().label("Product Discount is Required"),
    });
  
    const validateResult = schema.validate(req.body);
    if (validateResult.error) {
      let errorMessage = validateResult.error.details[0].context.label;
      let displayMessage = errorMessage;
      if (!errorMessage) {
        errorMessage = "Invalid request data";
      }
      return response.handleErrorResponse(
        { errorCode: StatusCodes.BAD_REQUEST, message: errorMessage, displayMessage: displayMessage },
        res
      );
    }
    next();
  }
  
  function validateCategoryDiscount(req, res, next) {
    const schema = Joi.object({
      categoryName: Joi.string().required().label("Category Name is Required"),
      discount: Joi.number().min(1).required().label("Discount is Required"),
    });
  
    const validateResult = schema.validate(req.body);
    if (validateResult.error) {
      let errorMessage = validateResult.error.details[0].context.label;
      let displayMessage = errorMessage;
      if (!errorMessage) {
        errorMessage = "Invalid request data";
      }
      return response.handleErrorResponse(
        { errorCode: StatusCodes.BAD_REQUEST, message: errorMessage, displayMessage: displayMessage },
        res
      );
    }
    next();
  }
  const validateBanner = async (req, res, next) => {
    const schema = Joi.object({
        bannerName: Joi.string().required().label("Banner Name is Required"),
        URL: Joi.string().required().label("URL for the banner is Required"),
        displayStatus: Joi.boolean().default(true),
    });
    try {
        await schema.validateAsync(req.body);
        next();
    } catch (error) {
        return response.handleErrorResponse(
            {
                errorCode: statusCode.BAD_REQUEST,
                message: error,
                displayMessage: { error: error.details[0].message },
            },
            res
        );
    }
};
function validateProfile(req, res, next) {
  const schema = Joi.object({
      name: Joi.string().required().label("Please enter a valid Name"),
      mobileNo: Joi.string().required().label("Please enter a valid Mobile Number"),
      email: Joi.string().email().required().label("Please enter a valid Email").messages({
          "string.email": "Please enter a valid Email"
      }),
      address: Joi.string().label("Please enter a valid Address"),
      profilePicture: Joi.string().label("Please enter a valid Profile Picture"),
  });

  try {
      schema.validateAsync(req.body)
          .then(() => next())
          .catch(error => {
              const errorMessage = error.details[0].message;
              return response.handleErrorResponse(
                  {
                      errorCode: StatusCodes.BAD_REQUEST,
                      message: errorMessage,
                      displayMessage: { error: errorMessage },
                  },
                  res
              );
          });
  } catch (error) {
      return response.handleErrorResponse(
          {
              errorCode: StatusCodes.INTERNAL_SERVER_ERROR,
              message: "Internal Server Error",
              displayMessage: { error: "Internal Server Error" },
          },
          res
      );
  }
}

const validateSuperadmin = (req, res, next) => {
  const schema = Joi.object({
    name: Joi.string().required().label("Name is Required"),
    email: Joi.string().email().required().label("Valid Email is Required"),
    password: Joi.string().required().label("Password is Required"),
    mobileNumber: Joi.string().required().label("Mobile Number is Required"),
    address: Joi.string().allow(null, '').label("Address"),
    profilePicture: Joi.string().allow(null, '').label("Profile Picture"),
  });
  const validateResult = schema.validate(req.body);
  if (validateResult.error) {
    const errorMessage = validateResult.error.details[0].message;
    return response.handleErrorResponse(
      {
        errorCode: StatusCodes.BAD_REQUEST,
        message: errorMessage,
        displayMessage: errorMessage,
      },
      res
    );
  }
  next();
};

const validateAdmin = (req, res, next) => {
  const schema = Joi.object({
    name: Joi.string().required().label("Name is Required"),
    email: Joi.string().email().required().label("Valid Email is Required"),
    password: Joi.string().required().label("Password is Required"),
    phoneNumber: Joi.string().required().label("Mobile Number is Required"),
    address: Joi.string().allow(null, '').label("Address"),
    profilePicture: Joi.string().allow(null, '').label("Profile Picture"),
  });
  const validateResult = schema.validate(req.body);
  if (validateResult.error) {
    const errorMessage = validateResult.error.details[0].message;
    return response.handleErrorResponse(
      {
        errorCode: StatusCodes.BAD_REQUEST,
        message: errorMessage,
        displayMessage: errorMessage,
      },
      res
    );
  }
  next();
};

module.exports = {
    validateCategory,
    validateProduct,
    validateProductDiscount,
    validateCategoryDiscount,
    validateBanner,
    validateProfile,
    validateSuperadmin,
    validateAdmin
};
