import { FastifyInstance } from "fastify";
import { auth, authGoogle, createUser } from "../controllers/auth_controller";

import { authenticate } from "../plugins/authenticate";
import { userMe } from "../controllers/user_controller";

export async function authRoutes(fastify: FastifyInstance) {
  fastify.get('/me',{onRequest: [authenticate]},userMe)

  fastify.post('/users/google', authGoogle )
  fastify.post('/users', createUser )
  fastify.post('/login', auth )
}