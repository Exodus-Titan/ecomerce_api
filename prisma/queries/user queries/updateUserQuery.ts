import { PrismaClient } from '@prisma/client';
import { removePassword } from '../common functions/excludePassword';
import  Boom  from '@hapi/boom';
const prisma = new PrismaClient();

export async function updateUserQuery(id: string, name: string){
  try{
    const user = await prisma.user.update({
      where: {
        id: id
      },
      data: {
        name: name,
      }
    });
    return removePassword(user);
  }catch(error){
    throw Boom.notFound('User not found');
  }
}
