const express = require("express");
const router = express.Router();
const passport = require("passport");
const upload = require("./../services/resource_bucket/upload_manager");
const stream = require("./../services/resource_bucket/stream_manager");
const download = require("./../services/resource_bucket/download_manager")

router.get('/export/*', stream);
router.get('/download/*', download);


module.exports = router;