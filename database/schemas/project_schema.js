const { Schema } = require("mongoose");

const NotificationSchema = require("./notification_schema");
const ReportSchema = require("./report_schema");
const FileSchema =  require("./file_schema");

const ProjectSchema = new Schema({
  name: {
    type: String,
    required: true,
  },

  activated: {
    type: Boolean,
    default: false,
  },

  uniqueCode: {
    value: {
      type: String,
    },

    createdAt: {
      type: Date,
      default: Date.now,
    },

    expired: {
      type: Boolean,
      default: false,
    },
  },

  users: [{
    email: {
      type: String,
      required: true,
    },

    activated: {
      type: Boolean,
      default: false
    }

  }],

  address: {
    line1: {
      type: String,
      required: true,
      lowercase: true,
    },

    line2: {
      type: String,
      lowercase: true,
    },

    postcode: {
      type: String,
      lowercase: true,
    },

    city: {
      type: String,
      required: true,
      lowercase: true,
    },

    state: {
      type: String,
      lowercase: true,
    },

    country: {
      type: String,
      required: true,
      lowercase: true,
    },

  },
  
  bio: {
    type: String,
  },

  reportDate: {
    type: Date,
    // Add default: (Date.now + month )to create first reporting date.
  },

  reports: [ReportSchema],

  notifications: [NotificationSchema],

  filePerm: {
    maxUsage: {
      type: Number
    },
    currentUsage: {
      type: Number,
      default: 0
    }
  },

  files: [FileSchema],

  createdAt: {
    type: Date,
    deafalt: Date.now,
  }
})

module.exports = ProjectSchema;