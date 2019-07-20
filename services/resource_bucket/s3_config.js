const aws = require("aws-sdk");

 const s3 = new aws.S3({
  secretAccessKey: process.env.S3_PRIVATE,
  accessKeyId: process.env.S3_PUBLIC,
  region: 'ap-southeast-2'
});

module.exports= s3;