const express = require('express');
const router = express.Router();
const middleware = require('../middlewares/auth');
const { createAd, getUserAds, searchAds, updateAd, deleteAd, markAsSold, getAllAds, getAdsByUser } = require('../controllers/ad');

router.post('/create', middleware, createAd);
router.get('/my-ads', middleware, getUserAds);
router.get('/search', searchAds);
router.get('/all', getAllAds);
router.get('/user/:userId', getAdsByUser);
router.put('/:id', middleware, updateAd);
router.delete('/:id', middleware, deleteAd);
router.patch('/:id/sold', middleware, markAsSold);

module.exports = router;

