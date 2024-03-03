import { PrismaClient } from '@prisma/client';
import { UserDto } from '../../../dto/userDto';
import Boom from '@hapi/boom';
import { removePassword } from '../common functions/excludePassword';
import { findUserByEmailQuery } from './findUserByEmailQuery';

const prisma = new PrismaClient();

export async function createUserQuery(userDto: UserDto) {
  try{
    const uniqueCHeck = await findUserByEmailQuery(userDto.email);
    if(!uniqueCHeck){
      const user = await prisma.user.create({
        data: {
          email: userDto.email,
          name: userDto.name,
          passwordHash: userDto.passwordHash,
          role: userDto.role
        }
      });
      return removePassword(user);
    }else{
      throw Boom.badData('Email already in use');
    }
  }catch(error){
    throw Boom.internal('Error creating user');
  }
};
