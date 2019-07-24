const { isCelebrate } = require("celebrate");

module.exports = function(err, req, res, next) {
  if(isCelebrate(err)){
    err.statusCode = 400;
    err.message = "There seem to be errors in the form."
    console.log("running valiation middleware");
    return res.status(err.statusCode).send(err.message);
  }

  return next(err);
}