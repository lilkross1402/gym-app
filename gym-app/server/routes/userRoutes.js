const express = require('express');
const router = express.Router();

const { getProfile, updateProfile } = require('../controllers/userController');
const { uploadPhoto } = require('../controllers/photoController');
const upload = require('../middleware/multer');

// GET /api/user/profile
router.get('/profile', getProfile);

// PUT /api/user/profile
router.put('/profile', updateProfile);

// POST /api/user/photo
router.post('/photo', upload.single('image'), uploadPhoto);

module.exports = router;
