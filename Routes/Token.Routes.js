import { Router } from "express";
import { VerifyAcount } from "../Controller/Token/VerifyAccount.js";
import { DecryptToken } from "../Controller/Token/DecryptToken.js";



export const tokenRoutes = Router();
tokenRoutes.post("/token/verify", VerifyAcount);
tokenRoutes.get("/token/decrypt/:token", DecryptToken);
