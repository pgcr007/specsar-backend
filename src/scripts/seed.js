require('dotenv').config();
const mongoose = require('mongoose');
const Accessory = require('../models/Accessory');

// Placeholder starter catalog. Swap assetUrl/thumbnailUrl and anchorConfig
// values for real ones once Phase 2 Step 4 (asset sourcing) is locked down —
// these numbers are reasonable defaults, not measured from real frames.
const starterAccessories = [
  {
    name: 'Classic Aviator',
    brand: 'SpecsAR House',
    category: 'glasses',
    price: 89,
    assetType: 'png',
    assetUrl: 'https://res.cloudinary.com/beyzrwws/image/upload/v1783859464/aviator-real_dgpcda.png',
    thumbnailUrl: 'https://placehold.co/200x200/png?text=Aviator',
    anchorConfig: { anchorPoint: 'noseBridge', offsetX: 0, offsetY: 0, scale: 1 },
  },
  {
    name: 'Round Wire Frame',
    brand: 'SpecsAR House',
    category: 'glasses',
    price: 79,
    assetType: 'png',
    assetUrl: 'https://placehold.co/600x300/png?text=Round+Frame',
    thumbnailUrl: 'https://placehold.co/200x200/png?text=Round+Frame',
    anchorConfig: { anchorPoint: 'noseBridge', offsetX: 0, offsetY: 0, scale: 1 },
  },
  {
    name: 'Cat-Eye Bold',
    brand: 'SpecsAR House',
    category: 'glasses',
    price: 95,
    assetType: 'png',
    assetUrl: 'https://placehold.co/600x300/png?text=Cat-Eye',
    thumbnailUrl: 'https://placehold.co/200x200/png?text=Cat-Eye',
    anchorConfig: { anchorPoint: 'noseBridge', offsetX: 0, offsetY: -0.02, scale: 1.05 },
  },
  {
    name: 'Square Acetate',
    brand: 'SpecsAR House',
    category: 'glasses',
    price: 85,
    assetType: 'png',
    assetUrl: 'https://placehold.co/600x300/png?text=Square',
    thumbnailUrl: 'https://placehold.co/200x200/png?text=Square',
    anchorConfig: { anchorPoint: 'noseBridge', offsetX: 0, offsetY: 0, scale: 1 },
  },
  {
    name: 'Gold Hoop',
    brand: 'SpecsAR House',
    category: 'earrings',
    price: 35,
    assetType: 'png',
    assetUrl: 'https://placehold.co/300x300/png?text=Hoop',
    thumbnailUrl: 'https://placehold.co/200x200/png?text=Hoop',
    anchorConfig: { anchorPoint: 'earLobeLeft', offsetX: 0, offsetY: 0, scale: 1 },
  },
  {
    name: 'Pearl Drop',
    brand: 'SpecsAR House',
    category: 'earrings',
    price: 42,
    assetType: 'png',
    assetUrl: 'https://placehold.co/300x300/png?text=Pearl+Drop',
    thumbnailUrl: 'https://placehold.co/200x200/png?text=Pearl+Drop',
    anchorConfig: { anchorPoint: 'earLobeLeft', offsetX: 0, offsetY: 0.01, scale: 1 },
  },
  {
    name: 'Studded Diamond',
    brand: 'SpecsAR House',
    category: 'earrings',
    price: 55,
    assetType: 'png',
    assetUrl: 'https://placehold.co/300x300/png?text=Stud',
    thumbnailUrl: 'https://placehold.co/200x200/png?text=Stud',
    anchorConfig: { anchorPoint: 'earLobeLeft', offsetX: 0, offsetY: 0, scale: 0.9 },
  },
  {
    name: 'Canvas Bucket Hat',
    brand: 'SpecsAR House',
    category: 'hats',
    price: 28,
    assetType: 'png',
    assetUrl: 'https://placehold.co/500x400/png?text=Bucket+Hat',
    thumbnailUrl: 'https://placehold.co/200x200/png?text=Bucket+Hat',
    anchorConfig: { anchorPoint: 'foreheadTop', offsetX: 0, offsetY: -0.05, scale: 1.1 },
  },
  {
    name: 'Wool Beanie',
    brand: 'SpecsAR House',
    category: 'hats',
    price: 24,
    assetType: 'png',
    assetUrl: 'https://placehold.co/500x400/png?text=Beanie',
    thumbnailUrl: 'https://placehold.co/200x200/png?text=Beanie',
    anchorConfig: { anchorPoint: 'foreheadTop', offsetX: 0, offsetY: -0.03, scale: 1.05 },
  },
  {
    name: 'Straw Fedora',
    brand: 'SpecsAR House',
    category: 'hats',
    price: 38,
    assetType: 'png',
    assetUrl: 'https://placehold.co/500x400/png?text=Fedora',
    thumbnailUrl: 'https://placehold.co/200x200/png?text=Fedora',
    anchorConfig: { anchorPoint: 'foreheadTop', offsetX: 0, offsetY: -0.06, scale: 1.15 },
  },
  {
    name: 'Layered Gold Chain',
    brand: 'SpecsAR House',
    category: 'necklaces',
    price: 65,
    assetType: 'png',
    assetUrl: 'https://placehold.co/400x500/png?text=Gold+Chain',
    thumbnailUrl: 'https://placehold.co/200x200/png?text=Gold+Chain',
    anchorConfig: { anchorPoint: 'neckBase', offsetX: 0, offsetY: 0, scale: 1 },
  },
  {
    name: 'Silver Pendant',
    brand: 'SpecsAR House',
    category: 'necklaces',
    price: 58,
    assetType: 'png',
    assetUrl: 'https://placehold.co/400x500/png?text=Pendant',
    thumbnailUrl: 'https://placehold.co/200x200/png?text=Pendant',
    anchorConfig: { anchorPoint: 'neckBase', offsetX: 0, offsetY: 0.02, scale: 1 },
  },
];

async function seed() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    await Accessory.deleteMany({});
    console.log('Cleared existing accessories');

    const created = await Accessory.insertMany(starterAccessories);
    console.log(`Seeded ${created.length} accessories`);

    process.exit(0);
  } catch (err) {
    console.error('Seed failed:', err);
    process.exit(1);
  }
}

seed();