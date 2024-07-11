import { Router, Request, Response, NextFunction } from "express";
import { PrismaClient } from '@prisma/client'

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
      }
    });
    return res.json({ success: true, data: posts })
  } catch (error: any) {
    next(error)
  }
});

// ============================ PUT ============================ 
router.put('/:id/follows', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = req.user;
    const { id } = req.params;

    if (!user) {
      return res.json({success: false, data: "Unable to get active user."})
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
        following: true
      }
    })
    const following = await prisma.user.findUnique({
      where: { id: Number(id) },
      include: { 
        followers: true,
        following: true
      }
    })

    return res.json({ success: true, data: { follower, following }});
  } catch (error: any) {
    next(error)
  }
});



export default router;