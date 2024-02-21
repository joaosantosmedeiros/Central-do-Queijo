import { IsInt, IsPositive, IsString } from 'class-validator';

export class SaveCartBody {
  @IsString()
  productId: string;

  @IsInt()
  @IsPositive()
  amount: number;
}
