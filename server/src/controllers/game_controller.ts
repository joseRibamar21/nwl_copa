import { FastifyReply, FastifyRequest } from "fastify"
import { z } from "zod"
import { prisma } from "../lib/prisma"
import { Prisma } from "@prisma/client"

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

    const roomData = await prisma.room.findUnique(
        {
            where: {
                id: roomId
            },
            include:{
                _count:{
                    select:{
                        Game: true
                    }
                }
            }
        }
    )
    
    
    if (!roomData) {
        return reply.status(404).send({ message: "Não foi encontrar a sala" })
    }
    
    if(roomData.step != 0){
        return reply.status(400).send({ message: "Você nao pode voltar etapas!" })
    }

    console.log(roomData)
    if (roomData._count.Game >= roomData.limit_games) {
        return reply.status(400).send({ message: `Sua sala tem um limite de ${roomData.limit_games} jogos!`})
    }

    const gameData = await prisma.game.create({
        data: {
            firstTeam,
            secondTeam,
            roomId,
            date: new Date(date).toISOString()
        },
    })

    if (!gameData) {
        return reply.status(400).send({ message: "Não foi possivel criar o jogo" })
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
        orderBy:{
            date:'desc'
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
        return reply.status(400).send({ message: "Não foi possivel criar o jogo" })
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

    const game = await prisma.game.findFirst(
        {
            where: {
                id: gameId,
                room: {
                    owner: {
                        id: request.user.sub
                    },
                }
            },
            include:{
                room: true
            }
        }
    )

    if(!game){
        return reply.status(404).send({ message: "Jogo não existe!" })
    }

    if(game.room.step != 2){
        return reply.status(400).send({ message: "Feche a sala para poder postar os resultados!" })
    }

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
        and g.gameId = ${gameId}
        and (g.firstTeamPoints = ${firstTeamPoints} and g.secondTeamPoints != ${secondTeamPoints} ) 
        or (g.secondTeamPoints = ${secondTeamPoints} and g.firstTeamPoints != ${firstTeamPoints} )
    `

    ///    GANHADORES 3 PONTOS

    try {
        let ganhadore3pontos: any = await prisma.$queryRaw`select p.id from Participant p 
        inner join Guess g on g.participantId = p.id 
        where 1=1
        and g.gameId = ${gameId}
        and (g.firstTeamPoints = ${firstTeamPoints} and g.secondTeamPoints = ${secondTeamPoints});`

        const listGanhadore3pontos = ganhadore3pontos.map((e: { id: any }) => e.id)

        console.log(listGanhadore3pontos)

        await prisma.$executeRaw`UPDATE Participant 
        SET totalPoints = totalPoints + 3 
        WHERE 1=1 
        AND id IN (${Prisma.join(listGanhadore3pontos)})
        `
    } catch (error) {
        console.error(error)
    }

    ///    GANHADORES 1 PONTOS

    try{
        let ganhadore1pontos: any = await prisma.$queryRaw`select p.id from Participant p 
        inner join Guess g on g.participantId = p.id 
        where 1=1
        and g.gameId = ${gameId}
        and (g.firstTeamPoints = ${firstTeamPoints} and g.secondTeamPoints != ${secondTeamPoints} ) 
        or (g.secondTeamPoints = ${secondTeamPoints} and g.firstTeamPoints != ${firstTeamPoints} )`

        const listGanhadore1pontos = ganhadore1pontos.map((e: { id: any }) => e.id)

        console.log(listGanhadore1pontos)

        await prisma.$executeRaw`UPDATE Participant 
        SET totalPoints = totalPoints + 1
        WHERE 1=1 
        AND id IN (${Prisma.join(listGanhadore1pontos)})
        `
    } catch(err){
        console.error(err)
    }

    return reply.status(200).send("Jogo Fechado!")
}

export { newGame, games, closeGame }