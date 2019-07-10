const {Schema} = require("mongoose");
const PostSchema = require("./post_schema");


const ThreadSchema = new Schema({
  title: {
    type: String,
    required: true,
  },

  posts: [PostSchema],

  views: {
    type: Number,
    default: 0,
  },

  pinnedPost: {
    type: String,
  },

  upvotes: {
    type: Number,
    default: 0,
  },

  createdAt: {
    type: Date,
    default: Date.now,
  }
})

module.exports = threadSchema;