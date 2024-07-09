import { PrismaClient } from "@prisma/client";
import type { Post, User } from "@prisma/client";

const prisma = new PrismaClient();

export const handleChannels = async (channelArr: string[], post: Post, user: User): Promise<void> => {
  deleteChannels(channelArr, post, user);
  createChannels(channelArr, post, user);
}

const createChannels = async (channelArr: string[], post: Post, user: User): Promise<void> => {
  channelArr.forEach( async (name) => {
    await prisma.channel.upsert({
      where: { name },
      update: {
        users: {
          connect: { id: user.id }
        },
        posts: {
          connect: { id: post.id }
        }
      },
      create: {
        name,
        users: {
          connect: { id: user.id }
        },
        posts: {
          connect: { id: post.id }
        }
      }
    })
  })
}

const deleteChannels = async (channelArr: string[], post: Post, user: User): Promise<void> => {
  const prevChannels = await prisma.channel.findMany({
    where: {
      posts: {
        some: {
          id: post.id
        }
      }
    }
  })

  const filteredChannels = prevChannels
    .filter(channel => !channelArr.includes(channel.name))
    .map(channel => ({ id: channel.id }));

  await prisma.post.update({
    where: { id: post.id },
    data: {
      channels: {
        disconnect: filteredChannels
      }
    }
  });

  await prisma.user.update({
    where: { id: user.id },
    data: {
      channels: {
        disconnect: filteredChannels
      }
    }
  })

  // Deletes any channels that have no related posts
  await prisma.channel.deleteMany({
    where: {
      posts: {
        none: {}
      }
    }
  })
}