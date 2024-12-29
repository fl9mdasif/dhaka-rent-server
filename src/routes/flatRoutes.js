const express = require('express');
const { getFlats, createFlat, updateFlat, deleteFlat, getSingleFlat } = require('../controllers/flatController');
// const { createFlat } = require('../controllers/flatController');

const router = express.Router();

router.post('/', createFlat);
router.get('/', getFlats);
// router.get('/', getFlatsByCriteria);
router.get('/:id', getSingleFlat);
router.put('/:id', updateFlat);
router.delete('/:id', deleteFlat);

module.exports = router;
