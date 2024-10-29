const express = require('express');
const router = express.Router();
const controller = require('../controllers/controllers')
const validator = require('../validator/validator')
const auth = require('../middleware/auth')

router.post('/addcategory',auth,validator.validateCategory,controller.addCategory)
router.get('/viewproductsname',auth,controller.viewProductsName)
router.get('/viewcategory',auth,controller.viewCategory)
router.delete('/delete-category/:id',auth,controller.deleteCategory)
router.put('/updatecategory/:id',auth,controller.updatecategory)

router.post('/customer-details',controller.CustomerDetails)
router.post('/calculate-product-total', controller.calculateProductTotal);
router.post('/calculate-cart-total', controller.calculateCartTotal);
router.get('/view-all-sold-products',controller.viewAllSoldProducts)
router.delete('/delete-sold-product/:soldProductId',controller.deleteSoldProduct)

router.get('/view-current-stock-number',auth,controller.viewCurrentStockNumber)
router.get('/view-total-low-stock-number',auth,controller.viewLowStockProductsNumber)
router.get('/products-by-category/:categoryName',auth,controller.viewProductsByCategory)
router.get('/current-stocks-by-week/:startDate', auth,controller.getCurrentStocksByWeek);
router.get('/low-stocks-by-week/:startDate',auth, controller.getLowStocksByWeek);
router.get('/recently-added-products/:startDate', auth,controller.getRecentlyAddedProducts);
router.get('/updateInventory',auth, controller.UpdateInventoryQuantity);
router.get('/currentStockWithIncrease',auth, controller.viewCurrentStockNumberWithIncrease);

router.post('/add-product-discount',controller.addProductDiscount);
router.post('/add-category-discount',controller.addCategoryDiscount);
router.get('/category-discounts',auth, controller.getCategoryDiscounts);
router.get('/product-discounts', auth,controller.viewProductDiscount);
router.put('/update-category-discount', auth,controller.updateCategoryDiscount);
router.put('/update-product-discount',auth, controller.updateProductDiscount);
router.delete('/delete-product-discount',auth, controller.deleteProductDiscount);
router.delete('/delete-category-discount', auth,controller.deleteCategoryDiscount);

router.post("/addproduct",auth,validator.validateProduct, controller.addProduct);
router.get('/viewproduct',auth,controller.getAllProducts)
router.delete('/delete-product/:id',auth,controller.deleteProduct)
router.get("/viewproduct-by-id/:id",auth, controller.viewProductById);
router.put("/product/edit/:id",auth, controller.editProduct);

router.get('/totalProfit',controller.getTotalProfit)
router.get('/getRemainingDaysUntilExpiry',controller.getRemainingDaysUntilExpiry)
router.get('/trending-products',controller.getTrendingProducts)
router.get('/topselling-categories',controller.topSellingCategories)
router.get('/get-total-revenue',controller.getToatlRevenue)

router.post('/create/profile',auth,validator.validateProfile, controller.createProfile);
router.put('/update/profile/:id',auth, controller.updateProfile);
router.get('/getUserProfile',auth,controller.viewUserProfile);
router.get('/getUserProfileById/:id',auth,controller.viewUserProfileById);

router.post('/admin-login',controller.Adminlogin)
router.post('/employee-login',controller.Employeelogin)
router.post("/forgot-password",controller.forgotPassword)
router.post("/password-reset/:token", controller.userPasswordReset)
router.post('/addEmployee',auth, validator.validateAddEmployee,controller.addEmployee)
router.put('/updateEmployee/:id',auth, validator.validateAddEmployee,controller.updateEmployee);
router.get('/viewEmployee/:id',auth, controller.viewEmployeeById);
router.get('/viewAllEmployees',auth, controller.viewAllEmployees);
router.delete('/deleteEmployee/:id', auth,controller.deleteEmployee);

router.post('/offer/add',auth, controller.addOffer);
router.get('/offer',auth,controller.viewOffer);
router.put('/offer/edit/:id',auth,controller.editOffer);
router.delete('/offer/delete/:id',auth,controller.deleteOffer);

router.post('/ProductOffer/add',auth, controller.addproductOffer);
router.get('/ProductOffer',auth,controller.viewproductOffers);
router.put('/ProductOffer/edit/:id',auth,controller.editproductOffer);
router.delete('/ProductOffer/delete/:id',auth,controller.deleteproductOffer);
// router.delete('/ProductOffer/delete/:id',auth,controller.deleteproductOffer);


module.exports = router;