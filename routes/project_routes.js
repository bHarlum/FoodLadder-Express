const express = require("express");
const router = express.Router();

const ProjectController = require("./../controllers/project_controller");

router.get("/", ProjectController.index);
router.get("/:id", ProjectController.show);

router.get("/:id/edit", ProjectController.edit);
router.put("/:id/update", ProjectController.update);
router.patch("/:id/update", ProjectController.update);

router.get("/new", ProjectController.make);
router.post("/", ProjectController.create);

module.exports = router;