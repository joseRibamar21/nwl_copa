import { prisma } from "../lib/prisma"
import { FastifyReply, FastifyRequest } from "fastify"

async function userCount() {
    const count = await prisma.user.count()
    return { count }
}

async function userMe(request: FastifyRequest, reply: FastifyReply) {
    const user = await prisma.user.findUnique({
        where:{
            id: request.user.sub
        }
    })
    if(!user){
        return reply.status(404).send({message: "Usuário não encontrado!"})
    }
    return reply.status(200).send({
        user:{
            id: user.id,
            name: user.name,
            email: user.email,
            wallet:user.wallet,
            avatarUrl: user.avatarUrl,
            createdAt: user.createdAt
        }
    })
}

export { userCount, userMe }