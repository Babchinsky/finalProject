const express = require('express');
const router = express.Router();
const middleware = require('../middlewares/auth');
const { updateProfile, changePassword } = require('../controllers/user');

router.put('/edit', middleware, updateProfile);
router.put('/change-password', middleware, changePassword);

module.exports = router;
