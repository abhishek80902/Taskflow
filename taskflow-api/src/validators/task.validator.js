// src/validators/task.validator.js

const { body } = require('express-validator');

const createTaskValidator = [
  body('title')
    .notEmpty()
    .withMessage('Title is required'),

  body('dueDate')
    .optional()
    .isISO8601()
    .withMessage('Invalid date format'),

  body('status')
    .optional()
    .isIn(['pending', 'completed'])
    .withMessage('Invalid status'),

  body('tags')
    .optional()
    .isArray()
    .withMessage('Tags must be an array')
];

const updateTaskValidator = [
  body('title')
    .optional()
    .notEmpty()
    .withMessage('Title cannot be empty'),

  body('status')
    .optional()
    .isIn(['pending', 'completed'])
    .withMessage('Invalid status')
];

module.exports = {
  createTaskValidator,
  updateTaskValidator
};