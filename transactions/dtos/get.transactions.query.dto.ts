import { IsPositive, IsInt } from 'class-validator';

export class GetTransactionsQueryDto {
    @IsInt()
    @IsPositive()
    page: number;
  
    @IsInt()
    @IsPositive()
    limit: number;
  }