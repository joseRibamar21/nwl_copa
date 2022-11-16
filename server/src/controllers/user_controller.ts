import { prisma } from "../lib/prisma"

async function userCount() {
    const count = await prisma.user.count()
    return { count }
}

export { userCount }