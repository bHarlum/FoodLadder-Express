const express = require("express");
const router = express.Router();

const upload = require("./../services/resource_bucket/upload_manager");

const singleUpload = upload.single('file');

router.post('/upload', (req,res) => {
  singleUpload(req,res, (error) => {
    console.log("file/upload route hit");
    if(error) return console.log(error);
    return res.json({imageUrl: req.file.location })
  });
});

module.exports = router;