// @ts-nocheck

import express, { Request, Response } from 'express';
import dotenv from 'dotenv'
import cors from 'cors'
import csurf from 'csurf'
import helmet from 'helmet'
import cookieParser from 'cookie-parser'
import apiRouter from "./routers"
import { config } from './config';
import { PrismaClientValidationError } from '@prisma/client/runtime/library';
// import path from 'path';
dotenv.config();
const port = process.env.PORT || 3000;
const app = express();

const { environment } = config;
const isProduction = environment === 'production';
console.log("is prod?: ", isProduction)

app.use(cookieParser());
app.use(express.json())

// Security Middleware
if (!isProduction) {
  // enable cors only in development
  app.use(cors());
} else {
  app.use(cors({
    origin: "https://dimension-qqy6.onrender.com",
    credentials: true
  }));
}

// helmet helps set a variety of headers to better secure your app
app.use(
  helmet.crossOriginResourcePolicy({
    policy: "cross-origin"
  })
);

app.use('/api', apiRouter)

// // Set the _csrf token and create req.csrfToken method
app.use(
  csurf({
    cookie: {
      secure: isProduction,
      sameSite: isProduction && "lax",
      httpOnly: true
    }
  })
);

// app.use(
//   csurf({
//     cookie: {
//       secure: isProduction,
//       sameSite: isProduction && "Lax",
//       httpOnly: true
//     }
//   })
// );


// Static routes
// Serve React build files in production
// if (process.env.NODE_ENV === 'production') {
// Serve the frontend's index.html file at the root route
// app.get('/', (req, res) => {
//   res.cookie('XSRF-TOKEN', req.csrfToken());
//   res.sendFile(
//     path.resolve(__dirname, '../../frontend', 'dist', 'index.html')
//   );
// });

// Serve the static assets in the frontend's build folder
// app.use(express.static(path.resolve("../frontend/dist")));

// Serve the frontend's index.html file at all other routes NOT starting with /api
// app.get(/^(?!\/?api).*/, (req, res) => {
//   res.cookie('XSRF-TOKEN', req.csrfToken());
//   res.sendFile(
//     path.resolve(__dirname, '../../frontend', 'dist', 'index.html')
//   );
// });
// }
app.get("/", (req, res) => {
  return res.json("Hello, World!")
})

// Add a XSRF-TOKEN cookie in development
if (!isProduction) {
  app.get("/api/csrf/restore", (req, res) => {
    const csrfToken = req.csrfToken();
    res.cookie("XSRF-TOKEN", csrfToken);
    res.status(200).json({
      'XSRF-Token': csrfToken
    });
  });
}

// Error Handlers

app.use((_req, _res, next) => {
  const err = new Error("The requested resource couldn't be found.");
  err.title = "Resource Not Found";
  err.errors = { message: "The requested resource couldn't be found." };
  err.status = 404;
  next(err);
});

app.use((err, _req, _res, next) => {
  // check if error is a Prisma error:
  if (err instanceof PrismaClientValidationError) {
    let errors = {};
    for (let error of err.errors) {
      errors[error.path] = error.message;
    }
    err.title = 'Validation error';
    err.errors = errors;
  }
  next(err);
});

app.use((err, _req, res, _next) => {
  res.status(err.status || 500);
  console.error(err);
  res.json({
    message: err.message,
    errors: err.errors,
  });
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
