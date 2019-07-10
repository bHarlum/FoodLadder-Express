const express = require("express");
const router = express.Router();

const ProjectRoutes = require("./project_routes");
const UserRoutes = require("./user_routes");
const NotificationRoutes = require("./notification_routes");
const ThreadRoutes = require("./thread_routes");

router.get("/", (req, res) => res.send("Welcome"));
router.use("/projects", ProjectRoutes);
router.use("/notifications", NotificationRoutes);
router.user("/threads", ThreadRoutes);
router.use("/users", UserRoutes);

module.exports = router;