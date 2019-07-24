const { isCelebrate } = require("celebrate");

module.exports = function(err, req, res, next) {
  if(isCelebrate(err)){
    err.statusCode = 400;
    err.message = "There seem to be errors in the form."
    return res.status(err.statusCode).send(err.message);
  }

  return next(err);
}