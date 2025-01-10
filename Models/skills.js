const mongoose = require('mongoose');

const skillSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  level: {
    type: Number,
    required: true,
  },
  category: {
    type: String,
    enum: ['Frontend', 'Backend', 'Tools', 'Soft Skills'],
    required: true,
  },
});

const skills = mongoose.model('skills', skillSchema);

module.exports = skills;
