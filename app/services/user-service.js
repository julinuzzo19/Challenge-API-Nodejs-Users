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
        if (result.image?.key) {
          await removeImage({key: result.image.key});
          return true;
        }
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
  },
  getUser: async arrayIds => {
    const result = [];
    const notFoundIds = [];

    await Promise.all(
      arrayIds.map(async id => {
        const userFounded = await userRepository.getUserById(id);
        console.log(userFounded);
        if (userFounded) result.push(userFounded);
        else {
          notFoundIds.push(id);
        }
      })
    );

    await getUsersApi(notFoundIds);

    return result;
  }
};
