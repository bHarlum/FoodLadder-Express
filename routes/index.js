const express = require('express');
const router = express.Router();

const passport = require("passport");

const ProjectRoutes = require('./project_routes');
const NotificationRoutes = require('./notification_routes');
const ThreadRoutes = require('./thread_routes');
const UserRoutes = require('./user_routes');
const FileRoutes = require('./file_routes');

router.get('/', (req, res, next) => {
  try {
    return res.send('welcome');
  } catch (err) {
    return next(new HTTPError(err.status, err.message));
  }
});

router.use('/projects', ProjectRoutes);
router.use('/notifications', passport.authenticate("jwt", { session: false }), NotificationRoutes);
router.use('/threads', passport.authenticate("jwt", { session: false }), ThreadRoutes);
router.use('/users', UserRoutes);

//, passport.authenticate("jwt", { session: false })
router.use('/files', FileRoutes);

module.exports = router;
