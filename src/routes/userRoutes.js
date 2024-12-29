const express = require('express');
const { addToFavorites, removeFromFavorites, creatUser, myFavoriteFlats, myProfile } = require('../controllers/userController');

const router = express.Router();

router.post('/newUser', creatUser)
router.get('/myProfile', myProfile)
router.get('/myFavoriteFlats', myFavoriteFlats)
router.post('/addFavorites', addToFavorites);
router.delete('/removeFromFavorites', removeFromFavorites);

module.exports = router;
