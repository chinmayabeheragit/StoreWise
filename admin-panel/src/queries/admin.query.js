const {Admin}  = require('../models/admin.model')
const addAdmin = async (adminData, session) => {
    try {
      const result = new Admin(adminData)
      await result .save( session);
      return result;
    } catch (error) {
      throw error;
    }
  };
  const viewAdmins = async () => {
    try {
      const result = await Admin.find();
      return result;
    } catch (error) {
      throw error;
    }
  };
  const updateAdmin = async (id, updatedData) => {
    try {
        const result = await Admin.findOneAndUpdate({ _id: id }, updatedData, { new: true});
        return result;
    } catch (error) {
        throw error;
    }
};
const deleteAdmin = async (id) => {
    try {
        const result = await Admin.findByIdAndDelete( id );
        return result;
    } catch (error) {
        throw error;
    }
};
const viewAdminById = async (id) => {
    try {
      return await Admin.findById({ _id: id } );
    } catch (error) {
      throw error;
    }
  };
  module.exports = {
    addAdmin,
    viewAdmins,
    updateAdmin,
    deleteAdmin,
    viewAdminById
  }