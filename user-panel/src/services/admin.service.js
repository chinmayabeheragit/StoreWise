const adminQuery = require('../queries/admin.query')
const generateAuthToken = require('../middleware/token')
const customException = require('../../commons/exception/customException')
const statusCode = require('../../commons/utils/statusCode')
const sendMail = require("../../commons/nodemailer/nodemailer");
const crypto = require('crypto');

const login = async (body) => {
    try {
     const { username, password } = body;
      const user = await adminQuery.findByEmail(username);
      let isValidCredentials = false;
      if (user) {
        isValidCredentials = (password === user.password);     
      }
      if (!isValidCredentials) {
        throw customException.error(
          statusCode.SUCCESS_CODE,
          null,
          "Invalid Credentials"
        );
      }
      const role = user.role;
      const token = await generateAuthToken.generateAuthToken(username, password, role);
      return [{role:role, token: token}];
    } catch (error) {
      throw error;
    }
  };

  const fogotPassword = async (body) => {
    try {
        let getEmail = body.email
        const getUserDetails = await adminQuery.findByEmail(getEmail);
        if (!getUserDetails) {
            return ({ statusCode: statusCode.UN_AUTHORIZED, message: "invalid cradantial" })
        }

        const resetToken = crypto.randomBytes(20).toString('hex');
        getUserDetails.resetPasswordToken = resetToken;
        getUserDetails.resetPasswordExpires = Date.now() + (15 * 60 * 1000);
        await getUserDetails.save();
        let subject = "Password Reset";
        let message = `You are receiving this email because you (or someone else) have requested the reset of the password for your account.\n\n
        Please click on the following link, or paste this into your browser to complete the process:\n\n
        <a>click this link
        http://localhost:3000/rest/api/password-reset/${resetToken}\n\n
        If you did not request this, please ignore this email and your password will remain unchanged.\n`
        sendMail(getEmail, subject, message)
        return { success: true, message: 'Reset email sent successfully' };
    } catch (error) {
        throw error
    }
}
const userPasswordReset = async (req) => {
  let { token } = req.params
  let { password, confirm_password } = req.body
  try {
      if (password !== confirm_password) {
          return ({ statusCode: statusCode.UN_AUTHORIZED, message: "password didn't match" })

      }
      const getuser = await adminQuery.updatePassword(token)
      if (!getuser) {
          return ({ statusCode: statusCode.SESSION_EXPIRED, message: "session alraedy expired . Please note that the reset link you used is valid for one-time use only. If you need to reset your password again, please request a new reset link. Thank you!" })
      }
      if (Date.now() > getuser.resetPasswordExpires) {
          getuser.resetPasswordToken = undefined;
          getuser.resetPasswordExpires = undefined;
          await getuser.save();
      }
      if (getuser) {
          getuser.password = password;
          getuser.resetPasswordToken = undefined;
          getuser.resetPasswordExpires = undefined;
          await getuser.save();
          return { success: true, message: 'Password changed Sucessfully' };

      } else {
          return { success: true, message: 'Your password has been successfully updated. Please note that the reset link you used is valid for one-time use only. If you need to reset your password again, please request a new reset link. Thank you!' };
      }
  } catch (error) {
      throw error
  }
};

  module.exports = {
    login,
    fogotPassword,
    userPasswordReset
  }