import express from 'express';
import Gallery from '../models/Gallery.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

router.get('/', async (req, res) => {
  const items = await Gallery.find().sort({ order: 1, createdAt: -1 });
  res.json(items);
});

router.post('/', protect, async (req, res) => {
  const item = await Gallery.create(req.body);
  res.status(201).json(item);
});

router.put('/:id', protect, async (req, res) => {
  const item = await Gallery.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });
  if (!item) return res.status(404).json({ message: 'Gallery item not found' });
  res.json(item);
});

router.delete('/:id', protect, async (req, res) => {
  const item = await Gallery.findByIdAndDelete(req.params.id);
  if (!item) return res.status(404).json({ message: 'Gallery item not found' });
  res.json({ message: 'Gallery item removed' });
});

export default router;
