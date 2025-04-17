const express = require('express');
const cors = require('cors');
const router = require('./router.js');
const connectDb = require('./db.js');
require('dotenv').config({ path: '../.env' });
 // const fs = require('fs');
// const key = fs.readFileSync('../secret/key.pem');
// const cert = fs.readFileSync('../secret/cert.pem');
// const https = require('https');


const app = express();
// const server = https.createServer({key: key, cert: cert }, app);
const port = 3000;

app.use(cors());
app.use(express.json());
app.use(router);

async function startServer () {
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