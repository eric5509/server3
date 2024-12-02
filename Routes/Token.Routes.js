import { Router } from "express";
import { VerifyAcount } from "../Controller/Token/VerifyAccount.js";



export const tokenRoutes = Router();

tokenRoutes.post("/token/verify", VerifyAcount);
