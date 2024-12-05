import { Router } from "express";
import { Register } from "../Controller/Account/Register.js";
import { GetUsers } from "../Controller/Account/GetUsers.js";
import { Login } from "../Controller/Account/Login.js";
import { UpdateUser } from "../Controller/Account/UpdateUser.js";
import { Options } from "../Controller/Account/Options.js";
import { DeleteAccount } from "../Controller/Account/DeleteAccount.js";
import { VerifyAccountPin } from "../Controller/Account/VerifyAccountPin.js";



export const userRoutes = Router();

userRoutes.get("/users", GetUsers);
userRoutes.post("/user/login", Login);
userRoutes.post("/user/verify-pin", VerifyAccountPin);
userRoutes.post("/user/create", Register);
userRoutes.post("/user/update", UpdateUser);
userRoutes.get("/users/options", Options);
userRoutes.delete("/user/delete/:id", DeleteAccount);
