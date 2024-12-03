import { Router } from "express";
import { ApplyForLoan } from "../Controller/Loan/ApplyForLoan.js";
import { FetchAllLoans } from "../Controller/Loan/FetchAllLoans.js";

export const loanRoutes = Router();

loanRoutes.get("/loans", FetchAllLoans);
loanRoutes.get("/loan/apply", ApplyForLoan);
