import { FastifyInstance } from "fastify";
import { auth, authGoogle, createUser } from "../controllers/auth_controller";

import { authenticate } from "../plugins/authenticate";

export async function authRoutes(fastify: FastifyInstance) {
  fastify.get('/me',
    {
      onRequest: [authenticate],
    },
    async (request, reply) => {
    return { user: request.user }
  })

  fastify.post('/users/google', authGoogle )
  fastify.post('/users', createUser )
  fastify.post('/login', auth )
}