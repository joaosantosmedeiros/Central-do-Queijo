import { IsNotEmpty, MinLength } from 'class-validator';

export class CreateCategoryBody {
  @IsNotEmpty()
  @MinLength(3)
  name: string;
}
