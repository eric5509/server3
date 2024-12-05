import { Router } from "express";
import { VerifyAcount } from "../Controller/OTP/VerifyAccount.js";
import { DecryptToken } from "../Lib/DecryptToken.js";



export const tokenRoutes = Router();
tokenRoutes.post("/token/verify", VerifyAcount);
tokenRoutes.get("/token/decrypt/:token", DecryptToken);
