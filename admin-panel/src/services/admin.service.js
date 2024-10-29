const adminQuery = require('../queries/admin.query')
const bcrypt = require('bcrypt');
const addAdmin = async ({ name, email, password, phoneNumber, address, profilePicture }, session) => {
    try {
      const adminData = {
        name,
        email,
        password,
        phoneNumber,
        address,
        profilePicture,
      };
      const result = await adminQuery.addAdmin(adminData, session);
      return result;
    } catch (error) {
      throw error;
    }
  };
  const viewAdmins = async () => {
    try {
      const result = await adminQuery.viewAdmins();
      return result;
    } catch (error) {
      throw error;
    }
  };
  const updateAdmin = async (id, updatedData, session) => {
    try {
      const result = await adminQuery.updateAdmin(id, updatedData, session);
      return result;
    } catch (error) {
      throw error;
    }
  };
  const deleteAdmin = async (id) => {
    try {
      const result = await adminQuery.deleteAdmin(id);
      return result;
    } catch (error) {
      throw error;
    }
  };
  const viewAdminById = async (id) => {
      try {
        const result = await adminQuery.viewAdminById( id );
        if (!result) {
          return "Admin not found.";
        }
        return result;
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