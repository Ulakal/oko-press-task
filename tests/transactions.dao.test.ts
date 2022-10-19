import { expect } from "chai";
import sinon from "sinon";
import ObjectsToCsv from "objects-to-csv";
import fs from "fs";
import { InternalServerError } from "routing-controllers";
import { TransactionsDao } from "../transactions/dao/transactions.dao";

describe("Transactions dao unit test", () => {
  const transactionsDao = new TransactionsDao();

  const transaction = {
    userId: "1",
    date: "2022-10-18T08:57:05.320Z",
    txStatus: true,
  };

  describe("save transaction functionality", () => {
    afterEach(function () {
      sinon.restore();
    });

    it("should succesfully save transaction to csv", async () => {
      sinon.stub(ObjectsToCsv.prototype, "toDisk").resolves();
      const result = await transactionsDao.saveTransaction(transaction);
      expect(result).to.deep.equal({ date: transaction.date });
    });
    it("should throw Internal Server Error when saving to csv fails", async () => {
      sinon.stub(ObjectsToCsv.prototype, "toDisk").rejects();
      const result = await transactionsDao.saveTransaction(transaction);
      expect(result).to.be.an.instanceof(InternalServerError);
    });
  });
  describe("get transactions functionality", () => {
    let transactionsDao = new TransactionsDao();

    afterEach(function () {
      sinon.restore();
    });
    it("should throw Internal Server Error when csv file doesnt exist", async () => {
      sinon.stub(fs, "existsSync").returns(false);

      const result = await transactionsDao.readTransactions({
        page: 1,
        limit: 2,
      });
      expect(result).to.be.an.instanceof(InternalServerError);
    });
    it("should throw Internal Server Error when saving to csv fails", async () => {
      sinon.stub(ObjectsToCsv.prototype, "toDisk").rejects();
      const result = await transactionsDao.saveTransaction(transaction);
      expect(result).to.be.an.instanceof(InternalServerError);
    });
  });
});
