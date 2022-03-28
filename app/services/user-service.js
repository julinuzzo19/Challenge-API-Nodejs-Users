const getUsersApi = require('../services/getUsersNotFounded');
const {uploadImage} = require('../services/uploadImageS3');
const userRepository = require('../repositories/user-repository');

module.exports = {
  uploadImage: async ({path, mimetype, id}) => {
    const user = await userRepository.getUserById(id);

    if (user) {
      const image = await uploadImage({path, id, mimetype});

      return userRepository.updateUser(id, {data: {image}});
    }
    return null;
  },

  getAllUsers: async () => {
    return userRepository.getAll();
  },
  removeUser: id => {
    return userRepository.remove(id);
  },

  updateUser: async (id, data) => {
    return userRepository.updateUser(id, data);
  },
  createUser: async data => {
    return userRepository.createUser(data);
  }
};
