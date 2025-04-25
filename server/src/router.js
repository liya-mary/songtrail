const express = require('express');
const controller = require('./controller')
const router = express.Router();

router.get('/trails', controller.getTags);
router.post('/trails', controller.addTag);

// router.get('/spotify/search', controller.search);
router.get('/spotify/token', controller.getToken);

router.get('/auth/login', controller.spotifyLogin);
router.get('/auth/callback', controller.spotifyAuth);
router.get('/auth/token', controller.returnToken)


module.exports = router;