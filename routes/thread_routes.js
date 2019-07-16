const express = require("express");
const router = express.Router();

const ThreadController = require("./../controllers/thread_controller");

router.get("/", ThreadController.index);
router.get("/:id", ThreadController.show);

router.put("/:id", ThreadController.update);
router.patch("/:id", ThreadController.update);

router.post("/", ThreadController.create);

router.delete("/:id", ThreadController.destroy);

module.exports = router;