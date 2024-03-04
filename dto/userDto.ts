import { IsBoolean, IsEmail, IsNotEmpty, IsString } from "class-validator";
import { IsNotBlank } from "./dtoValidator/isNotBlankValidator";

export class UserDto{
  @IsNotEmpty()
  @IsNotBlank()
  @IsEmail()
  email: string;

  @IsNotBlank()
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotBlank()
  @IsNotEmpty()
  @IsString()
  passwordHash: string;


  @IsBoolean()
  isAdmin : boolean;

  constructor(email: string, name: string, passwordHash: string, isAdmin: boolean){
    this.email = email;
    this.name = name;
    this.passwordHash = passwordHash;
    this.isAdmin = isAdmin;
  }
}
