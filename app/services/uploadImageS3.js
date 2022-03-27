const fs = require('fs');
const {upload} = require('../utils/AWS-S3');

const removeTempFile = path => {
  fs.unlink(path, err => {
    if (err) throw err;
  });
};

module.exports = {
  uploadImage: async ({path, id, mimetype}) => {
    try {
      const fileName = `userAvatar-${id}`;

      const body = fs.createReadStream(path);
      const {Location} = await upload({body, fileName, mimetype});
      removeTempFile(path);
      return Location;
    } catch (error) {
      console.log(error);
    }
  }
};
