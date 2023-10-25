import { IsNotEmpty, MinLength } from 'class-validator';

export class CreateProductBody {
  @IsNotEmpty()
  @MinLength(3)
  name: string;

  @IsNotEmpty()
  categoryId: string;
}
