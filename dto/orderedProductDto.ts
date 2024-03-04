import { IsNotEmpty, IsNumber, IsPositive, IsString } from "class-validator";
import { IsNotBlank } from "./dtoValidator/isNotBlankValidator";

export class OrderedProductDto{

  @IsNotBlank()
  @IsNotEmpty()
  @IsString()
  productId: string;

  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  quantity: number;

  constructor( productId: string, quantity: number) {
    this.productId = productId;
    this.quantity = quantity;
  }
}
