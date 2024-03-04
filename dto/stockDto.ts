import { IsNotEmpty, IsNumber, Min } from "class-validator";



export class StockDto{
  @IsNumber()
  @IsNotEmpty()
  @Min(0)
  number: number;

  constructor(number: number){
    this.number = number;
  }
}
