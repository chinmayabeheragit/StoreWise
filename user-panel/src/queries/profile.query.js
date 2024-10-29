const { UserProfile } = require('../models/profile.model')
const createProfile = async (profileData, session) => {
    try {
        const newProfile = new UserProfile(profileData);
        await newProfile.save(session);
        return newProfile;
    } catch (error) {
        throw error;
    }
};
const updateProfile = async (id, updatedData,session) => {
    try {
        return await UserProfile.findByIdAndUpdate({ _id: id } , updatedData, {session, new: true});
    } catch (error) {
        throw error;
    }
};
const viewUserProfile = async () => {
    try{
      return await UserProfile.find()
    }catch(error) {
      throw error;
    }
  }
  const viewUserProfileById = async (id) => {
    try {
      return await UserProfile.findById(id );
    } catch (error) {
      throw error;
    }
  };
module.exports = {
    createProfile,
    updateProfile,
    viewUserProfile,
    viewUserProfileById
}