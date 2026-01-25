const { PutObjectCommand } = require("@aws-sdk/client-s3");
const { s3Client } = require("./credentials");

exports.putObject = async (file, fileName) => {
  try {
    const params = {
      Bucket: process.env.AWS_S3_BUCKET,
      Key: `${fileName}`,
      Body: file,
      ContentType: "application/pdf",
    };
    const command = new PutObjectCommand(params);
    const data = await s3Client.send(command);

    if (data.$metadata.httpStatusCode !== 200) {
      throw new Error("Failed to upload file to S3");
    }

    let url = `https://${process.env.AWS_S3_BUCKET}.s3.${process.env.AWS_REGION}.amazonaws.com/${params.Key}`;

    return { url, key: params.Key };
  } catch (err) {
    console.error("S3 Upload Error:", err);
    throw err;
  }
};
