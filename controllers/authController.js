const User = require('../models/user');
const jwt = require('jsonwebtoken');
const { body, validationResult } = require('express-validator');

exports.register = [
  body('username').not().isEmpty().withMessage('Username is required'),
  body('password').not().isEmpty().withMessage('Password is required'),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { username, password } = req.body;

    try {
      const userExists = await User.findOne({ username });
      if (userExists) {
        return res.status(400).json({ message: 'Username already exists' });
      }

      const user = new User({ username, password });
      await user.save();

      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
        expiresIn: '1h',
      });

      res.status(201).json({ token });
    } catch (err) {
      res.status(500).json({ message: 'Server error' });
    }
  },
];

exports.login = [
  body('username').not().isEmpty().withMessage('Username is required'),
  body('password').not().isEmpty().withMessage('Password is required'),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { username, password } = req.body;

    try {
      const user = await User.findOne({ username });
      if (!user || !(await user.matchPassword(password))) {
        return res.status(401).json({ message: 'Invalid username or password' });
      }

      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
        expiresIn: '1h',
      });

      res.json({ token });
    } catch (err) {
      res.status(500).json({ message: 'Server error' });
    }
  },
];
