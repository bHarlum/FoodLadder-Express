const aws = require("aws-sdk");
const multer = require("multer");
const multerS3 = require("multer-s3");

 const s3 = new aws.S3({
  secretAccessKey: process.env.S3_PRIVATE,
  accessKeyId: process.env.S3_PUBLIC,
  region: 'ap-southeast-2'
});

const fileTypes = {
  "image/png": true,
  "image/jpeg": true,
  "image/jpg": true
};

const filter = (req, res, next) => {
  if(fileTypes[file.mimetype]){
    next(null, true);
  }
  else{
    next(new Error(`Invalid file type, valid formats: ${fileTypes.key}`));
  }
}

const upload = multer({
  filter,
  storage: multerS3({
    acl: 'private',
    s3,
    bucket: 'food-ladder-resources-bucket',
    metadata: (req, file, next) => {
      next(null, {fieldName: file.fieldname});
    },
    key: function (req, res, next) {
      next(null, Date.now().toString())
    }
  })
});

module.exports = upload;
