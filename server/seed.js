import dotenv from 'dotenv';
import mongoose from 'mongoose';
import Admin from './models/Admin.js';
import Service from './models/Service.js';
import Gallery from './models/Gallery.js';
import SiteSettings from './models/SiteSettings.js';

dotenv.config();

const heroImages = [
  'https://images.unsplash.com/photo-1487412946677-5d558adb097a?w=1200&q=80',
  'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=1200&q=80',
  'https://images.unsplash.com/photo-1596462502278-27bfdd403348?w=1200&q=80',
];

const galleryImages = [
  {
    title: 'Bridal Glow',
    image: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=800&q=80',
    category: 'Bridal',
  },
  {
    title: 'Party Makeup',
    image: 'https://images.unsplash.com/photo-1487412946677-5d558adb097a?w=800&q=80',
    category: 'Party',
  },
  {
    title: 'HD Finish',
    image: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=800&q=80',
    category: 'HD Makeup',
  },
  {
    title: 'Elegant Look',
    image: 'https://images.unsplash.com/photo-1596462502278-27bfdd403348?w=800&q=80',
    category: 'Makeover',
  },
  {
    title: 'Natural Beauty',
    image: 'https://images.unsplash.com/photo-1516975080664-ed2fc6a32937?w=800&q=80',
    category: 'Natural',
  },
  {
    title: 'Glam Night',
    image: 'https://images.unsplash.com/photo-1492106087820-71f1a00d2d11?w=800&q=80',
    category: 'Glam',
  },
];

const services = [
  {
    title: 'Bridal Makeup',
    description: 'Complete bridal transformation with long-lasting HD products for your special day.',
    price: 'On request',
    image: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=600&q=80',
    category: 'Bridal',
    featured: true,
    order: 1,
  },
  {
    title: 'Party Makeup',
    description: 'Glamorous looks for receptions, sangeet, and evening celebrations.',
    price: 'On request',
    image: 'https://images.unsplash.com/photo-1487412946677-5d558adb097a?w=600&q=80',
    category: 'Party',
    featured: true,
    order: 2,
  },
  {
    title: 'Engagement Look',
    description: 'Soft, radiant makeup tailored for engagement and pre-wedding shoots.',
    price: 'On request',
    image: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=600&q=80',
    category: 'Engagement',
    featured: true,
    order: 3,
  },
  {
    title: 'Hair Styling',
    description: 'Buns, curls, braids, and trendy hairstyles to complement your makeup.',
    price: 'On request',
    image: 'https://images.unsplash.com/photo-1560066984-138d9834c973?w=600&q=80',
    category: 'Hair',
    featured: false,
    order: 4,
  },
  {
    title: 'Saree Draping',
    description: 'Perfect pleats and pallu styling for traditional and modern saree looks.',
    price: 'On request',
    image: 'https://images.unsplash.com/photo-1583391733956-3750eac7b5e2?w=600&q=80',
    category: 'Draping',
    featured: false,
    order: 5,
  },
  {
    title: 'Skin Prep & Care',
    description: 'Pre-makeup skincare and glow treatments for a flawless base.',
    price: 'On request',
    image: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=600&q=80',
    category: 'Skincare',
    featured: false,
    order: 6,
  },
];

const seed = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    await Admin.deleteMany();
    await Service.deleteMany();
    await Gallery.deleteMany();
    await SiteSettings.deleteMany();

    await Admin.create({
      email: process.env.ADMIN_EMAIL || 'admin@sharmamakeovers.com',
      password: process.env.ADMIN_PASSWORD || 'Admin@123',
      name: 'Anushka Sharma',
    });

    await Service.insertMany(services);
    await Gallery.insertMany(galleryImages);

    await SiteSettings.create({
      businessName: 'Sharma Makeover by Anushka Sharma',
      tagline: 'Where beauty meets elegance',
      address:
        'Near HP Petroleum, Kakrala Road, Ushait, Dist. Budaun, Uttar Pradesh 243641',
      phone: '+91 7452073580',
      email: 'sharmamakeovers@gmail.com',
      instagram: 'sharma_makeovers',
      heroImages,
      aboutText:
        'Welcome to Sharma Makeover by Anushka Sharma — your trusted destination for bridal, party, and occasion makeup in Budaun. With a passion for enhancing natural beauty, we create personalized looks using premium products and professional techniques. From intimate engagements to grand weddings, every client receives care, precision, and a touch of glamour.',
    });

    console.log('Database seeded successfully!');
    console.log(`Admin login: ${process.env.ADMIN_EMAIL || 'admin@sharmamakeovers.com'}`);
    console.log(`Password: ${process.env.ADMIN_PASSWORD || 'Admin@123'}`);
    process.exit(0);
  } catch (error) {
    console.error('Seed error:', error);
    process.exit(1);
  }
};

seed();
