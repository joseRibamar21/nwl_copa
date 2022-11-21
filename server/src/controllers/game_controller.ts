import { FastifyReply, FastifyRequest } from "fastify"
import { z } from "zod"
import { prisma } from "../lib/prisma"

async function newGame(request: FastifyRequest, reply: FastifyReply) {
    const createGameParams = z.object({
       poolId: z.string(), 
    })
    const createGameBody = z.object({
        firstTeam: z.string(),
        secondTeam: z.string(),
        date: z.string()
    })

    const {firstTeam,secondTeam,date} = createGameBody.parse(request.body)

    const {poolId} = createGameParams.parse(request.params)

    const gameData = await prisma.game.create({
        data:{
            firstTeam,
            secondTeam,
            poolId,
            date: new Date(date).toISOString()
        }
    })

    if(!gameData){
        return reply.status(400).send({menssage: "Não foi possivel criar o jogo"})
    }
    
    return {
        game: gameData
    }

}

async function games(request: FastifyRequest, reply: FastifyReply) {
    const createGameParams = z.object({
       poolId: z.string(), 
    })

    const {poolId} = createGameParams.parse(request.params)

    const gameData = await prisma.game.findMany({
       where:{
        poolId,
       },
       include:{
        guesses:{
            select:{
                id:true,
                firstTeamPoints: true,
                secondTeamPoints: true,
                participant:{
                    select:{
                        user:{
                            select:{
                                name:true,
                                avatarUrl:true,
                            }
                        }
                    },
                },
            }
        }
       }
    })

    if(!gameData){
        return reply.status(400).send({menssage: "Não foi possivel criar o jogo"})
    }
    
    return {
        game: gameData
    }

}


export {newGame,games}