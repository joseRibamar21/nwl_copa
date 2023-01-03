import Fastify from 'fastify'
import cors from '@fastify/cors'
import jwt from '@fastify/jwt'

import { roomRoutes } from './routes/room'
import { userRoutes } from './routes/user'
import { guessRoutes } from './routes/guess'
import { authRoutes } from './routes/auth'
import { gameRoutes } from './routes/game'

async function bootstrap() {
  const fastify = Fastify({
    logger: true
  })

  await fastify.register(cors, {
    origin: true,
  })

  await fastify.register(jwt, {
    secret: 'nlwcopa'
  })

  fastify.register(roomRoutes)
  fastify.register(userRoutes)
  fastify.register(guessRoutes)
  fastify.register(authRoutes)
  fastify.register(gameRoutes)
  fastify.get('/',()=>{
    return "Olaaa"
  })

  await fastify.listen({ port: 3333 })
}

bootstrap()