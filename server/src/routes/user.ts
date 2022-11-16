import { FastifyInstance } from "fastify"
import { userCount } from "../controllers/user_controller"

export async function userRoutes(fastify: FastifyInstance){
    fastify.get('/users/count', userCount)
}
