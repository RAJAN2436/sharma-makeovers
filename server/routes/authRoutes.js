import express from 'express';
import jwt from 'jsonwebtoken';
import Admin from '../models/Admin.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

const generateToken = (id) =>
  jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '7d' });

router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password required' });
  }

  const admin = await Admin.findOne({ email: email.toLowerCase() });
  if (!admin || !(await admin.matchPassword(password))) {
    return res.status(401).json({ message: 'Invalid email or password' });
  }

  res.json({
    _id: admin._id,
    name: admin.name,
    email: admin.email,
    token: generateToken(admin._id),
  });
});

router.get('/me', protect, (req, res) => {
  res.json(req.admin);
});

export default router;
