const express = require('express');
const router = express.Router();

const passport = require("passport");

const ProjectRoutes = require('./project_routes');
const NotificationRoutes = require('./notification_routes');
const ThreadRoutes = require('./thread_routes');
const UserRoutes = require('./user_routes');
const FileRoutes = require('./file_routes');

router.get('/', (req, res) => res.send('welcome'));

router.use('/projects', passport.authenticate("jwt", { session: false }), ProjectRoutes);
router.use('/notifications', passport.authenticate("jwt", { session: false }), NotificationRoutes);
router.use('/threads', passport.authenticate("jwt", { session: false }), ThreadRoutes);
router.use('/users', UserRoutes);

module.exports = router;
