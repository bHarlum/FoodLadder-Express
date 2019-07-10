const mongoose = require("mongoose");
const ProjectSchema = require("./../schemas/project_schema");

const ProjectModel = mongoose.model("project", ProjectSchema);

module.exports = ProjectModel;