import { Router, Request, Response, NextFunction } from "express";
import { PrismaClient } from '@prisma/client'

const router = Router();
const prisma = new PrismaClient();

// ===================== GET ===================== 

router.get('/:channelName', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { channelName } = req.params;

    const channel = await prisma.channel.findUnique({
      where: { name: channelName },
      include: {
        posts: {
          include: {
            comments: {
              include: {
                author: true
              }
            },
            author: true
          }
        }
      }
    });

    if (!channel) {
      return res.status(404).json({ success: false, data: "Could not find channel with this name." });
    }

    return res.json({ success: true, data: channel });
  } catch (error) {
    next(error);
  }
})

export default router;
