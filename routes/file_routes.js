const express = require("express");
const router = express.Router();
const upload = require("./../services/resource_bucket/upload_manager");
// const singleUpload = upload.single('file');




router.post('/upload', (req,res) => {
  upload(req,res,(error) => {
    if(error) return error;
    return res.json({imageUrl: req.file.location })
  });
});


// const filter = (req, file, cb) => {
//   if(fileTypes[file.mimetype]){
//     cb(null, true);
//   }
//   else{
//     cb(new Error(`Invalid file type, valid formats: ${Object.keys(fileTypes)}`));
//   }
// }

router.get('/download', (req, res, next) => {
  const file = 'df.csv';
  console.log('Trying to download file', fileKey);

  const s3 = new aws.S3({});

  const options = {
      Bucket: 'your-bucket-name',
      Key: file,
  };

  s3.getObject(options, function(err, data) {
    res.attachment(file);
    res.send(data.Body);
  });
});

module.exports = router;