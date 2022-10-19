import { Container } from 'typedi';
import express from "express";
import { useExpressServer, useContainer } from "routing-controllers";
import { TransactionController } from "./transactions/controllers/transactions.controller";
import { HttpErrorHandler } from "./transactions/middlewares/custom.http.error.middleware";

const app: express.Application = express();
useContainer(Container);
app.use(express.json());

useExpressServer(app, {
  defaultErrorHandler: false,
    middlewares: [
        HttpErrorHandler
    ],
  controllers: [TransactionController],
});

// run express application on port 3000
app.listen(3000, () => console.log(`Listening on 3000`));
