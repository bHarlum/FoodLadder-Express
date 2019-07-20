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

  projects: [{
    projectId: {
      // TODO: could be of Type ObjectId #####
      type: String,
      default: null,
    }
  }],

  profilePicture: {
    type: String,
  },

  notifications: [NotificationSchema],

  createdAt: {
    type: Date,
    default: Date.now
  }
});

UserSchema.plugin(passportLocalMongoose, { 
  usernameField: 'email', 
  selectFields: 'firstName lastName phone notifications projects createdAt' 
});

module.exports = UserSchema;
