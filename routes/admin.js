const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/auth');
const adminMiddleware = require('../middlewares/admin');
const { deleteUser, deleteAd } = require('../controllers/admin');

router.delete('/user/:userId', authMiddleware, adminMiddleware, deleteUser);
router.delete('/ad/:adId', authMiddleware, adminMiddleware, deleteAd);

module.exports = router;
