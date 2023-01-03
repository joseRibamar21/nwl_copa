import { FastifyReply, FastifyRequest } from "fastify"
import { z } from "zod"
import { prisma } from "../lib/prisma"

async function newGuess(request: FastifyRequest, reply: FastifyReply) {
    const createGuessParams = z.object({
        roomId: z.string()
    })

    const createGuessBody = z.object({
        gameId: z.string(),
        firstTeamPoints: z.number(),
        secondTeamPoints: z.number(),
    })

    const { roomId } = createGuessParams.parse(request.params)
    const { gameId, firstTeamPoints, secondTeamPoints } = createGuessBody.parse(request.body)
    const participant = await prisma.participant.findUnique({
        where: {
            userId_roomId: {
                userId: request.user.sub,
                roomId,
            }
        }
    })
    if (!participant) {
        return reply.status(400).send({ message: "You have not entered this pool yet" })
    }

    const guess = await prisma.guess.findUnique({
        where: {
            participantId_gameId: {
                gameId,
                participantId: participant.id
            }
        }
    })


    const game = await prisma.game.findUnique({
        where: {
            id: gameId,
        }
    })

    if (!game) {
        return reply.status(404).send({ message: "Game not found" })
    }


    if (game.date < new Date()) {
        return reply.status(404).send({ message: "You cannot guess in a game that has already happened" })
    }

    if (guess) {
        await prisma.guess.update({
            where: {
                id:guess.id
            },
            data: {
                firstTeamPoints,
                secondTeamPoints,
            }
        })
        return reply.status(200).send({ message: "Sucess update pool" })
    }

    const newGess = await prisma.guess.create({
        data: {
            gameId,
            participantId: participant.id,
            firstTeamPoints,
            secondTeamPoints,
        }
    })

    return reply.status(201).send(newGess)
}

export { newGuess }