const express = require('express');
const controller = require('./controller')
const router = express.Router();

router.get('/trails', controller.getTags);
router.post('/trails', controller.addTag);

module.exports = router;