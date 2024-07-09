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

// Handle Post Likes
router.put('/:id/likes', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id: commentId } = req.params;
    const { id: authorId } = req.user;
    const comment = await prisma.comment.findFirst({
      where: { id: Number(commentId) },
      include: {
        likes: {
          where: {
            authorId: Number(authorId)
          }
        }
      }
    });
    if (!comment) {
      return res.json({ success: false, data: "No post found with that ID." })
    }
    // console.log("Comment: ", comment)
    const { likes: existingLike } = comment
    // console.log("Existing: ", existingLike)
    if (existingLike.length) {
      const deletedLike = await prisma.commentLike.delete({
        where: {
          authorId_commentId: {
            authorId: Number(authorId),
            commentId: Number(commentId)
          }
        }
      });
    } else {
      // console.log("Here")
      const newLike = await prisma.commentLike.create({
        data: { authorId: Number(authorId), commentId: Number(commentId) }
      });
      // console.log("New: ", newLike)
    }
    const { likes: newLikes } = await prisma.comment.findFirstOrThrow({
      where: { id: Number(commentId) },
      include: { likes: true, author: true }
    }) 

    return res.json({ success: true, data: newLikes });
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