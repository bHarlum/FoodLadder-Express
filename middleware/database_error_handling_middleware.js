module.exports = function(err, req, res, next) {
  if (err && err.name === "DatabaseError") {
    console.log("Database Error");
    return res.status(err.statusCode).send(err.message);
  }

  return next(err);
}