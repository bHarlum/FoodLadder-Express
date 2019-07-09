const {Schema} = require("mongoose");
const PostSchema = require("./post_schema");


const ThreadSchema = new Schema({
  title: {
    type: String,
    required: true,
  },

  posts: [PostSchema],

  author: {
    name: {
      type: String,
      required: true,
    },
    authorId: {
      type: String,
    }
  },

  ceatedAt: {
    type: Date,
    default: Date.now,
  }
})

module.exports = threadSchema;