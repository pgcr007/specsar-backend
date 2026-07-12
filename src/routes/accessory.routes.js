const router = require('express').Router();
const { list, detail, search } = require('../controllers/accessory.controller');

// Order matters: /search must be registered before /:id, or Express will
// treat "search" as an :id value and hit the detail handler instead.
router.get('/search', search);
router.get('/:id', detail);
router.get('/', list);

module.exports = router;