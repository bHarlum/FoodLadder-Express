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
function update(req, res) {
  const {updatedProject, projectId} =  req.body;
  ProjectModel.findOneAndUpdate(
    { _id: projectId },
    { ...updatedProject }
  ).then(response => {
    res.send(response);
  }).catch(err => {
    res.send(err);
  });
}

// REQUIREMENTS: A copy of the new Object.
// KEY: 'newProject'
async function create(req, res) {
  const {newProject} = req.body;
  try {
    const project = await ProjectModel.create(newProject)
      await generator({
      email: project.users[0].email, 
      projectName: project.name,
      name: newProject.userName, 
      code: project._id,
      address: req.headers.origin,
    });
    res.send("success");
  } 
  catch (error){
    res.status(500);
    res.send("Server error");
  }
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

function uploadFile(req, res) {
  const { id } = req.headers;
  const project = ProjectModel.findOneAndUpdate({_id: id},
    {$push: {files: {link: req.file.key, size: req.file.size}}},
    {safe: true, upsert: true},
    (error, model) => {
      if(error){
        res.send(error)
      }
      console.log(model);
      res.send("Success!");
    }
    );
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
  findCurrent,
  uploadFile
}
