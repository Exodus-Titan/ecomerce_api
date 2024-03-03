import { UserDto } from '../dto/userDto';
import { UserServices } from './userServices';

export class AuthServices {

  async registerUser(userDto: UserDto) {
      const newUser = await new UserServices().createUser(userDto);
      return newUser;
  }
}
