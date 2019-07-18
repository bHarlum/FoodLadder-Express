const express = require("express");
const router = express.Router();
const passport = require("passport");

const ProjectController = require("./../controllers/project_controller");

router.get("/", ProjectController.index);
router.get("/:id", ProjectController.show);
router.get("/user/current", passport.authenticate("jwt", { session: false }), ProjectController.findCurrent);

router.put("/:id/update", ProjectController.update);
router.patch("/:id/update", ProjectController.update);

router.post("/", ProjectController.create);

module.exports = router;