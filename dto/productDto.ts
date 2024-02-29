import { IsNumber, IsPositive, IsString, Min } from "class-validator";

export class ProductDto{
  @IsString()
  name: string;

  @IsString()
  description: string;

  @IsNumber()
  @IsPositive()
  price: number;

  @IsNumber()
  @Min(0)
  stock: number;

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
