const UserModel = require("./../database/models/user_model");

function index(req, res) {
  return res.send("User index");
}

function show(req, res) {
  return res.send("User show");
}

function edit(req, res) {
  return res.send("User edit");
}

function update(req, res) {
  return res.send("User update");
}

function make(req, res) {
  return res.send("User make");
}

function create(req, res) {
  return res.send("User create");
}

module.exports = {
  index,
  show,
  edit,
  update,
  make,
  create
}