import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';

export class CreateAccountBody {
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @MinLength(8)
  password: string;

  @IsNotEmpty()
  @MinLength(8)
  confirmPassword: string;

  @IsNotEmpty()
  @MinLength(3)
  name: string;
}
