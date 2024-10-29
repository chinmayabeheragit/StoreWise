const Joi = require('joi');
const response = require("../../commons/response/response");
const StatusCodes = require("../../commons/utils/statusCode");


const validateProduct = (req, res, next) => {
  const schema = Joi.object({
    productId: Joi.string().required().label("Enter Valid ProductID"),
    productCategory: Joi.string().required().label("Product Category is Required"),
    productName: Joi.string().required().label("Product Name is Required"),
    HSNnumber:Joi.number().required().label("hsn number is required for product"),
    productCost: Joi.number().required().label("Product Cost Is Required"),
    productSellingPrice: Joi.number().required().label("Product Selling Price is Required"),
    productDiscount: Joi.number().required().label("Product Discount is Required"),
    totalQuantityCost: Joi.number().required().label("total quantity cost is required"),
    productSupplier: Joi.string().required().label("Product Supplier is Required"),
    productManufacturer: Joi.string().required().label("Product Manufacturer is Required"),
    productQuantity: Joi.object({
      value: Joi.number().min(1).required().label("Product Quantity value"),
      unit: Joi.string().valid("g", "kg", "l", "ml", "q", "T","pcs").label("Product Quantity unit"),
    }).required().label("Product Quantity"),
    expiryDate: Joi.string().allow(null).optional().label("Expiry Date"),
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


const validateCategory = (req, res, next) => {
  const schema = Joi.object({
    categoryName: Joi.string().required().label("Category Name is Required"),
    productNames: Joi.array().items(Joi.string()).required().label("Product Names is Required"),
    gstPercentage: Joi.number().min(1).required().label("GST Percentage is Required"),
    gstRate: Joi.number().min(1).required().label("GST Rate is Required"),
    discount: Joi.number().min(0).label("Discount is Required"),
  });

  const validateResult = schema.validate(req.body);
  if (validateResult.error) {
    let errorMessage = validateResult.error.details[0].context.label;
    let displayMessage = errorMessage;
    if (!errorMessage) {
      errorMessage = StatusCodes.BAD_REQUEST;
    }
    return response.handleErrorResponse({ errorCode: StatusCodes.BAD_REQUEST, message: errorMessage, displayMessage: displayMessage }, res);
  }
  next();
}

const validateProductDiscount = (req, res, next) => {
  const schema = Joi.object({
    categoryName: Joi.string().required().label("Category Name is Required"),
    productName: Joi.string().required().label("Product Name is Required"),
    productDiscount: Joi.number().min(1).required().label("Product Discount is Required"),
  }).options({ abortEarly: false, allowUnknown: false });

  const validateResult = schema.validate(req.body);
  if (validateResult.error) {
    let errorMessage = validateResult.error.details.map(detail => detail.message).join(", ");
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




const validateCategoryDiscount = (req, res, next) => {
  const schema = Joi.object({
    categoryName: Joi.string().required().label("Category Name is Required"),
    discount: Joi.number().min(0).required().label("Discount is Required"),
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

const validateProfile = (req, res, next) => {
  const schema = Joi.object({
    name: Joi.string().required().label("Please enter a valid Name"),
    mobileNo: Joi.string().required().label("Please enter a valid Mobile Number"),
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

const validateAadharNumber = (aadharNumber) => {
  const aadharRegex = /^[2-9]\d{3}\s[2-9]\d{3}\s\d{4}$/;
  if (!aadharRegex.test(aadharNumber)) {
    return false;
  }
  const digitsOnly = aadharNumber.replace(/\D/g, '');
  if (digitsOnly.length !== 12) {
    return false;
  }
  if (aadharNumber.charAt(0) === '0' || aadharNumber.charAt(0) === '1') {
    return false;
  }
  if (!/^\d+$/.test(digitsOnly)) {
    return false;
  }
  return true;
}

const validateAddEmployee = (req, res, next) => {
  const schema = Joi.object({
    name: Joi.string().required().label("Please enter a valid Name"),
    phoneNumber: Joi.string().required().label("Please enter a valid Mobile Number"),
    email: Joi.string().email().required().label("Please enter a valid Email").messages({
      "string.email": "Please enter a valid Email"
    }),
    password: Joi.string().required().label("Please enter a valid Password"),
    address: Joi.string().label("Please enter a valid Address"),
    adharNumber: Joi.string().required().label("Please enter a valid Adhar Number"),
    access: Joi.object({
      sellProduct: Joi.boolean().required(),
      addProduct: Joi.boolean().required()
    }).required()
  });

  try {
    schema.validateAsync(req.body)
      .then(() => {
        const { adharNumber } = req.body;
        const isValidAadhar = validateAadharNumber(adharNumber);
        if (!isValidAadhar) {
          const errorMessage = "Invalid Aadhar Number";
          return response.handleErrorResponse(
            {
              errorCode: StatusCodes.BAD_REQUEST,
              message: errorMessage,
              displayMessage: { error: errorMessage },
            },
            res
          );
        }
        next();
      })
      .catch(error => {
        return response.handleErrorResponse(
          {
            errorCode: StatusCodes.INTERNAL_SERVER_ERROR,
            message: "Internal Server Error",
            displayMessage: { error: "Internal Server Error" },
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
};


const validateOffer = (req, res, next) => {
  const schema = Joi.object({
    offerName: Joi.string().required().label("Offer Name is Required"),
    OfferDiscount: Joi.number().required().label("Offer Discount is Required"),
    MinimumQuantity: Joi.number().default(1).label("Minimum Quantity"),
    status: Joi.string().valid('active', 'inactive').default('active').label("Status")
  });

  const validateResult = schema.validate(req.body);
  if (validateResult.error) {
    const errorMessage = validateResult.error.details[0].context.label || 'Bad Request';
    const displayMessage = errorMessage;
    return response.handleErrorResponse({
      errorCode: StatusCodes.BAD_REQUEST,
      message: errorMessage,
      displayMessage: displayMessage,
    }, res);
  }
  next();
};

module.exports = validateOffer;




module.exports = {
  validateCategory,
  validateProduct,
  validateProductDiscount,
  validateCategoryDiscount,
  validateProfile,
  validateAddEmployee
};
