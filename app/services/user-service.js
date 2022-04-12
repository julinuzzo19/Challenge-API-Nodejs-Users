const getUsersApi = require('../services/getUsersNotFounded');
const {uploadImage, removeImage} = require('../services/uploadImageS3');
const userRepository = require('../repositories/user-repository');

module.exports = {
  uploadImage: async ({path, mimetype, id}) => {
    return uploadImage({path, mimetype, id});
  },

  getAllUsers: async () => {
    return userRepository.getAll();
  },
  removeUser: async id => {
    const result = await userRepository.getUserById(id);
    if (result) {
      const deleted = await userRepository.remove(result.id);
      console.log({deleted});
      if (deleted) {
        await removeImage({key: result.image.key});
        return true;
      }
    }
    return null;
  },

  updateUser: async (id, data) => {
    return userRepository.updateUser(id, data);
  },
  createUser: async data => {
    return userRepository.createUser(data);
  }
};
