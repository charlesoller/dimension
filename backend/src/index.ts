import express, { Request, Response } from 'express';
import dotenv from 'dotenv'
import cors from 'cors'
import apiRouter from "./routers"

dotenv.config();
const port = process.env.PORT || 3000;
const app = express();

app.use(cors());
app.use('/api', apiRouter)

app.get('/', (req: Request, res: Response) => {
  res.send('Hello, World!');
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
