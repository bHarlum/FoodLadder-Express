const UserModel = require("./../database/models/user_model");
const ProjectModel = require("./../database/models/project_model");

function show(req, res) {
  return res.send("Notifications show");
}


function create(req, res) {

}

function destroy(req, res) {

}

module.exports = {
  show,
  create,
  destroy
}