const ProjectModel = require("./../database/models/project_model");
const generator = require("./../mailer/generator");

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
    const project = await ProjectModel.findOne({ _id: req.params.id});
    response = project;
  }catch (error){
    console.log(error.message);
    response = null;
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
    response = project;
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
  const {newProject} = req.body;

  try {
    const project = await ProjectModel.create(newProject)
      await generator({
      email: project.users[0].email, 
      name: newProject.userName, 
      code: project._id});
      response = "Success! Project created.";
  } 
  catch (error){
    response = genericError(error);
    console.log(error);
  }
  res.send(response);
}

function findCurrent(req, res) {
  const { user } = req;
  const projects = user.projects.map(el => {
    return el.projectId;
  });
  ProjectModel.find({ _id: {
    $in: projects
  }}, function(err, docs){
    res.send(docs);
  });
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
  create,
  findCurrent
}
