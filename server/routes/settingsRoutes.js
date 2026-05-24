import express from 'express';
import SiteSettings from '../models/SiteSettings.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

router.get('/', async (req, res) => {
  let settings = await SiteSettings.findOne();
  if (!settings) {
    settings = await SiteSettings.create({});
  }
  res.json(settings);
});

router.put('/', protect, async (req, res) => {
  let settings = await SiteSettings.findOne();
  if (!settings) {
    settings = await SiteSettings.create(req.body);
  } else {
    settings = await SiteSettings.findByIdAndUpdate(settings._id, req.body, {
      new: true,
      runValidators: true,
    });
  }
  res.json(settings);
});

export default router;
