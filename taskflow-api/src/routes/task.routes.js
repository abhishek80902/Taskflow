// src/routes/task.routes.js

const router = require('express').Router();

const auth = require('../middleware/auth.middleware');
const validate = require('../middleware/validate.middleware');

const {
  createTask,
  getTasks,
  getTask,
  updateTask,
  deleteTask
} = require('../controllers/task.controller');

const {
  createTaskValidator,
  updateTaskValidator
} = require('../validators/task.validator');

// Protect all routes
router.use(auth);

// Create Task
router.post('/', createTaskValidator, validate, createTask);

// Get All Tasks (with filters)
router.get('/', getTasks);

// Get Single Task
router.get('/:id', getTask);

// Update Task
router.patch('/:id', updateTaskValidator, validate, updateTask);

// Delete Task
router.delete('/:id', deleteTask);

module.exports = router;