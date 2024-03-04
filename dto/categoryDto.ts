import { IsString, IsNotEmpty } from "class-validator";
import { IsNotBlank } from "./dtoValidator/isNotBlankValidator";

export class CategoryDto{
  @IsString()
  @IsNotBlank()
  @IsNotEmpty()
  name: string;

  @IsNotBlank()
  @IsNotEmpty()
  @IsString()
  description: string;

  constructor(name: string, description: string){
    this.name = name;
    this.description = description;
  }
}
