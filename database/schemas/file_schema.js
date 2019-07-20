const {Schema} = require("mongoose");

const FileSchema = new Schema({
  link: {
    type: String,
  },
  uploadedAt: {
    type: Date,
    default: Date.now,
  },
  size: {
    type: Number,
  }
});

module.exports = FileSchema;