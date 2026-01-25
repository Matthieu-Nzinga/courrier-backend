const { GetObjectCommand } = require("@aws-sdk/client-s3");
const { getSignedUrl: awsGetSignedUrl } = require("@aws-sdk/s3-request-presigner");
const { s3Client } = require("./credentials");

exports.getObject = async (key) => {
  try {
    const params = {
      Bucket: process.env.AWS_S3_BUCKET,
      Key: key,
    };

    const command = new GetObjectCommand(params);
    const data = await s3Client.send(command);
    console.log(data);
  } catch (err) {
    console.error(err);
  }
};

exports.getSignedUrl = (key, expiresIn = 3600) => {
  const params = {
    Bucket: process.env.AWS_S3_BUCKET,
    Key: key,
  };

  const command = new GetObjectCommand(params);
  return awsGetSignedUrl(s3Client, command, { expiresIn });
};
