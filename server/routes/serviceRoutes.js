import express from 'express';
import Service from '../models/Service.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

router.get('/', async (req, res) => {
  const services = await Service.find().sort({ order: 1, createdAt: -1 });
  res.json(services);
});

router.post('/', protect, async (req, res) => {
  const service = await Service.create(req.body);
  res.status(201).json(service);
});

router.put('/:id', protect, async (req, res) => {
  const service = await Service.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });
  if (!service) return res.status(404).json({ message: 'Service not found' });
  res.json(service);
});

router.delete('/:id', protect, async (req, res) => {
  const service = await Service.findByIdAndDelete(req.params.id);
  if (!service) return res.status(404).json({ message: 'Service not found' });
  res.json({ message: 'Service removed' });
});

export default router;
