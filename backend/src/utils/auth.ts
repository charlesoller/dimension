// @ts-nocheck
// backend/utils/auth.js
import jwt from 'jsonwebtoken'
import { config } from '../config'
// const { User } = require('../db/models');
const { jwtConfig } = config
const { secret, expiresIn } = jwtConfig;
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

// Sends a JWT Cookie
const setTokenCookie = (res, user) => {
  // Create the token.
  const safeUser = {
    id: user.id,
    email: user.email,
    username: user.username,
  };
  const token = jwt.sign(
    { data: safeUser },
    secret,
    { expiresIn: parseInt(expiresIn) } // 604,800 seconds = 1 week
  );

  const isProduction = process.env.NODE_ENV === "production";

  // Set the token cookie
  res.cookie('token', token, {
    maxAge: expiresIn * 1000, // maxAge in milliseconds
    httpOnly: true,
    secure: isProduction,
    sameSite: isProduction && "Lax"
  });

  return token;
};

const restoreUser = (req, res, next) => {
  // token parsed from cookies
  const { token } = req.cookies;
  console.log("Token: ", token)
  req.user = null;
  return jwt.verify(token, secret, null, async (err, jwtPayload) => {
    if (err) {
      return next();
    }
    console.log("JWT Payload: ", jwtPayload)
    try {
      const { id } = jwtPayload.data;
      req.user = await prisma.user.findFirstOrThrow({
        where: { id }
      });
    } catch (e) {
      res.clearCookie('token');
      return next();
    }

    if (!req.user) res.clearCookie('token');
    return next();
  });
};

const requireAuth = function (req, _res, next) {
  if (req.user) return next();

  const err = new Error('Authentication required');
  err.title = 'Authentication required';
  err.errors = { message: 'Authentication required' };
  err.status = 401;
  return next(err);
}

export { setTokenCookie, restoreUser, requireAuth };
