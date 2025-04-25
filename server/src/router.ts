// const express = require('express');
// const controller = require('./controller')
// const router = express.Router();

import express from 'express';
import { Router } from 'express'
import { getTags,addTag,getToken,spotifyLogin,spotifyAuth,returnToken } from './controller';

const router = express.Router();


router.get('/trails', getTags);
router.post('/trails', addTag);

// router.get('/spotify/search', controller.search);
router.get('/spotify/token', getToken);

router.get('/auth/login', spotifyLogin);
router.get('/auth/callback', spotifyAuth);
router.get('/auth/token', returnToken)


export default router;