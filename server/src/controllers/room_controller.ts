import { FastifyReply, FastifyRequest } from "fastify"
import ShortUniqueId from "short-unique-id"
import { z } from "zod"
import { prisma } from "../lib/prisma"
import { errorMenssage } from "../helpers/utils"
import { Prisma } from "@prisma/client"


async function meRooms(request: FastifyRequest, reply: FastifyReply) {
    const room = await prisma.room.findMany({
        where: {
            ownerId: request.user.sub
        },
        include: {
            _count: {
                select: {
                    participants: true,
                }
            },
            participants: {
                select: {
                    id: true,

                    user: {
                        select: {
                            name: true,
                            avatarUrl: true
                        }
                    }
                },
            },
            owner: {
                select: {
                    id: true,
                    name: true,
                }
            },
        },
        take: 10
    })
    return { room }
}

async function openRooms(request: FastifyRequest, reply: FastifyReply) {
    const rooms = await prisma.room.findMany({
        where: {
            restrict: false,
            step: 1
        },

        include: {
            _count: {
                select: {
                    participants: true,
                }
            },
            participants: {
                select: {
                    id: true,

                    user: {
                        select: {
                            id:true,
                            name: true,
                            avatarUrl: true
                        }
                    },
                },
                take: 4
            },
            owner: {
                select: {
                    id: true,
                    name: true,
                }
            },
        },
        /* take: 10 */
    })

    return { rooms }
}

async function oneRoom(request: FastifyRequest, reply: FastifyReply) {
    const getRoomParams = z.object({
        id: z.string(),
    })

    const { id } = getRoomParams.parse(request.params)

    const room = await prisma.room.findUnique({
        where: {
            id,
        },
        include: {
            _count: {
                select: {
                    participants: true,
                }
            },
            participants: {
                select: {
                    id: true,
                    totalPoints: true,
                    user: {
                        select: {
                            name: true,
                            avatarUrl: true
                        }
                    },
                },
                orderBy:{
                    totalPoints: "desc"
                }
            },
            owner: {
                select: {
                    id: true,
                    name: true,
                }
            },
        }
    })

    return { room: {...room,"isAdm": room?.ownerId == request.user.sub }}

}

async function createRoom(request: FastifyRequest, reply: FastifyReply) {
    const createPoolBody = z.object({
        title: z.string(),
        urlImage: z.string(),
        password: z.string(),
        price: z.number(),
    })
    const { title, urlImage, password, price } = createPoolBody.parse(request.body)

    const generateCode = new ShortUniqueId({ length: 6 })
    const code = String(generateCode()).toUpperCase()
    try {
        await request.jwtVerify()

        const newRoom = await prisma.room.create({
            data: {
                title,
                code,
                urlImage,
                step: 0,
                password,
                restrict: password.length!=0,
                ownerId: request.user.sub,
                priceInscription: price, 
                participants: {
                    create: {
                        userId: request.user.sub
                    }
                }
            }
        })
        
        return reply.status(201).send(newRoom)
    }
    catch (err) {
        return errorMenssage(reply, 400, "Parametros incorretos!")
    }
}

async function joinRoom(request: FastifyRequest, reply: FastifyReply) {
    const joinPoolBody = z.object({
        code: z.string()
    })

    const { code } = joinPoolBody.parse(request.body)

    console.log(code)
    console.log(request.user.sub)

    const user = await prisma.user.findFirst({
        where:{
            id: request.user.sub
        }
    })

    const rooms = await prisma.room.findUnique({
        where: {
            code,
        },
        include: {
            participants: {
                where: {
                    userId: request.user.sub
                }
            }
        }
    })

    if (!rooms) {
        return reply.status(400).send({
            message: 'Pool not found.'
        })
    }

    if(!user){
        return reply.status(400).send({ message: "Usuário não encontrado" })
    }

    if(rooms.priceInscription > user.wallet){
        return reply.status(400).send({ message: "Valor insuficiente para a entrar na sala!" })
    }

    if(rooms.step != 1 ){
        return reply.status(404).send({ message: "Você ainda não pode entrar na sala!" })
    }

    if (rooms.participants.length > 0) {
        return reply.status(400).send({
            message: 'You already joined this pool.'
        })
    }

    if (!rooms.ownerId) {
        await prisma.room.update({
            where: {
                id: rooms.id
            },
            data: {
                ownerId: request.user.sub
            }
        })
    }

    var valuepriceInscription = rooms.priceInscription

    await prisma.user.update({
        data:{
            wallet: user.wallet - rooms.priceInscription
        },
        where:{
            id: user.id
        }
    })

    await prisma.room.update({
        where:{
            id: rooms.id
        },
        data:{
            amount: rooms.amount + valuepriceInscription
        }
    })

    await prisma.participant.create({
        data: {
            roomId: rooms.id,
            userId: request.user.sub
        }
    })

    return reply.status(201).send()

}

