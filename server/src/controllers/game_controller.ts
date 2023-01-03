import { FastifyReply, FastifyRequest } from "fastify"
import { z } from "zod"
import { prisma } from "../lib/prisma"

async function newGame(request: FastifyRequest, reply: FastifyReply) {
    const createGameParams = z.object({
        roomId: z.string(),
    })
    const createGameBody = z.object({
        firstTeam: z.string(),
        secondTeam: z.string(),
        date: z.string()
    })

    const { firstTeam, secondTeam, date } = createGameBody.parse(request.body)

    const { roomId } = createGameParams.parse(request.params)

    const gameData = await prisma.game.create({
        data: {
            firstTeam,
            secondTeam,
            roomId,
            date: new Date(date).toISOString()
        }
    })

    if (!gameData) {
        return reply.status(400).send({ menssage: "Não foi possivel criar o jogo" })
    }

    return {
        game: gameData
    }

}

async function games(request: FastifyRequest, reply: FastifyReply) {
    const createGameParams = z.object({
        roomId: z.string(),
    })

    const { roomId } = createGameParams.parse(request.params)

    const gameData = await prisma.game.findMany({
        where: {
            roomId,
        },
        include: {
            guesses: {
                select: {
                    id: true,
                    points: true,
                    firstTeamPoints: true,
                    secondTeamPoints: true,
                    participant: {
                        select: {
                            user: {
                                select: {
                                    name: true,
                                    avatarUrl: true,
                                }
                            }
                        },
                    },
                }
            }
        }
    })

    if (!gameData) {
        return reply.status(400).send({ menssage: "Não foi possivel criar o jogo" })
    }

    return {
        game: gameData
    }

}

async function closeGame(request: FastifyRequest, reply: FastifyReply) {
    const closeGameBody = z.object({
        firstTeamPoints: z.number(),
        secondTeamPoints: z.number()
    })
    const closeGameparams = z.object({
        gameId: z.string()
    })

    const { firstTeamPoints, secondTeamPoints } = closeGameBody.parse(request.body)
    const { gameId } = closeGameparams.parse(request.params)

    const game = await prisma.game.findFirstOrThrow(
        {
            where: {
                id: gameId,
                room: {
                    owner: {
                        id: request.user.sub
                    }
                }
            }
        }
    )
    console.log(game)

    await prisma.game.update(
        {
            where: {
                id: gameId,
            },
            data: {
                firstTeamPoints,
                secondTeamPoints
            }
        }
    )

    await prisma.guess.updateMany(
        {
            data: {
                points: 3
            },
            where: {
                gameId,
                AND: {
                    firstTeamPoints,
                    AND: {
                        secondTeamPoints
                    }
                }
            }
        }
    )

    await prisma.$queryRaw`
        update Guess g set g.points = 1 where 1=1
        and g.id = ${gameId}
        and (firstTeamPoints = ${firstTeamPoints} and secondTeamPoints != ${secondTeamPoints} ) 
        or (secondTeamPoints = ${secondTeamPoints} and firstTeamPoints != ${firstTeamPoints} )
    `
    return reply.status(200).send("Jogo Fechado!")
}

export { newGame, games, closeGame }