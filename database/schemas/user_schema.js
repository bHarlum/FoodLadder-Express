const {Schema} = require("mongoose");
const NotificationSchema = require("./notification_schema");

const UserSchema = new Schema({
  firstName: {
    type: String,
    required: true,
    lowercase: true,
  },
  
  lastName: {
    type: String,
    required: true,
    lowercase: true,
  },
  
  phone: {
    type: String,
    required: true,
    lowercase: true,
  },
  
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
  },
  
  password: {
    type: String,
    required: true,
  },

  notifications: [NotificationSchema],
  
  createdAt: {
    type: Date,
    deafult: Date.now,
  }
})

module.exports = UserSchema;