const {Admin} = require('../models/admin.model')
const findByEmail = async (email) => {
    try {
        const user = await Admin.findOne({ email });
        return user;
    } catch (error) {
        throw error;
    }
};
const updatePassword = async (resetPasswordToken) => {
    try {
        return await Admin.findOne({ resetPasswordToken: resetPasswordToken })
    } catch (error) {
        throw error
    }
}

module.exports = {
    findByEmail,
    updatePassword
}