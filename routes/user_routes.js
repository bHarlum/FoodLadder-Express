const express = require('express');
const router = express.Router();
const passport = require("passport");

const UserController = require('../controllers/user_controller.js');

router.get('/', UserController.index);
router.get('/:id', passport.authenticate("jwt", { session: false }), UserController.show);
router.get('/find/:userEmail', UserController.find);

router.put('/update/projects', UserController.addProject);
router.patch('/update/projects', UserController.addProject);

router.post('/register', UserController.register);
router.post("/login", passport.authenticate('local', {
  session: false
}), UserController.login);
router.get('/auth/logout', UserController.logout);

module.exports = router;
