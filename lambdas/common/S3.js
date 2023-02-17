const AWS = require('aws-sdk');

const s3Client = new AWS.S3();

const S3 = {
  async get(fileName, bucketName) {
    const params = {
      Bucket: bucketName,
      Key: fileName,
    };

    let data = await s3Client.getObject(params).promise();

    if (!data) {
      throw Error(`No Item found with provided FileName: ${fileName}`);
    }

    // check data for json file
    if (fileName.slice(-5) === '.json') {
      data = JSON.parse(data.Body.toString());
    }

    return data;
  },

  async write(data, fileName, bucketName) {
    const params = {
      Bucket: bucketName,
      Key: fileName,
      Body: JSON.stringify(data),
    };

    const res = await s3Client.putObject(params).promise();

    if (!res) {
      throw Error(`Could not write data to bucket: ${bucketName}`);
    }

    return data;
  },
};

module.exports = S3;
