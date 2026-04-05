const Task = require('../models/task.model');
const { scheduleReminder, cancelReminder } = require('../services/reminder.service');
const { sendWebhook } = require('../services/webhook.service');
const { logActivity } = require('../services/activity.service');

// CREATE TASK
exports.createTask = async (req, res) => {
  try {
    const task = await Task.create({
      ...req.body,
      userId: req.user.id
    });

    scheduleReminder(task);

    await logActivity({
      userId: req.user.id,
      taskId: task._id,
      action: "CREATE",
      message: `Task "${task.title}" created`
    });

    res.json(task);

  } catch (err) {
    res.status(500).json({ message: "Failed to create task" });
  }
};

// GET ALL TASKS (FILTER)
exports.getTasks = async (req, res) => {
  try {
    const filter = { userId: req.user.id };

    if (req.query.category) {
      filter.category = req.query.category;
    }

    if (req.query.tags) {
      filter.tags = { $in: [req.query.tags] };
    }

    const tasks = await Task.find(filter);
    res.json(tasks);

  } catch (err) {
    res.status(500).json({ message: "Failed to fetch tasks" });
  }
};

// GET SINGLE TASK ✅ (FIX ADDED)
exports.getTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);

    if (!task || task.userId.toString() !== req.user.id.toString()) {
      return res.status(404).json({ message: "Task not found" });
    }

    res.json(task);

  } catch (err) {
    res.status(500).json({ message: "Failed to fetch task" });
  }
};

// UPDATE TASK
exports.updateTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);

    if (!task || task.userId.toString() !== req.user.id.toString()) {
      return res.status(403).json({ message: "Forbidden" });
    }

    const oldStatus = task.status;

    Object.assign(task, req.body);
    await task.save();

    cancelReminder(task._id.toString());
    scheduleReminder(task);

    // webhook on completion
    if (oldStatus !== "completed" && task.status === "completed") {
      sendWebhook({
        taskId: task._id,
        title: task.title,
        userId: task.userId,
        completedAt: new Date()
      });
    }

    await logActivity({
      userId: req.user.id,
      taskId: task._id,
      action: "UPDATE",
      message: `Task "${task.title}" updated`
    });

    res.json(task);

  } catch (err) {
    res.status(500).json({ message: "Failed to update task" });
  }
};

// DELETE TASK
exports.deleteTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);

    if (!task || task.userId.toString() !== req.user.id.toString()) {
      return res.status(403).json({ message: "Forbidden" });
    }

    cancelReminder(task._id.toString());

    await task.deleteOne();

    await logActivity({
      userId: req.user.id,
      taskId: task._id,
      action: "DELETE",
      message: `Task deleted`
    });

    res.json({ message: "Deleted" });

  } catch (err) {
    res.status(500).json({ message: "Failed to delete task" });
  }
};