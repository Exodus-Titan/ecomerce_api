
import { PrismaClient } from "@prisma/client";
import Boom from "@hapi/boom";

const prisma = new PrismaClient()

export async function findAllUsersQuery() {
  try{
    return await prisma.user.findMany({
      select:{
        id: true,
        email: true,
        name: true,
        role: true
      }
    });
  }catch(error){
    throw Boom.notFound('No users found');
  }
}
