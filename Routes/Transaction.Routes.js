import { Router } from "express";
import { Credit } from "../Controller/Transaction/Credit.js";
import { Debit } from "../Controller/Transaction/Debit.js";
import { AllTransactions } from "../Controller/Transaction/AllTransactions.js";
import { DeleteTransaction } from "../Controller/Transaction/DeleteTransaction.js";
import { UpdateTransaction } from "../Controller/Transaction/UpdateTransaction.js";



export const transactionRoutes = Router();

transactionRoutes.post("/credit", Credit);
transactionRoutes.post("/debit", Debit);
transactionRoutes.delete("/transaction/delete/:id", DeleteTransaction);
transactionRoutes.patch("/transaction/update/:id", UpdateTransaction);
transactionRoutes.get("/transactions", AllTransactions);
