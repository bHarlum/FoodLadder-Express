const express = require("express");
const router = express.Router();

const UserController = require("../controllers/user_controller.js");

router.get("/", UserController.index);
router.get("/:id", UserController.show);

router.get("/:id/edit", UserController.edit);
router.put("/:id/update", UserController.update);
router.patch("/:d/update", UserController.update);

router.get("/new", UserController.make);
router.post("/", UserController.create);

module.exports = router;