import fs from "fs";
import ObjectsToCsv from "objects-to-csv";
import { parse } from "csv-parse";
import { Service } from "typedi";
import { InternalServerError } from "routing-controllers";
import { CreateTransactionDto } from "../dtos/create.transaction.dto";
import { GetTransactionsQueryDto } from "../dtos/get.transactions.query.dto";

const CSVPath = `./docs/transactions.csv`;

@Service()
export class TransactionsDao {
  async readTransactions(query: GetTransactionsQueryDto) {
    const { page, limit } = query;

    const from = (page - 1) * limit + 1;
    const to = from + limit - 1;

    if (!fs.existsSync(CSVPath))
      return new InternalServerError("Internal Server Error");

    return new Promise((resolve, reject) => {
      const transactions: CreateTransactionDto[] = [];

      fs.createReadStream(CSVPath)
        .pipe(
          parse({
            columns: true,
            ltrim: true,
            from,
            to,
            on_record: (record) => {
              record.date = new Date(parseInt(record.date));
              record.txStatus = Boolean(parseInt(record.txStatus));
              return record;
            },
          })
        )
        .on("data", (row) => {
          transactions.push(row);
        })
        .on("error", (error) => {
          reject(new InternalServerError("Internal Server Error"));
        })
        .on("end", () => {
          resolve(transactions);
        });
    });
  }

  async saveTransaction(transaction: CreateTransactionDto) {
    try {
      await new ObjectsToCsv([transaction]).toDisk(CSVPath, {
        append: true,
      });
    } catch (err) {
      return new InternalServerError("Internal Server Error");
    }

    return { date: transaction.date };
  }
}
