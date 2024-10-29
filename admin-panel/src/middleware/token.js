const jwt = require('jsonwebtoken');

const generateAuthToken = (email, password,role) => {
    try {
        return jwt.sign({ email, password, role }, process.env.SECRET_KEY);
    } catch (error) {
        throw error;
    }
};
module.exports = {
    generateAuthToken
}