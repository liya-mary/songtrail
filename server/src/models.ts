const mongoose = require('mongoose')
import { Schema, model, connect } from 'mongoose';



interface Tag {
  title: string;
  artist: string;
  src: string;
  coordinates:number[];
  timestamp:number
}


const tagSchema = new Schema<Tag>({
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

const Tags= mongoose.model('Tags', tagSchema);


export type {Tag};
export default Tags;