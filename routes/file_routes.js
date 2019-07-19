const express = require("express");
const router = express.Router();
const upload = require("./../services/resource_bucket/upload_manager");
const singleUpload = upload.single('file');


router.post('/upload', (req,res) => {
  console.log("printing from route" + req.file)
  singleUpload(req,res,(error) => {
    if(error) return console.log(error);
    return res.json({imageUrl: req.file.location })
  });
});

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