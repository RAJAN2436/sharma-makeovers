import mongoose from 'mongoose';

const gallerySchema = new mongoose.Schema(
  {
    title: { type: String, default: '' },
    image: { type: String, required: true },
    category: { type: String, default: 'Makeover' },
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export default mongoose.model('Gallery', gallerySchema);
