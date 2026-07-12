const mongoose = require('mongoose');

const anchorConfigSchema = new mongoose.Schema({
  // Offset from the reference landmark, as a ratio of face width (not raw px)
  // so it scales correctly across different face sizes.
  offsetX: { type: Number, default: 0 },
  offsetY: { type: Number, default: 0 },
  scale: { type: Number, default: 1 },
  // Which landmark this accessory anchors to (e.g. 'noseBridge', 'earLobeLeft',
  // 'earLobeRight', 'foreheadTop'). Kept as a free string now; can tighten to
  // an enum once Phase 3's landmark set is finalized.
  anchorPoint: { type: String, required: true },
}, { _id: false });

const accessorySchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  brand: { type: String, trim: true },
  category: {
    type: String,
    enum: ['glasses', 'earrings', 'hats', 'necklaces'],
    required: true,
  },
  price: { type: Number, required: true, min: 0 },
  assetType: { type: String, enum: ['png', 'glb'], required: true },
  assetUrl: { type: String, required: true },
  thumbnailUrl: { type: String, required: true },
  anchorConfig: { type: anchorConfigSchema, required: true },
  active: { type: Boolean, default: true },
}, { timestamps: true, strict: true });

accessorySchema.index({ category: 1 });
accessorySchema.index({ name: 'text', brand: 'text' });

module.exports = mongoose.model('Accessory', accessorySchema);