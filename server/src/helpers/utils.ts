import { PrismaClient } from '@prisma/client'
import { compare, genSaltSync, hash } from 'bcrypt'

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
