import { PrismaClient } from "@prisma/client";
import { removePassword } from "../common functions/excludePassword";
import  Boom  from "@hapi/boom";
import { findUserByEmailQuery } from "./findUserByEmailQuery";

const prisma = new PrismaClient()

export async function changeEmailQuery(id: string, newEmail: string) {
  try{
    const emailCheck = await findUserByEmailQuery(newEmail);
    if (!emailCheck){
      const user = await prisma.user.update({
        where: {
          id: id
        },
        data: {
          email: newEmail
        }
      })
      return removePassword(user);
    }else{
      throw Boom.badData('Email already in use');
    }
  }catch(error){
    throw Boom.notFound('User not found');
  }
}
