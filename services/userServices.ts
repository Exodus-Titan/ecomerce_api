import { EmailDto } from '../dto/emailDto';
import { StringDto } from '../dto/stringDto';
import { UserDto } from '../dto/userDto';
import { validateData } from '../middelware/dtoValidationMiddleware';
import { changeEmailQuery, changePasswordHashQuery, createUserQuery, deleteUserQuery, findAllUsersQuery, findUserByEmailQuery, findUserByIdQuery, findUsersByRoleQuery, updateUserQuery } from '../prisma/queries/user queries/userQueriesIndex'
import Boom from '@hapi/boom';
import bcrypt from 'bcrypt';


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

  async getUserById(userId: string){
    const userIdDto = new StringDto(userId);
    const validationResult = await validateData<StringDto>(StringDto, userIdDto);
      if (validationResult.isValid) {
        const data = validationResult.validatedData;
        if (data) {
          const user = await findUserByIdQuery(data.string);
          if (user) {
            return user;
          } else {
            throw Boom.notFound('User not found');
          }
        }else {
          throw Boom.badData('User id not provided');
        }
      }else{
        throw Boom.badData(validationResult.errors?.[0]);
      }
  }

  async getAllUsers(){
    const users = await findAllUsersQuery();
    if (users && users.length > 0) {
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
          }
        }else{
          throw (Boom.notFound('Email not found'));;
        }
      }else{
        throw  Boom.badData(validationResult.errors?.[0]);
      }
  }

  async getUsersByRole(isAdmin: boolean){
    const users = await findUsersByRoleQuery(isAdmin);
    if (users && users.length > 0) {
      return users;
    } else {
      throw Boom.notFound('No users found');
    }
  }

  async updateUserName(userId: string, name: string){
    const userIdDto = new StringDto(userId);
    const nameDto = new StringDto(name);
    const validationId = await validateData<StringDto>(StringDto, userIdDto);
    const validationName = await validateData<StringDto>(StringDto, nameDto);
    if (validationId.isValid) {
      const validId = validationId.validatedData;
      if (validId) {
        if (validationName.isValid) {
          const validName = validationName.validatedData;
          if (validName) {
            const updatedUser = await updateUserQuery(validId.string, validName.string);
            if (updatedUser) {
              return updatedUser;
            } else {
              throw Boom.notFound('User not found');
            }
          }else{
            throw Boom.badData('Name not provided');
          }
        }else{
          throw Boom.badData(validationName.errors?.[0]);
        }
      }else{
        throw Boom.badData('User id not provided');
      }
    }else{
      throw Boom.badData(validationId.errors?.[0]);
    }
  }

  async updateEmail (userId: string, email: string){
    const emailDto = new EmailDto(email);
    const userIdDto = new StringDto(userId);
    const validationEmail = await validateData<EmailDto>(EmailDto, emailDto);
    const validationUserID = await validateData<StringDto>(StringDto, userIdDto);
    if(validationEmail.isValid){
      if(validationUserID.isValid){
        const validEmail = validationEmail.validatedData;
        const validUserId = validationUserID.validatedData;
        if (validEmail) {
          if (validUserId) {
          const updatedUser = await changeEmailQuery(validUserId.string, validEmail.email);
          if (updatedUser) {
            return updatedUser;
          } else {
            throw Boom.notFound('User not found');
          }
        }else{
          throw Boom.badData('User id not provided');
        }
        }else{
          throw Boom.notFound('Email not found');
        }
      }else{
        throw Boom.badData(validationUserID.errors?.[0]);
      }
    }else{
      throw Boom.badData(validationEmail.errors?.[0]);
    }
  }

  async updatePasswordHash(userId: string, passwordHash: string){
    const userIdDto = new StringDto(userId);
    const passwordHashDto = new StringDto(passwordHash);
    const validationId = await validateData<StringDto>(StringDto, userIdDto);
    const validationPassword = await validateData<StringDto>(StringDto, passwordHashDto);
    if (validationId.isValid) {
      const validId = validationId.validatedData;
      if (validId) {
        if (validationPassword.isValid) {
          const validPassword = validationPassword.validatedData;
          if (validPassword) {
            const newHash = await bcrypt.hash(validPassword.string, 10);
            const updatedUser = await changePasswordHashQuery(validId.string, newHash);
            if (updatedUser) {
              return updatedUser;
          } else {
            throw Boom.notFound('User not found');
          }
        }else{
          throw Boom.badData('Password not provided');
        }
      }else{
        throw Boom.badData(validationPassword.errors?.[0]);
      }
    }else{
      throw Boom.badData('User id not provided');
    }
    }else{
      throw Boom.badData(validationId.errors?.[0]);
    }
  }

  async deleteUser(userId: string){
    const userIdDto = new StringDto(userId);
    const validationResult = await validateData<StringDto>(StringDto, userIdDto);
      if (validationResult.isValid) {
        const data = validationResult.validatedData;
        if (data) {
          const deletedUser = await deleteUserQuery(data.string);
          if (deletedUser){
            return deletedUser;
          }
        else{
          throw Boom.notFound('User not found');
        }
      }else {
        throw Boom.badData('User id not provided');
      }
    }else{
      throw Boom.badData(validationResult.errors?.[0]);
    }
  }

}
