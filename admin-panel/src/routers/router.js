const express = require('express');
const router = express.Router();
const controller = require('../controllers/controllers')
const validator = require('../validator/validator')
const auth = require('../middleware/auth')

router.post('/banners/add',auth,validator.validateBanner, controller.addBanner);
router.get('/banners',auth,controller.listBanners);
router.get('/banners/view/:id',auth,controller.viewBannerById);
router.put('/banners/edit/:id',auth,controller.editBanner);
router.delete('/banners/delete/:id',auth,controller.deleteBanner);
router.post('/add-admin',auth,controller.addAdmin);
router.get('/all-admins',auth,controller.viewAdmins);
router.get('/admin/view/:id',auth,controller.viewAdminById);
router.put('/admin/edit/:id',auth,controller.updateAdmin);
router.delete('/admin/delete/:id',auth,controller.deleteAdmin);
router.post('/add-super-admin',validator.validateSuperadmin,controller.createSuperAdmin)
router.get('/all-superAdmins',auth,controller.viewSuperAdmins);
router.put('/superAdmin/edit/:id',auth,controller.updateSuperAdmin);
router.delete('/superAdmin/delete/:id',auth,controller.deleteSuperAdmin);
router.post('/superAdmin-login',controller.superAdminlogin)
router.post("/forgot-password", controller.forgotPassword)
router.post("/password-reset/:token", controller.userPasswordReset)
module.exports = router;