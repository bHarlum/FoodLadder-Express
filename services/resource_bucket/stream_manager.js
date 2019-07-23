const s3 = require("./s3_bucket");

function stream(req, res, next) {

  const options = {
    Bucket: 'food-ladder-resources-bucket',
    Key: req.params[0]
  }

  const stream = s3.getObject(options).createReadStream();

  stream.on('error', function (err) {
    next(err);
  });

  stream.pipe(res);

}

module.exports= stream;
