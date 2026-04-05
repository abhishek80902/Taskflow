// src/routes/auth.routes.js

const router = require('express').Router();

const {
  register,
  login,
  profile
} = require('../controllers/auth.controller');

const auth = require('../middleware/auth.middleware');
const validate = require('../middleware/validate.middleware');

const {
  registerValidator,
  loginValidator
} = require('../validators/auth.validator');

//  Register User
router.post(
  '/register',
  registerValidator,
  validate,
  register
);

//  Login User
router.post(
  '/login',
  loginValidator,
  validate,
  login
);

//  Get Profile (Protected)
router.get(
  '/profile',
  auth,
  profile
);

module.exports = router;