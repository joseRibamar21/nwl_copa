import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
    const user = await prisma.user.create({
        data: {
            name: 'Jose Ribamar',
            email: "jose@teste.com",
            avatarUrl: "https://github.com/joseRibamar21.png",
            password: "123456"
        }
    })

    await prisma.user.create({
        data: {
            name: 'Senhor Gato  ',
            email: "teste@teste.com",
            avatarUrl: "https://i.pinimg.com/736x/d5/c8/eb/d5c8ebdfa1eb3ec56d3c284577f3a1c6.jpg",
            password: "123456"
        }
    })

    const pool = await prisma .pool.create({
        data:{
            title: 'Example Pool',
            code: 'BOL123',
            ownerId: user.id,

            participants:{
                create: {
                    userId: user.id
                }
            }
        }
    })

   /*  await prisma.game.create({
        data:{
            date: '2022-11-07T20:17:31.989Z',
            firstTeamCountryCode: 'DE',
            secondTeamCountryCode: 'BR'
        }
    })

    await prisma.game.create({
        data:{
            date: '2022-11-010T20:17:31.989Z',
            firstTeamCountryCode: 'BR',
            secondTeamCountryCode: 'AR',

            guesses:{
                create:{
                    firstTeamPoints: 2,
                    secondTeamPoints:1,
                    participant:{
                        connect:{
                            userId_poolId:{
                                userId:user.id,
                                poolId: pool.id
                            }
                        }
                    }
                }
            }
        }
    }) */
}

main()