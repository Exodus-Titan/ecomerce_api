import { IsArray, IsString } from "class-validator";
import { OrderedProductDto } from "./orderedProductDto";

export class OrderDto {

  @IsArray()
  orderedProducts: OrderedProductDto[];

  @IsString()
  userId: string;

  constructor( orderedProducts: OrderedProductDto[], userId: string) {
    this.orderedProducts = orderedProducts;
    this.userId = userId;
  }

}
