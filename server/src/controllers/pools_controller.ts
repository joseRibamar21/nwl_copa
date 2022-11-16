import { FastifyReply, FastifyRequest } from "fastify"
import ShortUniqueId from "short-unique-id"
import { z } from "zod"
import { prisma } from "../lib/prisma"


async function mePools(request: FastifyRequest, reply: FastifyReply) {
    const pools = await prisma.pool.findMany({
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
        }
    })
    return { pools }
}

async function openPools(request: FastifyRequest, reply: FastifyReply) {
    const pools = await prisma.pool.findMany({
        where: {
            open: true
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
                            avatarUrl: true
                        }
                    }
                },
                take: 4
            },
            owner: {
                select: {
                    id: true,
                    name: true,
                }
            },
        }
    })



    return { pools }
}

async function onePool(request: FastifyRequest, reply: FastifyReply) {
    const getPoolParams = z.object({
        id: z.string(),
    })

    const { id } = getPoolParams.parse(request.params)

    const pool = await prisma.pool.findUnique({
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
                    }
                },
            },
            owner: {
                select: {
                    id: true,
                    name: true,
                }
            },
        }
    })

    return { pool }

}

async function createPool(request: FastifyRequest, reply: FastifyReply) {
    const createPoolBody = z.object({
        title: z.string(),
        open: z.boolean()
    })
    const { title, open } = createPoolBody.parse(request.body)

    const generateCode = new ShortUniqueId({ length: 6 })
    const code = String(generateCode()).toUpperCase()

    try {
        await request.jwtVerify()

        await prisma.pool.create({
            data: {
                title,
                code,
                ownerId: request.user.sub,
                open,
                participants: {
                    create: {
                        userId: request.user.sub
                    }
                }
            }
        })
    }
    catch (err) {
        await prisma.pool.create({
            data: {
                title,
                code,
            }
        })
    }

    return reply.status(201).send({ code })
}

async function joinPool(request: FastifyRequest, reply: FastifyReply){
    const joinPoolBody = z.object({
        code: z.string()
      })
  
      const { code } = joinPoolBody.parse(request.body)
  
      const pool = await prisma.pool.findUnique({
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
  
      if (!pool) {
        return reply.status(400).send({
          message: 'Pool not found.'
        })
      }
  
      if (pool.participants.length > 0) {
        return reply.status(400).send({
          message: 'You already joined this pool.'
        })
      }
  
      if (!pool.ownerId) {
        await prisma.pool.update({
          where: {
            id: pool.id
          },
          data: {
            ownerId: request.user.sub
          }
        })
      }
  
      await prisma.participant.create({
        data: {
          poolId: pool.id,
          userId: request.user.sub
        }
      })
  
      return reply.status(201).send()
  
}

export { mePools, openPools, onePool, createPool, joinPool }