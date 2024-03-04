import { IsNotEmpty, IsNumber, IsPositive } from "class-validator";



export class PriceDto{
  @IsNumber()
  @IsNotEmpty()
  @IsPositive()
  number: number;

  constructor(number: number){
    this.number = number;
  }
}
