const express = require('express');
const router = express.Router();

const ProjectRoutes = require('./project_routes');
const NotificationRoutes = require('./notification_routes');
const ThreadRoutes = require('./thread_routes');
const UserRoutes = require('./user_routes');
const FileRoutes = require('./file_routes');

router.get('/', (req, res) => res.send('welcome'));
router.use('/projects', ProjectRoutes);
router.use('/notifications', NotificationRoutes);
router.use('/threads', ThreadRoutes);
router.use('/users', UserRoutes);

module.exports = router;
