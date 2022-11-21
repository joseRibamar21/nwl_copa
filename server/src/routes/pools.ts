import { FastifyInstance } from "fastify"
import { authenticate } from "../plugins/authenticate"
import { createPool, joinPool, mePools, onePool, openPools } from "../controllers/pools_controller"

export async function poolRoutes(fastify: FastifyInstance) {

  fastify.post('/pools',{ onRequest: [authenticate] }, createPool)

  fastify.post('/pools/join', { onRequest: [authenticate] }, joinPool)

  fastify.get('/pools/me', { onRequest: [authenticate] }, mePools)

  fastify.get('/pools', { onRequest: [authenticate] } ,openPools)

  fastify.get('/pools/:id', { onRequest: [authenticate] }, onePool)

}
