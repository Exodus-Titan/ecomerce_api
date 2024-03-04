import { IsArray, IsNotEmpty, IsString } from "class-validator";
import { OrderedProductDto } from "./orderedProductDto";
import { IsNotBlank } from "./dtoValidator/isNotBlankValidator";

export class OrderDto {

  @IsArray()
  orderedProducts: OrderedProductDto[];

  @IsNotBlank()
  @IsNotEmpty()
  @IsString()
  userId: string;

  constructor( orderedProducts: OrderedProductDto[], userId: string) {
    this.orderedProducts = orderedProducts;
    this.userId = userId;
  }

}
