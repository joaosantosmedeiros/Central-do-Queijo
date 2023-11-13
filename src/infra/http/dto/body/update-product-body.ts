import { IsOptional, IsPositive, MinLength } from 'class-validator';

export class UpdateProductBody {
  @MinLength(4)
  @IsOptional()
  name: string;

  @IsOptional()
  categoryId: string;

  @IsOptional()
  image: string;

  @IsOptional()
  @IsPositive()
  price: number;
}
