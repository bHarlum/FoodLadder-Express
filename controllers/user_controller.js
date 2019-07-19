const UserModel = require('./../database/models/user_model');
const bcrypt = require('bcryptjs');
const passport = require('passport');
const JWTService = require("./../services/jwt_service");

function index(req, res) {
  return res.send('I will get all users');
}

function show(req, res) {
  const { user } = req;
  const { _id: id, firstName, lastName, admin } = user;
  return res.send({ id, firstName, lastName, admin});
}

function update(req, res) {
  return res.send('User update');
}

function register(req, res, next) {
	const { firstName, lastName, phone, email, password } = req.body;

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

async function uploadFile(req, res) {
  const { id } = req.body;
  const user = await UserModel.findOneAndUpdate({_id: id},{profilePicture});
  res.send(user);
}

module.exports = {
  index,
  show,
  update,
  register,
  login,
  logout,
  uploadFile
};
