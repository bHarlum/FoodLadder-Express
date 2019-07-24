const ProjectModel = require("./../database/models/project_model");
const generator = require("./../mailer/generator");

// Returns an array of all projects
function index(req, res, next) {
  ProjectModel.find()
    .then(projects => {
      return res.send(projects);
    }).catch(err =>{
      next(new HTTPError(err.status, err.message));
    });
}

// REQUIREMENTS: id for the project you want to retrieve
// KEY: 'id'
async function show(req, res, next) {
  ProjectModel.findOne({ _id: req.params.id})
    .then(project => {
      res.send(project);
    }).catch(err => {
      next(new HTTPError(err.status, err.message));
    });
}

// REQUIREMENTS: copy of updated object.
// KEY: 'updatedProject'
async function update(req, res) {
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

async function uploadFile(req, res) {
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
