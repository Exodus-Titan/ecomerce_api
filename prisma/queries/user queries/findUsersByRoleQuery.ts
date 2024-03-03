import Boom from "@hapi/boom";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient()

export async function findUsersByRoleQuery(role: boolean) {
  try{
    return await prisma.user.findMany({
      where: {
        role: role
      },
      select:{
        id: true,
        email: true,
        name: true,
        role: true
      }
  });}catch(error){
    throw Boom.notFound('No users found');
  }
}
