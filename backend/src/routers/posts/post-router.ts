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
  return res.json({ ok: true, data: posts })
});

router.post('/', async (req: Request, res: Response, next: NextFunction) => {
  const { description, url } = req.body;
  const newPost = await prisma.post.create({
    data: {
      url,
      description,
      authorId: 1
    }
  })

  return res.json({ success: true, data: newPost })
})

export default router;