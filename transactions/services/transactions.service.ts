import { Service } from "typedi";
import { TransactionsDao } from "../dao/transactions.dao";
import { CreateTransactionDto } from "../dtos/create.transaction.dto";
import { GetTransactionsQueryDto } from "../dtos/get.transactions.query.dto";
import { convertDate } from "../utils/convert.date"; 

@Service()
export class TransactionsService {
  constructor(private transactionsDao: TransactionsDao) {}

  async getTransactions(query: GetTransactionsQueryDto) {
    return await this.transactionsDao.readTransactions(query)
  }

  createTransaction(transaction: CreateTransactionDto) {

    transaction.date = convertDate(new Date(transaction.date), transaction.txStatus);
    
    return this.transactionsDao.saveTransaction(transaction)
  }

}
