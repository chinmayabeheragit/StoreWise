
const bannerService = require('../services/banner.service')
const adminservice = require('../services/admin.service')
const superAdminservice = require('../services/super.admin.service')
const StatusCode = require("../../commons/utils/statusCode");
const response = require("../../commons/response/response");
const mongoose = require("mongoose");
const addBanner = async (req, res) => {
  let session;
  try {
    session = await mongoose.startSession();
    session.startTransaction();
    const bannerData = {
      ...req.body,
      email:req.userName,
    };
    const result = await bannerService.addBanner(bannerData,session);
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
const listBanners = async (req, res) => {
  let session;
  try {
    const result = await bannerService.listBanners();
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
const editBanner = async (req, res) => {
  let session;
  try {
    const result = await bannerService.editBanner(
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
const deleteBanner = async (req, res) => {
  let session;
  try {
    const result = await bannerService.deleteBanner(req.params.id);
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
const viewBannerById = async (req, res) => {
  let session;
  try {
    const result = await bannerService.viewBannerById(
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
const addAdmin = async (req, res) => {
  let session;
  try {
    session = await mongoose.startSession();
    session.startTransaction();
    const result = await adminservice.addAdmin(req.body,req.userName, session);
    await session.commitTransaction();
    return response.handleSuccessResponse(
      { successCode: StatusCode.SUCCESS_CODE, result },
      res,
      "Admin added successfully."
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
const viewAdmins = async (req, res) => {
  let session;
  try {
    const result = await adminservice.viewAdmins();
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
const updateAdmin = async (req, res) => {
  let session;
  try {
    const result = await adminservice.updateAdmin(
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
const deleteAdmin = async (req, res) => {
  let session;
  try {
    const result = await adminservice.deleteAdmin(req.params.id);
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
const viewAdminById = async (req, res) => {
  let session;
  try {
    const result = await adminservice.viewAdminById(
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
const createSuperAdmin= async (req, res) => {
  let session;
  try {
    session = await mongoose.startSession();
    session.startTransaction();
    const result = await superAdminservice.createSuperAdmin(req.body, session);
    await session.commitTransaction();
    return response.handleSuccessResponse(
      { successCode: StatusCode.SUCCESS_CODE, result },
      res,
      "SuperAdmin added successfully."
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
const viewSuperAdmins = async (req, res) => {
  let session;
  try {
    const result = await superAdminservice.viewSuperAdmins();
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
const updateSuperAdmin = async (req, res) => {
  let session;
  try {
    const result = await superAdminservice.updateSuperAdmin(
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
const deleteSuperAdmin = async (req, res) => {
  let session;
  try {
    const result = await superAdminservice.deleteSuperAdmin(req.params.id);
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
const superAdminlogin = async (req, res) => {
  let session;
  try {
    session = await mongoose.startSession();
    session.startTransaction()
    const result = await superAdminservice.login(req.body);
    await session.commitTransaction();
    return response.handleSuccessResponse(
      { successCode: StatusCode.SUCCESS_CODE, result },
      res,
      "superadmin login successfully."
    );
  } catch (error) {
    console.log(error)
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
  try {
      const result = await superAdminservice.fogotPassword(req.body)
      return response.handleSuccessResponse(
          result,
          res,
          "Reset link sent successfully",
          "Reset link sent successfully"
      );
  } catch (error) {
      return response.handleErrorResponse(
          { errorCode: StatusCode.SERVER_ERROR, message: "Internal Server Error" },
          res,
          error
      );
  }

}
const userPasswordReset = async (req, res) => {
  try {
      const result = await superAdminservice.userPasswordReset(req)
      return response.handleSuccessResponse(
          result,
          res,
          "Password changed successfully",
          "Password changed successfully"
      );
  } catch (error) {
      return response.handleErrorResponse(
          { errorCode: StatusCode.SERVER_ERROR, message: "Internal Server Error" },
          res,
          error
      );
  }
}
module.exports = {

 //BANNER
 /**
   * @swagger
   * tags:
   *   - name: Banner
   *     description: API TO ADD BANNER
   * definitions:
   *   Banner:
   *     type: object
   *     properties:
   *       bannerName:
   *         type: string
   *         required: true
   *       URL:
   *         type: string
   *         required: true
   *       displayStatus:
   *         type: boolean
   *         default: true
   */
  addBanner,
  /**
   * @swagger
   * /banners/add:
   *   post:
   *     summary: Add a new banner
   *     description: Use this API to save a new banner
   *     tags:
   *       - Banner
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
   *         name: banner
   *         description: Banner details to store
   *         schema:
   *           $ref: '#/definitions/Banner'
   *     responses:
   *       200:
   *         description: OK
   */
  listBanners,
  /**
   * @swagger
   * /banners:
   *   get:
   *     summary: Get all banners
   *     description: Use this API to retrieve all banners
   *     tags:
   *       - Banner
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
   *             $ref: '#/definitions/Banner'
   */
  editBanner,
  /**
   * @swagger
   * /banners/edit/{id}:
   *   put:
   *     summary: Edit a banner by ID
   *     description: Use this API to edit a banner by its ID
   *     tags:
   *       - Banner
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
   *         description: ID of the banner to edit
   *         required: true
   *         schema:
   *           type: string
   *       - in: body
   *         name: banner
   *         description: Updated banner details
   *         schema:
   *           $ref: '#/definitions/Banner'
   *     responses:
   *       200:
   *         description: OK
   */
  deleteBanner,
  /**
   * @swagger
   * /banners/delete/{id}:
   *   delete:
   *     summary: Delete a banner by ID
   *     description: Use this API to delete a banner by its ID
   *     tags:
   *       - Banner
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
   *         description: ID of the banner to delete
   *         required: true
   *         schema:
   *           type: string
   *     responses:
   *       200:
   *         description: banner deleted successfully
   *       404:
   *         description: banner not found
   *       500:
   *         description: Internal Server Error
   */
  viewBannerById,
  /**
   * @swagger
   * /banners/view/{id}:
   *   get:
   *     summary: View a banner by ID
   *     description: Use this API to view a banner by its ID
   *     tags:
   *       - Banner
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
   *         description: ID of the banner to view
   *         required: true
   *         schema:
   *           type: string
   *     responses:
   *       200:
   *         description: OK
   *         schema:
   *           $ref: '#/definitions/Banner'
   */

  //ADMIN

  /**
 * @swagger
 * definitions:
 *   Admin:
 *     type: object
 *     properties:
 *       name:
 *         type: string
 *       email:
 *         type: string
 *       password:
 *         type: string
 *       phoneNumber:
 *         type: string
 *       address:
 *         type: string
 *       profilePicture:
 *         type: string
 */

  addAdmin,
  /**
 * @swagger
 * /add-admin:
 *   post:
 *     summary: Add a new admin
 *     description: Use this endpoint to add a new admin to the system.
 *     tags:
 *       - Admin Management
 *     parameters:
 *       - in: header
 *         name: Authorization
 *         description: JWT token obtained during authentication
 *         required: true
 *         type: string
 *       - in: body
 *         name: admin
 *         description: Admin details to add
 *         required: true
 *         schema:
 *           $ref: '#/definitions/Admin'
 *     responses:
 *       200:
 *         description: Admin added successfully
 *       400:
 *         description: Bad request, validation failed
 *       500:
 *         description: Internal Server Error
 */
  viewAdmins,
  /**
   * @swagger
   * /all-admins:
   *   get:
   *     summary: Get all admins
   *     description: Retrieve a list of all admins in the system.
   *     tags:
   *       - Admin Management
   *     parameters:
   *       - in: header
   *         name: Authorization
   *         description: JWT token obtained during authentication
   *         required: true
   *         type: string
   *     responses:
   *       200:
   *         description: A list of all admins
   *         schema:
   *           type: array
   *           items:
   *             $ref: '#/definitions/Admin'
   *       500:
   *         description: Internal Server Error
   */

updateAdmin,
  /**
   * @swagger
   * /admin/edit/{id}:
   *   put:
   *     summary: Update admin by ID
   *     description: Update an existing admin by their ID.
   *     tags:
   *       - Admin Management
   *     parameters:
   *       - in: header
   *         name: Authorization
   *         description: JWT token obtained during authentication
   *         required: true
   *         type: string
   *       - name: id
   *         in: path
   *         description: ID of the admin to update
   *         required: true
   *         type: string
   *       - in: body
   *         name: admin
   *         description: New admin details
   *         required: true
   *         schema:
   *           $ref: '#/definitions/Admin'
   *     responses:
   *       200:
   *         description: Admin updated successfully
   *       400:
   *         description: Bad request, validation failed
   *       404:
   *         description: Admin not found
   *       500:
   *         description: Internal Server Error
   */
deleteAdmin,
  /**
   * @swagger
   * /admin/delete/{id}:
   *   delete:
   *     summary: Delete admin by ID
   *     description: Delete an existing admin by their ID.
   *     tags:
   *       - Admin Management
   *     parameters:
   *       - in: header
   *         name: Authorization
   *         description: JWT token obtained during authentication
   *         required: true
   *         type: string
   *       - name: id
   *         in: path
   *         description: ID of the admin to delete
   *         required: true
   *         type: string
   *     responses:
   *       200:
   *         description: Admin deleted successfully
   *       404:
   *         description: Admin not found
   *       500:
   *         description: Internal Server Error
   */

viewAdminById,
  /**
   * @swagger
   * /admin/view/{id}:
   *   get:
   *     summary: Get admin by ID
   *     description: Retrieve an admin by their ID.
   *     tags:
   *       - Admin Management
   *     parameters:
   *       - in: header
   *         name: Authorization
   *         description: JWT token obtained during authentication
   *         required: true
   *         type: string
   *       - name: id
   *         in: path
   *         description: ID of the admin to retrieve
   *         required: true
   *         type: string
   *     responses:
   *       200:
   *         description: Admin found
   *         schema:
   *           $ref: '#/definitions/Admin'
   *       404:
   *         description: Admin not found
   *       500:
   *         description: Internal Server Error
   */
  //SUPER ADMIN
    /**
 * @swagger
 * definitions:
 *   SuperAdmin:
 *     type: object
 *     properties:
 *       name:
 *         type: string
 *       email:
 *         type: string
 *       password:
 *         type: string
 *       mobileNumber:
 *         type: string
 *       address:
 *         type: string
 *       profilePicture:
 *         type: string
 */
    createSuperAdmin, 
    /**
     * @swagger
     * /add-super-admin:
     *   post:
     *     summary: Create a new super admin
     *     description: Use this endpoint to create a new super admin in the system.
     *     tags:
     *       - SuperAdmin Management  
     *     parameters:
     *       - in: body
     *         name: SuperAdmin
     *         description: Super admin details to create
     *         required: true
     *         schema:
     *           $ref: '#/definitions/SuperAdmin'
     *     responses:
     *       200:
     *         description: Super admin created successfully
     *       400:
     *         description: Bad request, validation failed
     *       500:
     *         description: Internal Server Error
     */

    viewSuperAdmins,
  /**
   * @swagger
   * /all-superAdmins:
   *   get:
   *     summary: Get all super admins
   *     description: Retrieve a list of all super admins in the system.
   *     tags:
   *       - SuperAdmin Management
   *     parameters:
   *       - in: header
   *         name: Authorization
   *         description: JWT token obtained during authentication
   *         required: true
   *         type: string
   *     responses:
   *       200:
   *         description: A list of all super admins
   *         schema:
   *           type: array
   *           items:
   *             $ref: '#/definitions/SuperAdmin'
   *       500:
   *         description: Internal Server Error
   */

updateSuperAdmin,
  /**
   * @swagger
   * /superAdmin/edit/{id}:
   *   put:
   *     summary: Update super admin by ID
   *     description: Update an existing super admin by their ID.
   *     tags:
   *       - SuperAdmin Management
   *     parameters:
   *       - in: header
   *         name: Authorization
   *         description: JWT token obtained during authentication
   *         required: true
   *         type: string
   *       - name: id
   *         in: path
   *         description: ID of the super admin to update
   *         required: true
   *         type: string
   *       - in: body
   *         name: superAdmin
   *         description: New super admin details
   *         required: true
   *         schema:
   *           $ref: '#/definitions/SuperAdmin'
   *     responses:
   *       200:
   *         description: Super admin updated successfully
   *       400:
   *         description: Bad request, validation failed
   *       404:
   *         description: Super admin not found
   *       500:
   *         description: Internal Server Error
   */

deleteSuperAdmin,
  /**
   * @swagger
   * /superAdmin/delete/{id}:
   *   delete:
   *     summary: Delete super admin by ID
   *     description: Delete an existing super admin by their ID.
   *     tags:
   *       - SuperAdmin Management
   *     parameters:
   *       - in: header
   *         name: Authorization
   *         description: JWT token obtained during authentication
   *         required: true
   *         type: string
   *       - name: id
   *         in: path
   *         description: ID of the super admin to delete
   *         required: true
   *         type: string
   *     responses:
   *       200:
   *         description: Super admin deleted successfully
   *       404:
   *         description: Super admin not found
   *       500:
   *         description: Internal Server Error
   */
  superAdminlogin,
/**
 * @swagger
 * /superAdmin-login:
 *   post:
 *     summary: Login for super admin
 *     description: Use this API to log in a super admin.
 *     tags:
 *       - Super Admin
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
 *         description: Super admin logged in successfully
 *       '400':
 *         description: Bad request
 *       '401':
 *         description: Unauthorized - Invalid credentials
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

}