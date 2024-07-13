import { Router, Request, Response, NextFunction } from "express";
import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'
import { setTokenCookie } from "../../utils/auth";

const router = Router();
const prisma = new PrismaClient();

// ============================ GET ============================ 
router.get('/:username', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { username } = req.params;

    const posts = await prisma.user.findUniqueOrThrow({
      where: { username },
      include: {
        followers: true,
        following: true,
        profilePicture: true
      }
    });
    return res.json({ success: true, data: posts })
  } catch (error: any) {
    next(error)
  }
});

// ============================ POST ============================ 
router.post('/', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { name, username, email, password, profilePicture } = req.body;
    const hashedPassword = bcrypt.hashSync(password);

    const existingUsername = await prisma.user.findFirst({
      where: {
        OR: [
          { username }, 
          { email }
        ]
      }
    })

    if (existingUsername) {
      return res.status(409).json({ success: false, data: "A user with this username or email already exists." })
    }

    const newUser = await prisma.user.create({
      data: {
        name: name.length ? name : undefined,
        username: username.length ? username : undefined,
        email: email.length ? email : undefined,
        hashedPassword,
        profilePicture: profilePicture ? {
          create: {
            url: profilePicture
          }
        } : undefined
      }
    });

    const safeUser = {
      id: newUser.id,
      name: newUser.name,
      email: newUser.email,
      username: newUser.username,
    };

    await setTokenCookie(res, safeUser);
    console.log("RES: ", res)

    return res.json({ success: true, data: newUser })
  } catch (error: any) {
    next(error)
  }
});

// ============================ PUT ============================ 
router.put('/:id', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const { name, username, profilePicture } = req.body;
    const user = req.user;

    if (user.username !== username) {
      const existingUsername = await prisma.user.findFirst({
        where: { username }
      })

      if (existingUsername) {
        return res.status(409).json({ success: false, data: "A user with this name already exists." })
      }
    }

    const newUser = await prisma.user.update({
      where: { id: Number(id) },
      data: {
        name: name.length ? name : undefined,
        username: username.length ? username : undefined,
        updatedAt: new Date(),
        profilePicture: profilePicture ? {
          upsert: {
            create: {
              url: profilePicture.length ? profilePicture : undefined,
            },
            update: {
              url: profilePicture.length ? profilePicture : undefined,
              updatedAt: new Date()
            }
          }
        } : undefined
      }
    });

    return res.json({ success: true, data: newUser })
  } catch (error: any) {
    next(error)
  }
});


router.put('/:id/follows', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = req.user;
    const { id } = req.params;

    if (!user) {
      return res.json({ success: false, data: "Unable to get active user." })
    }

    const data = {
      followerId: Number(id),
      followingId: user.id
    }

    const where = {
      followerId_followingId: data
    }

    const existingFollow = await prisma.follows.findUnique({ where })

    if (existingFollow) {
      await prisma.follows.delete({ where })
    } else {
      await prisma.follows.create({ data })
    }

    const follower = await prisma.user.findUnique({
      where: { id: user.id },
      include: {
        followers: true,
        following: true,
        profilePicture: true
      }
    })
    const following = await prisma.user.findUnique({
      where: { id: Number(id) },
      include: {
        followers: true,
        following: true,
        profilePicture: true
      }
    })

    return res.json({ success: true, data: { follower, following } });
  } catch (error: any) {
    next(error)
  }
});



export default router;