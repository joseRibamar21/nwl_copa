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
            open: true,
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
                    user: {
                        select: {
                            name: true,
                            avatarUrl: true
                        }
                    },
                },
            },
            owner: {
                select: {
                    id: true,
                    name: true,
                }
            },
            ranking: {
                select: {
                    points: true,
                    participant: {
                        select: {
                            id: true,
                            user: {
                                select: {
                                    name: true,
                                    avatarUrl: true
                                }
                            },

                        },
                    }
                }
            }
        }
    })

    return { room }

}

async function createRoom(request: FastifyRequest, reply: FastifyReply) {
    const createPoolBody = z.object({
        title: z.string(),
        urlImage: z.string(),
        open: z.boolean()
    })
    const { title, urlImage, open } = createPoolBody.parse(request.body)

    const generateCode = new ShortUniqueId({ length: 6 })
    const code = String(generateCode()).toUpperCase()
    console.log(title)
    try {
        await request.jwtVerify()

        const newRoom = await prisma.room.create({
            data: {
                title,
                code,
                urlImage,
                open,
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

export { meRooms, openRooms, oneRoom, createRoom, joinRoom }