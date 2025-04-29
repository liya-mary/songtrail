import express from 'express';
import cors from 'cors';
import router from './router';
import connectDb from './db';
import dotenv from "dotenv";

dotenv.config();

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());
app.use(router);

async function startServer() {
  try {
    await connectDb();
    console.log('DB connected');
  } catch (err) {
    console.log('DB not connected:', err);
    process.exit(1)
  }
}

startServer();

app.listen(port, () => {
  console.log(`Now listening on port ${port}`);
})