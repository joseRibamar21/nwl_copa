import { FastifyInstance } from "fastify"
import { prisma } from "../lib/prisma"
import {z} from 'zod'
import ShortUniqueId from "short-unique-id"

export async function poolRoutes(fastify: FastifyInstance){

    fastify.get('/pools/count', async ()=>{
        const count = await prisma.pool.count()
        return {count}
    })
    
    fastify.post('/pools', async (req, res)=>{
        const createPoolBody = z.object({
            title: z.string(),
        })

        const { title } = createPoolBody.parse(req.body)

        const generate = new ShortUniqueId({
            length:6
        })

        const code = String(generate()).toUpperCase()

        let ownerId = null

        try{
            await req.jwtVerify()
            await prisma.pool.create({
                data: {
                    title,
                    code,
                    ownerId: req.user.sub
                }
            })
        } catch {
            
        }

        await prisma.pool.create({
            data:{
                title,
                code: code
            }
        })

        return res.status(201).send({code})
    })
}
