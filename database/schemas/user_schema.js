const { Schema } = require('mongoose');
const NotificationSchema = require('./notification_schema');
const passportLocalMongoose = require('passport-local-mongoose');

const UserSchema = new Schema({
  firstName: {
    type: String,
    lowercase: true
  },

  lastName: {
    type: String,
    lowercase: true
  },

  phone: {
    type: String,
    lowercase: true
  },

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
