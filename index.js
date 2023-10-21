import express from 'express';
import 'dotenv/config';
import client from './db/client.js';
import writersRouter from './routes/writers.js';
import cors from 'cors';
const port = process.env.PORT || 8000;


const app = express();
app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization", "Access-Control-Allow-Origin", "Access-Control-Allow-Credentials"],
    credentials: true,
  })
)
app.use(express.json());

app.use('/api/writers', writersRouter);

app.get('/', (req, res) => {
  res.send('Hello World!')
});


client.on('connected', () => {
  app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
  })
});