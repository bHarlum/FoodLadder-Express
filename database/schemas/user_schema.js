const {Schema} = require("mongoose");


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
  
  createdAt: {
    type: Date,
    deafult: Date.now,
  }
})

module.exports = UserSchema;