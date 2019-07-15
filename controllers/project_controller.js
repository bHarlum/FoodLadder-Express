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

// REQUIREMENTS: id for the project you want to retrieve
// KEY: 'id'
async function show(req, res) {
  let response = "Default response for project-show: Seems like we have encountered a new edgecase";
  try {
    const project = await ProjectModel.findOne(req.body.id);
    response = project;
  }catch(error){
    response = "Error: Encountered an error in project-show: " + error;
  }
  res.send(response);
}

// REQUIREMENTS: copy of updated object.
// KEY: 'updatedProject'
async function update(req, res) {
  let response =  "Default response for project-update: A new edge case has been found."
  const {updatedProject} =  req.body;
  try {
    const project = await ProjectModel.updateOne(updatedProject);
    response = "Success! Project updated.";
  }catch(error){
    console.log(error);
    response =  (error);
  }
  res.send(response);
}

// REQUIREMENTS: A copy of the new Object.
// KEY: 'newProject'
function create(req, res) {
  let response = genericError();

}

function genericError(error){
  return error ? 
    `Error: While trying to ${customErrorMessage.caller} on Project-controller: " + ${error}` : 
    `Error: unhandled case. ${customErrorMessage.caller} on Project-controller.`;
}

module.exports = {
  index,
  show,
  update,
  create
}
