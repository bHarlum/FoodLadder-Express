const { Schema } = require('mongoose');
const NotificationSchema = require('./notification_schema');
const passportLocalMongoose = require('passport-local-mongoose');
const FileSchema =  require("./file_schema");

const UserSchema = new Schema({
  firstName: {
    type: String,
    required: true,
    lowercase: true
  },

  lastName: {
    type: String,
    required: true,
    lowercase: true
  },

  phone: {
    type: String,
    lowercase: true
  },

  admin: {
    type: Boolean,
    default: false
  },

  profilePicture: {FileSchema},

  notifications: [NotificationSchema],

  createdAt: {
    type: Date,
    default: Date.now
  }
});

UserSchema.plugin(passportLocalMongoose, { 
  usernameField: 'email', 
  selectFields: 'firstName lastName phone notifications createdAt' 
});

module.exports = UserSchema;
