import { expect } from "chai";
import sinon from "sinon";
import { TransactionsService } from "../transactions/services/transactions.service";
import { TransactionsDao } from "../transactions/dao/transactions.dao";

describe("Transactions service unit test", () => {
  let transactionsDao: TransactionsDao;
  let transactionsService: TransactionsService;

  const transaction = {
    userId: "1",
    date: "2022-10-18T08:57:05.320Z",
    txStatus: true,
  };
  beforeEach(() => {
    transactionsDao = new TransactionsDao();
    sinon
      .stub(transactionsDao, "saveTransaction")
      .returns(Promise.resolve({ date: "2022-11-18T08:57:05.320Z" }));

    sinon
      .stub(transactionsDao, "readTransactions")
      .returns(Promise.resolve([transaction]));
    transactionsService = new TransactionsService(transactionsDao);
  });

  afterEach(function () {
    sinon.restore();
  });
  
  it("should succesfully create transaction", async () => {
    const result = await transactionsService.createTransaction(transaction);
    expect(result).to.deep.equal({ date: "2022-11-18T08:57:05.320Z" });
  });
  it("should succesfully get transactions", async () => {
    const result = await transactionsService.getTransactions({
      page: 1,
      limit: 1,
    });
    expect(result).to.deep.equal([transaction]);
  });
});
