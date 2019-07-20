
const multer = require("multer");
const multerS3 = require("multer-s3");
const s3 = require("./s3_config");

// File type whitelist
const fileTypes = {
  "image/png": true,
  "image/jpeg": true,
  "image/jpg": true,
  "text/plain": true,
};

const filter = (req, file, cb) => {
  if(fileTypes[file.mimetype]){
    cb(null, true);
  }
  else{
    cb(new Error(`Invalid file type, valid formats: ${Object.keys(fileTypes)}`));
  }
}

const upload = multer({
  fileFilter: filter,
  storage: multerS3({
    acl: 'private',
    s3,
    bucket: 'food-ladder-resources-bucket',
    metadata: (req, file, cb) => {
      console.log("metadata")
      cb(null, {fieldName: file.fieldname});
    },
    key: function (req, file, cb) {
      console.log(file.originalname);
      cb(null, `uploads/${Date.now().toString()}-${file.originalname}`)
    }
  })
});

module.exports = upload.single('file');
