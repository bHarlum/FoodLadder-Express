const express = require('express');
const router = express.Router();

const UserController = require('../controllers/user_controller.js');

router.get('/', UserController.index);
router.get('/:id', UserController.show);

router.put('/:id/update', UserController.update);
router.patch('/:id/update', UserController.update);

router.post('/register', UserController.register);
router.post('/login', UserController.login);
router.get('/auth/logout', UserController.logout);

module.exports = router;
