import router from "./routes/routes.js";
import express from "express";
import dotenv from 'dotenv';
import bodyParser from "body-parser";
dotenv.config();

const app = express();
app.use(express.json());
const port = 8080;

app.use(bodyParser.json());
app.get('/', (req, res) => {
  res.send('Hello World!');
})

app.use('/', router);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});