import { PrismaClient } from "@prisma/client";
import { removePassword } from "../common functions/excludePassword";

const prisma = new PrismaClient()

export async function changeEmailQuery(id: string, newEmail: string) {
  const user = await prisma.user.update({
    where: {
      id: id
    },
    data: {
      email: newEmail
    }
  })
  return removePassword(user);
}
