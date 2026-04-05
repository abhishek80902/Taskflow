const Activity = require('../models/activity.model');

const logActivity = async ({ userId, taskId, action, message }) => {
  await Activity.create({
    userId,
    taskId,
    action,
    message
  });
};

module.exports = { logActivity };