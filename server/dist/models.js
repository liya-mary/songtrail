"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require('mongoose');
const mongoose_1 = require("mongoose");
const tagSchema = new mongoose_1.Schema({
    title: { type: String, required: true },
    artist: { type: String, required: true },
    src: { type: String, required: true },
    coordinates: { type: [Number], required: true },
    timestamp: { type: Number, required: true },
});
// const tagSchema = new mongoose.Schema({
//     title: String,
//     artist: String,
//     src: String,
//     coordinates: Array,
//     timestamp: Number,
//   }
// )
const Tags = mongoose.model('Tags', tagSchema);
exports.default = Tags;
