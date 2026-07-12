const Favorite = require('../models/Favorite');

// POST /api/favorites  { accessoryId }
exports.add = async (req, res) => {
  try {
    const { accessoryId } = req.body;
    if (!accessoryId) {
      return res.status(400).json({ error: 'accessoryId is required' });
    }

    const favorite = await Favorite.create({ userId: req.user.id, accessoryId });
    res.status(201).json(favorite);
  } catch (err) {
    if (err.code === 11000) {
      return res.status(409).json({ error: 'Already favorited' });
    }
    if (err.name === 'CastError') {
      return res.status(400).json({ error: 'Invalid accessoryId' });
    }
    console.error('Add favorite error:', err);
    res.status(500).json({ error: 'Failed to add favorite' });
  }
};

// GET /api/favorites
exports.list = async (req, res) => {
  try {
    const favorites = await Favorite.find({ userId: req.user.id })
      .populate('accessoryId')
      .sort({ createdAt: -1 });
    res.json({ items: favorites });
  } catch (err) {
    console.error('List favorites error:', err);
    res.status(500).json({ error: 'Failed to fetch favorites' });
  }
};

// DELETE /api/favorites/:id
exports.remove = async (req, res) => {
  try {
    const result = await Favorite.findOneAndDelete({
      _id: req.params.id,
      userId: req.user.id,
    });
    if (!result) {
      return res.status(404).json({ error: 'Favorite not found' });
    }
    res.status(204).send();
  } catch (err) {
    if (err.name === 'CastError') {
      return res.status(400).json({ error: 'Invalid favorite id' });
    }
    console.error('Remove favorite error:', err);
    res.status(500).json({ error: 'Failed to remove favorite' });
  }
};