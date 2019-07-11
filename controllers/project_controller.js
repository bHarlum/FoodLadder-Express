const ProjectModel = require("./../database/models/project_model");

function index(req, res) {
  return res.send("Projects index");
}

function show(req, res) {
  return res.send("Projects show");
}

function edit(req, res) {
  return res.send("Projects edit");
}

function update(req, res) {
  return res.send("Projects update");
}

function make(req, res) {
  return res.send("Projects make");
}

function create(req, res) {
  return res.send("Projects create");
}

module.exports = {
  index,
  show,
  edit,
  update,
  make,
  create
}