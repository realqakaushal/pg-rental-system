const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const User = require('../models/User');
const { generateToken, authenticate } = require('../middleware/auth');

router.post('/register', [
  body('email').isEmail().normalizeEmail(),
  body('password').isLength({ min: 6 }),
  body('first_name').notEmpty().trim(),
  body('last_name').notEmpty().trim(),
  body('phone').optional().isMobilePhone(),
  body('role').optional().isIn(['owner', 'tenant'])
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, errors: errors.array() });
    }

    const existingUser = await User.findByEmail(req.body.email);
    if (existingUser) {
      return res.status(400).json({ success: false, error: 'Email already registered' });
    }

    const user = await User.create(req.body);
    const token = generateToken(user.id);

    res.status(201).json({
      success: true,
      data: {
        user,
        token
      }
    });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ success: false, error: 'Failed to register user' });
  }
});

router.post('/login', [
  body('email').isEmail().normalizeEmail(),
  body('password').notEmpty()
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, errors: errors.array() });
    }

    const user = await User.findByEmail(req.body.email);
    if (!user) {
      return res.status(401).json({ success: false, error: 'Invalid credentials' });
    }

    const isPasswordMatch = await User.comparePassword(req.body.password, user.password_hash);
    if (!isPasswordMatch) {
      return res.status(401).json({ success: false, error: 'Invalid credentials' });
    }

    if (!user.is_active) {
      return res.status(401).json({ success: false, error: 'Account is inactive' });
    }

    const token = generateToken(user.id);
    delete user.password_hash;

    res.json({
      success: true,
      data: {
        user,
        token
      }
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ success: false, error: 'Failed to login' });
  }
});

router.get('/profile', authenticate, async (req, res) => {
  res.json({
    success: true,
    data: req.user
  });
});

router.put('/profile', authenticate, [
  body('email').optional().isEmail().normalizeEmail(),
  body('first_name').optional().notEmpty().trim(),
  body('last_name').optional().notEmpty().trim(),
  body('phone').optional().isMobilePhone(),
  body('password').optional().isLength({ min: 6 })
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, errors: errors.array() });
    }

    if (req.body.email && req.body.email !== req.user.email) {
      const existingUser = await User.findByEmail(req.body.email);
      if (existingUser) {
        return res.status(400).json({ success: false, error: 'Email already in use' });
      }
    }

    const updatedUser = await User.update(req.user.id, req.body);
    res.json({
      success: true,
      data: updatedUser
    });
  } catch (error) {
    console.error('Profile update error:', error);
    res.status(500).json({ success: false, error: 'Failed to update profile' });
  }
});

module.exports = router;