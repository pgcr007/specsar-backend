const mongoose = require('mongoose');

const favoriteSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  accessoryId: { type: mongoose.Schema.Types.ObjectId, ref: 'Accessory', required: true },
}, { timestamps: true, strict: true });

// Prevent the same user favoriting the same accessory twice.
favoriteSchema.index({ userId: 1, accessoryId: 1 }, { unique: true });

module.exports = mongoose.model('Favorite', favoriteSchema);