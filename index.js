import { transactionRoutes } from "./Routes/Transaction.Routes.js";
import { transferRoutes } from "./Routes/Transfer.Routes.js";
import { userRoutes } from "./Routes/Account.Routes.js";
import { ConnectToDatabase } from "./Config/Config.js";
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { tokenRoutes } from "./Routes/Token.Routes.js";
import { loanRoutes } from "./Routes/Loan.Routes.js";
dotenv.config();

const app = express();
const port = process.env.PORT || 4000;

ConnectToDatabase();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(userRoutes);
app.use(transactionRoutes);
app.use(transferRoutes);
app.use(tokenRoutes);
app.use(loanRoutes);

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something went wrong!");
});
app.listen(port, () => {
  console.log(`Server Running on Port ${port}`);
});
