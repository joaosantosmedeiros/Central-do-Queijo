import { IsEmail, IsOptional, MinLength } from 'class-validator';

export class UpdateAccountBody {
  @IsEmail()
  @IsOptional()
  newEmail: string;

  @MinLength(8)
  @IsOptional()
  newPassword: string;

  @MinLength(3)
  @IsOptional()
  newName: string;
}
