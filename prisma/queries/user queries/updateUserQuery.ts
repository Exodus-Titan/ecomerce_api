import { PrismaClient } from '@prisma/client';
import { removePassword } from '../common functions/excludePassword';
const prisma = new PrismaClient();

export async function updateUserQuery(email: string, name: string){
  const user = await prisma.user.update({
    where: {
      email: email
    },
    data: {
      name: name,
    }
  });
  return removePassword(user);
}
