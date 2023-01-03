import { PrismaClient } from '@prisma/client'
import { compare, genSaltSync, hash } from 'bcrypt'
import { FastifyReply } from 'fastify'

export const prisma = new PrismaClient()

export const hashPassword = (password: string) => {
  let salt = genSaltSync(10)
  return new Promise<string>(res => {
    hash(password, salt, (err, saltedPassword) => {
      res(saltedPassword)
    })
  })
}

export const comparePassword = (password: string, hashedPassword: string) => {
  return new Promise<boolean>(res => {
    compare(password, hashedPassword, (err, same) => {
      if (err) res(false)
      else res(same)
    })
  })
}

export function errorMenssage(reply:FastifyReply, status: number, text: string ){
  return reply.status(status).send({
    "message": text ,
    "status": status
}) 
}
