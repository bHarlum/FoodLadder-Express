const s3 = require("./s3_bucket");

function download(req, res, next) {

  const options = {
    Bucket: 'food-ladder-resources-bucket',
    Key: req.params[0]
  }

  const stream = s3.getObject(options).createReadStream();

  res.set('Content-disposition', 'attachment; filename=download' + PathHelper.extname(path));
  res.set('Content-type', 'application/octet-stream');

  stream.on('error', function (err) {
    next(err);
  });

  stream.pipe(res);

}

module.exports= download;
