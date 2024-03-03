import { Strategy } from 'passport-local';
import Boom from '@hapi/boom';
import bcrypt from 'bcrypt';
import { PrismaClient } from '@prisma/client';
import { removePassword } from '../../prisma/queries/common functions/excludePassword';
const prisma = new PrismaClient()

export const localStrategy = new Strategy({
usernameField: 'email',
passwordField: 'password'
},
async (email, password, done) => {
  try{
    const user = await prisma.user.findUnique({
      where: {
        email: email
      }
    });
    if(!user){
      return done(Boom.notFound(`There is no user registeres with the email ${email}`), false);
    }
    const isMatch = await bcrypt.compare(password, user.passwordHash);
    if(!isMatch){
      return done(Boom.unauthorized('The password is incorrect'), false);
    }
    done(null, removePassword(user));
  }catch(error){
    return done(error, false);
  }
});

