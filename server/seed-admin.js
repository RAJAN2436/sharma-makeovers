import dotenv from 'dotenv';
import mongoose from 'mongoose';
import Admin from './models/Admin.js';

dotenv.config();

const email = (process.env.ADMIN_EMAIL || 'admin@sharmamakeovers.com').toLowerCase();
const password = process.env.ADMIN_PASSWORD || 'Admin@123';

const seedAdmin = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    let admin = await Admin.findOne({ email });
    if (admin) {
      admin.password = password;
      admin.name = admin.name || 'Anushka Sharma';
      await admin.save();
      console.log(`Admin updated: ${email}`);
    } else {
      await Admin.create({ email, password, name: 'Anushka Sharma' });
      console.log(`Admin created: ${email}`);
    }

    process.exit(0);
  } catch (error) {
    console.error('Seed admin error:', error);
    process.exit(1);
  }
};

seedAdmin();
