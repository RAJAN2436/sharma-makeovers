import mongoose from 'mongoose';

const siteSettingsSchema = new mongoose.Schema(
  {
    businessName: { type: String, default: 'Sharma Makeover by Anushka Sharma' },
    tagline: { type: String, default: 'Beauty that speaks elegance' },
    address: {
      type: String,
      default:
        'Near HP Petroleum, Kakrala Road, Ushait, Dist. Budaun, Uttar Pradesh 243641',
    },
    phone: { type: String, default: '+91 7452073580' },
    email: { type: String, default: 'sharmamakeovers@gmail.com' },
    instagram: { type: String, default: 'sharma_makeovers' },
    heroImages: { type: [String], default: [] },
    aboutText: { type: String, default: '' },
  },
  { timestamps: true }
);

export default mongoose.model('SiteSettings', siteSettingsSchema);
