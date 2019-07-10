const {Schema} = require("mongoose");

const NotificationSchema = new Schema({
  recipient: {
    category: {
      type: String,
      // TODO: ADD MORE ENUM VALUES FOR NOTIFICATION
      enum: ["message", "report"],
    },
  },
  
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = NotificationSchema;