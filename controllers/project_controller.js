const ProjectModel = require("./../database/models/project_model");

// 
async function index(req, res) {
  let response = genericError();
  try{
    const projects = await ProjectModel.find();
    response = projects;
  } catch (error) {
    console.log(error);
    response = genericError(error);
  }
  res.send(response);
}

// REQUIREMENTS: id for the project you want to retrieve
// KEY: 'id'
async function show(req, res) {
  let response = genericError();
  try{
    const project = await ProjectModel.findOne(req.body.id);
    response = project;
  }catch (error){
    console.log(error)
    response = genericError(error);
  }
  res.send(response);
}

// REQUIREMENTS: copy of updated object.
// KEY: 'updatedProject'
async function update(req, res) {
  let response =  genericError();
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
async function create(req, res) {
  let response = genericError();
  try {
    const project = await ProjectModel.create(newProject);
    response = "Success! Project created.";
  } catch (error){
    response = genericError(error);
    console.log(error);
  }
  res.send(resposne);
}

function genericError(error){
  return error ? 
    `Error: While trying to ${genericError.caller} on Project-controller: " + ${error}` : 
    `Error: Unhandled case. ${genericError.caller} on Project-controller.`;
}

module.exports = {
  index,
  show,
  update,
  create
}
