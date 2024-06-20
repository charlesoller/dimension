import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()
async function main() {
  const charles = await prisma.user.upsert({
    where: { email: 'charles@dimension.com' },
    update: {},
    create: {
      email: 'charles@dimension.com',
      username: 'charles',
      name: 'Charles',
      bio: 'Charles test user #1',
      posts: {
        create: {
          url: "https://vazxmixjsiawhamofees.supabase.co/storage/v1/object/public/models/low-poly-spaceship/model.gltf",
          description: "Check out this rocket ship that I modeled!"
        },
      },
    },
  })
  const oller = await prisma.user.upsert({
    where: { email: 'oller@dimension.com' },
    update: {},
    create: {
      email: 'oller@dimension.com',
      username: 'oller',
      name: 'Oller',
      bio: 'Oller test user #2',
      posts: {
        create: [
          {
            url: "https://vazxmixjsiawhamofees.supabase.co/storage/v1/object/public/models/zombie-car/model.gltf",
            description: "Pretty cool zombie truck right?"
          },
          {
            url: "https://vazxmixjsiawhamofees.supabase.co/storage/v1/object/public/models/iphone-x/model.gltf",
            description: "Tried modeling an iphone for the first time!"
          },
        ],
      },
    },
  })
  console.log({ charles, oller })
}
main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })