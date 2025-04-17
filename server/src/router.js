const express = require('express');
const controller = require('./controller')
const router = express.Router();

router.get('/trails', controller.getTags);
router.post('/trails', controller.addTag);

// router.get('/spotify/search', controller.search);
router.get('/spotify/token', controller.getToken);

module.exports = router;