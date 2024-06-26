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
      },
      include: {
        author: true
      }
    })
    
    return res.json({ success: true, data: newPost })
  } catch (e) {
    next(e);
  }
})

router.put('/:id', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const { description } = req.body;
    const updatedPost = await prisma.post.update({
      where: { id: Number(id) },
      data: {
        description,
        updatedAt: new Date()
      },
      include: {
        author: true
      }
    });

    return res.json({ success: true, data: updatedPost });
  } catch (e) {
    next(e);
  }
})

router.delete('/:id', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;

    const deletedPost = await prisma.post.delete({
      where: { id: Number(id) }
    })

    return res.json({ success: true, data: deletedPost });
  } catch (e) {
    next(e);
  }
})

export default router;