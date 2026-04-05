const mongoose = require('mongoose');

const activitySchema = new mongoose.Schema({
  userId: Number,
  taskId: mongoose.Schema.Types.ObjectId,
  action: String,
  message: String
}, { timestamps: true });

module.exports = mongoose.model("Activity", activitySchema);