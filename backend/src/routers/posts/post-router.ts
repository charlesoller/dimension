
import { Router, Request, Response, NextFunction } from "express";
import { PrismaClient } from '@prisma/client'
import { parseChannels } from "../../utils/parsing";
import { handleChannels } from "../../utils/channels";

const router = Router();
const prisma = new PrismaClient();

// ===================== GET ===================== 
router.get('/', async (req: Request, res: Response, next: NextFunction) => {
  const posts = await prisma.post.findMany({
    include: {
      author: {
        include: {
          profilePicture: true
        }
      },
      likes: true,
      channels: true,
      comments: {
        include: {
          author: true,
          likes: true,
          post: true
        }
      }
    }
  });
  return res.json({ success: true, data: posts })
});

// ===================== POST ===================== 
router.post('/', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { description, url } = req.body;
    const user = req.user;
    const newPost = await prisma.post.create({
      data: {
        url,
        description,
        authorId: user.id
      },
      include: {
        author: {
          include: {
            profilePicture: true
          }
        },
        likes: true,
        comments: true
      }
    });

    if (newPost.description) {
      const channels = parseChannels(newPost.description);

      if (channels && user) {
        handleChannels(channels, newPost, user)
      }
    }

    return res.json({ success: true, data: newPost })
  } catch (e) {
    next(e);
  }
})

// Handle Post Comments
router.post('/:id/comments', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id: postId } = req.params;
    const { id: authorId } = req.user;
    const { content } = req.body;

    if (!content || !content.length || typeof content !== "string") {
      return res.json({ success: false, data: "Unable to post non-string, or empty comment." })
    }

    await prisma.comment.create({
      data: {
        authorId: Number(authorId),
        postId: Number(postId),
        content
      }
    })

    const { comments: newComments } = await prisma.post.findFirstOrThrow({
      where: { id: Number(postId) },
      include: {
        comments: {
          include: {
            author: true,
            likes: true
          }
        }
      }
    }) 

    return res.json({ success: true, data: newComments });
  } catch (e) {
    next(e);
  }
})

// ===================== PUT ===================== 
router.put('/:id', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const { description } = req.body;
    const user = req.user;
    const post = await prisma.post.findUnique({ where: { id: Number(id) }});
    const channels = parseChannels(description);

    if (channels && post && user) {
      handleChannels(channels, post, user)
    }

    const updatedPost = await prisma.post.update({
      where: { id: Number(id) },
      data: {
        description,
        updatedAt: new Date()
      },
      include: {
        author: {
          include: {
            profilePicture: true
          }
        },
        comments: {
          include: {
            author: true
          }
        }
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

    const { id: postId } = req.params;
    const { id: authorId } = req.user;

    const post = await prisma.post.findFirst({
      where: { id: Number(postId) },
      include: {
        likes: {
          where: {
            authorId: Number(authorId)
          }
        }
      }
    });
    if (!post) {
      return res.json({ success: false, data: "No post found with that ID." })
    }

    const { likes: existingLike } = post
    if (existingLike.length) {
      const deletedLike = await prisma.postLike.delete({
        where: {
          authorId_postId: {
            authorId: Number(authorId),
            postId: Number(postId)
          }
        }
      });
    } else {
      await prisma.postLike.create({
        data: { authorId: Number(authorId), postId: Number(postId) }
      });
    }
    const { likes: newLikes } = await prisma.post.findFirstOrThrow({
      where: { id: Number(postId) },
      include: { 
        likes: true,
        comments: {
          include: {
            post: true
          }
        }
      }
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

    const deletedPost = await prisma.post.delete({
      where: { id: Number(id) }
    })

    return res.json({ success: true, data: deletedPost });
  } catch (e) {
    next(e);
  }
})

export default router;