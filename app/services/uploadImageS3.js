const fs = require('fs');
const {upload, remove} = require('../utils/AWS-S3');

const removeTempFile = path => {
  fs.unlink(path, err => {
    if (err) throw err;
  });
};

module.exports = {
  uploadImage: async ({path, mimetype, id}) => {
    try {
      const fileName = `userAvatar-${id}`;

      const body = fs.createReadStream(path);
      const {Location, key} = await upload({body, fileName, mimetype});

      removeTempFile(path);
      return {Location, key};
    } catch (error) {
      console.log(error);
    }
  },
  removeImage: async ({key}) => {
    await remove({key});
  }
};
