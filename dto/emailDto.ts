import { IsEmail } from "class-validator";


export class EmailDto{
  @IsEmail()
  email: string;

  constructor(email: string){
    this.email = email;
  }
}
