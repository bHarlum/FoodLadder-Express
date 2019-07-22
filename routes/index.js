const express = require('express');
const router = express.Router();

const passport = require("passport");

const ProjectRoutes = require('./project_routes');
const NotificationRoutes = require('./notification_routes');
const ThreadRoutes = require('./thread_routes');
const UserRoutes = require('./user_routes');

router.get('/', (req, res) => {
  console.log("running root route");
  try {
    return res.send('welcome');
  } catch (err) {
    console.log(err);
  }
});

router.use('/projects', ProjectRoutes);
router.use('/notifications', passport.authenticate("jwt", { session: false }), NotificationRoutes);
router.use('/threads', passport.authenticate("jwt", { session: false }), ThreadRoutes);
router.use('/users', UserRoutes);

module.exports = router;
