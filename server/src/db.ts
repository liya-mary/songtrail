import { Schema, model, connect } from 'mongoose';

async function connectDb () {
  await connect('mongodb://127.0.0.1:27017/songtrail')
}

export default connectDb;