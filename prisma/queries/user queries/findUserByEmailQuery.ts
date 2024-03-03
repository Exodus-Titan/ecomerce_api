import Boom  from "@hapi/boom";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient()

export async function findUserByEmailQuery(email: string) {
  try{
    return await prisma.user.findUnique({
      where: {
        email: email
      },
      select:{
        id: true,
        email: true,
        name: true,
        role: true
      }
    });
  }catch(error){
    throw (Boom.notFound('User not found'));
  }
}
