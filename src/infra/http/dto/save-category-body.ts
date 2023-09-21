import { IsNotEmpty, MinLength } from 'class-validator';

export class SaveCategoryBody {
  @IsNotEmpty()
  @MinLength(3)
  name: string;
}
