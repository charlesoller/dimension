// backend/utils/auth.js
import jwt from 'jsonwebtoken'
import { config } from '../config'
const { jwtConfig } = config
const { secret, expiresIn } = jwtConfig;
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

// Sends a JWT Cookie
const setTokenCookie = async (res: any, user: any) => {
  // Create the token.
  console.log("In set Token")
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
  console.log("TOKEN: ", token)
  const isProduction = process.env.NODE_ENV === "production";
  
  // Set the token cookie
  const cookie = res.cookie('token', token, {
    maxAge: parseInt(expiresIn) * 1000, // maxAge in milliseconds
    httpOnly: true,
    secure: isProduction,
    sameSite: isProduction && "Lax"
  });
  console.log("Cookie: ", cookie)
  return token;
};

const restoreUser = (req: any, res: any, next: any) => {
  // token parsed from cookies
  const { token } = req.cookies;
  // console.log("restoreUser, Cookies: ", req.cookies)
  // console.log("restoreUser, Token: ", token)
  req.user = null;
  return jwt.verify(token, secret, null, async (err: any, jwtPayload: any) => {
    if (err) {
      return next();
    }
    console.log("JWT Payload: ", jwtPayload)
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
