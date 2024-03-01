import { EmailDto } from '../dto/emailDto';
import { UserDto } from '../dto/userDto';
import { validateData } from '../middelware/dtoValidationMiddleware';
import { changeEmailQuery, createUserQuery, deleteUserQuery, findAllUsersQuery, findUserByEmailQuery, findUserByIdQuery, findUsersByRoleQuery, updateUserQuery } from '../prisma/queries/user queries/userQueriesIndex'

export class UserServices{

  async createUser(dto: UserDto){

    try{
      const validationResult = await validateData<UserDto>(UserDto, dto);
      if (validationResult.isValid) {
        const user = validationResult.validatedData;
        const validUser = await createUserQuery(user as UserDto);
        return validUser;
      } else {
        throw new Error(validationResult.errors?.[0]);
      }
    } catch (error) {
      console.log(error);//enviar un mensaje con el error
    }
  }

  async getUserById(id: string){

    try{
      const user = await findUserByIdQuery(id);
    if (user) {
      return user;
    } else {
      throw new Error('User not found');
    }
     }catch(error){
      console.log(error);//enviar un mensaje con el error
     }
  }

  async getAllUsers(){

    try{
    const users = await findAllUsersQuery();
    if (users) {
      return users;
    } else {
      throw new Error('No users found');
    }
    }catch(error){
      console.log(error);//enviar un mensaje con el error
    }
  }

  async getUserByEmail(email: string){
    try{
      const emailDto = new EmailDto(email);
      const validationResult = await validateData<EmailDto>(EmailDto, emailDto);
      if(validationResult.isValid){
        const validEmail = validationResult.validatedData;
        if (validEmail) {
          const user = await findUserByEmailQuery(validEmail.email);
          if (user){
            return user;
          }else{
            throw new Error('User Not Found');
        }}else{
          throw new Error('Email not found');
        }
      }else{
        throw new Error(validationResult.errors?.[0]);
      }
    }catch(error){
      console.log(error);//enviar un mensaje con el error
    }
  }

  async getUsersByRole(role: boolean){

    try{
    const users = await findUsersByRoleQuery(role);
    if (users) {
      return users;
    } else {
      throw new Error('No users found');
    }
    }catch(error){
      console.log(error);//enviar un mensaje con el error
    }
  }

  async updateUserName(id: string, name: string){

    try{
      const updatedUser = await updateUserQuery(id, name);
      if (updatedUser) {
        return updatedUser;
      } else {
        throw new Error('User not found');
      }
    }catch(error){
      console.log(error);//enviar un mensaje con el error
    }

  }

  async updateEmail (id: string, email: string){

      try{
        const emailDto = new EmailDto(email);
        const validationResult = await validateData<EmailDto>(EmailDto, emailDto);
        if(validationResult.isValid){
          const validEmail = validationResult.validatedData;
          if (validEmail) {
            const updatedUser = await changeEmailQuery(id, validEmail.email);
            if (updatedUser) {
              return updatedUser;
            } else {
              throw new Error('User not found');
            }
          }else{
            throw new Error('Email not found');
          }}else{
            throw new Error(validationResult.errors?.[0]);
          }
      }catch(error){
        console.log(error);//enviar un mensaje con el error
      }
  }

  async updatePasswordHash(id: string, passwordHash: string){

      try{
        const updatedUser = await updateUserQuery(id, passwordHash);
        if (updatedUser) {
          return updatedUser;
        } else {
          throw new Error('User not found');
        }
      }catch(error){
        console.log(error);//enviar un mensaje con el error
      }
  }

  async deleteUser(id: string){
    try{
      const deletedUser = await deleteUserQuery(id);
      if (deletedUser){
        return deletedUser;
      }
      else{
        throw new Error('User not found');
      }
    }catch (error){
      console.log(error);//enviar un mensaje con el error
    }
  }

}
