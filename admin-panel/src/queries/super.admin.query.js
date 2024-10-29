const {superadmin}  = require('../models/super.admin.model')
const createSuperAdmin = async (superAdminData, session) => {
    try {
        const result = new superadmin(superAdminData)
      await result .save( session);
      return result;
    } catch (error) {
      throw error;
    }
  };
  const viewSuperAdmins = async () => {
    try {
      const result = await superadmin.find();
      return result;
    } catch (error) {
      throw error;
    }
  };
  const updateSuperAdmin = async (id, updatedData) => {
    try {
        const result = await superadmin.findOneAndUpdate({ _id: id }, updatedData, { new: true});
        return result;
    } catch (error) {
        throw error;
    }
};
const deleteSuperAdmin = async (id) => {
    try {
        const result = await superadmin.findByIdAndDelete( id );
        return result;
    } catch (error) {
        throw error;
    }
};
const findByEmail = async (email) => {
  try {
      const user = await superadmin.findOne({ email });
      return user;
  } catch (error) {
      throw error;
  }
};
const updatePassword = async (resetPasswordToken) => {
  try {
      return await superadmin.findOne({ resetPasswordToken: resetPasswordToken })
  } catch (error) {
      throw error
  }
}
  module.exports = {
    createSuperAdmin,
    viewSuperAdmins,
    updateSuperAdmin,
    deleteSuperAdmin,
    findByEmail,
    updatePassword
  }