const mongoose = require('mongoose');

const reminderSchema = new mongoose.Schema(
  {
    task: {
      type: String,
      required: true,
    },
    date: {
        type: Date,
        default: Date.now,
    },
  }
);

const reminders = mongoose.model('reminders', reminderSchema);

module.exports = reminders;
