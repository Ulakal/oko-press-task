import "reflect-metadata";
import { Service } from "typedi";
import {
  Controller,
  QueryParams,
  Body,
  Get,
  Post,
  HttpCode,
  OnUndefined,
  OnNull,
} from "routing-controllers";
import { TransactionsService } from "../services/transactions.service";
import { CreateTransactionDto } from "../dtos/create.transaction.dto";
import { GetTransactionsQueryDto } from "../dtos/get.transactions.query.dto";

@Controller("/transactions")
@Service()
export class TransactionController {
  constructor(private transactionsService: TransactionsService) {}

  @Get("/")
  @OnUndefined(404)
  async getTransactions(@QueryParams() query: GetTransactionsQueryDto) {
    let result = await this.transactionsService.getTransactions(query);
    return result;
  }

  @Post("/")
  @HttpCode(201)
  async post(@Body({ required: true }) transaction: CreateTransactionDto) {
    return await this.transactionsService.createTransaction(transaction);
  }
}
