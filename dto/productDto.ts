import { IsNotEmpty, IsNumber, IsPositive, IsString, Min } from "class-validator";
import { IsNotBlank } from "./dtoValidator/isNotBlankValidator";

export class ProductDto{
  @IsNotBlank()
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotBlank()
  @IsNotEmpty()
  @IsString()
  description: string;

  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  price: number;

  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  stock: number;

  @IsNotBlank()
  @IsNotEmpty()
  @IsString()
  categoryId: string;

  constructor(name: string, description: string, price: number, stock: number, categoryId: string){
    this.name = name;
    this.description = description;
    this.price = price;
    this.stock = stock;
    this.categoryId = categoryId;
  }
}
