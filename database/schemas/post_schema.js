const {Schema} = require("mongoose");

const PostSchema = new Schema({
  body: {
    type: String,
    required: true,
  },

  author: {
    id: {
      type: String,
      required: true,
    },

    firstName: {
      type: String,
      required: true,
    },

    lastName: {
      type: String,
      required: true,
    },

    admin: {
      type: Boolean,
      default: false,
    }
  },

  updatedAt: {
    type: Date,
    default: null,
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },

  upvotes: {
    type: Number,
    default: 0
  }
});

module.exports = PostSchema;