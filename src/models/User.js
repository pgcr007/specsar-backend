const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true, lowercase: true },
  passwordHash: { type: String, required: true },
  role: { type: String, enum: ['consumer', 'shop_owner', 'admin'], default: 'consumer' },
}, { timestamps: true, strict: true });

module.exports = mongoose.model('User', userSchema);