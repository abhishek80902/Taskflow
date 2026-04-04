// src/controllers/auth.controller.js
const bcrypt = require('bcryptjs');
const { pool } = require('../models/user.model');
const generateToken = require('../utils/generateToken');

exports.register = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const hashed = await bcrypt.hash(password, 10);

    const user = await pool.query(
      "INSERT INTO users (email, password) VALUES ($1,$2) RETURNING id,email",
      [email, hashed]
    );

    res.json(user.rows[0]);
  } catch (err) {
    next(err);
  }
};

exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await pool.query(
      "SELECT * FROM users WHERE email=$1",
      [email]
    );

    if (!user.rows.length) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const valid = await bcrypt.compare(password, user.rows[0].password);

    if (!valid) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = generateToken(user.rows[0].id);

    res.json({ token });
  } catch (err) {
    next(err);
  }
};

exports.profile = async (req, res) => {
  const user = await pool.query(
    "SELECT id,email FROM users WHERE id=$1",
    [req.user.id]
  );

  res.json(user.rows[0]);
};