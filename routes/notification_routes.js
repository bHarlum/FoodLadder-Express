const express = require("express");
const router = express.Router();

const NotificationController = require("./../controllers/notification_controller");

router.get("/", NotificationController.index);
router.get("/:id", NotificationController.show);

router.get("/new", NotificationController.new);
router.post("/", NotificationController.create);

module.exports = router;