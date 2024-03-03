import { PrismaClient } from "@prisma/client";
import { removePassword } from "../common functions/excludePassword";
import  Boom  from "@hapi/boom";

const prisma = new PrismaClient()

export async function changePasswordHashQuery(id: string, passwordHash: string) {
  try{
    const user = await prisma.user.update({
      where: {
        id: id
      },
      data: {
        passwordHash: passwordHash
      }
    })
    return removePassword(user);
  }catch(error){
    throw Boom.notFound('User not found');
  }
}
