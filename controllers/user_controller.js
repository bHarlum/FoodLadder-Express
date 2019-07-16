const UserModel = require('./../database/models/user_model');
const bcrypt = require('bcryptjs');
const passport = require('passport');
const JWTService = require("./../services/jwt_service");

function index(req, res) {
  return res.send('I will get all users');
}

function show(req, res) {
  return res.send('User show');
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
		return res.json({ token });
	});
}

// Login existing user and generate token
async function login(req, res, next) {
  const { email, password } = req.body;
  try {
    const { user, error } = await UserModel.authenticate()(email, password);
    if (error) throw error;
    const token = JWTService.generateToken(user._id);
    res.json(token);
  } catch(err) {
    return next(err);
  }
}

function logout(req, res) {
  req.logout();
  res.redirect('/');
}

module.exports = {
  index,
  show,
  update,
  register,
  login,
  logout
};
