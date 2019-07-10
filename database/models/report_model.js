const mongoose = require("mongoose");
const ReportSchema = require("./../schemas/report_schema");

const ReportModel = mongoose.model("report", ReportSchema);

module.exports = ReportModel;