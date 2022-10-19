import { IsDateString, IsString, IsBoolean, IsNotEmpty } from "class-validator";

export class CreateTransactionDto {
  @IsString()
  @IsNotEmpty()
  userId: string;

  @IsDateString()
  date: string | Date;

  @IsBoolean()
  txStatus: boolean;
}
