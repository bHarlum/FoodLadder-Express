const {Schema} = require("mongoose");

const PostSchema = new Schema({
  body: {
    type: String,
    required: true
  },
  author: {
    id: {
      type: String,
      required: true
    },
    firstName: {
      type: String,
      required: true
    },
    admin: {
      type: Boolean,
      required: true
    }
  }
});

module.exports = PostSchema;