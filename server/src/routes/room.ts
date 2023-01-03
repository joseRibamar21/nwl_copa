import { FastifyInstance } from "fastify"
import { authenticate } from "../plugins/authenticate"
import { createRoom, joinRoom, meRooms, oneRoom, openRooms } from "../controllers/room_controller"

export async function roomRoutes(fastify: FastifyInstance) {

  fastify.post('/room',{ onRequest: [authenticate] }, createRoom)

  fastify.get('/room', { onRequest: [authenticate] } ,openRooms)
  
  fastify.get('/room/:id', { onRequest: [authenticate] }, oneRoom) 

  fastify.post('/room/join', { onRequest: [authenticate] }, joinRoom)

  fastify.get('/room/me', { onRequest: [authenticate] }, meRooms)

}
