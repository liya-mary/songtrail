"use strict";
// const express = require('express');
// const controller = require('./controller')
// const router = express.Router();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const controller_1 = require("./controller");
const router = express_1.default.Router();
router.get('/trails', controller_1.getTags);
router.post('/trails', controller_1.addTag);
// router.get('/spotify/search', controller.search);
router.get('/spotify/token', controller_1.getToken);
router.get('/auth/login', controller_1.spotifyLogin);
router.get('/auth/callback', controller_1.spotifyAuth);
router.get('/auth/token', controller_1.returnToken);
exports.default = router;
