const { isCelebrate } = require("celebrate");

module.exports = function(err, req, res, next) {
  if(isCelebrate(err)){
    console.log(err);
    err.statusCode = 400;
    err.message = "There seem to be errors in the form."
    console.log("running valiation middleware");
    console.log(err.message);
    return res.status(err.statusCode).send(err.message);
  }

  return next(err);
}