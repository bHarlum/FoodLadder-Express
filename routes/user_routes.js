const express = require('express');
const router = express.Router();
const { celebrate, Joi } = require("celebrate");
const passport = require("passport");

const UserController = require('../controllers/user_controller.js');

//TODO: Need to write authorization middleware to check if user is admin for user index route.
router.get('/', 
  passport.authenticate("jwt", { session: false }),
  UserController.index
);

router.get('/:id', passport.authenticate("jwt", { session: false }), UserController.show);
router.get('/find/:userEmail', UserController.find);

// router.put('/update/projects', UserController.addProject);
// router.patch('/update/projects', UserController.addProject);

router.post('/register', celebrate({
  body: {
    firstName: Joi.string().required(), 
    lastName: Joi.string().required(), 
    phone: Joi.string().required(), 
    email: Joi.string().email({ minDomainSegments: 2 }), 
    password: Joi.string().regex(/^[a-zA-Z0-9]{6,30}$/), 
  }
}), UserController.register);

router.post("/login", passport.authenticate('local', {
  session: false
}), UserController.login);
router.get('/auth/logout', UserController.logout);

module.exports = router;