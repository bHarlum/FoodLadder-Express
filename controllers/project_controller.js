const ProjectModel = require("./../database/models/project_model");

// Returns all projects.
async function index(req, res) {
  try{
    const projects = await ProjectModel.find();
    projects.length == 0 ? res.send("Oh no, there doesn't seem to be any projects.") : res.send(projects);
  } catch (err) {
    console.log("Encountered an error while trying to get all projects " + err);
  }
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
