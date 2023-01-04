import { FastifyReply, FastifyRequest } from "fastify"
import ShortUniqueId from "short-unique-id"
import { z } from "zod"
import { prisma } from "../lib/prisma"
import { errorMenssage } from "../helpers/utils"


async function meRooms(request: FastifyRequest, reply: FastifyReply) {
    const room = await prisma.room.findMany({
        where: {
            participants: {
                some: {
                    userId: request.user.sub
                }
            },
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
        password: z.string()
    })
    const { title, urlImage, password } = createPoolBody.parse(request.body)

    const generateCode = new ShortUniqueId({ length: 6 })
    const code = String(generateCode()).toUpperCase()
    try {
        await request.jwtVerify()

        const newRoom = await prisma.room.create({
            data: {
                title,
                code,
                urlImage,
                open: false,
                password,
                restrict: password.length!=0,
                ownerId: request.user.sub,
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

    await prisma.participant.create({
        data: {
            roomId: rooms.id,
            userId: request.user.sub
        }
    })

    return reply.status(201).send()

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

    if(roomData.ownerId == request.user.sub ){
        return reply.status(404).send({ message: "Você não tem permissão para começar o jogo!" })
    }

    await prisma.room.update({
        data:{
            open:false
        },
        where:{
            id: roomId
        }
    })    
}

export { meRooms, openRooms, oneRoom, createRoom, joinRoom, startGameRoom }