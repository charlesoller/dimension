import { Router, Request, Response, NextFunction } from "express";
import { PrismaClient } from '@prisma/client'

const router = Router();
const prisma = new PrismaClient();

// ===================== PUT ===================== 

router.put('/:id', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const { content } = req.body;
    const updatedPost = await prisma.comment.update({
      where: { id: Number(id) },
      data: {
        content,
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

// ===================== DELETE ===================== 
router.delete('/:id', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const deletedComment = await prisma.comment.delete({
      where: { id: Number(id) }
    })

    return res.json({ success: true, data: deletedComment });
  } catch (e) {
    next(e);
  }
})

export default router;