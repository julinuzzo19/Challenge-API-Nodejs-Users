const AWS = require('aws-sdk');

const S3 = new AWS.S3({
  region: process.env.AWS_DEFAULT_REGION,
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
});

module.exports = {
  upload: ({body, fileName, mimetype}) => {
    const params = {
      Bucket: process.env.AWS_S3_BUCKET,
      Key: `${fileName}`,
      Body: body,
      ACL: 'public-read',
      ContentType: mimetype
    };
    return S3.upload(params).promise();
  },
  remove: ({key}) => {
    const params = {
      Bucket: process.env.AWS_S3_BUCKET,
      Key: key
    };
    return S3.deleteObject(params).promise();
  }
};
