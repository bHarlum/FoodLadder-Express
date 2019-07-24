const { isCelebrate } = require("celebrate");

module.exports = function(err, req, res, next) {
  if(isCelebrate(err)){
    err.statusCode = 400;
    console.log(err.message);
    console.log("running validation middleware");
    switch(err.message){
      case "That is not a valid phone number.":
        err.message = err.message;
        break;
      default:
        err.message = "There seem to be errors in the form.";
    }
    console.log(err.message);
    return res.status(err.statusCode).send(err.message);
  }

  return next(err);
}