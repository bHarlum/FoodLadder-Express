const UserModel = require('./../database/models/user_model');
const ProjectModel = require("./../database/models/project_model");
const JWTService = require("./../services/jwt_service");

// Returns a list of all user emails
async function index(req, res, next) {
  UserModel.find()
    .then(users => {
      const emails = users.map(user => {
        return user.email;
      });
      return res.send(emails);
    }).catch(err => {
      next(new DatabaseError(err.status, err.message));
    })
}

// Gets current user
function show(req, res) {
  try {
    const { user } = req;
    const { _id: id, firstName, lastName, admin } = user;
    return res.send({ id, firstName, lastName, admin});
  } catch(err) {
    return next(new HTTPError(err.status, err.message));
  }
}

//Gets user by email (uses params)
async function find(req, res) {
  const { userEmail } = req.params;
  const user = await UserModel.findOne({ email: userEmail }, function(err, obj) {
    if(err){
      return next(new HTTPError(err.status, err.message));
    }
    return obj;
  });

  return user ? res.send(user) : res.send(null);
}

function update(req, res) {
  const { user } = req;
  const { _id } = user; 
  const { updatedValues } = req.body;
  UserModel.findOneAndUpdate(
    { _id },
    { ...updatedValues }
  ).then(response => {
    res.send(response);
  }).catch(err => {
    return next(new HTTPError(err.status, err.message));
  })
}

// Adds project to user
function addProjectToUser(userId, projectId){
  UserModel.findByIdAndUpdate(
    userId,
    {$push: {projects: {projectId}}},
    {upsert: true},
    function(err, model) {
      if (err) {
        return next(new DatabaseError(err.status, err.message));
      }
      return model;
    }
  );
}

// Activates Project
function activateProject(projectId){
  ProjectModel.findByIdAndUpdate(
    projectId,
    { activated: true },
    function(err, model) {
      if (err) {
        return next(new DatabaseError(err.status, err.message));
      }
      return model;
    }
  );
}

//Registers User
async function register(req, res, next) {
	const { firstName, lastName, phone, email, password, projectId } = req.body;

  // Uses passport local mongoose to register a user and encrypt password
	UserModel.register({ firstName, lastName, phone, email }, password, async function(err, user) {
		if (err) {
      return next(new DatabaseError(err.status, err.message));
    }

    // Adds project to user on successful register
    await addProjectToUser(user._id, projectId);
    
    // Changes 'activated' status of project to true
    await activateProject(projectId);

    const token = JWTService.generateToken(user._id);

    return res.json({ 
      token,
      id: user._id,
      firstName: user.firstName
    });
  });
}

//Logs in user with passport local method
async function login(req, res) {  
  const { user } = req;
  const { projectId } = req.body;
  const token = JWTService.generateToken(user);
  
  //Adds new project to existing user if a projectId is passed in
  if(projectId){
    // Adds project to user on successful login
    await addProjectToUser(user._id, projectId);
    
    // Changes 'activated' status of project to true
    await activateProject(projectId);
  }

  return res.json({ 
    token,
    id: user._id,
    firstName: user.firstName
  });
}

function logout(req, res) {
  req.logout();
  res.send("logged out");
}

async function uploadFile(req, res) {
  const { id } = req.body;
  try {
    const user = await UserModel.findOneAndUpdate({_id: id},{profilePicture: req.file.location});
    res.send(user);  
  } catch(err) {
    return next(new DatabaseError(err.status, err.message));
  }
}

module.exports = {
  index,
  show,
  find,
  update,
  register,
  login,
  logout,
  uploadFile
};
