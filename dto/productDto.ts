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
  categoryName: string;

  constructor(name: string, description: string, price: number, stock: number, categoryName: string){
    this.name = name;
    this.description = description;
    this.price = price;
    this.stock = stock;
    this.categoryName = categoryName;
  }
}
