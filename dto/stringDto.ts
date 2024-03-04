import { IsNotEmpty } from "class-validator";
import { IsNotBlank } from "./dtoValidator/isNotBlankValidator";



export class StringDto{
  @IsNotBlank()
  @IsNotEmpty()
  string: string;

  constructor(string: string){
    this.string = string;
  }
}
