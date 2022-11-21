import { FastifyInstance } from "fastify"
import { games, newGame } from "../controllers/game_controller"
import { authenticate } from "../plugins/authenticate"




export async function gameRoutes(fastify: FastifyInstance) {
  fastify.post('/pools/:poolId/games', {
    onRequest: [authenticate]
  }, newGame)

  fastify.get('/pools/:poolId/games', {
    onRequest: [authenticate]
  }, games)
}

/* fastify.get('/pools/:id/games', {
  onRequest: [authenticate]
}, async (request) => {
  const getPoolParams = z.object({
    id: z.string(),
  })

  const { id } = getPoolParams.parse(request.params)

  const games = await prisma.game.findMany({
    orderBy: {
      date: 'desc'
    },
    include: {
      guesses: {
        where: {
          participant: {
            userId: request.user.sub,
            poolId: id,
          }
        }
      }
    }
  })

  return {
    games: games.map(game => {
      return {
        ...game,
        guess: game.guesses.length > 0 ? game.guesses[0] : null,
        guesses: undefined,
      }
    })
  }
})
} */