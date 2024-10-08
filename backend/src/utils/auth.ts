// backend/utils/auth.js
import jwt from 'jsonwebtoken'
import { config } from '../config'
const { jwtConfig } = config
const { secret, expiresIn } = jwtConfig;
import { PrismaClient } from '@prisma/client';
import { NextFunction, Request, Response } from 'express';
const prisma = new PrismaClient();

// Sends a JWT Cookie
const setTokenCookie = async (res: Response, user: any) => {
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
    maxAge: parseInt(expiresIn) * 1000, // maxAge in milliseconds
    httpOnly: true,
    secure: isProduction,
    sameSite: isProduction && "none"
  });

  return token;
};

const restoreUser = (req: Request, res: Response, next: NextFunction) => {
  // token parsed from cookies
  const { token } = req.cookies;
  req.user = null;
  return jwt.verify(token, secret, undefined, async (err: any, jwtPayload: any) => {
    if (err) {
      return next();
    }
    try {
      const { id } = jwtPayload.data;
      req.user = await prisma.user.findFirstOrThrow({
        where: { id }
      })
    } catch (e) {
      res.clearCookie('token');
      return next();
    }

    if (!req.user) res.clearCookie('token');
    return next();
  });
};

const requireAuth = function (req: any, _res: any, next: any) {
  if (req.user) return next();

  const err = new Error('Authentication required') as any;
  err.title = 'Authentication required';
  err.errors = { message: 'Authentication required' };
  err.status = 401;
  return next(err);
}

export { setTokenCookie, restoreUser, requireAuth };
