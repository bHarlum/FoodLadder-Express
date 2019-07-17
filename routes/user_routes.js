const express = require('express');
const router = express.Router();
const passport = require("passport");

const UserController = require('../controllers/user_controller.js');

router.get('/', UserController.index);
router.get('/:id', passport.authenticate("jwt", { session: false }), UserController.show);

router.put('/:id/update', UserController.update);
router.patch('/:id/update', UserController.update);

router.post('/register', UserController.register);
router.post("/login", passport.authenticate('local', {
  session: false
}), UserController.login);
router.get('/auth/logout', UserController.logout);

module.exports = router;
