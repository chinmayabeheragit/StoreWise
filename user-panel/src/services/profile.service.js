const ProfileQuery = require('../queries/profile.query')
const createProfile = async (body, session,email) => {
    try {
        body.email = email
        return await ProfileQuery.createProfile(body, session);;
    } catch (error) {
        throw error;
    }
};
const updateProfile = async (id, updatedData, session) => {
    try {
        return await ProfileQuery.updateProfile(id, updatedData, session);
    } catch (error) {
        throw error;
    }
};
const viewUserProfile = async () => {
    try {
        const result = await ProfileQuery.viewUserProfile();
        return result;
    } catch (error) {
        throw error
    }
};
const viewUserProfileById = async (id) => {
    try {
        const result = await ProfileQuery.viewUserProfileById(id);
        if (!result) {
            throw customException.error(
                StatusCode.SUCCESS_CODE,
                null,
                "profile with the provided ID does not exist."
            );
        }
        return result;
    } catch (error) {
        throw error;
    }
};
module.exports = {
    createProfile,
    updateProfile,
    viewUserProfile,
    viewUserProfileById
};