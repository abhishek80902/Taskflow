// src/controllers/task.controller.js
const Task = require('../models/task.model');

exports.createTask = async (req, res) => {
  const task = await Task.create({
    ...req.body,
    userId: req.user.id
  });

  res.json(task);
};

exports.getTasks = async (req, res) => {
  const tasks = await Task.find({ userId: req.user.id });
  res.json(tasks);
};

exports.getTask = async (req, res) => {
  const task = await Task.findById(req.params.id);

  if (!task || task.userId !== req.user.id) {
    return res.status(403).json({ message: "Forbidden" });
  }

  res.json(task);
};

exports.updateTask = async (req, res) => {
  const task = await Task.findById(req.params.id);

  if (!task || task.userId !== req.user.id) {
    return res.status(403).json({ message: "Forbidden" });
  }

  Object.assign(task, req.body);
  await task.save();

  res.json(task);
};

exports.deleteTask = async (req, res) => {
  const task = await Task.findById(req.params.id);

  if (!task || task.userId !== req.user.id) {
    return res.status(403).json({ message: "Forbidden" });
  }

  await task.deleteOne();
  res.json({ message: "Deleted" });
};