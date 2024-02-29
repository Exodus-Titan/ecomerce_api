import { IsBoolean, IsEmail, IsString } from "class-validator";

export class UserDto{
  @IsEmail()
  email: string;

  @IsString()
  name: string;

  @IsString()
  passwordHash: string;

  @IsBoolean()
  role : boolean;

  constructor(email: string, name: string, passwordHash: string, role: boolean){
    this.email = email;
    this.name = name;
    this.passwordHash = passwordHash;
    this.role = role;
  }
}
