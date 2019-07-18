const UserModel = require('./../database/models/user_model');
const JWTService = require("./../services/jwt_service");

function index(req, res) {
  return res.send('I will get all users');
}

function show(req, res) {
  const { user } = req;
  const { _id: id, firstName, lastName, admin } = user;
  return res.send({ id, firstName, lastName, admin});
}

async function find(req, res) {
  const { userEmail } = req.params;
  const user = await UserModel.findOne({ email: userEmail });
  return res.send(user);
}

async function addProject(req, res) {
  const { user } = req;
  const { projectId } = req.body;

  const newUser = UserModel.findByIdAndUpdate(
    user._id,
    {$push: {projects: projectId}},
    {safe: true, upsert: true},
    function(err, model) {
        console.log(err);
    }
  )

  return res.json({newUser});
}

function update(req, res) {
  return res.send("empty update function");
}

function register(req, res, next) {
	const { firstName, lastName, phone, email, password, projectId } = req.body;

	UserModel.register({ firstName, lastName, phone, email }, password, function(err, user) {
		if (err) {
			return next(err);
    }

    console.log(user);

		const token = JWTService.generateToken(user._id);
		return res.json({ 
      token,
      id: user._id,
      firstName: user.firstName
    });
	});
}

function login(req, res) {  
  console.log("running login function");
  const { user } = req;
  const token = JWTService.generateToken(user);
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

module.exports = {
  index,
  show,
  find,
  update,
  addProject,
  register,
  login,
  logout
};
