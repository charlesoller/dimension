import { Router, Request, Response, NextFunction } from "express";
import { PrismaClient } from '@prisma/client'

const router = Router();
const prisma = new PrismaClient();

router.get('/', async (req: Request, res: Response, next: NextFunction) => {
  const posts = await prisma.post.findMany({
    include: {
      author: true
    }
  });
  return res.json({ success: true, data: posts })
});

router.post('/', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { description, url } = req.body;
    const { id: authorId } = req.user;
    const newPost = await prisma.post.create({
      data: {
        url,
        description,
        authorId
      }
    })

    return res.json({ success: true, data: newPost })
  } catch (e) {
    next(e);
  }
})

export default router;