async function openGameRoom(request: FastifyRequest, reply: FastifyReply) {
    const startGameParams = z.object({
        roomId: z.string(),
    })
    const { roomId } = startGameParams.parse(request.params)
    const roomData = await prisma.room.findUnique({
        where:{
            id: roomId
        }
    })

    if(!roomData){
        return reply.status(404).send({ message: "Sala não encontrada!" })
    }
    
    if(roomData.ownerId != request.user.sub ){
        return reply.status(404).send({ message: "Você não tem permissão para começar o jogo!" })
    }

    if(roomData.step != 0 ){
        return reply.status(404).send({ message: "Você não pode voltar etapas!" })
    }

    await prisma.room.update({
        data:{
            step: 1,
        },
        where:{
            id: roomId
        }
    })    

    return reply.status(200).send({message: "Jogo Aberto!"})
}

async function startGameRoom(request: FastifyRequest, reply: FastifyReply) {
    const startGameParams = z.object({
        roomId: z.string(),
    })
    const { roomId } = startGameParams.parse(request.params)
    const roomData = await prisma.room.findUnique({
        where:{
            id: roomId
        }
    })

    if(!roomData){
        return reply.status(404).send({ message: "Sala não encontrada!" })
    }
    
    if(roomData.ownerId != request.user.sub ){
        return reply.status(400).send({ message: "Você não tem permissão para começar o jogo!" })
    }

    if(roomData.step != 1 ){
        return reply.status(404).send({ message: "Você ainda não pode começar o jogo!" })
    }

    await prisma.room.update({
        data:{
            step: 2,
        },
        where:{
            id: roomId
        }
    })    
}

async function finishGameRoom(request: FastifyRequest, reply: FastifyReply) {
    const startGameParams = z.object({
        roomId: z.string(),
    })
    const { roomId } = startGameParams.parse(request.params)
    const roomData = await prisma.room.findUnique({
        where:{
            id: roomId
        }
    })

    if(!roomData){
        return reply.status(404).send({ message: "Sala não encontrada!" })
    }
    
    if(roomData.ownerId != request.user.sub ){
        return reply.status(400).send({ message: "Você não tem permissão para começar o jogo!" })
    }

    if(roomData.step != 2 ){
        return reply.status(404).send({ message: "Você ainda não pode finalizar o jogo!" })
    }

    await prisma.room.update({
        data:{
            step: 3,
        },
        where:{
            id: roomId
        }
    })    

    let winners = await prisma.participant.findMany({
        where:{
            roomId: roomData.id
        },
        orderBy:{
            totalPoints: "desc"
        },
    })

    let listWinners = [winners[0].userId]

    winners.forEach((e,i)=> {
        if((winners[0].totalPoints == e.totalPoints) && i!=0){
            listWinners.push(e.userId)
        }
    })

    let partAmout = Math.round(roomData.amount/listWinners.length)

    await prisma.$executeRaw`UPDATE User 
        SET wallet = wallet + partAmout
        WHERE 1=1 
        AND id IN (${Prisma.join(listWinners)})`

    reply.status(200).send({message: "Jogo Finaliado com sucesso!"})
}

export { meRooms, openRooms, oneRoom, createRoom, joinRoom, startGameRoom, openGameRoom, finishGameRoom }