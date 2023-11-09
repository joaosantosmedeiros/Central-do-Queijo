import { IsInt, IsString } from 'class-validator';

export class SaveCartBody {
  @IsString()
  productId: string;

  @IsInt()
  amount: number;
}
