const mongoose = require('mongoose');

const tryOnHistorySchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  accessoryId: { type: mongoose.Schema.Types.ObjectId, ref: 'Accessory', required: true },
}, { timestamps: true, strict: true });

// Fast lookup of a user's recent try-ons, most recent first.
tryOnHistorySchema.index({ userId: 1, createdAt: -1 });

module.exports = mongoose.model('TryOnHistory', tryOnHistorySchema);