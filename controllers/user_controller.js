const UserModel = require('./../database/models/user_model');
const ProjectModel = require("./../database/models/project_model");
const JWTService = require("./../services/jwt_service");

// Returns a list of all user emails
async function index(req, res) {
  UserModel.find()
    .then(users => {
      const emails = users.map(user => {
        return user.email;
      });
      return res.send(emails);
    }).catch(err => {
      res.status(err.status);
      res.send(err);
    })
}

// Gets current user
function show(req, res) {
  const { user } = req;
  const { _id: id, firstName, lastName, admin } = user;
  return res.send({ id, firstName, lastName, admin});
}

//Gets user by email (uses params)
async function find(req, res) {
  const { userEmail } = req.params;
  const user = await UserModel.findOne({ email: userEmail }, function(err, obj) {
    if(err){
      return null;
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
    res.status(err.status);
    res.send(err.message);
  })
}

async function register(req, res, next) {
	const { firstName, lastName, phone, email, password, projectId } = req.body;

	UserModel.register({ firstName, lastName, phone, email }, password, async function(err, user) {
		if (err) {
      res.status(err.status);
      return res.send(err.message);
    }

    await UserModel.findByIdAndUpdate(
      user._id,
      {$push: {projects: {projectId}}},
      {upsert: true},
      function(err, model) {
        if (err) {
          res.status(err.status);
          return res.send(err.message);
        }
        return model;
      }
    );
    
    await ProjectModel.findByIdAndUpdate(
      projectId,
      { activated: true },
      function(err, model) {
        if (err) {
          res.status(err.status);
          return res.send(err.message);
        }
        return model;
      }
    );
 

    const token = JWTService.generateToken(user._id);

    return res.json({ 
      token,
      id: user._id,
      firstName: user.firstName
    });
  });
}

async function login(req, res) {  
  const { user } = req;
  const { projectId } = req.body;
  const token = JWTService.generateToken(user);
  
  if(projectId){
    await UserModel.findByIdAndUpdate(
      user._id,
      {$push: {projects: {projectId}}},
      {safe: true, upsert: true},
      function(err, model) {
          console.log(err);
      }
    )
    await ProjectModel.findByIdAndUpdate(
      projectId,
      { activated: true },
      function(err, model) {
        console.log(err);
      }
    );
  }

  return res.json({ 
    token,
    id: user._id,
    firstName: user.firstName
  });
}

function logout(req, res) {
  req.logout();
  res.send("logged out?");
}

async function uploadFile(req, res) {
  const { id } = req.body;
  const user = await UserModel.findOneAndUpdate({_id: id},{profilePicture: req.file.location});
  res.send("Success!");
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
