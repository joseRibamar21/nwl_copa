import { FastifyReply, FastifyRequest } from "fastify"
import { z } from "zod"
import { prisma } from "../lib/prisma"
import fetch from 'node-fetch'
import { hashPassword,comparePassword } from "../helpers/utils";

async function authGoogle(request: FastifyRequest, reply: FastifyReply) {

    const createUserBody = z.object({
        access_token: z.string(),
    })
    const { access_token } = createUserBody.parse(request.body)

    const userResponse = await fetch('https://www.googleapis.com/oauth2/v2/userinfo', {
        method: 'GET',
        headers: {
            Authorization: `Bearer ${access_token}`,
        }
    })

    const userData = await userResponse.json()

    const userInfoSchema = z.object({
        id: z.string(),
        email: z.string().email(),
        name: z.string(),
        picture: z.string().url()
    })

    const userInfo = userInfoSchema.parse(userData)

    let user = await prisma.user.findUnique({
        where: {
            googleId: userInfo.id
        }
    })

    if (!user) {
        user = await prisma.user.create({
            data: {
                email: userInfo.email,
                name: userInfo.name,
                avatarUrl: userInfo.picture,
                googleId: userInfo.id
            }
        })
    }

    console.log(user.id, user.avatarUrl, user.name)

    const token = await reply.jwtSign({
        name: user.id,
        avatarUrl: user.avatarUrl,
    }, {
        sub: user.id,
        expiresIn: '7 days',
    })

    return { token }
}

async function createUser(request: FastifyRequest, reply: FastifyReply) {

    const createUserBody = z.object({
        name: z.string(),
        email: z.string(),
        password: z.string(),
        avatarUrl: z.string(),
    })
    const userInfo = createUserBody.parse(request.body)

    console.log(userInfo?.email)

    let user = await prisma.user.findUnique({
        where: {
            email: userInfo.email
        }
    })

    if (!user) {
        user = await prisma.user.create({
            data: {
                email: userInfo.email,
                name: userInfo.name,
                avatarUrl: userInfo.avatarUrl,
                password: await hashPassword(userInfo.password),
            }
        })
    }else{
        return {message: "Usuário já cadastrado!"}
    }
    
    const token = await reply.jwtSign({
        name: user.id,
        avatarUrl: user.avatarUrl,
    }, {
        sub: user.id,
        expiresIn: '7 days',
    })
    

    return { token }
}

async function auth(request: FastifyRequest, reply: FastifyReply) {
    const authBody = z.object({
        email: z.string(),
        password: z.string(),
    })

    try{
        const userInfo = authBody.parse(request.body)
        const user = await prisma.user.findFirst({
            where:{
                email: userInfo.email
            }
        })

        if(!user){
            return reply.status(404).send({message:"Usuário não encontrado!"})
        }
        
        if(!await comparePassword(userInfo.password,user.password!)){
            return reply.status(422).send({message:"Senha incorreta!"})
        }

        const token = await reply.jwtSign({
            name: user.id,
            avatarUrl: user.avatarUrl,
        }, {
            sub: user.id,
            expiresIn: '7 days',
        })
        
    
        return { token }

    }catch(error){
        console.log(error)
        return {message:"Parametros incorretos!"}
    }


    
   
}

export { authGoogle, createUser, auth }