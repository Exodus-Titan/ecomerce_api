import { IsEmail, IsNotEmpty } from "class-validator";
import { IsNotBlank } from "./dtoValidator/isNotBlankValidator";



export class EmailDto{
  @IsNotBlank()
  @IsNotEmpty()
  @IsEmail()
  email: string;

  constructor(email: string){
    this.email = email;
  }
}
