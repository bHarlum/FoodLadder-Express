const express = require("express");
const router = express.Router();

const ProjectRoutes = require("./project_routes");
const UserRoutes = require("./user_routes");
const NotificationRoutes = require("./notification_routes");

router.get("/", (req, res) => res.send("Welcome"));
router.use("/projects", ProjectRoutes);
router.user("/notifications", NotificationRoutes);
router.use("/users", UserRoutes);

module.exports = router;