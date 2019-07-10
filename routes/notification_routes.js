const express = require("express");
const router = express.Router();

const NotificationController = require("./../controllers/notification_controller");

router.get("/:id", NotificationController.show);
router.post("/", NotificationController.create);
router.delete("/:id", NotificationController.destroy);

module.exports = router;