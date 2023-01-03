import { FastifyInstance } from "fastify"
import { z } from "zod"
import { newGuess } from "../controllers/guess_controller"
import { prisma } from "../lib/prisma"
import { authenticate } from "../plugins/authenticate"


export async function guessRoutes(fastify: FastifyInstance) {
  fastify.get('/guesses/count', async () => {
    const count = await prisma.guess.count()

    return { count }
  })

  fastify.post('/room/:roomId/games/guesses',{onRequest: [authenticate]},newGuess)
}