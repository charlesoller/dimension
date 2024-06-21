import express, { Request, Response } from 'express';
import dotenv from 'dotenv'
import cors from 'cors'
import csurf from 'csurf'
import helmet from 'helmet'
import cookieParser from 'cookie-parser'
import apiRouter from "./routers"
import { config } from './config';
dotenv.config();
const port = process.env.PORT || 3000;
const app = express();

const { environment } = config;
const isProduction = environment === 'production';

app.use(cors());
app.use(cookieParser());
app.use(express.json())
app.use('/api', apiRouter)

// Security Middleware
if (!isProduction) {
  // enable cors only in development
  app.use(cors());
}

// helmet helps set a variety of headers to better secure your app
app.use(
  helmet.crossOriginResourcePolicy({
      policy: "cross-origin"
  })
);

// Set the _csrf token and create req.csrfToken method
app.use(
  csurf({
    cookie: {
      secure: isProduction,
      sameSite: isProduction && "lax",
      httpOnly: true
    }
  })
);

app.get('/', (req: Request, res: Response) => {
  res.send('Hello, World!');
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
