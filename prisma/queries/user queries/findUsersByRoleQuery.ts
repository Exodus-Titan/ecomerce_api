import Boom from "@hapi/boom";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient()

export async function findUsersByRoleQuery(isAdmin: boolean) {
  try{
    return await prisma.user.findMany({
      where: {
        isAdmin: isAdmin
      },
      select:{
        id: true,
        email: true,
        name: true,
        isAdmin: true
      }
  });}catch(error){
    throw Boom.notFound('No users found');
  }
}
