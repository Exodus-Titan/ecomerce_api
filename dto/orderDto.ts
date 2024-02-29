import { IsNumber, IsPositive, IsString } from "class-validator";

export class OrderDto {

  @IsString({each: true})
  productsIds: string[];

  @IsString()
  userId: string;

  constructor( productsIds: string[], userId: string) {
    this.productsIds = productsIds;
    this.userId = userId;
  }

}
