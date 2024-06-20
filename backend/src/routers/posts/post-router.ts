import { Router, Request, Response, NextFunction } from "express";
import { PrismaClient } from '@prisma/client'

const router = Router();
const prisma = new PrismaClient()

router.get('/', async (req: Request, res: Response, next: NextFunction) => {
  const posts = await prisma.post.findMany({
    include: {
      author: true
    }
  });
  return res.json({ ok: true, data: posts })
});

export default router;