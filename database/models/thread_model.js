const mongoose = require("mongoose");
const ThreadSchema = require("./../schemas/thread_schema");

const ThreadModel = mongoose.model("thread", ThreadSchema);

module.exports = ThreadModel;