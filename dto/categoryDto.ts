import { IsString } from "class-validator";

export class CategoryDto{
  @IsString()
  name: string;

  @IsString()
  description: string;

  constructor(name: string, description: string){
    this.name = name;
    this.description = description;
  }
}
