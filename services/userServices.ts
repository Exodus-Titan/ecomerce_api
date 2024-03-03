import { EmailDto } from '../dto/emailDto';
import { UserDto } from '../dto/userDto';
import { validateData } from '../middelware/dtoValidationMiddleware';
import { changeEmailQuery, changePasswordHashQuery, createUserQuery, deleteUserQuery, findAllUsersQuery, findUserByEmailQuery, findUserByIdQuery, findUsersByRoleQuery, updateUserQuery } from '../prisma/queries/user queries/userQueriesIndex'
import Boom from '@hapi/boom';


export class UserServices{

  async createUser(dto: UserDto){
      const validationResult = await validateData<UserDto>(UserDto, dto);
      if (validationResult.isValid) {
        const user = validationResult.validatedData;
        const validUser = await createUserQuery(user as UserDto);
        return validUser;
      } else {
        throw Boom.badData(validationResult.errors?.[0])
    }
  }

  async getUserById(id: string){
    const user = await findUserByIdQuery(id);
    if (user) {
      return user;
    } else {
      throw Boom.notFound('User not found');
    }
  }

  async getAllUsers(){
    const users = await findAllUsersQuery();
    if (users) {
      return users;
    } else {
      throw Boom.notFound('No users found');
    }
  }

  async getUserByEmail(email: string){
      const emailDto = new EmailDto(email);
      const validationResult = await validateData<EmailDto>(EmailDto, emailDto);
      if(validationResult.isValid){
        const validEmail = validationResult.validatedData;
        if (validEmail) {
          const user = await findUserByEmailQuery(validEmail.email);
          if (user){
            return user;
          }else{
            throw (Boom.notFound('User not found'));;
        }}else{
          throw (Boom.notFound('Email not found'));;
        }
      }else{
        throw  Boom.badData(validationResult.errors?.[0]);
      }
  }

  async getUsersByRole(role: boolean){
    const users = await findUsersByRoleQuery(role);
    if (users) {
      return users;
    } else {
      throw Boom.notFound('User not found');
    }
  }

  async updateUserName(id: string, name: string){
    const updatedUser = await updateUserQuery(id, name);
    if (updatedUser) {
      return updatedUser;
    } else {
      throw Boom.notFound('User not found');
    }
  }

  async updateEmail (id: string, email: string){
    const emailDto = new EmailDto(email);
    const validationResult = await validateData<EmailDto>(EmailDto, emailDto);
    if(validationResult.isValid){
      const validEmail = validationResult.validatedData;
      if (validEmail) {
        const updatedUser = await changeEmailQuery(id, validEmail.email);
        if (updatedUser) {
          return updatedUser;
        } else {
          throw Boom.notFound('User not found');
        }
      }else{
        throw Boom.notFound('Email not found');
      }}else{
        throw Boom.badData(validationResult.errors?.[0]);
      }
  }

  async updatePasswordHash(id: string, passwordHash: string){
    const updatedUser = await changePasswordHashQuery(id, passwordHash);
    if (updatedUser) {
      return updatedUser;
    } else {
      throw Boom.notFound('User not found');
    }
  }

  async deleteUser(id: string){
    const deletedUser = await deleteUserQuery(id);
    if (deletedUser){
      return deletedUser;
    }
    else{
      throw Boom.notFound('User not found');
    }
  }

}
