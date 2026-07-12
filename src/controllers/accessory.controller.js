const Accessory = require('../models/Accessory');

// GET /api/accessories?category=glasses&page=1&limit=20
exports.list = async (req, res) => {
  try {
    const { category } = req.query;
    const page = Math.max(parseInt(req.query.page, 10) || 1, 1);
    const limit = Math.min(parseInt(req.query.limit, 10) || 20, 50);

    const filter = { active: true };
    if (category) filter.category = category;

    const [items, total] = await Promise.all([
      Accessory.find(filter)
        .sort({ createdAt: -1 })
        .skip((page - 1) * limit)
        .limit(limit),
      Accessory.countDocuments(filter),
    ]);

    res.json({ items, total, page, limit });
  } catch (err) {
    console.error('List accessories error:', err);
    res.status(500).json({ error: 'Failed to fetch accessories' });
  }
};

// GET /api/accessories/:id
exports.detail = async (req, res) => {
  try {
    const accessory = await Accessory.findOne({ _id: req.params.id, active: true });
    if (!accessory) {
      return res.status(404).json({ error: 'Accessory not found' });
    }
    res.json(accessory);
  } catch (err) {
    if (err.name === 'CastError') {
      return res.status(400).json({ error: 'Invalid accessory id' });
    }
    console.error('Get accessory error:', err);
    res.status(500).json({ error: 'Failed to fetch accessory' });
  }
};

// GET /api/accessories/search?q=aviator
exports.search = async (req, res) => {
  try {
    const { q } = req.query;
    if (!q || !q.trim()) {
      return res.status(400).json({ error: 'Query parameter "q" is required' });
    }

    const items = await Accessory.find(
      { $text: { $search: q }, active: true },
      { score: { $meta: 'textScore' } }
    )
      .sort({ score: { $meta: 'textScore' } })
      .limit(20);

    res.json({ items });
  } catch (err) {
    console.error('Search accessories error:', err);
    res.status(500).json({ error: 'Search failed' });
  }
};