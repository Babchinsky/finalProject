const express = require('express');
const router = express.Router();
const middleware = require('../middlewares/auth');
const { sendMessage, getMessages } = require('../controllers/message');

router.post('/send', middleware, sendMessage);
router.get('/:adId', middleware, getMessages);

module.exports = router;
