const UserModel = require('./../database/models/user_model');
const bcrypt = require('bcryptjs');
const passport = require('passport');
const jwt = require('jsonwebtoken');

function index(req, res) {
  return res.send('I will get all users');
}

function show(req, res) {
  return res.send('User show');
}

function update(req, res) {
  return res.send('User update');
}

// Creating a new user.
async function register(req, res) {
  const { newUser } = req.body;
  let response =
    'Default response for user-create function: Something has gone wrong.';

  bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(req.body.password, salt, (err, hash) => {
      if (err) throw err;
      req.body.password = hash;
    });
  });

  try {
    user = await UserModel.create(newUser);
    response = 'User created Hoorah!';
  } catch (error) {
    console.log(error);
    response =
      'Error: While trying to create a new user an error was encountered: ' +
      error;
  }
  res.send(response);
}

// Login existing user and generate token
function login(req, res) {
  const token = jwt.sign({ sub: req.user }, process.env.JWT_SECRET);
  res.json(token);

  // passport.authenticate('local', {
  //   successRedirect: '/dashboard',
  //   failureRedirect: '/login'
  // })(req, res);
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
