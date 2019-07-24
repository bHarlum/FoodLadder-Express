const express = require("express");
const router = express.Router();
const { celebrate, Joi } = require("celebrate");
const passport = require("passport");
const upload = require("./../services/resource_bucket/upload_manager");

const ProjectController = require("./../controllers/project_controller");

router.get("/", 
  passport.authenticate("jwt", { session: false }), 
  ProjectController.index);
router.get("/:id", ProjectController.show);
router.get("/user/current", 
  passport.authenticate("jwt", { session: false }), 
  ProjectController.findCurrent);

router.put("/:id/update", ProjectController.update);
router.patch("/:id/update", ProjectController.update);

router.post("/", celebrate({
  body: {
    projectName: Joi.string().required(), 
    userName: Joi.string().required(),
    email: Joi.string().email({ minDomainSegments: 2 }).required(), 
    line1: Joi.string().required(),
    line2: Joi.string(),
    state: Joi.string(),
    city: Joi.string().required(),
    postcode: Joi.string(),
    country: Joi.string().required(),
  }
}), passport.authenticate("jwt", { session: false }), 
    ProjectController.create);

router.post('/upload', 
  passport.authenticate("jwt", { session: false }), 
  upload, 
  ProjectController.uploadFile);

module.exports = router;