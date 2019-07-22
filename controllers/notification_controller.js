const UserModel = require("./../database/models/user_model");
const ProjectModel = require("./../database/models/project_model");

function current(req, res) {
  return res.send("Notifications show");
}


function create(req, res) {

}

function destroy(req, res) {

}

module.exports = {
  current,
  create,
  destroy
}