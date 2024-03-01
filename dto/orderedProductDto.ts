import { IsNumber, IsPositive, IsString } from "class-validator";

export class OrderedProductDto{

  @IsString()
  productId: string;

  @IsNumber()
  @IsPositive()
  quantity: number;

  constructor( productId: string, quantity: number) {
    this.productId = productId;
    this.quantity = quantity;
  }
}
