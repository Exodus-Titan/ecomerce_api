import { PrismaClient } from '@prisma/client';
import { UserDto } from '../../../dto/userDto';
import { v1 as uuidv1 } from 'uuid';
import { removePassword } from '../common functions/excludePassword';

const prisma = new PrismaClient();

export async function createUserQuery(userDto: UserDto) {
  const user = await prisma.user.create({
    data: {
      id: uuidv1(),
      email: userDto.email,
      name: userDto.name,
      passwordHash: userDto.passwordHash,
      role: userDto.role
    }
  });
  return removePassword(user);
};
