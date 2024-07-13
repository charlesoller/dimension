// @ts-nocheck
import { Router } from 'express'
import bcrypt from 'bcryptjs'
import { check } from 'express-validator'
import { PrismaClient } from '@prisma/client';
import { handleValidationErrors } from '../../utils/validation';
import { setTokenCookie } from '../../utils/auth';

const prisma = new PrismaClient();
const router = Router();

const validateLogin = [
    check('credential')
      .exists({ checkFalsy: true })
      .notEmpty()
      .withMessage('Please provide a valid email or username.'),
    check('password')
      .exists({ checkFalsy: true })
      .withMessage('Please provide a password.'),
    handleValidationErrors
  ];

// Log in
router.post('/', async (req, res, next) => {
    const { credential, password } = req.body;
    if(!credential || !password){
      const err = new Error("Bad Request")
      err.status = 400
      err.errors = {
        credential: "Email or username is required",
        password: "Password is required"
      }

      return next(err)
    }

    const user = await prisma.user.findFirstOrThrow({
      where: {
        OR: [
          { username: credential },
          { email: credential }
        ]
      },
      include: { profilePicture: true }
    })
  
    if (!user || !bcrypt.compareSync(password, user.hashedPassword.toString())) {
      const err = new Error('Invalid credentials');
      err.status = 401;
      return next(err);
    }

    const safeUser = {
      id: user.id,
      username: user.username,
      name: user.name,
      email: user.email,
    };

    await setTokenCookie(res, safeUser);
    console.log("RES: ", res)
    
    return res.json({ user });
  }
);

// Restore session user
router.get('/', async (req, res) => {
    const { user } = req;
    console.log("In session router, user: ", user)
    if (user) {
      const safeUser = {
        id: user.id,
        username: user.username,
        name: user.name,
        email: user.email,
      };

      const userData = await prisma.user.findUnique({
        where: { username: user.username },
        include: { profilePicture: true }
      })

      return res.json({
        user: userData
      });
    } else return res.json({ user: null });
  }
);

// Log out
router.delete('/', (_req, res) => {
    res.clearCookie('token');
    return res.json({ message: 'success' });
  }
);

export default router;