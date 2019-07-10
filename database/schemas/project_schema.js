const {Schema} = require("mongoose");

const NotificationSchema = require("./notification_schema");
const ReportSchema = require("./report_schema");

const ProjectSchema = new Schema({
  name: {
    type: String,
    required: true,
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
    /// TODO MAYBE: Maybe add a used at for the unique code.
  },

  users: [{
    email: {
      type: String,
      required: true,
    },

    userId: {
      // TODO: could be of Type ObjectId #####
      type: String,
      default: null,
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

    suburb: {
      type: String,
      required: true,
      lowercase: true,
    },

    state: {
      type: String,
      required: true,
      lowercase: true,
    },

    country: {
      type: String,
      required: true,
      lowercase: true,
    },

  },

  reportDate: {
    type: Date,
    // Add default: (Date.now + month )to create first reporting date.
  },

  reports: [ReportSchema],

  notifications: [NotificationSchema],

  createdAt: {
    type: Date,
    deafalt: Date.now,
  }
})

module.exports = ProjectSchema;