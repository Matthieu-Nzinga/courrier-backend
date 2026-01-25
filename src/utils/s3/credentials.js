const { S3Client } = require("@aws-sdk/client-s3");

if (!process.env.AWS_REGION) {
  throw new Error('AWS_REGION is not defined in environment variables');
}

if (!process.env.AWS_ACCESS_KEY || !process.env.AWS_SECRET_KEY) {
  throw new Error('AWS credentials are not defined in environment variables');
}

exports.s3Client = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY,
    secretAccessKey: process.env.AWS_SECRET_KEY,
  },
});
