import {
  IsDate,
  IsNotEmpty,
  IsOptional,
  IsPositive,
  IsString,
} from 'class-validator';

export class CreateOrderBody {
  @IsString()
  @IsNotEmpty()
  code: string;

  @IsOptional()
  @IsDate()
  paymentDate?: Date;

  @IsOptional()
  @IsPositive()
  discount?: number;
}
