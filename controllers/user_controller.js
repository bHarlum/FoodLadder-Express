const UserModel = require('./../database/models/user_model');
const JWTService = require("./../services/jwt_service");

async function index(req, res) {
  const users = await UserModel.find();
  const emails = users.map(user => {
    return user.email;
  });
  return res.send(emails);
}

function show(req, res) {
  const { user } = req;
  const { _id: id, firstName, lastName, admin } = user;
  return res.send({ id, firstName, lastName, admin});
}

async function find(req, res) {
  const { userEmail } = req.params;
  console.log("Getting user by email\n-----------------------------\n")
  const user = await UserModel.findOne({ email: userEmail }, function(err, obj) {
    if(err){
      return null;
    }

    return obj;
  });
  console.log("-----------------------------\nUser=")
  console.log(user);
  return user ? res.send(user) : res.send(null);
}

function update(req, res) {
  return res.send("empty update function");
}

async function register(req, res, next) {
	const { firstName, lastName, phone, email, password, projectId } = req.body;

	UserModel.register({ firstName, lastName, phone, email }, password, function(err, user) {
		if (err) {
			console.log(err);
    }
    const newUser = UserModel.findByIdAndUpdate(
      user._id,
      {$push: {projects: {projectId}}},
      {safe: true, upsert: true},
      function(err, model) {
          console.log(err);
      }
    )
    
    const token = JWTService.generateToken(user._id);

    return res.json({ 
      token,
      id: user._id,
      firstName: user.firstName
    });
  });
}

function login(req, res) {  
  const { user } = req;
  const { projectId } = req.body;
  const token = JWTService.generateToken(user);
  
  console.log(projectId);
  if(projectId){
    console.log("adding project to user");
    UserModel.findByIdAndUpdate(
      user._id,
      {$push: {projects: {projectId}}},
      {safe: true, upsert: true},
      function(err, model) {
          console.log(err);
      }
    )
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
  const user = await UserModel.findOneAndUpdate({_id: id},{profilePicture});
  res.send(user);
}

module.exports = {
  index,
  show,
  find,
  update,
  // addProject,
  register,
  login,
  logout,
  uploadFile
};
