const {Schema} = require("mongoose");

const ReportSchema = new Schema({
  projectId: {
    type: String,
    required: true,
  },

  createdAt: {
    type: Date,
    default: Date.now,
  }
});

module.exports = ReportSchema;