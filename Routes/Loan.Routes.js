import { Router } from "express";
import { ApplyForLoan } from "../Controller/Loan/ApplyForLoan.js";
import { FetchAllLoans } from "../Controller/Loan/FetchAllLoans.js";
import { DeleteLoan } from "../Controller/Loan/DeleteLoan.js";

export const loanRoutes = Router();

loanRoutes.get("/loans", FetchAllLoans);
loanRoutes.post("/loan/apply", ApplyForLoan);
loanRoutes.delete("/loan/delete/:id", DeleteLoan);
