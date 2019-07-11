const UserModel = require("./../database/models/user_model");

function index(req, res) {
  return res.send("Thread index");
}

function show(req, res) {
  return res.send("Thread show");
}

function edit(req, res) {
  return res.send("Thread edit");
}

function update(req, res) {
  return res.send("Thread update");
}

function make(req, res) {
  return res.send("Thread make");
}

function create(req, res) {
  return res.send("Thread create");
}

function destroy(req, res) {
  return res.send("Thread destroy");
}

module.exports = {
  index,
  show,
  edit,
  update,
  make,
  create,
  destroy
} 