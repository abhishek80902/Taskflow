const reminders = new Map();

const scheduleReminder = (task) => {
  if (!task.dueDate) return;

  const delay = new Date(task.dueDate) - Date.now() - 3600000;

  if (delay <= 0) return;

  // Clear existing reminder if any
  if (reminders.has(task._id.toString())) {
    clearTimeout(reminders.get(task._id.toString()));
  }

  const timeoutId = setTimeout(() => {
    console.log(`🔔 Reminder: Task "${task.title}" is due in 1 hour`);
  }, delay);

  reminders.set(task._id.toString(), timeoutId);
};

const cancelReminder = (taskId) => {
  if (reminders.has(taskId)) {
    clearTimeout(reminders.get(taskId));
    reminders.delete(taskId);
  }
};

module.exports = {
  scheduleReminder,
  cancelReminder
};