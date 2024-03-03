import { PrismaClient } from "@prisma/client";
import Boom from '@hapi/boom';
import { findUserByIdQuery } from "./findUserByIdQuery";

const prisma = new PrismaClient()

export async function deleteUserQuery(id: string) {
  const deletedUser = await findUserByIdQuery(id);
  try{
    await prisma.user.delete({
      where: {
        id: id
      }
    });
    return deletedUser;
  }catch(error){
    throw Boom.notFound('User not found');
  }
}
