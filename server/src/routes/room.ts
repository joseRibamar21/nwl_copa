import { FastifyInstance } from "fastify"
import { authenticate } from "../plugins/authenticate"
import { createRoom, finishGameRoom, joinRoom, meRooms, oneRoom, openGameRoom, openRooms, startGameRoom } from "../controllers/room_controller"

export async function roomRoutes(fastify: FastifyInstance) {

  fastify.post('/room',{ onRequest: [authenticate] }, createRoom)

  fastify.get('/room', { onRequest: [authenticate] } ,openRooms)
  
  fastify.get('/room/:id', { onRequest: [authenticate] }, oneRoom) 

  fastify.post('/room/join', { onRequest: [authenticate] }, joinRoom)

  fastify.get('/room/me', { onRequest: [authenticate] }, meRooms)

  fastify.post('/room/:roomId/open', { onRequest: [authenticate] }, openGameRoom)

  fastify.post('/room/:roomId/start', { onRequest: [authenticate] }, startGameRoom)

  fastify.post('/room/:roomId/finalize', { onRequest: [authenticate] }, finishGameRoom)
}
