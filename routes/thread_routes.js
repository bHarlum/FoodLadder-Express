const express = require("express");
const router = express.Router();
const upload = require("./../services/resource_bucket/upload_manager");


const ThreadController = require("./../controllers/thread_controller");

router.get("/", ThreadController.index);
router.get("/:id", ThreadController.show);

router.put("/:id", ThreadController.update);
router.patch("/:id", ThreadController.update);

router.post("/", ThreadController.create);

router.delete("/:id", ThreadController.destroy);

router.post("/upload", upload, ThreadController.upload);

module.exports = router;