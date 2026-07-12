const router = require('express').Router();
const requireAuth = require('../middleware/requireAuth');
const { add, list, remove } = require('../controllers/favorite.controller');

router.use(requireAuth);

router.post('/', add);
router.get('/', list);
router.delete('/:id', remove);

module.exports = router;