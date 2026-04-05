// src/models/task.model.js
const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  userId: {
    type: Number,
    required: true,
  },
  title: String,
  description: String,

  dueDate: Date,

  category: {
    type: String,
    default: "General"
  },

  tags: [
    {
      type: String
    }
  ],

  status: {
    type: String,
    enum: ['pending', 'completed'],
    default: 'pending'
  }

}, { timestamps: true });

module.exports = mongoose.model('Task', taskSchema);