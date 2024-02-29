import { PrismaClient } from "@prisma/client";
import { findUserByEmailQuery } from "./findUserByEmailQuery";

const prisma = new PrismaClient()

export async function deleteUserQuery(email: string) {
  const deletedUser = await findUserByEmailQuery(email);
  await prisma.user.delete({
    where: {
      email: email
    }
  });
  return deletedUser;
}
